/**
 * @deprecated 实现复制字符串n次
 * String.prototype.repeat(n) // ES6
 */

const repeatStr = (str, n) => new Array(n + 1).join(str)


const str = 'hello'

console.log(repeatStr(str, 3))
console.log(str.repeat(3))
