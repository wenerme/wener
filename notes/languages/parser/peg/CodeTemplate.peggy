/*
Grammar for doc code template

grammar: https://github.com/wenerme/wener/blob/master/notes/languages/parser/peg/code-template.peggy
playground: https://peggyjs.org/online
================================
Based on path-to-regex syntax
base syntax
  TEXT
  :PARAM
  {GROUP}
extends syntax
  Chinese param name
  param options `:a&[]`
  allowed ()[]
  escape \*a\:b\{c\}

Examples
==========
:a-:b&[nf="###",title="TEST"]
:全宗号-:档案门类代码·:二级类别号·:年度-:机构-:保管期限代码-:案卷号-:件号
:存储区号-:列号-:节号-:层号
\*a\:b\{c\}
*c\*c\{\}/a\:b/ab[(c/]):你好&[f=1.1,i=32,t='#',b=true]{.:ext}/*hello/:'a-b'-:"a-b"
{a}&[ a=1 , b=2 ]
*&[a=1]
*&[arr=[1,true,"3",null,[],{}],obj={"a":1 , "b" : 2 } ]
*/

{
  function _make(o) {
    if (options.location) o.location = location();
    if (o.options === null) {
      delete o.options;
    }
    return o;
  }
}

Template = tokens:Token* EOF { return tokens; }

Token
  = Group
  / Wildcard
  / Param
  / Text

Text = value:$_part+ { return _make({ type: "text", value }); }

// MAYBE optional escape }
_part
  = $[^:*{}\\]+
  / "\\" v:[:*{}\\] { return v; }

Param
  = ":" name:ParamName options:Options? {
      return _make({ type: "param", name, options });
    }

Wildcard
  = "*" name:ParamName? options:Options? {
      return _make({ type: "wildcard", name, options });
    }

Group
  = "{" tokens:Token+ "}" options:Options? {
      return _make({ type: "group", tokens, options });
    }

Options
  = "&[" _ opts:Option|.., _ "," _| _ "]" {
      return Object.fromEntries(opts.map(({ key, value }) => [key, value]));
    }

Option = key:ParamName "=" value:ParamValue { return { key, value }; }

// abc
// 你好
// 'a-b'
ParamName
  = $([a-zA-Z_] [a-zA-Z0-9_]*)
  / $([\u4e00-\u9fa5] [\u4e00-\u9fa5a-zA-Z0-9_]*)
  / "'" v:[^']* "'" { return v.join(""); }
  / "\"" v:[^"]* "\"" { return v.join(""); }

ParamValue = json

json
  = "{"
    _
    entries:(k:string _ ":" _ v:json { return [k, v]; })|.., _ "," _|
    _
    "}" { return Object.fromEntries(entries); }
  / "[" _ @json|.., _ "," _| _ "]"
  / literal

literal
  = [0-9]+ ("." [0-9]+)? { return parseFloat(text()); }
  / ("true" / "false") { return text() === "true"; }
  / "null" { return null; }
  / $([a-zA-Z] [a-zA-Z0-9_]*) // just text
  / string

string
  = "\"" @$[^"]* "\""
  / "'" @$[^']* "'"

_ "whitespace" = white* { return ""; }

__ "whitespace" = white+ { return " "; }

white = [ \t\n\r]

EOF = !.
