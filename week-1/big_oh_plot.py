import matplotlib.pyplot as plt

def t(n):
  for i in n:
    yield 10000000 * i

def f(n):
  for i in n:
    yield i**2

def find_n0(f, t):
  total = min(len(f), len(t))
  start = min(f[0], t[0])
  for i in range(start,total):
    if f[i] > t[i]:
      return i

x = range(1,50000000)
y1 = [ i for i in f(x) ]
y2 = [ i for i in t(x) ]
    
n0 = find_n0(y1,y2)
print("n0: %d" % n0)
plt.plot(x[:n0],y1[:n0], label='y1')
plt.plot(x[:n0],y2[:n0], label='y2')
plt.show()
