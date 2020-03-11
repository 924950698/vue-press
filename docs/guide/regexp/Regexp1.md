# 正则二

```type={1,2,11,12}
/***
 *
 * ███████▒█    ██  ▄████▄   ██ ▄█▀       ██████╗ ██╗   ██╗ ██████╗
 * ▓██   ▒ ██  ▓██▒▒██▀ ▀█   ██▄█▒        ██╔══██╗██║   ██║██╔════╝
 * ▒████ ░▓██  ▒██░▒▓█    ▄ ▓███▄░        ██████╔╝██║   ██║██║  ███╗
 * ░▓█▒  ░▓▓█  ░██░▒▓▓▄ ▄██▒▓██ █▄        ██╔══██╗██║   ██║██║   ██║
 * ░▒█░   ▒▒█████▓ ▒ ▓███▀ ░▒██▒ █▄       ██████╔╝╚██████╔╝╚██████╔╝
 *  ▒ ░   ░▒▓▒ ▒ ▒ ░ ░▒ ▒  ░▒ ▒▒ ▓▒       ╚═════╝  ╚═════╝  ╚═════╝
 *  ░     ░░▒░ ░ ░   ░  ▒   ░ ░▒ ▒░
 *  ░ ░    ░░░ ░ ░ ░        ░ ░░ ░
 *           ░     ░ ░      ░  ░
 */

```
# 第一章 正则表达式字符匹配攻略

## 正则要么匹配字符，要么匹配位置。
元字符：
* 两种模糊匹配
* 字符组
* 量词
* 分支结构
* 案例分析

1. 纵向匹配 和 横向匹配
2. 字符组：范围表示法 [] ， 
 <br> 排除字符组 ^（脱字符），
 <br> 范围字符组 /d , /D , /w , /W , /s , /S 和 . 七种。请看下图：



3. 量词 
**简写形式** {m,}
4. 贪婪与惰性匹配
**贪婪匹配：** 条件范围内，越多越好。<br>
**惰性匹配：** 条件范围内，尽可能少的匹配。通过在量词后面加个？就可以实现惰性匹配。

5. 多选分支
| （管道符，或）也是惰性的，匹配上以后就不会在继续匹配了。

6. 匹配十六进制的颜色

```type={15}
var regex = /#\w{3,6}/ig
var string = "#ffbbad #Fc01DF #FFF #ffE";
console.log( string.match(regex) );
//输出：#ffbbad #Fc01DF #FFF #ffE

var regex = /#\w{3,6}$/ig
var string = "#ffbbad #Fc01DF #FFF #ffE";
console.log( string.match(regex) );

/* 重点1：
	加上$符号以后，为啥只能匹配一条 #ffE ？
	$限定结尾，又因为正则表达式中，含有“#”；所以只能是从最后一个“#”开头的字符串开始。
*/

//如果换成：var regex = /^#\w{3,6}$/ig

/* 重点2：
	结果就会变成null。因为：string是一个字符串，不是4个字符串。
	而以“#”号开头，以最后一位字母结尾。已经不是在3-6位之间了。
	所以，string是不符合regex规则的，返回null。
*/
```

7. 匹配时间（以24小时为例），实现以下匹配:

**23:59 <br>
02:07**

```type={1}
//这道题需要想一下，24时制的4位数字分别有什么特征。

var regex = /([01][0-9]|[2][0-3]):([0-5][0-9])/g
var date = '23:59 02:07'
console.log(date.match(regex))// 输出23:59 02:07
```

现在加入也需要匹配：7:9 （时分前面的“0”可以省略）的情况呢？
```
  var regex = /(0?[0-9]|1[0-9]|[2][0-3]):(0?[0-9]|[1-5][0-9])/g;
  var date = '23:59 02:07 7:9'
  console.log(date.match(regex))//输出：23:59 02:07 7:9
```
**Tips：**<br>
	写到这，觉得"^" 和 "$"这两个字符有必要总结一下。这两个限定符不能随便用，之前没注意到，踩了太多坑。<br>如果想匹配这种"aa ab ac ba bd"
的字符串格式下的子串。一旦限定开头和结尾，由于搜索的是一整个字符串，所以结果马上就变得截然相反。大家慎用。

8. 匹配日期 2017-09-09

