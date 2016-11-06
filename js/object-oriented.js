/**
 * JavaScript 面向对象编程
 *
 * 基于原型链的编程模式其实就是一种面向对象的模式，只是没有运用类的概念。但通过装饰或扩展原型链上的对象，可对方法和属性进行复用（也就相当于含有类的语言中，继承的概念）。因此，JavaScript 中的面向对象编程，也被叫做无类的、面向原型链的基于实例的编程。
 *
 * 继承
 * 继承是基于一个或多个类（JavaScript 中只支持单继承），创建自己的类的过程。
 * 新建的类一般叫做子类，而被继承的类则叫做父类。
 * 在 JavaScript 中，只要把父类的实例声明给子类就可以创建成功。在现代浏览器中，你可以通过 Object.create 方法来完成继承。
 *
 * 多态
 * 多态是多种数据类型的接口展示。
 * 例如，integer、float、double 数据就是隐式的多态：且不管它们不同的三种类型，它们都可以被求和、相减、求积等等。
 * 在面向对象的理念里，每个类只对自己拥有的方法和代码负责，而通过多态，可以让每个类都有自己的方法。
 *
 * 封装
 * 封装是将数据和方法打包进一个组件里（例如一个类），然后通过这个类控制其行为。
 * 因此，使用这个类的时候，只需要知道它的接口就行（也就是说，必要的属性和方法要对外暴露）。
 * 它使得我们可以编写高内聚的抽象化代码。
 *
 * 为什么要封装？
 * 当你只是想创建一个储存数据的简单对象，而且这个对象只有它自己一类时，按照普通的方式来创建对象就好。
 * 这种情况十分常见，你肯定也经常这么干。
 * 但当你想创建有相似功能的对象（一样的属性和方法），你可以把主要功能封装到一个函数里，利用函数的构造方法去创建对象。这就是封装的本质了。
 *
 * @参考资料：
 *  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
 * http://javascriptissexy.com/oop-in-javascript-what-you-need-to-know/
 *  http://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor
 *  http://www.toptal.com/javascript/javascript-prototypes-scopes-and-performance-what-you-need-to-know
 */

/**
 * 封装
 */

// 混合 构造方法/原型链 两种模式
function User (theName, theEmail) {
  this.name = theName;
  this.email = theEmail;
  this.quizScores = [];
  this.currentScore = 0;
}

// 复写原型对象 -- 并不建议，因为这样就打断了原型链。但为了加深理解我们就这么干吧。
User.prototype = {
  // 复写原型链的缺点之一就是，对象的构造方法已不再指向原型，因此我们必须手动进行设置。
  constructor: User,
  saveScore:function (theScoreToAdd)  {
    this.quizScores.push(theScoreToAdd)
  },
  showNameAndScores:function ()  {
    var scores = this.quizScores.length > 0 ? this.quizScores.join(",") : "No Scores Yet";
    return this.name + " Scores: " + scores;
  },
  changeEmail:function (newEmail)  {
    this.email = newEmail;
    return "New Email Saved: " + this.email;
  }
};

// A User ​
firstUser = new User("Richard", "Richard@examnple.com");
firstUser.changeEmail("RichardB@examnple.com");
firstUser.saveScore(15);
firstUser.saveScore(10);

firstUser.showNameAndScores(); //Richard Scores: 15,10​

// Another User​
secondUser = new User("Peter", "Peter@examnple.com");
secondUser.saveScore(18);
secondUser.showNameAndScores(); //Peter Scores: 18

/**
 * Object.create()
 *
 * Object.create 接收一个对象作为被继承的对象，并返回一个全新的对象
 */
Object.create = function (o) {
  // 创建一个临时的构造方法 F()
  function F() {
  }
  // 并将构造方法的原型指向传入的参数 -- o 对象
  // 因此 F() 构造方法现在继承了 o 的所有属性和方法
  F.prototype = o;

  // 最后，返回一个全新的对象（F 的实例）
  // 要记住的是，F 的实例继承自传入的 o 对象
  // 或者你可以说，它完全拷贝了 o 的属性和方法
  return new F();
};

// 使用案例
// 一个简单的 cars 对象
var cars = {
  type:"sedan",
  wheels:4
};

// 我们想要继承 cars 对象，所以：
var toyota = Object.create (cars); // 现在 toyota 继承了 cars​
console.log(toyota.type); // sedan


/**
 * 面向对象编程的例子
 */
// 定义 Person 构造方法
var Person = function(firstName) {
  this.firstName = firstName;
};

// 给 Person.prototype 增加方法
Person.prototype.walk = function(){
  console.log("I am walking!");
};

Person.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName);
};

// 定义 Student 构造方法
function Student(firstName, subject) {
  // 调用父类的构造方法，并利用 Function#call 来确保 this 作用域正确
  Person.call(this, firstName);

  // 初始化属性
  this.subject = subject;
}

// Student.prototype 对象继承自 Person.prototype
// 注意：
// 一个常见的错误是，利用 new Person() 来创建 Student.prototype
// 这犯了几个错，其中一个就是，我们此时还不会给 Person 传入参数，因为无法通过 new 来创建
Student.prototype = Object.create(Person.prototype);

// 将原型链上的 constructor 指向 Student
Student.prototype.constructor = Student;

// 覆写 sayHello 方法
Student.prototype.sayHello = function(){
  console.log("Hello, I'm " + this.firstName + ". I'm studying "
    + this.subject + ".");
};

// 新增 sayGoodBye 方法
Student.prototype.sayGoodBye = function(){
  console.log("Goodbye!");
};

// Example usage:
var student1 = new Student("Janet", "Applied Physics");
student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
student1.walk();       // "I am walking!"
student1.sayGoodBye(); // "Goodbye!"

// 检查原型链
console.log(student1 instanceof Person);  // true
console.log(student1 instanceof Student); // true
