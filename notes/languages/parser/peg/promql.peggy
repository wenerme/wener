/*
PromQL AST Grammar
==================
grammar: https://github.com/wenerme/wener/blob/master/notes/languages/parser/peg/promql.peggy
playground: https://peggyjs.org/online

### Scope

- PromQL syntax parser with a typed AST shape.
- Grafana template refs are accepted as syntax placeholders:
  - `$job`
  - `$__rate_interval`
  - `${env}`
  - `${env:regex}`
- Grafana macro-like calls are accepted where template refs can appear:
  - `$__timeGroup(created_at, $__interval)`
- This grammar focuses on syntax shape, not full Prometheus semantic type checking.

### AST Notes

- Expressions use PascalCase discriminants, e.g. `BinaryExpression`, `VectorSelector`, `MatrixSelector`.
- Binary operators are parsed by precedence: `or/unless` -> `and` -> comparison -> add -> multiply -> power.
- Label matchers use PromQL matcher operators only: `=`, `!=`, `=~`, `!~`.
- Subquery ranges are supported: `[30m:$__interval]`.
*/

/*
Examples
========

# instant vector
up
http_requests_total{job="api", env=~"${env:regex}"}
{__name__=~"go_.*", pod=~"$pod"}

# range vector and duration
rate(http_requests_total{job="api"}[5m])
sum(rate(container_cpu_usage_seconds_total{container="server", env=~"${env_name}"}[$__rate_interval]))

# aggregate modifiers
sum by (job, instance) (rate(http_requests_total[5m]))
count without (pod) (up{job="api"})
topk(5, sum by (model) (rate(request_total[5m])))

# binary operators and vector matching
rate(errors_total[5m]) / rate(requests_total[5m])
rate(container_cpu_usage_seconds_total{container="server",env=~"${env_name}"}[$__rate_interval])
  * on(pod, env) group_left(rollouts_pod_template_hash)
    go_goroutines{app="server", env=~"${env_name}"}

# bool comparison and set operators
up == bool 0
up{job="api"} unless up{job="worker"}
up{job="api"} or up{job="worker"}

# subquery
avg_over_time(rate(http_requests_total[5m])[30m:$__interval])

# strings with template refs / macro-like calls
label_replace(up{job="$job"}, "dst", "${env}", "src", "(.*)")
request_bucket{bucket="$__timeGroup(created_at, $__interval)"}

# Grafana macro-like call in range/template position
rate(request_total[$__timeGroup(created_at, $__interval)])

# comments
# one-line comments are accepted
sum(rate(foo_total[5m])) # trailing comment
*/

// PromQL grammar used by wode-gf-cli to generate parser.js/parser.d.ts.
// In wode-gf-cli generate with: just promql-generate

{
  function foldBinary(left, tail) {
    return tail.reduce((acc, item) => ({
      type: "BinaryExpression",
      operator: item.operator,
      left: acc,
      right: item.right,
      vectorMatching: item.vectorMatching || undefined,
    }), left);
  }

  function makeTemplateRef(raw, braced) {
    const body = braced ? raw.slice(2, -1) : raw.slice(1);
    const parts = body.split(":");
    return {
      type: "TemplateRef",
      raw,
      name: parts[0],
      format: parts[1] || undefined,
      braced,
    };
  }

  function makeString(quote, parts, raw) {
    return {
      type: "StringLiteral",
      raw,
      quote,
      value: parts.map((part) => part.raw).join(""),
      parts,
    };
  }

  function combineVectorMatching(parts) {
    const out = { type: "VectorMatching" };
    for (const part of parts) {
      if (part.type === "bool") out.returnBool = true;
      else if (part.type === "matching") out.labelMatching = { operator: part.operator, labels: part.labels };
      else if (part.type === "group") out.groupModifier = { operator: part.operator, labels: part.labels };
    }
    return out.returnBool || out.labelMatching || out.groupModifier ? out : undefined;
  }

  function makeDuration(parts, raw) {
    return { type: "DurationLiteral", raw, parts };
  }
}

Start = _ expr:Expr _ EOF { return expr; }

