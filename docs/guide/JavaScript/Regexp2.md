# RegExp终章

[MDN官方解释：Regex的语法含义](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions)

**前言：**
	第一章：字符匹配
	第二章：位置匹配

## 第三章 括号的作用

1. 分组和分支结构: 括号即代表分组。括号内的正则即是子表达式；分支结构（p1 | p2）这种是分支结构。
2. 分组引用 ：在匹配过程中，每一个分组都开辟一个空间，用来存储每一个分组匹配到的数据。（例子2-1）
3. 反向引用: \1（\数字）表示引用之前的那个分组（xxx）。不管它匹配到什么，\数字 都匹配那个同样的具体某个字符。（例子3-1）<br>
\2 \3也一样，分别指代第二，第三个字符。 <br>
引用了不存在的分组，只会匹配其本身。
<br>上面的括号都会补货它们匹配到的数据。因此称为捕获类型分组和捕获类型分支。

4. 非捕获括号: 写法(?:p) 和 (?:p1|p2|p3) 例子4-1 

5. 相关案例: trim()方法模拟 例子5-1



**例子2-1**

可以使用构造函数的全局属性 $1 至 $9 来获取:（算是正则的API）
```
var regex = /(\d{4})-(\d{2})-(\d{2})/;
var string = "2017-06-12";
regex.test(string); // 正则操作即可，例如 //regex.exec(string); //string.match(regex);
console.log(RegExp.$1); // "2017"
console.log(RegExp.$2); // "06"
console.log(RegExp.$3); // "12"
```

**例子3-1**
```
// 未用 “ 反向引用 ” 之前
var regex = /\d{4}(-|\/|\.)\d{2}(-|\/|\.)\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // true
console.log( regex.test(string4) ); // true

// 用了 “ 反向引用 ” 以后
var regex = /\d{4}(-|\/|\.)\d{2}\1\d{2}/;
var string1 = "2017-06-12";
var string2 = "2017/06/12";
var string3 = "2017.06.12";
var string4 = "2016-06/12";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // true
console.log( regex.test(string4) ); // false 


//多括号匹配（我的理解：从大范围到小范围）附上正则可视化图（如下）
var regex = /^((\d)(\d(\d)))\1\2\3\4$/;
var string = "1231231233";
console.log( regex.test(string) ); // true
console.log( RegExp.$1 ); // 123
console.log( RegExp.$2 ); // 1
console.log( RegExp.$3 ); // 23
console.log( RegExp.$4 ); // 3
```
![](https://i.loli.net/2019/07/02/5d1b014f55f4996550.png)



**例子4-1**
```
var regex = /(?:ab)+/g;
var string = "ababa abbb ababab";
console.log( string.match(regex) );
// => ["abab", "ab", "ababab"]
```

**例子5-1**
trim 方法是去掉字符串的开头和结尾的空白符。有两种思路去做。
```
第一种，匹配到开头和结尾的空白符，然后替换成空字符:
function trim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}
console.log( trim("  foobar   ") );
// => "foobar"

第二种，匹配整个字符串，然后用引用来提取出相应的数据:
function trim (str) {
  return str.replace(/^\s*(.*?)\s*$/g, "$1");
}
console.log( trim("  foobar   ") );
// => "foobar"
这里使用了惰性匹配 *?，不然也会匹配最后一个空格之前的所有空格的。

//例子：将每个单词的首字母转换为大写
function titleize (str) {
  return str.toLowerCase().replace(/(?:^|\s)\w/g, function (c) {
      return c.toUpperCase();
  });
}
console.log( titleize('my name is epeli') );
// => "My Name Is Epeli"

// 例子：驼峰化
function camelize (str) {
  return str.replace(/[-_\s]+(.)?/g, function (match, c) {
      return c ? c.toUpperCase() : '';
  });
}
console.log( camelize('-moz-transform') );
// => "MozTransform"

//例子：中划线化
function dasherize (str) {
  return str.replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
}
console.log( dasherize('MozTransform') );
// => "-moz-transform"

//HTML 转义和反转义
// 将HTML特殊字符转换成等值的实体 function escapeHTML (str) {
  var escapeChars = {
    '<' : 'lt',
    '>' : 'gt',
    '"' : 'quot',
'&' : 'amp',
    '\'' : '#39'
  };
  return str.replace(new RegExp('[' + Object.keys(escapeChars).join('') +']', 'g'),
function (match) {
      return '&' + escapeChars[match] + ';';
  });
}
console.log( escapeHTML('<div>Blah blah blah</div>') );
// => "&lt;div&gt;Blah blah blah&lt;/div&gt";

function unescapeHTML (str) {
  var htmlEntities = {
    nbsp: ' ',
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: '\''
  };
  return str.replace(/\&([^;]+);/g, function (match, key) {
      if (key in htmlEntities) {
          return htmlEntities[key];
}
      return match;
  });
}
console.log( unescapeHTML('&lt;div&gt;Blah blah blah&lt;/div&gt;') );
// => "<div>Blah blah blah</div>"

//匹配成对标签
<title>regular expression</title>
<p>laoyao bye bye</p>
匹配一个开标签，可以使用正则 <[^>]+>， 
匹配一个闭标签，可以使用 <\/[^>]+>， 但是要求匹配成对标签，那就需要使用反向引用，如:  

var regex = /<([^>]+)>[\d\D]*<\/\1>/;
var string1 = "<title>regular expression</title>";
var string2 = "<p>laoyao bye bye</p>";
var string3 = "<title>wrong!</p>";
console.log( regex.test(string1) ); // true
console.log( regex.test(string2) ); // true
console.log( regex.test(string3) ); // false

其中开标签 <[\^>]+> 改成<([^>]+)>，使用括号的目的是为了后面使用反向引用， 而提供分组。闭标签使用了反向引用，<\/\1>。

```

## 第四章 回溯法原理

**什么是回溯？**
回溯是正则的匹配原理。

下图是回溯的匹配原理：
简单的说，就是当匹配到第2个b时，已经满足了b{1,3}的匹配要求。开始匹配c时，就是“回溯”。
![](https://i.loli.net/2019/07/02/5d1b070fd578e99934.png)

**看一下百度百科的解释：**
![](https://i.loli.net/2019/07/02/5d1b086be9cdb20929.png)

JS正则表达式中会产生的回溯地方有哪些呢？
1. 贪婪量词
2. 惰性量词（贪婪量词后面加个问号，表示尽可能少的匹配）
```
var string = "12345";
var regex = /(\d{1,3}?)(\d{1,3})/;
console.log( string.match(regex) );
// => ["1234", "1", "234", index: 0, input: "12345"]
```
3. 分支结构

**总结：**
简单总结就是，正因为有多种可能，所以要一个一个试。直到，要么到某一步时，整体匹配成功了;要么最 后都试完后，发现整体匹配不成功。<br>

既然有回溯的过程，那么匹配效率肯定低一些。相对谁呢?相对那些 DFA 引擎, DFA 是“确定型有限自动 机”的简写。<br>
而 JavaScript 的正则引擎是 NFA，NFA 是“非确定型有限自动机”的简写。 <br>大部分语言中的正则都是 NFA，为啥它这么流行呢? <br>答:你别看我匹配慢，但是我编译快啊，而且我还有趣哦。


## 第五章 正则表达式拆分
1. 结构和操作符 例子1-1
2. 注意要点
3. 案例分析

**例子1-1**
结构和操作符总结：
![](https://i.loli.net/2019/07/02/5d1b0ad0c2aea57857.png)

竖杠的优先级最低，即最后运算。














































