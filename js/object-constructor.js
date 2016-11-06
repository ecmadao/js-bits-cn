/**
 * 详解对象的创建
 * 对象就是一个包含原始类型数据（或者引用数据）的无序列表，并以键-值对的形式储存起来。
 * 列表中的每个元素都叫做属性（如果是函数的话则叫做方法）
 *
 * @参考资料:
 * http://javascriptissexy.com/javascript-objects-in-detail/
 * https://css-tricks.com/understanding-javascript-constructors/
 * http://stackoverflow.com/a/14172862/1672655
 */

// 对象的属性有自己的属性（ Attributes ）
// 对象的每个属性（用来储存数据）不仅仅是一个键值对，而且还包含了三个属性（默认情况下这三个属性都设置为 true）：
// - Configurable：如果是 false，该属性不可删除，且不可修改其他属性（改变 Writable，Configurable 或者 Enumerable 属性）
// - Enumerable：如果是 true，则该属性可通过 for..in 或其他类似方法遍历
// - Writable：如果是 false，则属性的值可修改


// 通过构造模式创建对象
function Fruit (theColor, theSweetness, theFruitName, theNativeToLand) {

  this.color = theColor;
  this.sweetness = theSweetness;
  this.fruitName = theFruitName;
  this.nativeToLand = theNativeToLand;

  this.showName = function () {
    console.log("This is a " + this.fruitName);
  };

  this.nativeTo = function () {
    this.nativeToLand.forEach(function (eachCountry)  {
      console.log("Grown in:" + eachCountry);
    });
  };
}

// 在这种模式下，可以快速便捷的创建对象
var mangoFruit = new Fruit ("Yellow", 8, "Mango", ["South America", "Central America", "West Africa"]);
mangoFruit.showName(); // This is a Mango.​
mangoFruit.nativeTo();
// Grown in:South America​
// Grown in:Central America​
// Grown in:West Africa​

var pineappleFruit = new Fruit ("Brown", 5, "Pineapple", ["United States"]);
pineappleFruit.showName(); // This is a Pineapple.
// 如果要更改 showName 方法，则要更改每个实例的 showName

// 可以被继承的属性要定义成对象原型的属性，例如：
someObject.prototype.firstName = 'rich';

// 而某个对象独有的属性则定义在对象内部，例如：
// 先来创建一个新对象：
var aMango = new Fruit ();
// 现在我们利用 Fruit 实例化了一个 aMango 对象，然后直接赋予它 mangoSpice 属性
// 而因为我们直接在 aMango 上定义了 mangoSpice 属性，所以这个属性是 aMango 独有的，不是一个继承的属性
aMango.mangoSpice = 'some value';


// 通过原型模式创建对象
function Fruit () {

}

Fruit.prototype.color = "Yellow";
Fruit.prototype.sweetness = 7;
Fruit.prototype.fruitName = "Generic Fruit";
Fruit.prototype.nativeToLand = "USA";

Fruit.prototype.showName = function () {
  console.log("This is a " + this.fruitName);
};

Fruit.prototype.nativeTo = function () {
  console.log("Grown in:" + this.nativeToLand);
};

// 实例化的方式和构造模式一样
var mangoFruit = new Fruit ();
mangoFruit.showName(); //​
mangoFruit.nativeTo();
// This is a Generic Fruit​
// Grown in:USA


// 获取到继承的属性
// 从 Object.prototype 继承到的属性不可遍历，因此不会在 for/in 循环里出现
// 但继承的其他可遍历的属性则会在循环中出现，例如：

var school = {schoolName:"MIT", schoolAccredited: true, schoolLocation:"Massachusetts"};
// 通过 for/in 循环获取 school 对象的属性
for (var eachItem in school) {
  console.log(eachItem); // Prints schoolName, schoolAccredited, schoolLocation​
}

// 新建一个 HigherLearning 方法，并让 school 对象继承自它
function HigherLearning () {
  this.educationLevel = "University";
}
/* SIDE NOTE:
 实际上通过 HigherLearning 的构造方式创建的对象，是不会继承 educationLevel 属性的；
 反之，educationLevel 属性会作为一个新的属性，添加到通过构造方式新创建的对象里的。
 之所以不会被继承，是因为我们是通过 this 关键字来定义的这个属性。
 */

