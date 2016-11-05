/**
 * JavaScript Mixins - What are they?
 *
 * 在计算机科学领域，mixin 代表着一个 class，其内部定义这一些列与某一类型相关的方法。
 * Mixins 的 class 通常是抽象化的，不会被实例化，
 * 反之，他们的方法被实例化的类所拷贝，类似于 “继承” ，但两者之间不必有什么联系。
 *
 * 但是在 JavaScript 中，没有类的概念（起码 ES5 以下没有）。但这实际上是件好事，因为我们可以使用对象（实例）来替代，并对它们清晰灵活的特点加以利用：
 * js 中的 mixin 可以是一个普通的对象，一个原型，一个方法或者其他什么东西，而且 mixin 的过程也会更加清晰、显而易见。
 *
 *
 * @参考资料:
 * https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
 * https://lostechies.com/derickbailey/2012/10/07/javascript-mixins-beyond-simple-object-extension/
 * http://raganwald.com/2014/04/10/mixins-forwarding-delegation.html
 * http://bob.yexley.net/dry-javascript-with-mixins/
 * https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.osy5v7ih0
 * http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mixinpatternjavascript
 */

// 创建一个函数，让目标接收 mixin
// target：接收 mixin 的目标
// source：mixin
// methodNames：多个方法名/属性名，对应的方法/属性要被传递给 target
function mixInto(target, source, methodNames) {

  // 通过 arguments 去除 target 和 source，确保之后的参数就是要传递的方法/属性
  var args = Array.prototype.slice.apply(arguments);
  target = args.shift();
  source = args.shift();
  methodNames = args;

  var method;
  var length = methodNames.length;
  for (var i = 0; i < length; i++) {
    method = methodNames[i];

    // 围绕着 source 创建一个闭包函数
    // source 的 method 赋予给 target 的 method，但通过 apply，调用时的作用域还是 source
    target[method] = function () {
      var args = Array.prototype.slice(arguments);
      source[method].apply(source, args);
    }

  }

}

// make use of the mixin function
var myApp = new Marionette.Application();
mixInto(myApp, Marionette.EventBinder, "bindTo", "unbindFrom", "unbindAll");


/**
 * Mixin 设计模式
 *
 * jsfiddle 链接：http://jsfiddle.net/quFa9/21/
 */

// 戳这里可见 JavaScript 中 Mixin 设计模式的详细解释：
// http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mixinpatternjavascript

/* Car Class */
var Car = function (settings) {
  this.model = settings.model || 'no model provided';
  this.colour = settings.colour || 'no colour provided';
};

/* Mixin Class */
var Mixin = function () { };
Mixin.prototype = {
  driveForward: function () {
    console.log('drive forward');
  },
  driveBackward: function () {
    console.log('drive backward');
  }
};

/* 使用其他 class 的方法扩展一个已有的 class */
function augment(receivingClass, givingClass) {
  /* 提供一定数目的方法名 */
  if (arguments[2]) {
    var i, len = arguments.length;
    for (i = 2; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  }
  /* 如果只有两个参数，则是把 givingClass 类内的全部方法都赋予给 receivingClass */
  else {
    var methodName;
    for (methodName in givingClass.prototype) {
      // 要确保没有重复的名称
      if (!receivingClass.prototype[methodName]) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
    }
  }
}

/* Augment the Car class to have the methods 'driveForward' and 'driveBackward' */
augment(Car, Mixin, 'driveForward', 'driveBackward');

/* Create a new Car */
var vehicle = new Car({model: 'Ford Escort', colour: 'blue'});

/* Test to make sure we now have access to the methods */
vehicle.driveForward();
vehicle.driveBackward();
