# 前端自动化

## 一、 简介：什么是前端自动化？
防止bug产；带到线上造成更大的损失；<br>当前市场上流行的TypeScript， Eslint， flow， styleLint可以帮助我们提高代码质量，但是还不够。作为前端，前端自动化测试可以帮助我们提高代码的质量。自动化测试在后端已经比较普遍了，但是在前端普及的还比较少。<br>本次只作3种测试的讲解：
1. 单元测试 (白盒-知道代码逻辑，写代码来测试；测试方法函数)(注：黑盒测试：不知道代码逻辑，通过点击功能去测试)
2. 集成测试 
3. End to End (端到端测试)

## 二、 正文

### 1. 单元测试  【[源码链接]()】
1. 创建index.html，math.js, math.test.js三个文件
2. 在math.js中创建两个函数方法，并在index.html中引入math.js
```
    function add(a, b) {
        return a + b;
    }

    function minus(a, b) {
        return a * b;
    }
```
3. 在math.test.js中嵌入测试代码:
```
    var result = add(3, 7);
    var expected = 10; 

    if(result !== 10) {
        throw Error(`3 + 7 应该等于 ${expected}, 但是却是${retult}`);
    }

    var result = minus(3, 3);
    var expected = 0;

    if(result !== 0) {
        throw Error(` 3 - 3 应该等于${expected}, 但是却是${result} `);
    }
```
4. 验证：在浏览器中打开index.html文件，在控制台中可以输入add 或者 minus并回车可以看到该函数体；然后将math.test.js的代码粘贴到控制台中，按回车执行测试函数，显示结果：
![微信图片_20191116224820.png](https://i.loli.net/2019/11/16/p4T3NgZs2mCALKD.png)

在控制台中可以明显检查到，减法函数报出的错误信息，方便开发人员快速修改。

5. 思考，能不能对上面的重复代码做一个封装呢？
```
// 创作一种语法做测试
    function expect(result) {
        return {
            toBe: function(actual) {
                if(result !== actual) {
                    throw Error(`当前值不符合预期值， 预期是${actual}，结果是 ${result}`)
                }
            }
        }
    }

    function test(desc, fn) {
        try {
            fn()
            console.log(`${desc} 通过测试`);
        }catch (e) {
            console.log(`${desc} 没有通过测试 ${e}`);
        }
    }

    test('测试加法 3 + 7', () => {
        expect(add(3, 7)).toBe(10)
    })

    test('测试减法 3 - 3', () => {
        expect(minus(3, 3)).toBe(10)
    })
```
粘贴到控制台中，显示为：
![微信图片_20191116225647.png](https://i.loli.net/2019/11/16/tvRG4hQ7kxAu2TF.png)

上面代码中，封装了expect方法来进行值比较，封装了test方法补充测试的描述信息。其实和当前市面上比较主流的测试框架Mocha， Jest里里面的语法原理都差不多。


### 2. 集成测试 

### 3. End to End (端到端测试)