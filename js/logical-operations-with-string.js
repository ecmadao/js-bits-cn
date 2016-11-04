/**
 * 带有 string 的逻辑操作
 */

(function () {
  var a = true;
  var b = 'Yes';
  var c = 'It\'s me';

  console.log(a && b);  // 输出 'Yes'
  console.log(a && b && c); // 输出 'It's me'
  console.log(a && b || c); // 输出 'Yes'
})();
