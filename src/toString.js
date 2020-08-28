/**
 * @toString 当前对象以字符串的形式返回 // 返回的都是字符串类型
 */

/**
 * @String 返回字符串值
 */
const str = 'str'
const Str = new String('str')
console.log('str', str.toString() === str) // true
console.log('Str', Str.toString() === Str) // false // 相等但是不全等 前者为string类型，后者为object类型


/**
 * @Number 返回数值的字符串表示。还可返回以指定进制表示的字符串
 */
const num = 8
console.log('num', num.toString()) // '8'
console.log(num.toString(2)) // '1000' // 2进制
console.log(num.toString(8)) // '10' //  8进制


/**
 * @Boolean 返回'true'、'false'
 */
const bool = true
console.log('bool', bool.toString())


/**
 * @Array 将Array的每个元素用英文逗号连接起来 // 功能等同于 Array.prototype.join(',')
 */
const arr = ['tom', 23, false]
console.log('arr', arr.toString()) // "tom,23,false"
console.log(arr.join(',') === arr.toString()) // true


/**
 * @Object 返回“[object ObjectName]” // 其中ObjectName是对象类型的名称。// 对象类型的名称，注意不是对象的名称。
 * Object.prototype.toString.call(obj) // 准确检测数据类型的方法
 */
const obj = { name: 'jackwen', age: 23 }
console.log(obj.toString()) // "[object Object]"
console.log(Object.prototype.toString.call(123)) // "[object Number]"
console.log(Object.prototype.toString.call(() => {})) // "[object Function]"


/**
 * @Function 把方法转换成字符串
 */
const fn = function () { console.log('I am a fn') }
const fn1 = () => { console.log('I am a fn1') }
console.log(fn.toString()) // "function () { console.log('I am a fn') }"
console.log(fn1.toString()) // "() => { console.log('I am a fn1') }"
