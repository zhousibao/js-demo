/**
 * @观察者模式 new Proxy(target, handler)
 * @target 表示要拦截的目标对象
 * @handler 也是一个对象，用来定制拦截行为。
 *
 */


// 存储action
const actionList = new Set()
// 添加方法
const addAction = fn => actionList.add(fn)
// 拦截行为对象
const handle = {
  get: (target, key, receiver) => {
    // target目标对象 receiver是Proxy实例
    const val = Reflect.get(target, key, receiver)
    actionList.forEach(action => action(target)) // 调用观察者自定义的方法
    return val
  },
  set: (target, key, val, receiver) => {
    const oldVal = Reflect.get(target, key, receiver)

    if (oldVal !== val) {
      Reflect.set(target, key, val, receiver)
      actionList.forEach(action => action(target))
    }
  },
}
// 观察者函数
const Observer = obj => new Proxy(obj, handle)


// 例子
const obj = {
  name: '张三',
  age: 20,
  getName: function () {
    console.log(this.name)
  },
}
function print (target) {
  console.log(`print: ${target.name}, ${target.age}`)
}
const person = Observer(obj)
addAction(print)
person.name = '李四'
person.getName() // 注意getName触发了两次拦截，一次获取getName、一次获取name
