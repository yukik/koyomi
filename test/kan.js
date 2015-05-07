
// 漢数字
var Koyomi = require(global.minify ? '../lib/minify' : '..');
var kan = Koyomi.kan.bind(Koyomi);
var test = require('assert').equal;


test(kan(0), '〇');
test(kan('0'), '');

test(kan(   0, true), '〇');
test(kan(   0, true), '〇');
test(kan(   3      ), '三');
test(kan(   3, true), '三');
test(kan(  10      ), '十');
test(kan(  10, true), '一〇');
test(kan(  15      ), '十五');
test(kan(  15, true), '一五');
test(kan(  20      ), '二十');
test(kan(  20, true), '二〇');
test(kan(  24      ), '二十四');
test(kan(  24, true), '二四');
test(kan(  63      ), '六十三');
test(kan(  63, true), '六三');
test(kan(1998      ), '千九百九十八');
test(kan(1998, true), '一九九八');
test(kan(2000      ), '二千');
test(kan(2000, true), '二〇〇〇');
test(kan(2015      ), '二千十五');
test(kan(2015, true), '二〇一五');
