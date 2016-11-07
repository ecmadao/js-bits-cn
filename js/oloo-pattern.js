/**
 * OLOO 设计模式探索
 * （OLOO，将对象链接到其他对象上，即 objects linked to other objects）
 *
 * @参考资料:
 * https://gist.github.com/getify/d0cdddfa4673657a9941
 * https://gist.github.com/getify/5572383
 * https://gist.github.com/getify/9895188
 * https://github.com/getify/You-Dont-Know-JS/blob/master/this%20&%20object%20prototypes/ch6.md
 */

// 构造函数 vs OLOO

// 构造函数方式
function Foo() {
}
Foo.prototype.y = 11;

function Bar() {
}
// Object.create(proto[, propertiesObject]) method creates a new object with the specified prototype object and properties.
Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.z = 31;

var x = new Bar();
console.log(x.y + x.z);  // 42


// OLOO 方式
var FooObj = {y: 11};

var BarObj = Object.create(FooObj);
BarObj.z = 31;

var x = Object.create(BarObj);
console.log(x.y + x.z);  // 42


/**
 * Class 语法 vs OLOO
 */

// ES6 Class
class Foo {
  constructor(x, y, z) {
    // Object.assign 可用于拷贝对象，将多个目标对象拷贝到 target 对象中，并返回 target
    Object.assign(this, {x, y, z});
  }

  hello() {
    console.log(this.x + this.y + this.z);
  }
}

var instances = [];
for (var i = 0; i < 500; i++) {
  instances.push(
    new Foo(i, i * 2, i * 3)
  );
}
instances[37].hello(); // 222


// OLOO
function Foo(x, y, z) {
  return {
    hello() {
      console.log(this.x + this.y + this.z);
    },
    x,
    y,
    z
  };
}

var instances = [];

for (var i = 0; i < 500; i++) {
  instances.push(
    Foo(i, i * 2, i * 3)
  );
}
instances[37].hello();  // 222
