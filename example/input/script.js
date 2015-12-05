/*global koyomi,$*/

function showInputCalendar (el, date) {
  var cal = $('#koyomiCalendar');
  if (cal) {
    cal.remove();
  }

  var input = $(el);
  var v = input.val();
  date = date || koyomi.toDate(v) || new Date();

  var html = '<table id="koyomiCalendar">\n';
  var caption = '<a class="prev" href="#">&#x226A;</a>' +
                koyomi.format(date, 'Y年M月') +
                '<a class="next" href="#">&#x226B;</a>';

  html += '<caption>' + caption + '</caption>';
  html += '<tr>' +
          '<th class="sun">日</th>' +
          '<th class="weekday">月</th>' +
          '<th class="weekday">火</th>' +
          '<th class="weekday">水</th>' +
          '<th class="weekday">木</th>' +
          '<th class="weekday">金</th>' +
          '<th class="sat">土</th>' +
          '</tr>';


  var days = koyomi.getCalendarData(date);

  days.forEach(function(day){

    if (day.sow) {
      html += '<tr>';
    }

    var cname = day.ghost      ? 'ghost'       :
                day.holiday    ? 'day holiday' :
                day.week === 0 ? 'day sun'     :
                day.week === 6 ? 'day sat'     :
                'day weekday';

    var title = day.close;

    if (title) {
      html += '<td class="' + cname + '" title="' + title + '">' + day.day + '</td>';
    } else {
      html += '<td class="' + cname + '">' + day.day + '</td>';
    }

    if (day.eow) {
      html += '</tr>\n';
    }
  });

  html += '<tr><th colspan="7" class="close">閉じる</th></tr>\n';
  html += '</table>';

  input.after(html);
  cal = $(input.next()[0]);
  cal.click(function (e) {
    var target = $(e.target);

    // 日付入力
    if (target.hasClass('day')) {
      input.val(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + target.text());
      cal.remove();

    // 前月
    } else if (target.hasClass('prev')) {
      cal.remove();
      showInputCalendar(el, koyomi.add(date, '-1m'));

    // 来月
    } else if (target.hasClass('next')) {
      cal.remove();
      showInputCalendar(el, koyomi.add(date, '1m'));

    // 閉じる
    } else if (target.hasClass('close')) {
      cal.remove();
    }
  });
}
