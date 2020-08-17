/**
 * @description 数组扁平化
 * Array.prototype.flat(n) 降n维 默认维1
 * n = Infinity, 降至一维数组
 */


// join()会将数组转变为使用逗号分隔的字符串。
const flat1 = arr => {
  // 缺点：会将数字转为字符串
  return arr.join().split(',')
}

// toString()会将数组转变为使用逗号分隔的字符串。
const flat2 = arr => {
  // 缺点：会将数字转为字符串
  return arr.toString().split(',')
}

// 使用这正则
const flat3 = arr => {
  let str = JSON.stringify(arr).replace(/(\[|\])/g, '')
  str = `[${str}]`
  return JSON.parse(str)
}

// 普通递归
const arr4 = []
const flat4 = arr => {
  for (const i of arr) {
    if (Array.isArray(i)) {
      flat4(i)
    } else {
      arr4.push(i)
    }
  }
}

// Generator递归
function * flat5 (arr) {
  for (const i of arr) {
    if (Array.isArray(i)) {
      yield * flat5(i)
    } else {
      yield i
    }
  }
}

// 利用concat和...扩展运算符
const flat6 = arr => {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}


const arr = [[1, 2, '3'], 4, [4, [5, 6, '7']]]
console.log('flat', arr.flat(Infinity))
console.log('join', flat1(arr))
console.log('toString', flat2(arr))
console.log('regExp', flat3(arr))
console.log('普通递归', flat4(arr), arr4)
console.log('Generator递归', [...flat5(arr)])
console.log('利用concat降维', flat6(arr))

