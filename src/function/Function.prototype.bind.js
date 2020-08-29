/**
 * Function.prototype.bind(thisArg, arg1, arg2, ...)
 * 创建一个新的函数,新函数的 this 被指定为 thisArg, 而其余参数将作为新函数的参数，供调用时使用。
 *
 * @实现对象的继承
 * @改变函数的上下文环境
 * @返回函数 不会立即执行 偏函数应用 柯里化(curry)
 */


// eslint-disable-next-line
Function.prototype._bind = function (thisArg) {
  const context = thisArg || window
  const self = this
  const args = Array.prototype.slice.call(arguments, 1)

  return function () {
    const funcArgs = Array.prototype.slice.call(arguments)
    return self.apply(context, [...args, ...funcArgs])
  }
}


var name = 'pan'
console.log(name) // 'pan

const obj = {
  name: 'zhou',
}
function hello () {
  return this.name
}

hello.bind()() // 'pan'
hello._bind()() // 'pan'

hello.bind(obj)() // 'zhou'
hello._bind(obj)() // 'zhou'
