### python语言常用api

<b>1、常用api</b>
```
# -----------------------------------------------------------

# !/usr/bin/env python
# -*- coding: utf-8 -*-
# @Time    : 2022/12/1 16:44
# @Author  : Dreamers
# @File    : vars_study.py
# @Software: PyCharm
# todo： 了解py的常用模块：：datetime和time的常用方法、PyInputPlus输入验证功能替换input函数、

# ------------------------------------------------------------

import datetime

# 用3引号表达字符串 'a', "aa",  """ a """
a = 'a'
b = 1
print('a', "aa",  """ a """)

# python中的一些数据类型：字符串、数字、布尔类型、

# 列表（和js的数组一样）
list = [1,2,3]

# 元祖（以小括号表示）
tuple = (1,2,3)

# 字典 dict（类似js中的对象，都是健值对形式）


#  类型转换、列表&元祖&字典循环遍历、request模块

# 类型转换
# 字符串的类型转化3种方式：
value1 = 1
value2 = [9, 0]
print("DAY %s 格式化字符串 %s " % (value1,value2))

# python2.5版本后，提供str.format()方法
s2 = "我今天{numbers}岁了，名字叫做{name}".format(numbers=1, name="hangman")
print(s2)

# python 3.6版本，推出f进行格式化
name = 'lxd'
age = 10
date = datetime.date(2023,11,1)
print(f'我的名字是{name},今年是{date:%Y},本月是{date: %M},明年是{age +1}岁了')
# 我的名字是lxd,今年是2023,本月是 00,明年是11岁了

# 比较运算符 ==
a, b='1', 1
print('python中，同样值的str与int类型的比较结果是：', a == str(b))

# 逻辑运算符 and or not

# if 语句 和 input()
age = int(input('请输入年龄'))
if age > 18:
    print('已经成年')
else:
    print('尚为成年')

```
