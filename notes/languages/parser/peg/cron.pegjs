// https://en.wikipedia.org/wiki/Cron
// https://bzenkosergey.github.io/ng-cron/react
// https://crontab.guru/

// TODO - support 0/99 0-20/2 * JAN/1 SUN-SAT

{
const _dayOfWeekNames = ['SUN','MON','TUE','WED','THU','FRI','SAT']
function dayOfWeek(name){
  // 0-6
  return _dayOfWeekNames.indexOf(name)
}

const _monthOfYearNames = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
function monthOfYearNames(name){
  // 1-31
  return _monthOfYearNames.indexOf(name)+1
}
}

Cron= (&{return options?.allowedPredefined ?? true} Predefined) / head:Value tail:(__ v:Value {return v})+ {return [].concat(head,tail)}

Value= Any / Step / AnyStep / RangeStep / Range
  // named extension
  / DayOfWeekList / MonthOfYearList
  // extra extension
  / DayOfWeekNth / LastDayOfWeekOfMonth / LastWeekdayOfMonth / DaysBeforeEndOfMonth / NearestWeekday

  // must be last
  / List
  ;

Any= ('*' / '?') {return {type:'any', mark: text() }}
Step = interval:Integer '/' nth:Integer {return {type:'step', interval, nth}}
AnyStep = '*' '/' nth:Integer {return {type:'any-step', nth}}
RangeStep = range:Range '/' nth:Integer {return {...range, type:'range-step', nth}}
Range = from:Integer '-' to:Integer {return {type:'range', from, to}}
List = head:Integer tail:(',' v:Integer {return v})* {return {type:'list',values: [].concat(head,tail)}}

DayOfWeekList = head:DayOfWeek tail:(',' v:DayOfWeek {return v})* {return {type:'day-of-week-list',values: [].concat(head,tail)}}
MonthOfYearList = head:MonthOfYear tail:(',' v:MonthOfYear {return v})* {return {type:'month-of-year-list',values: [].concat(head,tail)}}

DayOfWeekNth = dow:DOW '#' nth:([1-5] {return parseInt(text())}) {return {type:'day-of-week-nth', nth,dow}}

DayOfWeek= ('SUN'/'MON'/'TUE'/'WED'/'THU'/'FRI'/'SAT'){return dayOfWeek(text())}

MonthOfYear = ('JAN'/'FEB'/'MAR'/'APR'/'MAY'/'JUN'/'JUL'/'AUG'/'SEP'/'OCT'/'NOV'/'DEC'){return monthOfYearNames(text())}

LastDayOfWeekOfMonth = dow:DOW 'L' {return {type:'last-day-of-week-of-month', dow}}

LastWeekdayOfMonth = 'LW' {return {type:'last-weekday-of-month'}}

NearestWeekday = nth:DOM 'W' {return {type: 'nearest-weekenday', nth}}

DaysBeforeEndOfMonth = 'L-' days:DOM {return {type: 'days-before-end-of-month', days}}

Predefined = '@' name:PredefinedName {return {type:'predefined', name}}
PredefinedName = 'yearly' / 'annually' / 'monthly' / 'weekly' / 'daily' / 'midnight' / 'hourly' / 'reboot'

// some spec start from 0
DOW "dow" = v:Integer &{return v >=0 && v<=7} {return v}
DOM "dom" = v:Integer &{return v >=0 && v<=31} {return v}

Integer = [0-9]+ {return parseInt(text())}

_ "whitespacing"
  = [ \t\r]*
__ "whitespace"
  = [ \t\r]+
