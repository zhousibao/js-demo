/**
 * @浅拷贝 根据原对象拷贝出一个新对象。
 * @如果对象的属性是基本类型值拷贝的就是基本类型的值
 * @如果对象的属性是引用类型拷贝的就是内存地址
 *
 * @浅拷贝
 * Object.assign(target, ...sources) 将所有自身的可枚举属性从一个或多个源对象复制到目标对象，同时返回目标对象
 * 扩展运算符(...)
 * Array.prototype.slice()
 */

/**
 * @深拷贝 会创造出一个一模一样的对象
 * @新对象跟原对象不共享内存
 * @修改新对象不会改到原对象
 * @拷贝相比于浅拷贝速度较慢并且花销较大
 * @方法 jQuery.extend() lodash.cloneDeep()
 */


const obj = {
  a: 1,
  b: {
    b1: /^123$/,
    b2: new Date(),
  },
  c: 'name',
  d: true,
  e: undefined,
  f: null,
  g: function () {},
  h: Symbol('h'),
}
obj.obj = obj
// console.log('obj:', obj)rm

/**
 * @利用JSON方法 简单暴力
 *
 * @缺点 当值为undefined、function、symbol 会在转换过程中被忽略，导致属性丢失。
 * @缺点 正则会被转为空对象 {}
 * @缺点 new Date()转换结果不一致。//浏览器环境
 * @缺点 循环引用情况下，会报错。
 */
// function deepCopyJson (obj) {
//   return JSON.parse(JSON.stringify(obj))
// }
// console.log(deepCopyJson(obj))



/**
 * @利用递归方法完成深拷贝方法
 */
function deepCopy (obj) {
  const map = new Map() // 记录出现过的对象，用于处理循环引用

  function copy(obj){
    map.set(obj, obj);

    if (typeof obj !== 'object' || obj === null) {
      return obj
    }
    if ((obj instanceof Date) || obj instanceof RegExp) {
      return obj
    }

    const result = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        // 处理循环引用
        if(map.has(obj[key])){
          result[key] = map.get(obj[key]);
          continue;
        }
        
        result[key] = deepCopy(obj[key]) // 递归复制
      }
    }
    return result
  }

  return copy(obj)
}
// console.log('deepCopy', deepCopy(obj))



/**
 * @description 深度遍历实现深拷贝
 */
function deepCopyDFS(obj){
  const stack = [] // 使用栈的特性，后进先出
  const map = new Map() // 记录出现过的对象，用于处理循环引用

  function getEmpty(o){
    if(Object.prototype.toString.call(o) === '[object Object]')  return {}
    if(Object.prototype.toString.call(o) === '[object Array]') return []
    return o
  }
  
  const result = getEmpty(obj)
  // 判断返回的对象和原有对象是否相同就可以知道是否需要继续深拷贝
	if(result !== obj){
		stack.push([obj, result]);
		map.set(obj, result);
  }
  
  // 
  while(stack.length){
    let [o, res] = stack.pop()
    for(let key in o){
      // 处理循环引用
      if(map.has(o[key])){
        res[key] = map.get(o[key])
        continue
      }

      res[key] = getEmpty(o[key])
      if(res[key] !== o[key]){
				stack.push([o[key], res[key]]);
				map.set(o[key], res[key]);
			}
    }
  }
  return result
}
console.log('deepCopyDFS', deepCopyDFS(obj))




/**
 * @description 广度遍历实现深拷贝
 */
function deepCopyBFS(obj){
  const queue = [] // 使用队列的特性，先进先出
  const map = new Map() // 记录出现过的对象，用于处理循环引用

  function getEmpty(o){
    if(Object.prototype.toString.call(o) === '[object Object]')  return {}
    if(Object.prototype.toString.call(o) === '[object Array]') return []
    return o
  }
  
  const result = getEmpty(obj)
  // 判断返回的对象和原有对象是否相同就可以知道是否需要继续深拷贝
	if(result !== obj){
		queue.push([obj, result]);
		map.set(obj, result);
  }
  
  // 
  while(queue.length){
    let [o, res] = queue.shift()
    for(let key in o){
      // 处理循环引用
      if(map.has(o[key])){
        res[key] = map.get(o[key])
        continue
      }

      res[key] = getEmpty(o[key])
      if(res[key] !== o[key]){
				queue.push([o[key], res[key]]);
				map.set(o[key], res[key]);
			}
    }
  }
  return result
}
console.log('deepCopyBFS', deepCopyBFS(obj))
