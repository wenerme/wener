"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["84173"],{45930:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>l,default:()=>p,assets:()=>o,toc:()=>c,frontMatter:()=>d});var r=JSON.parse('{"id":"service/document/pdf","title":"PDF","description":"- Portable Document Format","source":"@site/../notes/service/document/pdf.md","sourceDirName":"service/document","slug":"/service/document/pdf","permalink":"/notes/service/document/pdf","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/document/pdf.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1733665497000,"frontMatter":{"title":"PDF"},"sidebar":"docs","previous":{"title":"Pandoc","permalink":"/notes/service/document/pandoc"},"next":{"title":"pdfmake","permalink":"/notes/service/document/pdfmake"}}'),i=t("52676"),s=t("79938");let d={title:"PDF"},l="PDF",o={},c=[{value:"Tools",id:"tools",level:2},{value:"\u6C34\u5370\u5904\u7406\u903B\u8F91",id:"\u6C34\u5370\u5904\u7406\u903B\u8F91",level:2},{value:"\u53CC\u9762 PDF",id:"\u53CC\u9762-pdf",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"pdf",children:"PDF"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Portable_Document_Format",children:"Portable Document Format"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"http://www.adobe.com/devnet/pdf/pdf_reference.html",children:"PDF Reference"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"http://www.pdfhacks.com/",children:"PDF Hacks"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://web.archive.org/web/20141010035745/http://gnupdf.org/Introduction_to_PDF",children:"Introduction to PDF"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"http://pdfreaders.org/",children:"PDF Readers"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://www.bitsgalore.org/2021/09/06/pdf-processing-and-analysis-with-open-source-tools",children:"PDF processing and analysis with open-source tools"})}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'# \u7B2C1\u9875  PDF -> PNG\nconvert -density 300 input.pdf[0] output.png\nconvert -density 300 input.pdf[0-3] "output-%d.png"\n'})}),"\n",(0,i.jsx)(n.h2,{id:"tools",children:"Tools"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"poppler"}),"\n",(0,i.jsx)(n.li,{children:"pdf2image"}),"\n",(0,i.jsx)(n.li,{children:"pdftohtml"}),"\n",(0,i.jsx)(n.li,{children:"xpdf"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"brew install poppler\n\npdfseparate document.pdf %d.pdf\n"})}),"\n",(0,i.jsx)(n.h1,{id:"spec",children:"Spec"}),"\n",(0,i.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,i.jsx)(n.h2,{id:"\u6C34\u5370\u5904\u7406\u903B\u8F91",children:"\u6C34\u5370\u5904\u7406\u903B\u8F91"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u6C34\u5370\u53EF\u80FD\u4F1A\u6DFB\u52A0\u4E00\u4E2A\u5E26 URL \u7684 Annotation"}),"\n",(0,i.jsx)(n.li,{children:"\u76F4\u63A5\u5728 CONTENTS \u7684 Steam \u4E2D\u6DFB\u52A0\u5185\u5BB9"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u53CC\u9762-pdf",children:"\u53CC\u9762 PDF"}),"\n",(0,i.jsx)(n.p,{children:"\u6CA1\u6709\u53CC\u9762 PDF\uFF0C\u53EA\u6709\u5355\u9762 PDF\uFF0C\u901A\u8FC7\u6253\u5370\u673A\u7684\u53CC\u9762\u6253\u5370\u529F\u80FD\u5B9E\u73B0\u3002"}),"\n",(0,i.jsx)(n.p,{children:"\u626B\u63CF\u4EEA\u7684\u53CC\u9762\u626B\u63CF\u529F\u80FD\uFF0C\u53EA\u662F\u5C06\u626B\u63CF\u7684 PDF \u6587\u4EF6\u8FDB\u884C\u4E86\u65CB\u8F6C\u5408\u5E76\u3002"})]})}function p(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return l},a:function(){return d}});var r=t(75271);let i={},s=r.createContext(i);function d(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);