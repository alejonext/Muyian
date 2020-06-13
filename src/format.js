import CONTS from './const';
export const a = (time, locale) => time.toLocaleTimeString(locale, {
  hour12: true
}).split(' ').reverse()[0].toLowerCase();
export const A = (time, locale) => a(time, locale).toUpperCase();
export const c = (time, locale) => time.format(CONTS.format.default);
export const d = (time, locale) => new Intl.DateTimeFormat(locale, {
  day: CONTS.DIGIT2
}).format(time);
export const D = (time, locale) => new Intl.DateTimeFormat(locale, {
  weekday: CONTS.SHORT
}).format(time);
export const e = (time, locale) => Intl.DateTimeFormat(locale).resolvedOptions().timeZone;
export const F = (time, locale) => new Intl.DateTimeFormat(locale, {
  month: CONTS.LONG
}).format(time);
export const G = (time, locale) => new Intl.DateTimeFormat(locale, {
  hour: CONTS.NUMERIC
}).format(time);
export const g = (time, locale) => new Intl.DateTimeFormat(locale, {
  hour: CONTS.NUMERIC,
  hourCycle: "h12"
}).format(time);
export const H = (time, locale) => new Intl.DateTimeFormat(locale, {
  hour: CONTS.DIGIT2
}).format(time);
export const h = (time, locale) => new Intl.DateTimeFormat(locale, {
  hour: CONTS.NUMERIC
}).format(time);
export const i = (time, locale) => new Intl.DateTimeFormat(locale, {
  minute: CONTS.DIGIT2
}).format(time);
export const j = (time, locale) => time.getDate();
export const L = (time, locale) => time.isLeapYear();
export const l = (time, locale) => new Intl.DateTimeFormat(locale, {
  weekday: CONTS.LONG
}).format(time);
export const m = (time, locale) => new Intl.DateTimeFormat(locale, {
  month: CONTS.DIGIT2
}).format(time);
export const M = (time, locale) => new Intl.DateTimeFormat(locale, {
  month: CONTS.SHORT
}).format(time);
export const N = (time, locale) => new Intl.DateTimeFormat(locale, {
  day: CONTS.NUMERIC
}).format(time);
export const n = (time, locale) => new Intl.DateTimeFormat(locale, {
  month: CONTS.NUMERIC
}).format(time);
export const O = (time, locale) => time.getTimezoneGTM(true);
export const o = (time, locale) => time.isoYear();
export const P = (time, locale) => time.getTimezoneGTM();
export const Q = (time, locale) => time.getQueater();
export const r = (time, locale) => time.toString();
export const s = (time, locale) => new Intl.DateTimeFormat(locale, {
  second: CONTS.DIGIT2
}).format(time);
export const t = (time, locale) => time.daysInMonth();
export const T = (time, locale) => time.getNameTimezone();
export const U = (time, locale) => time.unix();
export const v = (time, locale) => (parseInt(time.get(CONTS.MS), 10) + 1000).toString().substr(1);
export const w = (time, locale) => time.getDay();
export const W = (time, locale) => time.getWeek();
export const y = (time, locale) => new Intl.DateTimeFormat(locale, {
  year: CONTS.DIGIT2
}).format(time);
export const Y = (time, locale) => new Intl.DateTimeFormat(locale, {
  year: CONTS.NUMERIC
}).format(time);
export const z = (time, locale) => time.dayOfYear();
export const Z = (time, locale) => time.getTimezone();