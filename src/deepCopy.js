/**
 * @浅拷贝 根据原对象拷贝出一个新对象。
 * @如果对象的属性是基本类型值拷贝的就是基本类型的值
 * @如果对象的属性是引用类型拷贝的就是内存地址
 *
 * @浅拷贝
 * Object.assign(target, ...sources) 将所有自身的可枚举属性从一个或多个源对象复制到目标对象，同时返回目标对象
 * 扩展运算符(...)
 * Array.prototype.slice()
 */

/**
 * @深拷贝 会创造出一个一模一样的对象
 * @新对象跟原对象不共享内存
 * @修改新对象不会改到原对象
 * @拷贝相比于浅拷贝速度较慢并且花销较大
 * @方法 jQuery.extend() lodash.cloneDeep()
 */


const obj = {
  a: 1,
  b: {
    b1: /^123$/,
    b2: new Date(),
  },
  c: 'name',
  d: true,
  e: undefined,
  f: null,
  g: function () {},
  h: Symbol('h'),
}
console.log('obj:', obj)

/**
 * @利用JSON方法 简单暴力
 *
 * @缺点 当值为undefined、function、symbol 会在转换过程中被忽略，导致属性丢失。
 * @缺点 正则会被转为空对象 {}
 * @缺点 new Date()转换结果不一致。//浏览器环境
 * @缺点 循环引用情况下，会报错。
 */
function deepCopyJson (obj) {
  return JSON.parse(JSON.stringify(obj))
}
console.log(deepCopyJson(obj))


/**
 * @利用递归方法完成深拷贝方法
 */
function deepCopy (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  if ((obj instanceof Date) || obj instanceof RegExp) {
    return obj
  }

  const result = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key]) // 递归复制
    }
  }
  return result
}
console.log(deepCopy(obj))
