"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["40908"],{48118:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>o,default:()=>m,assets:()=>i,toc:()=>u,frontMatter:()=>l});var r=JSON.parse('{"id":"languages/go/go-xml","title":"Go XML","description":"- xmllint","source":"@site/../notes/languages/go/go-xml.md","sourceDirName":"languages/go","slug":"/languages/go/xml","permalink":"/notes/languages/go/xml","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/go/go-xml.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1621756378000,"frontMatter":{"title":"Go XML"},"sidebar":"docs","previous":{"title":"Golang Windows","permalink":"/notes/languages/go/windows"},"next":{"title":"Go2","permalink":"/notes/languages/go/go2"}}'),s=t("52676"),a=t("79938");let l={title:"Go XML"},o="Go XML",i={},u=[];function c(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,a.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"go-xml",children:"Go XML"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"http://xmlsoft.org/xmllint.html",children:"xmllint"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u53EF\u7528\u4E8E\u683C\u5F0F\u5316\u3001\u79FB\u9664\u5F15\u7528"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-go",children:'type Content struct {\n  Useful  struct {\n    Attrs []xml.Attr `xml:",any,attr"`\n    Data  string     `xml:",innerxml"`\n  } `xml:"Useful"`\n}\n\n// \u5B8C\u6574\u8282\u70B9\u5185\u5BB9\u5305\u542B tag\ntype rawxml string\nfunc (r *rawxml) UnmarshalXML(d *xml.Decoder, start xml.StartElement) error {\n	var s struct {\n		Inner string `xml:",innerxml"`\n	}\n	if err := d.DecodeElement(&s, &start); err != nil {\n		return err\n	}\n	var attrs string\n	for _, a := range start.Attr {\n		attrs += fmt.Sprintf(` %s=%q`, a.Name.Local, a.Value)\n	}\n	name := start.Name.Local\n	*r = rawxml(fmt.Sprintf(`<%s%s>%s</%s>`, name, attrs, s.Inner, name))\n	return nil\n}\n\n'})})]})}function m(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return o},a:function(){return l}});var r=t(75271);let s={},a=r.createContext(s);function l(e){let n=r.useContext(a);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);