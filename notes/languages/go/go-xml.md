---
title: Go XML
---

# Go XML

- [xmllint](http://xmlsoft.org/xmllint.html)
  - 可用于格式化、移除引用

```go
type Content struct {
  Useful  struct {
    Attrs []xml.Attr `xml:",any,attr"`
    Data  string     `xml:",innerxml"`
  } `xml:"Useful"`
}

// 完整节点内容包含 tag
type rawxml string
func (r *rawxml) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {
	var s struct {
		Inner string `xml:",innerxml"`
	}
	if err := d.DecodeElement(&s, &start); err != nil {
		return err
	}
	var attrs string
	for _, a := range start.Attr {
		attrs += fmt.Sprintf(` %s=%q`, a.Name.Local, a.Value)
	}
	name := start.Name.Local
	*r = rawxml(fmt.Sprintf(`<%s%s>%s</%s>`, name, attrs, s.Inner, name))
	return nil
}

```
