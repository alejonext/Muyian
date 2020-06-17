const MS = 'millisecond';
const S = 'second';
const MIN = 'minute';
const H = 'hour';
const D = 'day';
const W = 'week';
const M = 'month';
const Q = 'quarter';
const Y = 'year';
const DATE = 'date';
const DIGIT2 = '2-digit';
const SHORT = '2-digit';
const LONG = 'long';
const NUMERIC = 'numeric';
const hourCycle = '12h';
const PROTOTYPE = str => str[0].toUpperCase() + str.slice(1);
const PARSE = /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/;
const DEFAULT = '%Y-%m-%d T%H:%i:%s%P';
const CHR = /\%./g;

const TIME = {
  [S]: 1e3,
  [MIN]: 1e3 * 60,
  [H]: 1e3 * 60 * 60,
  [D]: 1e3 * 60 * 60 * 24,
  [W]: 1e3 * 60 * 60 * 24 * 7,
  [M]: 1e3 * 60 * 60 * 24 * (365 / 12),
  [Y]: 1e3 * 60 * 60 * 24 * 365,
  [W + 'Start']: 4,
  [D + 'in' + PROTOTYPE(W)]: 7,
  number: {
    numeric: 'auto'
  }
};
const Dates = {
  [Y]: 'fullYear',
  [MS]: 'milliseconds',
  [S]: 'seconds',
  [MIN]: 'minutes',
  [H]: 'hours'
};

