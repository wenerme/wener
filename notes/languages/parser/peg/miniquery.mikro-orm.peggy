// https://peggyjs.org/online
/*
a > 1 or
-- comment
(b < 2 or c.d.e = true )
--
and a not in [1,2,3,]
and a between 1 and 2
-- contains
and tags @> ['Hello']
and !( tags @> ['Hello'] )
*/
{{
  /* eslint-disable @typescript-eslint/interface-name-prefix,@typescript-eslint/no-empty-interface,no-case-declarations,no-control-regex,prefer-const */
  // ts-nocheck
  const pick = (obj, keys) => keys.reduce((o, k) => ((o[k] = obj[k]), o), {});
  // https://mikro-orm.io/docs/query-conditions
  const OPERATORS = {
    ">=": "$gte",
    "<=": "$lte",
    ">": "$gt",
    "<": "$lt",
    // ":":"$eq",// fixme has
    "=": "$eq",
    "==": "$eq",
    "===": "$eq",
    "<>": "$ne",
    "!=": "$ne",
    in: "$in",
    "not in": "$nin",
    "&&": "$and",
    and: "$and",
    "||": "$or",
    or: "$or",
    nor: "$nor",
    "!": "$not",
    "~": "$re",
    like: "$like",
    ilike: "$ilike",
    // https://www.postgresql.org/docs/current/functions-json.html
    "@>": "$contains",
    "<@": "$contained",
    // $overlap	&&
    // https://www.postgresql.org/docs/current/functions-textsearch.html
    // $fulltext
    between: "$between",
  };
  // https://www.postgresql.org/docs/current/functions-array.html
  const ARRAY_OPERATORS = Object.assign(
    { "&&": "$overlap" },
    pick(OPERATORS, ["@>", "<@"])
  );
}}

{
  function _op(op) {
    if (typeof op === "string" && op.startsWith("$")) return op;
    op = !Array.isArray(op)
      ? op
      : op
          .flat()
          .filter((v) => v && v.trim())
          .join(" ")
          .toLowerCase();
    return OPERATORS[op] || (console.error("unexpected op", op), op);
  }
  function _compound(op, a, b) {
    if (!op) return a;
    op = _op(op);
    if (b[op]) return { [op]: [a, ...b[op]] };
    return { [op]: [a, b] };
  }
  function _make(field, op, a, b) {
    // NOTE 如果做了 join 支持 {'a.b':{$gt:1}}
    const out = {};
    let cur = out;
    if (Array.isArray(field)) {
      for (const v of field) {
        cur = cur[v] ||= {};
      }
    } else {
      cur = out[field] ||= {};
    }
    switch (op) {
      case "$between":
        cur["$gte"] = a;
        cur["$lte"] = b;
        break;
      default:
        cur[_op(op)] = a;
        break;
    }
    return out;
  }
}

// https://github.com/stalniy/ucast
// https://www.mongodb.com/docs/manual/reference/operator/query/
Main = next:QueryExpr EOF { return next; }

// miniquery
QueryExpr = _ @next:CompoundExpr _

Expr = _ next:CompoundExpr _ { return next; }

CompoundExpr
  = left:RelExpr
    rest:(
      op:(_ ("&&" / "||") _ / (__ (and / or) __)) right:CompoundExpr {
          return { op, right };
        }
    )? { return rest?.right ? _compound(rest?.op, left, rest?.right) : left; }

RelExpr
  = "(" next:Expr ")" { return next; } // NOTE: and > or
  / "!" next:RelExpr { return { $not: next }; }
  / field:Field __ "between" __ value1:literal __ "and" __ value2:literal {
      return _make(field, "$between", value1, value2);
    }
  / field:Field
    _
    op:(">=" / "<=" / "<>" / ">" / "<" / "===" / "==" / "!=" / "=" / ":")
    _
    value:literal { return _make(field, op, value); }
  / field:Field _ op:("@>" / "<@" / "&&") _ value:Array {
      return _make(field, ARRAY_OPERATORS[op], value);
    }
  / field:Field _ op:"~" _ value:string { return _make(field, op, value); }
  / field:Field __ op:(is __ null) { return _make(field, "=", null); }
  / field:Field __ op:(is __ not __ null) { return _make(field, "!=", null); }
  / field:Field __ op:((not __)? in) __ value:Array {
      return _make(field, op, value);
    }
  / field:Field __ op:((not __)? (like / ilike)) __ value:string {
      return _make(field, op, value);
    }

FunctionExpr
  = name:name _ "(" _ args:Values? _ ")" {
      return { type: "function", name, values: args || [] };
    }

ValueExpr
  = FunctionExpr
  / Field
  / Value

Field
  = ref
  / name

// Value   = literal / Field
Value = literal

// Values = next:(a:Value _ b:(_ ',' _ next:Value {return next})* ','? {return b?[a,...b]:a})? {return next || []}
Values = next:Value|.., _ "," _| _ ","? { return next || []; }

Array
  = "[" _ next:Values _ "]" { return next; }
  / "(" _ next:Values _ ")" { return next; }

//ref     = a:name b:('.' v:name {return v})+ {return [a,...b].join('.')}
ref = a:name|1.., _ "." _| { return a; }

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

literal
  = string
  / float
  / int
  / bool
  / null

int = [0-9]+ { return parseInt(text()); }

float = [0-9]+ "." [0-9]+ { return parseFloat(text()); }

string
  = "'" v:[^']* "'" { return v.join(""); }
  / "\"" v:[^"]* "\"" { return v.join(""); }

null = ("null" / "NULL") { return null; }

bool
  = ("true" / "false" / "TRUE" / "FALSE") {
      return text().toLowerCase() === "true";
    }

ident_start = [A-Za-z_]

KW_AND = "and" !ident_start

KW_OR = "or" !ident_start

_ "whitespace" = white* { return ""; }

__ "whitespace" = white+ { return " "; }

white
  = "/*" [^*]* "*/"
  / "--" [^\r\n]* ("\n" / EOF)
  / [ \t\n\r]

EOF = !.
