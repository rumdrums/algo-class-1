var fs = require('fs');

var total = 0;

var partition = function(A, l, r) {
  // console.log('partition called: ', A, l, r);	
  return partitionHigh(A, l, r);
};

var partitionLow = function(A, l, r) {
  total += r - l;	
  p = A[l];
  var i = l + 1;
  for(var j=l+1; j <= r; j++) {
  	if (A[j] < p) {
  	  // console.log('swapping ' + A[i] + ' and ' + A[j]);	
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
  return i-1;
};

var partitionHigh = function(A, l, r) {
  total += r - l;	
  p = A[r];
  var i = l;
  for(var j=l; j < r; j++) {
  	if (A[j] < p) {
   	  // console.log('swapping ' + A[i] + ' and ' + A[j]);
  	  var temp = A[i];
  	  A[i] = A[j];
      A[j] = temp;
      i++;
  	}
  }
  // console.log('swapping ' + A[r] + ' and ' + A[i]);
  var temp = A[r];
  A[r] = A[i];
  A[i] = temp;
  return i-1;
};

var partitionMedian = function(A, l, r) {
  total += r - l;	
  p = A[r];
  var i = l;
  for(var j=l; j < r; j++) {
  	if (A[j] < p) {
   	  // console.log('swapping ' + A[i] + ' and ' + A[j]);
  	  var temp = A[i];
  	  A[i] = A[j];
      A[j] = temp;
      i++;
  	}
  }
  // console.log('swapping ' + A[r] + ' and ' + A[i]);
  var temp = A[r];
  A[r] = A[i];
  A[i] = temp;
  return i-1;
};

var quickSort = function(A, l, r) {
  // console.log('quicksort called: ', A, l, r);	
  if ((r-l) < 1) {
  	return;
  }
  p = partition(A, l, r);
  quickSort(A, l, p);
  quickSort(A, p+1, r);
};


var main = function() {

  fs.readFile('QuickSort.txt', function(err, data) {
    if (err) throw err;
    var A = data.toString().split('\r\n');
    for(var i=0; i<A.length; i++) {
    	if (A[i] == '') A.splice(i, 1);
    	else A[i] = parseInt(A[i]);
    }
    // console.log(A);
	quickSort(A, 0, A.length-1);
	console.log(A);
	console.log('total: ', total);
  });

  /*
  var A = [2,4,1,3];
  quickSort(A, 0, A.length-1);
  console.log(A);
  */
};


main();






