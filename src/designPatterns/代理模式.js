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
 * 限制访问主体的行为
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
 * @虚拟代理
 * 控制对主体的访问时，加入了一些额外的操作
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


/**
 * @缓存代理
 * 可以为一些开销大的运算结果提供暂时的缓存，提升效率
 */
// 主体
function add () {
  console.log('执行了add')
  const arg = Array.prototype.slice.call(arguments)
  return arg.reduce((a, b) => a + b)
}
// 代理
var proxyAdd = (function () {
  const caches = new Map() // 闭包实现缓存数据

  return function () {
    console.log(caches)
    const arg = Array.prototype.slice.call(arguments).join(',')

    if (caches.has(arg)) {
      return caches.get(arg)
    }

    const result = add.apply(this, arguments)
    caches.set(arg, result)
    return result
  }
})()
proxyAdd(10, 20, 30, 40) // 执行add函数
proxyAdd(10, 20, 30, 40) // 直接读取缓存
