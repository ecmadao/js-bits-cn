/**
 * for... in 方法
 *
 * for...in 方法会遍历对象内的可遍历（enumerable）属性
 *
 * 当你对数组调用这个方法时：
 * Array 的 index 是可遍历的属性，只是名称为数字，否则的话和普通对象属性一样。
 * 并不能保证 for...in 循环能够按照特定的顺序进行，并且它将返回所有的可遍历属性，包括继承的属性，和名称不是数字的属性
 * 因为迭代的顺序与实现相关，所以每次遍历一个数组时，访问各元素的顺序可能不同
 * Because the order of iteration is implementation-dependent, iterating over an array may not visit elements in a consistent order.
 * 因此，当遍历数组时，最好使用带有数字 index 的 for 循环（或者 Array.prototype.forEach()、for...of）
 *
 */

// 下面的方法对一个对象进行遍历，并依次获取到对象的可遍历属性，并以此获取到属性对应的值。
var obj = {a:1, b:2, c:3};

for (var prop in obj) {
  console.log("obj." + prop + " = " + obj[prop]);
}

// Output:
// "obj.a = 1"
// "obj.b = 2"
// "obj.c = 3"


// 下面这个函数在遍历的过程中使用 hasOwnProperty() 进行检查，排除继承的属性
var triangle = {a:1, b:2, c:3};

function ColoredTriangle() {
  this.color = "red";
}

ColoredTriangle.prototype = triangle;

var obj = new ColoredTriangle();

for (var prop in obj) {
  if( obj.hasOwnProperty( prop ) ) {
    console.log("obj." + prop + " = " + obj[prop]);
  }
}

// 输出:
// "obj.color = red"
