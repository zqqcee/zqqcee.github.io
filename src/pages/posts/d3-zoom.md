---
title: 【趟坑记录】d3.zoom()的正确使用姿势 @d3.v7
tags: javascript
categories: visual analytics
description: 在开发一个D3应用的时候遇到了一个zoom相关的问题，记录解决思路与方案
layout: ../../layouts/PostLayout.astro
date: 2022-05-20
top: 96
mathjax: true
abbrlink: 11107
---
# 【趟坑记录】`d3.zoom()`的正确使用姿势 @d3.v7

在开发一个D3应用的时候遇到了一个 `zoom`相关的问题，记录解决思路与方案

### 问题重现

最近在开发一个D3应用的时候遇到了一个 `zoom`相关的问题，应用里有一个功能叫**全景聚焦**。我们都知道画布由两个标签组成（见[实现autoZoom(),画布自适应放缩并居中@D3.js-v5](https://zqqcee.github.io/2023/03/24/3423a90bb58e/)），最外层的是固定视口 `<svg>`，一般将 `zoom`事件绑定在 `<svg>`上；内层是具体的画布，是一个 `<g>`标签，在 `<svg>`中的放缩与平移操作都作用在 `<g>`上，修改 `<g>`的 `transform`属性。这么做是为了避免用户将 `<svg>`元素拖动到窗口之外后丢失拖动焦点，无法将其拖回。而如果使 `<svg>`不动，`<g>`被拖动，那么拖动焦点就不会丢失，用户将 `<g>`元素移动至视口外后，还能将其拖回来。

我之前习惯这么写拖动平移：

```javascript
const svg = d3.select('#viewport').attr('width', width).attr('height', height);
const g = svg.append('g').attr('id', 'container').attr('width', width).attr('height', height);

svg.call(
	d3.zoom().on('zoom', (e) => {
		const transform = `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`;
		g.attr('transform', transform);
	}),
);
```

在一些业务场景中，往往需要对 `<g>`元素进行特定的平移与放缩。如：自动缩放至视口中央，放大至当前的1.5倍。然而，在其他直接地方修改了 `<g>` 的 `‘transform’`属性后，如：

```js
const offsetX = 10;
const offsetY = 10;
g.attr('transform',`translate(${offsetX},${offsetY})`
```

，问题就出现了，如下：

![bugreproduce](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202307200945951.gif)

可以看到，在设置了特定的 `'transform'`后，再进行拖动，会出现瞬移。

### 原因分析

因为监听的 `zoom`事件是通过 `e.transform`来进行放缩的。而在修改 `<g>`元素的 `‘transform’`属性为一个特定值后，再进行拖动，会从上一次的 `e.tranform`值开始修改，因此会出现错误。

举例说明：

1. 用户拖动，`e.transform`的数值修改为了 `transform_1`
2. 有一个自动放缩函数 `autoZoom`，将 `<g>`的 `'transform'`修改为了 `transform_2`
3. 用户再次进行拖动，`<g>`的 `'transform'`会从 `transform_1`开始修改，因此会出现从 `transform_2`到 `transform_1`的瞬移。

### 解决方案

得知原因之后，解决方案也非常明了。就是在任何需要进行放缩平移的地方，都将 `transform`进行缓存，下一次再需要进行放缩平移操作时，从上一次的 `transform`开始进行更改即可。

一开始我想的解决方案是在每次鼠标拖动时都记录一个偏移量，但是这个偏移量比较难获取，心想 `d3`这么大个库应该不至于用这么蠢的办法，应该有更好用的方案。

查了一下官方的API，发现了一个叫 `zoomTransform(node)`的接口，这个接口传入的是一个 `HTML node`，需要用 `d3.select(xx).node()`来获得，可以获取这个 `node`的放缩数据。官方文档是这么说的：

> Internally, an element’s transform is stored as _element_.\_\_zoom; however, you should use this method rather than accessing it directly. If the given _node_ has no defined transform, returns the transform of the closest ancestor, or if none exists, the identity transformation
>
> ---
>
> 在内部，元素的变换存储为 **element.\_\_zoom**；但是，**您应该使用此方法（指的是zoomTransform）而不是直接访问它**。如果给定节点没有定义的变换，则返回最近祖先的变换，或者如果不存在，则返回恒等变换。返回的变换表示以下形式的二维变换矩阵(略)：
>
> These properties should be considered read-only; instead of mutating a transform, use [_transform_.scale](https://d3js.org/d3-zoom#transform_scale) and [_transform_.translate](https://d3js.org/d3-zoom#transform_translate) to derive a new transform.
>
> ---
>
> 这些属性应被视为只读；使用transform.scale和transform.translate来派生新的变换，而不是改变变换。（下文将介绍如何派生新的变换）

进一步查看了源码，发现在 `svg.call(zoom)`这个操作后，`<svg>`这个HTML node就会绑上一个 `__zoom` 属性，这个 `__zoom`属性记录的是 `transform`参数，也就是我们对 `<svg>`进行的放缩平移变换。为此我还特定打印了一下，发现确实如此：

![log的结果](/Users/zqqcee/Library/Application Support/typora-user-images/image-20230720100136154.png)

那现在事情就变得很简单了，可以转变一下思路。之前我一直希望能够在 `autoZoom()`之后，获得 `"zoom"`事件的偏移量，使得我能够接着这个 `'transform'`值修改。那么既然我无法获得偏移量，可以尝试在 `autoZoom()`方法中不要直接修改 `<g>`的 `'transform'`属性，而去修改 `<svg>.__zoom`值。

#### 放缩平移写法

在一开始时，使用d3.zoom()创建放缩对象 `zoom`，并在任何时刻都使用 `<svg>`来 `call(zoom)`修改放缩值。在绑定 `"zoom"`事件时，因为 `<svg>` `call`了 `zoom`，因此任何偏移量都会记录在 `<svg>`，在修改 `<g>`的 `'transform'`属性时，可以直接使用 `d3.zoomTransform(svg.node())`来获得 `<svg>.__zoom`来进行应用。

```js
const svg = d3.select('body').append('svg');
const g = svg.append('g');
const zoom = d3.zoom().on('zoom', () => {
	g.attr('transform', d3.zoomTransform(svg.node()));
});
```

#### 特殊修改 `'transform'`函数的写法

这里需要说明一下 `autoZoom()`的写法，假设我们现在已经计算出了 `'transform'`数值 `transformX`，`transformY`，`k`。现在需要修改 `<svg>`的 `__zoom`属性为当前的 `'transform'`数值。

查阅了官方文档，找到了可以使用的API：

- `d3.zoomIdentity`。这个API可以创建一个新的 `'transform':{x:0,y:0,k:1}`，并允许使用 `transform.translate(x,y), transform.scale(k)`对其进行更改。
- `selection.call(zoom.transform,new_transform);`使用这个接口能够将 `<svg>.__zoom`修改为 `new_transform`

综上，代码为：

```js
const new_transform = d3.zoomIdentity.translate(transformX, transformY).scale(k);
d3.select('svg').call(zoom.transform, new_transform);
```

### 总结

简而言之，任何对 `<g>`的放缩与平移操作，都需要作用在 `<svg>`上，并且使用 `<svg>.__zoom()`来修改。

完整代码：

```js
//zoom事件绑定
const svg = d3.select('body').append('svg');
const g = svg.append('g');
const zoom = d3.zoom().on('zoom', () => {
	g.attr('transform', d3.zoomTransform(svg.node()));
});

//需要修改特定transform的函数，以autoZoom为例
const autoZoom = (transformX, transformY, k) => {
	const new_transform = d3.zoomIdentity.translate(transformX, transformY).scale(k);
	d3.select('svg').call(zoom.transform, new_transform);
};
```
