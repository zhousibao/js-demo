/**
 * @装饰者模式
 * 以动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象。
 *
 *
 * @优点
 * 装饰类和被装饰类可以独立发展，不会相互耦合
 * 装饰模式是继承的一个替代模式
 * 装饰模式可以动态扩展一个实现类的功能，而不必担心影响实现类
 *
 * @缺点
 * 如果管理不当会极大增加系统复杂度
 * 多层装饰比较复杂
 * 不熟悉这个模式的开发人员难以理解
 */

/**
 * @面向对象的方法
 */
function Person () {}
Person.prototype.skill = function () {
  console.log('数学')
}

// 装饰器，还会音乐
function MusicDecorator (person) {
  this.person = person
}
MusicDecorator.prototype.skill = function () {
  this.person.skill()
  console.log('音乐')
}

// 装饰器，还会跑步
function RunDecorator (person) {
  this.person = person
}
RunDecorator.prototype.skill = function () {
  this.person.skill()
  console.log('跑步')
}

var person = new Person()
var person1 = new RunDecorator(new MusicDecorator(person)) // 装饰一下
person.skill() // 数学
person1.skill() // 数学 音乐 跑步


/**
 * @函数式
 */
// 装饰器，在当前函数执行前先执行另一个函数
function decoratorBefore (fn, beforeFn) {
  return function () {
    var ret = beforeFn.apply(this, arguments)

    // 在前一个函数中判断，不需要执行当前函数
    if (ret !== false) {
      fn.apply(this, arguments)
    }
  }
}

function skill () {
  console.log('数学')
}
function skillMusic () {
  console.log('音乐')
}
function skillRun () {
  console.log('跑步')
}

var skillDecorator = decoratorBefore(skill, skillMusic)
skillDecorator = decoratorBefore(skillDecorator, skillRun)
// 注意执行顺序，和@装饰器一样
skillDecorator() // 跑步 音乐 数学
