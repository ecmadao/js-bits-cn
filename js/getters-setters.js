/**
 * Getters 和 Setters
 *
 * 从第一天起，getter 和 setter 就被 chrome 支持，而 Firefox2 及以上，Safari3 及以上，IE9 及以上，和所有的手机浏览器也可以支持。
 *
 * @参考资料
 * http://engineering.wix.com/2015/04/21/javascript-the-extra-good-parts/
 * http://javascriptplayground.com/blog/2013/12/es5-getters-setters/
 */

// 显式的使用 getter 和 setter
(function () {
  function wrapValue(value) {
    return {
      getValue: function () {
        return value;
      },
      setValue: function (newValue) {
        value = newValue;
      }
    };
  }

  var x = wrapValue(5);
  console.log(x.getValue()); // 输出 5
  x.setValue(7);
  console.log(x.getValue()); // 输出 7
})();

// getter 和 setter 的传统使用方式
(function () {
  function wrapValue(_value) {
    return {
      get value() {
        return _value;
      },
      set value(newValue) {
        _value = newValue;
      }
    };
  }

  var x = wrapValue(5);
  console.log(x.value); // 输出 5
  x.value = 7;
  console.log(x.value); // 输出 7
})();

// 通过 Object.defineProperty 定义 getter 和 setter
// 当你通过 Object.defineProperty 来定义属性时，不仅仅可以定义 setter 和 getter，还可以传入其他 key：
// configurable（默认为 false）：如果为 true，则这个属性的配置在定义之后可以被修改
// enumerable（默认为 false）：如果为 true，则这个属性可以在遍历时获取到（比如 for...in）
(function() {
  var person = {
    firstName: 'Jimmy',
    lastName: 'Smith'
  };

  Object.defineProperty(person, 'fullName', {
    get: function() {
      return firstName + ' ' + lastName;
    },
    set: function(name) {
      var words = name.split(' ');
      this.firstName = words[0] || '';
      this.lastName = words[1] || '';
    }
  });
})();
