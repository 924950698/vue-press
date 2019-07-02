Regex2.md

## \b 和 \B 和 ?=exm 和 ?!exm的例子：
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
tips: "]"与空格，属于\W与\W之间的范围。所以加 “#”号。

3. ?=exm 和 ?!exm的用法：
```
"hello".replace(/(?=l)/g, '#') // => "he#l#lo"
"hello".replace(/(?!l)/g, '#') // => "#h#ell#o#"
```