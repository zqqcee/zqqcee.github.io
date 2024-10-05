---
title: React相关
layout: ../../../layouts/PostLayout.astro
---

## React 事件与原生事件

- React 上注册的事件最终会绑定在**document**这个 DOM 上，而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)
- React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因。
- React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
- React 有一套自己的合成事件 SyntheticEvent

## React的diff算法 - 实现/原理/设计

### 给你一个列表，如何diff。

- 有key和没key的区别
- 没有key的时候，React会怎么做
- 如果没有key，怎么优化（可以用index）

### 简单说一下React的，状态A和状态B如何产生更新？

### React尝试在16版本优化了diff，在这之前是怎么样的，如何优化的

## React的中断机制

### 你知道React一直在计算，js只有一条线程，React是如何防止阻塞的

中断，Fiber

### 那么如何估算并发模式下batch的执行时间

### 在React中的渲染优先级

JavaScript引擎和页面渲染引擎两个线程是互斥的，因此在计算VDOM的时候没办法进行DOM渲染，无法中断。

## React Fiber

### 使用Fiber架构解决了什么问题

`JavaScript`引擎和页面渲染引擎两个线程是互斥的，当其中一个线程执行时，另一个线程只能挂起等待

如果 `JavaScript` 线程长时间地占用了主线程，那么渲染层面的更新就不得不长时间地等待，界面长时间不更新，会导致页面响应度变差，用户可能会感觉到卡顿

而这也正是 `React 15` 的 `Stack Reconciler`所面临的问题，当 `React`在渲染组件时，从开始到渲染完成整个过程是一气呵成的，无法中断

如果组件较大，那么 `js`线程会一直执行，然后等到整棵 `VDOM`树计算完成后，才会交给渲染的线程

这就会导致一些用户交互、动画等任务无法立即得到处理，导致卡顿的情况
