---
title: 浏览器相关
layout: ../../../layouts/PostLayout.astro
---

## **重排和重绘，reflow 和 repaint**

### 什么时候会重排，什么时候会重绘

### 重排如何优化

### 重绘为啥效率高，重排为啥效率低

## 浏览器渲染流程

### 请求到html，js，css后，是如何进行加载的？

## 浏览器事件

### 事件捕获，事件冒泡，事件委托

事件流：

**（1）捕获：从上到下**

从根元素开始，一直向下依次调用同名事件的回调。但是这个捕获需要手动绑定 `addEventLisener('click',fn,true)`;

**（2）冒泡：从下到上**

当一个元素的事件被触发时，同样的事件将会在该元素的所有祖先元素中依次被触发。这一过程被称为事件冒泡

冒泡是默认存在的

**（3）阻止事件传播：**

```
e.stopPropagation()
```

**（4）事件委托：**

重复绑定1000次子元素的事件性能非常差，选择在它们的共同父元素上绑定，使用 `e.target`来做事件委托。

### `event.target` 和 `event.currentTarget`的区别

**currentTarget始终是监听事件者，而target是事件的真正发出者**。

在做事件代理时，currentTarget能够获取到被监听的DOM，target能获取到真正需要触发事件的DOM

### `stopImmediatePropagation`，如何在事件劫持时的事件传递，如何阻止事件冒泡

- `stopPropagation` 这个方法用于阻止浏览器中的事件在的 捕获/冒泡阶段 的传播。
- `stopImmediatePropagation` 。这个方法可以理解为：`stopImmediatePropagation` = `stopPropagation` + **(移除其他事件监听程序)**

## 安全

### CSRF是什么

CSRF：跨站请求伪造

拿用户的登录状态（Cookie等）去第三方网站做一些事情

### XSS是什么

XSS：跨站脚本攻击

XSS 攻击是指攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在用户浏览网页时，**对用户浏览器进行控制或者获取用户隐私数据的一种攻击方式**。

### 同源策略是什么，同源策略限制了什么

如果两个 URL的**协议，域名，端口**相同，说明它们是同源的。

目的是为了保证用户信息的安全，防止恶意的网站窃取数据。

限制了三种行为：

（1） Cookie、LocalStorage 和 IndexDB 无法读取。

（2） DOM 无法获得。

（3） AJAX 请求不能发送。

### 聊聊跨域

### 如何绕过同源策略实现跨域

**后端**

- Access-Control-Allow-Origin：\*

**前端**

- 添加代理，代理到同一主机号，端口号下
- JSONP

严格来说，JSONP是一个BUG，在我们的html标签中，一些带src的标签是不会收到同源策略限制的，比如 `<script>`和 `<img>` 标签。那么我们可以利用这个特性来执行一些特殊的JS代码。比如在本地定义一个callFn，src填入服务器的地址。请求后，服务器返回一个函数调用的字符串，callFn(xxx)，达到跨域执行js代码的目的。

## 存储

### 在前端做数据存储的方案 有哪些？讲一讲他们分别的限制和使用场景

- localStorage（大小不超过5M）
- indexDB
- sessionStorage（会话存储，在关闭窗口后就没了）
- Cookie（大小不超过4k）

sessionStorage会在关闭当前页面后销毁，刷新当前页面不会

localStorage如果不主动清除，就会一直存在

IndexDB更像一个数据库，支持事务操作，容量更大，存的是一个对象，以kv的方式存储数据

### 如何监听localStorage 满了

- 监听变化：

```JavaScript
  window.addEventListener("storage", (e) => {
                // todo ...
                这里可以在写入的时候判断是否满了
  });
```

- 判断是否满：把所有的item取出来，判断长度是否大于5M

### localStorage 满了怎么解决

- 用IndexDB
- 维护一个Map，记录localstorage存入时机。此时localStorage会变为一个定长的队列。较早的localStorage会被清除

## 性能优化

### 常见的衡量页面的指标有哪些

