/**
 * Object.freeze()
 * 这个方法将冻结一个对象，这意味着，被冻结的对象无法添加新属性；无法移除已有属性；无法修改属性的属性（可遍历性/配置性/可写性）
 * 从本质上讲就是让对象不可变了。
 *
 * 注意：
 * 如果一个冻结的对象内部有属性的值是其他对象，则那些对象还是可以修改的，除非他们也被冻结。即是说，freeze 方法只是浅冻结。
 *
 * @参考资料:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 * http://adripofjavascript.com/blog/drips/immutable-objects-with-object-freeze.html
 *
 */

var obj = {
  prop: function() {},
  foo: 'bar'
};

// 加入新属性、修改旧属性，并删除了一个旧属性
obj.foo = 'baz';
obj.lumpy = 'woof';
delete obj.prop;

// 冻结对象
Object.freeze(obj);

// 检查是否已冻结
console.log(Object.isFrozen(obj) === true); // True

// 然后之前的操作就没有作用了（在严格模式下会抛出错误）
obj.foo = 'quux'; // 没用哒
obj.quaxxor = 'the friendly duck'; // 也是没用哒



/**
 * freeze 是浅冻结，接下来我们尝试创建一个可以深度冻结的方法
 * deepFreeze()
 */

obj1 = {
  internal: {}
};

Object.freeze(obj1);
obj1.internal.a = 'aValue';

console.log(obj1.internal.a); // aValue

// 如果要深度冻结一个对象，则需要冻结对象上的每一个对象
function deepFreeze(obj) {
  // 获取 obj 自身拥有的属性
  var propNames = Object.getOwnPropertyNames(obj);

  // 在冻结对象之前，依次冻结它内部的每个对象
  propNames.forEach(function (name) {
    var prop = obj[name];

    // 如果属性值是个对象，则冻结通过递归来它
    if (typeof prop == 'object' && prop !== null && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  return Object.freeze(obj);
}

// 测试 deepFreeze
var obj2 = {
  internal: {}
};

deepFreeze(obj2);
obj2.internal.a = 'anotherValue';
console.log(obj2.internal.a); // undefined