Expr = OrExpr

OrExpr
  = head:AndExpr tail:(_ operator:OrOperator _ vectorMatching:VectorMatching? right:AndExpr {
      return { operator, vectorMatching, right };
    })* {
      return foldBinary(head, tail);
    }

AndExpr
  = head:CompareExpr tail:(_ operator:AndOperator _ vectorMatching:VectorMatching? right:CompareExpr {
      return { operator, vectorMatching, right };
    })* {
      return foldBinary(head, tail);
    }

CompareExpr
  = head:AddExpr tail:(_ operator:CompareOperator _ vectorMatching:VectorMatching? right:AddExpr {
      return { operator, vectorMatching, right };
    })* {
      return foldBinary(head, tail);
    }

AddExpr
  = head:MulExpr tail:(_ operator:AddOperator _ vectorMatching:VectorMatching? right:MulExpr {
      return { operator, vectorMatching, right };
    })* {
      return foldBinary(head, tail);
    }

MulExpr
  = head:PowExpr tail:(_ operator:MulOperator _ vectorMatching:VectorMatching? right:PowExpr {
      return { operator, vectorMatching, right };
    })* {
      return foldBinary(head, tail);
    }

PowExpr
  = left:UnaryExpr _ operator:"^" _ vectorMatching:VectorMatching? right:PowExpr {
      return { type: "BinaryExpression", operator, left, right, vectorMatching: vectorMatching || undefined };
    }
  / UnaryExpr

UnaryExpr
  = operator:("+" / "-") _ argument:UnaryExpr { return { type: "UnaryExpression", operator, argument }; }
  / PostfixExpr

PostfixExpr
  = primary:Primary _ "[" _ range:Range _ resolution:SubqueryResolution? "]" {
      if (resolution) return { type: "SubqueryExpression", expression: primary, range, resolution };
      if (primary.type !== "VectorSelector") error("Range selector can only follow a vector selector");
      return { type: "MatrixSelector", vector: primary, range };
    }
  / Primary

Primary
  = AggregateExpr
  / FunctionCall
  / TemplateCallExpr
  / VectorSelector
  / NumberLiteral
  / StringLiteral
  / TemplateRef
  / "(" _ expression:Expr _ ")" { return { type: "ParenthesizedExpression", expression }; }

AggregateExpr
  = operator:AggregateOp _ groupingBefore:AggregateGrouping? _ "(" _ args:Args? _ ")" _ groupingAfter:AggregateGrouping? {
      return { type: "AggregateExpression", operator, arguments: args || [], grouping: groupingBefore || groupingAfter || undefined };
    }

FunctionCall
  = callee:Identifier _ "(" _ args:Args? _ ")" { return { type: "CallExpression", callee, arguments: args || [] }; }

TemplateCallExpr
  = callee:TemplateRef _ "(" _ args:TemplateCallArgs? _ ")" { return { type: "TemplateCallExpression", callee, arguments: args || [] }; }

Args
  = head:Expr tail:(_ "," _ next:Expr { return next; })* _ ","? {
      return [head, ...tail];
    }

TemplateCallArgs
  = head:TemplateCallArg tail:(_ "," _ next:TemplateCallArg { return next; })* _ ","? {
      return [head, ...tail];
    }

TemplateCallArg
  = DurationLiteral
  / Expr

VectorSelector
  = metricName:Identifier? _ matchers:LabelMatchers { return { type: "VectorSelector", metricName: metricName || undefined, matchers }; }
  / metricName:Identifier { return { type: "VectorSelector", metricName, matchers: [] }; }

LabelMatchers
  = "{" _ items:LabelMatcherList? _ "}" { return items || []; }

LabelMatcherList
  = head:LabelMatcher tail:(_ "," _ next:LabelMatcher { return next; })* _ ","? {
      return [head, ...tail];
    }

LabelMatcher
  = label:Identifier _ operator:LabelOperator _ value:StringLiteral {
      return { type: "LabelMatcher", label, operator, value };
    }

AggregateGrouping
  = modifier:AggregateGroupingModifier _ labels:GroupingLabels { return { type: "AggregateGrouping", modifier, labels }; }

