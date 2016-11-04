import matplotlib.pyplot as plt
import math

def f(n):
  """ logarithmic """
  for i in n:
    yield (math.log(i,2))*(i**2)

def g(n):
  for i in n:
    yield 2**i

def h(n):
  for i in n:
    yield 2**(2**i)

def j(n):
  """ logarithmic """
  for i in n:
    yield i**(math.log(i,2))
 
def k(n):
  for i in n:
    yield i**2


x = range(1,200)

y1 = [ i for i in f(x) ]
#y2 = [ i for i in g(x) ]
#y3 = [ i for i in h(x) ]
#y4 = [ i for i in j(x) ]
y5 = [ i for i in k(x) ]
    
plt.plot(x,y1, label='y1')
#plt.plot(x,y2, label='y2')
#plt.plot(x,y3, label='y3')
#plt.plot(x,y4, label='y4')
plt.plot(x,y5, label='y5')
plt.legend()
plt.show()

