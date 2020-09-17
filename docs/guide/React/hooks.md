# React - hooks

## Hook是什么?
1. Hook 是什么？<br> Hook 是一个特殊的函数，它可以让你“钩入” React 的特性。例如，useState 是允许你在 React 函数组件中添加 state 的 Hook。
2. 产生原因：可利用js的闭包机制，不用额外的api。

## useState() 一些介绍
1. <b> 调用 useState 方法的时候做了什么?</b> <br>
它定义一个 “state 变量”。可以叫任何名字。这是一种在函数调用时保存变量的方式 —— useState 是一种新方法，它与 class 里面的 this.state 提供的功能完全相同。
2. <b> useState 需要哪些参数？</b> <br>
useState() 方法里面唯一的参数就是初始 state
```
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量
  const [count, setCount] = useState(0);
```
等号左边名字并不是 React API 的部分，数组解构,你可以自己取名字<br>
```
const [fruit, setFruit] = useState('banana');
```
count是‘state变量’<br>
0是count变量的初始值<br>
如果想在state中存褚两个变量，只需要调用useState()两次即可。<br>
我们声明了一个叫 count 的 state 变量，然后把它设为 0。React 会在重复渲染时记住它当前的值，并且提供最新的值给我们的函数。我们可以通过调用 setCount 来更新当前的 count。<br>
3. <b>useState 方法的返回值是什么？</b><br>
返回值为：当前 state 以及更新 state 的函数。<br>
这就是我们写 const [count, setCount] = useState() 的原因。这与 class 里面 this.state.count 和 this.setState 类似，唯一区别就是你需要成对的获取它们。

## useEffect() 一些介绍
### 总结的几个特性：
1. Dom更新完毕，每次渲染后都会执行（替代旧API的 componentDidMount、componentDidUpdate、componentWillUnmount）
2. 提供清除函数。（每个useEffect中都返回一个函数，该函数将会在componentWillUnmount时刻执行）
3. 避免更新逻辑的常见bug （ componentDidUpDate(prevProps, prevState) ）
4. 性能优化 (根据判断count值是否发生变化来决定知否执行useEffect，该参数为选填项，不填时，默认执行一次)
```
    useEffect(()=>{
        ...
    }, [count]);
```
5. 按照调用顺序执行useEffect()。Hook在组件最顶层调用。
6. Hook使用规则：不可在循环、表达式、嵌套中用Hook。
7. 自定义Hook：将可复用的Hook封装成Hook函数，必须以use开头
8. 多个Hook共享信息：useState中声明的state变量可以在serEffect中使用。
9. Hook-API： Hook将一些常用的API进行了统一封装。
<br/>基础Hook包括：useState、useEffect、useContext等；
<br/> 额外Hook包括：useReducer、useCallback、useMemo、useRef、useImperativeHandle、useLayoutEffect、useDebugValue
