/**
 * 事件冒泡和捕获
 *
 * @参考资料:
 * http://javascript.info/tutorial/bubbling-and-capturing
 * http://stackoverflow.com/questions/4616694/what-is-event-bubbling-and-capturing
 * http://javascript.info/tutorial/mouse-events
 *
 */

// 阻止事件冒泡
element.onclick = function (event) {
  event = event || window.event; // 确保跨浏览器兼容性
  if (event.stopPropagation) {
    // W3C 标准
    event.stopPropagation()
  } else {
    // IE 标准
    event.cancelBubble = true
  }
};

// 如果某个元素对于一个事件绑定了多个相应函数，则它们各个独立，并且在触发事件时，都会被执行。
// 例如，某个链接上绑定了两个不同的点击事件，那么其中一个阻止事件冒泡，对另外一个没有影响。
// 同样的，浏览器也无法保障它们调用的顺序。

// 事件捕获
// 在除了 <IE9 的浏览器里，事件处理有两个阶段：
// 首先，事件向下传递 - 称为捕获；其次，事件向上冒泡。
// 这样的事件处理机制也符合 W3C 的标准规范。

// 所有的事件处理都忽略了事件捕获阶段
// 只有通过给 addEventListener 函数的最后一个参数传递 true，才能在捕获阶段触发事件处理

// elem.addEventListener( type, handler, phase );
// phase = true
// The handler is set on the capturing phase.
// phase = false

// 阻止浏览器默认事件

// 1) 对于支持 W3C 规范的浏览器，可通过 event.preventDefault() 阻止触发默认事件；而对于 <IE9 的浏览器，则需要 event.returnValue = false
// 或者用一行代码兼容：
event.preventDefault ? event.preventDefault() : (event.returnValue = false);

// 2) 在事件处理中返回 false
element.onclick = function (event) {
  return false;
};

// Note: Bubbling and default action
// 浏览器的默认事件独立于事件冒泡
// 阻止默认事件，并不能阻止事件冒泡，这点反过来也一样。
// 但是，jQuery 有自己的事件处理层，它包裹了用户定义的事件处理函数，当处理函数返回 false 时，既可以阻止事件冒泡，又可以阻止默认事件

// Sample Events
document.getElementById('btn').onclick(alert('Works')); // 追踪（左键）点击事件：mousedown 然后 mouseup
document.getElementById('btn').oncontextmenu(alert('Works')); // 追踪右键点击事件
document.getElementById('btn').dblclick(alert('Works'));  // 追踪双击事件
