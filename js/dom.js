/**
 * DOM API
 *
 * DOM，即将 document 看做一个树，由 父节点-子节点 关系组成，每个父节点都含有一个或多个子节点
 * DOM 认为每个节点都是一个对象，我们可以获取并改变它的属性。
 *
 * @参考资料:
 * http://javascript.info/tutorial/dom
 * http://www.quirksmode.org/dom/
 * http://domenlightenment.com/
 */

// 基本的元素选择
document.getElementById("IDName"); // 选择相应 ID 的第一个元素。尽管在 HTML 里多个重复的 ID 不合法，但如果真那么写了，则只选择第一个
document.getElementsByClassName("ClassName"); // 根据 class 名称选择，返回一个 array
document.getElementsByName("Name"); // 根据 Node name 选择，返回一个 array
document.getElementsByTagName("TagName"); // 根据 TagName 选择，返回一个 array
document.querySelector("#IDName or .ClassName"); // 返回匹配的第一个元素
document.querySelectorAll("#IDName or .ClassName"); // 返回一个匹配的 array

// 获取根节点元素
console.log(document.documentElement);

// 在 DOM 世界里，“element not found” 或者 “no such element” 总是代表 null
// 不可能引用还没有渲染出来的 DOM 元素
// 例如，如果你在页面加载时，在 <head> 内获取 document.body，将会返回 null，因为此时 <body> 还没有加载

// 子元素

// childNodes
// 返回当前元素所有的子节点，甚至包括空格
console.log(document.body.childNodes);

// children
// 有时候我们只需要获取到 DOM 节点元素，而不需要文字节点等元素
console.log(document.body.children);

// firstChild - 获取到第一个节点，包括空格
// lastChild - 获取到最后一个节点
// 它们分别相当于 childNodes 中的第一个/最后一个元素
console.log(document.body.firstChild);
console.log(document.body.lastChild);

// firstElementChild - 获取到第一个 DOM 节点元素
// lastElementChild - 获取到最后一个 DOM 节点元素
// 它们分别相当于 children 中的第一个/最后一个元素
console.log(document.body.firstElementChild);
console.log(document.body.lastElementChild);

// parentNode, previousSibling and nextSibling
console.log(document.body.parentNode);
// 上一个节点元素
console.log(document.body.previousSibling);
// 下一个节点元素
console.log(document.body.nextSibling);
// 上一个 DOM 节点元素
console.log(document.body.previousElementSibling);
// 下一个 DOM 节点元素
console.log(document.body.nextElementSibling);

// 结构和属性

// nodeType 表示某节点的类型，可用于区分不同类型的节点，比如 DOM 元素、文本、注释
// 尤其要注意的是，DOM 元素的 nodeType 为 1，文本节点的 nodeType 为 3
// 更多资料可参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
var childNodes = document.body.childNodes;
console.log(childNodes[0].nodeType != 1);

// nodeName, tagName
// nodeName 和 tagName 都返回节点的名称
// 在 HTML 里，任意节点的名称都是大写的
// 对于 DOM 节点而言，nodeName 和 tagName 是一致的
// 从 DOM 层次来看，nodeName 是 node 接口上的property，而 tagName 是 element 接口上的property
// 所有节点都继承了 node 接口，而只有 DOM 节点才继承了 element 接口
console.log(document.body.tagName); // BODY

// innerHTML
// 它可以获取到 node 内部的内容，且只有 DOM 节点才可以正常使用
// 注意: `innerHTML` 无法被追加
// 正常来看，或许可以通过 elem.innerHTML += "New text" 的方式，直接在 innerHTML 后面进行追加，
// 但这种行为实际上做的是：
// 1) 拼接新内容
// 1) 清除旧内容
// 2) 重新加载拼接后的新内容
// 所以比较耗费资源
document.body.innerHTML += "<div>Hi <img src='smile.gif'/> !</div>";
document.body.innerHTML += "How you doing?";

// nodeValue
// 只有 DOM 节点元素才有 innerHTML 属性，而对于其他类型，则通过 nodeValue 获取值
// eg. 文字节点 和 注释节点
document.body.childNodes[i].nodeValue = 'Test';

// Properties

// DOM 节点其实就是一个对象，如同其他 js 对象一样，可以保存属性和方法
// 自定义的 DOM 属性：
// 1) 对属性的大小写敏感
// 2) 不影响 HTML
// 3) 可以在 for..in 的遍历中获取到
document.body.sayHi = function () {
  alert(this.nodeName);
};
document.body.sayHi();  // BODY

document.body.custom = 5;
var list = [];
for (var key in document.body) {
  list.push(key);
}
alert(list.join('\n'));

// Attributes

// DOM 节点有一些可以获取到 HTML 属性的方法：
// elem.hasAttribute(name) - 检查属性是否存在
// elem.getAttribute(name) - 获取属性
// elem.setAttribute(name, value) - 设置属性
// elem.removeAttribute(name) - 移除属性
//
// 和 properties 对比，attributes：
// 1) 可能只有 string
// 2) 命名不是大小写敏感，因为 HTML 属性名称并不在乎大小写
// 3) 可以被 innerHTML 获取（除非是老版本 IE）
// 4) 你可以把所有的 attributes 作为一个类数组对象列出来
var div = document.body.children[0];
alert(div.getAttribute('ABOUT')); // 不区分大小写
div.setAttribute('Test', 123);
alert(document.body.innerHTML);

/**
 * 译者注：
 * 除此以外，他们获取属性的方式也有所不同
 * node.getAttribute(xxx) 获取的是 attribute
 * node.xxx 获取的是 property
 */

// PROPERTIES 和 ATTRIBUTES 的同步

