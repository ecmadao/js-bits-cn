/**
 * 关于 new 关键字的一些事
 *
 * 当通过 new 来实例化一个构造函数时：
 * new ConstructorFunction(arg1, arg2);
 *
 * 它做了四件事：
 * 1. 创建一个新对象，仅仅是一个简单的对象
 * 2. 将对象的原型链 [[prototype]] 指向构造函数 prototype 属性上
 * 3. 使用新创建的对象（的作用域）来执行 ConstructorFunction
 * 4. 返回新创建的对象，除非构造方法返回的是一个原始值，那样的话就返回原始值
 *
 * 做好这些事以后，如果向新建的对象请求一个不存在的属性，则将会检查其原型链 [[prototype]] 上的对象
 * Functions, in addition to the hidden [[prototype]] property, also have a property called prototype, and it is this that you can access, and modify, to provide inherited properties and methods for the objects you make.
 *
 * 整个过程中，最难的部分就是第二步。所有的对象（包括函数）都有一个内置属性叫做原型链 [[prototype]]
 * 它只有在对象创建的时候才会进行设置，即当通过 new、Object.create，或者一些字面语句（方法依赖于 Function.prototype，数字依赖于 Number.prototype 等）
 * 原型链可以通过 Object.getPrototypeOf(someObject) 或者 __proto__ 或者 this.constructor.prototype 获取到
 *
 * @相关资料:
 * http://stackoverflow.com/questions/1646698/what-is-the-new-keyword-in-javascript
 * http://zeekat.nl/articles/constructors-considered-mildly-confusing.html
 * https://css-tricks.com/understanding-javascript-constructors/
 * https://john-dugan.com/object-oriented-javascript-pattern-comparison/
 */

// 当我们这样时
function Foo() {
  this.kind = 'foo';
}

var foo = new Foo();
foo.kind; //=> ‘foo’

// 在这背后其实有一系列的操作
function Foo() {
  // 实际上是不合法的，这样做只是为了讲解
  var this = {};                  // Step 1
  this.__proto__ = Foo.prototype; // Step 2
  this.kind = 'foo';              // Step 3
  return this;                    // Step 4
}


// 栗子
ObjMaker = function() {
  this.a = 'first';
};
// ObjMaker 仅仅是个函数，没啥特别的


ObjMaker.prototype.b = 'second';
// 跟其他函数一样，ObjMaker 有一个可以获取并改变的原型 prototype 属性
// 但也与其他对象一样，ObjMaker 还有一个我们不能获取/改变的 [[prototype]] 原型链属性


obj1 = new ObjMaker();
// 创建一个名为 obj1 的对象，一开始 obj1 和 {} 一样
// 然后 obj1 的 [[prototype]] 属性设置为 ObjMaker.prototype
// 注：
// 即便 ObjMaker.prototype 之后指向一个新的值，obj1 的 [[prototype]] 也不会变
// 但你可以通过添加 ObjMaker.prototype 中的属性，并将其加入到 obj1 的 prototype 和 [[prototype]] 中
// ObjMaker 方法执行完成之后，obj1.a 将指向 'first'

obj1.a;
// first

obj1.b;
// obj1 中并没有叫做 b 的属性，因此 JavaScript 将会检查其原型链，即检查 ObjMaker.prototype
// 而 ObjMaker.prototype 中有名为 b 的属性，所以返回 second

// 这就像是类的继承，任何你通过 new ObjMaker() 创建的实例都会继承 b 属性
// 如果你想要一个子类，可以这么干：
// If you want something like a subclass, then you do this:
SubObjMaker = function () {};
SubObjMaker.prototype = new ObjMaker(); // 注：不赞成使用这样的方式！
// 当我们使用 new 来调用时，SubObjMaker.prototype 的原型链 [[prototype]] 属性指向 ObjMaker.prototype
// 而更好的做法则是使用 ECMAScript 5 中的 Object.create() 方法：
// SubObjMaker.prototype = Object.create(ObjMaker.prototype);

SubObjMaker.prototype.c = 'third';
obj2 = new SubObjMaker();
// obj2 的 [[prototype]] 属性指向 SubObjMaker.prototype
// 但请记住，SubObjMaker.prototype 的 [[prototype]] 指向 ObjMaker.prototype
// obj2 ---> SubObjMaker.prototype ---> ObjMaker.prototype

obj2.c;
// returns 'third', from SubObjMaker.prototype

obj2.b;
// returns 'second', from ObjMaker.prototype

obj2.a;
// returns 'first', from SubObjMaker.prototype
// 因为 SubObjMaker.prototype 是通过 ObjMaker 创建的，已经拥有了 a 属性
