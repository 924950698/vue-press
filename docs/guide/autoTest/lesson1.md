# 前端自动化【[源码链接](https://github.com/924950698/autoTest)】

## 1-1 简介：什么是前端自动化？
防止bug产；带到线上造成更大的损失；<br>当前市场上流行的TypeScript， Eslint， flow， styleLint可以帮助我们提高代码质量，但是还不够。作为前端，前端自动化测试可以帮助我们提高代码的质量。自动化测试在后端已经比较普遍了，但是在前端普及的还比较少。<br>本次只作3种测试的讲解：
1. 单元测试 (白盒-知道代码逻辑，写代码来测试；测试方法函数)(注：黑盒测试：不知道代码逻辑，通过点击功能去测试)
2. 集成测试 
3. End to End (端到端测试)

## 2-2 正文: 自动化测试原理
### 1. 单元测试
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

## 2-3 使用Jest修改自动化测试样例
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
3. jest.config.js中的coverageDirectory可以更改打包报告目录的名字。另外也可以在package.json中将命令替换成```coverage: jest --coverage```,之后在执行npm run coverage就生产code测试报告了。<br>
4. 在项目中使用Esmodule语法对模块进行导出和使用，但是在node环境下不支持，需要使用babel转成commonJs的代码。<br>
5. 下载babel版本：```npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D```。使用babel时对babel进行配置，创建.babelrc文件，在里面写
```
{
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "node": "current"
            }
        }]
    ]
}
```
含义：当前node环境不支持import语句，使用```@babel/preset-env```对import语句进行转换，转换成commenJS语法，node和Jest就可以识别了。<br>
6. 执行npm run jest后，jest内部集成了babel-jest插件，它会检测当前环境是否安装了babel-core，<br>如果有，就会去取.babelre配置。<br>在运行测试之前，结合babel，先把代码做一次转换<br>运行转化过的测试用例，就符合commonJs规范

7. 大家如果想了解更多，可以去[Jest官网](https://jestjs.io/docs/en/getting-started.html)看一下，有详细的配置介绍说明和与ts的结合。

## 2-5 Jest中的匹配器
1. 删除math.js; math.test.js改名字为matchers.test.js并只保留一个测试用例。( ```--watchAll```监视代码改动，自动执行)
### 常用的类型匹配器
2. toBe 是匹配器 matchers 类似 object.is === 
```
//假如用toBe测试以下内容：
 test('测试对象a与对象a相等', {
     const a = {a: 1};
     expect(a).toBe({a: 1});
 })

 // 这里由于指向的地址不一样，所以会报错。类似toBe()这种匹配器有很多种，下面介绍一下
```
3. toEqual () 只匹配内容，不匹配引用
4. toBeNull() 可以用来匹配null, undefined; 布尔类型
5. toBeUndefined() 前者匹配a是未定义的； toBeDefined() 后者匹配a是定义过的
6. toBeTruthy() 匹配a是否为真； toBeFalsy()匹配a是否为假
7. not() 取反匹配器
```
 test('not匹配器', {
    const a = 1;
    expect(a).not.toBeFalsy();
    expect(a).toBeTruthy();
 })

 // a取false的反值，就相当于a为true
```
8. Jest中有很多这种匹配器，我们不需要都记住，只需要记住其中核心的几个匹配器即可。
### 常用的数字相关的匹配器：
1. toBeGreaterThan()  匹配count比期望值大
```
test('toBeGreaterThan', {
    const count = 10;
    expect(count).toBeGreaterThan(9);
})

//匹配count比期望值9大
```
2. toBeLessThan() 匹配count比期望值小
3. toBeGreaterThanOrEqual() 匹配count大于等于期望值
``` 
test('toBeGreaterThanOrEqual', {
    const count = 10;
    expect(count).toBeGreaterThanOrEqual(10);
})

// 通过
```
4. toBeLessThanOrEqual() 匹配count小于等于期望值
5. toBeCloseTo() 匹配浮点数相加减的运算
```
test('toBeCloseTo', {
    const a = 0.1;
    const b = 0.2;
    expect(a+ b).toBeCloseTo(0.3);
})

// 通过，在js中存在浮点数溢出的情况，不能用toEqual()
```

### 常用的字符串相关的匹配器
1. toMathch() 匹配变量中是否包含某个字符串
```
test('toBeCloseTo', {
    const str = 'http://www.Allan-Liu.com';
    expect(str).toBeMatch('Allan-Liu');//通过
    expect(str).toBeMatch(/Allan-Liu/);//通过
    expect(str).toBeMatch(/AllanLiu/); //失败
})
```

### 常用的数组相关的匹配器
1. toContain() 匹配数组中是否包含某一项 （比较常用）
```
test('toContain', {
    const arr = ['www', 'Allan', 'Liu'];
    // 或者 const arr1 = new Set(arr); 结果都是一样的（set和数组不同之处：元素都是唯一） 
    expect(arr).toContain('Allan');//通过
    expect(arr).toContain(/AllanLiu/); //失败
})
```

### 常用的处理异常情况的匹配器
1. toThrow()
```
const throwNewErrorFunc = () => {
    Throw new Error('this is a new error');
}

test('toThrow', {   
    expect(throwNewErrorFunc).toThrow() // 通过
    expect(throwNewErrorFunc).toThrow('this is a new error') // 通过
    expect(throwNewErrorFunc).toThrow('aaa') // 失败，必须要一致
    expect(throwNewErrorFunc).toThrow(/this is a new error/) // 通过，正则也是可以的
})

//throwNewErrorFunc()是异常函数，toThrow()与该函数匹配
```

#### 以上并不是Jest中全部的匹配器，了解详情请戳[Jest官网](https://jestjs.io/docs/en/using-matchers)，了解更多请戳[Jest官网](https://jestjs.io/docs/zh-Hans/expect)

## 2-6 Jest命令行工具的使用
1. 用命令行启动vscode，在`ctrl+shift+p`中搜索下载install code command in PATH。如果搜不到有可能已经添加完成了。如下图：<br>
![微信图片_20191119122327.png](https://i.loli.net/2019/11/19/tHrxfmj8Vw2okMG.png)
2. 运行npm run test时， 命令行一些按键的作用： （必须是使用git代码管理，Jest才知道哪些是改变的文件） <br >
f: 只测试之前没有通过的用例，通过的不在测试。再次点击f退出模式<br >
a: 任何一个测试文件发生了改变，运行所有的测试用例<br >
o: 当更改一个文件的时候，只运行这个文件里的测试用例<br >
t: 过滤模式，输入一个单词，执行以该单词结尾的用例<br >
q: 退出对代码的监控<br >
Enter：按回车重新运行测试 <br >
p: 筛选， 文件发生改变时，根据文件名称匹配关键词<br >


### Jest学习暂停