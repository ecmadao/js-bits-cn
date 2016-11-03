/**
 * Vanilla JS 中的事件委托
 *
 * 使用事件委托，能让你避免对特定的每个节点添加事件监听器
 *
 * 译者注：
 * 关于 Vanilla JS：
 * http://vanilla-js.com
 * https://segmentfault.com/a/1190000000355277
 * 看完有没有发现自己被骗了。。其实就是原生 js 😂
 *
 * JSFiddle:
 * https://jsfiddle.net/vasanthkay/sokgevhr/7/
 *
 * @参考资料:
 * Excellent Article:
 * http://codepen.io/32bitkid/post/understanding-delegated-javascript-events
 */

//HTML CODE
//
//<ul class="toolbar">
//  <li>
//    <button class="btn"><i class="fa fa-pencil"></i> Pencil</button>
//  </li>
//  <li>
//    <button class="btn"><i class="fa fa-paint-brush"></i> Pen</button>
//  </li>
//  <li class="separator"></li>
//  <li>
//    <button class="btn"><i class="fa fa-eraser"></i> Eraser</button>
//  </li>
//</ul>


// HELPER FUNCTION
function delegate(criteria, listener) {
  return function (e) {
    var el = e.target;
    do {
      if (!criteria(el)) {
        continue;
      }
      e.delegateTarget = el;
      listener.call(this, e);
      return;
    } while ((el = el.parentNode));
  };
}

// Example of Event Delegation
// Custom filter to check for required DOM elements
var buttonsFilter = function (elem) {
  return (elem instanceof HTMLElement) && elem.matches(".btn");
  // OR
  // For < IE9
  // return elem.classList && elem.classList.contains('btn');
};

var buttonHandler = function (e) {
  // 获取正在处理当前事件的元素
  var button = e.delegateTarget;
  // 通过 button.classList 获取到所有的 className
  // 并通过 contains 进行判断
  var hasActiveClass = button.classList.contains('active');

  if (!hasActiveClass(button)) {
    button.classList.add('active');
  } else {
    button.classList.remove('active');
  }
};

// 通过事件委托，不需要在每个节点上绑定事件
// 类似于 jQuery 的 $(xxx).on('click', DOM, callback)
document.addEventListener("click", delegate(buttonsFilter, buttonHandler));
