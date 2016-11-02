/**
 * Array every() and some() (而不是使用 forEach)
 *
 * 有时候，我们可能需要对一个 array 进行循环判断，查看其是否满足一些条件（或者其他的需求）。
 * forEach 方法的一个限制是，使用中无法跳出循环，结果，有时候会看见有开发者退而使用了 for 循环，或者在迭代时使用不必要的 array 元素。
 *
 * 一个更好的选择是使用较为小众的 every() 和 some() 方法进行遍历，
 * 每一次的遍历，都会将元素代入回调，最终返回 true 或者 false
 *
 * 浏览器对 every 和 some 的支持与 forEach 的一样。
 *
 * @参考资料:
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 * https://coderwall.com/p/_ggh2w/the-array-native-every-filter-map-some-foreach-methods
 *
 */

// 只要有任意一次遍历返回 true，some() 就会中断，并返回 true；否则返回 false
(function () {
  var ar = ['Lara', 'Sachin', 'De Villiers'];
  ar.some(function (v) {
    if (v === 'Sachin') {
      return true;
    }
    console.log('Great cricketers: ' + v);
  });
})();

// 只要有任意一次遍历返回 false，every() 就会中断，并返回 false；否则返回 true
(function () {
  var ar = ['Hans Zimmer', 'Bill Clinton', 'Clint Mansell'];
  ar.every(function (v) {
    if (v === 'Bill Clinton') {
      return false;
    }
    console.log('Great Composers: ' + v);
  });
})();

// every() 和 some() 实例
(function () {
  function isBigEnough(element) {
    return element >= 10;
  }

  function isBigEnough2(element) {
    return element >= 1;
  }

  var passed = [2, 5, 8, 1, 4].some(isBigEnough);
  console.log('some: For [2, 5, 8, 1, 4] are the values larger or equal to 10 ? ' + passed);
  // some: For [2, 5, 8, 1, 4] are the values larger or equal to 10 ? false

  var passed = [12, 5, 8, 1, 4].some(isBigEnough);
  console.log('some: For [12, 5, 8, 1, 4] are the values larger or equal to 10 ? ' + passed);
  // some: For [12, 5, 8, 1, 4] are the values larger or equal to 10 ? true

  var passed = [12, 5, 8, 1, 4].every(isBigEnough);
  console.log('every: For [12, 5, 8, 1, 4] are "ALL" the values larger or equal to 10 ? ' + passed);
  // every: For [12, 5, 8, 1, 4] are "ALL" the values larger or equal to 10 ? false

  var passed = [12, 5, 8, 1, 4].every(isBigEnough2);
  console.log('every: For [12, 5, 8, 1, 4] are "ALL" the values larger or equal to 1 ? ' + passed);
  // every: For [12, 5, 8, 1, 4] are "ALL" the values larger or equal to 1 ? true

})();
