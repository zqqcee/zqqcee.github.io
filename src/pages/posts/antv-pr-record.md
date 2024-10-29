---
title: Pull Request完整过程【记一次给antvis/G6的PR】
tags: git
categories: thought
description: 本文记录了我从发现bug，排查bug到给G6提PR，与仓库管理员沟通，最终PR被成功merge的过程。给想要参与开源，为自己喜欢的项目贡献绵薄之力的朋友提供一套完整的贡献流程参考
date: 2023-06-09
layout: ../../layouts/PostLayout.astro
top: 98
mathjax: true
abbrlink: 28243
---

# 前言

G6正在进行 `v4`到 `v5`的版本升级，发了几个Issue Hunt，因为很喜欢G6，所以想尝试帮助完成一个矩形Item的迁移。在编写测试demo的过程中，发现了G6的一个严重bug。本文记录了我从发现bug，排查bug到给G6提PR，与仓库管理员沟通，最终PR被成功merge的过程。这是我给G6的第二个PR，给想要参与开源，为自己喜欢的项目贡献绵薄之力的朋友提供一套完整的贡献流程参考。附上两次Pull Request的链接

- Doc fix ：[Fix issue#4552, another 404 not found and typo errors #4554](https://github.com/antvis/G6/pull/4554)
- Bug fix ：[Fix: &#34;Node not found&#34; error from &#39;getNode()&#39;#4608](https://github.com/antvis/G6/pull/4608)

# Bug 重现

这是我在编写测试demo时，发现G6中存在的一个bug。报错信息显示：`Node not found for id: 1`。

![image](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202306082202885.png)

根据字面意思，某个方法收到了 `id`为1的节点，但是在我传入的数据中并不存在这个节点。

# 问题排查

我在 `Graph.getNode()`这个方法的前后调试了很久，更奇怪的是，直接调用 `Graph.getNode(1)`居然是能够返回节点的。由于G6的代码中写的是:

```typescript
Object.keys(data).forEach((id) => {
	//...
	const innerModel = graphCore.getNode(id);
	//...
});
```

我在getNode之前在控制台 `console.log`了 `id`, 控制台输出 `1`。这就很奇怪了，我一度怀疑是 `getNode`这个方法出现了问题，但是 `getNode`是一个核心方法，应该不可能出错。

如果直接调用 `Graph.getNode(1)` 能够返回节点，那么说明id就不是1，于是我输出了 `id==1`，果不其然控制台输出 `false`。进一步使用 `typeof`查看 `id`的类型，才发现id不知道怎么已经变成了 `string`。原来使用 `Object.keys()`生成的数组，无论 `key`的类型是什么，统一生成为 `string`数组。这个 `bug`很严重啊，如果用户在数据中定义的 `id`是 `number`类型，那么将无法获取到这个 `Node`。

到这里，问题就定位完毕了。

# 解决方案

其实要解决这个问题很简单，有以下三种方法：

- 在用户的id为 `number`类型时，使用 `Number(id)`进行一次转换，而在用户 `id`为 `string`类型时，不做任何处理
- 修改 `getNode()`，使他能够识别用户传入数据中 `id`的类型
- 在文档中强制限制用户输入 `string`类型，并且使用类型检查将用户输入的data限制为string

三种方法首先排除第二种，因为 `getNode()`是一个核心方法，是从 `antv`的核心代码仓中 `import`过来的一个方法，找不到修改的入口

我这里选择了第一种方法，并在PR中提示了，如果不做修改的话需要在文档中明确标注 `id`必须为 `string`类型

在解决这个问题的时候，我还考虑到了一种情况，如果用户比较调皮，**输入的 `id`中又有 `string`类型，又有 `number`类型**应该怎么解决呢？这里我采用了添加 `try-catch`代码块来进行解决。

## old version

```typescript
// 'id' variable is always string in here, but one in user data is number, possibly.
Object.keys(data).forEach((id) => {
	const innerModel = graphCore.getNode(id);
	const relatedEdgeInnerModels = graphCore.getRelatedEdges(id);
});
```

## new version

```typescript
Object.keys(data).forEach((id) => {
	let innerModel;
	try {
		innerModel = graphCore.getNode(id);
	} catch (e) {
		innerModel = graphCore.getNode(Number(id));
	}
	let relatedEdgeInnerModels;
	try {
		relatedEdgeInnerModels = graphCore.getRelatedEdges(id);
	} catch (error) {
		relatedEdgeInnerModels = graphCore.getRelatedEdges(Number(id));
	}
});
```

并且我在我的PR底下，做了如下说明，来询问这么做是否合理：

> An error is throwed from this function 'getNode()'; msg: "Node not found for id: 1"
> After testing, I found that 'id' variable is always string after `Object.keys(update).forEach((id)=>{...})`, but one in user data is number, possibly.
> I tried adding a `try-catch` block to fix this bug, but **it doesn't seem very reasonable to do so**. I guess you can restrict the user to set the `id` to a string type in the document, or force the `id` to a string type in the `transformer data` layer to avoid this error.
>
> ---
>
> `getNode()`方法抛出了一个异常； 报错信息为：“找不到 id为1的节点“
> 经过测试，我发现 `id`变量在 `Object.keys(update).forEach((id)=>{...})`之后总是字符串类型，但是这个 `id`变量在用户数据中很有可能是数字类型。
> 我尝试添加一个 `try-catch` 块来修复这个错误，但**这样做似乎不太合理**。 我想你们可以在文档中说明：限制 `id` 为字符串类型，或者在 `transformer data` 层强制将 `id` 设置为字符串类型来避免这个错误。

# 收到回复

很快，我收到了仓库管理员**十吾**的回复，她回复了一个👍，我好开心，我问她这是可以接受的吗，如果是的话，需不需要重新创建一个PR来进行提交（因为我一开始提交的PR有其他修改，但是另外的修改无法被merge）。

![image-20230608213348021](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202306082202026.png)

# PR提交完整过程

这一部分记录完整的PR提交过程，其中包含了我遇到的问题，一并做陈述并给出解决方案。因为这是我第二次给开源仓库做贡献，所以一些看起来很简单的细节我也记录在这里，帮后面的同学少踩一些坑。

## fork仓库 & clone代码仓

直接fork，选仅fork默认分支即可。fork仓库后，在自己的github主页就能看到一个一摸一样的代码仓了。这一步注意，是要clone自己fork后的代码仓，比如我需要clone的地址是：`https://github.com/zqqcee/G6.git`,这里 `zqqcee`是自己的用户名，不要clone错了。

## 添加upstream

这一步的目的是将 `antvis`的源仓库添加为上游仓库，不然我们无法同步它们的更新。运行：

```
git remote add upstream "https://github.com/antvis/G6.git"
```

运行完毕后，输入 `git remote -v` ，能够看到

> origin:xxxx
> origin:xxxx
> upstream:xxxx
> upstream:xxxx

## fetch 新分支

由于我是给**v5分支**提的PR，因此我需要先**fetch v5分支**。运行：

```
git fetch upstream/v5
```

输入 `git branch -a`就可以看到有一个红色的分支 `upstream/v5`，这说明已经fetch成功了

下一步，我们就需要把这个分支的内容在本地创建，并进行修改。

## 创建新分支

这一步在我执行的时候有一个很大的坑：我在master分支上直接运行：

```
git checkout -b v5
git rebase xxx
```

结果出了**一堆冲突**，后来才知道是**我的v5分支是从master分支上创建的，而不是从远程拉过来的**。

应该输入：

```
git checkout -b origin/v5 upstream/v5
```

这一步的意思是从 `upstream/v5`分支创建一个 `origin/v5`分支。

到这里还没结束，因为这个 `origin/v5`分支是我们从upstream中拉取出来的，我的习惯是要在这个分支上再新建一个分支做开发，分支名也有一些含义，于是接着运行

```
git checkout -b v5-fix#NodeNotFound
```

## 完成修改（注意commit规范）

写完代码后注意自己的commit规范，每一个commit都要让别人能看懂，不要全部修改完再做提交。这里我把每一个修改的含义都分得比较清楚，如下：

- bug 重现 commit
- bug 修复 commit

## push到个人仓库

在这一步我遇到了大麻烦，由于G6发布了 `issue hunt`,因此这里我push到个人仓库时，由于我的**`personal token`没有包含workflow，**因此push不成功。报错：**"refusing to allow a Personal Access Token to create or update workflow `.github/workflows/build.yml` without `workflow` scope"**

这一步正确的解决方案是重新创建一个Token并push，但是我为了省事，直接把workflow删掉了。结果PR就没有被合，并且收到了这个comment：

![image-20230608215157196](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202306082202094.png)

对于这个问题，解决方案我也记录在此处：

- 首先，创建一个token,勾选workflow，这一步在网上有很多教程，跟着做就好了，这里不做过多赘述
- 接着，重新设置 `origin`。运行

  ```
  git remote remove origin
  git remote add origin https://{token}@github.com/zqqcee/G6.git
  ```

  将 `{token}`替换为刚刚创建的带workflow的token

- 最后，重新push就能成功了

## 创建Pull Request

到fork的仓库中，push成功后，仓库中会显示有一个新的分支。然后点击 `Pull Request`

创建一个新的 `Pull Request`

这一步没什么好说的，重点是要选对你要修改的分支

![image-20230608215845380](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202306082202467.png)

## 填写PR信息

PR信息非常关键，必须非常清楚地说明你为什么要创建这个PR ，以及这个PR修复了什么问题。这里直接贴上我的PR 说明，供参考。

![iShot_2023-06-08_21.59.51](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202306082203170.png)

---

**以上就是全部的解决过程了，很开心能为G6做了贡献，希望有机会能加入AntV团队，也希望自己能为更多仓库创建更优秀的PR～！**
