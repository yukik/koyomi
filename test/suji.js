// 数字変換
var Koyomi = require('..');
var suji = Koyomi.suji.bind(Koyomi);
var test = require('assert').equal;

test(suji(   0, '漢数字'), '〇');
test(suji(   3, '漢数字'), '三');
test(suji(  10, '漢数字'), '十');
test(suji(  15, '漢数字'), '十五');
test(suji(  20, '漢数字'), '二十');
test(suji(  24, '漢数字'), '二十四');
test(suji(  63, '漢数字'), '六十三');
test(suji(1998, '漢数字'), '千九百九十八');
test(suji(2000, '漢数字'), '二千');
test(suji(2015, '漢数字'), '二千十五');

test(suji(   0, '漢字'), '〇');
test(suji(   3, '漢字'), '三');
test(suji(  10, '漢字'), '一〇');
test(suji(  15, '漢字'), '一五');
test(suji(  20, '漢字'), '二〇');
test(suji(  24, '漢字'), '二四');
test(suji(  63, '漢字'), '六三');
test(suji(1998, '漢字'), '一九九八');
test(suji(2000, '漢字'), '二〇〇〇');
test(suji(2015, '漢字'), '二〇一五');

test(suji(   0, '全角'), '０');
test(suji(   3, '全角'), '３');
test(suji(  10, '全角'), '１０');
test(suji(  15, '全角'), '１５');
test(suji(  20, '全角'), '２０');
test(suji(  24, '全角'), '２４');
test(suji(  63, '全角'), '６３');
test(suji(1998, '全角'), '１９９８');
test(suji(2000, '全角'), '２０００');
test(suji(2015, '全角'), '２０１５');


test(suji('〇'),           0);
test(suji('三'),           3);
test(suji('十'),           10);
test(suji('十五'),         15);
test(suji('二十'),         20);
test(suji('二十四'),       24);
test(suji('六十三'),       63);
test(suji('千九百九十八'), 1998);
test(suji('二千'),         2000);
test(suji('二千十五'),     2015);
test(suji('〇'),           0);
test(suji('三'),           3);
test(suji('一〇'),         10);
test(suji('一五'),         15);
test(suji('二〇'),         20);
test(suji('二四'),         24);
test(suji('六三'),         63);
test(suji('一九九八'),     1998);
test(suji('二〇〇〇'),     2000);
test(suji('二〇一五'),     2015);
test(suji('０'),           0);
test(suji('３'),           3);
test(suji('１０'),         10);
test(suji('１５'),         15);
test(suji('２０'),         20);
test(suji('２４'),         24);
test(suji('６３'),         63);
test(suji('１９９８'),     1998);
test(suji('２０００'),     2000);
test(suji('２０１５'),     2015);


test(suji(   0, '序数'),   '0th');
test(suji(   1, '序数'),   '1st');
test(suji(   2, '序数'),   '2nd');
test(suji(   3, '序数'),   '3rd');
test(suji(   4, '序数'),   '4th');
test(suji(   5, '序数'),   '5th');
test(suji(   6, '序数'),   '6th');
test(suji(   7, '序数'),   '7th');
test(suji(   8, '序数'),   '8th');
test(suji(   9, '序数'),   '9th');
test(suji(  10, '序数'),  '10th');
test(suji(  11, '序数'),  '11th');
test(suji(  12, '序数'),  '12th');
test(suji(  13, '序数'),  '13th');
test(suji(  14, '序数'),  '14th');
test(suji(  15, '序数'),  '15th');
test(suji(  16, '序数'),  '16th');
test(suji(  17, '序数'),  '17th');
test(suji(  18, '序数'),  '18th');
test(suji(  19, '序数'),  '19th');
test(suji(  20, '序数'),  '20th');
test(suji(  21, '序数'),  '21st');
test(suji(  22, '序数'),  '22nd');
test(suji(  23, '序数'),  '23rd');
test(suji(  24, '序数'),  '24th');
test(suji(  99, '序数'),  '99th');
test(suji( 100, '序数'), '100th');
test(suji( 101, '序数'), '101st');
test(suji( 102, '序数'), '102nd');
test(suji( 103, '序数'), '103rd');
test(suji( 104, '序数'), '104th');
test(suji( 105, '序数'), '105th');
test(suji( 106, '序数'), '106th');
test(suji( 107, '序数'), '107th');
test(suji( 108, '序数'), '108th');
test(suji( 109, '序数'), '109th');
test(suji( 110, '序数'), '110th');
test(suji( 111, '序数'), '111th');
test(suji( 112, '序数'), '112th');
test(suji( 113, '序数'), '113th');
test(suji( 114, '序数'), '114th');
test(suji( 115, '序数'), '115th');
test(suji( 116, '序数'), '116th');
test(suji( 117, '序数'), '117th');
test(suji( 118, '序数'), '118th');
test(suji( 119, '序数'), '119th');
test(suji( 200, '序数'), '200th');
test(suji( 201, '序数'), '201st');
test(suji( 202, '序数'), '202nd');
test(suji( 203, '序数'), '203rd');
test(suji( 204, '序数'), '204th');
test(suji( 205, '序数'), '205th');
test(suji( 206, '序数'), '206th');
test(suji( 207, '序数'), '207th');
test(suji( 208, '序数'), '208th');
test(suji( 209, '序数'), '209th');
test(suji( 210, '序数'), '210th');
test(suji( 211, '序数'), '211th');
test(suji( 212, '序数'), '212th');
test(suji( 213, '序数'), '213th');
test(suji( 214, '序数'), '214th');
test(suji( 215, '序数'), '215th');
test(suji( 216, '序数'), '216th');
test(suji( 217, '序数'), '217th');
test(suji( 218, '序数'), '218th');
test(suji( 219, '序数'), '219th');
test(suji( 220, '序数'), '220th');
test(suji( 221, '序数'), '221st');
test(suji( 222, '序数'), '222nd');
test(suji( 223, '序数'), '223rd');
test(suji( 224, '序数'), '224th');













