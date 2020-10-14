/**
 * @策略模式
 * 定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。
 *
 * 一个基于策略模式的程序至少由两部分组成：
 * 第一个部分是一组策略类，策略类封装了具体的算法，并负责具体的计算过程。
 * 第二个部分是环境类Context，Context接受客户的请求，随后把请求委托给某一个策略类。
 *
 * @优点
 * 利用组合、委托和多态等技术思想，有效避免多重条件选择语句。
 * 提供了对开放-封闭原则的完美支持，更于理解、更于支持。
 */


/**
 * @表单验证
 */
// 错误提示
var errorMsgs = {
  default: '输入数据格式不正确',
  minLength: '输入数据长度不足',
  isNumber: '请输入数字',
  required: '内容不为空',
}
// 规则集 // 策略类
var rules = {
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg || errorMsgs.minLength
    }
  },
  isNumber: function (value, errorMsg) {
    if (!/\d+/.test(value)) {
      return errorMsg || errorMsgs.isNumber
    }
  },
  required: function (value, errorMsg) {
    if (value === '') {
      return errorMsg || errorMsgs.required
    }
  },
}

// 校验器
function Validator () {
  this.items = []
};

Validator.prototype = {
  constructor: Validator,

  // 添加校验规则
  add: function (value, rule, errorMsg) {
    var arg = [value]

    if (rule.indexOf('minLength') !== -1) {
      var temp = rule.split(':')
      arg.push(temp[1])
      rule = temp[0]
    }

    arg.push(errorMsg)
    this.items.push(function () {
      // 进行校验
      return rules[rule].apply(this, arg)
    })
  },

  // 开始校验
  start: function () {
    for (var i = 0; i < this.items.length; ++i) {
      var ret = this.items[i]()
      if (ret) {
        console.log(ret)
        // return ret;
      }
    }
  },
}

// 测试数据
function testTel (val) {
  return val
}

var validate = new Validator()
validate.add(testTel('ccc'), 'isNumber', '只能为数字') // 只能为数字
validate.add(testTel(''), 'required') // 内容不为空
validate.add(testTel('123'), 'minLength:5', '最少5位') // 最少5位
validate.add(testTel('12345'), 'minLength:5', '最少5位')

var ret = validate.start()
console.log(ret)
