/*
MiniQuery AST Grammar
=====================
grammar: https://github.com/wenerme/wener/blob/master/notes/languages/parser/peg/miniquery.peggy
playground: https://peggyjs.org/online

### Rules

- PascalCase for Grammar
- snake_case for Tokens
- UPPER_CASE for Keywords

### Reference

- https://www.postgresql.org/docs/current/sql-select.html
- https://www.postgresql.org/docs/current/sql-expressions.html
- https://google.aip.dev/160
- SQLite Grammar https://www.sqlite.org/syntaxdiagrams.html
- SQL Parser https://github.com/florajs/sql-parser/blob/main/sql.pegjs
- Formatter https://siefkenj.github.io/prettier-pegjs-playground/
*/

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

{{
  /* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */
  // ts-nocheck

  const OPS = {
    "!": "NOT",
    "&&": "AND",
    "||": "OR",
    "==": "=",
    "===": "=",
  };

  const KEYWORDS = new Set([
		"FALSE",
		"NULL",
		"TRUE",
    "AND",
    "AS",
    "BETWEEN",
    "CASE",
    "ELSE",
    "END",
    "ILIKE",
    "IN",
    "IS",
    "LIKE",
    "LIKE",
    "NOT",
    "OR",
    "RLIKE",
    "THEN",
    "WHEN",
  ]);

  function _op(op) {
    let s = Array.isArray(op)
      ? op
          .flat()
          .filter((v) => v && v.trim())
          .join(" ")
      : op;
    s = s.toUpperCase();
    return OPS[s] || s;
  }
}}

