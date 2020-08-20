/**
 * @回调函数
 * 把一个函数作为值传递给另外一个函数，在另外一个函数中把这个函数执行
 * 实现异步变成的方法，实现函数式编程重要的知识
 */


/**
 * @函数式编程
 * 注重结果，不在乎过程
 * 过程交给别人处理，体现函数封装性思想(提倡)
 * 把逻辑如何实现封装成为API方法，我们以后只要调取API方法，即可获取想要的结果即可
 */
const arr = [10, 20, 30, 40, 50]
const res = arr.reduce((n, item) => {
  return n + item
})
console.log(res)


/**
 * @命令式编程 注重过程，需要自己去实现过程
 */
let result = 0
for (let i = 0; i < arr.length; i++) {
  result += arr[i]
}
console.log(result)

