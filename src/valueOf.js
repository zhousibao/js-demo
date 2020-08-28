/**
 * @valueOf 返回一个对象的原始值 // undefined、null没有valueOf方法。
 */


/**
 * @String 返回字符串值
 */
const str = 'str'
const Str = new String('str')
console.log('str', str.valueOf() === str) // true
console.log('Str', Str.valueOf() === Str) // false // 相等但是不全等 前者为string类型，后者为object类型


/**
 * @Number 返回数字值
 */
const num = 123
const Num = new Number(123)
console.log('num', num.valueOf() === num) // true
console.log('Num', Num.valueOf() === Num) // false


/**
 * @Boolean 返回布尔值
 */
const bool = true
const Bool = new Boolean(true)
console.log('bool', bool.valueOf() === bool) // true
console.log('Bool', Bool.valueOf() === Bool) // false


/**
 * @Array 返回本身
 */
const arr = ['arr', true, 12, -5]
console.log('arr', arr.valueOf() === arr) // true


/**
 * @Function 返回函数本身
 */
function fn () { }
const fn1 = (x, y) => x + y
const fn2 = () => {
  console.log(fn2)
}
console.log('fn', fn.valueOf() === fn)
console.log('fn1', fn1.valueOf() === fn1)
console.log('fn2', fn2.valueOf() === fn2)


/**
 * @Object 返回对象本身
 */
const obj = { name: '张三', age: 18 }
console.log('obj', obj.valueOf() === obj) // true


/**
 * @Date 返回时间戳
 */
const date = new Date(2013, 7, 18, 23, 11, 59, 230)
console.log('date', date.valueOf()) // 1376838719230