```
	var regex = /[0-9]{4}\-(0?[1-9]|1[0-2])\-([0-2][0-9]|3[0-1])/g
	var date = '2017-09-09'
	console.log(date.match(regex))
```

**上面的正则没有考虑到“日”为一位数时，不能是0的情况。即“2019-09-00”，正常情况下是不会有这种情况出现的。**

```
	/[0-9]{4}\-(0?[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])/g
```

**Tips：**
另外，使用“[]”范围符时，如果是1-2，2-3这种相邻的范围。可以把-省略掉。

9. window 操作系统文件路径匹配

**因为文件夹的名字不能是特殊字符，那么就要首先确定一个问题：js的正则中的特殊字符都有哪些？**

```
初步断定有以下几种：
~!@#$%^&*()/\|,.<>?"'();:_+-=\[\]{}

var regex = /^[a-zA-Z]:\\([^\\:*<>|"?\r\n/]+\\)*([^\\:*<>|"?\r\n/]+)?$/;
console.log( regex.test("F:\\study\\javascript\\regex\\regular expression.pdf") );
console.log( regex.test("F:\\study\\javascript\\regex\\") );
console.log( regex.test("F:\\study\\javascript") );
console.log( regex.test("F:\\") );
// => true
// => true
// => true
// => true
```

10. 匹配id

```
var string='<div id="container" class="main"></div>'
var regex = /id=".*"/
输出：id="container" class="main"

Tips:
	因为*是贪婪匹配，所以会一直匹配到最后一个"才结束。
	所以，我们加一个?使用非贪婪模式来匹配即可。

var string='<div id="container" class="main"></div>'
var regex = /id=".*?"/
输出：id="container"
```

**后记：**
<br>	这一章练习一些基本的正则操作习题。


----------


```
/***
 * ┌───┐   ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┬───┐ ┌───┬───┬───┐
 * │Esc│   │ F1│ F2│ F3│ F4│ │ F5│ F6│ F7│ F8│ │ F9│F10│F11│F12│ │P/S│S L│P/B│  ┌┐    ┌┐    ┌┐
 * └───┘   └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┴───┘ └───┴───┴───┘  └┘    └┘    └┘
 * ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───────┐ ┌───┬───┬───┐ ┌───┬───┬───┬───┐
 * │~ `│! 1│@ 2│# 3│$ 4│% 5│^ 6│& 7│* 8│( 9│) 0│_ -│+ =│ BacSp │ │Ins│Hom│PUp│ │N L│ / │ * │ - │
 * ├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─────┤ ├───┼───┼───┤ ├───┼───┼───┼───┤
 * │ Tab │ L │ X │ D │ R │ T │ Y │ U │ I │ O │ P │{ [│} ]│ | \ │ │Del│End│PDn│ │ 7 │ 8 │ 9 │   │
 * ├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤ └───┴───┴───┘ ├───┼───┼───┤ + │
 * │ Caps │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  │               │ 4 │ 5 │ 6 │   │
 * ├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────────┤     ┌───┐     ├───┼───┼───┼───┤
 * │ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│  Shift   │     │ ↑ │     │ 1 │ 2 │ 3 │   │
 * ├─────┬──┴─┬─┴──┬┴───┴───┴───┴───┴───┴──┬┴───┼───┴┬────┬────┤ ┌───┼───┼───┐ ├───┴───┼───┤ E││
 * │ Ctrl│    │Alt │         Space         │ Alt│    │    │Ctrl│ │ ← │ ↓ │ → │ │   0   │ . │←─┘│
 * └─────┴────┴────┴───────────────────────┴────┴────┴────┴────┘ └───┴───┴───┘ └───────┴───┴───┘
 */
```

# 第二章 正则表达式位置匹配攻略


## 零宽断言

| 写法 | 名称 | 含义 | 
| ------ | ------ | ------ |
| exp1(?=exp2) | 正向前瞻 | 查找exp2前面的exp1 |
| (?<=exp2)exp1 | 负向前瞻 | 查找exp2后面的exp1 |
| exp1(?!exp2) | 正向后瞻 | 查找后面不是exp2的exp1 | 
| (?<!exp2)exp1 | 负向后瞻 | 查找前面不是exp2的exp1 |
**更方便大家理解，举一个例子：**
1. 正向先行断言(正向零宽断言)
```
'中国人'.replace(/中(?=国人)/, 'rr')
输出：rr国人
```

2. 反向先行断言
```
'中国人'.replace(/(?<=中国)人/, 'rr')
输出：中国rr
```

3. 负正向先行断言（负向零宽断言）
```
'中国人中'.replace(/中(?!国人)/, 'rr')
输出："中国人rr"
```

4. 负反向先行断言

```
'中国人中'.replace(/中(?<!国人)/, 'rr')
输出："rr国人中"