// 每种 DOM 节点都有标准的 properties
// 标准的 DOM properties 会与 attributes 保持同步

// id
document.body.setAttribute('id', 'la-la-la');
alert(document.body.id); // la-la-la

// href
var a = document.body.children[0];
a.href = '/';
alert('attribute:' + a.getAttribute('href')); // '/'
alert('property:' + a.href);  // IE: '/', others: full URL

// input.checked 的 property 要么是 true 要么是 false，但 attribute 却是由 你的输入决定
var input = document.body.children[0];
alert(input.checked); // true
alert(input.getAttribute('checked')); // empty string

// value
// 有一些内置的 properties 只是单向的同步
// 比如 input.value，由 attribute 来决定同步
var input = document.body.children[0];
input.setAttribute('value', 'new');
alert(input.value); // 'new', input.value changed

// 当 property 的 "value" 更新以后，attribute 还是会保持原有的值。
// 例如，用户输入某些东西。原有的值保存在 attribute 里，既可以用来检查 value 是否发生了改变，也可以用来重置。
var input = document.body.children[0];
input.value = 'new';
alert(input.getAttribute('value')); // 'markup', not changed!

// class/className
// 因为 class 是 JavaScript 中的预留单词，因此在属性里叫做 className
// 为了避免 IE 下的问题，尽量使用 property 而不是 attribute 管理 className
document.body.setAttribute('class', 'big red bloom');
alert(document.body.className);  // big red bloom

// 除非非要使用 attribute，否则尽量一直使用 properties
//
// 而这种时候你确实需要使用 attribute：
// 1) 获取自定义的 HTML attribute（不和 DOM property 同步）
// 2) 获取某些 HTML attribute 的原始值，比如 <INPUT value="...">

// Attributes as DOM nodes
// 每个 attribute 都表现的像特殊的 DOM 节点一样，有自己的名称、属性（properties）和 值
var span = document.body.children[0];
alert(span.attributes['style'].value);  // "color:blue;"
alert(span.attributes['id'].value);  // "my"

// MODIFYING THE DOCUMENT

// 创建元素
// 1) 创建一个 DOM 节点：
var div = document.createElement('div');
// 2) 创建一个文本节点
var textElem = document.createTextNode('Robin was here');
// 克隆
// 元素可以被克隆
textElem.cloneNode(true); // 深度拷贝
textElem.cloneNode(false); // 浅拷贝，只复制 attributes，不复制子元素

// 新增元素
//
// appendChild 在父节点末尾插入
document.body.appendChild(textElem);

// parentElem.insertBefore(elem, nextSibling)
// 在某个子节点（nextSibling）之前插入
// Link: http://stackoverflow.com/a/2007473/1672655
var div = document.body.children[0];
var span = document.createElement('span');
span.innerHTML = 'A new span!';
div.insertBefore(span, div.firstChild);
// 如果 insertBefore 方法的第二个参数是 null，则其表现的和 appendChild 一致
elem.insertBefore(newElem, null); // same as
elem.appendChild(newElem);

// 移除节点
//
// 一般有两种方法可以从 DOM 移除节点：
// parentElem.removeChild(elem) - 直接从 parentElem 中移除 elem
// parentElem.replaceChild(elem, currentElem) - 移除 elem，并用 currentElem 替换它

// 注：当你想要移动一个节点的时候，并不需要先移除它。
// elem.appendChild/insertBefore 方法会先移除 DOM
// 下面这个例子将最后一个元素插入到首位：
var first = document.body.children[0];
var last = document.body.children[1];
document.body.insertBefore(last, first);
// 当针对一个已经有父节点的元素调用这些方法时，会先自动移除掉它

// 自定义 insertAfter 方法
var elem = document.createElement('div');
elem.innerHTML = '**Child**';
function insertAfter(elem, refElem) {
  return elem.parentNode.insertBefore(elem, refElem.nextSibling);
}
insertAfter(elem, document.body.firstChild);
insertAfter(elem, document.body.lastChild);

// Gotcha
// 对任意的 document，尝试做如下事：
var aList1 = document.getElementsByTagName('a'); // 若 DOM 改变，则数据也会改变
var aList2 = document.querySelectorAll('a'); // 获取之后，新增 DOM 不会改变其数据
document.body.appendChild(document.createElement('a'));
alert(aList1.length - aList2.length); // 1

// 输入为 1
// 为毛是这样的输出？
// Solution
// getElementsByTagName 是会动态变化的，在新增一个 a DOM 之后，它会自动增加 1
// 反之，querySelector 返回一个静态数据，在获取到结果之后，无论我们对 DOM 进行什么操作，结果不会再改变

// TABLE
//<table>
//  <tr> <td>one</td>   <td>two</td>  </tr>
//  <tr> <td>three</td> <td>four</td> </tr>
//</table>

var table = document.body.children[0];
alert(table.rows[0].cells[0].innerHTML); // "one"

// FORMS

//Select option
//<form name="my">
//  <select name="genre">
//    <option name="blues" value="blues">Soft blues</option>
//    <option name="rock" value="rock">Hard rock</option>
//  </select>
//</form>
var form = document.forms.my;
var select = form.elements.genre;
var value = select.options[select.selectedIndex].value;
alert(value); // blues

// SELECT 提供了名为 selectedIndex 的属性，代表当前被选择的 option 所处的 index。当只存在单个 select 的时候很好用
//<form name="temp">
//  <select name="genre">
//    <option name="blues" value="blues">Soft blues</option>
//    <option name="rock" value="rock">Hard rock</option>
//  </select>
//</form>

var form = document.forms.temp;
var select = form.elements.genre;
var value = select.options[select.selectedIndex].value;
alert(value); // blues
