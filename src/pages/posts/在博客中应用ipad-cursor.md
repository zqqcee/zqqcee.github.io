---
title: '在博客中应用ipad-cursor，@Hexo(Theme:NexT)'
tags: javascript
categories: thought
description: 前两天睡前刷`twitter`，偶然间刷到一个很棒的项目`ipad-cursor`，想把这个用在自己的博客中。文章记录了在博客中尝试使用ipad-cursor的实践全过程
date: 2023-04-29
layout: ../../layouts/PostLayout.astro
top: 96
mathjax: true
abbrlink: 59926
---

## 起因

前两天睡前刷 `twitter`，偶然间刷到一个很棒的项目 `ipad-cursor`，想把这个用在自己的博客中。问了一下作者[@CatsJuice](https://github.com/CatsJuice)，发现暂未提供关于Hexo的支持，于是想着自己把这个功能加上，说不定还能写个 `hexo-plugin`。

## 效果

![屏幕录制2023-07-24 下午4.35.30](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202307281006407.gif)

## 使用方法

### 方法1

只需要为想要添加 `ipad-cursor`效果的元素添加属性 `data-cursor:block`或 `data-cursor:text`即可。

- 创建 `ipad-cursor-hexo`目录，放置在 `/themes/next/source/js`下，
- 创建两个js文件：`config.js`，`index.js`。
- 找到需要添加 `data-cursor`的元素

  方式：直接在DevTools中选择，即可定位，如果元素没有 `class`与 `id`不方便定位，可以在 `hexo`工程下找到这个元素对应的 `.swig`文件，添加上 `id`，方便选择器选择。

- 使用js为其添加属性 `document.querySelector('xx')?.setAttribute('data-cursor','block')`
- 创建初始化函数 `init`，监听 `DOMContentLoaded`

  ```js
  const init = () => {
  	document.querySelectorAll('*').forEach((_) => (_.style.cursor = 'none'));
  	//document.querySelector('xxx').setAttribute('data-cursor','block');
  	//document.querySelector('xxx').setAttribute('data-cursor','block');
  	//......
  	cursor.initCursor();
  };
  document.on('DOMContentLoaded', init);
  ```

- 注：如果 `selector`难以选择，考虑直接修改 `.swig`文件，在标签上直接添加。

`ipad-cursor`具体用法请参考：[github/ipad-cursor](https://github.com/CatsJuice/ipad-cursor)

---

### 方法2: 使用ipad-cursor-hexo插件，【推荐 🔥🔥🔥】

使用[ipad-cursor-hexo](https://github.com/zqqcee/ipad-cursor-hexo)进行设置，ipad-cursor-hexo是一个使用**配置项**进行ipad-cursor配置的库，只需要按照要求编写配置项，只需不超过10行代码，即可在你的博客中添加ipad-cursor

**步骤：**

- **创建一个名为 `ipad-cursor`的文件夹，放在目录 `${SourcePath}/themes/next/source/js`下**
- **创建一个js文件，名为 `index.js`，在 `${SourcePath}/themes/next/source/js/ipad-cursor-hexo`中**
- **编写配置文件**

  - 首先，你可以配置需要在哪些标签上绑定样式，比如：

    如果你想要在 `<div id="article"></div>` 上，添加 `data-cursor="text"`的属性，那么你应该编写如下配置项，对象的key是你想要在 `document.querySelectorAll`传入的内容

    ```
    const config = {
      "div#article":{
        type:'text',
      },
    }
    ```

    如果你想要配置它的 `cursor-style`, 你可以添加如下配置项

    ```
    const config = {
      "div#article":{
        type:'text',
        style:'radius:50%'
      },
    }
    ```

    如果你想要将所有的type为text的 `<article>`内的所有 `<a>`修改为block，你应该使用如下配置语法：

    ```
    const config = {
      "div#article":{
        type:'text',
        style:'radius:50%'
        children:{
        	"a":{
              type:"block",
        	}
        }
      },
    }
    ```

  - 其次，你可以配置cursor的样式，详见：[ipad-cursor config](https://github.com/CatsJuice/ipad-cursor#config)
  - 最后，你可以配置一些副作用，比如让 `img`标签不能被选中，因为被选中的 `<img>`会变暗

    ```js
    const effect = () => {
    	document.querySelector('img').style.userSelect = 'none';
    };
    ```

- 将 `index.js`添加到hexo blog中

  - 打开 `${SourcePath}/themes/next/layout/_partials/head/head.swig`文件
  - 在其中添加 `<script src="/js/ipad-cursor-hexo/index.js" type="module"></script>`

- 让 `document`监听 `"DOMContentLoaded"`事件，等DOM加载完毕后，执行 `init`函数，`index.js`的完整代码如下：

  ```js
  import init from 'https://unpkg.com/ipad-cursor-hexo@latest';

  import { config, cursorConfig } from './config.js';
  const effect = () => {
  	document.querySelector('img').style.userSelect = 'none';
  };

  document.addEventListener('DOMContentLoaded', () => init(config, cursorConfig, effect));
  ```

详情请见：[zqqcee/ipad-cursor-hexo](https://github.com/zqqcee/ipad-cursor-hexo)，欢迎star🌟！

欢迎访问我的个人博客，查看效果 [zqqcee](https://zqqcee.github.io/)🔥

## 遇到的问题

- 鼠标样式不生效问题：

  - 这个问题主要呈现在当鼠标放置到 `<a>，<p>`等标签中，鼠标会变为一个小手点击的样式。
  - NexT主题中，在一些地方设置了cursor的属性，`ipad-cursor`的原理是先设置 `cursor:none`,再添加一个 `<div>`随着鼠标移动。但是 `cursor:none`会被NexT主题设置的样式覆盖掉。
  - **解决方法：**需要手动将所有元素的style重新设置 `cursor:none`

- 载入文章后cursor失效问题：

  - 这个问题主要呈现在当载入文章时，`cursor`失效。
  - 因为已经绑定了 `document.on('DOMContentLoaded')`事件，排除ipad-cursor错误使用问题。进一步排查，发现在 `<head>`中使用了相对路径引入js文件，而在载入文章后，相对路径改变，造成 `ipad-cursor-hexo.js`文件无法生效问题
  - **解决方法**：在 `<head>`使用绝对路径引入
