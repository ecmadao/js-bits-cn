/**
 * Shim vs Polyfill vs Monkey Patch
 *
 * Shim:
 * 在英语里，shim 意味着 -- 一排可能会调用的参数，使其整体具有兼容性
 * shim 是多段 API 调用的组合，它们的目的是为了兼容不同的环境：
 * 两个不同的浏览器可能对同一种 API 的实现方式不一样，你可以拦截 API 的调用，然后通过 shim 实现不同浏览器间的一致性；
 * 或者可能某个浏览器对一些 API 有 bug，你也可能通过这种方式来避免 bug
 * 例：https://github.com/es-shims/es5-shim
 *
 * Polyfill:
 * polyfill 是一段提供给开发者的代码（或插件），用来处理浏览器对某些 API 的兼容情况。
 * 因此，polyfill 可以说是针对浏览器 API 的 shim。你可以检查浏览器是否支持某种 API，如果不支持，则加载对应的 polyfill
 *
 * Monkey Patching:
 * 一个最佳实践是，永远不要去自己修改一个线上正使用的库。随意升级改造的库可能引发一系列噩梦，并难以维护。
 * 所以如果库有一个 bug的话，你可以使用 monkey patch 的方式去修补。
 * monkey patch 是什么？其实就是方法的覆盖，以此“修复”原生的代码。
 *
 * @参考资料:
 * https://github.com/vasanthk/simple-polyfill-array-find-es6
 * https://remysharp.com/2010/10/08/what-is-a-polyfill
 * http://addyosmani.com/blog/writing-polyfills/
 * http://www.codeproject.com/Articles/369858/Writing-polyfills-in-Javascript
 * http://blog.respoke.io/post/111278536998/javascript-shim-vs-polyfill
 * https://davidwalsh.name/monkey-patching
 * http://benno.id.au/blog/2010/01/01/monkey-patching-javascript
 * http://me.dt.in.th/page/JavaScript-override/
 * http://benno.id.au/blog/2010/01/01/monkey-patching-javascript
 */

/**
 * SHIM
 * Shim layer for requestAnimationFrame with setTimeout fallback
 *
 * @Reference:
 * http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
 */

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

// Usage:
// Instead of setInterval(render, 16)
(function animloop() {
  requestAnimFrame(animloop);
  render();
})();
// Place the rAF *before* the render() to assure as close to 60fps with the setTimeout fallback.


/**
 * POLYFILL
 * 一个针对 Array.prototype.forEach() 的简单 polyfill
 *
 * @参考资料:
 * http://javascriptplayground.com/blog/2012/06/writing-javascript-polyfill/
 *
 */

Array.prototype.forEach = function (callback, thisArg) {
  if (typeof(callback) !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  var len = this.length;
  for (var i = 0; i < len; i++) {
    // this[i] 代表每次遍历获取的元素，i 则是其 index
    // this 代表调用 forEach 方法的 array
    callback.call(thisArg, this[i], i, this);
  }
};

// Usage
var arr = [1, 2, 3];
arr.forEach(function (item, index, th) {
  console.log(item, index, th);
});

//    Output
//    1 0 [ 1, 2, 3 ]
//    2 1 [ 1, 2, 3 ]
//    3 2 [ 1, 2, 3 ]


/**
 * MONKEY PATCHING
 * Simple example to monkey patch a method in an object
 *
 * @Reference:
 * https://gist.github.com/vasanthk/5edd3a1f5f1231221fa4
 */

// 原生的方法
var object = {
  method: function (x, y) {
    return x + y;
  }
};

// 使用 monkey patch 对其进行覆盖
// 但要注意的是使用了一个闭包，已确保 object.method 内的作用域传递到了新的方法里
object.method = (function (original) {
  return function (x, y) {
    // before
    // we could here modify 'arguments' to alter original input
    console.log(x, '+', y, '?');

    // 调用原生方法
    var result = original.apply(this, arguments);

    // after
    // here we could work on result to alter original output
    console.log('=', result);

    // aaaand the result
    return result;
  }
})(object.method);
