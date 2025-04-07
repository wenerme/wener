"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["20542"],{36909:function(s,e,a){a.r(e),a.d(e,{metadata:()=>n,contentTitle:()=>t,default:()=>d,assets:()=>i,toc:()=>c,frontMatter:()=>m});var n=JSON.parse('{"id":"algorithm/refs/tf-idf","title":"tf-idf","description":"- TF-IDF - Term Frequency\u2013Inverse Document Frequency","source":"@site/../notes/algorithm/refs/tf-idf.md","sourceDirName":"algorithm/refs","slug":"/algorithm/refs/tf-idf","permalink":"/notes/algorithm/refs/tf-idf","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/algorithm/refs/tf-idf.md","tags":[{"inline":true,"label":"NLP","permalink":"/notes/tags/nlp"},{"inline":true,"label":"Search","permalink":"/notes/tags/search"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1695042174000,"frontMatter":{"title":"tf-idf","alias":["tf-idf"],"tags":["NLP","Search"]},"sidebar":"docs","previous":{"title":"Hidden Markov Model","permalink":"/notes/algorithm/refs/hidden-markov-model"},"next":{"title":"\u533A\u5757\u94FE","permalink":"/notes/blockchain/"}}'),l=a("52676"),r=a("79938");let m={title:"tf-idf",alias:["tf-idf"],tags:["NLP","Search"]},t="tf-idf",i={},c=[];function h(s){let e={admonition:"admonition",annotation:"annotation",code:"code",h1:"h1",header:"header",li:"li",math:"math",mfrac:"mfrac",mi:"mi",mo:"mo",mrow:"mrow",mstyle:"mstyle",mtable:"mtable",mtd:"mtd",mtext:"mtext",mtr:"mtr",semantics:"semantics",span:"span",strong:"strong",ul:"ul",...(0,r.a)(),...s.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"tf-idf",children:"tf-idf"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"TF-IDF - Term Frequency\u2013Inverse Document Frequency"}),"\n",(0,l.jsx)(e.li,{children:"IDF - \u9006\u5411\u6587\u4EF6\u9891\u7387"}),"\n",(0,l.jsx)(e.li,{children:"\u8FC7\u6EE4\u6389\u5E38\u89C1\u7684\u8BCD\u8BED\uFF0C\u4FDD\u7559\u91CD\u8981\u7684\u8BCD\u8BED\u3002"}),"\n",(0,l.jsxs)(e.li,{children:["\u5047\u8BBE\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4E00\u4E2A\u5355\u8BCD\u51FA\u73B0\u7684\u6587\u672C\u9891\u6570\u8D8A\u5C0F\uFF0C\u5B83\u533A\u522B\u4E0D\u540C\u7C7B\u522B\u6587\u672C\u7684\u80FD\u529B\u5C31\u8D8A\u5927\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u8BCD\u9891\u7387\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5355\u4E2A\u6587\u4EF6 - \u6B63\u6BD4"}),"\n",(0,l.jsx)(e.li,{children:"\u8D44\u6599\u5E93 - \u53CD\u6BD4"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.span,{className:"katex-display",children:(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",display:"block",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsxs)(e.mtable,{rowspacing:"0.25em",columnalign:"right left right left",columnspacing:"0em",children:[(0,l.jsxs)(e.mtr,{children:[(0,l.jsx)(e.mtd,{children:(0,l.jsx)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mtext,{children:"tf-idf"}),(0,l.jsx)(e.mo,{stretchy:"false",children:"("}),(0,l.jsx)(e.mstyle,{mathcolor:"green",children:(0,l.jsx)(e.mi,{children:"w"})}),(0,l.jsx)(e.mo,{separator:"true",children:","}),(0,l.jsx)(e.mi,{children:"d"}),(0,l.jsx)(e.mo,{separator:"true",children:","}),(0,l.jsx)(e.mi,{children:"D"}),(0,l.jsx)(e.mo,{stretchy:"false",children:")"})]})})}),(0,l.jsx)(e.mtd,{children:(0,l.jsx)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mrow,{}),(0,l.jsx)(e.mo,{children:"="}),(0,l.jsx)(e.mtext,{children:"tf"}),(0,l.jsx)(e.mo,{stretchy:"false",children:"("}),(0,l.jsx)(e.mstyle,{mathcolor:"green",children:(0,l.jsx)(e.mi,{children:"w"})}),(0,l.jsx)(e.mo,{separator:"true",children:","}),(0,l.jsx)(e.mi,{children:"d"}),(0,l.jsx)(e.mo,{stretchy:"false",children:")"}),(0,l.jsx)(e.mo,{children:"\u22C5"}),(0,l.jsx)(e.mtext,{children:"idf"}),(0,l.jsx)(e.mo,{stretchy:"false",children:"("}),(0,l.jsx)(e.mstyle,{mathcolor:"green",children:(0,l.jsx)(e.mi,{children:"w"})}),(0,l.jsx)(e.mo,{separator:"true",children:","}),(0,l.jsx)(e.mi,{children:"D"}),(0,l.jsx)(e.mo,{stretchy:"false",children:")"})]})})})]}),(0,l.jsxs)(e.mtr,{children:[(0,l.jsx)(e.mtd,{children:(0,l.jsx)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,l.jsx)(e.mrow,{})})}),(0,l.jsx)(e.mtd,{children:(0,l.jsx)(e.mstyle,{scriptlevel:"0",displaystyle:"true",children:(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mrow,{}),(0,l.jsx)(e.mo,{children:"="}),(0,l.jsx)(e.mtext,{children:"N"}),(0,l.jsx)(e.mo,{stretchy:"false",children:"("}),(0,l.jsx)(e.mstyle,{mathcolor:"green",children:(0,l.jsx)(e.mi,{children:"w"})}),(0,l.jsx)(e.mo,{separator:"true",children:","}),(0,l.jsx)(e.mi,{children:"d"}),(0,l.jsx)(e.mo,{stretchy:"false",children:")"}),(0,l.jsx)(e.mo,{children:"\u22C5"}),(0,l.jsx)(e.mtext,{children:"log"}),(0,l.jsxs)(e.mfrac,{children:[(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mi,{mathvariant:"normal",children:"\u2223"}),(0,l.jsx)(e.mi,{children:"D"}),(0,l.jsx)(e.mi,{mathvariant:"normal",children:"\u2223"})]}),(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mi,{mathvariant:"normal",children:"\u2223"}),(0,l.jsx)(e.mo,{stretchy:"false",children:"{"}),(0,l.jsx)(e.mi,{children:"d"}),(0,l.jsx)(e.mo,{children:"\u2208"}),(0,l.jsx)(e.mtext,{children:"D"}),(0,l.jsx)(e.mo,{children:":"}),(0,l.jsx)(e.mstyle,{mathcolor:"green",children:(0,l.jsx)(e.mi,{children:"w"})}),(0,l.jsx)(e.mo,{children:"\u2208"}),(0,l.jsx)(e.mtext,{children:"D"}),(0,l.jsx)(e.mo,{stretchy:"false",children:"}"}),(0,l.jsx)(e.mi,{mathvariant:"normal",children:"\u2223"})]})]})]})})})]})]}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"\\begin{alignat*}{2}\n\\text{tf-idf}({\\color {green} w}, d, D)\n&= \\text{tf}({\\color {green} w},d) \\cdot \\text{idf}({\\color {green} w},D)\\\\\n&= \\text N({\\color {green} w},d) \\cdot \\text{log} \\frac {|D|} {|\\{ d \\in \\text D: {\\color {green} w} \\in \\text D \\}|}\n\\end{alignat*}"})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"4.163em",verticalAlign:"-1.8315em"}}),(0,l.jsx)(e.span,{className:"mord",children:(0,l.jsxs)(e.span,{className:"mtable",children:[(0,l.jsx)(e.span,{className:"col-align-r",children:(0,l.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,l.jsxs)(e.span,{className:"vlist-r",children:[(0,l.jsxs)(e.span,{className:"vlist",style:{height:"2.3315em"},children:[(0,l.jsxs)(e.span,{style:{top:"-4.9185em"},children:[(0,l.jsx)(e.span,{className:"pstrut",style:{height:"3.427em"}}),(0,l.jsxs)(e.span,{className:"mord",children:[(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"tf-idf"})}),(0,l.jsx)(e.span,{className:"mopen",children:"("}),(0,l.jsx)(e.span,{className:"mord",children:(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em",color:"green"},children:"w"})}),(0,l.jsx)(e.span,{className:"mpunct",children:","}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"d"}),(0,l.jsx)(e.span,{className:"mpunct",children:","}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"D"}),(0,l.jsx)(e.span,{className:"mclose",children:")"})]})]}),(0,l.jsxs)(e.span,{style:{top:"-2.8315em"},children:[(0,l.jsx)(e.span,{className:"pstrut",style:{height:"3.427em"}}),(0,l.jsx)(e.span,{className:"mord"})]})]}),(0,l.jsx)(e.span,{className:"vlist-s",children:"\u200B"})]}),(0,l.jsx)(e.span,{className:"vlist-r",children:(0,l.jsx)(e.span,{className:"vlist",style:{height:"1.8315em"},children:(0,l.jsx)(e.span,{})})})]})}),(0,l.jsx)(e.span,{className:"col-align-l",children:(0,l.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,l.jsxs)(e.span,{className:"vlist-r",children:[(0,l.jsxs)(e.span,{className:"vlist",style:{height:"2.3315em"},children:[(0,l.jsxs)(e.span,{style:{top:"-4.9185em"},children:[(0,l.jsx)(e.span,{className:"pstrut",style:{height:"3.427em"}}),(0,l.jsxs)(e.span,{className:"mord",children:[(0,l.jsx)(e.span,{className:"mord"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mrel",children:"="}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"tf"})}),(0,l.jsx)(e.span,{className:"mopen",children:"("}),(0,l.jsx)(e.span,{className:"mord",children:(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em",color:"green"},children:"w"})}),(0,l.jsx)(e.span,{className:"mpunct",children:","}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"d"}),(0,l.jsx)(e.span,{className:"mclose",children:")"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,l.jsx)(e.span,{className:"mbin",children:"\u22C5"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"idf"})}),(0,l.jsx)(e.span,{className:"mopen",children:"("}),(0,l.jsx)(e.span,{className:"mord",children:(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em",color:"green"},children:"w"})}),(0,l.jsx)(e.span,{className:"mpunct",children:","}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"D"}),(0,l.jsx)(e.span,{className:"mclose",children:")"})]})]}),(0,l.jsxs)(e.span,{style:{top:"-2.8315em"},children:[(0,l.jsx)(e.span,{className:"pstrut",style:{height:"3.427em"}}),(0,l.jsxs)(e.span,{className:"mord",children:[(0,l.jsx)(e.span,{className:"mord"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mrel",children:"="}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"N"})}),(0,l.jsx)(e.span,{className:"mopen",children:"("}),(0,l.jsx)(e.span,{className:"mord",children:(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em",color:"green"},children:"w"})}),(0,l.jsx)(e.span,{className:"mpunct",children:","}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"d"}),(0,l.jsx)(e.span,{className:"mclose",children:")"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,l.jsx)(e.span,{className:"mbin",children:"\u22C5"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2222em"}}),(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"log"})}),(0,l.jsxs)(e.span,{className:"mord",children:[(0,l.jsx)(e.span,{className:"mopen nulldelimiter"}),(0,l.jsx)(e.span,{className:"mfrac",children:(0,l.jsxs)(e.span,{className:"vlist-t vlist-t2",children:[(0,l.jsxs)(e.span,{className:"vlist-r",children:[(0,l.jsxs)(e.span,{className:"vlist",style:{height:"1.427em"},children:[(0,l.jsxs)(e.span,{style:{top:"-2.314em"},children:[(0,l.jsx)(e.span,{className:"pstrut",style:{height:"3em"}}),(0,l.jsxs)(e.span,{className:"mord",children:[(0,l.jsx)(e.span,{className:"mord",children:"\u2223"}),(0,l.jsx)(e.span,{className:"mopen",children:"{"}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"d"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mrel",children:"\u2208"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"D"})}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mrel",children:":"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mord",children:(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em",color:"green"},children:"w"})}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mrel",children:"\u2208"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"D"})}),(0,l.jsx)(e.span,{className:"mclose",children:"}"}),(0,l.jsx)(e.span,{className:"mord",children:"\u2223"})]})]}),(0,l.jsxs)(e.span,{style:{top:"-3.23em"},children:[(0,l.jsx)(e.span,{className:"pstrut",style:{height:"3em"}}),(0,l.jsx)(e.span,{className:"frac-line",style:{borderBottomWidth:"0.04em"}})]}),(0,l.jsxs)(e.span,{style:{top:"-3.677em"},children:[(0,l.jsx)(e.span,{className:"pstrut",style:{height:"3em"}}),(0,l.jsxs)(e.span,{className:"mord",children:[(0,l.jsx)(e.span,{className:"mord",children:"\u2223"}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"D"}),(0,l.jsx)(e.span,{className:"mord",children:"\u2223"})]})]})]}),(0,l.jsx)(e.span,{className:"vlist-s",children:"\u200B"})]}),(0,l.jsx)(e.span,{className:"vlist-r",children:(0,l.jsx)(e.span,{className:"vlist",style:{height:"0.936em"},children:(0,l.jsx)(e.span,{})})})]})}),(0,l.jsx)(e.span,{className:"mclose nulldelimiter"})]})]})]})]}),(0,l.jsx)(e.span,{className:"vlist-s",children:"\u200B"})]}),(0,l.jsx)(e.span,{className:"vlist-r",children:(0,l.jsx)(e.span,{className:"vlist",style:{height:"1.8315em"},children:(0,l.jsx)(e.span,{})})})]})})]})})]})})]})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsx)(e.mrow,{children:(0,l.jsx)(e.mstyle,{mathcolor:"green",children:(0,l.jsx)(e.mi,{children:"w"})})}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"\\color{green} w"})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"0.4306em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em",color:"green"},children:"w"})]})})]})," - \u5355\u4E2A\u8BCD"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsx)(e.mrow,{children:(0,l.jsx)(e.mi,{children:"d"})}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"d"})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"0.6944em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"d"})]})})]})," - \u5355\u4E2A\u6587\u6863"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsx)(e.mrow,{children:(0,l.jsx)(e.mi,{children:"D"})}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"D"})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"0.6833em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"D"})]})})]})," - \u6240\u6709\u6587\u6863"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mtext,{children:"tf"}),(0,l.jsx)(e.mo,{stretchy:"false",children:"("}),(0,l.jsx)(e.mi,{children:"w"}),(0,l.jsx)(e.mo,{separator:"true",children:","}),(0,l.jsx)(e.mi,{children:"d"}),(0,l.jsx)(e.mo,{stretchy:"false",children:")"}),(0,l.jsx)(e.mo,{children:"="}),(0,l.jsx)(e.mtext,{children:"N"}),(0,l.jsx)(e.mo,{stretchy:"false",children:"("}),(0,l.jsx)(e.mi,{children:"w"}),(0,l.jsx)(e.mo,{separator:"true",children:","}),(0,l.jsx)(e.mi,{children:"d"}),(0,l.jsx)(e.mo,{stretchy:"false",children:")"})]}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"\\text{tf}(w,d) = \\text N(w,d)"})]})})}),(0,l.jsxs)(e.span,{className:"katex-html","aria-hidden":"true",children:[(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"tf"})}),(0,l.jsx)(e.span,{className:"mopen",children:"("}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em"},children:"w"}),(0,l.jsx)(e.span,{className:"mpunct",children:","}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"d"}),(0,l.jsx)(e.span,{className:"mclose",children:")"}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}}),(0,l.jsx)(e.span,{className:"mrel",children:"="}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.2778em"}})]}),(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"N"})}),(0,l.jsx)(e.span,{className:"mopen",children:"("}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em"},children:"w"}),(0,l.jsx)(e.span,{className:"mpunct",children:","}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"d"}),(0,l.jsx)(e.span,{className:"mclose",children:")"})]})]})]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsx)(e.mrow,{children:(0,l.jsx)(e.mi,{children:"w"})}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"w"})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"0.4306em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em"},children:"w"})]})})]})," \u5728 ",(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsx)(e.mrow,{children:(0,l.jsx)(e.mi,{children:"d"})}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"d"})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"0.6944em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"d"})]})})]})," \u6587\u6863\u4E2D\u7684\u6570\u91CF"]}),"\n",(0,l.jsx)(e.li,{children:"\u8BCD\u9891 - term frequency"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mtext,{children:"idf"}),(0,l.jsx)(e.mo,{stretchy:"false",children:"("}),(0,l.jsx)(e.mi,{children:"w"}),(0,l.jsx)(e.mo,{separator:"true",children:","}),(0,l.jsx)(e.mi,{children:"D"}),(0,l.jsx)(e.mo,{stretchy:"false",children:")"})]}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"\\text{idf}(w,D)"})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,l.jsx)(e.span,{className:"mord text",children:(0,l.jsx)(e.span,{className:"mord",children:"idf"})}),(0,l.jsx)(e.span,{className:"mopen",children:"("}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em"},children:"w"}),(0,l.jsx)(e.span,{className:"mpunct",children:","}),(0,l.jsx)(e.span,{className:"mspace",style:{marginRight:"0.1667em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02778em"},children:"D"}),(0,l.jsx)(e.span,{className:"mclose",children:")"})]})})]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsx)(e.mrow,{children:(0,l.jsx)(e.mi,{children:"w"})}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"w"})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"0.4306em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.02691em"},children:"w"})]})})]})," \u5728\u6574\u4E2A\u8D44\u6599\u5E93\u4E2D\u7684\u6570\u91CF"]}),"\n",(0,l.jsxs)(e.li,{children:["IDF - \u9006\u5411\u6587\u4EF6\u9891\u7387\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6570\u91CF\u8D8A\u9AD8\uFF0C\u6743\u91CD\u8D8A\u4F4E"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.admonition,{title:"Demo",type:"tip",children:(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"\u79D1\u6280"})," \u8FD9\u4E2A\u8BCD \u5728\u6709 1000 \u4E2A\u8BCD\u7684\u6587\u7AE0\u4E2D\u51FA\u73B0\u4E86 ",(0,l.jsx)(e.strong,{children:"10"})," \u6B21\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"TF=1000/10=0.01"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"\u79D1\u6280"})," \u8FD9\u4E2A\u8BCD\u5728\u6240\u6709\u7684 ",(0,l.jsx)(e.strong,{children:"100"})," \u7BC7\u6587\u7AE0\u4E2D\u6709 ",(0,l.jsx)(e.strong,{children:"10"})," \u7BC7\u6587\u7AE0\u5305\u542B\u4E86\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"IDF=log10(100/10)=1"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"TF-IDF=0.01*1=0.01"}),"\n"]})})]})}function d(s={}){let{wrapper:e}={...(0,r.a)(),...s.components};return e?(0,l.jsx)(e,{...s,children:(0,l.jsx)(h,{...s})}):h(s)}},79938:function(s,e,a){a.d(e,{Z:function(){return t},a:function(){return m}});var n=a(75271);let l={},r=n.createContext(l);function m(s){let e=n.useContext(r);return n.useMemo(function(){return"function"==typeof s?s(e):{...e,...s}},[e,s])}function t(s){let e;return e=s.disableParentContext?"function"==typeof s.components?s.components(l):s.components||l:m(s.components),n.createElement(r.Provider,{value:e},s.children)}}}]);