GroupingLabels
  = "(" _ labels:IdentifierList? _ ")" { return labels || []; }

IdentifierList
  = head:Identifier tail:(_ "," _ next:Identifier { return next; })* _ ","? {
      return [head, ...tail];
    }

VectorMatching
  = parts:VectorMatchingPart+ !VectorMatchingKeyword { return combineVectorMatching(parts); }

VectorMatchingPart
  = BoolKeyword _ { return { type: "bool" }; }
  / operator:MatchingKeyword _ labels:GroupingLabels _ { return { type: "matching", operator, labels }; }
  / operator:GroupKeyword _ labels:GroupingLabels? _ {
      return { type: "group", operator, labels: labels || [] };
    }

Range
  = TemplateCallExpr
  / TemplateRef
  / DurationLiteral

SubqueryResolution
  = _ ":" _ resolution:Range? { return resolution; }

DurationLiteral
  = parts:DurationPart+ { return makeDuration(parts, text()); }

DurationPart
  = value:$([0-9]+) unit:DurationUnit {
      return { type: "DurationPart", value: Number.parseInt(value, 10), unit, raw: text() };
    }

TemplateRef
  = raw:$("${" TemplateName (":" TemplateFormat)? "}") { return makeTemplateRef(raw, true); }
  / raw:$("$" TemplateName) { return makeTemplateRef(raw, false); }

StringLiteral
  = value:('"' parts:DoubleStringPart* '"' { return { raw: text(), parts }; }) { return makeString('"', value.parts, value.raw); }
  / value:("'" parts:SingleStringPart* "'" { return { raw: text(), parts }; }) { return makeString("'", value.parts, value.raw); }

DoubleStringPart
  = call:TemplateCallExpr { return call; }
  / ref:TemplateRef { return ref; }
  / raw:$("\\" . / !('"' / "$") .)+ { return { type: "StringText", raw, value: raw }; }

SingleStringPart
  = call:TemplateCallExpr { return call; }
  / ref:TemplateRef { return ref; }
  / raw:$("\\" . / !("'" / "$") .)+ { return { type: "StringText", raw, value: raw }; }

NumberLiteral
  = raw:$(("0x" [0-9a-fA-F]+) / ([0-9]+ ("." [0-9]*)? / "." [0-9]+) ([eE] [+-]? [0-9]+)?) {
      return { type: "NumberLiteral", raw, value: Number(raw) };
    }

OrOperator = operator:("or" / "unless") !IdentifierContinue { return operator; }
AndOperator = operator:"and" !IdentifierContinue { return operator; }
CompareOperator = operator:("==" / "!=" / "<=" / ">=" / "<" / ">") { return operator; }
AddOperator = operator:("+" / "-") { return operator; }
MulOperator = operator:("*" / "/" / "%") { return operator; }
LabelOperator = operator:("=~" / "!~" / "!=" / "=") { return operator; }

VectorMatchingKeyword = BoolKeyword / MatchingKeyword / GroupKeyword
BoolKeyword = "bool" !IdentifierContinue
MatchingKeyword = keyword:("on" / "ignoring") !IdentifierContinue { return keyword; }
GroupKeyword = keyword:("group_left" / "group_right") !IdentifierContinue { return keyword; }
AggregateGroupingModifier = keyword:("by" / "without") !IdentifierContinue { return keyword; }
AggregateOp = operator:("count_values" / "bottomk" / "quantile" / "stddev" / "stdvar" / "count" / "group" / "topk" / "sum" / "min" / "max" / "avg") !IdentifierContinue { return operator; }
DurationUnit = "ms" / "s" / "m" / "h" / "d" / "w" / "y"

Identifier = $([A-Za-z_:] [A-Za-z0-9_:]*)
TemplateName = $([A-Za-z_] [A-Za-z0-9_]*)
TemplateFormat = $([A-Za-z0-9_]+)
IdentifierContinue = [A-Za-z0-9_:]

_ = ([ \t\n\r] / Comment)*
Comment = "#" (!([\n\r]) .)*
EOF = !.
