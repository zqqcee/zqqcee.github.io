---
title: 新版博客开发小记
description: 出于定制化的考虑，我决定在2024年的国庆小长假实现一个积攒许久的心愿：将原来使用Hexo搭建的博客迁移至Astro，实现博客内容与样式自由。本文记录了在新版博客中的折腾，设计与创造
date: 2024-10-14
pin: 1
layout: ../../layouts/PostLayout.astro
---

![neon](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191612585.gif)

# 背景

其实写博客这件事，在很早就开始了。

### Timeline

2020-01-11，我在CSDN上发布了我的第一篇文章，当时是大二的下学期，因为想进入某位导师的智能媒体与数据挖掘实验室，学习了使用python进行网络爬虫。这一篇博客只贴上了代码，没有其他的内容。

真正意义上的第一篇博客是在 2020-09-27 写下的，是一篇介绍Sublime Text3的文章，[Sublime Text3——高效，美观，强大](https://blog.csdn.net/RRie1/article/details/108832279)。仍然发布在CSDN平台上。

在2022-07-19，我被保送到中南大学读研，研究方向是数据可视化，**开始和前端打交道**，萌生出自己搭建一个博客的想法。

同期，CSDN做的越来越差，`<u>`广告/垃圾信息/错误解答`</u>`满天飞，我彻底决定要将博客迁移至自建平台上。

选择了当时比较主流的一种 “低代码/无代码” 方案： `<u>`**Hexo+Github Pages+Github图床**`</u>` 。选择了NexT主题，在当时看来，效果还蛮不错的。

![image-20241018150953448](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191645371.png)

在Hexo这版博客上，我也折腾了许多东西。

比如一些比较基础的：展示访客数量，展示阅读进度。

一些需要动动小手的：

- 增加杂谈页面，存放一些个人的想法
- 添加leetcode页面，存放刷题笔记
- 添加[ipad-cursor-hexo](https://github.com/zqqcee/ipad-cursor-hexo)，ipad-cursor是**CatJuice**的作品，我做了个胶水层在hexo中使用，感兴趣的话可以看看[这篇文章：在博客中应用ipad-cursor，@Hexo(Theme:NexT)](https://luckycc.cc/posts/ipad-cursor-in-hexo/)。

使用Hexo搭建的博客，发布文章非常方便，集成了非常完整的CI/CD，也省去了很多运维的成本。但是缺点也非常明显：**定制化成本非常高**，添加一个页面都需要折腾好久，更别说添加一些动画/定制某个板块了。

2024-10-01，在2024年国庆，我结束了暑期实习，准备开启孤独又漫长的研三生活。

我希望用更多文字来记录这段时光，苦于hexo难以进行主题扩展，github pages 国内的访问速度也受限，我决定使用Astro重新搭建个人博客，并将其部署至国内云服务器上，实现**博客内容与样式自由**的同时，也享受一次**折腾与创造的乐趣**。

**本文用于记录新版博客中的开发经历与体验。**

# 技术栈选型

技术栈选型上，其实是没有什么太多选择的。

- basic：[Astro](https://astro.build/) - 内容驱动，搭建方便
- style：

  - [tailwindcss](https://tailwindcss.com/) - 使用方便，但主要原因是我没有深入使用过，想体验一下。

    > 用下来之后发现确实挺方便的，但是代码样式也很难管理。“带鱼屏都看不完你写的class”

  - [Magic-UI](https://magicui.design/) - 黑鸦推荐，一个基于framer-motion二次封装的动画库，使用方便。
  - [shadcn](https://ui.shadcn.com/) - 选用的理由仍然是没有使用过，想尝试一下。这个组件库除了NavBar比较难用外，其他方面都很不错

- lint：不是特别了解，Soon推荐了 biome，但是折腾了一会儿没有采用，因为当时的主线不是lint，是把博客的架子搭起来

# 板块规划

- 主页 - 放个大头照和一条Slogan
- 文章 - 存放技术相关的文章
- 小记 - 存放一些日记类的思考与杂文
- 秋招专栏 - 存放刷题笔记，八股，以及
- 书签 - 暂时没有开发的页面，计划用于存放一些读书笔记，或收藏的好文
- 友链 - 朋友们，暂时没有开发，计划使用服务端维护这个部分

# 设计

### 动态签名

![video-new](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191645373.gif)

在大尺寸的屏幕上，主页的右上角能够看到一个动态签名。这个签名由两部分组成：

左侧是头像中的一条小蛇。因为我在社区中活跃时用的就是这条小蛇头像，所以后面一直都没换。

右侧是Cee Zhou的花体签名。

制作的流程整体follow了[Doctor Wu的博客](https://doctorwu.me/)，其中有一篇[动画签名的制作](https://doctorwu.me/posts/animation-signature-zh) ，介绍了如何制作一个动态签名。它分为以下几步：

- 在，找到一张自己满意的签名图片
- 使用Ink space 扣出这张图像的svg path
- 创建svg CSS动画，可以看这篇： [Animated line drawing in SVG](https://jakearchibald.com/2013/animated-line-drawing-svg)

### 霓虹灯背景

我用codepen.io存放了这个效果的源代码：[The neon light](https://codepen.io/zqqcee-the-bold/pen/KKjjorx)，感兴趣可以看看。

原理实际上是给三个矩形加一些不规则的 `clip-path`，并且为他们添加一个 `blur`的过滤，使用动画来变更这三个矩形的 `scale` 和 `opacity` 。

效果仍然参考了[Doctor Wu的博客](https://doctorwu.me/)，但是动画可能看起来没有那么丝滑。

### 菜单栏光影

关于Menubar，我参考了[Innei的博客](https://innei.in/)，做了基本的**响应式设计**，这是两种不同的Menubar：

- 大屏幕

  ![image-20241019132319279](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191645374.png)

- 小屏幕

  ![image-20241019133610461](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191645375.png)

如果你正在使用大屏幕浏览的话，会发现Menubar上会有光影，这是使用了 [MagicCard](https://magicui.design/docs/components/magic-card) 制作的效果，光影会随着你的鼠标进行移动。

![neon](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191645376.gif)

### Animation

借助 [Magic UI](https://magicui.design/)，能够很方便地制作动画，在博客中的许多动画都来自于它。

- FadeIn

  ![fadein](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191645377.gif)

- Dock Link

  ![录屏2024-10-19 16.47.17](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191648690.gif)

# 部署

部署方式，采用了 **docker+caddyserver** 部署，非常方便。目前更新博客的整个流程为：

- 本地提交更改
- 云服务器拉取更改
- docker build
- docker start

感谢[SkyWT](https://skywt.cn/)的部署建议，非常方便。

# RoadMap

- [ ] MDX，在博客中引入自定义组件，主要用于自定义一些`<u>`🔗超链接`</u>`的样式，目前的样式有点难看
- [ ] 友链
- [ ] 一个鉴权与登录系统
- [ ] 留言与评论系统
