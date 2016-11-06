/**
 * 通过 Object.keys() 遍历对象的属性
 *
 * 遍历对象的属性在 JavaScript 中是一个常见操作了，通过 for...in 原生方法可以完成它，
 * 但 for...in 是一个稍有问题方法，需要配合 hasOwnProperty 一起使用，剔除掉原型链上的属性。
 * 而更好更干净的方法是通过 Object.keys 获取到对象的键组成的数组，然后遍历数组。因此你可以自己筛选或者修改数组。
 *
 * Object.keys 被 IE9 之后的浏览器兼容
 *
 * @参考资料：
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 */


// 使用 for..in 方法
(function () {
  var x = {hello: 1, there: 2, world: 3};
  for (var key in x) {
    if (x.hasOwnProperty(key)) {
      console.log(key, x[key]);
    }
  }
  // 输出三条结果：hello 1, there 2, world 3
})();

// 使用 Object.keys() 方法
(function () {
  var x = {hello: 1, there: 2, world: 3};
  Object.keys(x).forEach((function (key) {
    console.log(key, x[key]);
  }));
  // 输出三条结果: hello 1, there 2, world 3
})();
