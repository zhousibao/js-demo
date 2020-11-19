/**
 * @中介者模式
 * 所有的相关对象都通过中介者对象来通信，而不是互相引用，所以当一个对象发生改变时，只需要通知中介者对象即可。
 *
 * @核心
 * 使网状的多对多关系变成了相对简单的一对多关系
 * 复杂的调度处理都交给中介者
 */


/**
 * @列子
 * A自己处理
 * B、C交给中介者处理
 */
var A = {
  score: 10,
  changeTo: function (score) {
    this.score = score
    this.getRank() // 自己获取
  },

  // 直接获取
  getRank: function () {
    var scores = [this.score, B.score, C.score].sort(function (a, b) {
      return a < b
    })
    console.log(scores.indexOf(this.score) + 1)
  },
}

var B = {
  score: 20,
  changeTo: function (score) {
    this.score = score
    rankMediator(B) // 通过中介者获取
  },
}

var C = {
  score: 30,
  changeTo: function (score) {
    this.score = score
    rankMediator(C)
  },
}

// 中介者，计算排名
function rankMediator (person) {
  var scores = [A.score, B.score, C.score].sort(function (a, b) {
    return a < b
  })
  console.log(scores.indexOf(person.score) + 1)
}

// A通过自身来处理
A.changeTo(100) // 1

// B和C交由中介者处理
B.changeTo(200) // 1
C.changeTo(50) // 3
