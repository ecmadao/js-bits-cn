/**
 * 使用 reduce() 方法迭代数组
 *
 * 通过 forEach 来迭代数组，是个很好的办法，而且看起来似乎比 for 循环更有函数式的感觉。
 * 之所以用 “看起来” 形容，是因为 forEach 循环只能在循环内部通过其他函数的副作用来返回值，或者是修改原有的数组。
 * 而更加函数式的方式则是使用 map 或者 reduce 这样的方法，这些方法不依赖于副作用，并不会改动原有数组。
 *
 * reduce 和 map 方法对浏览器的支持性和 forEach 一样。
 *
 * 当人们谈论 “Map Reduce” 时，通常是指一种模式：遍历一个集合调用 reduce
 *
 * @参考资料:
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 * http://danmartensen.svbtle.com/javascripts-map-reduce-and-filter
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
 */

// 使用 forEach()
(function () {
  var ar = [1, 2, 3, 4, 5];
  var sum = 0;
  ar.forEach(function (v) {
    sum += v;
  });
  console.log(sum);
})();

// 使用 reduce()
(function () {
  var ar = [1, 2, 3, 4, 5];
  // 外部没有名为 sum 的变量
  console.log('sum:', ar.reduce(function (sum, v) {
    return sum + v;
  }, 0));
  // reduce() 语法：arr.reduce(callback()[, initialValue])
  // callback 语法：fn(previousValue, currentValue, index, array)
})();
