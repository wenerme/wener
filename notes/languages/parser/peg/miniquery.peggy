/*
Grammar for MiniQuery AST

grammar: https://github.com/wenerme/wener/blob/master/notes/languages/parser/peg/miniquery.peggy
playground: https://peggyjs.org/online
================================

- https://www.postgresql.org/docs/current/sql-select.html
- https://www.postgresql.org/docs/current/sql-expressions.html
- https://google.aip.dev/160
- https://www.sqlite.org/syntaxdiagrams.html
- https://github.com/florajs/sql-parser/blob/main/sql.pegjs

Examples
==========

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
and a > 1
-- comment
or (b < 2 or c.d.e = true )
--
and a not in [1,2,3,]
and a between 1 and 2
-- contains
and tags @> ['Hello']
and !( tags @> ['Hello'] )
)
*/

{
  /* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */
  // ts-nocheck

  function logic(op, left, right) {
    if (!op) {
      return left;
    }
    if (right.type === "logic" && right.op === op) {
      return { type: "logic", op, exprs: [left, ...right.exprs] };
    }
    return { type: "logic", op, exprs: [left, right] };
  }
  function _op(op) {
    return op
      .flat()
      .filter((v) => v && v.trim())
      .join(" ")
      .toLowerCase();
  }

  function createUnaryExpr(operator, expr) {
    return { type: "unary", operator, expr };
  }
  function createBinaryExpr(operator, left, right) {
    return { type: "binary", operator, left, right };
  }

  function createList(head, tail) {
    return [head, ...tail.map((item) => item[3])];
  }

  function createBinaryExprChain(head, tail) {
    return tail.reduce(
      (result, item) => createBinaryExpr(item[1], result, item[3]),
      head
    );
  }
}


Main = AliasExpr

QueryExpr = @value:Expr EOF

AliasExpr
  = expr:Expr alias:(_ KW_AS _ @name:name)? {
      return !alias ? expr : { type: "alias", expr, alias };
    }

Expr = _ @expr:OrExpr _

OrExpr
  = head:AndExpr tail:(_ KW_OR _ AndExpr)* {
      return createBinaryExprChain(head, tail);
    }

AndExpr
  = head:NotExpr tail:(_ KW_AND _ NotExpr)* {
      return createBinaryExprChain(head, tail);
    }

NotExpr
  = ComparisonExpr
  / (KW_NOT / "!" !"=") _ expr:NotExpr { return createUnaryExpr("NOT", expr); }

ComparisonExpr
  = left:AdditiveExpr _ rh:ComparisonOpRight? {
      if (!rh) return left;
      else if (rh.type === "arithmetic")
        return createBinaryExprChain(left, rh.tail);
      else return createBinaryExpr(rh.op, left, rh.right);
    }

ComparisonOpRight
  = l:(_ (">=" / ">" / "<=" / "<>" / "<" / "=" / "!=") _ AdditiveExpr)+ {
      return { type: "arithmetic", tail: l };
    }
  / in _ "(" _ Exprs _ ")"

////  / in_op_right
//  / between_op_right
//  / is_op_right
//  / like_op_right

//in_op_right
//  = op:in_op __ LPAREN  __ l:expr_list __ RPAREN {
//      return { op, right: l };
//    }
//  / op:in_op __ e:var_decl {
//      return { op, right: e };
//    }

AdditiveExpr
  = head:MultiplicativeExpr tail:(_ ("+" / "-") _ MultiplicativeExpr)* {
      return createBinaryExprChain(head, tail);
    }

MultiplicativeExpr
  = head:PrimaryExpr tail:(_ ("*" / "/" / "%") _ PrimaryExpr)* {
      return createBinaryExprChain(head, tail);
    }

PrimaryExpr
  = literal
  / ref
  / FuncCall
  / "(" _ @expr:Expr _ ")"

//  = literal
//  / cast_expr
//  / aggr_func
//  / func_call
//  / case_expr
//  / column_ref
//  / param
//  / LPAREN __ e:expr __ RPAREN {
//      return { ...e, parentheses: true };
//    }
//  / LPAREN __ list:expr_list __ RPAREN {
//        return { ...list, parentheses: true };
//    }
//  / var_decl
//  / interval_expr

FuncCall
  = AggrFunc
  / name:name _ "(" _ Exprs _ ")"

AggrFunc
  = name:KW_COUNT _ "(" _ expr:StarExpr _ ")" {
      return { type: "AggrFunc", name, args: [expr] };
    }
  / count

StarExpr = "*" { return { type: "start" }; }

Exprs = head:Expr tail:(_ "," _ Expr)* _ ","?

// func_call
//   = name:ident __ LPAREN __ l:expr_list? __ RPAREN {
//       return { type: 'function', name, args: l ? l : { type: 'expr_list', value: [] } };
//     }
//   / name:(KW_YEAR / KW_MONTH / KW_DAY / KW_HOUR / KW_MINUTE) __ LPAREN __ l:expr_list? __ RPAREN {
//       return { type: 'function', name, args: l ? l : { type: 'expr_list', value: [] } };
//     }
//   / name:scalar_func {
//       return { type: 'function', name, args: { type: 'expr_list', value: [] } };
//     }

