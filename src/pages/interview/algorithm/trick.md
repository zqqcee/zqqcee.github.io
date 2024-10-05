---
title: 其他小技巧
layout: ../../../layouts/PostLayout.astro
---

## 模运算

```
X % Q == (X + Q) % Q
(X + Y) % Q == (X % Q + Y % Q) % Q

在前缀和中，通常会用到同模
pre[i] % Q = h
pre[j] % Q = h
那么 pre[i]-pre[j] % Q = h， 反之亦然
```

##### [1015. 可被 K 整除的最小整数](https://leetcode.cn/problems/smallest-integer-divisible-by-k/)

**题目：**

给定正整数 k ，你需要找出可以被 k 整除的、仅包含数字 1 的最 小 正整数 n 的长度。返回 n 的长度。如果不存在这样的 n ，就返回-1。

```
输入：k = 1
输出：1
解释：最小的答案是 n = 1，其长度为 1。
```

**思路：**

要掌握一个模数的定理：

```
(n*p+q) % k = ((p%k)*n + q) % k
```

根据这个模数定理，因为数字全由1构成，因此可以推导出

```
new = old * 10 + 1
因此，new % k = ( old * 10 +1 ) % k = ((old%k) *10 +1) %k
old % k 正是上一次的模运算结果
设 old % k = x
new = (x*10+1)%k
```

因此，我们可以从1开始，不断 `%k`, 因为一个数 `%k` 的结果的数据范围在[1,k-1] 之间，因此，最多做k-1次运算就能够知道一个数的是否能被k整除， 因为如果一个数无法被k整除，那么k次运算中 `x`的取值必有一次会重复，如果有重复的话，那么这个数无论添加多少个1，都不会被k除了，直接return -1。

使用 `HashSet`来记录是否出现重复的数字

## 数学

##### [1330. 翻转子数组得到最大的数组值](https://leetcode.cn/problems/reverse-subarray-to-maximize-array-value/)

**题目：**

给你一个整数数组 nums 。「数组值」定义为所有满足 0 <= i < nums.length-1 的 |nums[i]-nums[i+1]| 的和。你可以选择给定数组的任意子数组，并将该子数组翻转。但你只能执行这个操作 一次 。请你找到可行的最大 数组值 。

```
输入：nums = [2,3,1,5,4]
输出：10
解释：通过翻转子数组 [3,1,5] ，数组变成 [2,5,1,3,4] ，数组值为 10 。
```

**思路：**

翻转前与翻转后的数组值的差值越大，最终找到的数组值就越大。那么如果想要使最终的数组值最大，就要使这个差值最大。对子数组进行翻转， 只会影响到4个数字，假设翻转前数组为 `[...a,b,...c,d...]`翻转后为 `[...a,c,...b,d...]`，那么这时候，新旧数组值的差值为：`diff=|c-a|+|d-b|-|a-b|-|c-d|`

**我们只需要使得这个diff最大，即可。那么问题就转化为了使diff最大**

我们需要对这个diff进行分类讨论，讨论 `a,c与b,d`之间的大小。

```
①当a>c b>d时，原式=(a-c)+(b-d)-|a-b|-|c-d|=(a+b)-|a-b|-(c+d)-|c-d|
②当a<c b>d时，原式=(c-a)+(b-d)-|a-b|-|c-d|=(c-d)-|c-d|+(b-a)-|b-a|<0，舍去
③当a>c b<d时，原式=(a-c)+(d-b)-|a-b|-|c-d|=(a-b)-|a-b|+(d-c)-|d-c|<0，舍去
④当a>c b<d时，原式=(c-a)+(d-b)-|a-b|-|c-d|=(c+d)-|c-d|-(a+b)-|a-b|
```

综上，我们只需要讨论①④两种情况

这两种情况都转变为了形如:`（x+y) + |x-y|`和 `(x+y)-|x-y|` 这种形式。

**对于两个数差的绝对值，我们可以使用最大值与最小值拆掉它的绝对值号，下面的公式是解题的关键**

```
(x+y)+|x-y| = max(x,y)+min(x,y)+max(x,y)-min(x,y) = 2max(x,y)
(x+y)-|x-y| = max(x,y)+min(x,y)-max(x,y)+min(x,y) = 2min(x,y)
```

因此，上面的①④可以转化为：

```
①2min(a,b)-2max(c,d)
④2min(c,d)-2max(a,b)
```

我们再看上面两个式子，a和b，c和d其实都是相邻的两个数。我们要使得①④两个式子最大，就需要**使 `min(x,y)`最大，使 `max(x,y)`最小**。注：这里 `x`和 `y`指的是数组中相邻的两个数。
最后，需要判断一下边界情况，也就是 `a = nums[0]` 和 `b=nums[n-1]`的情况

**完整代码**：

```java
class Solution {
    public int maxValueAfterReverse(int[] nums) {
        int n = nums.length;
        int mx = Integer.MIN_VALUE; //min(x,y)的最大值
        int mn = Integer.MAX_VALUE; //max(x,y)的最小值
        int sum = 0; //旧的数组值
        int d = Integer.MIN_VALUE;
        for(int i=1 ; i<n ; i++){
            int a = nums[i-1];
            int b = nums[i];
            int diff = Math.abs(a-b); //相邻两个数的差值
            mx = Math.max(mx,Math.min(a,b));
            mn = Math.min(mn,Math.max(a,b));
            sum+=diff;
            d = Math.max(d,Math.max(
              Math.abs(nums[0]-b)-diff ,//a = nums[0]的情况
              Math.abs(nums[n-1]-a)-diff //b = nums[n-1]的情况
            )); // 这里这个d计算的是边界情况

        }
        return sum+Math.max(d,2*(mx-mn)); // 旧的数组值 + 这个最大的差值 = 新的数组值
    }
}
```

## 数据结构

#### 创建一个优先级队列的array

```java
PriorityQueue<Integer>[] pq = new PriorityQueue[m];
pq[i] = new PriorityQueue<Integer>((a, b)->a-b);
```

## 位运算

- js的异或： `a^b`，同位相同返回0，不同返回1
- a>>1 右移一位，代表除以2
- 末位是1代表是奇数
