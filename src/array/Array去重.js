/**
 * @description 数组去重
 * @description 字符串去重
 */


// 普通方法
var arr = [2, 3, 4, 4, 5, 2, 3, 6]
var arr0 = []
var arr1 = []
for (const i of arr) {
  // indexOf()
  if (arr0.indexOf(i) < 0) {
    arr0.push(i)
  }
  // includes()
  if (!arr1.includes(i)) {
    arr1.push(i)
  }
}
console.log('arr0:', arr0)
console.log('arr1:', arr1)


// 利用Set结构去重
const arr2 = [...new Set(arr)]
const arr3 = Array.from(new Set(arr))
console.log('arr2:', arr2)
console.log('arr3:', arr3)


// 字符串去重 // 转化程数组 => 去重 => 转换成字符串
const str = [...new Set('ababbc')].join('')
console.log('str:', str)


var a = new Set([1, 2, 3, 2])
var b = new Set([4, 3, 2, 3])
// 数组并集
var bing = [...new Set([...a, ...b])]
console.log('bing:', bing)
// 数组交集
var jiao = [...a].filter(x => b.has(x))
console.log('jiao:', jiao)
// 数组差集
const cha = [...a].filter(x => !b.has(x))
console.log('cha:', cha)
