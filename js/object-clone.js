/**
 * 对象的克隆
 * Object copy by value (Clone)
 *
 * @参考资料:
 * http://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-clone-an-object/
 * http://stackoverflow.com/a/728694/1672655
 */

(function () {
  var obj = {
    name: 'vasa',
    role: 'Ninja'
  };

  // 一个克隆对象的小 trick
  var clonedObj = JSON.parse(JSON.stringify(obj));

  // ES6
  var clone = Object.assign({}, obj);

  // With jQuery
  // 浅拷贝
  var copiedObjShallow = jQuery.extend({}, obj);
  // 深度拷贝
  var copiedObjDeep = jQuery.extend(true, {}, obj);

  // Object.assign() polyfill
  // http://stackoverflow.com/a/34283281/1672655
  // 译者注：
  // 或者可以去查看 object-assign 这个 polyfill 的兼容性实现：
  // https://github.com/ecmadao/code-analysis/blob/master/analysis/object-assign.js

  if (!Object.assign) {
    Object.defineProperty(Object, 'assign', {
      enumerable: false,
      configurable: true,
      writable: true,
      value: function (target) {
        'use strict';
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert first argument to object');
        }

        var to = Object(target);
        // 第一个参数为 target，之后的参数都是要拷贝进第一个对象的
        for (var i = 1; i < arguments.length; i++) {
          var nextSource = arguments[i];
          if (nextSource === undefined || nextSource === null) {
            continue;
          }
          nextSource = Object(nextSource);

          var keysArray = Object.keys(nextSource);
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
            var nextKey = keysArray[nextIndex];
            // Object.getOwnPropertyDescriptor() 返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
        return to;
      }
    });
  }
})();
