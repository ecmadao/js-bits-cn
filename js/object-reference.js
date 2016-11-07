/**
 * 对象的引用
 *
 * @参考资料:
 * http://ejohn.org/apps/learn/#13
 * http://ejohn.org/apps/learn/#14
 * http://stackoverflow.com/questions/22216159/an-object-null-and-behaviour-in-javascript
 */

// Program 1
(function () {
  var ninja = {
    yell: function (n) {
      return n > 0 ? ninja.yell(n - 1) + "a" : "hiy";
    }
  };
  console.log(ninja.yell(4) == "hiyaaaa");

  var samurai = {yell: ninja.yell};
  var ninja = null;

  try {
    console.log(samurai.yell(4));
  } catch (e) {
    console.log(false, "Uh, this isn't good! Where'd ninja.yell go?");
  }
  // 这段代码无法正常工作，因为在 ninja.yell 方法内，又再次引用了 ninja 对象：
  // return n > 0 ? ninja.yell(n-1) + "a" : "hiy";
  // 因此，之后将 null 赋予给 ninja 后，这段代码就会抛出错误，因为 null 没有 yell 属性
})();

// Program 2
(function () {
  var ninja = {
    yell: function yell(n) {  // 使用一个命名函数
      return n > 0 ? yell(n - 1) + "a" : "hiy"; // 使用 yell 替代 ninja.yell
    }
  };
  console.log(ninja.yell(4) == "hiyaaaa");

  var samurai = {yell: ninja.yell}; // 在创建 ninja 对象之前 ninja.yell 就已经声明好了（是因为声明了一个命名函数 yell）
  var ninja = null;

  try {
    console.log(samurai.yell(4));
  } catch (e) {
    console.log(false, "Uh, this isn't good! Where'd ninja.yell go?");
  }
  // Program 2 可以正常工作，因为创建了一个命名函数，然后将 ninja.yell 引用到了这个函数上
  // Program 2 works because, instead of referring to the object that holds the function (ninja),
  // you are giving the function a name and directly refer to that name.
})();
