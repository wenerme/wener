"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["59151"],{37857:function(s,e,n){n.r(e),n.d(e,{metadata:()=>l,contentTitle:()=>c,default:()=>d,assets:()=>t,toc:()=>m,frontMatter:()=>r});var l=JSON.parse('{"id":"algorithm/refs/hidden-markov-model","title":"Hidden Markov Model","description":"- \u9690\u9A6C\u5C14\u53EF\u592B\u6A21\u578B - Hidden Markov Model - HMM - \u9690\u6027\u9A6C\u5C14\u53EF\u592B\u6A21\u578B","source":"@site/../notes/algorithm/refs/hidden-markov-model.md","sourceDirName":"algorithm/refs","slug":"/algorithm/refs/hidden-markov-model","permalink":"/notes/algorithm/refs/hidden-markov-model","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/algorithm/refs/hidden-markov-model.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1695042174000,"frontMatter":{"title":"Hidden Markov Model","alias":["hmm"]},"sidebar":"docs","previous":{"title":"multiformats","permalink":"/notes/algorithm/multiformats"},"next":{"title":"tf-idf","permalink":"/notes/algorithm/refs/tf-idf"}}'),a=n("52676"),i=n("79938");let r={title:"Hidden Markov Model",alias:["hmm"]},c="Hidden Markov Model",t={},m=[{value:"\u53C2\u8003",id:"\u53C2\u8003",level:2}];function h(s){let e={a:"a",annotation:"annotation",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",math:"math",mi:"mi",mn:"mn",mo:"mo",mrow:"mrow",mstyle:"mstyle",mtext:"mtext",p:"p",semantics:"semantics",span:"span",ul:"ul",...(0,i.a)(),...s.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(e.header,{children:(0,a.jsx)(e.h1,{id:"hidden-markov-model",children:"Hidden Markov Model"})}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u9690\u9A6C\u5C14\u53EF\u592B\u6A21\u578B - Hidden Markov Model - HMM - \u9690\u6027\u9A6C\u5C14\u53EF\u592B\u6A21\u578B"}),"\n",(0,a.jsx)(e.li,{children:"\u4E00\u79CD\u7EDF\u8BA1\u6A21\u578B"}),"\n",(0,a.jsxs)(e.li,{children:["Hidden\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u6307 \u4ECE\u53EF\u89C2\u5BDF\u7684\u53C2\u6570\u4E2D\u786E\u5B9A\u8BE5\u8FC7\u7A0B\u7684\u9690\u542B\u53C2\u6570"}),"\n",(0,a.jsx)(e.li,{children:"\u786E\u5B9A \u9A6C\u5C14\u53EF\u592B\u6A21\u578B"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\u7528\u4F8B\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u6A21\u5F0F\u8BC6\u522B"}),"\n",(0,a.jsx)(e.li,{children:"\u4E2D\u6587\u65AD\u8BCD/\u5206\u8BCD"}),"\n",(0,a.jsx)(e.li,{children:"\u8BED\u97F3\u8BC6\u522B"}),"\n",(0,a.jsx)(e.li,{children:"\u5149\u5B66\u5B57\u7B26\u8BC6\u522B"}),"\n",(0,a.jsx)(e.li,{children:"\u673A\u5668\u7FFB\u8BD1"}),"\n",(0,a.jsx)(e.li,{children:"\u751F\u7269\u4FE1\u606F\u5B66"}),"\n",(0,a.jsx)(e.li,{children:"\u57FA\u56E0\u7EC4\u5B66"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\u4F18\u5316\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"Baum-Welch"}),"\n",(0,a.jsx)(e.li,{children:"Viterbi algorithm"}),"\n",(0,a.jsx)(e.li,{children:"\u8054\u7ED3\u6811"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\u6982\u5FF5\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u8F6C\u6362\u6982\u7387\uFF08transition probabilities\uFF09"}),"\n",(0,a.jsx)(e.li,{children:"\u8F93\u51FA\u6982\u7387\uFF08output probabilities\uFF09"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://www.youtube.com/watch?v=KBg97801U40",children:"Lecture 15: Applications of HMMs"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.hr,{}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["\u95EE\u9898\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["filter\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"\u8F93\u5165 -> \u6982\u7387\u5206\u5E03"}),"\n",(0,a.jsxs)(e.li,{children:[(0,a.jsxs)(e.span,{className:"katex",children:[(0,a.jsx)(e.span,{className:"katex-mathml",children:(0,a.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,a.jsxs)(e.semantics,{children:[(0,a.jsxs)(e.mrow,{children:[(0,a.jsxs)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:[(0,a.jsx)(e.mi,{children:"P"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"x"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"t"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mtext,{children:"\xa0"}),(0,a.jsx)(e.mi,{mathvariant:"normal",children:"\u2223"}),(0,a.jsx)(e.mtext,{children:"\xa0"}),(0,a.jsx)(e.mi,{children:"y"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mn,{children:"1"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mo,{separator:"true",children:","}),(0,a.jsx)(e.mo,{children:"\u2026"}),(0,a.jsx)(e.mo,{separator:"true",children:","}),(0,a.jsx)(e.mi,{children:"y"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"t"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"})]}),(0,a.jsxs)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:[(0,a.jsx)(e.mi,{children:"P"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"x"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"t"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mtext,{children:"\xa0"}),(0,a.jsx)(e.mi,{mathvariant:"normal",children:"\u2223"}),(0,a.jsx)(e.mtext,{children:"\xa0"}),(0,a.jsx)(e.mi,{children:"y"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mn,{children:"1"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mo,{separator:"true",children:","}),(0,a.jsx)(e.mo,{children:"\u2026"}),(0,a.jsx)(e.mo,{separator:"true",children:","}),(0,a.jsx)(e.mi,{children:"y"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"t"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"})]})]}),(0,a.jsx)(e.annotation,{encoding:"application/x-tex",children:"{\\displaystyle P(x(t)\\ |\\ y(1),\\dots ,y(t))}{\\displaystyle P(x(t)\\ |\\ y(1),\\dots ,y(t))}"})]})})}),(0,a.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,a.jsxs)(e.span,{className:"base",children:[(0,a.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.13889em"},children:"P"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"x"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"t"}),(0,a.jsx)(e.span,{className:"mclose",children:")"}),(0,a.jsx)(e.span,{className:"mspace",children:"\xa0"}),(0,a.jsx)(e.span,{className:"mord",children:"\u2223"}),(0,a.jsx)(e.span,{className:"mspace",children:"\xa0"}),(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.03588em"},children:"y"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord",children:"1"}),(0,a.jsx)(e.span,{className:"mclose",children:")"}),(0,a.jsx)(e.span,{className:"mpunct",children:","}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,a.jsx)(e.span,{className:"minner",children:"\u2026"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,a.jsx)(e.span,{className:"mpunct",children:","}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.03588em"},children:"y"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"t"}),(0,a.jsx)(e.span,{className:"mclose",children:"))"})]}),(0,a.jsxs)(e.span,{className:"mord",children:[(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.13889em"},children:"P"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"x"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"t"}),(0,a.jsx)(e.span,{className:"mclose",children:")"}),(0,a.jsx)(e.span,{className:"mspace",children:"\xa0"}),(0,a.jsx)(e.span,{className:"mord",children:"\u2223"}),(0,a.jsx)(e.span,{className:"mspace",children:"\xa0"}),(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.03588em"},children:"y"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord",children:"1"}),(0,a.jsx)(e.span,{className:"mclose",children:")"}),(0,a.jsx)(e.span,{className:"mpunct",children:","}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,a.jsx)(e.span,{className:"minner",children:"\u2026"}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,a.jsx)(e.span,{className:"mpunct",children:","}),(0,a.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.03588em"},children:"y"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"t"}),(0,a.jsx)(e.span,{className:"mclose",children:"))"})]})]})})]}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:[(0,a.jsxs)(e.span,{className:"katex",children:[(0,a.jsx)(e.span,{className:"katex-mathml",children:(0,a.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,a.jsxs)(e.semantics,{children:[(0,a.jsx)(e.mrow,{children:(0,a.jsx)(e.mi,{children:"t"})}),(0,a.jsx)(e.annotation,{encoding:"application/x-tex",children:"t"})]})})}),(0,a.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,a.jsxs)(e.span,{className:"base",children:[(0,a.jsx)(e.span,{className:"strut",style:{height:"0.6151em"}}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"t"})]})})]})," - \u5E8F\u5217"]}),"\n",(0,a.jsxs)(e.li,{children:[(0,a.jsxs)(e.span,{className:"katex",children:[(0,a.jsx)(e.span,{className:"katex-mathml",children:(0,a.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,a.jsxs)(e.semantics,{children:[(0,a.jsxs)(e.mrow,{children:[(0,a.jsx)(e.mi,{children:"x"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"t"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"})]}),(0,a.jsx)(e.annotation,{encoding:"application/x-tex",children:"x(t)"})]})})}),(0,a.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,a.jsxs)(e.span,{className:"base",children:[(0,a.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"x"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"t"}),(0,a.jsx)(e.span,{className:"mclose",children:")"})]})})]})," - \u8F93\u5165"]}),"\n",(0,a.jsxs)(e.li,{children:[(0,a.jsxs)(e.span,{className:"katex",children:[(0,a.jsx)(e.span,{className:"katex-mathml",children:(0,a.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,a.jsxs)(e.semantics,{children:[(0,a.jsxs)(e.mrow,{children:[(0,a.jsx)(e.mi,{children:"y"}),(0,a.jsx)(e.mo,{stretchy:"false",children:"("}),(0,a.jsx)(e.mi,{children:"n"}),(0,a.jsx)(e.mo,{stretchy:"false",children:")"})]}),(0,a.jsx)(e.annotation,{encoding:"application/x-tex",children:"y(n)"})]})})}),(0,a.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,a.jsxs)(e.span,{className:"base",children:[(0,a.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,a.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.03588em"},children:"y"}),(0,a.jsx)(e.span,{className:"mopen",children:"("}),(0,a.jsx)(e.span,{className:"mord mathnormal",children:"n"}),(0,a.jsx)(e.span,{className:"mclose",children:")"})]})})]})," - \u72B6\u6001\u6982\u7387"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.li,{children:"smoothing"}),"\n",(0,a.jsxs)(e.li,{children:["most likely explanation\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"Viterbi"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.hr,{}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsx)(e.p,{children:"2-gram - bigram - 1 \u9636 HMM"}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsx)(e.p,{children:"BMES \u72B6\u6001"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:"B - \u8BCD\u5F00\u59CB"}),"\n",(0,a.jsx)(e.li,{children:"E - \u8BCD\u7ED3\u675F"}),"\n",(0,a.jsx)(e.li,{children:"M - \u8BCD\u4E2D\u95F4"}),"\n",(0,a.jsx)(e.li,{children:"S - \u5355\u5B57\u8BCD"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(e.li,{children:["\n",(0,a.jsx)(e.p,{children:"\u7528\u4E8E\u6807\u6CE8\u5B57\u7B26"}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(e.h2,{id:"\u53C2\u8003",children:"\u53C2\u8003"}),"\n",(0,a.jsxs)(e.ul,{children:["\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://www.cs.cornell.edu/courses/cs4780/2014fa/lecture/15-hmmviterbi.pdf",children:"https://www.cs.cornell.edu/courses/cs4780/2014fa/lecture/15-hmmviterbi.pdf"})}),"\n",(0,a.jsx)(e.li,{children:(0,a.jsx)(e.a,{href:"https://houbb.github.io/2020/01/28/nlp-hmm-chinese-segment",children:"https://houbb.github.io/2020/01/28/nlp-hmm-chinese-segment"})}),"\n"]})]})}function d(s={}){let{wrapper:e}={...(0,i.a)(),...s.components};return e?(0,a.jsx)(e,{...s,children:(0,a.jsx)(h,{...s})}):h(s)}},79938:function(s,e,n){n.d(e,{Z:function(){return c},a:function(){return r}});var l=n(75271);let a={},i=l.createContext(a);function r(s){let e=l.useContext(i);return l.useMemo(function(){return"function"==typeof s?s(e):{...e,...s}},[e,s])}function c(s){let e;return e=s.disableParentContext?"function"==typeof s.components?s.components(a):s.components||a:r(s.components),l.createElement(i.Provider,{value:e},s.children)}}}]);