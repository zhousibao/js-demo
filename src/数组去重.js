// 普通方法
var arr = [2, 3, 4, 4, 5, 2, 3, 6]
var arr1 = []
for (const i of arr) {
  if (arr1.indexOf(i) < 0) { // 或是使用includes方法
    arr1.push(i)
  }
}
console.log('arr1:', arr1)

// 利用Set结构去重、
const arr2 = [...new Set(arr)]
console.log('arr2:', arr2)
const arr3 = Array.from(new Set(arr))
console.log('arr3:', arr3)

// 字符串去重
const arr4 = [...new Set('ababbc')].join('')
console.log('arr4:', arr4)


var a = new Set([1, 2, 3])
var b = new Set([4, 3, 2])
// 数组并集
var bing = [...new Set([...a, ...b])]
console.log('bing:', bing)
// 数组交集
var jiao = [...a].filter(x => b.has(x))
console.log('jiao:', jiao)
// 数组差集
const cha = [...a].filter(x => !b.has(x))
console.log('cha:', cha)
