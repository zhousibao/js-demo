/**
 * @单例模式
 * 保证一个类仅有一个实例，并提供全局访问
 *
 * @应用
 * @vuex全局数据管理
 * @页面资源统一管理 典型例子->弹框 比如message弹框只出现一次
 * @全局的配置信息
 */


/**
 * @构造函数借助静态属性
 */
function A (name) {
  if (typeof A.instance === 'object') {
    return A.instance
  }

  this.name = name
  A.instance = this
}
const a1 = new A('zhou')
const a2 = new A('pan')
console.log(a1 === a2) // true


/**
 * @借助闭包
 */
const B = (function () {
  const Bo = function (name) {
    this.name = name
  }
  let instance
  return function (name) {
    if (instance) {
      return instance
    }

    instance = new Bo(name) // 如果不存在 则new一个
    return instance
  }
})()
const b1 = new B('zhou')
const b2 = new B('pan')
console.log(b1 === b2) // true


/**
 * @通用的惰性单例
 */
function C (fn) {
  let instance
  return function () {
    return instance || (instance = fn.apply(this, arguments))
  }
}
const fn = function (name) {
  this.name = name
  return this
}
const Obj = C(fn)
const obj1 = new Obj('zhou')
const obj2 = new Obj('pan')
console.log(obj1 === obj2) // true
