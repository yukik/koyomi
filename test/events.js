//イベント
var Koyomi = require('..');
var koyomi = new Koyomi();
var get = koyomi.getEvents.bind(koyomi);
var add = koyomi.addEvent.bind(koyomi);
var remove = koyomi.removeEvent.bind(koyomi);
var eq = require('assert').deepEqual;


eq(get('2015-1-1'), []);

eq(add('2015-1-1', 'イベント0'), 0);
eq(get('2015-1-1'), ['イベント0']);

eq(add('2015-1-1', 'イベント1'), 1);
eq(get('2015-1-1'), ['イベント0', 'イベント1']);

eq(remove('2015-1-1', 0), true);
eq(get('2015-1-1'), ['イベント1']);

eq(remove('2015-1-1', 5), false);
eq(get('2015-1-1'), ['イベント1']);

var day = koyomi.getCalendarData('2015/1', null)[0];
eq(day.events, ['イベント1']);
