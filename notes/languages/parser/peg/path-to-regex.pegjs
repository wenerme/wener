/*
Base on path-to-regex syntax
extends
  Chinese param name
  param options
  allowed ()[]
  escape \*a\:b\{c\}

\*a\:b\{c\}
*c\*c\{\}/a\:b/ab[(c/]):你好&[f=1.1,i=32,t='#',b=true]{.:ext}/*hello/:'a-b'-:"a-b"
*/
Template
  = tokens:Token* EOF { return tokens }

Token
  = Group
  / Wildcard
  / Param
  / Text

Text
  = value:_part+ { return { type: "text", value: value.join("") }; }

// optional escape }
_part
  = $([^:*{\\]+)
  / "\\" v:[:*{}\\] {return v}

Param
  = ":" name:ParamName options:Options? { return { type: "param", name, options }; }

Wildcard
  = "*" name:ParamName? { return { type: "wildcard", name }; }
Group
  = "{" tokens:Token+ "}" { return { type: "group", tokens }; }

Options
  = "&[" opts:Option|0..,','| "]" { return Object.fromEntries(opts.map(({key,value})=>[key,value])); }

Option
  = key:ParamName "=" value:ParamValue { return { key, value }; }

ParamValue
  = [0-9]+('.'[0-9]+)? {return parseFloat(text())}
  / ('true'/'false') {return text() === 'true'}
  / $([a-zA-Z][a-zA-Z0-9_]*)
  / "'" v:[^']* "'" { return v.join(""); }
  / '"' v:[^"]* '"' { return v.join(""); }

// abc
// 你好
// 'a-b'
ParamName
  = $([a-zA-Z_][a-zA-Z0-9_]*)
  / $([\u4e00-\u9fa5][\u4e00-\u9fa5a-zA-Z0-9_]*)
  / "'" v:([^']*) "'" {return v.join('')}
  / '"' v:[^"]* '"'   {return v.join('')}

EOF = !.
