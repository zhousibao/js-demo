/**
 * reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
 * @description Array.prototype.reduce(callback,initVal)
 * @param {function} reducer(acc,val,key,arr)
 * @param {any} initVal 初始值
 *
 *
 * @description reducer(acc,val,key,arr)
 * @param {*} reducer(acc,val,key,arr)
 * @param {*} acc 累计器
 * @param {*} val 当前值
 * @param {*} key 当前索引
 * @param {*} arr 数组
 */


function reduce (reducer, initVal) {
  let acc = initVal
  let index = 0
  if (!acc) { // 若initVal为undefined,则initval为数组的第一个元素
    acc = this[0]
    index = 1
  }
  for (let i = index; i < this.length; i++) {
    acc = reducer(acc, this[i], i, this)
  }
  return acc
}
// 添加至原型对象上
// eslint-disable-next-line no-extend-native
Object.defineProperty(Array.prototype, '_reduce', {
  value: reduce,
})
// Array.prototype._reduce = reduce


/**
 * @数组里所有值的和
 */
var arr = [1, 2, 3, 4, 5]
const total = arr._reduce((acc, val) => acc + val)
console.log(total)

/**
 * @二维数组转化为一维
 */
var flattened = [[0, 1], [2, 3], [4, 5]]._reduce((a, b) => {
  return a.concat(b)
}, [])
console.log(flattened)

/**
 * @计算数组中各元素出现的次数
 */
var names = ['Alice', 'Bob', 'Tiff', 'Bruce', 'Alice']
var countedNames = names._reduce(function (allNames, name) {
  if (name in allNames) {
    allNames[name]++
  } else {
    allNames[name] = 1
  }
  return allNames
}, {})
console.log(countedNames)
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
