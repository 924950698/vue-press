# RegExp篇一

## 前言：

**对于正则表达式，相信很多人都知道，但是很多人的第一感觉就是难学，因为看第一眼时，觉得完全没有规律可寻，而且全是一堆各种各样的特殊符号，完全不知所云。
其实只是对正则不了解而以，了解了你就会发现，原来就这样啊正则所用的相关字符其实不多，也不难记，更不难懂，唯一难的就是组合起来之后，可读性比较差，而且不容易理解，本文旨在让大家对正则有一个基本的了解，能看得懂简单的正则表达式，写得出简单的正则表达式，用以满足日常开发中的需求即可。**


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
| \w | 任意的单个字母或数字字符（包括下划线） |
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

3. \b（边界匹配符）的用法：一边是单词字符(字母、数字或下划线)，另一边是 非单词字符。<br>
下面的例子是一个简单的字面匹配。如果cat是一个子串的话，也能够成功匹配: 

```
//非子串：
console.log(/cat/.test('a black cat')); //true

//子串：
console.log(/cat/.test('a blackcat')); //true
```

下面是使用了 ```\b``` 以后的例子：

```
//非子串：
console.log(/\bcat/.test('a black cat')); //true

//子串：
console.log(/\bcat/.test('a blackcat')); //false
console.log(/\bcat/.test('a cataa')); //true
console.log(/\bcat\b/.test('a blackcat')); //false
console.log(/\bcat\b/.test('a cat')); //true
```

** \b 作用：**
上面的解释还是有点模糊，\b表示的是字符与字符之间看不见的东西（空格）。
<br>如果想匹配cat字符串的话，需要写成：```/\bcat\b/```
<br>详细解释看下图：

![](https://i.loli.net/2019/06/25/5d11925d66e4080215.png)

**exec的用法：** <br>
exec()方法在获取匹配信息方面很有用，因为它会返回一个包含匹配信息的对象。exec() 返回的对象有一个index属性，可以告诉我们成功匹配出现在字符串中的哪个位置。这个功能在 不少地方都能派上用场:

```
var match = /\d+/.exec("There are 100 ways to do this");
    console.log(match);
    // ["100"]
    console.log(match.index);
// 10
```

**()组合符的用法：**<br>
选择结构可以使用|(管道符)来表示。例如，/a|b/可以匹配字符a或b，/(ab)+|(cd)+/ 可以匹配一个或多个ab或cd。

## 首部(^)与尾部($)

我们经常需要确保模式在字符串的首部或尾部进行匹配。当脱字符(^)用作正则表达式的 第一个字符的时候，可以将匹配过程锁定在字符串的开头，因此，/^test/只能够匹配出现在待 匹配字符串起始位置上的test子串。与此类似，美元符号($)表示模式必须出现在字符串的尾部: /test$/。<br>
^和$配合使用，表明指定的模式必须涵盖整个待匹配的字符串:/^test$/。

## 向后引用
在字符串String使用replace()方法时，可以使用特殊的字符序列$1,$2...来表示对应的分组。

```
var orig = "1234 5678";
var re = /(\d{4}) (\d{4})/;
var modifiedStr = orig.replace(re, "$2 $1"); 
console.log(modifiedStr); // 输出"5678 1234"
```

## 贪婪限定符(所有限定符) 与 惰性限定符(?)
例如，模式\d+能够匹配一个或多个数字。如果字符串是123的话，贪婪匹配可以匹配到1、 12和123。贪婪模式h.+1可以匹配字符串hello中的hell——这是能够匹配的最长的字符串。 因为\d+是贪婪匹配，所以它会尽可能多地匹配数字，故最后的匹配结果就是123。<br>
与贪婪限定符相反，惰性限定符则是尽可能少地匹配字符。可以在正则表达式后面加上问号 (?)，使其成为惰性匹配。惰性模式h.?l可以匹配字符串hello中的hel—— 这是能够匹配到的最短的字符串。<br>
模式\w*?X可以匹配到0个或多个单词以及一个X。但是```*```后的?表示应该尽可能少地匹配字 符。对于字符串abcXXX，匹配结果可以是abcX、abcXX或abcXXX，那究竟应该匹配哪一个呢? 因为*?是惰性模式，所以应该尽可能少地匹配，因此最后的匹配结果是abcX。<br>
删除字符串首尾多余的空白字符是一个极其常见的用法。直到最近，String对象本身都没有 trim()方法，一些JavaScript库为没有String.trim()方法的旧浏览器提供了字符串修剪功能。 最常用的方法如下所示:<br>

```
function trim(str) {
   return (str || "").replace(/^\s+|\s+$/g,"");
}
console.log("--"+trim("   test   ")+"--");
//"--test--"

//如果我们想把重复的空白字符替换成单个呢?

 re=/\s+/g;
 console.log('There are     a lot        of spaces'.replace(re,' '));
 //"There are a lot of spaces"
```
在上面的代码片段中，我们尝试匹配一个或多个空格字符序列，然后将其替换成单个空格。<br>
如你所见，正则表达式就像是JavaScript兵器库中的一把瑞士军刀。从长远来看，细心学习、 充分实践，将为你带来丰厚的长期回报。

















