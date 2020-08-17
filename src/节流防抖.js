/**
 * @description 节流函数
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
