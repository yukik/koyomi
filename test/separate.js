// 期間をブロックごとに分割(年度、月、日)
var Koyomi = require('..');
var koyomi = new Koyomi();
var sp = koyomi.separate.bind(koyomi);
var eq = require('assert').deepEqual;
var d = require('../lib/fx/toDate');


koyomi.startMonth = 4;

eq(sp('2015-1-1','2015-1-31') , {fromMonths: {date: d('2015-1-1'), times: 1}});
eq(sp('2015-1-1','2015-1-1')  , {passDays  : d('2015-1-1')});
eq(sp('2015-1-10','2015-1-20'), {days      : {from: d('2015-1-10'), to: d('2015-1-20')}});
eq(sp('2015-1-15','2015-1-31'), {remainDays: d('2015-1-15')});


eq(sp('2015-4-1','2016-3-31'), {
  nendo: {date: d('2015-4-1'), times:1}
});

eq(sp('2015-3-31','2016-3-31'), {
  remainDays: d('2015-3-31'),
  nendo: {date: d('2015-4-1'), times:1}
});

eq(sp('2015-3-31','2016-4-1'), {
  remainDays: d('2015-3-31'),
  nendo     : {date: d('2015-4-1'), times:1},
  passDays  : d('2016-4-1')
});

eq(sp('2014-11-20','2016-9-12'), {
  remainDays: d('2014-11-20'),
  fromMonths: {date: d('2014-12-01'), times: 4},
  nendo     : {date: d('2015-04-01'), times: 1},
  toMonths  : {date: d('2016-04-01'), times: 5},
  passDays  : d('2016-09-12'),
});

































function log(terms) {
  console.log('days      : ', terms.days       ? koyomi.format(terms.days.from) + '  <=>  ' + koyomi.format(terms.days.to) : '-');
  console.log('remainDays: ', terms.remainDays ? koyomi.format(terms.remainDays)                                           : '-');
  console.log('fromMonths: ', terms.fromMonths ? koyomi.format(terms.fromMonths.date) + ' * ' +  terms.fromMonths.times    : '-');
  console.log('nendo     : ', terms.nendo      ? koyomi.format(terms.nendo.date)      + ' * ' +  terms.nendo.times         : '-');
  console.log('toMonths  : ', terms.toMonths   ? koyomi.format(terms.toMonths.date)   + ' * ' +  terms.toMonths.times      : '-');
  console.log('passDays  : ', terms.passDays   ? koyomi.format(terms.passDays)                                             : '-');
  console.log('\n');
}



