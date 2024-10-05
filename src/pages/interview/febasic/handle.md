---
title: 手撕题
layout: ../../../layouts/PostLayout.astro
---

## 使用useState/useRef 实现useCallback

```JavaScript
function customUseCallback(cb, deps) {
  const cbRef = React.useRef();
  const [cbMemo, setCbMemo] = React.useState(cb);
  React.useEffect(() => {
    cbRef.current = cb;
    setCbMemo((...args) => cbRef.current(...args));
  }, [deps]);
  return cbMemo;
}
```

## Promise相关

### Promise

```JavaScript
class MyPromise {
  constructor(excutor) {
    this.resolveQueue = [];
    this.rejectQueue = [];
    let resolve = (value) => {
      if (this.status === "pending") {
        // 清理队列，设置状态，设置value
        this.value = value;
        this.status = "fulfilled";
        this.resolveQueue.forEach((cb) => cb(value));
      }
    };
    let reject = (e) => {
      if (this.status === "pending") {
        this.error = e;
        this.status = "rejected";
        this.rejectQueue.forEach((cb) => cb(e));
      }
    };
    try {
      excutor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  then = (onFulfilled, onRejected) => {
    let onFulfilledAdpt =
      typeof onFulfilled !== "function" ? (v) => v : onFulfilled;
    let onRejectedAdpt =
      typeof onRejected !== "function"
        ? (e) => {
            throw e;
          }
        : onRejected;
    return new MyPromise((resolve, reject) => {
      if (this.status === "pending") {
        this.resolveQueue.push(onFulfilledAdpt);
        this.rejectQueue.push(onRejectedAdpt);
      }
      if (this.status === "fulfilled") {
        const thenReturn = onFulfilled(this.value);
        resolve?.(thenReturn); //onFulfiled回调执行结果传给下一个then
      }
      if (this.status === "rejected") {
        const errorReturn = onRejected(this.error);
        reject(errorReturn);
      }
    });
  };
}
```

### Promise.all

```JavaScript
const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const result = [];
    const length = promises.length;
    let resolveCnt = 0;
    for (let i = 0; i < length; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          result[i] = value;
          if (resolveCnt++ === length) {
            resolve(result);
          }
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
};
```

### PromiseWithRetry

```JavaScript
function promiseWithRetry(asyncFn, times, delayTimes) {
  let currentTime = 0;
  return new Promise((resolve, reject) => {
    function run() {
      if (currentTime++ === times) {
        reject("失败");
      }
      return asyncFn()
        .then(resolve)
        .catch((e) => {
          setTimeout(() => {
            run();
          }, delayTimes);
        });
    }
    run();
  });
}
```

### 一些变式题

- 实现一个lock，

```JavaScript
class Lock {
  constructor() {
    this.resolveQueue = [];
    this.status = "EMPTY";
  }
  wait() {
    return new Promise((resolve) => {
      if (this.status === "PENDING") {
        // If the lock is busy, add the task to the queue
        this.resolveQueue.push(resolve);
      } else {
        // If the lock is available, take it and set status to "PENDING"
        this.status = "PENDING";
        resolve();
      }
    });
  }

  notify() {
    // Take the next task from the queue (if any) and run it
    if (this.resolveQueue.length > 0) {
      const nextTask = this.resolveQueue.shift();
      nextTask(); // Notify the next task
    } else {
      // No tasks waiting, release the lock
      this.status = "EMPTY";
    }
  }
}

// 参考用例:
const lock = new Lock();

// 异步获取数据任务，耗时2s，已mock返回
let cache;
const getInfoOrReturnCache = async () => {
  // if (cache) return Promise.resolve(cache);
  return new Promise((resolve) => {
    console.log("获取异步数据");
    setTimeout(() => {
      cache = { system: "IOS" };
      resolve(cache);
    }, 2000);
  });
};

// 模块执行代码
async function doTask(taskNumber) {
  await lock.wait();
  console.log("task:" + taskNumber);
  const res = await getInfoOrReturnCache();
  lock.notify();
  console.log("task: " + taskNumber + " system: " + res.system);
}

// 模块调用
doTask(1);
doTask(2);
doTask(3);
doTask(4);

// 输出:
// task1
// 获取异步数据
// task: 1 system: IOS

// task2
// task: 2 system: IOS
// task3
// task: 3 system: IOS
// task4
// task: 4 system: IOS
```

## QueryString

## 函数Curry化

### 实现一个add函数，达到以下的执行效果

> add(2,3,4)=9
>
> add(2)(3,4)=9
>
> add(2)(3)(4)=9
>
> add(2,3)(4)=9

```JavaScript
function add(...args) {
  let result = args.reduce((p, v) => p + v, 0);
  function innerAdd(...innerArgs) {
    return add(...innerArgs, result);
  }
  innerAdd.toString = () => {
    return result;
  };
  return innerAdd;
}
```