class Muyian extends Date {
  /**
   * [firstDayYearISO description]
   * @return {[type]} [description]
   */
  get firstDayYearISO() {
    return new Muyian(this).startOf(Y).date(TIME.dayInWeek - 1).day(TIME.weekStart).day();
  }
  /**
   * [clone description]
   * @return {[type]} [description]
   */
  clone(){
    return new Muyian(this);
  }
  /**
   * [unix description]
   * @return {[type]} [description]
   */
  unix() {
    return this.valueOf() / TIME.second;
  }
  /**
   * [set description]
   * @param {[type]} type [description]
   * @param {[type]} num  [description]
   */
  set(type, num) {
    return new Muyian(Muyian.prototype['set' + PROTOTYPE(Dates[type] || type)].call(this, num));
  }
  /**
   * [get description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  get(type) {
    return Muyian.prototype['get' + PROTOTYPE(Dates[type] || type)].call(this);
  }
  /**
   * [add description]
   * @param {[type]} type [description]
   * @param {[type]} num  [description]
   */
  add(type, num) {
    return this.set(type, this.get(type) + num);
  }
  /**
   * [subtract description]
   * @param  {[type]} type [description]
   * @param  {[type]} num  [description]
   * @return {[type]}      [description]
   */
  subtract(type, num) {
    return this.add(type, num * -1);
  }
  /**
   * [setWeek description]
   * @param {[type]} num [description]
   */
  setWeek(num) {
    return new Muyian( this.startOf(Y).valueOf()
      + TIME.week * (num + (this.firstDayYearISO > TIME.weekStart)));
  }
  /**
   * [getWeek description]
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  getWeek() {
    return Math.round(this.dayOfYear() / TIME.week) + (this.firstDayYearISO > TIME.weekStart);
  }
  /**
   * [getQuarter description]
   * @return {[type]} [description]
   */
  getQuarter() {
    return Math.round(this.daysOfYear() * TIME.day / TIME.year) + 1;
  }
  /**
   * [setQuarter description]
   * @param {[type]} num [description]
   */
  setQuarter(num) {
    return new Muyian(this.valueOf() + TIME.year / num);
  }
  /**
   * [setDay description]
   * @param {[type]} num [description]
   */
  setDay(num) {
    return new Muyian(this.setDate(this.getDate() - this.getDay() + num));
  }
  /**
   * [isoWeekday description]
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  isoWeekday(num) {
    return this.day(num + 1);
  }
  /**
   * [daysOfYear description]
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  daysOfYear(num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
      ? this.startOf(Y).date(num)
      : this.diff(this.startOf(Y), D);
  }
  /**
   * [toDate description]
   * @return {[type]} [description]
   */
  toDate() {
    return new Date(this.valueOf());
  }
  /**
   * [toObject description]
   * @return {[type]} [description]
   */
  toObject() {
    return Muyian.TIME.reduce((res, e) => ({ ...res,
      [e]: this.get(e)
    }), {});
  }
  /**
   * [toArray description]
   * @return {[type]} [description]
   */
  toArray() {
    return Muyian.TIME.map(e => this.get(e));
  }
  /**
   * [isValid description]
   * @return {Boolean} [description]
   */
  isValid() {
    return Muyian.isMuyian(this) && this.toString() !== 'Invalid Date';
  }
  /**
   * [of description]
   * @param  {[type]} type  [description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  of(type, array) {
    return Muyian.TIME
      .reduce((res, e, i) => ( Muyian.TIME.indexOf(type) > i && res.set(e,
        !isNaN(parseFloat(array[i])) && isFinite(array[i])
        ? array[i] : array[i](res))) || res, new Muyian(this.valueOf()));
  }
  /**
   * [startOf description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  startOf(type) {
    return this.of(type, [0, 0, 1, 0, 0, 0, 0]);
  }
  /**
   * [endOf description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  endOf(type) {
    return this.of(type, [NaN, 11, e => e.daysInMonth(), 23, 59, 59, 999]);
  }
  /**
   * [relative description]
   * @param  {[type]} date     [description]
   * @param  {[type]} locale   [description]
   * @param  {Number} multiple [description]
   * @return {[type]}          [description]
   */
  relative(date=new Muyian(), locale, multiple = 1) {
    return Muyian.TIME
      .reduce((res, time, index) => typeof res === 'number'
        && res / TIME[time] < 0
        && Muyian.Intl(locale || this.locale || Muyian.locale, TIME.number)
          .format(Math.round(res / TIME[rever[index - 1]]) * multiple, rever[index - 1])
        || res, this.diff(date));
  }
  /**
   * [daysInMonth description]
   * @return {[type]} [description]
   */
  daysInMonth() {
    return new Muyian(this.getFullYear(), this.getMonth() + 2, 0, 0, 0).date(0).date();
  }
  /**
   * [isLeapYear description]
   * @return {Boolean} [description]
   */
  isLeapYear() {
    return new Muyian(this.getFullYear(), 2, 0, 0, 0).date(0) === 29;
  }
  /**
   * [getTimezone description]
   * @return {[type]} [description]
   */
  getTimezone() {
    return this.getTimezoneOffset() / TIME.minute;
  }
  /**
   * [getTimezoneGTM description]
   * @param  {[type]} sep [description]
   * @return {[type]}     [description]
   */
  getTimezoneGTM(sep) {
    return Math.sign(this.getTimezoneOffset())
      + ''
      + Muyian.Format.h(time, this.locale)
      + (!sep ? ':' : '')
      + Muyian.Format.m(time, this.locale);
  }
  /**
   * [getNameTimezone description]
   * @return {[type]} [description]
   */
  getNameTimezone(locale) {
    var tz = this.toLocaleTimeString(locale || this.locale || Muyian.locale, {
      timeZoneName: 'short'
    }).split(' ');
    return tz[tz.length - 1];
  }
  /**
   * [diff description]
   * @param  {[type]} date     [description]
   * @param  {[type]} type     [description]
   * @param  {[type]} notRound [description]
   * @return {[type]}          [description]
   */
  diff(date, type, notRound) {
    let diff = new Muyian(date).valueOf() - this.valueOf();

    if (TIME[type]) {
      diff = diff / TIME[type];
    }

    if (!notRound) {
      return diff;
    }

    return Math.round(diff);
  }
  /**
   * [format description]
   * @param  {[type]} format [description]
   * @param  {[type]} locale [description]
   * @return {[type]}        [description]
   */
  format(format='', locale=this.locale || Muyian.locale) {
    return format.replace(Muyian.toFormat, match => ( Muyian.Format[match]
      && Muyian.Format[match](this, locale))
    || match);
  }
}

['to','from','toNow','fromNow'].forEach(val => Muyian.prototype[val] = Muyian.prototype[val] || function () {
  var args = [].slice.call(arguments);
  if(/Now/.test(val)){
    args.unshift(null);
  }

  args.push(/to/.test(val) ? -1 : 1);
  return this.relative.call(this, args);
});

