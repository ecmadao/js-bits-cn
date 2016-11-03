/**
 * JavaScript 中的按位操作符
 *
 * @参考资料:
 * http://michalbe.blogspot.com/2013/03/javascript-less-known-parts-bitwise.html
 * http://www.w3schools.com/jsref/jsref_operators.asp
 * http://stackoverflow.com/questions/654057/where-would-i-use-a-bitwise-operator-in-javascript
 */

// 罗列各种按位操作符
// 注：
// 按位操作符 将 操作数 当作32位的比特序列（由0和1组成），而不是十进制、十六进制或八进制数值
var a = 5;
var b = 13;

// a | b - 或
// 任意一个为 1 时结果为 1
console.log('or', a | b); // 13

// a & b - 与
// 两个同时为 1 时结果为 1
console.log('and', a & b); // 5

// a ^ b - 异或
// 有且只有一个为 1 时，结果才为 1，否则为 0
console.log('xor', a ^ b); // 8

// ~a - 非
// 反转操作数的比特位，即0变成1，1变成0
console.log('not', ~a); // -6

// a >> b - 有符号右移
// 将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位
console.log('rs', a >> b); // 0

// a << b - 左移
// 将 a 的二进制形式向左移 b (< 32) 比特位，右边用0填充
console.log('ls', a << b); // 40960

// a >>> b - 无符号右移
// 将 a 的二进制表示向右移 b (< 32) 位，丢弃被移出的位，并使用 0 在左侧填充
console.log('zfrs', a >>> b); // 0


// 一些关于位操作的使用实例
var hex = 'ffaadd';
var rgb = parseInt(hex, 16);    // 1675421

// & 0xFF 确保了结果的字节数小于 8 位，多出来的将会被清空
// http://stackoverflow.com/a/14713134/1672655
var red = (rgb >> 16) & 0xFF; // returns 255
var green = (rgb >> 8) & 0xFF;  // 170
var blue = rgb & 0xFF;         // 221

// 在 JavaScript，你可以使用两个 非（~~n）来替代 Math.floor(n)（如果 n 是正数）或者 parseInt(n, 10) 函数
// 除此以外，n|n 和 n&n 与 ~~n 的作用相同。
var n = Math.PI;
n; // 3.141592653589793
Math.floor(n); // 3
parseInt(n, 10); // 3
~~n; // 3
n | n; // 3
n & n; // 3

// 面对负数时，~~n 同样可以替代 parseInt()
~~(-n); // -3
(-n) | (-n); // -3
(-n) & (-n); // -3
parseInt(-n, 10); // -3
// 但是不能替代 Math.floor()
Math.floor(-n); // -4

// 将正数转换为二进制
// 使用 .toString() 方法，并将 2 作为参数代入
var number = 5;
console.log(number.toString(2));  // 101

// 交换参数的值（使用 异或 ^）
// 更多内容可见: http://en.wikipedia.org/wiki/XOR_swap_algorithm
var a = 73;
var b = 89;
a^=b; // a 16, b 89
b^=a; // b 73, a 16
a^=b; // a 89, b 73
console.log('a', a); // a 89
console.log('b', b); // b 73
