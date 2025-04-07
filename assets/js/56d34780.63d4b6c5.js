"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["73577"],{76059:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>a,default:()=>m,assets:()=>c,toc:()=>i,frontMatter:()=>s});var r=JSON.parse('{"id":"service/document/pdf/pdfmake","title":"pdfmake","description":"- bpampuch/pdfmake","source":"@site/../notes/service/document/pdf/pdfmake.md","sourceDirName":"service/document/pdf","slug":"/service/document/pdf/pdfmake","permalink":"/notes/service/document/pdf/pdfmake","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/document/pdf/pdfmake.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1742710127000,"frontMatter":{"title":"pdfmake"},"sidebar":"docs","previous":{"title":"PDF","permalink":"/notes/service/document/pdf/"},"next":{"title":"ReactPDF","permalink":"/notes/service/document/pdf/react-pdf"}}'),o=t("52676"),d=t("79938");let s={title:"pdfmake"},a="pdfmake",c={},i=[];function p(e){let n={a:"a",code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,d.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.header,{children:(0,o.jsx)(n.h1,{id:"pdfmake",children:"pdfmake"})}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.a,{href:"https://github.com/bpampuch/pdfmake",children:"bpampuch/pdfmake"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"MIT, JS"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"// PdfPrinter \u7528\u4E8E Node.js\nimport PdfPrinter from 'pdfmake';\n\n// createPdf \u7528\u4E8E\u6D4F\u89C8\u5668\nimport createPdf from 'pdfmake/build/pdfmake';\n\n// \u6587\u6863\u5185\u5BB9\nimport type { TDocumentDefinitions } from 'pdfmake/interfaces';\n"})}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ts",children:"export type Content =\n  | string // =ContentText\n  | number\n  | Content[] // =ContentStack\n  | ContentText\n  | ContentColumns\n  | ContentStack\n  | ContentUnorderedList\n  | ContentOrderedList\n  | ContentTable\n  | ContentAnchor\n  | ContentPageReference\n  | ContentTextReference\n  | ContentToc\n  | ContentTocItem\n  | ContentImage\n  | ContentSvg\n  | ContentQr\n  | ContentCanvas;\n"})})]})}function m(e={}){let{wrapper:n}={...(0,d.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return s}});var r=t(75271);let o={},d=r.createContext(o);function s(e){let n=r.useContext(d);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),r.createElement(d.Provider,{value:n},e.children)}}}]);