import matplotlib.pyplot as plt
import math

def f(n):
  for i in n:
    yield i**2

def g(n):
  """ this is bigger """
  for i in n:
    yield 2**i

x = range(1,200)

y1 = [ i for i in f(x) ]
y2 = [ i for i in g(x) ]
   
plt.plot(x,y1, label='y1')
plt.plot(x,y2, label='y2')
plt.legend()
plt.show()

