---
title: JavaScript相关八股
layout: ../../../layouts/PostLayout.astro
---

## WeakMap和Map的区别，什么时候要用WeakMap

### 强引用和弱引用是什么

- `Map` 的键可以是任意类型，`WeakMap` 只接受对象作为键（null除外），不接受其他类型的值作为键
- `Map` 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键； `WeakMap` 的键是弱引用，键所指向的对象可以被垃圾回收，此时键是无效的
- `Map` 可以被遍历， `WeakMap` 不能被遍历

## 如何用js实现异步（答了个async和await）

### async和await要如何实现

Async 和 await 是generator 的语法糖。

```JavaScript
function* generator(){
    const a = yield request(1);
    console.log(b);
}

const gen = generator();
gen.next().value.then(xxxxx)
```

## setTimeout和setInterval 有什么区别，他们有什么问题，为什么

区别：setTimeout 是delay后执行一次， setInterval是每 delay执行一次

问题：会出现偏差

`setTimeOut`和 `setInterVal`中时间参数并不是到点就立即执行，而是到点将其回调事件加入事件队列中。按照队列先进先出的性质，该回调事件到点之后是否能执行取决于是否属于队列首位，如果前头还有其他事件在等待，则不能按点执行

### setTimeout 和 setInterval 要怎么校对？

倒计时纠偏，使用setTimeout 模拟 setInterval

```JavaScript
const interval = 1000
let ms = 50000,  // 从服务器和活动开始时间计算出的时间差，这里测试用 50000 ms
let count = 0
const startTime = new Date().getTime()
let timeCounter
if( ms >= 0) {
  timeCounter = setTimeout(countDownStart, interval)
}

function countDownStart () {
   count++
   const offset = new Date().getTime() - (startTime + count * interval) // A
   let nextTime = interval - offset
   if (nextTime < 0) {
       nextTime = 0
   }
   ms -= interval
   console.log(`误差：${offset} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${ms} ms`)
   if (ms < 0) {
     clearTimeout(timeCounter)
   } else {
     timeCounter = setTimeout(countDownStart, nextTime)
   }
 }
```

## Web Worker 相关

### JS如何创建多线程环境呢？

- Webworker

### webworker有什么限制

Worker 线程所在的全局对象，与主线程不一样，无法读取主线程所在网页的 DOM 对象，也无法使用document、window、parent这些对象。但是，Worker 线程可以使用navigator对象和location对象。

### 如何在同源下的不同tab共享worker

Shared Worker

### 三种Worker的区别

- Web Worker

适合高密度计算的场景，开一个同步线程，不阻塞主线程

- Shared Worker

能够在不同Tab间通信

- Service Worker

用于缓存资源，网络优化等

## 闭包

### 介绍一下JS的闭包是什么

- 如果一个函数，它能够访问它被定义处的词法作用域，那么就构成了闭包。
- 闭包（closure）是一个**函数以及其捆绑的词法环境**的引用的组合。

## JS的事件循环

### 简单介绍一下JS的事件循环

概念：事件循环的出现是用来解决js单线程的问题。js是一门单线程编程语言，遇到一些耗时较长的任务，js会暂停并等待这个任务执行完，后续任务无法执行。事件循环可以解决这个问题

### 执行一个微任务的时候，如果有一个新任务插入进来了，怎么办？

如果一个微任务通过调用 `queueMicrotask()`, 向队列中加入了更多的微任务，**则那些新加入的微任务会早于下一个任务运行** 。这是因为**事件循环会持续调用微任务直至微任务队列中没有留存的**，即使是在有更多微任务持续被加入的情况下。

## JS作用域

### 这一段的输出结果是什么

```JavaScript
function changeObjProp(o) {
  o.siteUrl = "www.baidu.com";
  o = new Object();
  o.siteUrl = "www.google.com";
}
let web = new Object();
changeObjProp(web);
console.log(web.siteUrl);
```

