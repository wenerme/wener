"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["50551"],{48522:function(n,e,t){t.r(e),t.d(e,{metadata:()=>s,contentTitle:()=>i,default:()=>x,assets:()=>c,toc:()=>h,frontMatter:()=>l});var s=JSON.parse('{"id":"os/linux/shell/sed","title":"sed","description":"- sed \u4E00\u6B21\u53EA\u80FD\u64CD\u4F5C\u4E00\u884C","source":"@site/../notes/os/linux/shell/sed.md","sourceDirName":"os/linux/shell","slug":"/os/linux/shell/sed","permalink":"/notes/os/linux/shell/sed","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/linux/shell/sed.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1669574227000,"frontMatter":{"title":"sed"},"sidebar":"docs","previous":{"title":"rename","permalink":"/notes/os/linux/shell/rename"},"next":{"title":"Shell Awesome","permalink":"/notes/os/linux/shell/awesome"}}'),d=t("52676"),r=t("79938");let l={title:"sed"},i="sed",c={},h=[{value:"\u66FF\u6362\u7247\u6BB5",id:"\u66FF\u6362\u7247\u6BB5",level:2}];function a(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...n.components};return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(e.header,{children:(0,d.jsx)(e.h1,{id:"sed",children:"sed"})}),"\n",(0,d.jsx)(e.admonition,{type:"caution",children:(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:"sed \u4E00\u6B21\u53EA\u80FD\u64CD\u4F5C\u4E00\u884C"}),"\n"]})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,d.jsxs)(e.table,{children:[(0,d.jsx)(e.thead,{children:(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.th,{children:"command"}),(0,d.jsx)(e.th,{children:"stand for"})]})}),(0,d.jsxs)(e.tbody,{children:[(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:":"}),(0,d.jsx)(e.td,{children:"label"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"="}),(0,d.jsx)(e.td,{children:"line_number"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"a"}),(0,d.jsx)(e.td,{children:"append_text_to_stdout_after_flush"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"b"}),(0,d.jsx)(e.td,{children:"branch_unconditional"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"c"}),(0,d.jsx)(e.td,{children:"range_change"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"d"}),(0,d.jsx)(e.td,{children:"pattern_delete_top/cycle"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"D"}),(0,d.jsx)(e.td,{children:"pattern_ltrunc(line+nl)_top/cycle"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"g"}),(0,d.jsx)(e.td,{children:"pattern=hold"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"G"}),(0,d.jsx)(e.td,{children:"pattern+=nl+hold"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"h"}),(0,d.jsx)(e.td,{children:"hold=pattern"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"H"}),(0,d.jsx)(e.td,{children:"hold+=nl+pattern"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"i"}),(0,d.jsx)(e.td,{children:"insert_text_to_stdout_now"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"l"}),(0,d.jsx)(e.td,{children:"pattern_list"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"n"}),(0,d.jsx)(e.td,{children:"pattern_flush=nextline_continue"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"N"}),(0,d.jsx)(e.td,{children:"pattern+=nl+nextline"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"p"}),(0,d.jsx)(e.td,{children:"pattern_print"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"P"}),(0,d.jsx)(e.td,{children:"pattern_first_line_print"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"q"}),(0,d.jsx)(e.td,{children:"flush_quit"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"r"}),(0,d.jsx)(e.td,{children:"append_file_to_stdout_after_flush"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"s"}),(0,d.jsx)(e.td,{children:"substitute"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"t"}),(0,d.jsx)(e.td,{children:"branch_on_substitute"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"w"}),(0,d.jsx)(e.td,{children:"append_pattern_to_file_now"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"x"}),(0,d.jsx)(e.td,{children:"swap_pattern_and_hold"})]}),(0,d.jsxs)(e.tr,{children:[(0,d.jsx)(e.td,{children:"y"}),(0,d.jsx)(e.td,{children:"transform_chars"})]})]})]}),"\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,d.jsxs)(e.ul,{children:["\n",(0,d.jsx)(e.li,{children:(0,d.jsx)(e.a,{href:"https://docstore.mik.ua/orelly/unix/sedawk/appa_03.htm",children:"Command Summary for sed"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"sed '/pattern/d' file\n\n# perl in place replace\n# \u53EF\u4EE5 \u66FF\u6362 \\r\\n - sed \u4E0D\u53EF\u4EE5\n# -i.bak \u53EF\u751F\u6210\u5907\u4EFD\u6587\u4EF6\nperl -ipe 's/\\n//' file\n"})}),"\n",(0,d.jsx)(e.h2,{id:"\u66FF\u6362\u7247\u6BB5",children:"\u66FF\u6362\u7247\u6BB5"}),"\n",(0,d.jsx)(e.pre,{children:(0,d.jsx)(e.code,{className:"language-bash",children:"lead='^### BEGIN COMMON'\ntail='^### END COMMON'\nsed -e \"/$lead/,/$tail/{ /$lead/{p; r stub/Makefile\n}; /$tail/p; d }\"  commons/Makefile\n"})})]})}function x(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,d.jsx)(e,{...n,children:(0,d.jsx)(a,{...n})}):a(n)}},79938:function(n,e,t){t.d(e,{Z:function(){return i},a:function(){return l}});var s=t(75271);let d={},r=s.createContext(d);function l(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(d):n.components||d:l(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);