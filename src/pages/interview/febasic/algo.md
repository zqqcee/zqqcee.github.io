---
title: 算法题
layout: ../../../layouts/PostLayout.astro
---

### 快速排序的基本思路

### 找中位数

比较两个数组的中间，剪枝

### 图如何判环，讲下思路（包括判断是否有环，以及环的路径）

答的时候可以多答一个环的路径

### 合并区间

```Plain
算法题：以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。
示例 1：
输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：
输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
Test case：
[[1,4],[0,2],[3,5]]
[[2,3],[4,5],[6,7],[8,9],[1,10]]
[[1,4],[2,3]]
[[1,4],[4,5]]
 */
```

### 数组转树

### 求一个字符串中，回文字符串个数

回文子串，最长回文子串都是这个套路，注意dp的遍历方向

```JavaScript
var countSubstrings = function (s) {
    const dp = Array.from({ length: s.length }).map(d => Array.from({ length: s.length }));
    let res = 0;
    for (let i = s.length - 1; i >= 0; i--) {
        for (let j = i; j < s.length; j++) {
            if (s[i] === s[j]) {
                if (j - i <= 1) {
                    dp[i][j] = true;
                    res++;
                } else if (dp[i + 1][j - 1]) {
                    dp[i][j] = true;
                    res++;
                }
            }
        }
    }
    return res
};
```

### 远程调用api实现加法运算

本机无法实现加法运算，需要请求远程服务。远程有一个 `addRemote` 的API ，只接受两个参数

实现add方法 `const add = async (...args)=>{}`

```JavaScript
const addRemote = async (a, b) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(a + b), 1000);
  });
const add = async (...args) => {
  if (args.length <= 2) {
    return addRemote(args[0] || 0, args[1] || 0);
  }
  const middle = Math.floor(args.length / 2);
  const leftArgs = args.slice(0, middle);
  const rightArgs = args.slice(middle, args.length);
  //递归调用 ，直到返回两个Promise
  const leftSumPromise = add(...leftArgs);
  const rightSumPromise = add(...rightArgs);
  const [leftSum, rightSum] = await Promise.all(
    leftSumPromise,
    rightSumPromise
  );
  return addRemote(leftSum, rightSum);
};
```

### 删除字符串中出现次数最少的字符

```JavaScript
let obj = {};
let res = "";
for (let i = 0; i < str.length; i++) {
  if (obj[str[i]]) obj[str[i]]++;
  else obj[str[i]] = 1;
}
let min = Math.min(...Object.values(obj));
for (let i = 0; i < str.length; i++) {
  if (obj[str[i]] !== min) res += str[i];
}
```

### 找出字符串 中不含重复字符的最长子串长度

eg： s = “aaaaaa” , res=1。s=”abcabcbb”, res = 3

注意滑动窗口模版

```JavaScript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
    let res = 0;
    const set = new Set();
    let left = 0;
    let right = 0;
    let index = 0;
    while (right < s.length) {
                    //扩大右边界
        set.add(s.charAt(right));
        right++;
        //更新结果
        res = Math.max(res, right - left);

        //这个while判断是否需要收缩左边界
        while (set.has(s.charAt(right))) {
            //收缩左边界
            set.delete(s.charAt(left));
            left++;
        }
    }
    return res;
};
```

### 背包问题

#### 0-1 背包问题

每个物品只能放一次，在遍历背包容量时从后往前遍历

```JavaScript
// 物品：nums
// 背包容量：target
nums.forEach((n) => {
  for (let j = target; j <= n; j--) {
    dp[j] = Math.max(dp[j], dp[j - n] + n); //1. 求最大价值
    dp[j] += dp[j - n]; // 2. 求能装满的组合个数
  }
});
```

#### 完全背包问题

每个物品可以无限放，在遍历背包容量时要从前往后遍历

```JavaScript
nums.forEach((n) => {
  for (let j = n; j <= target; j++) {
    dp[j] = Math.max(dp[j], dp[j - n] + n); //1. 求最大价值
    dp[j] += dp[j - n]; // 2. 求能装满的组合个数
  }
});
```

#### 排列和组合问题

将{1,5} 和 {5,1} 视为一种情况的，称为组合；

将{1,5} 和 {5,1} 视为两种情况的，称为排列；

### 组合问题

先遍历物品，再遍历背包。

这样的话对于对于每一个物品，先把1加入计算，然后再把5加入计算，得到的方法数量只有{1, 5}这种情况。而不会出现{5, 1}的情况。

```JavaScript
nums.forEach((n) => {
  for (let j = target; j <= n; j--) {
    dp[j] += dp[j - n]; //
  }
});
```

### 排列问题

先遍历背包，再遍历物品

这样的话对于每一个背包容量，{1,5} 和 {5,1} 都会被搜到

因为会这么累加

> dp[6] = dp[5] + 1
>
> dp[6] = dp[1] + 5

```JavaScript
for (let j = 0; j <= target; j++) {
    nums.forEach(n => {
        if (n <= j) {
            dp[j] += dp[j - n]; // 注意这里也是j
        }
    });
}
```
