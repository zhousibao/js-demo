/**
 * Function.prototype.call(thisArg, arg1, arg2, ...)
 * 方法使用一个指定的 thisArg 值和单独给出的一个或多个参数来调用一个函数
 *
 * @改变函数的上下文环境
 * @实现对象的继承
 * @立即执行
 */

// eslint-disable-next-line
Function.prototype._call = function (thisArg) {
  const context = thisArg || window
  context.fn = this // this表示当前函数
  const args = [...arguments].slice(1) // 得到其他参数
  const result = context.fn(...args)
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

hello.call() // 'pan'
hello._call() // 'pan'

hello.call(obj) // 'zhou'
hello._call(obj) // 'zhou'
