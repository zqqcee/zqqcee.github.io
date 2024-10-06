---
title: 回溯法
layout: ../../../layouts/PostLayout.astro
---

##### [140. 单词拆分 II](https://leetcode.cn/problems/word-break-ii/)

**题目：**

给定一个字符串 s 和一个字符串字典 wordDict ，在字符串 s 中增加空格来构建一个句子，使得句子中所有的单词都在词典中。以任意顺序 返回所有这些可能的句子。注意：词典中的同一个单词可能在分段中被重复使用多次。

```
输入:s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
输出:["cats and dog","cat sand dog"]
```

**思路：**

回溯法。注意，因为这道题每个单词可以使用多次，因此不需要记录路径。因为路径可以重复使用。只需要记录**选择列表**即可，选择列表即wordDict。

```java
private void dfs(String s,int i ,List<String> wordDict){
  //匹配完成
  if(i>=s.length()){
    res.add(String.join(" ",track));
    return;
  }
  for(String word:wordDict){
    int len = word.length();
    if(i+len<=s.length() && s.substring(i,i+len).equals(word)){
      //回溯
      track.addLast(word);
      dfs(s,i+len,wordDict);
      track.removeLast();
    }
  }
}
```

### 回溯模版【Basic】

##### [77. 组合](https://leetcode.cn/problems/combinations/) && [78. 子集](https://leetcode.cn/problems/subsets/)

**题目**：

从一个数组中拆分出若干个子集。
组合题：从一个数组中拆出长度为k的所有子集
子集题：给一个整数数组，返回所有可能的子集

**思路**

二者的不同点仅在与basecase，本质上都是遍历一颗二叉树，并定义返回条件。我们可以提前定义一个双端队列 `LinkList`，并在basecase时，将双端队列复制，并加入res中。
**如果是全排列，不用basecase，for循环终止后dfs自动结束。如果是收集长度为k的子集，那么就要在basecase上规定track.size()==k的时候，收集**

- 代码模版

```java
//子集题，没有basecase，for循环到叶子节点时自动结束
class Solution {
    List<List<Integer>> res = new ArrayList<>();
    LinkedList<Integer> track = new LinkedList<>();
    public List<List<Integer>> subsets(int[] nums) {
        dfs(nums,0);
        return res;
    }
    private void dfs(int[] nums,int start){
      	//basecase
        res.add(new LinkedList<>(track));

      	//遍历路径
        for(int i = start;i<nums.length;i++){
	          track.add(nums[i]);//刚进入树节点时要做的，前序位置。更新已经访问过的路径
            dfs(nums,i+1);//注意，这里不是start+1 ，是i+1。剩余的选择列表从i+1开始到最后
            track.removeLast();//回溯，前序位置的逆操作
        }
    }
}
```

##### [131. 分割回文串](https://leetcode.cn/problems/palindrome-partitioning/)

### 回溯算法中可以重复选择的问题

##### [39. 组合总和](https://leetcode.cn/problems/combination-sum/)

**题目：**

给你一个 无重复元素 的整数数组 candidates 和一个目标整数 target ，找出 candidates 中可以使数字和为目标数 target 的 所有 不同组合 ，并以列表形式返回。你可以按 任意顺序 返回这些组合。candidates 中的 同一个 数字可以 无限制重复被选取 。如果至少一个数字的被选数量不同，则两种组合是不同的。

```
输入：candidates = [2,3,6,7], target = 7
输出：[[2,2,3],[7]]
解释：
2 和 3 可以形成一组候选，2 + 2 + 3 = 7 。注意 2 可以使用多次。
7 也是一个候选， 7 = 7 。
仅有这两种组合。
```

**思路：**

和回溯模版仅有一点不同，就是元素可以重复选。在子集那道题中，我们用 `start`来防止在集合 `[1,2,3]`找子集时，找到 `[1,2]`和 `[2,1]`两个重复的集合。那么在这题中，每个元素可以重复选择，那么我们可以修改dfs的start值

```java
private void dfs(int[]nums, int start){
  /**
	  basecase
  **/

  for(int i = start;i<nums.length;i++){
    track.add(nums[i]);
    sum+=nums[i];
    dfs(nums,i);//这里由于可以重复选择，不再是i+1了
    track.removeLast();
    sum-=nums[i];
  }
}
```

