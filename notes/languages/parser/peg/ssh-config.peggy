/*
Grammar for SSH Config

grammar: https://github.com/wenerme/wener/blob/master/notes/languages/parser/peg/ssh-config.peggy
playground: https://peggyjs.org/online
================================

- https://man7.org/linux/man-pages/man5/ssh_config.5.html
- https://github.com/cyjake/ssh-config
- https://github.com/sorend/sshconf


Host *.co.uk
Host 192.168.0.?
Include ~/.ssh/*.ssh-config
Match User admin
	AllowTcpForwarding yes
Match canonical final host server.example.org
Match user alice host *.example.com
# This comment
# will attache to
# next directive
Host abc # Notes
  HostName  test
*/

{
  var section;
  var last;
  function push(v) {
    v.line = location().start.line;
    if (!v.comment) delete v.comment;
    if (!v.notes) delete v.notes;

    switch (v.type) {
      case "Match":
      case "Host":
        section = v;
        break;
      case "Comment":
        break;
    }

    let out = v;
    if (section && section !== v) {
      section.children ||= [];
      section.children.push(v);
      out = null;
    }
    return out;
  }
  function finalize(lines) {
    lines = lines.flatMap((v) => v).filter(Boolean);
    // todo attach comment
    return lines;
  }
}

Main = lines:(@Line NL)* EOF { return finalize(lines); }

Line
  = comment:Comment { return push({ type: "Comment", comment }); }
  / _ "Host"i _ hosts:HostPattern|1.., __| notes:Comment? {
      return push({ type: "Host", hosts, notes });
    }
  / _ "Match"i _ conditions:MatchCriteria|1.., __| notes:Comment? {
      return push({ type: "Match", conditions, notes });
    }
  / _ key:Keyword _ value:Value notes:Comment? {
      return push({ type: "Directive", key, value, notes });
    }
  / _ { return push({ type: "EmptyLine" }); }

MatchCriteria
  = key:("all"i / "canonical"i / "final"i) { return { key, value: true }; }
  / key:("user"i / "localuser"i / "host"i / "originalhost"i) __ value:value {
      return { key, value };
    }
  / "exec"i __ value
  / "tagged"i __ value

value = $(!(__ / NL / "#") .)+

HostPattern
  = negtive:"!"? pattern:$(!(__ / NL / "#") .)+ {
      return { pattern, negtive: Boolean(negtive) };
    }

Comment = _ "#" comment:CommentText? { return comment?.trim(); }

CommentText = chars:(!NL .)* { return text(); }

Keyword = chars:[a-zA-Z0-9]+ { return text(); }

Value = chars:(!(NL / "#") .)+ { return text().trim(); }

EOF = !.

NL
  = "\r\n"
  / "\n"
  / "\r"

_ = [ \t]*

__ = [ \t]+
