"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["79941"],{99223:function(e,t,i){i.r(t),i.d(t,{metadata:()=>n,contentTitle:()=>c,default:()=>f,assets:()=>a,toc:()=>d,frontMatter:()=>l});var n=JSON.parse('{"id":"service/media/format/gif","title":"gif","description":"- kohler/gifsicle","source":"@site/../notes/service/media/format/gif.md","sourceDirName":"service/media/format","slug":"/service/media/format/gif","permalink":"/notes/service/media/format/gif","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/media/format/gif.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1657531736000,"frontMatter":{"title":"gif"},"sidebar":"docs","previous":{"title":"flv","permalink":"/notes/service/media/format/flv"},"next":{"title":"JPEG XL","permalink":"/notes/service/media/format/jpeg-xl"}}'),r=i("52676"),s=i("79938");let l={title:"gif"},c="gif",a={},d=[];function o(e){let t={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"gif",children:"gif"})}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"https://github.com/kohler/gifsicle",children:"kohler/gifsicle"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"GPL 2.0, C"}),"\n",(0,r.jsx)(t.li,{children:"create, manipulate, and optimize GIF"}),"\n",(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:"https://www.lcdf.org/gifsicle/man.html",children:"https://www.lcdf.org/gifsicle/man.html"})}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(t.table,{children:[(0,r.jsx)(t.thead,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.th,{children:"flag"}),(0,r.jsx)(t.th,{children:"default"}),(0,r.jsx)(t.th,{children:"value"})]})}),(0,r.jsx)(t.tbody,{children:(0,r.jsxs)(t.tr,{children:[(0,r.jsx)(t.td,{children:"-O,--optimize=level"}),(0,r.jsx)(t.td,{children:"1"}),(0,r.jsx)(t.td,{children:"1,2,3 - \u63A8\u8350 2"})]})})]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:'brew install gifsicle # macOS\n\n# video to gif\nffmpeg -i in.mov -s 600x400 -pix_fmt rgb24 -r 10 -f gif - | gifsicle -O3 > out.gif\n\n# keep scale\nffmpeg -i in.mov -pix_fmt rgb24 -r 18 -f gif - | gifsicle --optimize=3 --delay=3 > out.gif\n\n# \u4F18\u5316\u73B0\u6709 gif\ngifsicle in.gif --optimize=3 > out.gif\n\ngifsicle -I "#0" "#1" < in.gif # \u8F93\u51FA\u5E27\u4FE1\u606F\n'})})]})}function f(e={}){let{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}},79938:function(e,t,i){i.d(t,{Z:function(){return c},a:function(){return l}});var n=i(75271);let r={},s=n.createContext(r);function l(e){let t=n.useContext(s);return n.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);