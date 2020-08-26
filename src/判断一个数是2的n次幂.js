const num = 2 ** 20
const num1 = 2 ** 20 + 1


/**
 * @简单的循环判断 性能差
 */
function check1 (num) {
  if (num < 1) return false
  if (num === 1) return true

  if (num > 1) {
    while (num !== 1) {
      if (num % 2 === 0) {
        num = num / 2
      } else {
        return false
      }
    }
    return true
  }
}
console.time('check1')
console.log(check1(num))
console.log(check1(num1))
console.timeEnd('check1')


/**
 * @与运算 通过二进制的方法可以判断
 * @一个数num只要是2的n次方幂 必然是最高位为1，其余为0，当num-1时，则最高位是0，其余是1.
 * @按位与运算 1&1=1  0&1=0 0&0=0 1&0=0
 */
function check2 (num) {
  if (num < 1) return false
  return (num & (num - 1)) === 0
}
console.time('check2')
console.log(check2(num))
console.log(check2(num1))
console.timeEnd('check2')


/**
 * @正则
 * @一个数只要是2的n次方幂转为2进制数都是以1开头0结尾的数
 * 2 => 10
 * 4 => 100
 * 8 => 1000
 */
function check3 (num) {
  if (num < 1) return false
  if (num === 1) return true
  return /^10*$/.test(num.toString(2))
}
console.time('check3')
console.log(check3(num))
console.log(check3(num1))
console.timeEnd('check3')


/**
 * @Math
 * Math.log2()方法
 */
function check4 (num) {
  return Number.isInteger(Math.log2(num))
}
console.time('check4')
console.log(check4(num))
console.log(check4(num1))
console.timeEnd('check4')
