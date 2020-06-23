import moment from 'moment'
import MockDate from 'mockdate'
import Muyian from '../src'

describe("Display", () => {
  beforeEach(() => {
    MockDate.set(new Date())
  })

  afterEach(() => {
    MockDate.reset()
  })

  it('Format no formatStr', () => {
    expect((new Muyian()).format()).toBe(moment().format())
  })

  it('Format invalid date', () => {
    expect((new Muyian('')).format()).toBe(new Date('').toString())
    expect((new Muyian('otherString')).format()).toBe(new Date('otherString').toString())
  })

  it('Format Year YY YYYY', () => {
    expect((new Muyian()).format('YY')).toBe(moment().format('YY'))
    expect((new Muyian()).format('YYYY')).toBe(moment().format('YYYY'))
  })

  it('Format Month M MM MMM MMMM', () => {
    expect((new Muyian()).format('M')).toBe(moment().format('M'))
    expect((new Muyian()).format('MM')).toBe(moment().format('MM'))
    expect((new Muyian()).format('MMM')).toBe(moment().format('MMM'))
    expect((new Muyian()).format('MMMM')).toBe(moment().format('MMMM'))
  })

  it('Format Day of Month D DD 1 - 31', () => {
    expect((new Muyian()).format('D')).toBe(moment().format('D'))
    expect((new Muyian()).format('DD')).toBe(moment().format('DD'))
  })

  it('Format Day of Week d Sun - Sat', () => {
    expect((new Muyian()).format('d')).toBe(moment().format('d'))
    expect((new Muyian()).format('dd')).toBe(moment().format('dd'))
    expect((new Muyian()).format('ddd')).toBe(moment().format('ddd'))
    expect((new Muyian()).format('dddd')).toBe(moment().format('dddd'))
  })

  it('Format Hour H HH 24-hour', () => {
    expect((new Muyian()).format('H')).toBe(moment().format('H'))
    expect((new Muyian()).format('HH')).toBe(moment().format('HH'))
  })

  it('Format Hour h hh 12-hour', () => {
    const time = '2018-05-02T00:00:00.000'
    const expected = '12'
    expect((new Muyian(time)).format('h')).toBe(expected)
    expect((new Muyian(time)).format('h')).toBe(moment(time).format('h'))
    expect((new Muyian(time)).format('hh')).toBe(expected)
    expect((new Muyian(time)).format('hh')).toBe(moment(time).format('hh'))

    const time2 = '2018-05-02T01:00:00.000'
    expect((new Muyian(time2)).format('h')).toBe(moment(time2).format('h'))
    expect((new Muyian(time2)).format('h')).toBe('1')
    expect((new Muyian(time2)).format('hh')).toBe(moment(time2).format('hh'))
    expect((new Muyian(time2)).format('hh')).toBe('01')

    const time3 = '2018-05-02T23:00:00.000'
    const expected3 = '11'
    expect((new Muyian(time3)).format('h')).toBe(moment(time3).format('h'))
    expect((new Muyian(time3)).format('h')).toBe(expected3)
    expect((new Muyian(time3)).format('hh')).toBe(moment(time3).format('hh'))
    expect((new Muyian(time3)).format('hh')).toBe(expected3)
  })

  it('Format meridiens a A am / pm', () => {
    const time = '2018-05-02T01:00:00.000'
    expect((new Muyian(time)).format('a')).toBe('am')
    expect((new Muyian(time)).format('a')).toBe(moment(time).format('a'))
    expect((new Muyian(time)).format('A')).toBe('AM')
    expect((new Muyian(time)).format('A')).toBe(moment(time).format('A'))
    expect((new Muyian(time)).locale('ja').format('a')).toBe('午前')
    expect((new Muyian(time)).locale('ja').format('a'))
      .toBe(moment(time).locale('ja').format('a'))

    const time2 = '2018-05-02T23:00:00.000'
    expect((new Muyian(time2)).format('a')).toBe('pm')
    expect((new Muyian(time2)).format('a')).toBe(moment(time2).format('a'))
    expect((new Muyian(time2)).format('A')).toBe('PM')
    expect((new Muyian(time2)).format('A')).toBe(moment(time2).format('A'))
    expect((new Muyian(time2)).locale('ja').format('a')).toBe('午後')
    expect((new Muyian(time2)).locale('ja').format('a'))
      .toBe(moment(time2).locale('ja').format('a'))
  })

  it('Format Minute m mm', () => {
    expect((new Muyian()).format('m')).toBe(moment().format('m'))
    expect((new Muyian()).format('mm')).toBe(moment().format('mm'))
  })

  it('Format Second s ss SSS', () => {
    expect((new Muyian()).format('s')).toBe(moment().format('s'))
    expect((new Muyian()).format('ss')).toBe(moment().format('ss'))
    expect((new Muyian()).format('SSS')).toBe(moment().format('SSS'))
    const date = '2011-11-05T14:48:01.002Z'
    expect((new Muyian(date)).format('s-ss-SSS')).toBe(moment(date).format('s-ss-SSS'))
  })

  it('Format Time Zone ZZ', () => {
    MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 8)
    expect((new Muyian()).format('Z')).toBe(moment().format('Z'))
    expect((new Muyian()).format('ZZ')).toBe(moment().format('ZZ'))
    MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 8 * -1)
    expect((new Muyian()).format('ZZ')).toBe(moment().format('ZZ'))
    MockDate.set(new Date('2018-05-02T23:00:00.000'), 0)
    expect((new Muyian()).format('ZZ')).toBe(moment().format('ZZ'))
    MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 10)
    expect((new Muyian()).format('ZZ')).toBe(moment().format('ZZ'))
    MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 11 * -1)
    expect((new Muyian()).format('ZZ')).toBe(moment().format('ZZ'))
    MockDate.set(new Date('2018-05-02T23:00:00.000'), 60 * 5.5 * -1)
    expect((new Muyian()).format('ZZ')).toBe(moment().format('ZZ'))
  })

  it('Format ddd dd MMM with short locale', () => {
    expect((new Muyian())
      .locale(th)
      .format('dd')).toBe(moment()
      .locale('th')
      .format('dd'))
    expect((new Muyian())
      .locale(th)
      .format('ddd')).toBe(moment()
      .locale('th')
      .format('ddd'))
    expect((new Muyian())
      .locale(th)
      .format('MMM')).toBe(moment()
      .locale('th')
      .format('MMM'))
  })

  it('Format token value is 0', () => {
    const sundayDate = '2000-01-02'
    const sundayStr = 'd H m s'
    expect((new Muyian(sundayDate)).format(sundayStr))
      .toBe(moment(sundayDate).format(sundayStr))
  })

  it('Format Complex with other string - : / ', () => {
    const string = 'YY-M-D / HH:mm:ss'
    expect((new Muyian()).format(string)).toBe(moment().format(string))
  })

  it('Format Escaping characters', () => {
    let string = '[Z] Z'
    expect((new Muyian()).format(string)).toBe(moment().format(string))
    string = '[Z] Z [Z]'
    expect((new Muyian()).format(string)).toBe(moment().format(string))
  })

  describe('Difference', () => {
    it('empty -> default milliseconds', () => {
      const dateString = '20110101'
      const dateA = new Muyian()
      const dateB = new Muyian(dateString)
      const momentA = moment()
      const momentB = moment(dateString)
      expect(dateA.diff(dateB)).toBe(momentA.diff(momentB))
    })

    it('diff -> none dayjs object', () => {
      const dateString = '2013-02-08'
      const dateA = new Muyian()
      const dateB = new Date(dateString)
      const momentA = moment()
      const momentB = new Date(dateString)
      expect(dateA.diff(dateB)).toBe(momentA.diff(momentB))
    })

    it('diff -> in seconds, minutes, hours, days, weeks, months, quarters, years ', () => {
      const dateA = new Muyian()
      const dateB = (new Muyian()).add(1000, 'days')
      const dateC = (new Muyian()).subtract(1000, 'days')
      const momentA = moment()
      const momentB = moment().add(1000, 'days')
      const momentC = moment().subtract(1000, 'days')
      const units = ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months', 'quarters', 'years']
      units.forEach((unit) => {
        expect(dateA.diff(dateB, unit)).toBe(momentA.diff(momentB, unit))
        expect(dateA.diff(dateB, unit, true)).toBe(momentA.diff(momentB, unit, true))
        expect(dateA.diff(dateC, unit)).toBe(momentA.diff(momentC, unit))
        expect(dateA.diff(dateC, unit, true)).toBe(momentA.diff(momentC, unit, true))
      })
    })

    it('Special diff in month according to moment.js', () => {
      const dateA = new Muyian('20160115')
      const dateB = new Muyian('20160215')
      const dateC = new Muyian('20170115')
      const momentA = moment('20160115')
      const momentB = moment('20160215')
      const momentC = moment('20170115')
      const units = ['months', 'quarters', 'years']
      units.forEach((unit) => {
        expect(dateA.diff(dateB, unit)).toBe(momentA.diff(momentB, unit))
        expect(dateA.diff(dateB, unit, true)).toBe(momentA.diff(momentB, unit, true))
        expect(dateA.diff(dateC, unit)).toBe(momentA.diff(momentC, unit))
        expect(dateA.diff(dateC, unit, true)).toBe(momentA.diff(momentC, unit, true))
      })
    })

    it('MonthDiff', () => {
      expect((new Muyian('2018-08-08')).diff(new Muyian('2018-08-08'), 'month')).toEqual(0)
      expect((new Muyian('2018-09-08')).diff(new Muyian('2018-08-08'), 'month')).toEqual(1)
      expect((new Muyian('2018-08-08')).diff(new Muyian('2018-09-08'), 'month')).toEqual(-1)
      expect((new Muyian('2018-01-01')).diff(new Muyian('2018-01-01'), 'month')).toEqual(0)
    })
  })

  it('Unix Timestamp (milliseconds)', () => {
    expect((new Muyian()).valueOf()).toBe(moment().valueOf())
  })

  it('Unix Timestamp (seconds)', () => {
    expect((new Muyian()).unix()).toBe(moment().unix())
  })

  it('Days in Month', () => {
    expect((new Muyian()).daysInMonth()).toBe(moment().daysInMonth())
    expect((new Muyian('20140201')).daysInMonth()).toBe(moment('20140201').daysInMonth())
  })

  it('Utc Offset', () => {
    expect((new Muyian('2013-01-01T00:00:00.000')).utcOffset()).toBe(moment('2013-01-01T00:00:00.000').utcOffset())
    expect((new Muyian('2013-01-01T05:00:00.000')).utcOffset()).toBe(moment('2013-01-01T05:00:00.000').utcOffset())
  })

  it('As Javascript Date -> toDate', () => {
    const base = new Muyian()
    const momentBase = moment()
    const jsDate = base.toDate()
    expect(jsDate).toEqual(momentBase.toDate())
    expect(jsDate).toEqual(new Date())

    jsDate.setFullYear(1970)
    expect(jsDate.toUTCString()).not.toBe(base.toString())
  })

  it('As JSON -> toJSON', () => {
    expect((new Muyian()).toJSON()).toBe(moment().toJSON())
    global.console.warn = jest.genMockFunction()// moment.js otherString will throw warn
    expect((new Muyian('otherString')).toJSON()).toBe(moment('otherString').toJSON())
    expect((new Muyian('otherString')).toJSON()).toBe(null)
  })

  it('As ISO 8601 String -> toISOString e.g. 2013-02-04T22:44:30.652Z', () => {
    expect((new Muyian()).toISOString()).toBe(moment().toISOString())
  })

});