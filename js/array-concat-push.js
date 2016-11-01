/**
 * Array push() and concat()
 * 就性能而言：concat() 比 push() 快了约 40%
 *
 * 参考资料:
 * http://gunnariauvinen.com/difference-between-concat-and-push-in-javascript/
 * http://davidwalsh.name/combining-js-arrays
 *
 * Tip: push() 将元素添加在 array 尾部。如果要添加到头部，则可以使用 unshift() 方法。
 *
 * 性能比较:
 * https://jsperf.com/array-prototype-push-apply-vs-concat/20
 */

// PUSHES ONE ARRAY INTO ANOTHER
// Array.push() 方法将修改原 array
// 同时该方法返回修改过后的 array 的长度
(function () {
  var testArr = [1, 2, 3];
  var res = testArr.push(4, 5, 6);

  console.log(res);  // 6
  console.log(testArr); // [1, 2, 3, 4, 5, 6]
})();

// MERGES ARRAYS
// Array.concat() 返回一个新 array，原 array 保持不变。
// 要注意的是，并没有复制对象到新的 array 中，而是复制了对象的引用。
(function () {
  var test = [1, 2, 3]; // [1, 2, 3]
  var example = [{test: 'test value'}, 'a', 'b', 4, 5];
  var concatExample = test.concat(example); // [1, 2, 3, { test: 'test value'}, 'a', 'b', 4, 5]

  // 修改一下对象的值
  example[0].test = 'a changed value';
  console.log(concatExample[3].test); // 会发现在合并过后的新 array 里，对象的值也发生了改变 Object { test: "a changed value"}
  example[1] = 'dog';
  console.log(concatExample[4]); // 'a'
})();

// MERGE ARRAY USING push()
// 通过 apply() 和 push() 来合并两个 array
(function () {
  var a = [1, 2];
  var b = ['x', 'y'];

  // 不能直接使用 a.push(b) 方式，它仅仅返回 [1, 2, ['x', 'y']]
  a.push.apply(a, b);
  console.log(a); // [1, 2, 'x', 'y']
  // 相当于: a = a.concat(b);
})();
