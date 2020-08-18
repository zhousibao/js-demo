/**
 * @description Array.prototype.map(callback,thisArg) 数组中的每个元素调用函数，并返回一个新的数组。
 * callback：回调函数 ，thisArg：回调函数执行时的this值。
 * callback(val,index,arr)
 *
 * forEach、map都会跳过 empty 元素
 */
function map (callback, thisArg) {
  // 异常处理
  if (this == null) {
    throw new TypeError("Cannot read property 'map' of null or undefined")
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }

  // Step 1. 转成数组对象，有 length 属性和 K-V 键值对
  const obj = Object(this)
  // Step 2. 无符号右移 0 位，左侧用 0 填充，结果非负 // 将任意JS值转化为数字，且不会出现NaN
  const len = obj.length >>> 0

  const arr = new Array(len)
  let k = 0
  while (k < len) {
    // 检查 obj 及其原型链是否包含属性k。 // 使用in运算符，会忽略数组的empty值  // 注意
    if (k in obj) {
      // 传入 this, 当前元素, 索引 index, 原数组对象 obj
      const mappedValue = callback.call(thisArg, obj[k], k, obj)
      arr[k] = mappedValue
    }
    k++
  }
  return arr
}
// eslint-disable-next-line no-extend-native
Array.prototype._map = map


const numbers = [1, 4, 9]
const roots = numbers._map(Math.sqrt)
console.log(numbers, roots)
