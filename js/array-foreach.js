/**
 * Array foreach()
 *
 * @参考资料:
 * http://stackoverflow.com/questions/23614054/javascript-nuances-of-myarray-foreach-vs-for-loop
 * http://javascriptplayground.com/blog/2012/06/writing-javascript-polyfill/
 * http://www.2ality.com/2011/04/iterating-over-arrays-and-objects-in.html
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 *
 */

// Polyfill for forEach()
/**
 * [forEach 函数]
 * @method forEach             让数组的每一项都执行一次给定的函数
 * @param  {Function} callback 每次遍历的回调函数
 * @param  {Boolean}  thisArg  作用域。默认为当前 this
 * @return {[type]}            无返回值
 */

Array.prototype.forEach = function (callback, thisArg) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function.');
  }
  // this 代表调用 forEach 方法的 array
  var len = this.length;  // Array length
  for (var i = 0; i < len; i++) {
    callback.call(thisArg, this[i], i, this);
  }
};

// 举个栗子
function logArrayElements(currElement, currIndex, originalArray) {
  console.log('a[' + currIndex + '] = ' + currElement);
}

// Note there is no member at 2 so it isn't visited
[2, 5, , 9].forEach(logArrayElements);
// logs:
// a[0] = 2
// a[1] = 5
// a[3] = 9