[MS,S,MIN,H,D,W,M,Q,Y,DATE].forEach(val => Muyian.prototype[val] = Muyian.prototype[val] || function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num) ? this.set(val, num) : this.get(val);
});

Muyian.Format = {
  A : (time, locale) => Muyian.Format.a(time, locale).toUpperCase(),
  a : (time, locale) => time.toLocaleTimeString(locale, { hour12: true }).split(' ').reverse()[0].toLowerCase(),
  D : (time, locale) => Muyian.Intl(locale, { day: NUMERIC }).format(time),
  d : (time, locale) => Muyian.Intl(locale, { weekday: NUMERIC }).format(time),
  DD : (time, locale) => Muyian.Intl(locale, { day: DIGIT2 }).format(time),
  dd : (time, locale) => Muyian.Intl(locale, { weekday: SHORT }).format(time),
  ddd : (time, locale) => Muyian.Intl(locale, { weekday: LONG }).format(time),
  DDD : (time, locale) => time.daysOfYear(),
  DDDD: (time, locale) => (parseInt(Muyian.Format.DDD(time, locale), 10) + 1000).toString().substr(1),
  gg : (time, locale) => time.getWeek(),
  H : (time, locale) => Muyian.Intl(locale, { hour: NUMERIC }).format(time),
  HH : (time, locale) => Muyian.Intl(locale, { hour: DIGIT2 }).format(time),
  h : (time, locale) => Muyian.Intl(locale, { hour: NUMERIC, hourCycle }).format(time),
  hh : (time, locale) => Muyian.Intl(locale, { hour: DIGIT2, hourCycle }).format(time),
  m : (time, locale) => Muyian.Intl(locale, { minute: NUMERIC }).format(time),
  M : (time, locale) => Muyian.Intl(locale, { month: NUMERIC }).format(time),
  mm : (time, locale) => Muyian.Intl(locale, { minute: DIGIT2 }).format(time),
  MM : (time, locale) => Muyian.Intl(locale, { month: DIGIT2 }).format(time),
  MMM : (time, locale) => Muyian.Intl(locale, { month: SHORT }).format(time),
  MMMM : (time, locale) => Muyian.Intl(locale, { month: LONG }).format(time),
  Q : (time, locale) => time.getQueater(),
  s : (time, locale) => Muyian.Intl(locale, { second: NUMERIC }).format(time),
  ss : (time, locale) => Muyian.Intl(locale, { second: DIGIT2 }).format(time),
  SSS: (time, locale) => (parseInt(time.get(MS), 10) + 1000).toString().substr(1),
  X : (time, locale) => time.unix(),
  YY : (time, locale) => Muyian.Intl(locale, { year: DIGIT2 }).format(time),
  YYYY : (time, locale) => Muyian.Intl(locale, { year: NUMERIC }).format(time),
  Z : (time, locale) => time.getTimezoneGTM(),
  ZZ : (time, locale) => time.getTimezoneGTM(true),
};

Muyian.Intl = (locale, opts) => new Intl.DateTimeFormat(locale, opts);
/**
 * [max description]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
Muyian.max = array => new Muyian(Math.max.apply(null, array));
/**
 * [min description]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
Muyian.min = array => new Muyian(Math.min.apply(null, array));
/**
 * [isDate description]
 * @param  {[type]}  any [description]
 * @return {Boolean}     [description]
 */
Muyian.isDate = any => any instanceof Date;
/**
 * [isMuyian description]
 * @param  {[type]}  any [description]
 * @return {Boolean}     [description]
 */
Muyian.isMuyian = any => Muyian.isDate(any) && any instanceof Muyian;
/**
 * [unix description]
 * @param  {[type]} any [description]
 * @return {[type]}     [description]
 */
Muyian.unix = any => new Muyian(any);
/**
 * RegExp of all the elements
 * @type {RegExp}
 */
Muyian.toFormat = new RegExp( Object.keys(Muyian.Format).join('|'), 'gm' );
/**
 * [description]
 * @return {[type]} [description]
 */
Muyian.TIME = [Y, M, DATE, H, MIN, S, MS];
/**
 * [locale description]
 * @type {[type]}
 */
Muyian.locale = navigator && navigator.language || 'en';

export default Muyian;
