/**
 * @description 节流函数：让某个函数在一定时间间隔内只执行一次。
 * 适用于函数被频繁调用的场景，例如：window.onresize()事件、mousemove事件、上传进度等情况。
 * @param fn 需要处理的函数
 * @param delay 节流时间
 */
const throttle1 = (fn, delay = 200) => {
  let pre = 0
  return (...rest) => {
    const now = Date.now()
    if (now - delay > pre) {
      pre = now
      fn.apply(this, rest)
    }
  }
}

/**
 * @description 节流函数
 * @param fn 需要处理的函数
 * @param delay 节流时间
 */
const throttle2 = (fn, delay = 200) => {
  let canRun = true // 通过闭包保存一个标记
  return (...rest) => {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, rest)
      canRun = true
    }, delay)
  }
}

const fn1 = throttle1(() => console.log('fn1 函数执行了'), 1000)
const fn2 = throttle2(() => console.log('fn2 函数执行了'), 1000)
setInterval(fn1, 10)
setInterval(fn2, 10)


/**
 * @description 防抖函数：某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次。
 * 适用于场景，例如：input事件n秒后触发请求、scroll事件多少秒后出他其他事件。
 * @param {function} fn 需要处理的函数
 * @param {number} delay 防抖时间
 * @param {boolean} immediate 是否立即执行一次
 */
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

var input = document.getElementById('input')
input.addEventListener('input', debounce(() => console.log('fn2 函数执行了'), 1000))
