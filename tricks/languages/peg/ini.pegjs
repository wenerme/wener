Ini
  = (first:Line tail:([\n]+ line:Line {return line})* [\n]* {return [first,...(tail || [])].filter(v=>v.type)})?

Line
  = e:(Section / Entry / _ {return {}} ) c:Comment? {return {...c,...e,location:location()}}

Section
  = _ '[' name:[^\n\]]* ']' _ {return {type:'section',name:name.join('').trim()}}
Comment
  = _ [#;] comment:[^\n]* {return {type:'comment',comment:comment.join('').trim()}}
Entry
  = _ key:[^ \t\r\n#;=]+ _ value:('=' _ v:[^\n#;]* {return v})? {return {type:'entry',key:key.join('').trim(),value:value?.join('').trim()}}

_ "whitespacing"
  = [ \t\r]*
__ "whitespace"
  = [ \t\r]+
