import math


#-----Binary step Block---------
zeta = 0
if out > zeta:
	print("Output is 1")
else:
	print("Output is 0")


#-----Simple NN Block---------
in_x1 = 0
in_x2 = 0
w1 = 0
w2 = 0
out = (w1 * in_x1) + (w2 * in_x2)
#-----Sigmoid Block---------
zeta  = 0
alpha = 0.5
y = (1 / (1 + math.exp(-1 * (out - zeta) * alpha)))
print('Output is : {}'.format(y))



