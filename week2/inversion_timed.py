import math
import timeit

"""
Your task is to compute the number of inversions in the file given, where the ith row of the file indicates the ith entry of an array.

merge sort:

"""

def split(x):
  l = len(x)/2
  return (x[:l], x[l:])


def load_array(from_file):
  arr = []
  with open(from_file) as f:
    for line in f:
      arr.append(int(line.rstrip()))

  return arr

def f(arr, inv=0):
  #print("called with: %s, %s" % (arr, inv))
  if len(arr) < 2:
    return (arr, inv)
#  l, r = split(arr)
  length = len(arr)/2
  l, r = (arr[:length], arr[length:])
  #print("l: %s" % l)
  #print("r: %s" % r)
  l, invl = f(l)
  r, invr = f(r)
  inv += invl
  inv += invr
  new = []
  #print("about to test: %s %s" % (l, r))
  while len(l) > 0 and len(r) > 0:
    if l[0] < r[0]:
      new.append(l.pop(0))
    else:
      new.append(r.pop(0))
      inv += len(l)
  if l:
    new.extend(l)
  elif r:
    new.extend(r)
  return (new, inv)

arr = load_array('IntegerArray.txt')
#arr = [6,5,4,3,2,1]
#print(f(arr))

print(timeit.timeit("f(arr)", setup="""
from __main__ import f, load_array
arr = load_array('IntegerArray.txt')
""", number=10))
