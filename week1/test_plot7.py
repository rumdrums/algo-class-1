import matplotlib.pyplot as plt
import math

def f(n):
  """ logarithmic """
  for i in n:
    yield i**2

def g(n):
  """ logarithmic """
  for i in n:
    yield 3*i**2

x = range(1,10)

#y1 = [ i for i in f(x) ]
#y2 = [ i for i in g(x) ]
y3 = [ 2**i for i in f(x) ]   
y4 = [ 2**i for i in g(x) ]   

#plt.plot(x,y1, label='y1')
#plt.plot(x,y2, label='y2')
plt.plot(x,y3, label='y3')
plt.plot(x,y4, label='y4')

plt.legend()
plt.show()

