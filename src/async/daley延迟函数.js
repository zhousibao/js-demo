/**
 * @description 延迟函数
 * @param {function} callback 需要延迟的函数
 * @param {number} daley 延迟毫秒数
 */

const daley = (callback, daley) => {
  if (Object.prototype.toString.call(callback) === '[object Function]') {
    setTimeout(callback, daley)
  }
}
const fn = () => { console.log('daley') }
daley(fn, 1000)


/**
 * @description 延迟函数 基于promise
 * @param {*} daley
 */
const daleyPromise = daley => {
  return new Promise(resolve => setTimeout(resolve, daley))
}
daleyPromise(2000).then(() => {
  console.log('daleyPromise')
})


/**
 * @description 延迟函数 基于Generator
 * @param {*} daley
 */
function * daleyGenerator (daley) {
  yield new Promise(resolve => setTimeout(resolve, daley))
}
daleyGenerator(3000).next().value.then(() => { console.log('daleyGenerator') })


/**
 * @description 延迟函数 基于async
 * @param {*} daley
 */
const daleyAsync = async daley => {
  await new Promise(resolve => setTimeout(resolve, daley))
  console.log('daleyAsync')
}
daleyAsync(4000)
