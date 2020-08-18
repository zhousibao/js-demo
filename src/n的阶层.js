/**
 * 尾调用：指函数的最后一步是调用另一个函数。
 * 尾调用优化：指只保留内层函数的调用帧，大大节省了内存。
 * 尾递归：函数调用自身称为递归，如果尾调用自身，称为尾递归。
 * 尾递归优化：递归非常消耗内存，因为需要保存成千上百个调用帧，很容易发生‘栈溢出’。
 * 尾递归只存在一个调用帧，永远不会发生‘栈溢出’。
 */

/**
 * @description n的阶层
 * @param {*} n
 * @param {*} total
 */
const factorial = (n, total = 1) => {
  if (n === 1) return total
  return factorial(n - 1, n * total)
}
console.log(factorial(5) === 120)


// 不够优化的例子
// function fn (n) {
//   if (n === 1) return n
//   return n * fn(n - 1)
// }
