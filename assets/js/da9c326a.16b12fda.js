"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["17935"],{51419:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>l,default:()=>j,assets:()=>c,toc:()=>x,frontMatter:()=>i});var s=JSON.parse('{"id":"service/observability/logging/logging-faq","title":"Logging FAQ","description":"Level","source":"@site/../notes/service/observability/logging/logging-faq.md","sourceDirName":"service/observability/logging","slug":"/service/observability/logging/faq","permalink":"/notes/service/observability/logging/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/observability/logging/logging-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1731048203000,"frontMatter":{"tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Logging Awesome","permalink":"/notes/service/observability/logging/awesome"},"next":{"title":"Logging Format","permalink":"/notes/service/observability/logging/format"}}'),r=t("52676"),d=t("79938");let i={tags:["FAQ"]},l="Logging FAQ",c={},x=[{value:"Level",id:"level",level:2}];function h(n){let e={a:"a",del:"del",h1:"h1",h2:"h2",header:"header",li:"li",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"logging-faq",children:"Logging FAQ"})}),"\n",(0,r.jsx)(e.h2,{id:"level",children:"Level"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"level - importance - severity"}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,r.jsxs)(e.table,{children:[(0,r.jsx)(e.thead,{children:(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.th,{children:"mean"}),(0,r.jsx)(e.th,{children:"level"}),(0,r.jsx)(e.th,{children:"syslog"}),(0,r.jsx)(e.th,{children:"console"}),(0,r.jsx)(e.th,{children:"go/slog"}),(0,r.jsx)(e.th,{children:"OpenTelemetry"}),(0,r.jsx)(e.th,{children:"slf4j"})]})}),(0,r.jsxs)(e.tbody,{children:[(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Emergency"}),(0,r.jsx)(e.td,{children:"emerg"}),(0,r.jsxs)(e.td,{children:["0,",(0,r.jsx)(e.del,{children:"panic"})]}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Alert"}),(0,r.jsx)(e.td,{children:"alert"}),(0,r.jsx)(e.td,{children:"1"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Critical"}),(0,r.jsx)(e.td,{children:"crit"}),(0,r.jsx)(e.td,{children:"2"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Fatal"}),(0,r.jsx)(e.td,{children:"fatal"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"FATAL, 21-24"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Error"}),(0,r.jsx)(e.td,{children:"error"}),(0,r.jsxs)(e.td,{children:["3,err,",(0,r.jsx)(e.del,{children:"error"})]}),(0,r.jsx)(e.td,{children:"\u2705"}),(0,r.jsx)(e.td,{children:"8"}),(0,r.jsx)(e.td,{children:"ERROR, 17-20"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Warning"}),(0,r.jsx)(e.td,{children:"warn"}),(0,r.jsxs)(e.td,{children:["4,warning,",(0,r.jsx)(e.del,{children:"warn"})]}),(0,r.jsx)(e.td,{children:"\u2705"}),(0,r.jsx)(e.td,{children:"4"}),(0,r.jsx)(e.td,{children:"WARN, 13-16"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Notice"}),(0,r.jsx)(e.td,{children:"notice"}),(0,r.jsx)(e.td,{children:"5"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Information"}),(0,r.jsx)(e.td,{children:"info"}),(0,r.jsx)(e.td,{children:"6"}),(0,r.jsx)(e.td,{children:"\u2705"}),(0,r.jsx)(e.td,{children:"0"}),(0,r.jsx)(e.td,{children:"INFO, 9-12"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Debug"}),(0,r.jsx)(e.td,{children:"debug"}),(0,r.jsx)(e.td,{children:"7"}),(0,r.jsx)(e.td,{children:"\u2705"}),(0,r.jsx)(e.td,{children:"-4"}),(0,r.jsx)(e.td,{children:"DEBUG, 5-8"}),(0,r.jsx)(e.td,{})]}),(0,r.jsxs)(e.tr,{children:[(0,r.jsx)(e.td,{children:"Trace"}),(0,r.jsx)(e.td,{children:"trace"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"\u2705"}),(0,r.jsx)(e.td,{}),(0,r.jsx)(e.td,{children:"TRACE, 1-4"}),(0,r.jsx)(e.td,{})]})]})]}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://opentelemetry.io/docs/specs/otel/logs/",children:"https://opentelemetry.io/docs/specs/otel/logs/"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"SeverityText"}),"\n",(0,r.jsx)(e.li,{children:"SeverityNumber"}),"\n"]}),"\n"]}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,d.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(h,{...n})}):h(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return l},a:function(){return i}});var s=t(75271);let r={},d=s.createContext(r);function i(n){let e=s.useContext(d);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:i(n.components),s.createElement(d.Provider,{value:e},n.children)}}}]);