var koyomi = require('..');

console.log(koyomi.format('2015-1-20'));
console.log(koyomi.format('2015-1-20', 'WAREKI'));
console.log(koyomi.format('2015-11-26', 'BIZ3'));



var data = koyomi.getCalendarData('2015/4-2015/6');


console.log(data);




// [
//   { som: true , eom: false, year: 2015, month: 3, day: 29, week: 0, open: false, close: '定休日'    , holiday: ''          , sow: true , eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  1 },
//   { som: false, eom: false, year: 2015, month: 3, day: 30, week: 1, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  1 },
//   { som: false, eom: false, year: 2015, month: 3, day: 31, week: 2, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  1 },
//     // (中略)
//   { som: false, eom: false, year: 2015, month: 4, day: 28, week: 2, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: false, block: '2015/04', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 4, day: 29, week: 3, open: false, close: '昭和の日'  , holiday: '昭和の日'  , sow: false, eow: false, events: [], ghost: false, block: '2015/04', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 4, day: 30, week: 4, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: false, block: '2015/04', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 5, day:  1, week: 5, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 5, day:  2, week: 6, open: false, close: '定休日'    , holiday: ''          , sow: false, eow: true , events: [], ghost: true , block: '2015/04', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 5, day:  3, week: 0, open: false, close: '定休日'    , holiday: '憲法記念日', sow: true , eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  6 },
//   { som: false, eom: false, year: 2015, month: 5, day:  4, week: 1, open: false, close: 'みどりの日', holiday: 'みどりの日', sow: false, eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  6 },
//   { som: false, eom: false, year: 2015, month: 5, day:  5, week: 2, open: false, close: 'こどもの日', holiday: 'こどもの日', sow: false, eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  6 },
//   { som: false, eom: false, year: 2015, month: 5, day:  6, week: 3, open: false, close: '振替休日'  , holiday: '振替休日'  , sow: false, eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  6 },
//   { som: false, eom: false, year: 2015, month: 5, day:  7, week: 4, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  6 },
//   { som: false, eom: false, year: 2015, month: 5, day:  8, week: 5, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/04', weekNumber:  6 },
//   { som: false, eom: true , year: 2015, month: 5, day:  9, week: 6, open: false, close: '定休日'    , holiday: ''          , sow: false, eow: true , events: [], ghost: true , block: '2015/04', weekNumber:  6 },
//   { som: true , eom: false, year: 2015, month: 4, day: 26, week: 0, open: false, close: '定休日'    , holiday: ''          , sow: true , eow: false, events: [], ghost: true , block: '2015/05', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 4, day: 27, week: 1, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/05', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 4, day: 28, week: 2, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/05', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 4, day: 29, week: 3, open: false, close: '昭和の日'  , holiday: '昭和の日'  , sow: false, eow: false, events: [], ghost: true , block: '2015/05', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 4, day: 30, week: 4, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/05', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 5, day:  1, week: 5, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: false, block: '2015/05', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 5, day:  2, week: 6, open: false, close: '定休日'    , holiday: ''          , sow: false, eow: true , events: [], ghost: false, block: '2015/05', weekNumber:  5 },
//   { som: false, eom: false, year: 2015, month: 5, day:  3, week: 0, open: false, close: '定休日'    , holiday: '憲法記念日', sow: true , eow: false, events: [], ghost: false, block: '2015/05', weekNumber:  6 },
//   { som: false, eom: false, year: 2015, month: 5, day:  4, week: 1, open: false, close: 'みどりの日', holiday: 'みどりの日', sow: false, eow: false, events: [], ghost: false, block: '2015/05', weekNumber:  6 },
//   { som: false, eom: false, year: 2015, month: 5, day:  5, week: 2, open: false, close: 'こどもの日', holiday: 'こどもの日', sow: false, eow: false, events: [], ghost: false, block: '2015/05', weekNumber:  6 },
//   { som: false, eom: false, year: 2015, month: 5, day:  6, week: 3, open: false, close: '振替休日'  , holiday: '振替休日'  , sow: false, eow: false, events: [], ghost: false, block: '2015/05', weekNumber:  6 },
//   { som: false, eom: false, year: 2015, month: 5, day:  7, week: 4, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: false, block: '2015/05', weekNumber:  6 },
//     // (中略)
//   { som: false, eom: false, year: 2015, month: 7, day:  9, week: 4, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/06', weekNumber: 15 },
//   { som: false, eom: false, year: 2015, month: 7, day: 10, week: 5, open: true , close: ''          , holiday: ''          , sow: false, eow: false, events: [], ghost: true , block: '2015/06', weekNumber: 15 },
//   { som: false, eom: true , year: 2015, month: 7, day: 11, week: 6, open: false, close: '定休日'    , holiday: ''          , sow: false, eow: true , events: [], ghost: true , block: '2015/06', weekNumber: 15 }
// ]