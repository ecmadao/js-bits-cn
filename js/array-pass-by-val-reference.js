/**
 * 理解 arrays - 通过值传递 vs 通过引用传递
 *
 * @参考资料:
 * http://orizens.com/wp/topics/javascript-arrays-passing-by-reference-or-by-value/
 */

// 通过引用传递
// 在默认情况下，array 作为参数传递给函数时，是作为引用传递的
var a = [3, 'my new post', {345}];

function renderData(a) {
  a.push(4);
}

renderData(a);
alert(a);	// push 方法返回一个新 array [3, 'my new post', {345}, 4]

// 通过值传递
// 通过调用原生的 array 方法 - slice()，可以达到通过值传递的效果
//
// 一般来说，slice() 会克隆 array，然后使用新 array 的引用。需要注意的是：
// - array 中含有对象时，针对对象的引用（而不是真正的对象），slice 会复制一份引用到新的 array 里
//
// 因此，无论是之前的 array 还是复制出的新 array，都指向相同的对象。如果对象改变了，那么两个 array 内的对象都会改变。
//
// 举栗子：
!function() {

	// object
	var obj = {"abc": 456};
	var arr = [obj].slice(); // [{"abc": 456}]，复制自 [obj]，且 arr 内的 obj 是引用 {"abc": 456}
	obj.abc = 4567; // 改变原始对象
	console.log(arr, obj); // [{"abc": 4567}] {"abc": 4567} // 会发现 arr 内的 obj 也被改变

	// array
	var oldarr = [456];
	var arr = [oldarr].slice(); // [[456]]
	oldarr[0] = 4567;
	console.log(arr, oldarr); // [[4567]] [4567]

}()

// - 而对于 array 中的 String 和 number 类型，则直接复制到新数组里
//   他们的改变互不影响
// 举栗子：
!function() {

	// 数组中有串 String
	var oldarr = ['abc'];
	var arr = oldarr.slice(); // ['abc']
	oldarr[0] = 'abcd';
	console.log(arr, oldarr); // ['abc'] ['abcd'] // 直接复制的值而不是引用，因此互不影响

	// number in array
	var oldarr = [123, 456, 789];
	var arr = oldarr.slice(0, 2); // [123, 456]
	oldarr[1] = 123456789;
	console.log(arr, oldarr); // [123, 456] [123, 123456789, 789]

}()

var a = [3, 'my new post', {345}];

function renderData(a) {
  a.push(4);
}

renderData(a.slice());
alert(a);	// [3, 'my new post', {345}]

// 如果你确实想通过值传递来复制数组中的对象，那么需要使用 JSON.parse(JSON.stringify(array))
// 注意：在复制 functions/dates 对象的时候会有一些警告
// 更多内容请查看：https://github.com/vasanthk/js-bits/blob/master/js/object-clone.js
var tempArray = JSON.parse(JSON.stringify(mainArray));
