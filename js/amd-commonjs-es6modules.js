/**
 * 模块（Modules）
 *
 * 为什么模块化很重要?
 * - 它鼓励我们将代码分割成相对独立的小模块，而不是一大坨
 * - 提高了代码的可测试性，并且在运行时模块也可是被 mock 替代
 * - 提高了可维护性，模块越小越易懂
 *
 * AMD vs CommonJS vs ES6 Modules
 *
 * @参考资料:
 * http://stackoverflow.com/questions/21021621/difference-between-requirejs-and-commonjs
 * https://www.airpair.com/javascript/posts/the-mind-boggling-universe-of-javascript-modules
 * http://javascript.tutorialhorizon.com/2014/09/01/understanding-nodejs-module-exports-and-require/
 * http://www.2ality.com/2014/09/es6-modules-final.html
 *
 * 模块设计模式:
 * http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html
 */

/**
 * AMD - 定义异步模块
 *
 * 专门针对浏览器环境而设计。通过 AMD 模块设计，各模块在应用中只有被需要时才会异步加载。
 * 一旦模块被加载完成，它就会被缓存起来，之后再使用时可以直接运行。
 * AMD 模块机制使用原生的 JavaScript，因此不依赖于第三方工具就可以正常使用。
 * 在 CommonJS 里，你只能 export 一个对象；而在 AMD 里，可以 export 任意 JavaScript 类型的东西。这意味着，你可以暴露一个构造函数，或者一个 array。
 * 至于模块的加载，AMD 可以按需加载其他文件，比如：HTML 模板, CSS, Text, JS and Binary files
 *
 * 鉴于 AMD 模块要及时获取依赖，因此在定义时，需要声明依赖，并将你的函数使用一层 wrapper 包裹起来，
 * 在回调中编写你的代表。这在模块定义时写起来会有点蛋疼。
 * Since AMD modules need to be able to fetch dependencies just-in-time, they need a callback wrapper around a module
 * which produces slightly more overhead in your module definition.
 *
 * 多个模块可以同时加载。
 * 异步加载是一个复杂的方案，如果没有良好的设计，很有可能就会引起各个模块之间的竞争关系。而异步加载模块的执行顺序是无法保障的
 *
 * 如何使用：
 * 编写模块时，在回调里通过 return 进行模块的暴露。
 * 在使用时，通过 array 进行模块的引用，而回调函数的参数则代表着调用的模块
 *
 */

// foo.js
// 定义一个叫做 foo 的模块
define('foo', function () {
  return {
    method: function () {
      return 'food method result';
    }
  }
});

// bar.js
// 定义一个叫做 bar 的模块, 并且依赖于 foo 模块
define('bar', ['foo'], function (Foo) {
  return {
    barMethod: function () {
      return 'bar method result';
    },
    fooMethod: function () {
      return Foo.method();
    }
  };
});

// 加载 bar 模块，并在回调中使用
require(['bar'], function (bar) {
  // Do something with fetched dependency
  bar.barMethod();
  bar.fooMethod();
});

/**
 * CommonJS
 *
 * CommonJS 最初是针对服务器端环境（NodeJS）而设计的。
 * 鉴于 CommonJS 模块制度不需要及时获取到依赖，因此不需要任何回调结构包裹你的模块。
 * 这使得模块看起来更加轻盈小巧
 *
 * CommonJS 不能直接在浏览器环境下运行。
 * 反之，它需要被预编译。在这个过程中，调用所需的模块并解析。
 * 使用 CommonJS 机制编写的模块在使用时直接引用就好，并且不会立即执行。（而是每个依赖都会造成阻塞）
 * CommonJS modules are always included directly and can’t be fetched just-in-time.
 *
 * CommonJS 是 Node.js 和 NPM 官方采用的方案。
 * 这意味着任何使用 CommonJS 定义的模块都关联着 NPM 的核心
 *
 * 如何使用：
 * 无论是否私有，只要通过 module.exports 就会全部暴露出去
 * 关于模块的使用，则要通过 require 方法，参数为模块文件的路径
 *
 */

// foo.js
// 定义 foo 模块
var foo = function () {
  return 'foo method result';
};

// 将 foo 暴露出去
exports.method = foo;

// bar.js
// 定义 bar 模块，依赖于 foo 模块
var Foo = require('foo');
var barMethod = function () {
  return 'barMethod result';
};
var fooMethod = function () {
  return Foo.method();
};

exports.barMethod = barMethod;
exports.fooMethod = fooMethod;


// Require bar 模块
var bar = require('bar');
// Do something with the fetched dependency
bar.barMethod();
bar.fooMethod();

/**
 * Hybrid
 *
 * 一些 AMD loaders 提供了基于 AMD 和 CommonJS 之间的混合方式。
 * 这种方法在运行时进行检测，并确定哪些模块需要预加载。因此虽然看起来像是同步的，但实际上不是。
 *
 */

define(function (require, exports, module) {
  var math = require('lib/math');
  exports.max = math.max;
  exports.add = math.add;
});


/**
 * ES6 Modules
 *
 * ES6 的模块机制支持同步/异步两种方法，
 * 更棒的是，它也同时支持浏览器端和服务端两种环境。
 */

// 暴露模块
// exporter.js
export function someMethod() {
  // Do some stuff
}

export var another = {};

// 引用模块
// importer.js
import { someMethod, another as newName } from './exporter';

someMethod();
// typeof newName == 'object';


// 暴露/引用单个模块
// export-default.js
export default function foo() {
  console.log('foo');
}

// import-default.js
import customName from './export-default';
customName(); // -> 'foo'


// ES6 模块机制所支持的所有语法样式
import 'jquery';                        // 单纯的引用一个模块
import $ from 'jquery';                 // 引用模块里默认的某个命名输出
import { $ } from 'jquery';             // 引用模块里的命名某个输出
import { $ as jQuery } from 'jquery';   // 引用模块里的命名某个输出，并重新定义命名

export var x = 42;                      // 暴露一个变量
export function foo() {};               // 暴露一个命名函数

export default 42;                      // 暴露一个默认输出
export default function foo() {};       // 暴露一个函数作为默认输出

var encrypt = {};
var decrypt = {};
export { encrypt };                     // 暴露一个存在的变量
export { decrypt as dec };              // 暴露一个变量，并重新命名
export { encrypt as en } from 'crypto'; // 从其他模块引用之后重新命名，再暴露出去
export * from 'crypto';                 // 从其他模块引用所有的模块，再暴露出去

import * as crypto from 'crypto';    // 从其他模块引用所有输出，并命名为 crypto

// 需要注意的是，所有合法的声明都可以暴露出去。在 ES6 语法里，这包括了 class, const 和 let。
