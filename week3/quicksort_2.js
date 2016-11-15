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
  // var mid = getMiddle(A, l, r);
  // var med = getMedian([A[l], A[mid], A[r]]);
  // var medianIdx = A.indexOf(med);
  // return partitionLeft(A, l, r, medianIdx); 
   return partitionLeft(A, l, r); 

  // this is bad: assumes there are no duplicates,
  // and is also just dumb:
  switch(medianIdx) {
  	case l:
  	  // console.log('I called partitionLeft', A, l, r, p, A[mid]);
  	  return partitionLeft(A, l, r);
  	case mid:
   	  console.log('I called partitionMedian');
  	  return partitionMedian(A, l, r, medianIdx);
  	case r:
  	  // console.log('I called partitionRight', A, l, r, p, A[mid]);  	  
  	  return partitionRight(A, l, r);
  	default:
  	  console.log('I fucked up', A, l, r, p, A[mid]);
  }
};


var partitionLeft = function(A, l, r) {
  console.log('partition called: ', A.slice(l, r+1));
  total += r - l;  
  // total += A.slice(l,r+1).length;
  p = A[l];
  console.log('pivot: ', p);
  var i = l + 1;
  for(var j=l+1; j <= r; j++) {
    if (A[j] < p) {
      var temp = A[i];
      A[i] = A[j];
      A[j] = temp;
      console.log('swapping ' + A[j] + ' and ' + A[i], A.slice(l,r+1));  
      i++;
    }
  }
  var temp = A[l];
  A[l] = A[i-1];
  A[i-1] = temp;
  console.log('swapping ' + A[l] + ' and ' + A[i-1], A.slice(l,r+1));
  console.log('returning: ', i-1);
  // return i-1;
  return A.indexOf(p);
};


var partitionRight = function(A, l, r) {
  total += r - l;  
  p = A[r];
  console.log('pivot: ', p);
  var i = l;
  for(var j=l; j < r; j++) {
  	if (A[j] < p) {
  	  var temp = A[i];
  	  A[i] = A[j];
      A[j] = temp;
      console.log('swapping ' + A[j] + ' and ' + A[i], A.slice(l,r+1));  
      i++;
  	}
  }
  var temp = A[r];
  A[r] = A[i];
  A[i] = temp;
  console.log('swapping ' + A[r] + ' and ' + A[i], A.slice(l,r+1));
  console.log('returning: ', i);  
  return i;
};


var partitionMedian = function(A, l, r, medianIdx) {
  total += r - l;	
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
  console.log('returning: ', i-1);
  return i-1;
};


var quickSort = function(A, l, r) {
  if (A.slice(l,r+1).length == 1) {
  	return;
  }
  console.log('quicksort called: ', A.slice(l, r+1));	
  p = partition(A, l, r);
  quickSort(A, l, p-1);
  quickSort(A, p+1, r);
};


var main = function() {
  myFile = 'QuickSort.txt';
  myFile = 'test1.txt'
  fs.readFile(myFile, function(err, data) {
    if (err) throw err;
    var A = data.toString().split('\n');
    for(var i=0; i<A.length; i++) {
    	if (A[i] == '') A.splice(i, 1);
    	else A[i] = parseInt(A[i]);
    }
    // console.log(A);
	quickSort(A, 0, A.length-1);
	console.log(A);
	console.log('total: ', total);
  });

  
  // var A = [2,4,1,3];
  // quickSort(A, 0, A.length-1);
  // console.log(A);
  
};


main();