- FP： 首次绘制时间，注意，这里是指的是白屏时间，因为只要有一个像素的内容不同就会统计
- FCP：First Content Paint 首次内容绘制时间
- LCP：最大（largest）内容绘制时间
- FID：First Input Delay，用户能够开始交互的时间。在渲染完毕后，会执行js同步代码，才会响应用户交互
- TTI：Time to Interactive 响应用户交互的时间
- CLS： 用于衡量页面稳定性的指标

### 页面加载优化有哪些方案

- 懒加载：
  - 路由懒加载
  - 组件按需加载（代码分割）
  - 用webpack分割chunk，这样可以无需在首次加载时进行全量加载，而在需要时再进行动态加载
- 第三方组建库按需引入，这里一般是按需引入css
- 使用cdn引入一些大体积的第三方库，来优化打包体积
- 使用patch来修复一些esm导出成umd包的导出问题

### 介绍一下 CSR和SSR的区别与流程

- CSR

CSR Client-Side Rendering ，客户端渲染。 这种方式由服务端发送html和js文件，在客户端做处理，客户端可以fetch服务端数据，然后更新DOM。所有的逻辑，都是在客户端做处理的

这种方案的好处是：

- 能够增强页面的交互。
- 能够按需加载数据，即需要的时候再去请求。

坏处：

- 糟糕的SEO表现
- 首屏加载性能不高
-
- SSR

SSR Server-Side Rendering， 服务端渲染。这种方式由服务端返回全量HTML，不仅负责渲染DOM，还负责fetch全量数据。客户端处只负责接收这个大的HTML，并展示page。

这种方案的好处是：

- 提高SEO效率
- 对于内容非常多的app，首屏加载的效率高了很多

坏处：

- 高昂的服务端计算资源
- 开发复杂
- 由于渲染发生在服务器上，因此 UI 中的任何更新或更改都需要客户端和服务器之间的往返通信，这可能会导致延迟和 UI 无响应。

### Hydration是什么

在React SSR中，有Hydration这么一种概念。

我们都知道客户端渲染（CSR）中，将JS和HTML一同交给客户端渲染，即可拥有一个可交互的界面，如图：

![img](https://k16munf4oq2.feishu.cn/space/api/box/stream/download/asynccode/?code=ZWMyNTYxMDFmZWE0ZDBiYTAyODkwM2MyMTIwOWY1YzhfVDV5VjBUQ3l0SGQ1YUNxdU01Vm1hUnVTcVZxdjJ4OTVfVG9rZW46S1NxM2I5dk1Gb3pWWWh4SGtDamNVY0NsbnVoXzE3MjgxNDQwMDU6MTcyODE0NzYwNV9WNA)

绿色的部分是完成加载后的界面，但是如果javascript没有加载完毕，用户接收到的是一个空白的页面。损害用户体验

因此，SSR先把一份交互性不强的HTML呈现给用户，尽管Js还在loading，用户也不会接收到一个空白的页面，灰色部分是还没法相应交互行为的DOM元素

![img](https://k16munf4oq2.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTFiMWNiNGNiNDE0ZmVjODFkMGZmYjI3ODQ1MzEwYzRfNDNRWmwwSHg3OFFuWXdsdDRHR2dnOXpBUTU3QzhxdHRfVG9rZW46Q3FaWWJtd05Kb3BpckR4Y1hGVGM1eU1DbmRkXzE3MjgxNDQwMDU6MTcyODE0NzYwNV9WNA)

我们告诉 React 将事件处理程序附加到 HTML 上，以使应用程序具有交互性。这种渲染组件和附加事件处理程序的过程称为 “hydration”。这就像用交互性和事件处理程序的“水”浇灌“干涸”的 HTML。激活后，我们的应用程序将变为交互状态，响应点击。

## 浏览器有哪些进程，渲染进程中包含哪些线程

![img](https://k16munf4oq2.feishu.cn/space/api/box/stream/download/asynccode/?code=YzczNjNlMGQ5NjJiNzBjYzU4ODRkYjdiMjZhODJhNTlfdnBWQllwZzZvemdRTUNuS09VOUEwMFc3d1RJOTBkRlZfVG9rZW46Uzl5emJkWGRlbzVmMGl4WHhmSWNPV1ExbmR0XzE3MjgxNDQwMDU6MTcyODE0NzYwNV9WNA)
