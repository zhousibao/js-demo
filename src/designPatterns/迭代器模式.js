/**
 * @迭代器模式
 * 指提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
 *
 * 绝大多数语言都已经内置了迭代器模式
 */

/**
 * @forEach方法 Array.prototype.forEach(callback) 内置了迭代器模式
 */
[1, 2, 3].forEach(function (item, index, arr) {
  console.log(item, index, arr)
})


/**
 *@封装一个迭代器模式
 */
function each (obj, callback) {
  let value
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      value = callback.call(obj[i], obj[i], i, obj)
      if (value === false) {
        break // 当callback执行结果为false，则提前终止循环
      }
    }
  } else {
    for (const i in obj) {
      value = callback.call(obj[i], obj[i], i, obj)
      if (value === false) {
        break // 当callback执行结果为false，则提前终止循环
      }
    }
  }
}

each([1, 2, 3], function (value, key, obj) {
  console.log('array:', value, key, obj)
})

each({ a: 1, b: 2 }, function (value, key, obj) {
  console.log('obj:', value, key, obj)
})
