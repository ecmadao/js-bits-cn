/**
 * 方法重载
 * 一个函数，在调用时根据其接受参数个数的不同，执行不同的方法。
 * 译者注：不建议使用
 *
 * @参考资料：
 * http://ejohn.org/blog/javascript-method-overloading/
 * http://ejohn.org/apps/learn/#90
 *
 * 解释说明：
 * http://stackoverflow.com/a/30989908/1672655
 * http://stackoverflow.com/a/18122417/1672655
 *
 * 最佳实践： http://stackoverflow.com/questions/456177/function-overloading-in-javascript-best-practices
 */

function addMethod(object, name, fn) {

  var old = object[name];
  // 通过 name 获取旧的方法
  // 当第一次调用时可能为 undefined
  // Get the old function corresponding to this name. Will be "undefined"
  // the first time "addMethod" is called.

  object[name] = function () {
    // 然后给 object[name] 赋予新方法
    // 非常重要的一点是，原有的方法被缓存起来了（old），并且随时可以被调用到

    if (fn.length == arguments.length) {
      // 如果新函数接收到的参数数目和 fn 所需的参数数目一样，则调用 fn 方法
      return fn.apply(this, arguments);
    } else if (typeof old == 'function') {
      // 否则，如果之前缓存的 old 是 function，则调用
      return old.apply(this, arguments);
    }
  };
}

function Ninjas() {
  var ninjas = ["Dean Edwards", "Sam Stephenson", "Alex Russell"];
  addMethod(this, "find", function () {
    return ninjas;
  });
  addMethod(this, "find", function (name) {
    var ret = [];
    for (var i = 0; i < ninjas.length; i++)
      if (ninjas[i].indexOf(name) == 0)
        ret.push(ninjas[i]);
    return ret;
  });
  addMethod(this, "find", function (first, last) {
    var ret = [];
    for (var i = 0; i < ninjas.length; i++)
      if (ninjas[i] == (first + " " + last))
        ret.push(ninjas[i]);
    return ret;
  });
}


//  USAGE
//
//  var ninjas = new Ninjas();
//  ninjas.find().length == 3
//  ninjas.find("Sam").length == 1
//  ninjas.find("Dean", "Edwards").length == 1
//  ninjas.find("Alex", "X", "Russell") == null
