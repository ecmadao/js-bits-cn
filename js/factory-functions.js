/**
 * 工厂方法
 *
 * @参考资料:
 * https://www.youtube.com/watch?v=ImwrezYhw4w
 * http://atendesigngroup.com/blog/factory-functions-javascript
 *
 */

// ES6 的 class vs 工厂方法
// With classes -- 使用时要小心
class Dog {
  constructor() {
    this.sound = 'woof';
  }

  talk() {
    console.log(this.sound);
  }
}

const sniffles = new Dog();
sniffles.talk();   // 输出: 'woof'

// 但这样使用会有问题
$('button').click(sniffles.talk); // 此时无法像上面那样正常工作。因为方法内的 this 作用域已经改变，成为了 $(button)

// 修复措施 -- 使用 bind
$('button').click(sniffles.talk.bind(sniffles));

// 或者 ES6 语法 -- 箭头函数内的 this 作用域总是指向外层
$('button').click(() => sniffles.talk());


// 工厂方法
const dog = () => {
  const sound = 'woof';
  return {
    talk: () => console.log(sound)  // 不使用 this
  };
};

const sniffles = dog();
sniffles.talk();  // 输出: 'woof'

$('button').click(sniffles.talk); // 可正常工作 -- 输出: 'woof'



// 构造函数 vs 工厂方法

// 最基本的不同点是，构造函数需要通过 new 关键字调用（这会使 js 自动创建一个新对象，并将 this 作用域赋给对象，最后返回这个对象）：
var objFromConstructor = new ConstructorFunction();

// 而工厂方法则如同正常的函数一样调用：
var objFromFactory = factoryFunction();
// 但是既然它被叫做 “工厂”，那么需要在调用时，返回一些对象的实例，
// 不能因为某个方法返回 boolean 或者其他东西就叫它 “工厂方法”。
// 而返回实例这件事不会像 new 的方式一样自动调用，但也由此带来了一些灵活性。
// 举个简单的栗子：

function ConstructorFunction() {
  this.someProp1 = "1";
  this.someProp2 = "2";
}
ConstructorFunction.prototype.someMethod = function() { /* whatever */ };

function factoryFunction() {
  var obj = {
    someProp1 : "1",
    someProp2 : "2",
    someMethod: function() { /* whatever */ }
    // 对象内的 someMethod() 会导致每次返回的对象都有一份 someMethod 不同拷贝，而我们可能并不想这样。
    // 此时如果在工厂方法内使用 new 和 prototype 就会避免这个问题
  };

  // other code to manipulate obj in some way here
  return obj;
}

// 工厂方法：封装使用内部的私有属性
function Car () {
  // 私有变量
  var location = 'Denver';    // 私有
  function year() {           // 私有
    self.year = new Date().getFullYear();
  }

  var self = {
    make: 'Honda',
    model: 'Accord',
    color: '#cc0000',
    paint: function(color){
      self.color = color;
    }
  };

  if (!self.year){
    year();
  }

  return self;
}

var myCar = Car();


// 工厂方法：动态对象
// 鉴于工厂方法内可以使用私有/公开函数，我们可以通过 if/else 来控制对象的构造
// 这给予了我们极大的灵活性，可以通过一些参数来决定工厂方法最终返回的实例对象
function Address (param) {
  var self = {};

  if (param === 'dev'){
    self = {
      state: 'Colorado',
      saveToLog: function(){
        // write info to a log file
      }
    };
  } else {
    self = {
      state: 'Colorado'
    };
  }

return self;
}

var devAddress = Address('dev');
var productionAddress = Address();
