/**
 * 条件表达式内函数声明
 *
 * @TLDR: 在 js 中不科学（无效），尽量避免使用！
 *
 * @Info:
 * ECMA-262 spec: A Block is defined as one or more Statements, and a FunctionDeclaration is not a Statement.
 * 因此，在 if/else 中进行函数声明是无效的
 *
 * @Note:
 * - 浏览器对其的处理方式各不相同。有些可以支持但也有一些不行（仅仅当做普通的函数表达式）。
 * - 在严格模式下（'strict'）会报错
 *
 * @参考资料:
 * ECMA-262: http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=98
 */

// Case 1
(function() {
    if (false) {
        function test () {
            alert("Works");
        }
    }
    test(); // "Works"... 函数还是被声明了！
    // 在多数浏览器里，会进行变量提升（但在条件表达式中声明的函数依旧被正常声明了）
}());


// Case 2
(function() {
    if (false) {
        var test = function () {
            alert("Works");
        }
    }
    test(); // Error: 'undefined' is not a function
    // 抛出一个错误。因为 test 变量被提升了，但是没有赋值。
    // Warning - Named function expressions are still hoisted in < IE9 (IE bug/inconsistency).
}());