{
  function createUnaryExpr(op, expr) {
    return { type: "unary", op: _op(op), expr };
  }
  function createBinaryExpr(op, left, right) {
    return { type: "binary", op: _op(op), left, right };
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

  function buildChain(head, tail) {
    if (!tail?.length) return head;

    return tail.filter(Boolean).reduce((left, element) => {
      //    return [result, element]
      // element  [ _, op, _, expr ]
      const op = _op(element[1]);
      const right = element[3];
      switch (op) {
        case "OR":
        case "AND":
        case "XOR":
          if (left.op === op) {
            left.exprs.push(right);
            return left;
          }
          return { type: "logic", op, exprs: [left, right] };
      }

      return { type: "binary", op, left, right };
    }, head);
  }
}

Main = QueryExpr

QueryExpr = @value:Expr EOF

AliasExpr
  = expr:Expr alias:(_ as _ @name:name)? {
      return !alias ? expr : { type: "alias", expr, alias };
    }

Expr = _ @expr:OrExpr _

OrExpr = head:AndExpr tail:(_ or _ AndExpr)* { return buildChain(head, tail); }

AndExpr
  = head:NotExpr tail:(_ and _ NotExpr)* { return buildChain(head, tail); }

NotExpr
  = op:(not / "!") !"=" _ expr:NotExpr { return createUnaryExpr(op, expr); }
  / ComparisonExpr

ComparisonExpr
  = left:AdditiveExpr _ right:ComparisonRightExpr? {
      if (right) {
        const { op, right: r, ...rest } = right;
        return { type: "compare", op, left, right: r, ...rest };
      }
      return left;
    }

ComparisonRightExpr
  = op:comparison_operator _ right:AdditiveExpr {
      return { op: _op(op), right };
    }
  / op:(not? _ in) _ right:List { return { op: _op(op), right }; }
  / op:(not? _ between) _ a:Value _ and _ b:Value {
      return { op: _op(op), right: { type: "list", items: [a, b] } };
    }
  / op:(is _ not?) _ right:(null / bool) { return { op: _op(op), right }; }
  / op:(not? _ like) _ right:string { return { op: _op(op), right }; } // only support string

AdditiveExpr
  = head:MultiplicativeExpr tail:(_ ("+" / "-") _ MultiplicativeExpr)* {
      return buildChain(head, tail);
    }

MultiplicativeExpr
  = head:PrimaryExpr tail:(_ ("*" / "/" / "%") _ PrimaryExpr)* {
      return buildChain(head, tail);
    }

PrimaryExpr
  = "(" _ @expr:Expr _ ")"
  / CaseExpr
  / FunctionCall
  / AnyValue

CaseExpr
  = case _ condition:Expr? _ cases:CaseWhenThen+ ele:CaseElse? _ end {
      return {
        type: "case",
        condition,
        cases,
        ...(ele ? { else: ele[1] } : {}),
      };
    }

CaseWhenThen = when _ when:Expr _ then _ then:Expr { return { when, then }; }

CaseElse = else _ expr:Expr { return ["ELSE", expr]; }

FunctionCall
  = name:name _ "(" _ args:Values? _ ")" {
      return { type: "func", name, args: args || [] };
    }

JsonRef = ref (("->" / "->>") string)+

Exprs = head:Expr tail:(_ "," _ Expr)* _ ","?

Value
  = literal
  / ref

Values
  = next:(
    a:Value _ b:(_ "," _ next:Value { return next; })* ","? {
        return b ? [a, ...b] : a;
      }
  )? { return next || []; }

// allowed using [] or ()
// allowed tail with ,
List
  = "[" _ items:Values? _ "]" { return { type: "list", items: items || [] }; }
  / "(" _ items:Values? _ ")" { return { type: "list", items: items || [] }; }

AnyValue
  = List
  / Value

ref = a:name|1.., _ "." _| { return { type: "ref", value: a }; }

name
  = name:bare_name ! { return KEYWORDS.has(name.toUpperCase()); } {
      return name;
    }

bare_name = ([a-zA-Z] [_a-zA-Z0-9]*) { return text(); }

case = ("case" / "CASE") !identifier_start { return "CASE"; }

when = ("when" / "WHEN") !identifier_start { return "WHEN"; }

then = ("then" / "THEN") !identifier_start { return "THEN"; }

else = ("else" / "ELSE") !identifier_start { return "ELSE"; }

end = ("end" / "END") !identifier_start { return "END"; }

in = ("in" / "IN") !identifier_start { return "IN"; }

is = ("is" / "IS") !identifier_start { return "IS"; }

like = ("like" / "LIKE") !identifier_start { return "LIKE"; }

ilike = ("ilike" / "ILIKE") !identifier_start { return "ILIKE"; }

rlike = ("rlike" / "RLIKE") !identifier_start { return "RLIKE"; }

between = ("between" / "BETWEEN") !identifier_start { return "BETWEEN"; }

and = ("and" / "AND" / "&&") !identifier_start { return "AND"; }

not = ("not" / "NOT") !identifier_start { return "NOT"; }

or = ("or" / "OR" / "||") !identifier_start { return "OR"; }

as = "AS"i !identifier_start

count = "count"i !identifier_start

literal
  = string
  / float
  / int
  / bool
  / null

int
  = ("+" / "-")? [0-9]+ { return { type: "literal", value: parseInt(text()) }; }

float
  = ("+" / "-")? ([0-9]+)? "." [0-9]+ {
      return { type: "literal", value: parseFloat(text()) };
    }

string
  = "'" v:[^']* "'" { return { type: "literal", value: v.join("") }; }
  / "\"" v:[^"]* "\"" { return { type: "literal", value: v.join("") }; }

null = ("null" / "NULL") { return { type: "literal", value: null }; }

bool
  = ("true" / "false" / "TRUE" / "FALSE") {
      return { type: "literal", value: text().toLowerCase() === "true" };
    }

comparison_operator
  = ">="
  / "<="
  / "<>"
  / ">"
  / "<"
  / "=="
  / "!="
  / "="
  / "@>"
  / "<@"
  / "~"

identifier_start = [A-Za-z0-9_]

_ "whitespace" = white* { return ""; }

__ "whitespace" = white+ { return " "; }

white
  = "/*" [^*]* "*/"
  / "--" [^\r\n]* ("\n" / EOF)
  / [ \t\n\r]

EOF = !.