"abZWab863ab88".replace(/(?<![A-Z])ab/g, "")
输出："ZWab86388"
```

**腾讯曾经出过这样一道面试题：<br>如何给一串数字用千分制表示？比如9999999999变成9，999，999，999。**

```
'99999999999'.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')

//这种是带小数点的千分制正则表达式：
'99999999999.02'.replace(/\d{1,3}(?=(\d{3})+(?:\.\d{1,2})?$)/g, '$&,');
```

**要想解答这道题，需要了解以下几个知识点：**
1. replace与正则约定的特殊标记符$
2. 分组语法
3. 贪婪与非贪婪模式

**1. replace()方法与正则约定的特殊标记符$**
| 写法 | 含义 |
| ------ | ------ |
| $i | (i:1-99),表示从左到右正则子表达式所匹配的文本 |
| $& | 表示与正则表达式匹配的全文本 |
| $\` | `：切换技能键。表示匹配字符串左边的文本 | 
| $$ | 表示$转移 |

**Tips:** 另外多说一句：就在刚刚，发现markdown也支持正则写法。。:sweat_smile:	
:scream:	
```
| $\` | `：切换技能键。表示匹配字符串左边的文本 | 
```
**2. 分组语法：**
| 写法 | 含义 |
| ------ | ------ |
| 捕获 |
| (exp) | 匹配exp,并捕获到自动命名到组里 |
| (?\<name>exp) | 匹配exp，并捕获文本到名称为name到组里 |
| (?:exp) | 匹配exp，不捕获匹配的文本 | 
| 位置指定 |
| exp1(?=exp2) | 查找exp2前面的exp1 |
| (?<=exp2)exp1 | 查找exp2后面的exp1 |
| exp1(?!exp2) | 查找后面不是exp2的exp1 | 
| (?<!exp2)exp1 | 查找前面不是exp2的exp1 |
| 注释 |
| (?#comment) | 这种类型的组不对正则表达式对处理产生任何影响，只是为了提供让人阅读注释 |

**3. 贪婪与非贪婪模式：**
| 写法 | 含义 |
| ------ | ------ |
| 元字符 | 所有元字符，默认为贪婪模式 |
| ? | 非贪婪模式 |

接下来。我们回到这道题上来看：
```
'99999999999'.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
```

**解析：**
1. 这里我们采用的是 ```epx1(?=epx2)```（**正向前瞻**）<br>
2. epx1对应的是正则符号是```\d```。<br>因为第一个逗号之前的数字范围在1-3个之间，所以限定范围	```\d{1-3}```。
3. 然后，exp2对应的是需要限定每3位数字添加一个```,```<br> 所以```epx2```的正则表达应该是：```(\d{3}+$)```（+：出现1次或多次；$:限定以xxx结尾）
4. 最后，replace()方法第二个参数：使用```$&```符号。<br>```$&,```表示捕获```与正则表达式匹配的全文本```并置换为```,```
5. 这样写来下就是```'99999999999'.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')```

接下来：做一道扩展题：
有小数点的```'99999999999.02'```做千分之转换，要怎样写呢？

## 写法一

```
'99999999999.02'.replace(/\d{1,3}(?=(\d{3})+(?:\.\d+)?$)/g, '$&,')
输出："99,999,999,999.02"

'99999999999.33333333'.replace(/\d{1,3}(?=(\d{3})+(?:\.\d+)?$)/g, '$&,')
输出："99,999,999,999.33,333,333"
```

## 写法二
正则表达式的写法大多数的时候都不止一种。
千分之表达的另外的一种写法是：
```
"123456789.12123".replace(/(?!^)(?=(\d{3})+(?:\.\d+)?$)/g, ',')
```
**Tips：** 这种写法与之前的写法最大的区别就是：将exp1的部分改为限定字符串的开头不可以添加```,```

