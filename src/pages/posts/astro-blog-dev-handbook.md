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

## Timeline

2020-01-11，我在CSDN上发布了我的第一篇文章，当时是大二的下学期，因为想进入某位导师的智能媒体与数据挖掘实验室，学习了使用python进行网络爬虫。这一篇博客只贴上了代码，没有其他的内容。

真正意义上的第一篇博客是在 2020-09-27 写下的，是一篇介绍Sublime Text3的文章，[Sublime Text3——高效，美观，强大](https://blog.csdn.net/RRie1/article/details/108832279)。仍然发布在CSDN平台上。

在2022-07-19，我被保送到中南大学读研，研究方向是数据可视化，**开始和前端打交道**，萌生出自己搭建一个博客的想法。

同期，CSDN做的越来越差，**广告/垃圾信息/错误解答** 满天飞，我彻底决定要将博客迁移至自建平台上。

选择了当时比较主流的一种 “低代码/无代码” 方案： **Hexo+Github Pages+Github图床** 。选择了NexT主题，在当时看来，效果还蛮不错的。

![image-20241018150953448](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191645371.png)

在Hexo这版博客上，我也折腾了许多东西，比如：添加[ipad-cursor-hexo](https://github.com/zqqcee/ipad-cursor-hexo)，ipad-cursor是**CatJuice**的作品，我做了个胶水层在hexo中使用，感兴趣的话可以看看[这篇文章：在博客中应用ipad-cursor，@Hexo(Theme:NexT)](https://luckycc.cc/posts/ipad-cursor-in-hexo/)。

使用Hexo搭建的博客，发布文章非常方便，集成了非常完整的CI/CD，发布文章后通过github-action自动部署至github.io上。但是缺点也非常明显：**定制化成本非常高**，添加一个页面都需要折腾好久，更别说添加一些动画或定制某个板块了。

2024-10-01，在2024年国庆，我结束了暑期实习，准备开启孤独又漫长的研三生活。

我希望用更多文字来记录这段时光，苦于hexo难以进行功能扩展，github pages 国内的访问速度也受限，我决定使用Astro重新搭建个人博客，并将其部署至国内云服务器上，实现**博客内容与样式自由**的同时，也享受一次**折腾与创造的乐趣**。

**本文用于记录新版博客中的开发经历与体验。**

# 技术栈选型

技术栈选型上，其实是没有什么太多选择的。

- framework：

  - [Astro](https://astro.build/) - 内容驱动，搭建方便
  - [Hono](https://hono.dev/) - 用来搭建评论系统的后端，轻量简洁。
  - [Drizzle](https://orm.drizzle.team/) + [Postgres]() - ORM + 数据库存储
  - [Bark](https://bark.day.app) - 通知推送工具，用于在受到新评论时提醒自己审批

- style：

  - [tailwindcss](https://tailwindcss.com/) - 主要原因是我没有深入使用过，尝鲜体验一下。

    > 用下来之后发现确实挺方便的，但是代码样式也很难管理。“带鱼屏都看不完你写的 class”

  - [Magic-UI](https://magicui.design/) - 黑鸦推荐，一个基于 framer-motion 二次封装的动画库。
  - [shadcn](https://ui.shadcn.com/) - 选用的理由仍然是没有使用过，想体验一下。这个组件库除了 NavBar 比较难用外，其他方面都很不错

- 部署: docker + [caddyserver](https://caddyserver.com/)，SkyWT 推荐的部署方案，自动支持 https，简单易用。

- 服务器：阿里云轻量服务器serve博客，OSS做自建图床

# 板块规划

- 主页
- 文章 - 存放技术相关的文章
- 小记 - 存放一些日记类的思考与杂文
- 秋招专栏 - 存放刷题笔记，八股。还有一篇前端秋招指北
- 书签 - 暂时没有开发的页面，计划用于存放一些读书笔记，或收藏的好文
- 友链 - 朋友们，暂时没有开发

# UI/UX 设计

## 动态签名

![video-new](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191645373.gif)

在大尺寸的屏幕上，主页的右上角能够看到一个动态签名。这个签名由两部分组成：

左侧是头像中的一条小蛇。因为我在社区中活跃时用的就是这条小蛇头像，所以后面一直都没换。

右侧是Cee Zhou的花体签名。

制作的流程整体follow了[Doctor Wu的博客](https://doctorwu.me/)，其中有一篇[动画签名的制作](https://doctorwu.me/posts/animation-signature-zh) ，介绍了如何制作一个动态签名。它分为以下几步：

- 在[Signaturely](https://signaturely.com/online-signature/type/)，找到一张自己满意的签名图片
- 使用 [Ink space](https://inkscape.org/) 扣出这张图像的 svg path
- 创建 svg CSS 动画，可以看这篇： [Animated line drawing in SVG](https://jakearchibald.com/2013/animated-line-drawing-svg)

## 霓虹灯

我用codepen.io存放了这个效果的源代码：[The neon light](https://codepen.io/zqqcee-the-bold/pen/KKjjorx)，感兴趣可以看看。

原理实际上是给三个矩形加一些不规则的 `clip-path`，并且为他们添加一个 `blur`的过滤，使用动画来变更这三个矩形的 `scale` 和 `opacity` 。效果仍然参考了[Doctor Wu的博客](https://doctorwu.me/)。

![neon](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202410191645376.gif)

# 部署方式的更迭

## 部署至github.io

2024-10-05，我完成了第一版博客的开发。

当时正是秋招面试的收尾阶段，我的简历上放了个人博客的地址。因此我先将新开发好的博客，部署到zqqcee.github.io 上，替换原来的最初版的博客。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.7.0
      - name: Install
        run: pnpm install

      - name: Build
        run: pnpm run astro build
      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/'
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Configure Pages
        uses: actions/configure-pages@v4
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

但 Github Pages 部署的内容有一个问题，国内访问速度受限。

在完成博客基础功能开发后的第二天，我在阿里云上购买了一台轻量服务器，一个域名：luckycc.cc。

并打算将自己的博客部署在这台服务器上，提高国内用户的访问速度。

## 方案一：docker内caddy

在此之前我对 Docker 的了解仅仅停留在：可移植，易部署，环境隔离。国庆期间室友刚好在寝室，拖着他和我一起折腾。这是我们瞎捣鼓想出来的第一版部署方案

![image-20241122232603202](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202411230025665.png)

采用 docker+caddyserver 部署。

在完成本地提交之后，在服务器拉取最新的代码，然后使用docker进行部署，整个流程为：

- 本地提交更改
- 云服务器拉取更改
- docker build
- docker start

docker暴露80和443两个端口，用户访问`https://luckycc.cc`，其实就是访问了服务器上的:443端口，443端口启动了一个 docker 容器，会直接访问到容器内的443端口。容器内的443端口是 caddy 的 fileserver ，会访问到产物。

然而在 2024-11，我的网站突然崩了

![image-20241122233726795](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202411230025877.png)

在看了 caddy 的 log 之后，发现是对同一域名申请了太多次证书导致证书失效无法再次申请。因为每次在修改代码之后，我都需要把docker重新 build ，重新 run ，而且没有把 caddy 的证书持久化存储。

我开始思考这种部署方案的合理性。这种方案有一个很大的问题：服务器只有 80 和 443 可用。正确的部署方案应该是宿主机上用caddy来反向代理所有的请求。

因为马上要开始开发博客的评论系统，迫不得已需要更换部署方案

## 方案二：主机caddy

![image-20241123000202413](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202411230025059.png)

主机上使用一个 Global Caddy 来反向代理所有服务才是正确的部署方式。

在这种部署方案下，每次博客有更新，我需要先拉去到更新，再在本地build生成产物，然后使用 Caddy 来代理这个产物。

## 方案三： 主机caddy + github action

方案二中这种本地 build 的方法可以让 Github Action 来代理。于是产生了第三版部署方案

![image-20241123002159303](https://ccspace-assets.oss-cn-hangzhou.aliyuncs.com/ccspace/202411230025822.png)

在这一版方案中，github action 会**在 main 分支有新的提交时**，运行。build产物并将产物推送至 release分支。

这样我在主机上就不需要本地构建了，只需要拉取release分支获取最终更改即可。

```yaml
# workflow.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    env:
      PUBLIC_API: ${{vars.PUBLIC_API}}
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8.7.0
      - name: Install
        run: pnpm install
      - name: Build
        run: pnpm run astro build
      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist/'
      - name: Deploy to pages branch
        uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
          publish_branch: release
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Configure Pages
        uses: actions/configure-pages@v4
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4

```

# 评论系统

虽然我的博客可能短期内不会有太多浏览量，但我还是做了评论功能。

评论是联系的桥梁，很高兴你在这儿留下痕迹。

在每一篇文章底部，都可以发表评论。发表评论需要提供你的昵称，邮箱，个人网站（是可选的，点击头像可以跳转）。

对于头像服务，使用了[unavatar.io](https://unavatar.io/#/)。

- 如果你填写了QQ邮箱（使用QQ号而非邮箱别名），将显示QQ头像
- 如果邮箱设置了 Gravatar 头像，将显示 Gravatar 头像
- 否则，将显示 unavatar.io 提供的默认头像

**博客没有做登录功能，因此所有的评论都将通过审核才会被展示。**

评论的后端接入了 [bark](https://bark.day.app/) ，每有一位读者进行一次评论，都会像我推送一条通知，我会第一时间审核并通过。
