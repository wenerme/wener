"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["36047"],{83486:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>o,default:()=>c,assets:()=>s,toc:()=>d,frontMatter:()=>l});var r=JSON.parse('{"id":"ai/ml/traning","title":"\u8BAD\u7EC3","description":"- label-studio \u6570\u636E\u6807\u6CE8\u5DE5\u5177","source":"@site/../notes/ai/ml/traning.md","sourceDirName":"ai/ml","slug":"/ai/ml/traning","permalink":"/notes/ai/ml/traning","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/ml/traning.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1716132179000,"frontMatter":{"title":"\u8BAD\u7EC3"},"sidebar":"docs","previous":{"title":"stable-diffusion-webui","permalink":"/notes/ai/ml/stable-diffusion/webui"},"next":{"title":"Transformer","permalink":"/notes/ai/ml/transformer"}}'),i=t("52676"),a=t("79938");let l={title:"\u8BAD\u7EC3"},o="Traning",s={},d=[];function u(e){let n={h1:"h1",header:"header",li:"li",mermaid:"mermaid",ul:"ul",...(0,a.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"traning",children:"Traning"})}),"\n",(0,i.jsx)(n.mermaid,{value:'graph TD\n  DataCollection["\u6570\u636E\u6536\u96C6"]\n  DataLabeling["\u6570\u636E\u6807\u6CE8"]\n  ModelTraining["\u6A21\u578B\u8BAD\u7EC3"]\n  ModelEvaluation["\u6A21\u578B\u8BC4\u4F30"]\n  ModelDeploy["\u6A21\u578B\u90E8\u7F72"]\n\n  DataCollection -- \u6293\u53D6 --\x3e DataLabeling\n  DataLabeling -- \u683C\u5F0F\u5316 --\x3e ModelTraining\n  ModelTraining -- \u6D4B\u8BD5 --\x3e ModelEvaluation\n  ModelEvaluation -- \u5206\u6790 --\x3e Quality{"\u8D28\u91CF?"}\n  Quality -- YES:\u53D1\u5E03 --\x3e ModelDeploy\n  Quality -- NO:\u4FEE\u590D --\x3e DataLabeling\n  ModelDeploy -- \u6536\u96C6 --\x3e ErrorMonitoring\n  ErrorMonitoring -- \u68C0\u67E5 --\x3e ErrorCheck{"\u9519\u8BEF\u68C0\u67E5"}\n  ErrorCheck -- YES:\u7EE7\u7EED\u8FED\u4EE3 --\x3e DataCollection\n  ErrorCheck -- NO:\u70ED\u4FEE\u590D --\x3e ModelDeploy'}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"label-studio \u6570\u636E\u6807\u6CE8\u5DE5\u5177"}),"\n",(0,i.jsx)(n.li,{children:"transformers - \u6A21\u578B\u8BAD\u7EC3\u5957\u4EF6"}),"\n",(0,i.jsx)(n.li,{children:"TextBrewer - \u6A21\u578B\u84B8\u998F\u5DE5\u5177"}),"\n"]})]})}function c(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return o},a:function(){return l}});var r=t(75271);let i={},a=r.createContext(i);function l(e){let n=r.useContext(a);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);