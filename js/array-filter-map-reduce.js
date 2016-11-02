/**
 * Array filter(), map() and reduce()
 *
 * @参考资料：
 * http://danmartensen.svbtle.com/javascripts-map-reduce-and-filter
 * http://elijahmanor.com/reducing-filter-and-map-down-to-reduce/
 * http://cryto.net/~joepie91/blog/2015/05/04/functional-programming-in-javascript-map-filter-reduce/
 *
 * 进阶学习：
 * JavaScript 内部实现 filter, map, reduce 的方式:
 * http://matthewodette.com/map-filter-and-fold-in-javascript/
 */

/** 普通的 for() 循环
 * for 循环在处理大型数组时依旧有用武之地（例如，拥有 1000 个元素的数组）
 * 或者需要在循环时根据条件来中断的话，for 也依旧很好用
 */
(function () {
  var array = [1, 2, 3, 4];
  var models = [];
  for (var i = 0; i < array.length; i++) {
    if (array.indexOf(array[i]) % 2 === 0) {
      models.push(array[i]);
    }
  }
})();

/** Array.map()
 *
 *  什么时候使用：
 *  当你想把一个 array 中的所有元素进行转换，并返回新的数组时
 *
 *  map 方法做了什么：
 *  从左往右遍历数组，将各元素分别代入回调函数进行调用，并返回回调函数的返回值，最终组成一个新的数组
 *
 *  举个栗子：把 一组华氏温度 转换成 一组摄氏温度
 *
 *  语法：
 *  array.map(function(elem, index, array) {
 *    ...
 *  }, thisArg);
 *
 *  elem: array 中的各个元素
 *  index: 偏移，从左往右递增
 *  array: 调用 map 方法的数组
 *  thisArg: 作为回调中的作用域（this）
 */

(function () {
  var farenheit = [0, 32, 45, 55, 67, 79, 94, 105];
  var celcius = farenheit.map(function (elem) {
    return Math.round((elem - 32) * 5 / 9);
  });

  console.log(celcius); // [-18, 0, 7, 13, 19, 26, 34, 41]
})();

/** Array.filter()
 *
 *  什么时候使用：
 *  从 array 中过滤不需要的元素时
 *
 *  filter 方法做了什么：
 *  与 map 方法类似，从左往右遍历数组，将各元素分别代入回调函数进行调用。
 *  但回调函数的返回值必须是一个 boolean，以此来确定当前循环的元素是否要过滤掉。返回 false 则过滤，否则保留
 *  但要注意的是，在循环完毕之后，将返回一个新的数组，而只有使回调函数返回了 true 的元素才会在新数组里。
 *  回调函数的参数和 map() 方法一样。
 *
 *  举个栗子：移除数组中重复的元素
 *
 *  语法：
 *  array.filter(function(elem, index, array) {
 *    ...
 *  }, thisArg);
 *
 *  elem: array 中的各个元素
 *  index: 偏移，从左往右递增
 *  array: 调用 filter 方法的数组
 *  thisArg: 作为回调中的作用域（this）
 */

(function () {
  var arr = [1, 2, 3, 4, 5, 3, 7, 2];
  var uniqueArr = arr.filter(function (elem, i, arr) {
    return arr.indexOf(elem) === i;
  });

  console.log(uniqueArr);
})();

/** Array.reduce()
 *
 *  什么时候使用：
 *  当你想对一个 array 中的元素进行累加或者拼接时
 *
 *  reduce 方法做了什么：
 *  与 map 方法类似，从左往右遍历数组，将各元素分别代入回调函数进行调用。
 *  但回调函数的返回值会作为下一次遍历时回调函数的参数，在遍历完所有元素之后，返回最终结果
 *
 *  举个栗子：计算 2014 年各国家发射火箭数目的综合
 *
 *  语法：
 *  array.reduce(function(prevVal, elem, index, array) {
 *    ...
 *  }, initialValue);
 *
 *  prevVal: 上一个回调返回的结果
 *  elem: array 中的元素
 *  index: 偏移，从左往右递增
 *  array: 调用 reduce 方法的数组
 *  initialValue: 初始化的值，作为第一个回调的参数
 *
 */
(function () {
  var rockets = [
    {country: 'Russia', launches: 32},
    {country: 'US', launches: 23},
    {country: 'China', launches: 16},
    {country: 'Europe(ESA)', launches: 7},
    {country: 'India', launches: 4},
    {country: 'Japan', launches: 3}
  ];

  var sum = rockets.reduce(function (prevVal, elem) {
    return prevVal + elem.launches;
  }, 0);

  console.log(sum);
})();
