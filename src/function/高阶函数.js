/**
 * @高阶函数 对其他函数进行操作的函数
 * 1、接受一个或多个函数作为输入。
 * 2、输出一个函数。
 * 存在以上一条即可以称做高阶函数
 *
 * 高阶函数
 * Array.prototype.map()
 * Array.prototype.filter()
 * Array.prototype.reduce()
 */


/**
 * @判断变量类型的高阶函数
 */
const isType = (type) => (obj) => Object.prototype.toString.call(obj) === '[object ' + type + ']'
const isNumber = isType('Number')
console.log(isNumber(1))
console.log(isType('String')('a'))


/**
 * @完成一个无限累加的函数add
 *
 * 要求
 * add(1); // 1
 * add(1)(2); // 3
 * add(1)(2, 3); // 6
 * add(1, 2)(3); // 6
 */

const add = (...arg) => {
  // 第一次调用函数时生成一个闭包来存储结果
  let result = 0
  // 遍历输入参数加到res上
  arg.forEach(i => {
    result = result + i
  })

  const fn = (...rest) => {
    rest.forEach(i => {
      result = result + i
    })
    return fn
  }

  // 打印函数时会自动调用 toString()方法
  fn.toString = function () {
    return result
  }

  return fn
}

add(1) // 1
add(1)(2) // 3
add(1)(2, 3) // 6
add(1, 2)(3) // 6

