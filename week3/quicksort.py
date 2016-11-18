import numpy

def swap(array, i, j):
  temp = array[i]
  array[i] = array[j]
  array[j] = temp

def get_middle(A, l, r):
  length = r - l
  return length/2

def get_median(A):
  return int(numpy.median(A))

def partition(A, l, r):
  return _partition(A, l, r, 'right')

def _partition(A, l, r, pivot_location='left'):
  global total
  total += r - l  
  if pivot_location == 'median':
    # mid = get_middle(A, l, r)
    mid = l + ((r-l) >> 1)
    med = get_median([A[l], A[mid], A[r]])
    if med == A[l]:
      pass
    elif med == A[mid]:
      swap(A, l, mid)
    elif med == A[r]:
      swap(A, l, r)      
  elif pivot_location == 'right':
    swap(A, l, r)
  p = A[l]
  # print('pivot: %d' % p)
  i = l + 1
  for j in range(l+1, r+1):
    if A[j] < p:
      # print('swapping %d and %d' % (A[j], A[i])) 
      swap(A, i, j)
      i += 1
  # print('swapping %d and %d' % (A[l],A[i-1]))
  swap(A, l, i-1)
  # print('returning: %d' % (i-1))
  return i-1

def quicksort(A, l, r, order, depth):
  global total
  depth += 1
  if (r-l) < 1:
    return
  # print('quicksort called: %s, %s, depth=%d' % (A[l:r+1], order, depth)) 
  p = partition(A, l, r)
  b = p
  # print('pivot is %d' % p)
  quicksort(A, l, p-1, 'first', depth)
  # print('pivot is %d, b is %d' % (p, b))
  quicksort(A, p+1, r, 'second', depth)


def main():
  global total
  the_file = 'QuickSort.txt'
  a = []
  with open(the_file) as f:
    a = [int(i.rstrip()) for i in f ]
  quicksort(a, 0, len(a)-1, 'outside', 0)
  print("total: %d" % total)
  # print("sorted: %s" % a)


total = 0
if __name__ == '__main__':
  main()