// 使用构造方式创建 HigherLearning 的实例
var school = new HigherLearning ();
school.schoolName = "MIT";
school.schoolAccredited = true;
school.schoolLocation = "Massachusetts";

// 通过 for/in 循环获取到 school 对象的属性
for (var eachItem in school) {
  console.log(eachItem); // Prints educationLevel, schoolName, schoolAccredited, and schoolLocation​
}


// 删除对象的属性
// 如果要删除一个对象的属性，则需要通过 delete 操作
// 你可以删除继承的属性，但是不能删除 configurable 设置为 false 的属性。
// 但是你必须通过原型对象来删除继承的属性，而且，你也不能删除全局对象的属性（通过 var 关键字定义）
// 如果删除成功，则会返回 true；
// 而且，如果要删除的属性本身就不存在，或者属性不能被删除（non-configurable），或者属性不属于这个对象，删除操作也会返回 true

var christmasList = {mike:"Book", jason:"sweater" };
delete christmasList.mike; // deletes the mike property​

for (var people in christmasList) {
  console.log(people);
}
// 只输出 jason​
// mike 属性被删除了

delete christmasList.toString;
// 返回 true, 但因为 toString 是个继承到的方法，没有被删除
// 因此再次调用 toString 方法也一切正常
christmasList.toString(); //"[object Object]"​

// 实例自身拥有的属性可以被删除
// 例如下面，我们删除 school 对象实例的 educationLevel 属性，因为 educationLevel 属性是在 HigherLearning 方法内通过 this 关键字定义的，所以在实例化时成为了 school 实例的独有属性

console.log(school.hasOwnProperty("educationLevel")); // true
// educationLevel 是 school 对象独有的，因此可以被删除​
delete school.educationLevel; // true
console.log(school.educationLevel); // undefined

// 但是 educationLevel 属性还会在 HigherLearning 方法内
var newSchool = new HigherLearning ();
console.log(newSchool.educationLevel); // University​

// 如果我们在 HigherLearning 方法的原型上定义一个例如 educationLevel2 的属性：
HigherLearning.prototype.educationLevel2 = "University 2";
// 因此，educationLevel2 不是 HigherLearning 内部的属性，所以实例化的 school 对象也没有自己的 educationLevel2 属性
console.log(school.hasOwnProperty("educationLevel2")); // false
console.log(school.educationLevel2); // University 2​

// 试着删除原型链上的 educationLevel2 属性
delete school.educationLevel2; // true (跟之前说的一样，删除不属于这个对象的属性，也依旧返回 true)

// 但 educationLevel2 没有被删除
console.log(school.educationLevel2); // University 2​


// Object.defineProperty 方法
// Object.defineProperty() 可以用于构造器内，用来辅助属性的创建

function Book(name) {
  Object.defineProperty(this, 'name', {
    get: function() {
      return 'Book: ' + name;
    },
    set: function(newName) {
      name = newName;
    },
    configurable: false
  });
}

var myBook = new Book('Single Page Web Applications');
console.log(myBook.name);    // Book: Single Page Web Applications

// 无法删除 name 属性，因为它的 configurable 是 false
delete myBook.name;
console.log(myBook.name);    // Book: Single Page Web Applications

// 但我们可以更改 name 属性的值
myBook.name = "Testable JavaScript";
console.log(myBook.name);    // Book: Testable JavaScript
// 在上述代码中，我们通过 Object.defineProperty() 使用了访问器属性
// 访问器属性除了 getter 和 setter 方法外，不包含其他属性和方法。
// 其中，getter 方法会在你引用这个属性的时候调用，而 setter 方法则在你更改这个属性的值时调用。
// getter 方法会返回一个值，而 setter 则接受一个值，并将其赋予给目标属性
// 这个构造函数允许我们设置或更改实例的属性，但无法删除它。
