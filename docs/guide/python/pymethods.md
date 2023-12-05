<h1> python语言常用函数</h1>

```
# -----------------------------------------------------------

# !/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2023/12/3 14:00
# @Author  : Dreamers
# @File    : methods.py
# @Software: PyCharm

# ------------------------------------------------------------

#  python 函数知识点

num = 100

def fun1():
    print('fun1--->', num)

def fun2():
    # global 关键字，声明a是全局变量s
    global num
    num = 200
    print('fun2--->',num)

def fun3():
    print('fun1--->', num)

fun1() # 100
fun2() # 200
fun3() # 200

# 不定长参数，也叫 可变参数
# ⚠️ *args会把传进来的参数合并为一个元祖 （无关键字参数）
# ⚠️ **kwargs会把传入的参数合并为一个字典   （有关键字参数）
def fun4(*args):
    print(args)

fun4('Tom') # ('Tom',)
fun4()      # ()
fun4({'a':1, 'b':2}) # ({'a': 1, 'b': 2},)

def fun5(**kwargs):
    print(kwargs)

fun5() # {}
fun5(age=10, sex='男') # {'age': 10, 'sex': '男'}

## 匿名函数 lambda  美/ˈlæmdə/ n. 兰姆达(人名)
# 形式：lambda 参数：表达式
a = lambda x: x+1
print(f'lambda函数的结果是：{a(1)}') #lambda函数的结果是：2
b = (lambda x: x+1)(1)
print(f'换种写法-lambda函数的结果是：{b}') #换种写法-lambda函数的结果是：2

# lambda 写if..else.. 表达式
c = (lambda x: x if(x > 10) else 'false')(11)
print(f'lambda 写表达式：{c}') #lambda 写表达式：11
print('lambda 写表达式 {c}'.format(c = (lambda x: x if(x > 10) else 'false')(9))) #lambda 写表达式 false

# 可以使用python函数，返回list中大于10的元素
# list = [90,1,2,3,10,11,100]  变量名别用list，后续调用py内置list函数会报错：'list' object is not callable
list_filter = [90,1,2,3,10,11,100]
new_list = list(filter(lambda x: x > 10, list_filter))
print(f'list中大于10的元素： {new_list}') #list中大于10的元素： [90, 11, 100]

# 还有python的内置韩式：map()、filter()、reduce()等结合lambda函数一起使用。

```