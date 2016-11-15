/*
1)
The file contains all of the integers between 1 and 10,000 (inclusive, with no repeats) in unsorted order. The integer in the ith row of the file gives you the ith entry of an input array.

Your task is to compute the total number of comparisons used to sort the given input file by QuickSort. As you know, the number of comparisons depends on which elements are chosen as pivots, so we'll ask you to explore three different pivoting rules.

You should not count comparisons one-by-one. Rather, when there is a recursive call on a subarray of length m, you should simply add m−1 to your running total of comparisons. (This is because the pivot element is compared to each of the other m−1 elements in the subarray in this recursive call.)

WARNING: The Partition subroutine can be implemented in several different ways, and different implementations can give you differing numbers of comparisons. For this problem, you should implement the Partition subroutine exactly as it is described in the video lectures (otherwise you might get the wrong answer).

DIRECTIONS FOR THIS PROBLEM:

For the first part of the programming assignment, you should always use the first element of the array as the pivot element.

HOW TO GIVE US YOUR ANSWER:

Type the numeric answer in the space provided.

So if your answer is 1198233847, then just type 1198233847 in the space provided without any space / commas / other punctuation marks. You have 5 attempts to get the correct answer.

(We do not require you to submit your code, so feel free to use the programming language of your choice, just type the numeric answer in the following space.)

2)
Compute the number of comparisons (as in Problem 1), always using the final element of the given array as the pivot element. Again, be sure to implement the Partition subroutine exactly as it is described in the video lectures.

Recall from the lectures that, just before the main Partition subroutine, you should exchange the pivot element (i.e., the last element) with the first element.

3)
Compute the number of comparisons (as in Problem 1), using the "median-of-three" pivot rule. [The primary motivation behind this rule is to do a little bit of extra work to get much better performance on input arrays that are nearly sorted or reverse sorted.] In more detail, you should choose the pivot as follows. Consider the first, middle, and final elements of the given array. (If the array has odd length it should be clear what the "middle" element is; for an array with even length 2k, use the kth element as the "middle" element. So for the array 4 5 6 7, the "middle" element is the second one ---- 5 and not 6!) Identify which of these three elements is the median (i.e., the one whose value is in between the other two), and use this as your pivot. As discussed in the first and second parts of this programming assignment, be sure to implement Partition exactly as described in the video lectures (including exchanging the pivot element with the first element just before the main Partition subroutine).

EXAMPLE: For the input array 8 2 4 5 7 1 you would consider the first (8), middle (4), and last (1) elements; since 4 is the median of the set {1,4,8}, you would use 4 as your pivot element.

SUBTLE POINT: A careful analysis would keep track of the comparisons made in identifying the median of the three candidate elements. You should NOT do this. That is, as in the previous two problems, you should simply add m−1 to your running total of comparisons every time you recurse on a subarray with length m.
*/

var fs = require('fs');

var total = 0;

var getMiddle = function(A, l, r) {
  // return index of middle element
  var idx = Math.floor((r-l)/2);
  return idx;	
};


var getMedian = function(A) {
  A.sort(function(a,b) {
    return a - b;
  });
  // console.log('median: ', A, A[getMiddle(A, 0, A.length-1)]);
  return A[getMiddle(A, 0, A.length-1)];
};


var partition = function(A, l, r) {
  // console.log('called partition: ', A.slice(l, r+1));
  var mid = getMiddle(A, l, r);
  var med = getMedian([A[l], A[mid], A[r]]);
  var medianIdx = A.indexOf(med);
  // return partitionRight(A, l, r);

  // this is bad: assumes there are no duplicates,
  // and is also just dumb:
  switch(medianIdx) {
  	case l:
  	  // console.log('I called partitionLeft', A, l, r, p, A[mid]);
  	  return partitionLeft(A, l, r);
  	case mid:
   	  // console.log('I called partitionMedian');
  	  return partitionMedian(A, l, r, medianIdx);
  	case r:
  	  // console.log('I called partitionRight', A, l, r, p, A[mid]);  	  
  	  return partitionRight(A, l, r);
  	default:
  	  console.log('I fucked up', A, l, r, p, A[mid]);
  }
};


var partitionLeft = function(A, l, r) {
  // total += r - l;	
  // total += A.slice(l, r+1).length - 1;
  var p = A[l];
  // console.log('pivot: ', p);
  var i = l + 1;
  for(var j=l+1; j <= r; j++) {
  	if (A[j] < p) {
  	  // console.log('swapping ' + A[j] + ' and ' + A[i]);	
  	  var temp = A[i];
  	  A[i] = A[j];
      A[j] = temp;
      i++;
  	}
  }
  // console.log('swapping ' + A[l] + ' and ' + A[i-1]);
  var temp = A[l];
  A[l] = A[i-1];
  A[i-1] = temp;
  // console.log('returning: ', i-1, A);
  return i-1;
};

var partitionRight = function(A, l, r) {
  var p = A[r];
  // console.log('pivot: ', p);
  var i = l;
  for(var j=l; j <= r; j++) {
    if (A[j] < p) {
      // console.log('swapping ' + A[j] + ' and ' + A[i]); 
      var temp = A[i];
      A[i] = A[j];
      A[j] = temp;
      i++;
    }
  }
  // console.log('swapping ' + A[l] + ' and ' + A[i-1]);
  var temp = A[r];
  A[r] = A[i];
  A[i] = temp;
  // console.log('returning: ', i, A);
  return Math.max(i, 0);
};

var partitionMedian = function(A, l, r, medianIdx) {
  var i = l;
  var p = A[medianIdx];
  // console.log('A, l, r, medianIdx, p: ', A, l, r, medianIdx, p);
  for(var j=l; j <= r; j++) {
  	// this is bad: assumes there are no duplicates:
  	if (A[j] == p) continue;
  	if (A[j] < p) {
   	  // console.log('swapping ' + A[i] + ' and ' + A[j]);
  	  var temp = A[i];
  	  A[i] = A[j];
      A[j] = temp;
      i++;
      // this is bad: assumes there are no duplicates:
      if (A[i] == p) i++;
  	}
  }
  return i-1;
};


var quickSort = function(A, l, r, order, depth) {
  depth++;
  if ((r-l) < 1) {
  	// console.log('this is bad: ', (r-l))
  	return;
  }
  total += A.slice(l, r+1).length - 1;
  // console.log('quicksort called: ', A.slice(l, r+1), order, 'depth: ', depth);	
  var p = partition(A, l, r);
  // console.log('pivot is ', p);
  quickSort(A, l, p-1, 'first', depth);
  quickSort(A, p+1, r, 'second', depth);
};


var main = function() {
  myFile = 'QuickSort.txt';
  // myFile = 'test1.txt'
  fs.readFile(myFile, function(err, data) {
    if (err) throw err;
    var A = data.toString().split('\n');
    for(var i=0; i<A.length; i++) {
    	if (A[i] == '') A.splice(i, 1);
    	else A[i] = parseInt(A[i]);
    }
	quickSort(A, 0, A.length-1, 'outside', 0);
  console.log(A);
	console.log('total: ', total);
  });

  
  // var A = [2,4,1,3];
  // quickSort(A, 0, A.length-1);
  // console.log(A);
  
};


main();






