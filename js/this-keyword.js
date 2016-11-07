/**
 * JS 中的 this 关键字
 *
 * @参考资料：
 * http://stackoverflow.com/questions/3127429/how-does-the-this-keyword-work
 * http://stackoverflow.com/a/33979892/1672655
 * http://stackoverflow.com/a/17514482/1672655
 * http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it/
 * http://www.sitepoint.com/mastering-javascripts-this-keyword/
 * http://www.quirksmode.org/js/this.html
 * https://javascriptweblog.wordpress.com/2010/08/30/understanding-javascripts-this/
 * https://www.codementor.io/javascript/tutorial/understanding--this--in-javascript
 *
 * 避免使用 this 关键字
 * https://luizfar.wordpress.com/2012/04/28/dont-use-this-in-javascript/
 * http://stackoverflow.com/questions/31891931/why-does-jslint-forbid-the-this-keyword
 * http://stackoverflow.com/questions/28525393/how-can-i-get-rid-of-the-this-keyword-in-local-functions
 * http://stackoverflow.com/questions/30125464/how-to-avoid-the-this-and-new-keywords-in-javascript
 *
 */

// 1. 全局 this
console.log(this === window); // true
var foo = "bar";
console.log(this.foo); // "bar"
console.log(window.foo); // "bar"

// 2. 函数里的 this
foo = "bar";
function testThis() {
  this.foo = "foo";
}
console.log(this.foo); // logs "bar"
testThis();
console.log(this.foo); // logs "foo"

// 3. 原型链上的 this
function Thing() {
  console.log(this.foo);
}
Thing.prototype.foo = "bar";
var thing = new Thing(); // logs "bar"
console.log(thing.foo);  // logs "bar"

// 4. 对象里的 this
var obj = {
  foo: "bar",
  logFoo: function () {
    console.log(this.foo);
  }
};
obj.logFoo(); // logs "bar"

// 5. DOM 事件上的 this
function Listener() {
  document.getElementById("foo").addEventListener("click",
    this.handleClick);
}
Listener.prototype.handleClick = function (event) {
  console.log(this); // logs "<div id="foo"></div>"
};
var listener = new Listener();
document.getElementById("foo").click(); // logs "<div id="foo"></div>"

// 6. HTML 里的 this

// <div id="foo" onclick="console.log(this);"></div>
// <script type="text/javascript">
document.getElementById("foo").click(); // logs <div id="foo"...
// </script>

// 7. jQuery 里的 this
// <div class="foo bar1"></div>
// <div class="foo bar2"></div>
//  <script type="text/javascript">
$(".foo").each(function () {
  console.log(this); // logs <div class="foo...
});
$(".foo").on("click", function () {
  console.log(this); // logs <div class="foo...
});
$(".foo").each(function () {
  this.click();
});
// </script>

// 8. 在 call(), apply() and bind() 方法里的 this

function add(inc1, inc2) {
  return this.a + inc1 + inc2;
}

var o = {a: 4};
document.write(add.call(o, 5, 6) + "<br />"); // 15
// add.call(o,5,6) 将外层 this 作用域代入到了内部
// 调用 add() 时：
// this.a + inc1 + inc2 即
// o.a（4） + 5 + 6 = 15
document.write(add.apply(o, [5, 6]) + "<br />"); // 15
// o.a（4） + 5 + 6 = 15

var g = add.bind(o, 5, 6);       // g: `o.a` i.e. 4 + 5 + 6
document.write(g() + "<br />");  // 15

var h = add.bind(o, 5);          // h: `o.a` i.e. 4 + 5 + ?
document.write(h(6) + "<br />"); // 15
// 4 + 5 + 6 = 15
document.write(h() + "<br />");  // NaN
// 没有给 h() 传入参数
// 因此，在 add 内的 inc2 是 undefined
// 4 + 5 + undefined = NaN
