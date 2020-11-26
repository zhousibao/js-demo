/**
 * @手写Promise
 * 参考 https://juejin.cn/post/6899273470623318023
 */

// 用Symbol定义三种状态，防止外界改变状态。
const Pending = Symbol('Pending')
const Fulfilled = Symbol('Fulfilled')
const Rejected = Symbol('Rejected')

//
class _Promise {
  constructor (executor) {
    this.status = Pending // /存储 Promise 的状态

    this.value = undefined // 存储executor函数中业务代码执行成功的结果
    this.reason = undefined // 存储executor函数中业务代码执行失败的原因

    this.onFulfilled = [] // executor函数中业务代码执行成功回调函数的集合
    this.onRejected = [] // executor函数中业务代码执行失败回调函数的集合

    const resolve = value => {
      // 只有当状态为 Pending 才会改变，来保证一旦状态改变就不会再变。
      if (this.status === Pending) {
        this.status = Fulfilled
        this.value = value

        // 依次调用成功回调函数
        this.onFulfilled.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status === Pending) {
        this.status = Rejected
        this.reason = reason

        // 依次调用失败回调函数
        this.onRejected.forEach(fn => fn())
      }
    }
    executor(resolve, reject)
  }

  // then实例方法
  then (onFulfilled, onRejected) {
    if (this.status === Fulfilled) {
      if (onFulfilled && typeof onFulfilled === 'function') {
        // 使用 setTimeout 模拟异步，所以原生的是微任务，这里是宏任务
        setTimeout(() => { onFulfilled(this.value) }, 0)
      }
    }
    if (this.status === Rejected) {
      if (onRejected && typeof onRejected === 'function') {
        setTimeout(() => { onRejected(this.reason) }, 0)
      }
    }
    if (this.status === Pending) {
      if (onFulfilled && typeof onFulfilled === 'function') {
        this.onFulfilled.push(() => {
          setTimeout(() => { onFulfilled(this.value) }, 0)
        })
      }
      if (onRejected && typeof onRejected === 'function') {
        this.onRejected.push(() => {
          setTimeout(() => { onRejected(this.reason) }, 0)
        })
      }
    }
  }
}

const test = new _Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('"执行成功"')
  }, 1000)
})
test.then(res => {
  console.log(res)
})
