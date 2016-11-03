/**
 * 闭包
 *
 * 闭包是指，当函数在其作用域外部的位置调用时，也还能 “记住” 定义时的作用域 ~ Kyle Simpson
 *
 * 当你想要隐藏函数在功能上的实现，但依旧展现其接口和扩展性时，闭包就能发挥很好的作用。
 * Closures are useful in hiding the implementation of functionality while still revealing the interface.
 *
 * 为什么要使用闭包？
 * http://howtonode.org/why-use-closure
 *
 * @参考资料:
 * http://stackoverflow.com/questions/2728278/what-is-a-practical-use-for-a-closure-in-javascript
 * https://medium.freecodecamp.com/lets-learn-javascript-closures-66feb44f6a44#.lwnf9bay4
 * http://www.bennadel.com/blog/2134-a-random-exploration-of-closure-use-cases-in-javascript.htm
 * https://medium.com/written-in-code/practical-uses-for-closures-c65640ae7304#.ukk9dpjxs
 * https://medium.com/@nickbalestra/javascripts-lexical-scope-hoisting-and-closures-without-mystery-c2324681d4be#.bg7fk0chp
 * https://www.safaribooksonline.com/library/view/javascript-the-good/9780596517748/ch04s15.html
 */

// 例1
function foo() {
  var bar = 'bar';

  function baz() {
    console.log(bar);
  }

  bam(baz);
}

function bam(baz) {
  // 输出 'bar'
  // baz() 在 bam 方法内调用，而 bam 可以获取到 foo 内的作用域
  baz();  // bar
}
foo();

// 例2
(function foo() {
  var bar = 'bar';

  setTimeout(function () {
    console.log(bar); // 输出 `bar` -- 由于闭包的作用，setTimout 的回调函数内可以获取到 foo 里的作用域
  }, 1000)
})();

// 例3
(function foo() {
  var bar = 'bar';

  $('#btn').click(function () {
    console.log(bar); // 输出 `bar`
  });
})();


// 实际用例

// 1. 执行 public/private 方法. [Classic Module Pattern]

/**
 * 如你所见，a 是一个对象，并拥有一个公共方法（ a.publicFunction ），
 * 而 a.publicFunction() 则调用私有方法 privateFunction，privateFunction 内就可以获取到封闭的作用域
 *
 * 你无法直接调用 privatefunction 方法（比如这样：a.privatefunction() ）
 */
var a = (function () {
  var privateFunction = function () {
    console.log('Accessed private method');
  };

  return {
    publicFunction: function () {
      privateFunction();
    }
  }
})();
a.publicFunction(); // Accessed private method.

/**
 * 假设你在写一个关于日期的类，可以让用户通过 index 来获取周的名称，但同时也不想让用户修改周名称组成的数组
 *
 * 在 dateUtil() 里，days 数组可以作为对象的属性存在，但是这样的话它就可以被用户轻易获取到，并能够被随意更改。
 * 但如果通过一个匿名函数的闭包，它就只能在 weekdayShort 函数内部被调用，而外界无法获取并干扰。
 */

var dateUtil = {
  weekdayShort: (function () {
    var days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return function (x) {
      if ((x != parseInt(x)) || (x < 1) || (x > 7)) {
        throw new Error("invalid weekday number");
      }
      return days[x - 1];
    };
  }())
};

// 2. 储存数据

/**
 * 你可能已经听说过，甚至已经实际使用过斐波纳契数列函数了。
 *
 * 闭包可以轻易的创建一个强大的斐波纳契数列函数
 *
 * 我们先了来看下传统的 斐波纳契数列函数：fibonacci
 */
var fibonacci = function (n) {
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
};

/**
 * fibonacci 工作起来没问题，但效率极其低下。它将同样的值计算了很多遍
 *
 * 我们可以利用一个储存器来将获取的结果储存起来（通过闭包）
 */
var fibonacci = (function (  ) {
  var memo = [0, 1];
  var fib = function (n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = fib(n - 1) + fib(n - 2);
      memo[n] = result;
    }
    return result;
  };
  return fib;
}( ));

console.log(fibonacci(100));
/**
 * Check Crockford's (book)[https://www.safaribooksonline.com/library/view/javascript-the-good/9780596517748/ch04s15.html "Safari Books Online"]
 * to find a way to generalize this function into one that memoizes other recursive functions.
 */
