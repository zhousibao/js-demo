/**
 * @柯理化 将多参数函数转为单参数函数
 * 就是封装「一系列的处理步骤」，通过闭包将参数集中起来计算，最后再把需要处理的参数传进去。
 * @原理 闭包 保留外层函数的调用栈
 */

/**
 * @柯里化的作用
 * 1、延迟执行
 * 2、参数复用
 * Function.prototype.bind() 也有参数复用、延迟执行的效果
*/

/**
 * @柯理化存在的一些性能问题
 * 1、存取arguments对象通常要比存取命名参数要慢一点
 * 2、一些老版本的浏览器在arguments.length的实现上是相当慢的
 * 3、使用 fn.apply() 和 fn.call()通常比直接调用 fn() 稍微慢点
 * 4、创建大量嵌套作用域和闭包函数会带来花销，无论是在内存还是速度上
 *
 * @大部分应用中主要的性能瓶颈是在操作DOM节点上
 * @js的性能损耗基本是可以忽略不计
 * @所以柯里化是可以直接放心使用的
 */


// 简单的柯理化
function action (type) {
  return (name) => `${type}:${name}`
}
const hello = action('hello')
hello('张三')
hello('李四')


/**
 * @封装一个通用的柯里化函数
 * @param {function} fn
 * @param  {...any} args
 */
const currying = (fn, ...args) => {
  // fn.length 回调函数的参数的总和
  // args.length currying函数 后面的参数总和
  if (fn.length === args.length) {
    return fn(...args)
  } else {
    // 继续分步传递参数 newArgs 新一次传递的参数
    return (...newArgs) => {
      // 将先传递的参数和后传递的参数 结合在一起
      const allArgs = [...args, ...newArgs]
      return currying(fn, ...allArgs)
    }
  }
}

// add的参数不固定，看有几个数字累计相加
function add (a, b, c, d) {
  return a + b + c + d
}
const fn1 = currying(add, 1, 2) // 3
const fn2 = fn1(3) // 6
console.log(fn2(4)) // 10

