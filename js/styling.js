/**
 * JavaScript 中的样式操作
 *
 * @参考资料:
 * http://javascript.info/tutorial/view-and-position
 * http://stackoverflow.com/a/21064102/1672655
 * https://developer.mozilla.org/en/docs/Web/API/Element/classList
 *
 * 译者注：
 * 补充一份中文资料：
 * http://www.zhangxinxu.com/wordpress/2011/09/cssom%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8Fcssom-view-module%E7%9B%B8%E5%85%B3%E6%95%B4%E7%90%86%E4%B8%8E%E4%BB%8B%E7%BB%8D/
 */

// className
document.body.className += ' class3';

// classList
var classList = document.body.classList,    // returns *live* DOMTokenList collection
    i;

classList.add('class1', 'class2');

if (classList.contains('class1') === true) {
    classList.remove('class1');
}

for (i = 0; i < classList.length; i++) {
    console.log(i, classList.item(i));
}

// style
document.body.style.backgroundColor = 'green';

// cssText
// style.cssText 是增加 !important 的唯一方式
var div = document.body.children[0];
div.style.cssText = 'color: red !important; \
    background-color: yellow; \
    width: 100px; \
    text-align: center; \
    blabla: 5; \
  ';
// blabla 将被忽略
alert(div.style.cssText);

// Reading the style
// Note: The style gives access only to properties set through it, or with "style" attribute.
//  <style>
//    body { margin: 10px }
//  </style>
//  <body>
//  <script>
//    alert(document.body.style.marginTop)  // Will not return anything.
//  </script>
//  </body>

// getComputedStyle
// 语法：getComputedStyle(element, pseudo)
// element - 要被获取样式的 DOM 元素
// pseudo - A pseudo-selector like ‘hover’ or null if not needed.
var computedStyle = getComputedStyle(document.body, null);
alert(computedStyle.marginTop);

// CSS盒模型

// clientWidth/Height
// 静态区域的大小，包含 padding，不包含 scrollbar

// scrollWidth/Height
// 返回 元素的内容区域宽度/高度 或 元素的本身的宽度/高度中更大的那个值
// scrollWidth/Height 和 clientWidth/Height 很像，不过它包含了整个可滚动的区域
element.style.height = element.scrollHeight + 'px';

// scrollTop/scrollLeft
// 垂直和水平方向上滚动的距离，单位为 px
// scrollLeft/scrollTop 是可写的，你可以改变它们的值来改变浏览器的滚动距离
// 在标准模式下，document 的滚动值在 document.documentElement 下
document.documentElement.scrollTop += 10;

// offsetWidth/Height
// 测量元素的布局宽度/高度，包含 padding 和 border，不包含 margin

// clientTop/Left
// 内容区域的左上角相对于整个元素左上角的位置（包括边框）

// offsetParent, offsetLeft/Top
// offsetLeft 和 offsetTop 体现的是一个元素和它 offsetParent 元素的相对偏移量
// 如果一个元素的定位为 绝对定位，则它的 offsetParent 不一定是父元素，而是最近的定位元素（没有的话则是 body）
// 我们可以使用它来检查一个元素是否隐藏
function isHidden(elem) {
  return !elem.offsetWidth && !elem.offsetHeight;
}
// 总结
// 戳这幅图: http://javascript.info/files/tutorial/browser/dom/metricSummary.png
//
// clientWidth/clientHeight - 可见区域 border 内的高度/宽度（这部分也叫静态区域，client area），它包含了 padding 但不包含 scrollbar 的宽度
// clientLeft/clientTop - client area 到左上角的偏移量
// scrollWidth/scrollHeight - 内容高度/宽度，包括 padding，不包括 scrollbar
// scrollLeft/scrollTop - 滚动的水平/垂直距离
// offsetWidth/offsetHeight - 测量元素的布局宽度/高度，包含 padding 和 border，不包含 margin
// offsetParent - 返回一个指向最近的包含该元素的定位元素
// offsetLeft/offsetTop - 距离 offsetParent 的偏移量

// elem.getBoundingClientRect()
// 返回一个包含该元素的矩形，该矩形本质上是一个对象，包含了 top, left, right, bottom 等属性
// 注：
// 其坐标系相对于 window 而不是 document
// 例如，如果你滚动页面，一个 button 滚动到 window 顶部了，那么通过 getBoundingClientRect 获取到的 top 应该接近于 0（因为相对于 window）；如果要基于 document 计算的话，就必须把滚动算进去
function showRect(elem) {
  var r = elem.getBoundingClientRect();
  alert("Top/Left: " + r.top + " / " + r.left);
  alert("Right/Bottom: " + r.right + " / " + r.bottom);
}

// 计算坐标
//  1) 获取最近的 rectangle
//  2) 计算页面滚动。除 IE9 一下的浏览器外，滚动距离都可以通过 pageXOffset/pageYOffset 获取到；否则通过 scrollTop/scrollLeft
//  3) 在 IE 中，document（html 或 body）会被偏移，需要获取这个偏移量
//  4) 使用元素基于 window 的坐标，再跟之前几步计算出的结果结合起来，求得元素基于 document 的坐标
function getOffsetRect(elem) {
  // (1)
  var box = elem.getBoundingClientRect();

  var body = document.body;
  var docElem = document.documentElement;

  // (2)
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

  // (3)
  var clientTop = docElem.clientTop || body.clientTop || 0;
  var clientLeft = docElem.clientLeft || body.clientLeft || 0;

  // (4)
  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {top: Math.round(top), left: Math.round(left)};
}
