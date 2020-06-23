# API Reference
## Parsing
### Constructor 
```
new Muyian(dateType?: string | number | Date | Muyian)
```

#### Examples
* ISO

```
new Muyian('2018-04-04T16:00:00.000Z')
```
* Native Javascript Date object

```
new Muyian(new Date())
```
### Unix Timestamp
```
Muyian.unix(dateType: number)
```
### Clone
```
new Muyian().clone()
```
### Valid
```
new Muyian().isValid()
```
#### Examples
```
new Muyian('2018-04-04T16:00:00.000Z').isValid()
new Muyian('false').isValid()
```
## Get and Set
### Millisecond
```
new Muyian().millisecond(); // Get Millisecond
new Muyian().millisecond(1);// Set Millisecond
```
### Second
```
new Muyian().second(); // Get Second
new Muyian().second(1);// Set Second
```
### Minute
```
new Muyian().minute(); // Get Minute
new Muyian().minute(1);// Set Minute
```
### Hour
```
new Muyian().hour(); // Get Hour
new Muyian().hour(1);// Set Hour
```
### Day of the Week
Gets or sets the day of the week. Starts on Sunday with 0
```
new Muyian().day(); // Get Day
new Muyian().day(1);// Set Day
```
### Day of the Month
Gets or sets the day of the month. Starts at 1
```
new Muyian().date(); // Get Date
new Muyian().date(1);// Set Date
```
### Week
```
new Muyian().week(); // Get Week
new Muyian().week(1);// Set Week
```
### Month
```
new Muyian().month(); // Get Month
new Muyian().month(1);// Set Month
```
### Quarter
```
new Muyian().quarter(); // Get Quarter
new Muyian().quarter(1);// Set Quarter
```
### Year
```
new Muyian().year(); // Get Year
new Muyian().year(1);// Set Year
```
### Get
```
new Muyian().get(unit: string)
```
#### Example
```
new Muyian().get('year'); // Get Year
```
### Set
```
new Muyian().set(unit: string, value: number)
```
#### Example
```
new Muyian().set('quarter', 1); // Get quarter
```
## Manipulating
### Add
```
new Muyian().add(unit: string, value: number);
```
#### Example
```
new Muyian().add('date', 1);
```
### Subtract
```
new Muyian().subtract(unit: string, value: number);
```
#### Example
```
new Muyian().subtract('week', 2);
```
### Start of Time
```
new Muyian().startOf(unit: string);
```
#### Example
```
new Muyian().startOf('month');
```
### End of Time
```
new Muyian().endOf(unit: string);
```
#### Example
```
new Muyian().endOf('hour');
```
## Displaying
### Format
```
new Muyian().format(format: string, locale?: string);
```

### List of all available formats

| Format  | Out | Description |
| --- | --- | --- |
| `%a` | `pm` | am/pm |
| `%A` | `PM` | AM/PM |
| `%c` | | (time, locale) => time.format(DEFAULT), |
| `%d` | `01` | The day of the week, with Sunday as 0 |
| `%D` | `Sun` | The name of the day of the week |
| `%e` | | (time, locale) => Intl.DateTimeFormat(locale).resolvedOptions().timeZone, |
| `%F` | `December` | The full month name |
| `%G` | `9` | The hour, 12-hour clock |
| `%g` | `09` | The hour, 12-hour clock, 2-digits |
| `%H` | `21` | The hour, 2-digits |
| `%h` | `9` | The hour |
| `%i` | `59` | The minute |
| `%I` | `09` | The minute, 2-digits |
| `%j` | `2` | The day of the week, with Sunday as 0 |
| `%L` | | (time, locale) => time.isLeapYear(), |
| `%l` | `Saturday` | The name of the day of the week |
| `%m` | `06` | The month, 2-digits |
| `%M` | `Dec.` | The abbreviated month name |
| `%N` | `2` | The day of the month |
| `%n` | `6` | (time, locale) => Muyian.Intl(locale, { month: NUMERIC }).format(time), |
| `%O` | `+05:00` | (time, locale) => time.getTimezoneGTM(true), |
| `%o` | | (time, locale) => time.isoYear(), |
| `%P` | `+0500` | (time, locale) => time.getTimezoneGTM(), |
| `%Q` | `2` | (time, locale) => time.getQueater(), |
| `%r` | | (time, locale) => time.toString(), |
| `%s` | `59` | (time, locale) => Muyian.Intl(locale, { second: DIGIT2 }).format(time), |
| `%t` | `30` | (time, locale) => time.daysInMonth(), |
| `%T` | `Americas/New York` | (time, locale) => time.getNameTimezone(), |
| `%U` | `1318781876406` | (time, locale) => time.unix(), |
| `%v` | `189` | (time, locale) => (parseInt(time.get(MS), 10) + 1000).toString().substr(1), |
| `%w` | `2` | (time, locale) => time.getDay(), |
| `%W` | `52` | (time, locale) => time.getWeek(), |
| `%y` | `20` | (time, locale) => Muyian.Intl(locale, { year: DIGIT2 }).format(time), |
| `%Y` | `2020` | (time, locale) => Muyian.Intl(locale, { year: NUMERIC }).format(time), |
| `%z` | | (time, locale) => time.dayOfYear(), |
| `%Z` | | (time, locale) => time.getTimezone(), |