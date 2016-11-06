/**
 * Object.defineProperty()
 *
 * Enumerable:
 * 设置为 true 时，可以通过 for..in 循环 和 Object.keys 方法获取到该属性
 *
 * Writable:
 * 可以更改属性的值
 *
 * Configurable:
 * 可以配置属性的行为。Configurable 是唯一一个可以通过 delete 删除掉的属性
 *
 * @参考资料： https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
 * http://x-team.com/2015/02/es5-object-defineproperty-method/
 * http://arqex.com/967/javascript-properties-enumerable-writable-configurable
 */

var ob = {};
// 通过 Object.defineProperty 给 ob 对象新建一个属性
Object.defineProperty(ob, 'c', {
  value: 3,
  enumerable: false,
  writable: false,
  configurable: false
});

console.log(ob.c); // => 3

Object.getOwnPropertyDescriptor(ob, 'c');
// => {value: 3, enumerable: false, writable: false, configurable: false}

// 除此以外，还可以通过 Object.create( prototype, properties ) ，在创建对象的时候赋予其属性。
// 使用方式如下：
var ob = Object.create(Object.prototype, {
  a: {writable: true, enumerable: true, value: 1},
  b: {enumerable: true, value: 2}
});
console.log(ob); // => {a:1, b:2}

var ob = Object.create(Object.prototype, {
  a: {writable: true, enumerable: true, value: 1},
  b: {enumerable: true, value: 2}
});
console.log(ob); // => {a:1, b:2}

// 我们的目标是创建一个 Person 构造函数，它接收两个参数：firstName 和 lastName
// 这个对象会暴露出四个属性：firstName, lastName, fullName 和 species
// 前三个属性都是可变的，而最后一个则是常量 “human”

// Object.defineProperty (> IE8)
var Person = function (first, last) {
  this.firstName = first;
  this.lastName = last;
};

Object.defineProperty(Person, 'species', {
  writable: false,
  value: 'human'
});

Object.defineProperty(Person, 'fullName', {
  get: function () {
    return this.firstName + ' ' + this.lastName;
  },
  set: function (value) {
    var splitString = value.trim().split(' ');

    if (splitString.length === 2) {
      this.firstName = splitString[0];
      this.lastName = splitString[1];
    }
  }
});

var woman = new Person('Kate', 'Khowalski');

console.log(woman.firstName); // 'Kate'
console.log(woman.lastName); // 'Khowalski'
console.log(woman.fullName); //'Kate Khowalski
console.log(woman.species); // human

/*
 * Change name
 */

woman.firstName = 'Yulia';
console.log(woman.firstName); // 'Yulia'
console.log(woman.lastName); // 'Khowalski'
console.log(woman.fullName); // 'Yulia Khowalski'
woman.species = 'fish';
console.log(woman.species); // human - 因为 writable 为 false，所以无法修改

/*
 * Change fullName
 */

woman.fullName = 'Joana Stevens';
console.log(woman.firstName); //Joana
console.log(woman.lastName); //Stevens
