var fs = require('fs');
var total = 0;

var partition = function(A, l, r) {
  p = A[l];
  console.log('pivot: ', p);
  var i = l + 1;
  for(var j=l+1; j <= r; j++) {
  	if (A[j] < p) {
  	  console.log('swapping ' + A[j] + ' and ' + A[i]);	
  	  var temp = A[i];
  	  A[i] = A[j];
      A[j] = temp;
      i++;
  	}
  }
  console.log('swapping ' + A[l] + ' and ' + A[i-1]);
  var temp = A[l];
  A[l] = A[i-1];
  A[i-1] = temp;
  console.log('returning: ', i-1, A);
  return i-1;
};


var quickSort = function(A, l, r) {
  if ((r-l) < 1) {
    console.log('not continuing: ', r-l)
    return;
  }
  total += A.slice(l,r+1).length - 1;
  console.log('quicksort called: ', A.slice(l, r+1)); 
  p = partition(A, l, r);
  quickSort(A, l, p-1);
  quickSort(A, p+1, r);
};


var main = function() {
  myFile = 'test1.txt'
  fs.readFile(myFile, function(err, data) {
    if (err) throw err;
    var A = data.toString().split('\n');
    for(var i=0; i<A.length; i++) {
      if (A[i] == '') A.splice(i, 1);
      else A[i] = parseInt(A[i]);
    }
  quickSort(A, 0, A.length-1);
  console.log('total: ', total);
  });
};

main();


