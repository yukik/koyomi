/**
 * *********************************************************
 *                       既定値設定
 * *********************************************************
 */
/**
 * 既定フォーマット
 * @property {String}
 */
var FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * 定休日
 *   複数設定する場合はカンマ区切り
 * @property {String|Function}
 */
var REGULAR_HOLIDAY = '土,日';

/**
 * 年末年始・お盆等の休業日
 *   複数設定する場合はカンマ区切り
 * @property {String|Function}
 */
var SEASON_HOLIDAY = '12/29-1/3';

/**
 * 祝日営業
 * @property {Boolean}
 */
var HOLIDAY_OPENED = false;

/**
 * 年の始まり  (年度時:4)
 * @property {Number}
 */
var START_MONTH = 1;

/**
 * 週の始まり
 * @property {Number}
 */
var START_WEEK = '月';

/**
 * 6週分取得（カレンダー）
 * @property {Boolean}
 */
var SIX = true;

/**
 * 口語表現のマージン
 *   (kindメソッドとパラメータKで使用する)
 *   余り時間を按分させる割合
 *   0.1(10%)であれば54秒前は1分前と、53秒前はたった今と表示する
 * @property {Number}
 */
var KIND_MARGIN = 0.1;

/**
 * 年号
 *  N: 年号の正式表記
 *  n: 年号の略式表記
 *  y: その年号の最初の年 (元年)
 *  d: その年号の最初の日
 */
var NENGO = [
  {N: '平成', n: 'H', y: 1989, d: new Date('1989-01-08 00:00:00.000')},
  {N: '昭和', n: 'S', y: 1926, d: new Date('1926-12-25 00:00:00.000')},
  {N: '大正', n: 'T', y: 1912, d: new Date('1912-07-30 00:00:00.000')},
  {N: '明治', n: 'M', y: 1868, d: new Date('1868-01-25 00:00:00.000')},
  {N: '西暦', n: '' , y:    1, d: new Date('0001-01-01 00:00:00.000')}
];

/**
 * 祝日法施行以降(1948/7/20-)の祝日を定義する
 */
var HOLIDAYS = [

  // 祝日
  '元日         1949-/1/1',
  '成人の日     1949-1999/1/15  2000-/1/2mon',
  '建国記念の日 1967-/2/11',
  '春分の日',
  '天皇誕生日   1949-1988/4/29',
  'みどりの日   1989-2006/4/29',
  '昭和の日     2007-/4/29',
  '憲法記念日   1949-/5/3',
  'みどりの日   2007-/5/4',
  'こどもの日   1949-/5/5',
  '海の日       1996-2002/7/20  2003-/7/3mon',
  '山の日       2016-/8/11',
  '敬老の日     1966-2002/9/15  2003-/9/3mon',
  '秋分の日',
  '体育の日     1966-1999/10/10 2000-/10/2mon',
  '文化の日     1948-/11/3',
  '勤労感謝の日 1948-/11/23',
  '天皇誕生日   1989-/12/23',

  // 特別な休日
  '振替休日',
  '国民の休日',

  // 皇室慶弔行事
  '皇太子・明仁親王の結婚の儀  1959/4/10',
  '昭和天皇の大喪の礼          1989/2/24',
  '即位の礼正殿の儀            1990/11/12',
  '皇太子・徳仁親王の結婚の儀  1993/6/9'

];

module.exports = {
  FORMAT         : FORMAT,
  REGULAR_HOLIDAY: REGULAR_HOLIDAY,
  SEASON_HOLIDAY : SEASON_HOLIDAY,
  HOLIDAY_OPENED : HOLIDAY_OPENED,
  START_MONTH    : START_MONTH,
  START_WEEK     : START_WEEK,
  SIX            : SIX,
  KIND_MARGIN    : KIND_MARGIN,
  NENGO          : NENGO,
  HOLIDAYS       : HOLIDAYS
};