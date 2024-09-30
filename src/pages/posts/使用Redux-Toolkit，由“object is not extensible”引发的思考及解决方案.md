---
title: 由“object is not extensible”报错引发的思考及解决方案@React-Toolkit/@Immer.js
tags: javascript
categories: thought
description: 使用Redux-Toolkit，由“object is not extensible”引发的思考及解决方案。本文介绍了Redux-Toolkit中的状态管理机制，介绍了Immer.js即它如何被应用在了Redux的状态管理中
date: 2022-12-20
layout: ../../layouts/PostLayout.astro
top: 99
mathjax: true
abbrlink: 6686
---

## 问题重述

    最近在做一个数据浏览平台，如图所示

![数据浏览平台](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181518651.png)

    大致的编码逻辑是左上角的数据集选择器，控制全局UI的改变。比如**左部的树形控件数据**，**画布中的节点链接图**等等，都是根据当前所选的数据集来定的。这种组件间的状态复用，自然而然就想到把数据集作为一个状态来交给redux管理。

### 使用redux-toolkit

    好的，现在开始查redux官方文档。因为刚学会react，教程中redux的store中使用的是`createStore()`创建的，但是这个方法目前已经弃用了，官方建议使用的是 `configureStore()`。经过一番文档的查阅，开始使用 `createSlice()`来重写reducer。

#### 使用 `createSlice()`

    这里直接贴上我这部分slice的**错误代码**

- **创建slice**

```js
//  redux/optionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { dataSets } from '../utils/getData';
import { HIGHLIGHT } from './constant';

export const optionSlice = createSlice({
	name: 'option',
	initialState: {
		data: dataSets['case1'],
		mode: HIGHLIGHT,
	},
	reducers: {
		//这里对于state的解释在下文
		changedata: (state, action) => {
			state.data = action.payload;
		},
		changemode: (state, action) => {
			state.mode = action.payload;
		},
	},
});

export const { changedata, changemode } = optionSlice.actions;
export default optionSlice.reducer;
```

`slice`有两个导出，一个是在内部负责操作状态的action；一个是reducer

我还有一另外一个 `selectionSlice`负责管理其他的状态，这里考虑到篇幅就不给出了。

#### 在 `index.js`中融合两个silce

```js
//   redux/index.js
import optionReducer from './optionSlice'; //注意，这里引入的是slice中导出的reducer，slice有两个导出：reducer和action
import selectionReducer from './selectionSlice';

export const reducers = {
	option: optionReducer,
	selection: selectionReducer,
};
```

#### 在store.js配置store，并使用 `<Provider store={store}>`让所有组件都可以使用redux中管理的状态

- 配置 `store`

```js
// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { reducers } from './index';

export const store = configureStore({
	reducer: reducers, //这里内置了combineReducer
});
```

- 添加 `Provider`

  在App标签外部套上`<Provider>`标签

```js
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>,
);
```

### 绘制节点链接图

    用户选择一份数据集，就会把这份数据集交给redux管理，在其他组件中如果想要取用数据集，使用`useSelector(state => state.option.data)`即可取用。**`<font color="red">`问题就发生在这一步`</font>`**

    我先简述一下我的代码：

```js
// componnets/Canvas/index.jsx

export function Canvas() {
	const data = useSelector((state) => state.option.data);

	useLayoutEffect(() => {
		initCanvas(); //drawLayout
	}, [data]);

	const initCanvas = () => {
		// .....append canvas
		const nodes = data.nodes;
		const links = data.links;

		//append circle,line......

		let simulation = d3
			.forceSimulation(nodes)
			.force(
				'link',
				d3
					.forceLink(links)
					.id((d) => {
						return d.mgmt_ip;
					})
					.strength(0.5)
					.distance(10),
			)
			//......some force option
			.on('tick', () => {
				//refresh canvas
			});
	};

	return (
		<div>
			<div className="container"> </div>
		</div>
	);
}
```

    这个代码很简单，我在``useLayoutEffect()``这个钩子里编写了一个画布初始化函数 `initCanvas()`。目的是让组件挂载前，先在一个 `<div>`中添加一个canvas，并绘制出数据。

### 报错重现

    **`<font color="maroon">`结果这个代码直接报红了，报了一个我从没见过的错误:   "Uncaught TypeError:Cannot add property vx,object is extensible"`</font>`**

![](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181519528.png)

    从这个报错信息很容易就能知道，是在我设置力模拟器时，调用`d3.forceLink(links)`绑定连边，和绑定节点时，无法像边数据和点数据中添加vx，vy等属性导致的。

    为了进一步验证这个特点，我用以下代码验证了我拿到的数据是否真的不可拓展

