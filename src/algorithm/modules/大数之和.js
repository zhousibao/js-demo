// 给两个大整数, 用字符串表示, 比如" 2154365543", "4332656442",
// 都可能超过1万位, 写一个函数输出他们之和. 需要自己实现加法过程, 不能用某些语言自带的高精度加法函数.

/**
 * @优秀
 */
function addTwoStrings (num1, num2) {
  let a = num1.length
  let b = num2.length
  let result = ''
  let tmp = 0
  while (a || b) {
    a ? tmp += +num1[--a] : ''
    b ? tmp += +num2[--b] : ''
    result = tmp % 10 + result
    if (tmp > 9) tmp = 1
    else tmp = 0
  }
  if (tmp) result = 1 + result
  return result
}


/**
 * @易懂
 */
function add (a, b) {
  const arr1 = a.split('').reverse()
  const arr2 = b.split('').reverse()
  const len = Math.max(arr1.length, arr2.length)

  const res = []
  let j = 0
  for (let i = 0; i < len; i++) {
    const num1 = Number(arr1[i]) || 0
    const num2 = Number(arr2[i]) || 0
    const h = num1 + num2 + j
    if (h > 9) {
      j = 1
      res.push(h - 10)
    } else {
      j = 0
      res.push(h)
    }
  }
  return res.reverse().join('')
}
var a = '1239'
var b = '323243'
console.log(addTwoStrings(a, b))
console.log(add(a, b))
