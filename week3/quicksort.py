def partition(A, l, r):
  return partitionLeft(A, l, r)

def partitionLeft(A, l, r):
  global total
  total += r - l  
  p = A[l]
  print('pivot: %d' % p)
  i = l + 1
  for j in range(l+1, r+1):
    if A[j] < p:
      print('swapping %d and %d' % (A[j], A[i])) 
      temp = A[i]
      A[i] = A[j]
      A[j] = temp
      i += 1
  print('swapping %d and %d' % (A[l],A[i-1]))
  temp = A[l]
  A[l] = A[i-1]
  A[i-1] = temp
  print('returning: %d' % (i-1))
  return i-1

def quicksort(A, l, r, order, depth):
  global total
  depth += 1
  if (r-l) < 1:
    return
  print('quicksort called: %s, %s, %d' % (A[l:r+1], order, depth)) 
  p = partition(A, l, r)
  b = p
  print('pivot is %d' % p)
  quicksort(A, l, p-1, 'first', depth)
  print('pivot is %d, b is %d' % (p, b))
  quicksort(A, p+1, r, 'second', depth)


def main():
  global total
  the_file = 'test1.txt'
  a = []
  with open(the_file) as f:
    a = [int(i.rstrip()) for i in f ]
  quicksort(a, 0, len(a)-1, 'outside', 0)
  print("total: %d" % total)
  print("sorted: %s" % a)
total = 0
main()


