/**
 * 在 for() 循环内 setTimeout()
 *
 * @TLDR：如果每次循环所需的时间小于 setTimeout 等待的时间，那么 setTimeout 只有在循环执行完毕之后才会执行
 * 同样，只有在循环执行完成之后，setTimeout 才能拿到所需的变量。
 *
 * @Info：使用立即执行函数（IIFE）来创建闭包，锁住变量
 *
 * @参考资料：
 * Best explanation out there on Event loops:
 * https://www.youtube.com/watch?v=8aGhZQkoFbQ
 *
 */

(function () {

  // setTimeout() inside a loop.
  for (var i = 1; i <= 3; i++) {
    setTimeout(function () {
      console.log(i);     // 输出 4 4 4
    }, 1000);
  }

  // 如果用 ES6 的 let 就不会有这种问题
  for (let i = 1; i <= 3; i++) {
    setTimeout(function () {
      console.log(i);     // 输出 1 2 3
    }, 1000);
  }

  // 使用 IIFE，在闭包内锁住变量
  for (var i = 1; i <= 3; i++) {
    (function (index) {
      setTimeout(function () {
        console.log(index);     // 输出 1 2 3
      }, 1000);
    })(i);
  }

  // 注：当 IIFE 在 setTimeout 内部时，还是可以正常工作，但不等倒计时结束就会马上打印出值，
  // setTimeout 本质上也就是无效的。
  for (var i = 1; i <= 3; i++) {
    setTimeout((function (index) {
      console.log(index);         // 输出 1 2 3
    })(i), 1000);
  }

  // 但只要在 setTimeout 的回调内返回一个函数，则 setTimeout 内部配合 IIFE 也可以正常使用
  for (var i = 1; i <= 3; i++) {
    setTimeout((function (index) {
      return function () {
        console.log(index);     // prints 1 2 3
      };  // 需要在 IIFE 内返回一个函数，这样 setTimeout 就能正常运行
    })(i), 1000);
  }

  // 注：
  // setTimeout 和 setInterval 还接收一个参数，将传递给回调函数
  // Thanks: https://twitter.com/WebReflection/status/701091345679708161
  for (var i = 0; i < 10; i++) {
    setTimeout(function (i) {
      console.log(i);
      // 将会输出 0 1 2 3 4 5 6 7 8 9
    }, 1000, i)
  }

  // 还有一种方法是将函数拆分出去
  for (var i = 0; i < 10; i++) {
    registerTimeout(i);
  }
  function registerTimeout (i) {
    setTimeout(function () {
      console.log(i);
      // 将会输出 0 1 2 3 4 5 6 7 8 9
    }, 1000);
  }
})();