## 第二章 正则表达式位置匹配

**前言：**
<table><tr><td bgcolor=PowderBlue>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;正则表达式根本作用是一种“匹配模式”。要么匹配字符，要么匹配为位置。本章就讲讲关于正则位置匹配的知识：</td></tr></table>

1. <font face="黑体" color="red">什么是位置呢？</font>

位置“锚”是相邻字符之间的位置。下图箭头所示的地方就是。

![](https://i.loli.net/2019/07/01/5d195f88d387875631.png)

2. <font face="黑体" color="red">如何匹配位置呢？</font><br>
在ES5中，有6个锚：^ $ \b \B (?=exp) (?!exp)

| 写法 | 含义 |
| ------ | ------ |
| ^ | 脱字符，匹配开头，在多行匹配中匹配开头 |
| $ | 美元符，匹配结尾，在多行匹配中匹配结尾 |
| \b | 单词边界，具体是\w和\W之间的位置；也包括\w和^之间的位置，\w和$之间的位置。 |
| \B | \b的反面意思，非单词边界。<br>具体来说是：是 \w 与 \w、 \W 与 \W、^ 与 \W，\W 与 $ 之间的位置。 |
| (?=exm) | 该字符后面的位置要匹配exm |
| (?!exm) | 该字符后面的位置不可以是exm |



<table><tr><td bgcolor=PowderBlue>
\b 和 \B 和 ?=exm 和 ?!exm的例子：

1. \b的例子：
```
"[JS] Lesson_01.mp4".replace(/\b/g, '#')
"[#JS#] #Lesson_01#.#mp4#"

//大家思考：为什么会是这样的呢？
```
**解析：**<br>
第 1 个，两边字符是 "[" 与 "J"，是 \W 与 \w 之间的位置。<br>
第 2 个，两边字符是 "S" 与 "]"，也就是 \w 与 \W 之间的位置。<br> 
第 3 个，两边字符是空格与 "L"，也就是 \W 与 \w 之间的位置。<br> 
第 4 个，两边字符是 "1" 与 "."，也就是 \w 与 \W 之间的位置。<br>
第 5 个，两边字符是 "." 与 "m"，也就是 \W 与 \w之间的位置。<br>
第 6 个，位于结尾，前面的字符 "4" 是 \w，即 \w 与 $ 之间的位置。<br>
tips：两边字符是^和"["，不是\w和^之间到位置。所以没有#。

2. \B的用法：
```
"[JS] Lesson_01.mp4".replace(/\B/g, '#');
输出：'#[J#S]# L#e#s#s#o#n#_#0#1.m#p#4'
```
解析: "]"与空格，属于\W与\W之间的范围。所以加 “#”号。

3. ?=exm 和 ?!exm的用法：
```
"hello".replace(/(?=l)/g, '#') // => "he#l#lo"
"hello".replace(/(?!l)/g, '#') // => "#h#ell#o#"
```

</td></tr></table>

3. 位置的特性：
对于位置的理解，我们可以理解成空字符""。<br>
可以是这样的：
```
"hello" == "" + "h" + "" + "e" + "" + "l" + "" + "l" + "" + "o" + "";
```

也可以是这样的：
```
"hello" == "" + "" + "hello"
```

4. 相关案例：

```
不匹配任何东西的正则：/.^/ （.是除换行符之外的任意单个字符）
此正则要求只有一个字符，且该字符后面是开头。这样的正则是不存在的。
```

5. 数字的千分位分隔符表示法。[链接](https://juejin.im/post/5d1702ed6fb9a07ef1619796)

6. 格式化

```
1888 => $1888
'1888'.replace(/^/, '$') 
```

7. 验证密码问题
**密码长度6-12位，由数字和小写字符和大写字母组成。必须包括两种字符。**
```
/.*[0-9]/
任意字符 0次或无数次 数字0到9
数字0-9中的任意字符出现0或很多次

^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$

下面是作者老姚的写法：
/((?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])|(?=.*[a-z])(?=.*[A- Z]))^[0-9A-Za-z]{6,12}$/

或者

/(?!^[0-9]{6,12}$)^[0-9A-Za-z]{6,12}$/;

```








































