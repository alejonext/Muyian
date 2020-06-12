import moment from 'moment'
import MockDate from 'mockdate'
import Muyian from '../src'

describe("Set/Get", () => {

  beforeEach(() => {
    MockDate.set(new Date())
  })

  afterEach(() => {
    MockDate.reset()
  })

  it('Year', () => {
    expect((new Muyian()).get('year')).toBe(moment().get('year'))
    expect((new Muyian()).year()).toBe(moment().year())
    expect((new Muyian()).year(0).valueOf()).toBe(moment().year(0).valueOf())
    expect((new Muyian()).year(2000).valueOf()).toBe(moment().year(2000).valueOf())
  })

  it('Month', () => {
    expect((new Muyian()).get('month')).toBe(moment().get('month'))
    expect((new Muyian()).month()).toBe(moment().month())
    expect((new Muyian()).month(0).valueOf()).toBe(moment().month(0).valueOf())
    expect((new Muyian()).month(1).valueOf()).toBe(moment().month(1).valueOf())
  })

  it('Day of Week', () => {
    expect((new Muyian()).get('day')).toBe(moment().get('day'))
    expect((new Muyian()).day()).toBe(moment().day())
    expect((new Muyian()).day(0).format()).toBe(moment().day(0).format())
    expect((new Muyian()).day(1).format()).toBe(moment().day(1).format())
  })

  it('Date', () => {
    expect((new Muyian()).get('date')).toBe(moment().get('date'))
    expect((new Muyian()).date()).toBe(moment().date())
    expect((new Muyian()).date(0).valueOf()).toBe(moment().date(0).valueOf())
    expect((new Muyian()).date(1).valueOf()).toBe(moment().date(1).valueOf())
  })

  it('Hour', () => {
    expect((new Muyian()).get('hour')).toBe(moment().get('hour'))
    expect((new Muyian()).hour()).toBe(moment().hour())
    expect((new Muyian()).hour(0).valueOf()).toBe(moment().hour(0).valueOf())
    expect((new Muyian()).hour(1).valueOf()).toBe(moment().hour(1).valueOf())
  })

  it('Minute', () => {
    expect((new Muyian()).get('minute')).toBe(moment().get('minute'))
    expect((new Muyian()).minute()).toBe(moment().minute())
    expect((new Muyian()).minute(0).valueOf()).toBe(moment().minute(0).valueOf())
    expect((new Muyian()).minute(1).valueOf()).toBe(moment().minute(1).valueOf())
  })

  it('Second', () => {
    expect((new Muyian()).get('second')).toBe(moment().get('second'))
    expect((new Muyian()).second()).toBe(moment().second())
    expect((new Muyian()).second(0).valueOf()).toBe(moment().second(0).valueOf())
    expect((new Muyian()).second(1).valueOf()).toBe(moment().second(1).valueOf())
  })

  it('Millisecond', () => {
    expect((new Muyian()).get('millisecond')).toBe(moment().get('millisecond'))
    expect((new Muyian()).millisecond()).toBe(moment().millisecond())
    expect((new Muyian()).millisecond(0).valueOf()).toBe(moment().millisecond(0).valueOf())
    expect((new Muyian()).millisecond(1).valueOf()).toBe(moment().millisecond(1).valueOf())
  })

  it('Set Day', () => {
    expect((new Muyian()).set('date', 30).valueOf()).toBe(moment().set('date', 30).valueOf())
  })

  it('Set Day of Week', () => {
    expect((new Muyian()).set('day', 0).valueOf()).toBe(moment().set('day', 0).valueOf())
  })

  it('Set Month', () => {
    expect((new Muyian()).set('month', 11).valueOf()).toBe(moment().set('month', 11).valueOf())
  })

  it('Set Year', () => {
    expect((new Muyian()).set('year', 2008).valueOf()).toBe(moment().set('year', 2008).valueOf())
  })

  it('Set Hour', () => {
    expect((new Muyian()).set('hour', 6).valueOf()).toBe(moment().set('hour', 6).valueOf())
  })

  it('Set Minute', () => {
    expect((new Muyian()).set('minute', 59).valueOf()).toBe(moment().set('minute', 59).valueOf())
  })

  it('Set Second', () => {
    expect((new Muyian()).set('second', 59).valueOf()).toBe(moment().set('second', 59).valueOf())
  })

  it('Set Millisecond', () => {
    expect((new Muyian()).set('millisecond', 999).valueOf()).toBe(moment().set('millisecond', 999).valueOf())
  })

  it('Set Month and Year in last day of month', () => {
    // 2011-07-31 -> 2011-02-28
    const origin = new Muyian('2011-07-31T14:48:00.000Z')
    const setMonth = origin.set('month', 1)
    expect(setMonth.month()).toBe(1)
    expect(origin.date()).toBe(31)
    expect(setMonth.date()).toBe(28)
    // 2000-02-29 -> 2001-02-28
    const origin2 = new Muyian('2000-02-29T14:48:00.000Z')
    const setYear = origin2.set('year', 2001)
    expect(setYear.month()).toBe(1)
    expect(origin2.date()).toBe(29)
    expect(setYear.date()).toBe(28)
  })

  it('Set Unknown String', () => {
    const newDate = (new Muyian()).set('Unknown String', 1)
    expect(newDate.valueOf())
      .toBe(moment().set('Unknown String', 1).valueOf())
  })

  it('Immutable Set', () => {
    const muyianA = new Muyian()
    const muyianB = new MuyianA.set('year', 2011)
    const momentA = moment()
    const momentB = momentA.set('year', 2011)
    expect(muyianA.valueOf()).not.toBe(muyianB.valueOf())
    expect(momentA.valueOf()).toBe(momentB.valueOf())
  })
});

