<h1> python语言中的容错机制 </h1>


<h3>处理程序中异常的方法</h3>

```
try：
  可能发生错误的代码
except：
  如果出现异常的执行代码
```
<h4> 需求：尝试以r模式打开文件，如果文件不存在，则以w方式打开</h4>

```
try:
  f = open('test1.txt', 'r')
except:
  f = open('test1.txt', 'w')
```

<h3>捕获指定异常</h3>

```
try:
  可能发生错误的代码
except 异常类型:
  如果捕获到该异常类型执行的代码
```

✅：如果尝试执行的代码的异常类型和要捕获的异常类型不一致，则无法捕获异常<br/>
✅：当捕获多个异常时，可以把要捕获的异常的名字，放到except后，并使用元组的方式进行存储

```

try:
    print(1/0)
except (NameError,ZeroDivisionError):
    print('有错误')
```

<h4>捕获所有异常: Exception是所有程序异常类的父类</h4>

```
try:
    print(num)
except Exception as result:
    print(result) # name 'num' is not defined

# else表示的是如果没有异常要执行的代码
try:
    print(1)
except Exception as result:
    print(result)
else:
    print('我是else，是没有异常的时候执行的代码') #我是else，是没有异常的时候执行的代码

# finally 表示的是无论是否异常都要执行的代码

```

<h4>需求：现在有如下的代码，我们要对其进行异常捕获。</h4>

```
#
# f = open('demo.txt','r')
# while True:
#     content = f.readline()
#     print(content)
#     if len(content) == 0:
#         print('读取完成')
#         break
```

<h5>增加异常捕获代码： try...except..必须成对出现，except可以用来展示一些错误提示语</h5>

```
try:
    f = open('demo.txt', 'r')
    try:
        while True:
            content = f.readline()
            print(content)
            if len(content) == 0:
                print('读取完成')
                break
    except:
        print('读取异常')
    finally:
        f.close()
except:
    print('请检查demo.txt文件是否存在')


```
