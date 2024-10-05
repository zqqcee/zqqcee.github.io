---
title: CSS相关
layout: ../../../layouts/PostLayout.astro
---

## CSS 中 px，em，rem分别代表什么

- px

像素值

- em

em单位名称为相对长度单位。相对于当前对象内文本的字体尺寸，如当前对行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸

- rem

rem是CSS3新增的一个相对长度单位，只相对根目录即HTML元素

所以我们只要在html标签上设置字体大小为标准，文档中的字体大小都会以此为参照

## 如何清除浮动

clear

## Inline 和 inline-block的区别

- inline
  - inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。
  - inline元素设置**width,height属性无效**。
  - inline元素的margin和padding属性，**水平方向的padding-left, padding-right, margin-left, margin-right都产生边距效果**；**但竖直方向的padding-top, padding-bottom, margin-top, margin-bottom不会产生边距效果。**
- inline-block
  - 简单来说就是**将对象呈现为inline对象，但是对象的内容作为block对象呈现（可以设置宽高）**。之后的内联对象会被排列在同一行内。比如我们可以给一个link（a元素）inline-block属性值，使其既具有block的宽度高度特性又具有inline的同行特性。

## CSS样式选择器

### **CSS选择器的优先级**

- CSS选择器包括行内样式、`id`选择器、`class`选择器、标签选择器，优先级依次降低，`!important`可用于优先级提升，比行内样式优先级还要高，权重的计算依次为 `1000`,`100`,`10`,`1`，`!important`的优先级为正无穷。
- 在权重相等的情况下，后面的样式会覆盖前面的
- 比较方式：从高位开始**逐位比较**，比如1000>0100
