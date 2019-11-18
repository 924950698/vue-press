# 前端自动化

## 1-1、 简介：什么是前端自动化？
防止bug产；带到线上造成更大的损失；<br>当前市场上流行的TypeScript， Eslint， flow， styleLint可以帮助我们提高代码质量，但是还不够。作为前端，前端自动化测试可以帮助我们提高代码的质量。自动化测试在后端已经比较普遍了，但是在前端普及的还比较少。<br>本次只作3种测试的讲解：
1. 单元测试 (白盒-知道代码逻辑，写代码来测试；测试方法函数)(注：黑盒测试：不知道代码逻辑，通过点击功能去测试)
2. 集成测试 
3. End to End (端到端测试)

## 2-1、 正文

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


 2. 集成测试 
 3. End to End (端到端测试)

## 2-3、使用Jest修改自动化测试样例
1. npm init生成包工具，下载jest@14.8.0版本,package.json中script命令test替换为jest
2. 将math.js作为一个模块导出，
```
    function add(a, b) {
        return a + b;
    }

    function minus(a, b) {
        return a - b;
    }


    module.exports = {
        add,
        minus
    }

```
3. 在math.test.js中引入模块：
```
    const math = require("./math.js");
    const { add, minus } = math;

    test('测试加法 3 + 7', () => {
        expect(add(3, 7)).toBe(10)
    })

    test('测试减法 3 - 3', () => {
        expect(minus(3, 3)).toBe(0)
    })
```

4. 运行命令： npm run test ，运行正确时结果如下图：
![微信图片_20191117125438.png](https://i.loli.net/2019/11/17/FB8dlSRgC7hcyxI.png)
<br>运行报错时如下图：
![](https://i.loli.net/2019/11/17/CfjDyQUrh8e76OJ.png)

5. 为什么math.js导出的需要时一个模块？<br>
因为jest框架在前端帮助我们完成的是两类的内容：单元测试（单个模块测试）， 集成测试（多个模块测试）；必须要把math.js改造成一个模块，才能符合jest两大测试类型的要求。

## 2-4 Jest简单配置
1. Jest包含默认配置，要更改现有配置，使其更加丰富。类似WebPack
2. ```npx jest --init``` 进行一个初始化。之后会出现：是否选择jsdom环境；代码覆盖率报告；自动清除事件。完成以后出现jest.config.js文件（常用的jest配置都在这里）。
将代码覆盖率报告放在coverage目录下
#### 1. code代码覆盖率 
执行```npx jest --coverage```生成代码覆盖率报告。
![微信图片_20191118155550.png](https://i.loli.net/2019/11/18/qciu1avmgX6h4TW.png)

会生成一个coverage目录，该目录下有一个index.html文件。打开该文件后，可以直观的看到当前代码覆盖率是100%，
![微信图片_20191118155556.png](https://i.loli.net/2019/11/18/YNeUnKuBPXT5F3o.png)
3. jest.config.js中的coverageDirectory可以更改打包报告目录的名字。
另外也可以在package.json中将命令替换成```coverage: jest --coverage```,之后在执行npm run coverage就生产code测试报告了。
4. 在项目中使用EsModule语法对模块进行导出和使用，但是在node环境下不支持，需要使用babel转成commonJs的代码。
5. 下载babel版本：```npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D```。使用babel时对babel进行配置，创建.babelrc文件，在里面写
```
    "persets": [
        ["@babel/preset-env", {
            "targets": {
                "node": "current"
            }
        }]
    ]
```
含义：当前node环境不支持import语句，使用```@babel/preset-env```对import语句进行转换，转换成commenJS语法，node和Jest就可以识别了。
6. 执行npm run jest后，jest内部集成了babel-jest插件，它会检测当前环境是否安装了babel-core，<br>如果有，就会去取.babelre配置。<br>在运行测试之前，结合babel，先把代码做一次转换<br>运行转化过的测试用例，就符合commonJs规范