/**
 * @代理模式
 * 为一个对象提供一个代理，以便控制对他的访问
 *
 * @用途
 * 保护代理：过滤字符串
 * 虚拟代理：在控制对主体的访问时，加入了一些额外的操作
 */


/**
 * @保护代理
 */
// 主体，发送消息
function sendMsg (msg) {
  console.log(msg)
}
// 代理，对消息进行过滤
function proxySendMsg (msg) {
  if (typeof msg === 'undefined') {
    console.log('deny')
    return
  }

  // 有消息则进行过滤
  msg = ('' + msg).replace(/泥\s*煤/g, '')
  sendMsg(msg)
}
sendMsg('泥煤呀泥 煤呀') // 泥煤呀泥 煤呀
proxySendMsg('泥煤呀泥 煤') // 呀
proxySendMsg() // deny


/**
 * 虚拟代理
 */
// 函数防抖，频繁操作中不处理，直到操作完成之后（再过 delay 的时间）才一次性处理
const debounce = (fn, delay = 200, immediate = false) => {
  let timeOut = null
  return (...rest) => {
    // 存在定时器，则直接清空
    if (timeOut) clearTimeout(timeOut)

    // 是否立即执行一次
    if (immediate && !timeOut) {
      fn.apply(this, rest)
    }

    timeOut = setTimeout(() => {
      fn.apply(this, rest)
    }, delay)
  }
}

var count = 0
// 主体
function scrollHandle (e) {
  console.log(e.type, ++count) // scroll
}
// 代理
var proxyScrollHandle = (function () {
  return debounce(scrollHandle, 500)
})()
window.onscroll = proxyScrollHandle

