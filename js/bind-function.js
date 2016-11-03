/**
 * Function.prototype.bind()
 *
 * bind 方法实际上返回了一个新的函数，新函数里的 this，由 bind 时传入的参数决定
 *
 * 针对低版本浏览器也有兼容性的实现 (< IE9)
 *
 * @参考资料:
 * https://www.smashingmagazine.com/2014/01/understanding-javascript-function-prototype-bind/
 * http://stackoverflow.com/a/10115970/1672655
 * http://ejohn.org/apps/learn/#86
 *
 * Complex Scenario with promises:
 * http://adgllorente.com/2016/03/to-bind-or-not-to-bind/
 */

// Polyfill for bind()
Function.prototype.bind = function () {
  var fn = this;
  var args = Array.prototype.slice.call(arguments);
  // 获取第一个参数
  var context = args.shift();

  return function () {
    return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  };
};

// 我们想通过 bind 解决什么问题？
var myObj = {
  specialFunction: function () {
  },
  anotherSpecialFunction: function () {
  },
  getAsyncData: function (cb) {
    cb();
  },
  render: function () {
    var that = this;
    this.getAsyncData(function () {
      that.specialFunction();
      that.anotherSpecialFunction();
    });
  }
};

myObj.render();
// 如果只是通过 this.specialFunction() 调用方法，则会收到如下的错误信息：
// Uncaught TypeError: Object [object global] has no method 'specialFunction'


// 通过 bind() 来解决它：
// 当回调函数被调用时，需要保证它所在的上下文和 myObj 对象的上下文一致。
// 重构一下：
var myObj = {
  specialFunction: function () {
  },
  anotherSpecialFunction: function () {
  },
  getAsyncData: function (cb) {
    cb();
  },
  render: function () {
    this.getAsyncData(function () {
      this.specialFunction();
      this.anotherSpecialFunction();
    }.bind(this));
  }
};

// 需要注意：
// 如果你对原型链上的方法调用了 bind，则会创建一个实例化的方法（即该方法从原型链的层面转变为了实例的层面），这样就无法利用原型的优势。

// 使用实例
//
// 1) 无论在哪儿调用回调方法（比如点击事情，或者 setTimeout），只要通过 bind() 绑定，在回调函数被调用时，都可以获取到外部的 this 作用域
var Button = function (content) {
  this.content = content;
};

Button.prototype.click = function () {
  console.log(this.content + ' clicked');
};

var myButton = new Button('OK');
myButton.click(); // OK clicked

var looseClick = myButton.click;
looseClick(); // undefined clicked，找不到 this.content，回调函数内的 this 并不指向 myButton 对象，而是全局对象
var boundClick = myButton.click.bind(myButton);
boundClick(); // OK clicked，bind 之后, this 指向 myButton

// 有时候为了追踪点击事件，可能需要我们在一个对象内储存数据：
var logger = {
  x: 0,
  updateCount: function () {
    this.x++;
    console.log(this.x);
  }
};

document.querySelector('button').addEventListener('click', function () {
  logger.updateCount();
});

// 使用实例
//
// 2) 除了传递作用域，你还可以像函数中预先添加参数

// 在 bind 时传递参数
var sum = function (a, b) {
  return a + b;
};

var add5 = sum.bind(null, 5);
console.log(add5(10));  // 15


// 比较下面三种方法
// bind() vs call() vs apply()

// bind 是什么？
// bind() 实际上创建了一个新函数，并且可以预先给它提供一系列参数，在函数真正被调用时这些参数也会被代入
//
// call 是什么？
// call() 代入一系列参数来调用函数
//
// apply 是什么？
// apply() 将参数作为 array (或者类 array 对象) 代入调用
//
// 首先，我们来比较 call 和 apply：
// 语法( call ):
// fun.call(thisArg[, arg1[, arg2[, ...]]])
// 语法( apply ):
// fun.apply(thisArg, [argsArray])
//
// =============
// 相同点：
// this 参数。如果函数在 non-strict 条件下，null 和 undefined 会被全局对象替代
// 不同点：
// 其他的参数。call 接收多个对象，apply 则是一个 array（或者类 array 对象）

// call 的实例:
// 计算圆面积
var π = 3.14;
var s = function(r) {
  return this.π*r*r;
}

function pi() {
  this.π = Math.PI;
  return this;
}
s(1); // 3.14
s.call(pi(), 1); // 3.141592653589793…

// 大致通过如下方式使用
function toArray() {
  return [].slice.call(arguments);
}
toArray(1, 2, 3);

// apply 实例:
// This method is learned in lodash.
!function() {
  function apply(fun, thisArg, args) {
    var length = args.length;
    switch() {
      case 0: return fun.call(thisArg);
      case 1: return fun.call(thisArg, args[0]);
      case 2: return fun.call(thisArg, args[0], args[1]);
      case 3: return fun.call(thisArg, args[0], args[1], args[2]);
    }
    return fun.apply(thisArg, args);
  }
}()

// 在 jquery 中也有一个 bind
// $(document).bind('click', function() {
//    console.log(document.title);
// })
//

// 但我们讲的这个 bind 是指 Function.prototype.bind()
// Partial Functions (分离函数)
!function() {
  function list() {
    return Array.prototype.slice.call(arguments);
  }

  var list1 = list(1, 2, 3); // [1, 2, 3]

  // 将 37 作为第一个参数，新建一个函数
  var leadingThirtysevenList = list.bind(undefined, 37);

  var list2 = leadingThirtysevenList(); // [37]
  var list3 = leadingThirtysevenList(1, 2, 3); // [37, 1, 2, 3]
}

// @参考资料
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
