---
title: 【解题笔记】 leetcode寻找两个正序数组的中位数
tags: leetcode
categories: note
date: 2022-10-11
description: leetcode【寻找两个正序数组中位数】做题笔记，包含解题步骤、思考过程与完整代码
mathjax: true
abbrlink: 13577
---

## 问题转化

首先，考虑只有一个有序数组的情况：寻找中位数的问题可以转化为寻找一条分割线，满足以下两个条件：

- 这条分割线在数组元素个素为奇数的时候，分割线左边的元素比右边多一个，中位数就是分割线左边的元素。
- 数组元素个数为偶数的时候，分割线左边的元素与右边的元素一样多。中位数是分割线左右两个元素的平均值。

下面考虑两个有序数组，我们可以在两个数组上都划分一条分割线，这两条分割线有以下两个条件 ：

- 两条分割线左边的元素个数 = 两条分割线右边的元素个数
- 两条分割线左边的元素均小于右边的元素
  此时，这道题就从寻找中位数转化为了寻找满足上述两个条件的分割线。题目要求时间复杂度为 `O(log (m+n))`，因此能够直接联想到使用二分查找法来找分割线。

## 解题步骤

寻找满足上述两个条件的分割线，那么我们就**围绕上述两个条件**来编码：为了描述方便，将nums1设置为长度较短的数组，nums2设置为长度较长的数组。

### 第一个条件：

要考虑奇数和偶数的情况，如果两个数组长度之和为奇数，那么我们就规定左边元素比右边元素多；如果两个数组长度之和为偶数，那么两边元素相等。由于Java的除法是向下取整（即5/2=2），因此可以讲奇偶两种情况合并，得到左边元素的总个数

$$
totalLeft = \frac{m+n+1}{2}~~~~~~~~//其中m，n分别代表两个数组的长度
$$

### 第二个条件：

要使分割线左边元素均小于右边的元素，因为两个数组均为有序数组，那么满足以下条件即可：
设 `i`为nums1分割线右边的元素，`j`为nums2分割线右边的元素。

```java
nums1[i-1]<=nums2[j] && nums2[j-1]<=nums1[i]
```

### 根据上述两个条件编码：

- 据此，根据第一个条件，我们可以知道 `i`和 `j`的等量关系，即 `i+j=totalLeft`。知道这个等量关系以后就很好办了，我们每次只需要移动 `i`，让 `j=totalLeft-i`即可。
- 根据第二个条件，我们只需要比较 `nums1[i-1]`与 `nums2[j]`的大小关系即可。如果前者大，说明分割线太靠右了；反之，继续向右寻找看还有没有满足条件的。
  如下图：此时 `i`指向元素2，`j`指向元素4。`1<4`，因此 `nums1`的分割线右移。由 `j=totalLeft-i`得，`nums2`的分割线左移。

![](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181521495.png)
用**二分查找法**编码：

```java
//第一步：将长度最短的数组设置为nums1
if (nums2.length < nums1.length) {
  int[] temp = nums1;
  nums1 = nums2;
  nums2 = temp;
}


//第二步：设置分割线左边元素的个数
int m = nums1.length;
int n = nums2.length;
int totalLeft = (m + n + 1) / 2; //合并奇数和偶数的情况


//第三步，设置left与right，代表nums1分割线的查找区间。注：right需要设置为nums1.length，因为i可以为nums1.length,此时分割线就在nums1的最右边
int left = 0;
int right = nums1.length;

/*两个条件：
        1. 分隔线左边的元素个数等于分隔线右边的元素个素
        2. 分隔线左边的所有元素均小于分隔线右边的元素个素
        即nums1[i-1] <= nums2[j] && nums2[j-1] <= num1[i]

        注：i是nums1分割线右边的第一个元素，它的下标 = 分隔线左边元素的个数；
        j同理，因此: i + j = totalLeft，可以根据该表达式，由i确定j。
        */
while (left < right) {
  int i = left + (right - left + 1) / 2;
  int j = totalLeft - i;
  if (nums1[i - 1] > nums2[j]) {
    //说明nums1的分隔线太靠右了，需要在[left,i-1处继续寻找]
    right = i - 1;
  } else {
    //需要在[i,right]处继续寻找
    left = i;
  }
}

//第四步：分割线划分完毕，确定两个数组分割线右边的位置i，j。此时left所指向的元素是nums1分割线右边的元素
int i = left;
int j = totalLeft - i;
```

### 极端情况：

下面讨论四种分割线划分的极端情况，仅以两种情况举例说明