```js
const nodes = data.nodes;
const links = data.links;
nodes.forEach((node) => {
	console.log(node.isExtensible());
});
links.forEach((link) => {
	console.log(link.isExtensible());
});
```

    毫无意外，控制台输出了清一色的``false``。

## 解决方案

### 采用拷贝对象的方式解决（笨方法）

    所以这个问题可以基本确定是因为我的数据不可拓展造成的，虽然不知道为什么。但是解决这个的办法无非就是让我的数据能够被拓展。但是搜了半天解除不可拓展性的办法，找不到。于是只能采用拷贝对象的方式，拷贝一份新的对象。

    拷贝分两种方式：浅拷贝与深拷贝。在有指针的情况下，**浅拷贝只是增加了一个指针指向已经存在的内存**，而深拷贝就是**增加一个指针并且申请一个新的内存**，**使这个增加的指针指向这个新的内存**。显然，我们需要使用深拷贝，申请一个新的内存存放拷贝的对象。

    `	nodes`与 `links`数组中存放的obj如图所示：

```json
{
  nodes:[
  {
 	 	id:xxxx,
    role:xxxx,
    type:xxxx
	}
],
	links:[
  {
 	 	source:xxxx,
    target:xxxx,
	}
],
}
```

    因此我们使用对象拓展符``{...node},{...link}``即可完成深拷贝，具体代码如下：

```js
const newNode = nodes.map((node) => ({ ...node }));
const newLink = links.map((link) => ({ ...link }));
```

    接着我们使用newNode和newLink替换原来的nodes和links，就OK了。

### 把redux中存储的数据对象替换为数据名

    上面的办法显然很蠢······。**我慢慢开始意识到这个对象的不可拓展性很可能是redux帮我处理的**，因为**我们在redux中存放的数据应该由对应的reducer来进行更改**，如果外部能够更改会导致UI组件中获取的状态出现错误。

    因为发现这个问题已经很晚了，我没有急着去验证的想法是不是对的，因为我想赶紧把我的蠢方法换掉，让我的程序看起来别那么烂。我之前建立了一个函数帮我提供数据集，代码如下：

```js
import case1 from '../assets/case1.json';
import case2 from '../assets/case2.json';
import case3 from '../assets/case3.json';

export default function generate() {
	const datasets = {
		case1,
		case2,
		case3,
	};

	return datasets;
}

export const dataSets = generate();
```

    这么做的目的是我在组件中直接使用``import {dataSets} from "../util/getData.js"``就能获取到全部数据集了。

    写到这，应该很明白了。正确的思路应该是将数据集的名字，如case1，case2，case3......交给redux来管理，用户每次切换数据集，就通知reducer更改当前的数据集名称。在组件中如果想要使用数据的话就以下代码来获取。这么做显然比把整份数据交给redux管理更加合理。

```js
import {dataSets} from "../util/getData.js

function Component(){
  const dataName = useSelector(state => state.option.dataName)
  const data = dataSets[dataName]

  //func body
  return ....
}

```

这里贴上一个正确代码，和之前相比，我把交给redux管理的状态从 `data`换成了 `dataName`

```js
// redux/optionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { HIGHLIGHT } from './constant';

/**data option */
export const optionSlice = createSlice({
	name: 'option',
	initialState: {
		dataName: 'case1',
		mode: HIGHLIGHT,
	},
	reducers: {
		changedata: (state, action) => {
			state.dataName = action.payload;
		},
		changemode: (state, action) => {
			state.mode = action.payload;
		},
	},
});
export const { changedata, changemode } = optionSlice.actions;
export default optionSlice.reducer;
```

    其实已经发现区别了，在修改之前，我把整个数据集`data = {nodes:[...],links:[...]}`作为了整个状态存放到了redux中。而修改之后，我只存了**数据集的名称**，使用的时候用这个**名称**去一个存放了所有dataSets的地方取。这显然是一种更加合理的编码方式。

## 产生原因分析

#### immer.js => 不可变数据结构

    基本能够初步确定redux-toolkit在返回新状态值的时候，设置了返回的obj是不可扩展的。为了验证我的猜想，我去redux-toolkit官网找到了下面这篇``Writing Reducers with Immer``

![在这里插入图片描述](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181519759.png)

    Immer，Immer是什么？读这篇文章第一句话

