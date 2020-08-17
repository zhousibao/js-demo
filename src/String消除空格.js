/**
 * @description 字符串去空
 * 消除字符串两端的空格 String.prototype.trim()
 * 消除字符串头部的空格 String.prototype.trimStart()
 * 消除字符串尾部的空格 String.prototype.trimEnd()
 */

// 去除所有空白符
function stringTrim (str) {
  if (str && typeof str === 'string') {
    return str.replace(/\s*/g, '')
  }
}

// 去除前后空白符
function stringTrimSE (str) {
  if (str && typeof str === 'string') {
    return str.replace(/(^\s*)|(\s*)$/g, '')
  }
}

const str = ' a b '

console.log(str.trim())
console.log(str.trimStart())
console.log(str.trimEnd())
console.log(stringTrim(str))
console.log(stringTrimSE(str))
