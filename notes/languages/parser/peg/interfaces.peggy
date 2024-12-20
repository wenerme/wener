/*
Grammar for interfaces

grammar: https://github.com/wenerme/wener/blob/master/notes/languages/parser/peg/interfaces.peggy
playground: https://peggyjs.org/online
================================

- https://github.com/ifupdown-ng/ifupdown-ng/blob/main/doc/interfaces.scd
- https://github.com/ifupdown-ng/ifupdown-ng/blob/972644e4bff23b8637cc8d6ecf040f28ca504038/libifupdown/interface-file.c#L475-L488

================================

auto br0
iface br0
  use bridge
  requires bond0
  address 203.0.113.2/24
  gateway 203.0.113.1
	address 203.0.113.2/24
	address 2001:db8:1000:2::2/64
	gateway 203.0.113.1
	gateway 2001:db8:1000:2::1

iface bond0
    use bond
    requires eth0 eth1
    bond-mode 802.3ad
    bond-xmit-hash-policy layer2+3
iface home inet dhcp

*/

{
  var section;
  var last;
  function push(v) {
    v.line = location().start.line;
    if (!v.comment) delete v.comment;
    if (!v.notes) delete v.notes;

    switch (v.type) {
      case "Interface":
      case "Template":
        section = v;
        break;
      case "Auto":
      case "Source":
      case "SourceDirectory":
        section = null;
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

  function iface(v) {
    if (v.type === "template") {
      v.type = "Template";
    } else {
      v.type = "Interface";
    }
    // todo tags to executor, extract inherits
    return push(v);
  }
}

Main = lines:(@Line NL)* EOF { return finalize(lines); }

Line
  = comment:Comment { return push({ type: "Comment", comment }); }
  / _ "auto" _ name:ident notes:Comment? {
      return push({ type: "Auto", name, notes });
    }
  / _ "source" _ filename:Value notes:Comment? {
      return push({ type: "Source", filename, notes });
    }
  / _ "source-directory" _ directory:Value notes:Comment? {
      return push({ type: "SourceDirectory", directory, notes });
    }
  / _
    type:("iface" / "interface" / "template")
    __
    name:ident
    _
    tags:("inet" / "dhcp" / "loopback" / "ppp" / "inherits" __ ident)|.., __|
    notes:Comment? { return iface({ type, name, tags, notes }); }
  / _ key:Keyword _ value:Value notes:Comment? {
      return push({ type: "Keyword", key, value, notes });
    }
  / _ { return push({ type: "EmptyLine" }); }

Comment = _ "#" comment:CommentText? { return comment?.trim(); }

CommentText = chars:(!NL .)* { return text(); }

Keyword = chars:[a-zA-Z0-9]+ { return text(); }

Value = chars:(!(NL / "#") .)+ { return text().trim(); }

ident = ([a-zA-Z] [_a-zA-Z0-9]*) { return text(); }

ip
  = ipv4
  / ipv6

cidr = ip "/" [0-9]+

ipv4 = ipv4_part "." ipv4_part "." ipv4_part "." ipv4_part

ipv4_part
  = [0-9]
  / [1-9] [0-9]
  / "1" [0-9] [0-9]
  / "2" [0-4] [0-9]
  / "25" [0-5]

ipv6 = [0-9a-fA-F:]+

EOF = !.

NL
  = "\r\n"
  / "\n"
  / "\r"

_ = [ \t]*

__ = [ \t]+
