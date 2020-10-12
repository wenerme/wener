Ini
  = (first:Line tail:([\n]+ line:Line {return line})* [\n]* {return [first,...(tail || [])].filter(v=>v.type)})?

Line
  = e:(
    // extension
    AppendSection / TemplateSection / ActionComment / ObjectEntry
    / Section / Entry / _ {return {}}
  ) c:(BlockComment / Comment )? {return {...c,...e,location:location()}}

Section
  = _ '[' name:[^\n\]]* ']' _ {return {type:'section',name:name.join('').trim()}}
Comment
  = _ [#;] comment:[^\n]* {return {type:'comment',comment:comment.join('').trim()}}
Entry
  = _ key:[^ \t\r\n#;=]+ _ value:('=' _ v:[^\n#;]* {return v})? {return {type:'entry',key:key.join('').trim(),value:value?.join('').trim()}}

// Asterisk
// https://wiki.asterisk.org/wiki/display/AST/Asterisk+Configuration+Files

// [user](!)
TemplateSection
  = _ '[' name:[^\n\]]* ']'
    names:(
      '(' _ first:TemplateName _ trail:(',' _ v:TemplateName _ {return v})*  _ ')'
      {return [].concat(first,trail||[])}
    ) _
    { return {
      type:'template-section',
      name:name.join('').trim(),
      templateOnly: names.includes('!'),
      extends: names.filter(v=>v!=='!')
    }}
TemplateName
  = '!' / [-a-z0-9A-Z]+ {return text()}

ObjectEntry
  = _ key:[^ \t\r\n#;=]+ _ '=>' _ value:[^\n#;]* {return {type:'entry',key:key.join('').trim(),value:value?.join('').trim()}}

// [101](+type=aor)
AppendSection
  = _ '[' name:[^\n\]]* ']' '(' '+' conditions:AppendSectionConditions? ')'
    { return {
      type:'append-section',
      name:name.join('').trim(),
      conditions
    }}
AppendSectionConditions
  = first:AppendSectionCondition trail:(',' v:AppendSectionCondition {return v})* {return [].concat(first,trail||[])}
AppendSectionCondition
  = k:[^=\n]+ '=' v:[^\n#;,)]+ {return {key:k.join('').trim(), value: v.join('').trim()}}

// #include
ActionComment
  = '#' action:('include'/'exec'/'tryinclude') params:[^\n]*
  { return {
    type: 'action-comment',
    action,
    param:params.join('').trim(),
  }}

BlockComment
  = ';--' (!"--;" .)* '--;'
  {return {type:'comment',comment:text().match(/^;--(.*?)--;/s)?.[1].trim()}}

_ "whitespacing"
  = [ \t\r]*
__ "whitespace"
  = [ \t\r]+
