/*jshint maxlen:500 */

// カレンダーデータの取得
var koyomi = require('../..').create();

koyomi.startWeek = '日';
koyomi.startMonth = 1;

var eq = require('assert').deepEqual;
var data = koyomi.getCalendarData('2015/1');

var result = [
  { som: true , eom: false, sow: true , eow: false, ghost: true , block: '2015/01', year: 2014, month: 12, day: 28, week: 0, open: false, close: '定休日'          , holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2014, month: 12, day: 29, week: 1, open: false, close: '年末年始のお休み', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2014, month: 12, day: 30, week: 2, open: false, close: '年末年始のお休み', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2014, month: 12, day: 31, week: 3, open: false, close: '年末年始のお休み', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 1 , week: 4, open: false, close: '年末年始のお休み', holiday: '元日'    , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 2 , week: 5, open: false, close: '年末年始のお休み', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: false, eow: true , ghost: false, block: '2015/01', year: 2015, month: 1 , day: 3 , week: 6, open: false, close: '年末年始のお休み', holiday: ''        , weekNumber: 1, events: []},
  { som: false, eom: false, sow: true , eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 4 , week: 0, open: false, close: '定休日'          , holiday: ''        , weekNumber: 2, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 5 , week: 1, open: true , close: ''                , holiday: ''        , weekNumber: 2, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 6 , week: 2, open: true , close: ''                , holiday: ''        , weekNumber: 2, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 7 , week: 3, open: true , close: ''                , holiday: ''        , weekNumber: 2, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 8 , week: 4, open: true , close: ''                , holiday: ''        , weekNumber: 2, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 9 , week: 5, open: true , close: ''                , holiday: ''        , weekNumber: 2, events: []},
  { som: false, eom: false, sow: false, eow: true , ghost: false, block: '2015/01', year: 2015, month: 1 , day: 10, week: 6, open: false, close: '定休日'          , holiday: ''        , weekNumber: 2, events: []},
  { som: false, eom: false, sow: true , eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 11, week: 0, open: false, close: '定休日'          , holiday: ''        , weekNumber: 3, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 12, week: 1, open: false, close: '成人の日'        , holiday: '成人の日', weekNumber: 3, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 13, week: 2, open: true , close: ''                , holiday: ''        , weekNumber: 3, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 14, week: 3, open: true , close: ''                , holiday: ''        , weekNumber: 3, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 15, week: 4, open: true , close: ''                , holiday: ''        , weekNumber: 3, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 16, week: 5, open: true , close: ''                , holiday: ''        , weekNumber: 3, events: []},
  { som: false, eom: false, sow: false, eow: true , ghost: false, block: '2015/01', year: 2015, month: 1 , day: 17, week: 6, open: false, close: '定休日'          , holiday: ''        , weekNumber: 3, events: []},
  { som: false, eom: false, sow: true , eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 18, week: 0, open: false, close: '定休日'          , holiday: ''        , weekNumber: 4, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 19, week: 1, open: true , close: ''                , holiday: ''        , weekNumber: 4, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 20, week: 2, open: true , close: ''                , holiday: ''        , weekNumber: 4, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 21, week: 3, open: true , close: ''                , holiday: ''        , weekNumber: 4, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 22, week: 4, open: true , close: ''                , holiday: ''        , weekNumber: 4, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 23, week: 5, open: true , close: ''                , holiday: ''        , weekNumber: 4, events: []},
  { som: false, eom: false, sow: false, eow: true , ghost: false, block: '2015/01', year: 2015, month: 1 , day: 24, week: 6, open: false, close: '定休日'          , holiday: ''        , weekNumber: 4, events: []},
  { som: false, eom: false, sow: true , eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 25, week: 0, open: false, close: '定休日'          , holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 26, week: 1, open: true , close: ''                , holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 27, week: 2, open: true , close: ''                , holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 28, week: 3, open: true , close: ''                , holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 29, week: 4, open: true , close: ''                , holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: false, block: '2015/01', year: 2015, month: 1 , day: 30, week: 5, open: true , close: ''                , holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: false, eow: true , ghost: false, block: '2015/01', year: 2015, month: 1 , day: 31, week: 6, open: false, close: '定休日'          , holiday: ''        , weekNumber: 5, events: []},
  { som: false, eom: false, sow: true , eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 1 , week: 0, open: false, close: '定休日'          , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 2 , week: 1, open: true , close: ''                , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 3 , week: 2, open: true , close: ''                , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 4 , week: 3, open: true , close: ''                , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 5 , week: 4, open: true , close: ''                , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: false, sow: false, eow: false, ghost: true , block: '2015/01', year: 2015, month: 2 , day: 6 , week: 5, open: true , close: ''                , holiday: ''        , weekNumber: 6, events: []},
  { som: false, eom: true , sow: false, eow: true , ghost: true , block: '2015/01', year: 2015, month: 2 , day: 7 , week: 6, open: false, close: '定休日'          , holiday: ''        , weekNumber: 6, events: []}
];

// data.forEach((x,i)=>{console.log(i);eq(x, result[i]);});

eq(data, result);