> Redux Toolkit's [`createReducer`](https://redux-toolkit.js.org/api/createReducer) and [`createSlice`](https://redux-toolkit.js.org/api/createSlice) automatically use [Immer]
> (https://immerjs.github.io/immer/) internally to let you write simpler immutable update logic using "mutating" syntax. This helps simplify most reducer implementations.
>
> 译文：Redux Toolkit[`createReducer`](https://redux-toolkit.js.org/api/createReducer)并在内部[`createSlice`](https://redux-toolkit.js.org/api/createSlice)自动使用[Immer](https://immerjs.github.io/immer/)让您使用“mutating”语法编写更简单的不可变的更新逻辑。这有助于简化大多数 reducer 实现。

    ``	immutable update logic``不可变的更新逻辑，我想我找到答案了。于是我去google了 ``immer.js``，

    在它的中文官方文档中，有一段这么介绍的话：

> Immer can be used in any context in which immutable data structures need to be used. For example in combination with React state, React or Redux reducers, or configuration management. Immutable data structures allow for (efficient) change detection: if the reference to an object didn't change, the object itself did not change. In addition, it makes cloning relatively cheap: Unchanged parts of a data tree don't need to be copied and are shared in memory with older versions of the same state.
>
> 译文：**Immer 可以在需要使用不可变数据结构的任何上下文中使用**。例如与 React state、React 或 **Redux reducers** 或者 configuration management 结合使用。**不可变的数据结构允许（高效）的变化检测**：如果对对象的引用没有改变，那么对象本身也没有改变。此外，它**使克隆对象相对便宜**：**数据树的未更改部分不需要复制，并且在内存中与相同状态的旧版本共享**

    看完这两段话，比较抽象，直接看官方给的代码示例：

- **有一个Todo列表，我们要对它进行更新**

```js
const baseState = [
	{
		title: 'Learn TypeScript',
		done: true,
	},
	{
		title: 'Try Immer',
		done: false,
	},
];
```

- 不使用Immer

```js
//不使用immer
const nextState = baseState.slice(); // 浅拷贝数组
nextState[1] = {
	// 替换第一层元素
	...nextState[1], // 浅拷贝第一层元素
	done: true, // 期望的更新
};
// 因为 nextState 是新拷贝的, 所以使用 push 方法是安全的,
// 但是在未来的任意时间做相同的事情会违反不变性原则并且导致 bug！
nextState.push({ title: 'Tweet about it' });
```

- 使用Immer

```js
import produce from 'immer';

const nextState = produce(baseState, (draft) => {
	draft[1].done = true;
	draft.push({ title: 'Tweet about it' });
});
```

    从上可以看出，使用Immer会把更改应用当前的草稿``draft``上，它是当前状态的代理，一旦我们完成了所有的更改，Immer会根据 ``draft``上 ``state``的更改生成新的 ``nextState``,工作原理示意图如下：

![](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181519683.png)

    引用官方文档中的一段话，来解释Immer的作用

> Using Immer is like having a personal assistant. The assistant takes a letter (the current state) and gives you a copy (draft) to jot changes onto. Once you are done, the assistant will take your draft and produce the real immutable, final letter for you (the next state).
>
> 使用 Immer 就像拥有一个私人助理。助手拿一封信（当前状态）并给您一份副本（草稿）以记录更改。完成后，助手将接受您的草稿并为您生成真正不变的最终信件（下一个状态）。

    这个“私人助理”其实是一个代理对象Proxy，我在redux中也做了进一步的验证。

```js
// /redux/optionSlice.js

reducers: {
        changedata: ((state, action) => {
			console.log(state)
            state.dataName = action.payload
        }),
        changemode: ((state, action) => {
            state.mode = action.payload
        })
    }
```

    我在代码中打印了state，并在控制台查看了它的输出，确实是一个Proxy对象。

![在这里插入图片描述](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181520917.png)

### Redux-toolkit中 `createSlice()`的使用

在浅了解了Immer.js后，我回到官方文档中阅读剩余部分。并整理了以下对我可能有帮助的点

#### 状态的不可变性，为什么会引入Immer.js

    要分析状态的不可变性，首先我们要引入的一个问题是Redux中不可改变状态的几个原因。官方文档中列出了五条原因，但我认为最重要的是第一条：**会导致bug，例如UI无法正确更新显示最新值**。

    那么redux不能更改原始状态，我们如何返回更新后的状态呢？答案是在Reducer中只能拷贝原始值，修改副本并返回副本。如：

```js
// ✅ This is safe, because we made a copy
return {
	...state,
	value: 123,
};
```

    这也让我想到了之前在写类组件时，必须要用拷贝的方式修改，如

```js
setState(state => {
  {...state,key:newValue}
})
```

    我猜和Immer.js也有关系。

    这样修改当然OK没有问题，**但是如果状态之中嵌套了许多层，那么我们需要对每一层都进行拷贝**，这样的代码维护方式显然是灾难一样的存在！这里我贴上官网给的例子。

> 手动编写不可变的更新逻辑很困难，并且**在 reducer 中意外改变状态是 Redux 用户最常犯的一个错误**。

```js
function handwrittenReducer(state, action) {
	return {
		...state,
		first: {
			...state.first,
			second: {
				...state.first.second,
				[action.someId]: {
					...state.first.second[action.someId],
					fourth: action.someValue,
				},
			},
		},
	};
}
```

    所以，引入了Immer，Immer是一个库，简化了编写不可变更新逻辑的过程。Immer的工作流程我们在上文中已经介绍过了，这里不做过多赘述，值得注意的是，ReactToolkit的``createReducer``和 ``createSlice``都在内部使用了Immer。上文我也已经验证过了 ``state``是一个代理。

#### 更改状态的两种方式：`reset`与 `replace`

- reset

```js
// reset 修改
reducers: {
    todoDeleted(state, action.payload) {
      // Construct a new array immutably
      const newTodos = state.todos.filter(todo => todo.id !== action.payload)
      // "Mutate" the existing state to save the new array
      state.todos = newTodos
    }
  }
```

- replace

```js
// replace 替换
reducers: {
    todoDeleted(state, action.payload) {
      // Construct a new result array immutably and return it
      return state.filter(todo => todo.id !== action.payload)
    }
  }
```

这里有一个易错的地方，就是有一些修改函数会有默认返回值，那么在修改状态后有一个返回值，reducer就不知道应该使用哪个值作为最新的状态了。如

```js
reducers: {
    // ❌ ERROR: mutates state, but also returns new array size!
    brokenReducer: (state, action) => state.push(action.payload),
    // ✅ SAFE: the `void` keyword prevents a return value
    fixedReducer1: (state, action) => void state.push(action.payload),
    // ✅ SAFE: curly braces make this a function body and no return
    fixedReducer2: (state, action) => {
      state.push(action.payload)
    },
```

#### 如何输出当前状态

    想要从reducer中记录正在进行的状态以查看它在更新时的样子，这个场景是很常见的。但不幸的是，直接输出``state``是一个 ``Proxy``对象。为了解决这个问题，Immer提供了一个函数 ``current()``，如果需要查看状态可以使用它

```js
reducers: {
    todoToggled(state, action) {
      // ❌ ERROR: logs the Proxy-wrapped data
      console.log(state)
      // ✅ CORRECT: logs a plain JS copy of the current data
      console.log(current(state))
    },
  },
```

#### 为什么会引入Immer？

    下面三点是我对官方文档的一个总结与复述

- 使用Immer的优点

  - Immer极大简化了不可变的更新逻辑
  - 减少了reducer更新状态的编写错误。引入Immer后，无需创建副本，直接进行修改即可。（相当于你把修改的工作交给了一个代理，由代理帮你进行修改）

- Immer在性能上的权衡

  - 无需考虑，reducer几乎从来都不是Redux应用中的性能瓶颈

- 是否考虑未来将Immer设置为可选项？

  - 我有预感很多人在简单看了Redux-toolkit文档就拿去用了以后，都会给它们提Issue。因为这个对象的不可变性稍微不留意就会出错（但是习惯了它们的写法以后其实效率提升很多）。官方文档中也给出了为什么不打算将Immer设置为可选项的理由，它们说React-toolkit的架构是通过直接导入Immer来实现的，需要在应用程序加载期间立即同步使用Immer。

  > And finally: **Immer is built into RTK by default because we believe it is the best choice for our users!** We _want_ our users to be using Immer, and consider it to be a critical non-negotiable component of RTK. The great benefits like simpler reducer code and preventing accidental mutations far outweigh the relatively small concerns.
  >
  > 最后：**Immer 默认内置在 React-toolkit 中，因为我们相信它是我们用户的最佳选择！**我们希望我们的用户使用 Immer，并将其视为 React-toolkit 的关键组件。更简单的 reducer 代码和防止意外突变等巨大好处，远远超过了那些可以被忽视的问题。

## 思考

    这是我解决问题的完整过程，最近在做项目，写了好久的文档，好久没有沉淀自己的代码能力了。碰巧周日，碰巧遇到了一个值得记录的问题，赶紧把自己的思考过程落实在了文字。

    从组件中选择状态升格为全局这是一个值得思考的问题，我也认为这是很考验一个React写手能力的工作。最近刚入门React，浅记录一下解决问题的全过程。