- `nums1`的分割线在数组最左边
  ![分割线在数组最左边](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181521620.png)

  - 因为 `nums1`分隔线左边没有元素，因此可以得出两个数组分割线左边的最大值肯定在 `nums2`中。
  - 此时要把 `nums1[i-1]`设置为无限小的值，使得最后选择左边元素最大值的时候不要选中它。

- `nums1`的分割线在数组最右边
  ![分割线在数组最右边](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202305181521338.png)

  - 因为 `nums1`分隔线右边没有元素，因此可以得出两个数组分割线右边的最小值肯定在 `nums2`中。
  - 此时要把 `nums1[i]`设置为无限大的值，使得最后选择右边元素最小值的时候不要选中它。

- `nums2`的分割线在数组最左边
- `nums2`的分割线在数组最左边
  因此，考虑到四种极端情况，要在获得中位数前加上以下代码：

```java
int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
//此时nums1分割线左边没有元素了，因此nums1分割线左边元素的最大值要设置成无限小，在比较时直接选中nums2分割线的左边元素，其余同理
int nums1RightMin = i == m ? Integer.MAX_VALUE : nums1[i];
int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
int nums2RightMin = j == n ? Integer.MAX_VALUE : nums2[j];
```

### 得到中位数

分割线划分完毕后，即可求得中位数：

- 数组长度和为奇数：两条分割线左边元素的最大值
- 数组长度和为偶数：两条分割线左边元素最大值与右边元素最小值的平均值

```java
//最后一步：中位数
if ((m + n) % 2 == 0) {
  //偶数
  return (double)(Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin)) / 2;
}
return Math.max(nums1LeftMax, nums2LeftMax);
```

## 注意

在写二分查找法时，如果**查找到右区间时**使用 `left=middle`的方式编码，那么需要注意避免**死循环**的情况。
比如某个区间只有两个数 `[i,j]`，如果 `left=i`，`right=j`，那么若中间值一直不动，就会陷入死循环。因此确定中间值的时候应该使用 `left + (right - left + 1) / 2`,这样就能保证如果二分查找查到了右区间，左边界加一。详情可见代码

## 完整代码

```java
class Solution {
  public double findMedianSortedArrays(int[] nums1, int[] nums2) {

    //第一步：将长度最短的数组设置为nums1
    if (nums2.length < nums1.length) {
      int[] temp = nums1;
      nums1 = nums2;
      nums2 = temp;
    }


    //第二步：设置分割线左边元素的个数
    int m = nums1.length;
    int n = nums2.length;
    int totalLeft = (m + n + 1) / 2; //合并奇数和偶数的情况


    //第三步，设置left与right，代表nums1分割线的查找区间。注：right需要设置为nums1.length，因为i可以为nums1.length,此时分割线就在nums1的最右边
    int left = 0;
    int right = nums1.length;

    /*两个条件：
        1. 分隔线左边的元素个数等于分隔线右边的元素个素
        2. 分隔线左边的所有元素均小于分隔线右边的元素个素
        即nums1[i-1] <= nums2[j] && nums2[j-1] <= num1[i]

        注：i是nums1分割线右边的第一个元素，它的下标 = 分隔线左边元素的个数；
        j同理，因此: i + j = totalLeft，可以根据该表达式，由i确定j。
        */
    while (left < right) {
      int i = left + (right - left + 1) / 2;
      int j = totalLeft - i;
      if (nums1[i - 1] > nums2[j]) {
        //说明nums1的分隔线太靠右了，需要在[left,i-1处继续寻找]
        right = i - 1;
      } else {
        //需要在[i,right]处继续寻找
        left = i;
      }
    }
    //第四步：分割线划分完毕，确定两个数组分割线右边的位置i，j。此时left所指向的元素是nums1分割线右边的元素
    int i = left;
    int j = totalLeft - i;

    //第五步：确定中位数，无论是奇数还是偶数，中位数都只与两个数组分割线左边元素的最大值x 和 右边元素的最小值y 有关。
    //因为设定分割线左边元素等于右边元素，或大于一，因此中位数=x 或中位数=（x+y）/2
    int nums1LeftMax = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
    //此时nums1分割线左边没有元素了，因此nums1分割线左边元素的最大值要设置成无限小，在比较时直接选中nums2分割线的左边元素，其余同理
    int nums1RightMin = i == m ? Integer.MAX_VALUE : nums1[i];
    int nums2LeftMax = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
    int nums2RightMin = j == n ? Integer.MAX_VALUE : nums2[j];

    //最后一步：中位数
    if ((m + n) % 2 == 0) {
      //偶数
      return (double)(Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin)) / 2;
    }
    return Math.max(nums1LeftMax, nums2LeftMax);
  }
}
```
