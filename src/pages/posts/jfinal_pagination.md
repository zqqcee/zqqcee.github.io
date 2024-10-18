---
layout: ../../layouts/PostLayout.astro
title: 仿Jfinal 为了提供数据结构普适性而重写数据分页工具
description: 由于项目中表设计有问题，导致一条sql语句很难将表连接起来，因此无法使用Jfianl自带的分页方法。为了提供数据结构普适性而重写数据分页工具，但该方法无法体现分页的本质，重写分页算法的目的是为了让分页算法能够适应各种数据类型。
date: 2021-07-23
tags: java
categories: thought
top: 94
mathjax: true
abbrlink: 3988
---

### 提出目的

**注**：这种方法无法体现分页的本质，重写分页算法的目的是为了让分页算法能够普适各种数据类型。即向分页算法中投入任何数据结构都可以进行分页

### 分页工具类代码

**注：本文仅贴出代码，不介绍逻辑。 具体分页逻辑可以自行查看代码进行理解**

- 1.PageMe.java **(继承JFinal封装的Page类，是分类方法返回的数据类型。该类使用java泛型类机制，让分类算法普适于任何数据结构)**

```java
/**
 * @author cc
 */
public class PageMe<T> extends Page<T> {
    boolean firstPage;

    @Override
    public boolean isFirstPage() {
        return firstPage;
    }

    public void setFirstPage(boolean firstPage) {
        this.firstPage = firstPage;
    }

    @Override
    public boolean isLastPage() {
        return lastPage;
    }

    public void setLastPage(boolean lastPage) {
        this.lastPage = lastPage;
    }

    boolean lastPage;
}
```

- 2.PageKit.java **（分页工具类，内有分页方法paginate() ）**

```java
/**
 * @author cc
 */
public class PageKit<T> {
/**
* @return PageMe<T>
*/
    public PageMe<T> paginate(int pageNumber, int pageSize, List<T> data) {
        PageMe<T> page = new PageMe<>();
        page.setTotalRow(data.size());
        page.setTotalPage(pageSize == 0 ? 1 : (int) Math.ceil((data.size() / pageSize)));
        //基础数据
        if (pageNumber < 1) {
            //如果pageNumber不符合规范，返回全部数据
            page.setList(data);
            return page;
        }
        page.setFirstPage(pageNumber <= 1);
        page.setLastPage(pageNumber == page.getTotalPage());
        page.setPageNumber(pageNumber);
        page.setPageSize(pageSize);
        //根据前端传过来的数据配置
        if (data.size()==0){
            page.setList(Collections.emptyList());
            return page;
        }
        int beginIndex = (pageNumber - 1) * pageSize;
        int endIndex = pageNumber * pageSize;
        endIndex = Math.min(endIndex, data.size());
        beginIndex = Math.min(beginIndex, data.size());
        //case1: beginIndex在范围内，endIndex在范围外
        List<T> renderData;
        if (beginIndex < data.size() && endIndex > data.size()) {
            renderData = data.subList(beginIndex, endIndex);
        } else {
            //case2: beginIndex在范围外
            if (beginIndex >= data.size()) {
                renderData = null;
            } else {
                //case3：取中间数据
                renderData = data.subList(beginIndex, endIndex);
            }
        }

        page.setList(renderData);
        return page;
    }
}
```

### 使用方法

**注：pageNumber和pageSize一般由前端给，后端负责接受这两个值。这里示例为了方便直接定义**

```java
int pageNumber = 1 ; //第一页
int pageSize = 8	;//一页八条数据

List<Record> data; // 一个装着元素类型为Record的List
PageKit<Record> pageKit = new PageKit<>(); // 每一条数据类型为Record
PageMe<Record> data = pageKit.paginate(pageNumber, pageSize, data);
```

最后直接把data返回给前端即可

### 适用范围

    由于表设计有问题，导致一条sql语句很难将表连接起来，因此无法使用Jfianl自带的分页方法时，可以考虑这种。 本文给出的分页思想是：**先将数据库中的数据查出来，并拼接成前端需要的数据类型**（如前端需要学生名字，学生班级，语文成绩，**但是他们在不同的表中又很难使用一条sql语句进行拼接**）。

但是，分页的目的本应是提高查找效率，本文提出的分页没有提高查找效率。
