/**
 * @模版方法模式
 * 模板方法模式由两部分结构组成，第一部分是抽象父类，第二部分是具体的实现子类。
 *
 * 模板方法模式一般的实现方式为继承
 *
 * 在抽象父类中封装子类的算法框架，它的init方法可作为一个算法的模板，指导子类以何种顺序去执行哪些方法。
 * 由父类分离出公共部分，要求子类重写某些父类的（易变化的）抽象方法。
 */

/**
 * @父类
 */
function Sport () {}
Sport.prototype = {
  constructor: Sport,

  // 模板，按顺序执行
  init: function () {
    this.stretch()
    this.jog()
    this.start()
    var free = this.end()

    // 运动后还有空的话，就拉伸一下
    if (free !== false) {
      this.stretch()
    }
  },

  // 拉伸
  stretch: function () {
    console.log('拉伸')
  },
  // 慢跑
  jog: function () {
    console.log('慢跑')
  },
  // 开始运动
  start: function () {
    // 易变化的抽象方法
    throw new Error('子类必须重写此方法')
  },
  // 结束运动
  end: function () {
    console.log('运动结束')
  },
}


/**
 * @子类1
 */
function Basketball () {}
Basketball.prototype = new Sport()
// 重写相关的方法
Basketball.prototype.start = function () {
  console.log('先投上几个三分')
}
Basketball.prototype.end = function () {
  console.log('运动结束了，有事先走一步')
  return false
}


/**
 * @子类2
 */
function Marathon () {}
Marathon.prototype = new Sport()

var basketball = new Basketball()
var marathon = new Marathon()


basketball.init() // 拉伸 -> 慢跑 -> 先投上几个三分 -> 运动结束了，有事先走一步
marathon.init() // 拉伸 -> 慢跑 -> Error(子类必须重写此方法)
