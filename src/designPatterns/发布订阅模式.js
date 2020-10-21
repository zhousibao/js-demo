/**
 * @发布订阅模式
 * 定义了对象间的一种一对多的依赖关系，当一个对象的状态发 生改变时，所有依赖于它的对象都将得到通知
 *
 * JS中的事件就是经典的发布-订阅模式的实现
 *
 * @优点
 * 1、为时间上的解耦。
 * 2、为对象之间的解耦。
 * 3、可以用在异步编程中与MV*框架中。
 * @缺点
 * 创建订阅者本身要消耗一定的时间和内存，订阅的处理函数不一定会被执行，驻留内存有性能开销。
 * 弱化了对象之间的联系，复杂的情况下可能会导致程序难以跟踪维护和理解。
 */

class EventEmitter {
  constructor () {
    // 事件对象，存放订阅的名字和事件,一个名字可以订阅多个事件
    this.events = {
      // click: [handle1, handle2],
    }
  }

  // 添加订阅
  on (eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback]
    } else {
      this.events[eventName].push(callback)
    }
  }

  // 触发订阅
  emit (eventName, ...rest) {
    this.events[eventName] && this.events[eventName].forEach(f => f.apply(this, rest))
  }

  // 移除订阅
  remove (eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(f => f !== callback)
    }
  }

  // 只执行一次订阅的事件，然后移除
  once (eventName, callback) {
    // 新建fn函数
    const fn = (...payload) => {
      callback.apply(this, payload) // fn函数中调用原有的callback
      this.remove(eventName, fn) // 执行fn后删除订阅
    }
    // 绑定的时fn
    this.on(eventName, fn)
  }
}


const event = new EventEmitter()
const handle = (...pyload) => console.log('click', pyload)
const handle1 = (...pyload) => console.log('dbclick', pyload)
event.on('click', handle)
event.emit('click', 100, 200, 300, 100)
event.emit('click', 100, 200, 300, 101)
event.remove('click', handle)
event.emit('click', 100, 200, 300, 102)
event.once('dbclick', handle1)
event.emit('dbclick', 100, 100)
event.emit('dbclick', 100, 101)
