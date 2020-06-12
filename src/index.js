class Muyian extends Date {

  to (date, locale) {
    return this.diff(date, true);
  }

  form (date, locale) {
    return this.diff(date, true);
  }

  isValid () {
    return Muyian.isMuyian(this) && this.toString() !== "Invalid Date";
  }

  toObject () {
    return Muyian.of.slice(0)
      .reduce((res, e) => res = { ...res, [e] : this.get(e) }, {})
  }

  toArray () {
    return Muyian.of.slice(0)
      .map(e => this.get(e) );
  }

  toDate () {
    return new Date(this.valueOf());
  }

  unix () {
    return this / Muyian.TIME.second;
  }

  set (type, num) {
    const str = 'year' == type ? 'fullYear' : type;
    return new Muyian((Muyian.prototype['set' + str[0].toUpperCase() + str.slice(1) ]
      || Muyian.prototype['set' + str[0].toUpperCase() + str.slice(1) + 's' ])
      .call(this, num));
  }

  get (type) {
    const str = 'year' == type ? 'fullYear' : type;
    return (Muyian.prototype['get' + str[0].toUpperCase() + str.slice(1) ]
      || Muyian.prototype['get' + str[0].toUpperCase() + str.slice(1) + 's' ]).call(this);
  }

  add (type, num) {
    return this.set(type, this.get(type) + num );
  }

  subtract (type, num) {
    return this.add(type, num * -1);
  }

  date (num) {
    return  !isNaN(parseFloat(num)) && isFinite(num)
      ? new Muyian( this.setDate(num) )
      : this.getDate();
  }

  isoWeekday (num) {
    return this.day(num + 1);
  }

  isoYear (num) {
    return this.startOf('year').day(Muyian.TIME.weekStart).get('year');
  }

  week (num) {
    const frist = this.startOf('year').date(Muyian.TIME.week - 1).day(Muyian.TIME.weekStart);
    return !isNaN(parseFloat(num)) && isFinite(num)
      ? this.startOf('year')
        .date(Muyian.TIME.week * (num - ( frist > Muyian.TIME.weekStart ? 1 : 0 )))
      : Math.round(this.dayOfYear() / Muyian.TIME.week ) + ( frist > Muyian.TIME.weekStart ? 1 : 0 );
  }

  setWeek (num) {
    return this.week(num);
  }

  getWeek (num) {
    return this.week();
  }

  day (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
      ? new Muyian( this.setDate( ( this.getDate() - this.getDay() ) + num ) )
      : this.getDay();
  }

  setDay (num) {
    return this.day(num);
  }

  dayOfYear (num) {
    return !isNaN(parseFloat(num)) && isFinite(num)
      ? this.startOf('year').date(num)
      : this.diff(this.startOf('year'), 'day');
  }

  quarter (num) {
    const daysInYear = this.startOf('year').diff(this.endOf('year'), 'day');
    return !isNaN(parseFloat(num)) && isFinite(num)
      ? this.dayOfYear(Math.round(daysInYear - (daysInYear / num) ))
      : Math.round(this.dayOfYear() / ( daysInYear / 4 ), 'day');
  }

  getQuarter () {
    return this.quarter();
  }

  setQuarter (num) {
    return this.quarter(num);
  }

  daysInMonth () {
    return new Muyian(this.getFullYear(), this.getMonth(), 0, 0, 0 ).date(0).getDate();
  }

  isLeapYear () {
    return new Muyian(this.getFullYear(), 2, 0, 0, 0).date(0) === 29;
  }

  of (type, array) {
    return Muyian.of.slice(0)
      .slice(Muyian.of.slice(0).indexOf(type) + 1 ).reverse()
      .reduce((res, e, i) => res.set(e,
        !isNaN(parseFloat(array[i])) && isFinite(array[i])
        ? array[i]
        : array[i](res)), new Muyian(this.valueOf()))
  }

  startOf (type) {
    return this.of(type, [ 0, 0, 1, 0, 0, 0, 0 ].reverse());
  }

  endOf (type) {
    return this.of(type, [ 3000, 11, ((e) => e.daysInMonth()) , 23, 59, 59, 999 ].reverse());
  }

  getTimezone () {
    return this.getTimezoneOffset() / Muyian.TIME.minute;
  }

  getTimezoneGTM (sep) {
    const P = this.getTimezoneOffset();
    return Math.sign(P) + ''
      + (parseInt(P / Muyian.TIME.minute, 10) + 100).toString().substr(1)
      + ( !sep ? ':' : '' )
      + (parseInt(P % Muyian.TIME.minute, 10) + 100).toString().substr(1);
  }

  getNameTimezone () {
    var tz = this.toLocaleTimeString(navigator.language, {timeZoneName: 'short'}).split(' ')
    return tz[tz.length - 1];
  }

  diff (date, typeMax, notRound) {
    let ty = '';
    let diff = Muyian.of.slice(0)
        .slice(Muyian.of.slice(0).indexOf(type) + 1).reverse()
        .reduce(((res, e, i, arr) => ( ty = e, ( typeMax === true
          && Math.round( diff / Muyian.TIME[arr[i - 1]] ) <= 0 && res )
          || res / Muyian.TIME[e] ) ), new Muyian(date.valueOf()) - this );

    diff = ( !notRound ? Math.round(diff) : diff ) * Math.sign(diff);

    return typeMax === true
      ?  diff + ' %' + ty
      : diff;
  }

  format (format, locale) {
    return format.replace(Muyian.format,
        chr => ( Muyian.chr[chr[1]] && Muyian.chr[chr[1]](this, Muyian.LOCALE[locale] || locale || Muyian.LOCALE.default ) ) || chr );
  }
}

