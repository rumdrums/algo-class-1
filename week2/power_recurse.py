import math
import matplotlib.pyplot as plt

def wrapped():
    count = [0]
    def f(a,b):
      count[0] += 1
      if b == 1:
        return a
      else:
        c = a*a
        ans = f(c,b/2)
      if b % 2 != 0:
        return a*ans
      else:
        return ans, count[0]
    return f

def g(b):
  return b * math.log(b)

def h(b):
  return math.sqrt(b)

def j(b):
  return math.log(b)


#a = 2
#b = range(1,32)
#x = b

for b in range(2,65,2):
  f = wrapped()
  ans, ct = f(2,b)
  print("b is: %d" % b),
  print("ct: %d" % ct),
  print("sqrt: %f" % math.sqrt(b)),
  print("log: %f" % math.log(b,2))

#y1 = [ f(a,i) for i in b ]
#y2 = [ 100 * f(a,i) for i in b ]
#y3 = [ g(i) for i in b ]
#y4 = [ h(i) for i in b ]
#y5 = [ j(i) for i in b ]

#print(f(a,b))
#print(g(b))
#plt.plot(x, y1, label='y1')
##plt.plot(x, y2, label='y2')
#plt.plot(x, y3, label='y3')
#plt.plot(x, y4, label='y4')
#plt.plot(x, y5, label='y5')
#plt.legend()
#plt.show()
#
