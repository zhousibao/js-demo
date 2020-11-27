/**
 * @手写Promise
 * 参考 https://juejin.cn/post/6899273470623318023
 *
 * @特点
 * 1、有三个状态：Pending进行中、Fulfilled已成功、Rejected已失败。外界无法改变状态，一旦改变无法再改变。
 * 2、构造函数接收 executor 函数作为参数
 * 3、构造函数中有 resolve 和 reject 内置方法，并作为参数传递给 executor 函数。
 * 4、实例方法then: 微任务队列、支持链式调用
 * 5、实例方法catch: 就是then(null, onRejected)的别名
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

    // try ... catch 语句来捕获错误
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  // then实例方法
  then (onFulfilled, onRejected) {
    // 实现then透传
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err }


    // 实现链式调用的原理，返回一个新的 Promise 对象
    const promise = new _Promise((resolve, reject) => {
      if (this.status === Fulfilled) {
        if (onFulfilled && typeof onFulfilled === 'function') {
          // 使用 setTimeout 模拟异步，所以原生的是微任务，这里是宏任务
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              handleValue(promise, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        }
      }
      if (this.status === Rejected) {
        if (onRejected && typeof onRejected === 'function') {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              handleValue(promise, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        }
      }

      // promise内部为异步时
      if (this.status === Pending) {
        if (onFulfilled && typeof onFulfilled === 'function') {
          this.onFulfilled.push(() => {
            setTimeout(() => {
              try {
                const x = onFulfilled(this.value)
                handleValue(promise, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            }, 0)
          })
        }
        if (onRejected && typeof onRejected === 'function') {
          this.onRejected.push(() => {
            setTimeout(() => {
              try {
                const x = onRejected(this.reason)
                handleValue(promise, x, resolve, reject)
              } catch (error) {
                reject(error)
              }
            }, 0)
          })
        }
      }
    })

    return promise
  }

  // catch实例方法
  catch (onRejected) {
    this.then(null, onRejected)
  }

  // resolve静态方法
  static resolve (param) {
    if (param instanceof _Promise) {
      return param
    }

    return new _Promise((resolve, reject) => {
      if (param && Object.prototype.toString.call(param) === '[object Object]' &&
      typeof param.then === 'function') {
        setTimeout(() => {
          param.then(resolve, reject)
        }, 0)
      } else {
        resolve(param)
      }
    })
  }

  // reject静态方法
  static reject (param) {
    return new _Promise((resolve, reject) => {
      reject(param)
    })
  }
}


const handleValue = (promise, x, resolve, reject) => {
  // 循环引用，自己等待自己完成，会出错，用reject传递出错误原因
  if (promise === x) {
    return reject(new TypeError('检测到Promise的链式循环引用'))
  }
  // 确保只传递出去一次值
  let once = false
  if ((x !== null && typeof x === 'object') || typeof x === 'function') {
    // try ... catch 语句来捕获错误
    try {
    // 防止重复去读取x.then
      const then = x.then
      // 判断x是不是Promise
      if (typeof then === 'function') {
      // 调用then实例方法处理Promise执行结果
        then.call(x, y => {
          if (once) return
          once = true
          // 防止Promise中Promise执行成功后又传递一个Promise过来，
          // 要做递归解析。
          handleValue(promise, y, resolve, reject)
        }, r => {
          if (once) return
          once = true
          reject(r)
        })
      } else {
      // 如果x是个普通对象，直接调用resolve(x)
        resolve(x)
      }
    } catch (err) {
      if (once) return
      once = true
      reject(err)
    }
  } else {
    // 如果x是个原始值，直接调用resolve(x)
    resolve(x)
  }
}


// 测试同步操作
const test1 = new _Promise((resolve, reject) => {
  resolve('测试同步操作')
})
test1.then(res => {
  console.log(res)
})

// 测试异步操作
const test2 = new _Promise((resolve, reject) => {
  setTimeout(() => { resolve('测试异步操作') }, 1000)
})
test2.then(res => {
  console.log(res)
})

// 测试then链式操作
const test3 = new _Promise((resolve, reject) => {
  setTimeout(() => { resolve('测试then链式操作') }, 2000)
})
test3.then(res => {
  console.log(res)
  return 'thenable'
}).then(res => {
  console.log(res)
})


// 测试then透传
const test4 = new _Promise((resolve, reject) => {
  setTimeout(() => { resolve('测试then透传') }, 3000)
})
test4.then().then(res => {
  console.log(res)
})


// 测试catch
const test5 = new _Promise((resolve, reject) => {
  setTimeout(() => { reject('测试catch') }, 4000)
})
test5.then().catch(res => {
  console.log(res)
})
