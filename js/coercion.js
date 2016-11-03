/**
 * 强制类型转换:
 * 将某个值的类型转换成其他类型通常叫做 “类型转换”，在执行过程中，转换会隐式强制执行
 *
 * == vs ===
 * 除了 恒等操作 (===) 会对双方类型验证，相等操作 (==) 会对双方进行强制类型转换以外，在其他方面的表现一致
 *
 * == 会对双方进行必要的强制类型转换，之后再比较 value
 * === 不会进行转换，因此如果两个值的类型不同则直接返回 false
 * 因此，=== 的比较会更快，而且可能和 == 的结果不一样
 *
 * 参考资料:
 * http://stackoverflow.com/questions/359494/does-it-matter-which-equals-operator-vs-i-use-in-javascript-comparisons
 * http://davidwalsh.name/fixing-coercion#isnt-coercion-already-dead
 * http://bytearcher.com/articles/equality-comparison-operator-javascript/
 * http://rainsoft.io/the-legend-of-javascript-equality-operator/
 * http://bytearcher.com/articles/equality-comparison-operator-javascript/
 *
 * 译者注：
 * 补充一份资料：
 * 一张图彻底搞懂JavaScript的==运算
 * https://zhuanlan.zhihu.com/p/21650547
 */

// JS 中的强制类型转换
(function () {
  var x = 42;
  var y = x + "";     // 隐式转换
  console.log(y);     // "42"

  var z = String(x);  // 显式转换
  console.log(z);     // "42"
})();

// Equality checks - Crazyyy Sh*t!!! 我也觉得😂
(function () {
  console.log('' == '0');           // false
  console.log(0 == '');             // true
  console.log(0 == '0');            // true

  console.log(false == 'false');    // false
  console.log(false == '0');        // true

  console.log(false == undefined);  // false
  console.log(false == null);       // false
  console.log(null == undefined);   // true

  console.log(' \t\r\n ' == 0);     // true

  // Array
  var a = [1, 2, 3];
  var b = [1, 2, 3];

  console.log(a == b);            // false
  console.log(a === b);           // false

  // Object
  var c = {x: 1, y: 2};
  var d = {x: 1, y: 2};

  console.log(c == d);            // false
  console.log(c === d);           // false

  // String
  var e = "text";
  var f = "te" + "xt";

  console.log(e == f);            // true
  console.log(e === f);           // true

  // == 操作检查两个对象的值，并返回 true
  // === 检测到两者不是同样的对象，返回 false
  console.log("abc" == new String("abc"));    // true
  console.log("abc" === new String("abc"));   // false
})();
