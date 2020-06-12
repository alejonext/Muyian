export const MS = 'millisecond';
export const S = 'second';
export const MIN = 'minute';
export const H = 'hour';
export const D = 'day';
export const W = 'week';
export const M = 'month';
export const Q = 'quarter';
export const Y = 'year';
export const DATE = 'date';

export const time = {
  [S]  : 1e3,
  [MIN]: 1e3 * 60,
  [H]  : 1e3 * 60 * 60,
  [D]  : 1e3 * 60 * 60 * 24,
  [W]  : 1e3 * 60 * 60 * 24 * 7,
  [M]  : 1e3 * 60 * 60 * 24 * (365 / 12),
  [Y]  : 1e3 * 60 * 60 * 24 * 365,
  [W + 'Start']  : 4,
  [D + 'in' + ToPrototype(W) ]  : 7,
};

export const Date = {
  [Y]  : 'fullYear',
  [MS] : 'milliseconds',
  [S] : 'seconds',
  [MIN] : 'minutes',
  [H] : 'hours',
};

export const ToPrototype = (str) => str[0].toUpperCase() + str.slice(1);

export const format = {
  parse  : /^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,
  simple : /\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
  default:'%Y-%m-%d T%H:%i:%s%P',
  chr    : /\%./g,
  Date   : [ Y, M, DATE, H, MIN, S, MS ]
};