Muyian.max = function (array) {
  return new Muyian(Math.max.apply(null, array));
};

Muyian.min = function (array) {
  return new Muyian(Math.min.apply(null, array));
};

Muyian.isDate = function (any) {
  return any instanceof Date;
};

Muyian.isMuyian = function (any) {
  return Muyian.isDate(any)
    && any instanceof Muyian;
};

Muyian.unix = function (any) {
  return new Muyian(any);
};

Muyian.duration = function (num, type) {
  return Muyian.of
    .slice(0).reverse()
    .slice(Muyian.of.slice(0).reverse().indexOf(type) )
    .reduce(((res, e) => ((res || 1) * 1) * Muyian.TIME[e]), num )
};

Muyian.locate = function (data, isDefault) {
  if(typeof data === 'string') {
    Muyian.LOCALE.push(data);
    if(!Muyian.LOCALE.default || isDefault){
      Muyian.LOCALE.default = data;
    }
  }
};

Muyian.format = /\%./g;
Muyian.of = [ 'date', 'hour', 'minute', 'second', 'millisecond' ];
Muyian.chr = {
  a : (time, locale) => time.toLocaleTimeString(locale, { hour12 : true }).split(' ').reverse()[0].toLowerCase(),
  A : (time, locale) => Muyian.chr.a(time, locale).toUpperCase(),
  c : (time, locale) => time.format('%Y-%m-%d T%H:%i:%s%P'),
  d : (time, locale) => time.toLocaleString(locale, { day : "2-digit" }),
  D : (time, locale) => time.toLocaleString(locale, { weekday : "short" }),
  e : (time, locale) => Intl.DateTimeFormat().resolvedOptions().timeZone,
  F : (time, locale) => time.toLocaleString(locale, { month : "long" }),
  G : (time, locale) => time.toLocaleString(locale, { hour : "numeric" }),
  g : (time, locale) => time.toLocaleString(locale, { hour : "numeric", hourCycle : "h12" }),
  H : (time, locale) => time.toLocaleString(locale, { hour : "2-digit" }),
  h : (time, locale) => time.toLocaleString(locale, { hour : "numeric" }),
  i : (time, locale) => time.toLocaleString(locale, { minute : "2-digit" }),
  j : (time, locale) => time.getDate(),
  L : (time, locale) => time.isLeapYear(),
  l : (time, locale) => time.toLocaleString(locale, { weekday : "long" }),
  m : (time, locale) => time.toLocaleString(locale, { month : "2-digit" }),
  M : (time, locale) => time.toLocaleString(locale, { month : "short" }),
  N : (time, locale) => time.toLocaleString(locale, { day : "numeric" }),
  n : (time, locale) => time.toLocaleString(locale, { month : "numeric" }),
  O : (time, locale) => time.getTimezoneGTM(true),
  o : (time, locale) => time.isoYear(),
  P : (time, locale) => time.getTimezoneGTM(),
  Q : (time, locale) => time.getQueater(),
  r : (time, locale) => time.toString(),
  s : (time, locale) => time.toLocaleString(locale, { second : "2-digit" }))
  t : (time, locale) => time.daysInMonth(),
  T : (time, locale) => time.getNameTimezone(),
  U : (time, locale) => time.unix(),
  v : (time, locale) => (parseInt(time.get('millisecond'), 10) + 1000).toString().substr(1),
  w : (time, locale) => time.getDay(),
  W : (time, locale) => time.getWeek(),
  y : (time, locale) => time.toLocaleString(locale, { year : "2-digit" }),
  Y : (time, locale) => time.toLocaleString(locale, { year : "numeric" }),
  z : (time, locale) => time.dayOfYear(),
  Z : (time, locale) => time.getTimezone(),
  S : (time, locale) => {
    var S = time.getDate();
    return ( S % 10 <= 3 && !( 13 >= S && S >= 11 ) && locale.day[ ( S % 10 ) - 1 ] )
      || locale.day[ locale.day.length - 1 ];
  }
};

Muyian.LOCALE = [];
Muyian.locate( (navigator && navigator.language) || 'en', true);

module.exports = Muyian;
