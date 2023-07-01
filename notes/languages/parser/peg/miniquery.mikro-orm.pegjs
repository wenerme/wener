// https://peggyjs.org/online
/*
a > 1 or
-- comment
(b < 2 or c.d.e = true )
--
and a not in [1,2,3,]
*/
{{
/* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */
// ts-nocheck
const OPERATORS = {
  ">=":"$gte",
  "<=":"$lte",
  ">":"$gt",
  "<":"$lt",
  // ":":"$eq",// fixme has
  "=":"$eq",
  "==":"$eq",
  "===":"$eq",
  "<>":"$ne",
  "!=":"$ne",
  "in":"$in",
  "not in":"$nin",
  '&&':'$and',
  'and':'$and',
  '||':'$or',
  'or':'$or',
  'nor':'$nor',
  '!' : '$not',
  '~' : '$re',
  'like' : '$like',
  'ilike' : '$ilike',
  // https://www.postgresql.org/docs/current/functions-json.html
  '@>' : '@contains',
  '@<' : '@contained',
  // $overlap	&&
  // https://www.postgresql.org/docs/current/functions-textsearch.html
  // $fulltext
}
}}

{
function _op(op){
  op = !Array.isArray(op)?op:op.flat().filter(v=>v && v.trim()).join(' ').toLowerCase()
  return OPERATORS[op] || (console.error('unexpected op',op),op)
}
function _compound(op,a,b){
  if(!op)return a
  op = _op(op)
  if(b[op])return {[op]:[a,...b[op]]}
  return {[op]:[a,b]}
}
function _make(a,op,b){
  // NOTE 如果做了 join 支持 {'a.b':{$gt:1}}
  const o = {}
  let c = o
  if(Array.isArray(a)){
    for(const v of a){
      c = c[v] ||= {}
    }
  } else {
    c = o[a] ||= {}
  }
  c[_op(op)]=b
  return o
}
}


// https://github.com/stalniy/ucast
// https://www.mongodb.com/docs/manual/reference/operator/query/
Main = next:Expr EOF {return next}

Expr = _ next:CompoundExpr _ {return next}

CompoundExpr
  = left:RelExpr
    rest:(
      op:(('&&'/'||')/(__ (and/or) __))
      right:CompoundExpr {return {op,right}}
    )? {return rest?.right?_compound(rest?.op,left,rest?.right):left}

RelExpr
  = '(' next:Expr ')' {return next} // NOTE: and > or
  / '!' next:RelExpr {return {'$not':next}}
  / field:Field _ op:('>=' / '<='/ '<>' /  '>' / '<' / '===' / '==' / '!='  / '=' / ':') _ value:literal {return _make(field,op,value)}
  / field:Field _ op:('~') _ value:string {return _make(field,op,value)}
  / field:Field __ op:(is __ null) {return _make(field,'=',null)}
  / field:Field __ op:(is __ not __ null) {return _make(field,'!=',null)}
  / field:Field __ op:((not __)? (in)) __ value:Array {return _make(field,op,value)}
  / field:Field __ op:((not __)? (like/ilike)) __ value:string {return _make(field,op,value)}

Field 	= ref / name
//ref     = a:name b:('.' v:name {return v})+ {return [a,...b].join('.')}
ref     = a:name|1..,_ '.'_ | {return a}
name 	= ([a-zA-Z]([_a-zA-Z0-9])*) {return text()}

Value   = literal
// Values = next:(a:Value _ b:(_ ',' _ next:Value {return next})* ','? {return b?[a,...b]:a})? {return next || []}
Values 	= next:(Value|.., _ "," _ |) _  ','?  {return next || []}
Array   = '[' _ next:Values _ ']' {return next} / '(' _ next:Values _ ')' {return next}

in      = 'in' / 'IN'  {return 'in'}
is      = 'is' / 'IS'  {return 'is'}
like    = 'like' / 'LIKE'  {return 'like'}
ilike    = 'ilike' / 'ILIKE'  {return 'ilike'}
between = 'between' / 'BETWEEN' {return 'between'}
and     = ('and' / 'AND') {return 'and'}
not     = ('not' / 'NOT') {return 'not'}
or      = ('or' / 'OR') {return 'or'}
logic   = and / or

literal = string / float / int / bool / null
int     = [1-9][0-9]* {return parseInt(text())}
float   = [0-9]* '.'[0-9]+  {return parseFloat(text())}
string
  = "'" v:([^']*) "'" {return v.join('')}
  / '"' v:[^"]* '"'   {return v.join('')}
null    = ('null' / 'NULL') {return null}
bool    = ('true' / 'false' / 'TRUE' / 'FALSE') {return text().toLowerCase() === 'true'}

_ "whitespace" 	= white* {return ''}
__ "whitespace" = white+ {return ' '}
white
  = '/*' ([^*]*) '*/'
  / '--' ([^\r\n]*) ('\n'/EOF)
  /  [ \t\n\r]
EOF = !.
