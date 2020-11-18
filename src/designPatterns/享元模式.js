/**
 * @享元模式
 * 一种用于性能优化的模式，它的目标是尽量减少共享对象的数量
 * 享元模式是一种用时间换空间的优化模式
 *
 * @核心
 * 运用共享技术来有效支持大量细粒度的对象
 * 强调将对象的属性划分为内部状态（属性）与外部状态（属性）。
 * 内部状态用于对象的共享，通常不变；而外部状态则剥离开来，由具体的场景决定。
 *
 * @优点
 * 大减少系统中的对象数量，节省内存就成了一件非常有意义的事情
 *
 * @缺点
 * 代码复杂度提高
 * 虽然组装外部状态成为一个完整对象的过程需要花费一定的时间，但却可以大大减少系统中的对象数量，
 * 相比之下，这点时间或许是微不足道的。因此，享元模式是一种用时间换空间的优化模式
 */


/**
 *@普通例子 对某个班进行身体素质测量，仅测量身高体重来评判
 */
// 创建人
function People (name, sex, age, height, weight) {
  this.name = name
  this.sex = sex
  this.age = age
  this.height = height
  this.weight = weight
}
// 开始评判
People.prototype.judge = function () {
  var ret = this.name + ': '
  if (this.sex === 'male') {
    ret += this.judgeMale()
  } else {
    ret += this.judgeFemale()
  }
  console.log(ret)
}
// 男性评判规则
People.prototype.judgeMale = function () {
  var ratio = this.height / this.weight
  return this.age > 20 ? (ratio > 3.5) : (ratio > 2.8)
}
// 女性评判规则
People.prototype.judgeFemale = function () {
  var ratio = this.height / this.weight
  return this.age > 20 ? (ratio > 4) : (ratio > 3)
}

// 生成多个对象
var a = new People('A', 'male', 18, 160, 80)
var b = new People('B', 'male', 21, 180, 70)
var c = new People('C', 'female', 28, 160, 80)
var d = new People('D', 'male', 18, 170, 60)
var e = new People('E', 'female', 18, 160, 40)

// 开始评判
a.judge() // A: false
b.judge() // B: false
c.judge() // C: false
d.judge() // D: true
e.judge() // E: true


/**
 *@享元模式 对某个班进行身体素质测量，仅测量身高体重来评判
 */

// 共享对象
function Fitness (sex) {
  this.sex = sex
}

// 工厂，创建可共享的对象
var FitnessFactory = {
  objs: [], // 类似对象池
  create: function (sex) {
    if (!this.objs[sex]) {
      this.objs[sex] = new Fitness(sex)
    }
    return this.objs[sex]
  },
}

// 管理器，管理非共享的部分
var FitnessManager = {
  fitnessData: {}, // 存储每个人的非共享部分

  // 添加一项
  add: function (name, sex, age, height, weight) {
    var fitness = FitnessFactory.create(sex)
    // 存储变化的数据
    this.fitnessData[name] = {
      age: age,
      height: height,
      weight: weight,
    }
    return fitness
  },

  // 从存储的数据中获取，更新至当前正在使用的对象
  updateFitnessData: function (name, obj) {
    var fitnessData = this.fitnessData[name]

    // 组装外部状态，耗费一定的时间,但是微不足道
    for (var item in fitnessData) {
      if (fitnessData.hasOwnProperty(item)) {
        obj[item] = fitnessData[item]
      }
    }
  },
}

// 开始评判
Fitness.prototype.judge = function (name) {
  // 操作前先更新当前状态（从外部状态管理器中获取）
  FitnessManager.updateFitnessData(name, this) // 修改this,即修改Fitness

  var ret = name + ': '

  if (this.sex === 'male') {
    ret += this.judgeMale()
  } else {
    ret += this.judgeFemale()
  }

  console.log(ret)
}

// 男性评判规则
Fitness.prototype.judgeMale = function () {
  var ratio = this.height / this.weight
  return this.age > 20 ? (ratio > 3.5) : (ratio > 2.8)
}
// 女性评判规则
Fitness.prototype.judgeFemale = function () {
  var ratio = this.height / this.weight
  return this.age > 20 ? (ratio > 4) : (ratio > 3)
}


var a1 = FitnessManager.add('A', 'male', 18, 160, 80)
var b1 = FitnessManager.add('B', 'male', 21, 180, 70)
var c1 = FitnessManager.add('C', 'female', 28, 160, 80)
var d1 = FitnessManager.add('D', 'male', 18, 170, 60)
var e1 = FitnessManager.add('E', 'female', 18, 160, 40)

// 开始评判
a1.judge('A') // A: false
b1.judge('B') // B: false
c1.judge('C') // C: false
d1.judge('D') // D: true
e1.judge('E') // E: true


/**
 * @共享对象的数量
 * 通常来讲，内部状态有多少种组合，系统中便最多存在多少个共享对象
 * 上面例子：共享属性性别通常只有男女两种，所以共享对象的数量为两个
 */


/**
 * @对象池
 * 对象池维护一个装载空闲对象的池子。
 * 如果需要对象的时候，不是直接new，而是转从对象池里获取。
 * 如果对象池里没有空闲对象，则创建一个新的对象。
 * 当获取出的对象完成它的职责之后，再进入池子等待被下次获取。 获取shift()、进入池子push()。
 */
