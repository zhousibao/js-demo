/**
 * @description Array.prototype.filter(callback,thisArg) 数组中的每个元素调用函数，并返回一个新的数组。
 * callback：回调函数 ，thisArg：回调函数执行时的this值。
 * callback(val,index,arr)
 */
function filter (callback, thisArg) {
  // 异常处理
  if (this == null) {
    throw new TypeError("Cannot read property 'filter' of null or undefined")
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }

  const obj = Object(this)
  const arr = []

  let k = 0
  let index = 0
  while (k < obj.length) {
    if (k in obj) {
      // 传入 this, 当前元素, 索引 index, 原数组对象 obj
      if (callback.call(thisArg, obj[k], k, obj)) {
        arr[index++] = obj[k]
      }
    }
    k++
  }
  return arr
}
// eslint-disable-next-line no-extend-native
Array.prototype._filter = filter


const numbers = [1, 4, 9]
const roots = numbers._filter(item => item > 5)
console.log(roots, roots.length)