// scalar_func
//   = KW_CURRENT_DATE
//   / KW_CURRENT_TIME
//   / KW_CURRENT_TIMESTAMP
//   / KW_CURRENT_USER
//   / KW_USER
//   / KW_SESSION_USER
//   / KW_SYSTEM_USER

CompoundExpr
  = left:RelExpr
    rest:(__ op:logic __ right:CompoundExpr { return { op, right }; })? {
      return logic(rest?.op, left, rest?.right);
    }

RelExpr
  = "(" value:Expr ")" { return { type: "paren", value }; }
  / "!" value:RelExpr { return { type: "not", value }; }
  / field:Field __ "between" __ value1:literal __ "and" __ value2:literal
  / field:Field
    _
    op:(">=" / "<=" / "<>" / ">" / "<" / "===" / "==" / "!=" / "=" / ":")
    _
    value:literal
  / field:Field _ op:("@>" / "<@" / "&&") _ value:Array
  / field:Field _ op:"~" _ value:string
  / field:Field __ op:(is __ null)
  / field:Field __ op:(is __ not __ null)
  / field:Field __ op:((not __)? in) __ value:Array
  / field:Field __ op:((not __)? (like / ilike)) __ value:string

//  = left:InExpr rest:(_ op:('>=' / '<='/ '<>' /  '>' / '<' / '==' / '!='  / '=' / '@<' / '@>') _ right:RelExpr {return {op,right}}) ? {return rest?{type:'rel',op:rest.op,left,right:rest.right}:left}

// InExpr
//   = left:PredicateExpr rest:(__ op:((not __)? in) _ values:Array {return {op:_op(op),values}})? {return rest?{type:'in',left,...rest}:left}

// PredicateExpr
//   = left:BetweenExpr rest:(
// 	__ op:(is __ (not __)?) right:(null / bool) {return {op:_op(op),right}}
// 	/ __ op:((not __)?  like) __ right:string {return {op:_op(op),right}}
//   )? {return rest?{type:'predicate',left,...rest}:left}

// BetweenExpr
//   = left:CallExpr rest:(__ op:((not __)? between) __ a:CallExpr _ and _ b:CallExpr {return {op:_op(op),a,b}}) ? {return rest?{type:'between',left,...rest}:left}

// CallExpr
//   = name:name '(' _ Values _ ')' {return {type:'function',name}}
//   / next:PriExpr {return next}

// PriExpr
//   = '(' expr:Expr ')' {return {type:'paren',expr}} // paren
//   / not __ expr:Expr {return {type:'not',expr}} // not
//   // / Array
//   / next:Value {return next}
//   / '+' _ expr:Expr {return {type:'positive',expr}}// pos
//   / '-' expr:Expr {return {type:'negetive',expr}}// neg

Field
  = ref
  / name

JsonReference = field (("->" / "->>") string)+

field
  = ident
  / ref

Value
  = literal
  / ref
  / ident

Values
  = next:(
    a:Value _ b:(_ "," _ next:Value { return next; })* ","? {
        return b ? [a, ...b] : a;
      }
  )? { return next || []; }

Array
  = "[" next:Values "]" { return next; }
  / "(" next:Values ")" { return next; }

ident = name { return { type: "id", name: text() }; }

ref = a:name|1.., _ "." _| { return { type: "ref", value: a }; }

name = ([a-zA-Z] [_a-zA-Z0-9]*) { return text(); }

in
  = "in"
  / "IN" { return "in"; }

is
  = "is"
  / "IS" { return "is"; }

like
  = "like"
  / "LIKE" { return "like"; }

ilike
  = "ilike"
  / "ILIKE" { return "ilike"; }

between
  = "between"
  / "BETWEEN" { return "between"; }

and = ("and" / "AND") { return "and"; }

not = ("not" / "NOT") { return "not"; }

or = ("or" / "OR") { return "or"; }

logic
  = and
  / or

as = "AS"i !ident_start

count = "count"i !ident_start

literal
  = string
  / float
  / int
  / bool
  / null

int = [1-9] [0-9]* { return { type: "integer", value: parseInt(text()) }; }

float
  = [0-9]* "." [0-9]+ { return { type: "float", value: parseFloat(text()) }; }

string
  = "'" v:[^']* "'" { return { type: "string", value: v.join("") }; }
  / "\"" v:[^"]* "\"" { return { type: "string", value: v.join("") }; }

null = ("null" / "NULL") { return { type: "null", value: null }; }

bool
  = ("true" / "false" / "TRUE" / "FALSE") {
      return { type: "boolean", value: text().toLowerCase() === "true" };
    }

ident_start = [A-Za-z_]

KW_AND = "and"i !ident_start
KW_AS = "as"i !ident_start
KW_AVG = "avg"i !ident_start
KW_BETWEEN = "between"i !ident_start
KW_COUNT = "count"i !ident_start
KW_IN = "in"i !ident_start
KW_IS = "is"i !ident_start
KW_LIKE = "like"i !ident_start
KW_MAX = "max"i !ident_start
KW_MIN = "min"i !ident_start
KW_NOT = "not"i !ident_start
KW_OR = "or"i !ident_start
KW_SUM = "sum"i !ident_start

_ "whitespace" = white* { return ""; }

__ "whitespace" = white+ { return " "; }

white
  = "/*" [^*]* "*/"
  / "--" [^\r\n]* ("\n" / EOF)
  / [ \t\n\r]

EOF = !.
