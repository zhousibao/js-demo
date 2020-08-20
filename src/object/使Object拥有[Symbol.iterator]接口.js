// 让对象拥有[Symbol.iterator]接口 即让对象可以使用for...of遍历

const es6 = {
  edition: 6,
  committee: 'TC39',
  standard: 'ECMA-262',
}

/**
 * @description Object.keys()
 */
const iterator1 = obj => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return
  console.log('iterator1')
  for (const key of Object.keys(obj)) {
    console.log(key, ':', obj[key])
  }
}

iterator1(es6)


/**
 * @description Object.entries()
 */
const iterator2 = obj => {
  if (Object.prototype.toString.call(obj) !== '[object Object]') return
  console.log('iterator2')
  for (const [key, val] of Object.entries(obj)) {
    console.log(key, ':', val)
  }
}
iterator2(es6)


/**
 * @description Object.keys() 和 Generator生成器
 */
const iterator3 = obj => {
  function * gen (obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') return
    for (const key of Object.keys(obj)) {
      yield [key, obj[key]]
    }
  }
  console.log('iterator3')
  for (const [key, val] of gen(obj)) {
    console.log(key, ':', val)
  }
}
iterator3(es6)


/**
 * @description 给对象添加[Symol.iterator]属性
 */
function * gen () {
  for (const key of Object.keys(this)) {
    yield [key, this[key]]
  }
}
es6[Symbol.iterator] = gen
console.log('[Symol.iterator]')
for (const [key, val] of es6) {
  console.log(key, ':', val)
}

