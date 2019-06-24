# RegExp篇

### 创建一个Regexp的两种方式：<br >
1. ```var reg = /regexp/``` <br >
2. ```var reg = new RegExp('regexp')``` <br >
3. 可以配合使用的3个标志：<br >
* i ： i可以使正则表达式在匹配时忽略大小写。```/regexp/i```
* g ： g标志可以使正则表达式匹配模式的所有实例。
* m ： 可以使正则表达式跨多行(例如textarea元素的值)进行匹配。
以上这些标志都要放在表达式的尾部（```/regexp/ig```），或者作为第二个参数传进去（```new RegExp('regexp', 'ig')```）。


```
//下面的例子演示了各种标志的用法，以及它们是如何影响模式匹配的:

var pattern = /orange/; 
console.log(pattern.test("orange")); // true

var patternIgnoreCase = /orange/i;
console.log(patternIgnoreCase.test("Orange")); // true

var patternGlobal = /orange/ig;
console.log(patternGlobal.test("Orange Juice")); // true
```

### 严格匹配模式

任何非正则表达式字符或操作符的字符序列，代表的都是该字符本身:<br>
```var parttern = /orange/;```<br>
我们很少采用严格匹配，因为这和直接比较两个字符串没什么分别。严格匹配有时候也 叫作简化模式(simple pattern)。

### 匹配字符组

如果想匹配一组字符，可以放到[]中来。例如[abc]就表示a,b,c中的任意一个字符。

```
var pattern = /[abc]/;
console.log(pattern.test('a')); //true
console.log(pattern.test('d')); //false
```
也可以在模式开头加一个^（脱字符）来表示不想匹配到的内容。
```
var pattern = /[^abc]/;
console.log(pattern.test('a')); //false
console.log(pattern.test('d')); //true
```
这种模式还有另一种很重要的用法是用来指明值的范围。如果想匹配字符或数字的某个连续 范围，可以使用下面的模式:

```
var pattern = /[0-5]/;
console.log(pattern.test(3)); //true 
console.log(pattern.test(12345)); //true 
console.log(pattern.test(9)); //false 
console.log(pattern.test(6789)); //false 
console.log(/[0123456789]/.test("This is year 2015")); //true
```

我们可以看到：[ , ] , ^ , $ , .等字符都是具有特殊含义的字符。那要配配它们的字面量的含义，要怎么做？<br>
加一个```\（反斜线字符)```就好了。\[ 匹配的就是一个普通的字符[, 而不是字符组的开括号。双```\\```表示一个普通的字符 \ 。


## 补充：^的两种含义：
![](https://i.loli.net/2019/06/24/5d109d215988c39469.png)


## 可以运用到开发中的：exec() 和 match() 和 replace()方法
1. 在正则中有exec()方法,如下示例：
	
![](https://i.loli.net/2019/06/24/5d1084c80711c50480.png)

2. String对象的方法中有match()方法,如下示例：

![](https://i.loli.net/2019/06/24/5d10854b03dc329442.png)

可以看到两种方法结果是一致的。查找不到的时候则返回null。

3. String对象的方法replace()方法实现字符的替换：

```
var strToMatch = 'Blue is your favorite color ? blue?'; 
var regExAt = /Blue/ig; 
console.log(strToMatch.replace(regExAt, "Red"));
//输出：Red is your favorite color ? Red?
```

或者，第二个参数接受一个函数：

```
var strToMatch = 'Blue is your favorite color ?';
var regExAt = /Blue/;
console.log(strToMatch.replace(regExAt, function(matchingText){
  return 'Red';
}));
// 输出"Red is your favorite color ?"
```

4.  String对象的split()方法也可以接受正则表达式作为参数并返回一个数组，该数组中包含
了经过分割后的所有子串:

```
var sColor = 'sun,moon,Stars';
var reComma = /[n,s]/i; 
console.log(sColor.split(reComma));
//输出: ["", "u", "", "moo", "", "", "tar", ""]
```

5. 使用简单字符组就可以匹配多个模式。假如想匹配cat、bat和fat，下面的代码片段展示了 具体的做法:

```
var strToMatch = 'wooden bat, smelly Cat,a fat cat';
var re = /[bcf]at/gi;
var arrMatches = strToMatch.match(re);
console.log(arrMatches);
//输出：["bat", "Cat", "fat", "cat"]
```

6. 如你所见，这种用法可以写出更简洁的正则表达式。来看下面的例子:

```
var strToMatch = 'i1,i2,i3,i4,i5,i6,i7,i8,i9';
var re = /i[0-5]/gi;
var arrMatches = strToMatch.match(re);
console.log(arrMatches);
//输出：["i1", "i2", "i3", "i4", "i5"]
```

## 快捷写法：
| 写法 | 含义 |
| ------ | ------ |
| \d | 任意的单个数字字符 |
| \w | 任意的单个字母或数字字符 |
| \s | 任意的单个空白字符(空格、制表符、换行符等) | 
| \D | 任意的单个非数字字符 |
| \W | 任意的单个非字母或数字字符 |
| \s | 任意的单个非空白字符 |
| . | 除换行符之外的任意单个字符 |


1. 这些快捷写法是书写简洁的正则表达式的关键。看下面的例子:

```
var strToMatch = '123-456-7890';
var re = /\d\d\d-\d\d\d/;
var arrMatches = strToMatch.match(re);
console.log(arrMatches);
//["123-456"]
```

2. 解决重复出现的重复限定符：

| 写法 | 含义 |
| ------ | ------ |
| ? | 出现0次或1次(将模式视为可选的) |
| * | 出现0次或多次 |
| + | 出现1次或多次 | 
| {n} | 只出现n次 |
| {n,m} | 出现n到m次 |
| {n, } | 至少出现n次 |
| { ,n} | 出现0到n次 |

3. 
































