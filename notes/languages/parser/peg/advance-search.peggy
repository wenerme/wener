/*
Grammar for advance search query

grammar: https://github.com/wenerme/wener/tree/master/tricks/languages/parser/peg/advance-search.peggy
js: https://github.com/wenerme/wode/tree/main/packages/wener-common
playground: https://peggyjs.org/online
================================

ok OR yes AND NO AND NO
QUALIFIER.a:@me is:yes AND yes HELLO WORLD
start:>2019-09-12T12:20:30.123+08:00
a:[2, 1 ) -owner:@me AND YES
-a a yes OR KEY
NOT NOT AND AND OR OR
NOT -a
(NOT hello)
@AI:"Where is my car"
owner:@me
owner:!=@me
(a OR B)
( a OR "B )" )
*/

{
  const OPERATORS = {
    ":": "has",
    ":=": "eq",
    ":!=": "ne",
    ":>": "gt",
    ":>=": "gte",
    ":<": "lt",
    ":<=": "lte",
  };
}

// todo make /**/b works
Main = @Exprs EOF

Exprs = _ @Expr|1.., __| _

Expr
  = Comment
  / OrExpr

Comment
  = "/*" value:$[^*]* "*/" { return { type: "comment", value: value.trim() }; }

OrExpr
  = head:AndExpr tail:(__ KW_OR __ @AndExpr)* {
      return !tail.length
        ? head
        : { type: "logical", operator: "or", value: [head].concat(tail) };
    }

AndExpr
  = head:NotExpr tail:(__ KW_AND __ @NotExpr)* {
      return !tail.length
        ? head
        : { type: "logical", operator: "and", value: [head].concat(tail) };
    }

NotExpr
  = KW_NOT __ value:NotExpr { return { type: "not", value }; }
  / @ParenthesesExpr

ParenthesesExpr
  = "(" _ value:Exprs _ ")" { return { type: "parentheses", value }; }
  / @ComparisonExpr

ComparisonExpr
  = modifier:(negative:"-" { return { negative: true }; } / "+" { return {}; })?
    expr:(
      field:field operator:":" value:range {
          return { type: "compare", field, operator: "range", value };
        }
      / field:field operator:(":=" / ":!=" / ":") value:mention {
          return {
            type: "compare",
            field,
            operator: operator === ":!=" ? "ne" : "eq",
            value,
          };
        }
      / field:field
        operator:(":=" / ":>" / ":<" / ":>=" / ":<=" / ":!=" / ":")
        value:value {
          return {
            type: "compare",
            field,
            operator: OPERATORS[operator],
            value,
          };
        }
    ) { return { ...expr, ...modifier }; }
  / "@" field:field ":" value:string {
      return {
        type: "compare",
        field,
        operator: "has",
        value: { value },
        mention: true,
      };
    }
  / KeywordExpr

KeywordExpr
  = negative:"-"? value:string {
      return {
        type: "keyword",
        negative: Boolean(negative),
        value,
        exact: true,
      };
    }
  / negative:"-"? value:keyword {
      return { type: "keyword", negative: Boolean(negative), value };
    }

keyword = [^-+,'" \r\n\t()] [^ \r\n\t)]* { return text(); }

// support field,
// support field.key
// MAYBE field.*, field.0
// MAYBE date(field)
field = $ident|1.., "."|

range
  = minimum:(value / "*") ".." maximum:(value / "*") {
      return {
        type: "range",
        minimum: minimum === "*" ? undefined : minimum,
        maximum: maximum === "*" ? undefined : maximum,
      };
    }
  / minimumBoundary:[\[(]
    _
    minimum:value?
    _
    ","
    _
    maximum:value?
    _
    maximumBoundary:[)\]] {
      return {
        type: "range",
        minimum,
        maximum,
        minimumExclusive: minimumBoundary === "(",
        maximumExclusive: maximumBoundary === ")",
      };
    }

mention = "@" value:ident { return { format: "mention", value }; }

value
  = @date
  / value:(ident / literal) { return { type: "literal", value }; }

// date-fns yyyy-MM-dd'T'HH:mm:ss.SSSXXX
// dayjs YYYY-MM-DDTHH:mm:ss.SSSZ
date
  = ([1-9] [0-9]|3| "-" [0-9]|1..2| "-" [0-9]|1..2|) // date
    time:(
      "T"
        ([0-9]|1..2| ":" [0-9]|1..2| ":" [0-9]|1..2|) // time
        ("." [0-9]|1..3|)? // mills
        ("Z" / "+" [0-9]|1..2| ":" [0-9]|1..2|)? // zone
    )? { return { format: time ? "date-time" : "date", value: text() }; }

ident = ([a-zA-Z] [_a-zA-Z0-9]*) { return text(); }

literal
  = string
  / float
  / int
  / bool
  / null

number = ([0-9]+ ("." [0-9]+)? / "." [0-9]+) { return parseFloat(text()); }

// todo escape
string = "\"" v:[^"]* "\"" { return v.join(""); }

bool = ("true" / "false") { return text().toLowerCase() === "true"; }

int = [0-9]+ { return parseInt(text()); }

float = [0-9]+ "." [0-9]+ { return parseFloat(text()); }

null = "null" { return null; }

ident_start = [A-Za-z_]

KW_OR = "OR" !ident_start

KW_AND = "AND" !ident_start

KW_NOT = "NOT" !ident_start

_ "whitespace" = white* { return ""; }

__ "whitespace" = white+ { return " "; }

white = [ \t\n\r]

EOF = !.
