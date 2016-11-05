import matplotlib as plt

def f(x, k):
  sum = 1
  for i in range(1,k+1):
    sum += x**i 
  return sum

def f2(x, k):
  return ( x ** (k+1) - 1 ) / (x - 1)


x = 2
k = 100

print("x = 2")
print(f(x,k))
print(f2(x,k))


print("x = .5")
x = 0.5
print(f(x,k))
print(f2(x,k))
