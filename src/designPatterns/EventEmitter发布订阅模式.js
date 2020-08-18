/**
 * @发布订阅模式
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
