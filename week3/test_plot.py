import matplotlib.pyplot as plt
import math

def f(n):
  for i in n:
    yield 1.0/i

def g(n):
  s = 0
  for i in n: 
    s += 1.0/i
    yield s

x = range(1,50)

y1 = [ i for i in f(x) ]
y2 = [ i for i in g(x) ]
   
plt.plot(x,y1, label='y1')
plt.plot(x,y2, label='y2')
plt.legend()
plt.show()

