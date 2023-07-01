/*
a > 1 or b < 2 or c.d.e = true
*/
{
/* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */
// ts-nocheck
const $op = {
">=":"gte",
"<=":"lte",
">":"gt",
"<":"lt",
"=":"eq",
"==":"eq",
"===":"eq",
"<>":"ne",
"!=":"ne",
"in":"in",
"not in":"in",
'&&':'and',
'and':'and',
'||':'or',
'or':'or',
'nor':'nor',
'!' : 'not',
'~' : 'regex',
}
function _op(op){
op = !Array.isArray(op)?op:op.flat().filter(v=>v && v.trim()).join(' ').toLowerCase()
return $op[op] || op
}
function _compound(op,a,b){
if(!op)return a
op = _op(op)
if(b?.operator === op)return {operator:op,conditions:[a,...b.conditions]}
return {operator:_op(op),conditions:[a,b]}
}
}
// https://github.com/stalniy/ucast
// https://www.mongodb.com/docs/manual/reference/operator/query/
Expr = _ next:CompoundExpr _ {return next}

CompoundExpr = left:RelExpr rest:( op:('&&'/'||') right:CompoundExpr {return {op,right}} / __ op:('and'/'or')__ right:CompoundExpr {return {op,right}})? {return _compound(rest?.op,left,rest?.right)}

RelExpr
  = field:field _ op:('>=' / '<='/ '<>' /  '>' / '<' / '===' / '==' / '!='  / '=' / ':') _ value:literal {return {operator:_op(op),field,value}}
  / field:field __ op:(('not' __)? 'in') __ value:literal {return {[field]:{[_op(op)]:value}}}

field = ref / name
ref     = a:name b:('.' v:name {return v})+ {return [a,...b].join('.')}
name = ([a-zA-Z]([_a-zA-Z0-9])*) {return text()}

literal = string / float / int / bool / null
int     = [1-9][0-9]* {return parseInt(text())}
float   = [0-9]* '.'[0-9]+  {return parseFloat(text())}
string
  = "'" v:([^']*) "'" {return v.join('')}
  / '"' v:[^"]* '"'   {return v.join('')}
null    = ('null' / 'NULL') {return null}
bool    = ('true' / 'false' / 'TRUE' / 'FALSE') {return text().toLowerCase() === 'true'}

_ "whitespace"
  = white* {return ''}
__ "whitespace"
  = white+ {return ' '}
white
  = '/*' ([^*]*) '*/'
  / '--' ([^\r\n]*) '\n'
  /  [ \t\n\r]
