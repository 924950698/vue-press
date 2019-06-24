# Regexp篇

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