### 回溯算法中的去重问题

去重问题可以这么分类

- 可以排序【树枝去重】
  - 用 `int start`
  - 用 `boolean[] used`
- 不可以排序【树层去重】
  - 用 `HashMap`
  - 用 `int[]` 数组

树枝去重和树层去重的区别。比如求 [1,2,3,4,5,2,2,2,4]的子集，就必须要在从上至下的路径（也就是树枝上去重），之前选过2了，那么后面就不能再选2了

而树层去重则指的是在同一层中，用了一个元素后，后面与这个元素相同的其他枝叶要被剪掉，比如下面这张图 `[3,4,6,4,7,8,9....]`

`<img src="/Users/zqqcee/Library/Application Support/typora-user-images/image-20240226223642012.png" alt="image-20240226223642012" style="zoom:50%;" />`

找递增子序列，在选了第一个4之后，后面的4就不用再选了，因为第一个4的剩余路径已经包含了过后的所有4的剩余路径了，这就是树层剪枝。

左边是树枝，右边是树层

![image-20240226223810307](https://raw.githubusercontent.com/zqqcee/img_repo/main/img/202410061622803.png)

##### [90. 子集 II](https://leetcode.cn/problems/subsets-ii/)【用start去重】

**题目：**

给你一个整数数组 `nums` ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。解集 **不能** 包含重复的子集

```
输入：nums = [1,2,2]
输出：[[],[1],[1,2],[1,2,2],[2],[2,2]]
```

**思路**

和上一题子集一样，只不过不允许重复出现子集，那么要对树进行剪枝，即加一个判断。具体见代码

**先对nums排序**

```java
private void dfs(int[] nums,int start){
  res.add(new LinkedList<>(track));
  for(int idx = start; idx<nums.length;idx++){
    //这里的if比较难理解
    if( idx>start && nums[idx]==nums[idx-1]){
      continue;
    }
    track.addLast(nums[idx]);
    dfs(nums,idx+1);
    track.removeLast();
  }
}
```

##### [47. 全排列 II](https://leetcode.cn/problems/permutations-ii/)【用used数组去重】

**题目：**

给定一个可包含重复数字的序列 `nums` ，**_按任意顺序_** 返回所有不重复的全排列。

```
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**思路：**

用 `used`的核心思路是：在一层中，如果当前的元素与前一个元素相同，但是前一个元素没有被使用过。那么说明当前这个元素后续的分支是应该被剪掉的。

```java
private void dfs(int[] nums, boolean[] used){
  if(track.size() == nums.length){
    res.add(new LinkedList<>(track));
    return;
  }
  for(int i = 0;i<nums.length;i++){
    if(used[i]){
      continue;
    }
    if(i>0 && nums[i] == nums[i-1] && !used[i-1]){
      continue;
    }
    used[i] = true;
    track.add(nums[i]);
    dfs(nums,used);
    used[i] = false;
    track.removeLast();
  }
}
```

##### [491. 递增子序列](https://leetcode.cn/problems/non-decreasing-subsequences/)

**题目**：

给你一个整数数组 nums ，找出并返回所有该数组中不同的递增子序列，递增子序列中 至少有两个元素 。你可以按 任意顺序 返回答案。

数组中可能含有重复元素，如出现两个整数相等，也可以视作递增序列的一种特殊情况

**思路：**

**不能提前排序！** 因为要获取递增子序列，原数组的数据是不能改变的。

树枝去重，用map或用数组。当前这一层中选择了一个数字，在当前层中后面那个数字就不能再选了。在同一层中，访问过的元素，不能再访问。因此每一个树层记录某个元素是否被访问，可以用HashMap和array来记

```java
private void dfs(int[] nums , int start ){
  if(track.size()>=2){
    res.add(new LinkedList<>(track));
  }
  int[] used = new int[201];
  //树枝去重，用map或用数组，这里用数组。
  //由于数据范围是-100～100，共计201个数字，因此开辟一个201的数组。
  for(int i = start;i<nums.length;i++){
    if((track.size()==0 || track.peekLast()<=nums[i]) && used[nums[i]+100]==0) {
      used[nums[i]+100] = 1;
      track.add(nums[i]);
      dfs(nums,i+1);
      track.removeLast();
    }
  }
}
```
