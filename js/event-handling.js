/**
 * 事件处理
 *
 * @参考资料:
 * http://gomakethings.com/ditching-jquery/#event-listeners
 * http://www.quirksmode.org/dom/events/index.html
 * http://www.jstips.co/en/DOM-event-listening-made-easy/
 */


var elem = document.querySelector('.some-class');
elem.addEventListener('click', function (e) {
  // Do stuff
}, false);  // 最后一个参数表面事件处理函数是否在事件捕获时触发

// 给事件处理函数传递多个参数
var elem = document.querySelector('.some-class');
var someFunction = function (var1, var2, var3, event) {
  // do stuff
};
elem.addEventListener('click', someFunction.bind(null, var1, var2, var3), false);
elem.addEventListener('mouseover', someFunction.bind(null, var1, var2, var3), false);

// 将事件委托给 document
var eventHandler = function () {
  // 获取点击到的元素
  var toggle = event.target;

  // 如果是目标元素，则触发函数
  if (toggle.hasAttribute('data-example') || toggle.classList.contains('sample-class')) {
    event.preventDefault(); // 阻止默认事件
    someMethod();
  }
};

document.addEventListener('click', eventHandler, false);

// 更好的委托机制
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

// 单击的处理函数 - ES6
function handleEvent(eventName, {onElement, withCallback, useCapture = false} = {}, thisArg) {
  const element = onElement || document.documentElement;

  function handler(event) {
    if (typeof withCallback === 'function') {
      withCallback.call(thisArg, event)
    }
  }

  handler.destroy = function () {
    return element.removeEventListener(eventName, handler, useCapture)
  };

  element.addEventListener(eventName, handler, useCapture);
  return handler;
}

// Anytime you need
const handleClick = handleEvent('click', {
  onElement: element,
  withCallback: (event) => {
    console.log('Tada!')
  }
});

// And anytime you want to remove it
handleClick.destroy();
