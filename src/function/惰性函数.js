/**
 * @封装一个获取元素样式的函数
 * window.getComputedStyle Google浏览器兼容
 * element.currentStyle IE浏览器兼容
 */


/**
 * @普通函数封装
 * @缺点 如果需要3次获取元素的样式，明显每一次进入函数都需要判断该方法兼容与否，这就造成了不必要的浪费
 */
function getCss (element, attr) {
  if ('getComputedStyle' in window) {
    return window.getComputedStyle(element)[attr]
  }
  return element.currentStyle[attr]
}
console.time('普通函数')
getCss(document.body, 'margin')
getCss(document.body, 'padding')
getCss(document.body, 'width')
getCss(document.body, 'height')
console.timeEnd('普通函数')

/**
 * @惰性函数
 * @优点 第一次执行函数就已经可以确定getComputedStyle兼容与否了，所以在第二次就没必要再判断了
 */
let getStyle = (element, attr) => {
  if ('getComputedStyle' in window) {
    getStyle = (element, attr) => window.getComputedStyle(element)[attr]
  } else {
    getStyle = (element, attr) => element.currentStyle[attr]
  }

  // 为了第一次也能拿到值
  return getStyle(element, attr)
}
console.time('惰性函数')
getStyle(document.body, 'margin')
getStyle(document.body, 'padding')
getStyle(document.body, 'width')
getStyle(document.body, 'height')
console.timeEnd('惰性函数')
