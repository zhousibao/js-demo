/**
 * Function.prototype.apply(thisArg, [argsArray])
 * 方法使用一个指定的 thisArg 值, 以及作为一个数组的参数
 *
 * @实现对象的继承
 * @改变函数的上下文环境
 * @立即执行
 */

// eslint-disable-next-line
Function.prototype._apply = function (thisArg,argsArray) {
  const context = thisArg || window
  context.fn = this // this表示当前函数
  let result
  if (argsArray) {
    result = context.fn(...argsArray)
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}


var name = 'pan'
console.log(name) // 'pan

const obj = {
  name: 'zhou',
}
function hello () {
  return this.name
}

hello.apply() // 'pan'
hello._apply() // 'pan'

hello.apply(obj) // 'zhou'
hello._apply(obj) // 'zhou'
