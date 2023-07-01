// https://peggyjs.org/online
/*
-- test
(id > 10) and b < 10 or (
1 = 1
-- comment
or a in []
or a in () -- a
or a not in []
or a not in ()
or a is true
or a is false
or a is not true
or a is not false
or a is null
or a is not null
or a like '%a%'
or a not like '%a%'
or a between 1 and 2
or a between "11" and "12"
or a in [1,]
or a in [1,1.1,true,false,null,b]
or a > now()
or a > +1.0
or a < -.1
and a > date(col)
and b > date( col1, )
and b<>date( c1,1,.1,true, null,)
and true
and false
and 1
and "1"
and a.b.c > 1
)
*/

{
/* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */
// ts-nocheck

function logic(op,left,right){
  if (!op) {
    return left
  }
  if(right.type === 'logic' && right.op === op){
    return {type:'logic',op,exprs:[left,...right.exprs]}
  }
  return {type:'logic',op,exprs:[left,right]}
}
function _op(op){
return op.flat().filter(v=>v && v.trim()).join(' ').toLowerCase()
}
}

// https://github.com/wenerme/wener/tree/master/tricks/languages/parser/peg/miniquery.pegjs
// https://www.postgresql.org/docs/current/sql-select.html
// https://google.aip.dev/160

Expr
	= _ expr:LogicExpr _ {return expr}

LogicExpr
  = left:RelExpr rest:(__ op:logic __ right:LogicExpr  {return {op,right}})? {return logic(rest?.op,left,rest?.right)}

RelExpr
  = left:InExpr rest:(_ op:('>=' / '<='/ '<>' /  '>' / '<' / '==' / '!='  / '=' / ':') _ right:RelExpr {return {op,right}}) ? {return rest?{type:'rel',op:rest.op,left,right:rest.right}:left}

InExpr
  = left:PredicateExpr rest:(__ op:((not __)? in) _ values:Array {return {op:_op(op),values}})? {return rest?{type:'in',left,...rest}:left}

PredicateExpr
  = left:BetweenExpr rest:(
	__ op:(is __ (not __)?) right:(null / bool) {return {op:_op(op),right}}
	/ __ op:((not __)?  like) __ right:string {return {op:_op(op),right}}
  )? {return rest?{type:'predicate',left,...rest}:left}

BetweenExpr
  = left:CallExpr rest:(__ op:((not __)? between) __ a:CallExpr _ and _ b:CallExpr {return {op:_op(op),a,b}}) ? {return rest?{type:'between',left,...rest}:left}

CallExpr
  = name:name '(' _ Values _ ')' {return {type:'function',name}}
  / next:PriExpr {return next}

PriExpr
  = '(' expr:Expr ')' {return {type:'paren',expr}} // paren
  / not __ expr:Expr {return {type:'not',expr}} // not
  // / Array
  / next:Value {return next}
  / '+' _ expr:Expr {return {type:'positive',expr}}// pos
  / '-' expr:Expr {return {type:'negetive',expr}}// neg


in      = 'in'/'IN'
is      = 'is' / 'IS'
like    = 'like' / 'LIKE'
between = 'between' / 'BETWEEN'
and     = ('and' / 'AND' / '&&') {return 'and'}
not     = ('not' / 'NOT') {return 'not'}
or      = ('or' / 'OR' / '||') {return 'or'}
logic   = and / or

Value   = literal / ref / ident
Values = next:(a:Value _ b:(_ ',' _ next:Value {return next})* ','? {return b?[a,...b]:a})? {return next || []}
Array   = '[' next:Values ']' {return next} / '(' next:Values ')' {return next}


JsonReference = field (('->'/'->>') string)+
field = ident / ref

ident   = name  {return {type:'id',name:text()}}
ref     = a:name b:('.' v:name {return v})+ {return {type:'ref',refs:[a,...b]}}
name = ([a-zA-Z]([_a-zA-Z0-9])*) {return text()}

literal = string / float / int / bool / null
int     = [1-9][0-9]* {return {type:'integer',value:parseInt(text())}}
float   = [0-9]* '.'[0-9]+  {return {type:'float',value:parseFloat(text())}}
string
  = "'" v:([^']*) "'" {return {type:'string',value:v.join('')}}
  / '"' v:[^"]* '"'   {return {type:'string',value:v.join('')}}
null    = ('null' / 'NULL') {return {type:'null',value:null}}
bool    = ('true' / 'false' / 'TRUE' / 'FALSE') {return {type:'boolean',value:text().toLowerCase() === 'true'}}


_ "whitespace"
  = white* {return ''}
__ "whitespace"
  = white+ {return ' '}
white
  = '/*' ([^*]*) '*/'
  / '--' ([^\r\n]*) '\n'
  /  [ \t\n\r]
