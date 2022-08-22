{
/* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */
// ts-nocheck
}

// https://github.com/wenerme/wener/tree/master/tricks/languages/parser/peg/miniquery.pegjs
// https://www.postgresql.org/docs/current/sql-select.html
// https://google.aip.dev/160

Expression
  = left:Operand op:Compare right:Expression {return {type:'binary-expression',op,left,right}}
  / left:Operand __ op:Match __ right:Expression {return {type:'binary-expression',op,left,right}}
  / left:Operand op:Logic right:Expression {return {type:'logic-expression',op,left,right}}
  / '(' _ expr:Expression _ ')' {return expr}
  / Operand

Operand = Literal / Reference

Compare
  = (
    _ (
        '>=' / '<=' / '==' / '!=' /  '>' / '<'
        / '<>' / '='
        / ':' // =
    ) _
    / __ ('gt' / 'lt' / 'gte' / 'lte' / 'eq' / 'neq' ) __
  ) {
    return {':':'eq','>=':'gte','<=':'lte' ,'==':'eq','=':'eq','>':'gt','<':'lt','<>':'nte'}[text()] || text()
  }
Logic
  = (
    __ ('and' / 'or') __
    / _ (
        '&&' / '||'
        / ',' // and
    ) _
  ) {return {',':'and','&&':'and','||':'or'}[text()] || text()}
Match
  = 'is' __ 'null' / 'is' __ 'not' __ 'null' / 'like' / 'not' __ 'like' {return text().replace(/\s/g,'')}

Reference
	= Name '.' Reference
    / JsonReference
    / Name
JsonReference = Name '->' (JsonReference / Name)

Name
  = [a-zA-Z]([_a-zA-Z0-9])* {return {type:'name', name:text()}}

Literal = String / Integer / Boolean / Null
Integer
  = [1-9][0-9]* {return {type:'integer',value:parseInt(text())}}
Boolean
  = 'true'  {return {type:'boolean',value:true}}
  / 'false' {return {type:'boolean',value:false}}
Null
  = 'null' {return {type:'null',value:null}}
String
  = "'" v:([^']*) "'" {return {type:'string',value:v.join('')}}
  / '"' v:[^"]* '"'   {return {type:'string',value:v.join('')}}

_ "whitespace"
  = [ \t\n\r]*
__ "whitespace"
  = [ \t\n\r]+
