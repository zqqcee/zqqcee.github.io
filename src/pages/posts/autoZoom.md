---
title: 实现autoZoom(),画布自适应放缩并居中@D3.js-v5
date: 2022-11-20
tags: javascript
categories: coding note
description: 一张节点链接图，实现一个自适应放缩方法，使画布按照屏幕的尺寸进行放缩，并将元素居中展示。
layout: ../../layouts/PostLayout.astro
---

### 需求陈述：

画出了一张节点链接图，虽然可以固定布局中心，但每次使用不同屏幕时，这个布局中心总是会改变，导致节点链接图无法位于画布中央，且大小不适宜，因此需要实现一个自适应放缩方法，使画布按照屏幕的尺寸进行放缩，并将元素居中展示。

![image-20230324144012412](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202303241514591.png)

### 解决方案

这是一个画布的嵌套方式。

![](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202303241514564.png)

- 首先，创建一个 `<svg>`标签（图中为灰绿色），长宽与用户界面/组件的长宽相同。这个 `<svg>`只是一个包裹的容器，一般是不直接在其中放置图元的。
- 接着，在 `<svg>`内部创建一个 `<g>`标签（图中为黑色），我们真正需要绘制的图元，都会放置在这个 `<g>`标签中。
- 为 `<svg>`标签绑定 `d3.zoom()`事件，并将这个 `zoom`事件的 `transform`对象，应用在 `<g>`中

  只要理解了最后一步，就理解了这整个流程。为什么要把 `d3.zoom()`绑定在外部的 `<svg>`标签上呢？我们需要设想一个场景：假设我们把zoom事件绑定在了内部的 `<g>`标签上，那么当用户将 `<g>`标签全部拖动到 `<svg>`外部时，就没办法拖回来了。因为此时用户鼠标已经无法选中 `<g>`标签了。比如下面这种情况：

![image-20230324145631127](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202303241517212.png)

因此，为了避免用户将画布拖走后无法拖回来，我们应该设置一个“静止”的窗口，将拖动和放缩事件绑定在这上面，并且将这个事件作用来这个静止窗口内部的元素上。这里的静止窗口就是 `<svg>`,而事件作用的元素就是 `<g>`，这也解释了为什么要选用这种嵌套的形式。

理解了这点，代码就很好写了。我们只需要向放缩的函数中传入外部 `<svg>`的id，内部 `<g>`的id，`zoomObj`即可。这里还可以传入 `padding`，和 `duration`，设置画布的左右间隙和补间动效。

### 代码实现

##### 设置用户摁下 `ctrl`键，就自适应放缩并居中const zoomObj = d3.zoom().scaleExtent([1 / 50, 2]);

```javascript
document.onkeydown = (e) => {
	if (e.keyCode === 17) {
		autoZoom(
			zoomObj, //传入zoomObj
			'svgContainer', //<svg>的id
			'svg', //<g>的id
			{
				row: 20,
				col: 10,
			}, //间隙参数（自定）
			1000, // 补间时长（自定）
		);
	}
};
```

##### `autoZoom()`函数实现

```javascript
//autoZoom() function body
/**
  @param zoomObj: 放缩对象，设置了放缩比率
  @param svgContainerId: 容器 <svg>
  @param svgBodyId: 画布 <g>
  @param marginParam: 间隙参数（自定义）
  @param duration: 补间时长
**/
const autoZoom = (zoomObj, svgContainerId, svgBodyId, marginParam, duration) => {
	const svgContainer = document.querySelector(`#${svgContainerId}`);
	const svgBody = d3.select(`#${svgBodyId}`);
	if (!svgContainer) {
		return;
	}
	const viewBox = svgBody.node().getBBox(); //必须用d3.select,才有getBox，获取到长和宽

	//svg（它是静止的）
	const containerWidth = svgContainer.clientWidth; //svg标签的宽
	const containerHeight = svgContainer.clientHeight; //svg标签的高

	// margin setting
	const rowMargin = marginParam.row;
	const colMargin = marginParam.col;

	//计算放缩倍数
	const scale = Math.min(
		(containerWidth - rowMargin) / viewBox.width,
		(containerHeight - colMargin) / viewBox.height,
	);

	//计算如果要居中，画布需要的偏移量
	const offsetX = (containerWidth - rowMargin) / 2 - (viewBox.x + viewBox.width / 2) * scale;
	const offsetY = (containerHeight - colMargin) / 2 - (viewBox.y + viewBox.height / 2) * scale;

	// d3.zoomIdentity:缩放参数，返回Transform{k:1,x:0,y:0}
	const t = d3.zoomIdentity.translate(offsetX + rowMargin / 2, offsetY).scale(scale);

	//计算完毕得到放缩参数t，<svg>标签调用zoomObj和计算好的t
	d3.select(`#${svgContainerId}`).transition().duration(duration).call(zoomObj.transform, t);
};
```
