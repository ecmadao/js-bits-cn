/**
 * Array slice() vs splice()
 *
 * 1. splice() 方法返回由 被删除的元素 组成的 array；slice() 方法在新 array 中返回被选择的元素
 *
 * 2. splice() 方法更改原有的 array，slice() 则不动原 array
 *
 * 3. splice() 可接受多个数字作为参数：
 * 第一个参数：index，必需，代表起始位置
 * 第二个参数：可选，代表移除几个元素。如果不传，从 index 到尾部的元素都会被移除。
 * 第三个 ~ 第n个元素：可选。往数组里新添加的元素。
 *
 * 4. slice() 则可接受两个参数：
 * 第一个参数：必需，代表开始选择的位置。
 * 第二个参数：可选，代表结束的位置。不传则默认选择到数组尾部。
 *
 * @参考资料：
 * http://www.tothenew.com/blog/javascript-splice-vs-slice/
 */

// Array.splice()
// 语法: array.splice(start, deleteCount[, item1[, item2[, ...]]])
var array = [1, 2, 3, 4, 5];
console.log(array.splice(2));
// 返回 [3, 4, 5], 将移除的元素放在新数组中返回

console.log(array);
// 返回 [1, 2], 原有数组已经被改变

var array2 = [6, 7, 8, 9, 0];
console.log(array2.splice(2, 1));
// [8]

console.log(array2.splice(2, 0));
//[] , 没有元素被移除

console.log(array2);
// [6,7,9,0]

var array3 = [11, 12, 13, 14, 15];
console.log(array3.splice(2, 1, "Hello", "World"));
// [13]

console.log(array3);
// [11, 12, "Hello", "World", 14, 15]

//            -6  -5 -4 -3 -2 -1 -- 倒序 index
//             |   |  |  |  |  |
var array4 = [16, 17, 18, 19, 20];
//             |  |  |  |  |   |
//             0  1  2  3  4   5 -- 正序 index

console.log(array4.splice(-2, 1, "me"));
// [19]

console.log(array4);
// [16, 17, 18, "me", 20]


// 如果第一个参数 NaN，则会被当做 0 来对待
var array5 = [21, 22, 23, 24, 25];
console.log(array5.splice(NaN, 4, "NaN is Treated as 0"));
// [21,22,23,24]

console.log(array5);
// ["NaN is Treated as 0",25]


// 如果第二个参数小于 0，或者是 NaN，则会被当做 0 对待
var array6 = [26, 27, 28, 29, 30];
console.log(array6.splice(2, -5, "Hello"));
// []

console.log(array6);
// [26,27,"Hello",28,29,30]

console.log(array6.splice(3, NaN, "World"));
// []

console.log(array6);
// [26,27,"Hello","World",28,29,30]


// 如果第一或者第二个参数大于数组的长度，则会使用 数组长度作为参数
var array7 = [31, 32, 33, 34, 35];
console.log(array7.splice(23, 3, "Add Me"));
// []

console.log(array7);
// [31,32,33,34,35,"Add Me"]

console.log(array7.splice(2, 34, "Add Me Too"));
// [33,34,35,"Add Me"]

console.log(array7);
// [31,32,"Add Me Too"]


// slice() 可以接收两个参数：
// arr.slice([begin[, end]])
// 获取的结果包含了 begin 位置的值，但不包含 end 位置的值，即 [begin, end)
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);
// citrus 为 ['Orange','Lemon']

var array = [1, 2, 3, 4, 5];
console.log(array.slice(2));
// 返回 [3, 4, 5]

console.log(array.slice(-2));
// [4, 5]
console.log(array);
// [1, 2, 3, 4, 5], 原有数组没有受到影响

var array2 = [6, 7, 8, 9, 0];
console.log(array2.slice(2, 4));
// [8, 9]

console.log(array2.slice(-2, 4));
// [9]

console.log(array2.slice(-3, -1));
// [8, 9]

console.log(array2);
// [6, 7, 8, 9, 0]

// 任意一个参数是 NaN 时，都会作为 0 处理。
var array3 = [11, 12, 13, 14, 15];
console.log(array3.slice(NaN, NaN));
// []

console.log(array3.slice(NaN, 4));
// [11,12,13,14]

console.log(array3);
// [11,12,13,14,15]

// 任意一个参数大于数组长度时，会作为数组长度处理
var array4 = [16, 17, 18, 19, 20];
console.log(array4.slice(23, 24));
// []

console.log(array4.slice(23, 2));
// []

console.log(array4.slice(2, 23));
// [18,19,20]

console.log(array4);
// [16,17,18,19,20]

// 第一个参数 undefined 时，作为 0 处理
var array5 = [21, 22, 23, 24, 25];
console.log(array5.slice(undefined, 2));
// [21, 22]

// 通过不传参，可以起到复制数组的作用
var array6 = array5.slice();
console.log(array6);
// [21, 22, 23, 24, 25]
