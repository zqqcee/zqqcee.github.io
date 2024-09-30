---
title: 一些调试Web的小Tips
description: "周末参加了FEDay，本文记录听Jecelyn的演讲后学到的小Tips\U0001F4A1，包含一些使用Chrome Devtools的小技巧"
top: 94
mathjax: true
date: 2023-10-28
layout: ../../layouts/PostLayout.astro
abbrlink: 41789
---

# 一些调试Web的小Tips

周末参加了FEDay，本文记录听**Jecelyn**的演讲后学到的小Tips💡 [Slide Link](https://drive.google.com/file/d/1xCccv_U6jvBnq2SodLCia84jvX0f91Jj/view?usp=sharing)

## 浏览器如何读懂我们写的代码——sourcemap

浏览器只能解析HTML，js，css，但没办法解析其他的如ts，sass等语言。甚至React，Vue，Angular等前端框架，更不用说一些其他的SSR框架。

Webpack，Vite，Rollup等构建工具，将浏览器看不懂的语言解析（打包）成为HTML，css，js，为了更快地提升浏览器的解析效率，打包出来的代码还会尽可能地控制体积。但是在浏览器中调试的时候，在console中点击报错代码，往往在source面板中就**能够直接看到我们写的ts文件**，那么浏览器真的能看懂ts代码吗？

![image-20231121095157926](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202311212330776.png)

**浏览器看不懂ts代码**，它只能读懂打包后的代码。我们之所以能在浏览器中调试源代码，是因为浏览器知道通过构建工具构建出来的代码，分别对应源代码的哪个文件的哪个位置。而这个用来将构建后浏览器看得懂但人看不懂的代码对应到人看得懂但浏览器看不懂的代码的东西，就是sourcemap。

## Record 调试工具

试想有这么两个场景：

1. 你是一名前端开发者，你正在开发一个需求，现在已经进入了调试阶段。这个功能是在你填写**`<u>`10个`</u>`**表单项后，根据这**`<u>`10个`</u>`**表单项的值去向后端发送一个请求，后端返回给你一个表单项的值，你需要将这个值填入表单项中。

   开始调试后，你每次调试都需要填10个值才能触发，你非常抓狂

2. 你是一名后端开发者，你在使用“点点这点点那”的方式调试你前端同事的代码是否存在Bug。突然，你发现了一个Bug，你要给前端同事描述怎么触发这个Bug，但是很不幸，这个Bug的触发方式非常刁钻，它需要你将十个表单项设置成对应的值，才能触发。你告诉前端同事，你应该将表单项的值设置为xxxx，但是输入到第五个值的时候，你心态有点崩。

Chrome DevTools中有一个非常非常牛逼的功能，能够解决这两种场景下的痛点：**Record**。

可以将自己的行为录制，并导出。但是我测试了一下，**好像这个功能有点bug**，必须要保证元素在windows中，不然会导致崩溃？录制效果如下，可以将录制代码导出，发送给其他人。自己开发可以用一下，让别人用就算了，不然崩溃了更急了

![record](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202311212355281.gif)

## Emulate Focus Page

一些需要hover/active/focus状态来触发的元素是非常难调试的，通常的调试方法是为这个元素加一个状态，`addState`，如图：

我想调试Reference这个元素将鼠标放上去后弹出的下拉菜单样式，可以找到这个元素，给他加一个:focus状态

![image-20231120163609769](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202311212330797.png)

然后这个下拉菜单就会弹出来

![image-20231120163645945](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202311212330869.png)

但是，有一些网页是没办法用这个办法调试的，因为它们**在判断一个元素是否有焦点事件之前，会先判断document是否有焦点事件**。如果document没有在被 `focus`的状态下，元素的focus状态是不会响应的。但是如果打开控制台，会失去document的focus，如下：

![image-20231121000310160](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202311212331989.png)

这时候就需要打开**Emulate Focus Page**来为document添加上focus，使得内部的元素也能响应对应的状态。

打开方式有两种，

- 最便捷的一种是**Cmd+Shift+P**或者在**右上角三个小点的菜单处**调出运行控制台，输入 `emulate a focused page`，摁下回车即可

  ![image-20231121000542670](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202311212330534.png)

  ![image-20231121000503644](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202311212331174.png)

- 第二种是在rendering处打开，找到这个选项把它勾上就可以了

  ![image-20231121000815880](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202311212331842.png)

## 在请求的时候可以加上响应头

添加请求头有相关的插件（ModHeader）能够做到，使用插件更加方便

但原生调试工具也提供了支持，适合解决一些在个人项目中，需要后端解决的跨域问题，但后端还没来得及解决的情况。

![image-20231121234131533](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202401030120635.png)
