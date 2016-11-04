/**
 * JavaScript 中的数字类型（浮点数）
 *
 * @太长别看：有一种数字类型 - 64位浮点数（就像 Java 里的 double）- 经常会出问题
 *
 * @资料
 * - The crux of the problem is that numbers are represented in this format as a whole number times a power of two.
 *   rational numbers (such as 0.1, which is 1/10) whose denominator is not a power of two cannot be exactly represented.
 * - 0.1 cannot be represented as accurately in base-2 as in base-10 due to the missing prime factor of 5.
 *   Just as 1/3 takes an infinite number of digits to represent in decimal, but is "0.1" in base-3,
 *   0.1 takes an infinite number of digits in base-2 where it does not in base-10.
 * - For 0.1 in the standard binary64 format, the representation can be written exactly as
 *   0.1000000000000000055511151231257827021181583404541015625 in decimal
 * - In contrast, the rational number 0.1, which is 1/10, can be written exactly as 0.1 in decimal.
 *
 * @Note:
 * - 一个关于处理浮点数的最好的建议：使用第三方库去操作他们，比如 sinfuljs，mathjs 或者 BigDecimal.js
 * - 另一个建议是对数字使用内置的 toPrecision() 和 toFixed() 方法。但一个需要注意的问题是：这两个方法返回 string
 *
 * @参考资料
 * http://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript
 * http://stackoverflow.com/questions/588004/is-floating-point-math-broken
 *
 */

(function() {
    console.log(0.1 + 0.2);             // prints 0.30000000000000004
    console.log((0.1 + 0.2) === 0.3);    // prints false

    // Workaround: 使用一定的位数格式化计算结果，比如：
    // (Math.floor(y/x) * x).toFixed(2) OR parseFloat(a).toFixed(2)
})();
