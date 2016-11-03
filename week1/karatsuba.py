#!/usr/bin/env python

"""
x*y = (10*(n/2)a + b) * (10*(n/2)c + d )

"""

x = "3141592653589793238462643383279502884197169399375105820974944592"
y = "2718281828459045235360287471352662497757247093699959574966967627"

def split(x):
  l = len(x)/2
  return (x[:l], x[l:])

def karatsuba1(x, y, total=0):
  print("called: %s, %s %d" % (x, y, total))
  x = str(x)
  y = str(y)
  if len(x) > 1:
    a, b = split(str(x))
    total += karatsuba1(a, b, total)

  if len(y) > 1:
    c, d = split(str(y))
    total += karatsuba1(c, d, total)

  return int(x)*int(y)

#x = "5678"
#y = "1234"
x = 312
y = 1476892
print(karatsuba1(x,y))
