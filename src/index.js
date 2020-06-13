import * as CONTS from './const';
import * as Format from './format';

class Muyian extends Date {
  /**
   * [firstDayYearISO description]
   * @return {[type]} [description]
   */
  get firstDayYearISO(){
    return new Muyian(this)
      .startOf(CONTS.Y)
      .date(CONTS.TIME.dayInWeek - 1)
      .day(CONTS.TIME.weekStart)
      .day();
  }
  /**
   * [unix description]
   * @return {[type]} [description]
   */
  unix () {
    return this.valueOf() / CONTS.TIME.second;
  }
  /**
   * [set description]
   * @param {[type]} type [description]
   * @param {[type]} num  [description]
   */
  set (type, num) {
    return new Muyian(Muyian.prototype['set' + CONTS.PROTOTYPE(CONTS.Date[type] || type)].call(this, num) );
  }
  /**
   * [get description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  get (type) {
    return Muyian.prototype['get' + CONTS.PROTOTYPE(CONTS.Date[type] || type)].call(this);
  }
  /**
   * [add description]
   * @param {[type]} type [description]
   * @param {[type]} num  [description]
   */
  add (type, num) {
    return this.set(type, this.get(type) + num );
  }
  /**
   * [subtract description]
   * @param  {[type]} type [description]
   * @param  {[type]} num  [description]
   * @return {[type]}      [description]
   */
  subtract (type, num) {
    return this.add(type, num * -1);
  }
  /**
   * [setWeek description]
   * @param {[type]} num [description]
   */
  setWeek (num) {
    return new Muyian(this.startOf(CONTS.Y).valueOf() + ( CONTS.TIME.week * ( num + (this.firstDayYearISO > CONTS.TIME.weekStart))));
  }
  /**
   * [getWeek description]
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  getWeek (num) {
    return Math.round(this.dayOfYear() / Muyian.TIME.week ) + (this.firstDayYearISO > CONTS.TIME.weekStart);
  }
  /**
   * [getQuarter description]
   * @return {[type]} [description]
   */
  getQuarter () {
    return Math.round((this.daysOfYear() * CONTS.TIME.day) / CONTS.TIME.year ) + 1
  }
  /**
   * [setQuarter description]
   * @param {[type]} num [description]
   */
  setQuarter (num) {
    return new Muyian(this.valueOf() + (CONTS.TIME.year / num ));
  }
  /**
   * [setDay description]
   * @param {[type]} num [description]
   */
  setDay (num) {
    return new Muyian(this.setDate(( this.getDate() - this.getDay() ) + num ) );
  }
  /**
   * [isoWeekday description]
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  isoWeekday (num) {
    return this.day(num + 1);
  }
  /**
   * [daysOfYear description]
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  daysOfYear (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
      ? this.startOf(CONTS.Y).date(num)
      : this.diff(this.startOf(CONTS.Y), CONTS.D);
  }
  /**
   * [toDate description]
   * @return {[type]} [description]
   */
  toDate () {
    return new Date(this.valueOf());
  }
  /**
   * [toObject description]
   * @return {[type]} [description]
   */
  toObject () {
    return CONTS.DATE_PROTO
      .reduce((res, e) => ({ ...res, [e] : this.get(e) }), {})
  }
  /**
   * [toArray description]
   * @return {[type]} [description]
   */
  toArray () {
    return CONTS.DATE_PROTO
      .map(e => this.get(e));
  }
  /**
   * [isValid description]
   * @return {Boolean} [description]
   */
  isValid () {
    return Muyian.isMuyian(this)
        && this.toString() !== CONTS.INVALID;
  }
  /**
   * [of description]
   * @param  {[type]} type  [description]
   * @param  {[type]} array [description]
   * @return {[type]}       [description]
   */
  of (type, array) {
    return Muyian.TIME
      .slice(Muyian.TIME.indexOf(type) + 1 )
      .reduce((res, e, i) => res.set(e,
          !isNaN(parseFloat(array[i])) && isFinite(array[i])
          ? array[i]
          : array[i](res)) ), new Muyian(this.valueOf())
  }
  /**
   * [startOf description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  startOf (type) {
    return this.of(type, [ 0, 0, 1, 0, 0, 0, 0 ].reverse());
  }
  /**
   * [endOf description]
   * @param  {[type]} type [description]
   * @return {[type]}      [description]
   */
  endOf (type) {
    return this.of(type, [ NaN, 11, ((e) => e.daysInMonth()) , 23, 59, 59, 999 ].reverse());
  }
  /**
   * [relative description]
   * @param  {[type]} date     [description]
   * @param  {[type]} locale   [description]
   * @param  {Number} multiple [description]
   * @return {[type]}          [description]
   */
  relative(date, locale, multiple= 1){
    return Muyian.TIME
      .reduce((res, time, index) => ( typeof res === 'number'
          && ( res / CONTS.TIME[time] ) < 0
          && local.format(Math.round(res / CONTS.TIME[rever[index - 1]]) * multiple , rever[index - 1])
        ) || res, this.diff(date));
  }
  /**
   * [to description]
   * @param  {[type]} date   [description]
   * @param  {[type]} locale [description]
   * @return {[type]}        [description]
   */
  to (date, locale) {
    return this.relative(date, new Intl.RelativeTimeFormat(locale || this.locale || Muyian.locale, CONTS.TIME.number),  -1);
  }
  /**
   * [form description]
   * @param  {[type]} date   [description]
   * @param  {[type]} locale [description]
   * @return {[type]}        [description]
   */
  form (date, locale) {
    return this.relative(date, new Intl.RelativeTimeFormat(locale || this.locale || Muyian.locale, CONTS.TIME.number));
  }
  /**
   * [toNow description]
   * @param  {[type]} locale [description]
   * @return {[type]}        [description]
   */
  toNow (locale) {
    return this.to(new Muyian(), locale);
  }
  /**
   * [daysInMonth description]
   * @return {[type]} [description]
   */
  daysInMonth () {
    return new Muyian(this.getFullYear(), this.getMonth() + 2, 0, 0, 0 ).date(0).date();
  }
  /**
   * [isLeapYear description]
   * @return {Boolean} [description]
   */
  isLeapYear () {
    return new Muyian(this.getFullYear(), 2, 0, 0, 0).date(0) === 29;
  }
  /**
   * [getTimezone description]
   * @return {[type]} [description]
   */
  getTimezone () {
    return this.getTimezoneOffset() / CONTS.TIME.minute;
  }
  /**
   * [getTimezoneGTM description]
   * @param  {[type]} sep [description]
   * @return {[type]}     [description]
   */
  getTimezoneGTM (sep) {
    const P = this.getTimezoneOffset();
    return Math.sign(P) + ''
      + (parseInt(P / CONTS.TIME.minute, 10) + 100).toString().substr(1)
      + ( !sep ? ':' : '' )
      + (parseInt(P % CONTS.TIME.second, 10) + 100).toString().substr(1);
  }
  /**
   * [getNameTimezone description]
   * @return {[type]} [description]
   */
  getNameTimezone (locale) {
    var tz = this.toLocaleTimeString(locale || this.locale || Muyian.locale, { timeZoneName: 'short' }).split(' ')
    return tz[tz.length - 1];
  }
  /**
   * [diff description]
   * @param  {[type]} date     [description]
   * @param  {[type]} type     [description]
   * @param  {[type]} notRound [description]
   * @return {[type]}          [description]
   */
  diff (date, type, notRound) {
    let diff = new Muyian(date).valueOf() - this.valueOf();

    if(CONTS.TIME[type]){
      diff = diff / CONTS.TIME[type];
    }

    if(!notRound){
      return diff;
    }

    return Math.round( diff );
  }
  /**
   * [format description]
   * @param  {[type]} format [description]
   * @param  {[type]} locale [description]
   * @return {[type]}        [description]
   */
  format (format, locale) {
    return format.replace(CONTS.CHR,
        chr => ( Format[chr[1]] && Format[chr[1]](this, locale || this.locale || Muyian.locale ) ) || chr );
  }
}

Object.keys(CONTS.TIME)
  .forEach((val) => Muyian.prototype[val] = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num)
      ? this.set(val, num)
      : this.get(val);
});
/**
 * [max description]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
Muyian.max = (array) => new Muyian(Math.max.apply(null, array));
/**
 * [min description]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
Muyian.min = (array) => new Muyian(Math.min.apply(null, array));
/**
 * [isDate description]
 * @param  {[type]}  any [description]
 * @return {Boolean}     [description]
 */
Muyian.isDate = (any) => any instanceof Date;
/**
 * [isMuyian description]
 * @param  {[type]}  any [description]
 * @return {Boolean}     [description]
 */
Muyian.isMuyian = (any) => Muyian.isDate(any) && any instanceof Muyian;
/**
 * [unix description]
 * @param  {[type]} any [description]
 * @return {[type]}     [description]
 */
Muyian.unix = (any) => new Muyian(any);
/**
 * [description]
 * @return {[type]} [description]
 */
Muyian.TIME = Array.form(CONTS.DATE_PROTO).reverse();
/**
 * [locale description]
 * @type {[type]}
 */
Muyian.locale = ( navigator && navigator.language ) || 'en';

export default Muyian;