答案是：[baidu.com](http://baidu.com)

在JavaScript中，对象是通过引用传递的。当你传递一个对象作为参数给函数时，实际上传递的是对象的引用（内存地址），而不是对象的副本。因此，在 `changeObjProp`函数内部，`o`指向的是传入的 `web`对象的引用，所以 `o.siteUrl`的值被改变为 `"``www.baidu.com``"`。

但是，当在函数内部重新创建一个对象 `o`并设置其 `siteUrl`属性时，并不会影响外部的 `web`对象

因为**重新分配\*\***`o`\***\*只会在函数的作用域内生效，并不会改变外部传入的对象**。

### js为什么要设计作用域，有方法能够突破作用域，在js里面是怎么做的

编译器给我们提供了管理变量的能力，让程序拥有了状态。作用域就是为了管理变量而定制的一套规则，它解决了

**变量存在哪里？去哪里获取？怎么隔离的问题？**

## JS中的数据结构 堆/栈

![img](https://k16munf4oq2.feishu.cn/space/api/box/stream/download/asynccode/?code=NTBiNmIyMDg4MDk4NjdiZjVjMmM1MmYxYmQzMDJmNWVfd28xOHFmOG43NlNrWENCTmZSTmR0enBRRTlCVFpKeDNfVG9rZW46SkNhNGJDYTdSb0EydDB4aU9ERGNJSUlVbjFkXzE3MjgxNDQwMjI6MTcyODE0NzYyMl9WNA)

### JS的基本数据类型和引用数据类型

基本数据类型：string, number, boolean, undefined, Symbol, null,

基本数据类型存放在栈中，引用数据类型存放在堆中。这是因为栈的空间是固定分配的，基本数据类型能够预先分配定长空间，而堆的空间是动态分配的。

### JS拷贝和引用地址

当我们要访问堆内存中的引用数据类型时，实际上我们首先是**从栈中获取了该对象的地址引用（或者地址指针）**，然后再从堆内存中取得我们需要的数据。

访问引用类型时，会从栈中先拿到这个对象的引用

## 原型链与原型对象

### 说说什么是原型链，什么是原型对象

![img](https://k16munf4oq2.feishu.cn/space/api/box/stream/download/asynccode/?code=M2ZhNDNlZWNjZjc1NzgzODJhNWFmMjNmMDI4YTA0NDRfamw0T05QcmNCcTRYeFdYak1icUNCdmRocjUwMEFIQ1dfVG9rZW46WDd1cGJQMWZJb2ZUY3J4VVBXY2NzdzFjbmxnXzE3MjgxNDQwMjI6MTcyODE0NzYyMl9WNA)

JS的每个函数在创建的时候，都会生成一个属性 `prototype`，这个属性指向一个对象，这个对象就是此函数的 `原型对象`。JS函数new出来的实例的 `__proto__`属性指向原型对象。

原型对象

- 当我们在对象上访问一个属性或方法时，如果该对象本身没有这个属性或方法，JavaScript引擎会自动去该对象的原型对象上查找。

原型链

- 原型链是一种对象继承机制，它将对象的 `__proto__` 属性连接起来形成链条，从而实现属性和方法的共享与继承。原型链的顶端是null。

### 函数的原型是什么

Object

## JS中的继承

**JS中的继承一共有四种：**

### 原型链继承

```JavaScript
function Person() {
  this.name = "person";
}
function Child() {}
Person.prototype.getName = function () {
  console.log(this.name);
};

Child.prototype = new Person();
Child.prototype.constructor = Child;

const child1 = new Child();
child1.getName();
```

#### **缺点**：当原型对象中的属性为引用类型时（如数组），对其进行更改时，所有的实例都会更改，如下：

```JavaScript
const child1 = new Child();
const child2 = new Child();

child1.name.push("123");
child2.getName();
//此时：  child2.getName() 会输出 ['person', '123']
//但是我们 只改变了child1
```

### 构造函数继承

```JavaScript
function Person() {
  this.name = "person";
}
Person.prototype.getName = function () {
  console.log(this.name);
};

function Child(...args) {
  Person.apply(this, ...args);
}
```

缺点：无法继承父类prototype上的属性

```JavaScript
const child1 = new Child();
console.log(child1.name);
child1.getName(); //会报错找不到getName，因为没有继承父类prototype上的属性
```

### 组合继承

组合继承 = 原型链继承 + 寄生组合继承

```JavaScript
function Person() {
  this.name = "person";
}
Person.prototype.getName = function () {
  console.log(this.name);
};

function Child(...args) {
  Person.apply(this, ...args);
}
Child.prototype = new Person();
Child.prototype.constructor = Child;
const child1 = new Child();
console.log(child1.name);
child1.getName();
```

#### 缺点：Person中的属性被绑定了两次，且在子类的Prototype上绑定了父类自身的方法

### 寄生组合继承

```JavaScript
function Person() {
  this.name = "person";
}
Person.prototype.getName = function () {
  console.log(this.name);
};

function Child(...args) {
  Person.apply(this, ...args);
}
Child.prototype = Object.create(Person.prototype);
Child.prototype.constructor = Child;
```

#### 缺点：Object.create 会把Child原始的prototype覆盖掉，因此，如果要修改Child的prototype，应该将其放置在Object.create下方。

### 讲一下new的流程和原理

- **创建一个新对象**：
  - 首先，JavaScript 引擎会创建一个新的空对象，并且这个对象会**继承构造函数的** **`prototype`** **属性**。此时，已经建立了原型链。
  - 这个新对象类似于 `let obj = Object.create(Constructor.prototype);`。
- **绑定** **`this`**：
  - 接下来，构造函数会被执行，并且在构造函数内部，`this` 被绑定到新创建的对象上。换句话说，构造函数中的 `this` 现在指向这个新对象。
  - 这个绑定发生在构造函数执行时，`this` 的绑定是隐式的。
- **设置属性**：
  - 在构造函数中，可以通过 `this` 来给新创建的对象添加属性和方法。例如，`this.name = name;` 这样就把属性 `name` 绑定到了新对象上。
  - 这些属性的设置也是在构造函数执行时完成的。
- **返回新对象**：
  - 默认情况下，构造函数会返回新创建的对象。如果构造函数显式返回了一个对象，那么返回的将是这个对象而不是默认的新对象。如果显式返回的不是对象（例如返回一个基本类型），那么返回的还是默认的新对象。

### new的属性设置是在什么时候绑定的

在构造函数内部，this 被绑定到新创建的对象上。换句话说，构造函数中的 this 现在指向这个新对象。

## 内存泄漏

### JS中的内存泄漏有哪些

- 意外的全局变量
- 闭包问题导致内存泄漏
- 计时器没有及时清理
- DOM有引用，在被删除之后没有被GC回收

## 变量提升

### 请输出下列程序的结果

```JavaScript
var a = 100;
function fn() {
  alert(a);
  var a = 200;
  alert(a);
}
fn();
alert(a);
var a;
alert(a);
var a = 300;
alert(a);
undefined, 200,100,100,300
```

因为js的变量声明和变量赋值是分开的，所有的变量声明都会被提升至顶层

比如：

```JavaScript
function fn() {
  alert(a);
  var a = 200;
  alert(a);
}
//  会变为
function fn() {
  var a;
  alert(a);
  a = 200;
  alert(a);
}
```

## Webpack 和 Vite 相关

### Webpack 和 Vite相比快在哪里
