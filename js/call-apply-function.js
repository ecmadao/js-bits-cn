/**
 * Function.prototype.call & Function.prototype.apply
 *
 * 通过特定的上下文和参数来执行函数
 *
 * @参考文献:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments
 * http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/
 */

function logFullName(firstName, lastName) {
  console.log(firstName + lastName);
}

// 通过 apply 执行 logFullName 函数时，需要将参数作为一个 array 代入
logFullName.apply(undefined, ['Jhon', 'Doe']) // Jhon Doe

// 通过 call 执行 logFullName 函数时，各参数按照普通方式依次代入
logFullName.call(undefined, 'jhon', 'doe') // jhon doe

// call && apply 方法的第一个参数代表函数执行时的上下文环境
function logFullNameWithContext() {
  console.log(this.firstName, this.lastName);
}

var me = {
  firstName: 'Jhon',
  lastName: 'Doe',
  fullName: function() {
    logFullNameWithContext.call(this);
  }
};

me.fullName() // 'Jhon Doe'

// 我们甚至可以利用这两个方法，编写一个同时支持 array 形式和普通形式参数的函数
function sumAll() {
  // arguments 为 sumAll 所接收到的所有参数组成的一个类数组对象
  if (!arguments.length) return;

  if (Array.isArray(arguments[0])) {
    // 如果参数是数组，则通过 apply 调用
    return sumAll.apply(this, arguments[0]);
  }
  // arguments 是一个类数组对象，先通过 Array.prototype.slice 进行调用来获取一个 array
  return Array.prototype.slice.call(arguments).reduce(function(prev, curr) {
    return prev + curr;
  });
}

sumAll([1,2,3]) // 6
sumAll(1,2,3) // 6
sumAll.call(undefined, 1, 2, 3) // 6

// 我们可以暴露一个方法，让用户自己选择回调函数的上下文
function requestSomething(cb, context) {
  var something = 'something!';

  // 如果没有提供上下文，则 context 是 undefined，cb 函数内部也就无法获取到 requestSomething 内的作用域
  cb.call(context, something);
}

requestSomething(function(something) {
  console.log(something);
  console.log(this);
}, { hello: 'World!'}); // this prints: something! Object


// 除此以外，通过 apply 和 call，我们可以借用到其他的方法

// 正常情况下字符串是没有 forEach 方法的
Array.prototype.forEach.call('Jhon', function(char) {
  console.log(char);
}); // 会将字符串中的各个字符分别打印出来

// 同样的，apply 可以使我们进行一些便捷操作

// 比如找到一个数组中的最小值
Math.min.apply(undefined, [1,2,3,5]) // 1

// 或者合并两个数组
var a = [1,2,3,4];
a.concat.apply(a, [5,6,7,8]) // [1,2,3,4,5,6,7,8]
