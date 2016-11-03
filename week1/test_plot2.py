import matplotlib.pyplot as plt
import math

def f(n):
  for i in n:
    yield math.log(i)

def g(n):
  for i in n:
    yield i


x = range(1,500)

y1 = [ i for i in f(x) ]
y2 = [ i for i in g(x) ]
    
plt.plot(x,y1, label='y1')
plt.plot(x,y2, label='y2')
plt.show()

