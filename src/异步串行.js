/**
 * @description 异步串行
 * 这道面试题主要的目的是考察对于异步串行流的控制，巧妙的利用自身的递归设计来处理传入的参数也是一个 flow的情况，在编写题目的过程中展示你对 Promise 的熟练运用，一定会让面试官对你刮目相看的~
 */

// 题目
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const subFlow = createFlow([() => delay(1000).then(() => console.log('c'))])
createFlow([
  () => console.log('a'),
  () => console.log('b'),
  subFlow,
  [() => delay(1000).then(() => console.log('d')), () => console.log('e')],
]).run(() => {
  console.log('done')
})
// 实现 createFlow, // 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
// 提示: flow 是指一系列 effects 组成的逻辑片段、flow 支持嵌套 、effects的执行只需要支持串行。


/**
 * @description 方法一
 *
 */
function createFlow (effects = []) {
  const sources = effects.slice().flat()
  const run = cb => {
    while (sources.length) {
      const task = sources.shift()
      // 把cb放到下一个flow的cb时机里执行,
      const next = () => createFlow(sources).run(cb)
      if (typeof task === 'function') {
        const res = task()
        if (res && res.then) {
          // 如果是Promise，则中断本次的 flow 执行，并且用剩下的 sources 去建立一个新的 flow，
          // 并且在上一个 Promise 的 then 方法里再去异步的开启新的 flow 的 run。 // 重要
          res.then(next)
          return
        }
      } else {
        // 如果task是另一个flow，直接调用flow的run方法，
        // 把剩下的 sources 创建的新的 flow，放入callback位置，在所有的任务都结束后再执行。
        task.run(next)
        return
      }
    }
    cb && cb()
  }
  return {
    run,
  }
}

/**
 * @description 方法二
 * async await
 */
// function createFlow (effects = []) {
//   // 不要影响入参
//   const sources = effects.slice().flat()
//   const run = async (cb) => {
//     while (sources.length) {
//       const task = sources.shift()
//       if (typeof task === 'function') {
//         await task()
//       } else {
//         await task.run()
//       }
//     }
//     cb && cb()
//   }
//   return {
//     run,
//   }
// }
