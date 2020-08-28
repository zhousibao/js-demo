/**
 * @new运算符 // 创建构造函数的实例
 * @new操作符的优先级 // new Foo() >  Foo() > new Foo
 *
 * @原理
 * @创建一个空对象
 * const obj = {}
 * @链接到原型
 * const Constructor = [].shift.call(arguments);
 * obj.__proto__ = Constructor.prototype;  // 让 obj 的 proto 属性指向构造函数的原型
 * @绑定this
 * const result = Constructor.apply(obj,arguments);
 * @返回对象
 * return typeof result === "object" ? result : obj;
 */


// es5
function _newES5 () {
  var obj = {}
  var Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constructor.prototype
  var result = Constructor.apply(obj, arguments)
  return typeof result === 'object' ? result : obj
}

// es6
function _newES6 (fn, ...rest) {
  const obj = Object.create(fn.prototype) // 第一、第二步骤
  const result = fn.apply(obj, rest)
  return result instanceof Object ? result : obj
}

function fn (name) {
  this.name = name
  this.age = 20
}

const obj1 = _newES5(fn, 'zhou')
const obj2 = _newES6(fn, 'pan')
console.log('obj1', obj1, obj1 instanceof fn)
console.log('obj2', obj2, obj2 instanceof fn)


/**
 * @面试题 浏览器中执行
 */
function Foo() {
  getName = function () { 
    console.log(1); 
  };
  return this;
}
Foo.getName = function () { 
  console.log(2); 
};
Foo.prototype.getName = function () { 
  console.log(3); 
};
var getName = function () { 
  console.log(4);
};
function getName() { 
  console.log(5);
}


Foo.getName() // 2 静态方法
getName() // 4 函数声明优先于变量声明。
Foo().getName()  // 1 隐式绑定返回this等于window; getName被重新赋值。
getName() // 1
new Foo.getName() // 2  Foo.getName()优先级高 => 先执行静态方法，再生成实例
new Foo().getName() // 3 new Foo()优先级高 => 先生成实例，再执行原型方法
new new Foo().getName() // 3 new Foo()优先级高  => 先生成实例，再执行原型方法，最后再生成实例



/**
 * @使Generator函数可以作为构造函数与new命令一同使用
 */
function* gen(){
  this.a = 'a'
  yield this.b = 'b'
  yield this.c = 'c'
}
function F() {
  return gen.call(gen.prototype); // 使用call方法绑定prototype对象
}
const f = new F();
f.next();  // Object {value: 2, done: false} // 必须执行一次next()才能得到属性
f.next();  // Object {value: 3, done: false}
f.next();  // Object {value: undefined, done: true}
console.log(f.a)
console.log(f.b)
console.log(f.c)