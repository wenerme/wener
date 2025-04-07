"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["69324"],{60508:function(e,n,t){t.r(n),t.d(n,{metadata:()=>a,contentTitle:()=>s,default:()=>h,assets:()=>c,toc:()=>o,frontMatter:()=>i});var a=JSON.parse('{"id":"db/graph/cayley","title":"Cayley","description":"- cayleygraph/cayley","source":"@site/../notes/db/graph/cayley.md","sourceDirName":"db/graph","slug":"/db/graph/cayley","permalink":"/notes/db/graph/cayley","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/db/graph/cayley.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1638548289000,"frontMatter":{"title":"Cayley"},"sidebar":"docs","previous":{"title":"ArangoDB","permalink":"/notes/db/graph/arangodb"},"next":{"title":"dgraph","permalink":"/notes/db/graph/dgraph"}}'),l=t("52676"),r=t("79938");let i={title:"Cayley"},s="Cayley",c={},o=[{value:"gizmo",id:"gizmo",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"cayley",children:"Cayley"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/cayleygraph/cayley",children:"cayleygraph/cayley"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"quadstore"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u652F\u6301\u7684\u5B58\u50A8\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"KVs: Bolt, LevelDB"}),"\n",(0,l.jsx)(n.li,{children:"NoSQL: MongoDB"}),"\n",(0,l.jsx)(n.li,{children:"SQL: PostgreSQL, CockroachDB, MySQL"}),"\n",(0,l.jsx)(n.li,{children:"In-memory, ephemeral"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u8FD4\u56DE\u6240\u6709\u5C5E\u6027 ",(0,l.jsx)(n.a,{href:"https://discourse.cayley.io/t/get-vertex-with-all-predicates/1416/2",children:"https://discourse.cayley.io/t/get-vertex-with-all-predicates/1416/2"})]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://cayley.io/",children:"https://cayley.io/"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://cayley.gitbook.io/cayley/",children:"https://cayley.gitbook.io/cayley/"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.cs.bham.ac.uk/~petitcz/files/Cayley.pdf",children:"https://www.cs.bham.ac.uk/~petitcz/files/Cayley.pdf"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"brew add cayley\n\n# \u542F\u52A8\u670D\u52A1\n# http://127.0.0.1:64210\ncayley http\n\n# Docker \u542F\u52A8\ndocker run --rm -it -v $PWD:/data -p 64210:64210 cayleygraph/cayley\n\n# \u6837\u672C\u6570\u636E\ncurl -OL https://github.com/cayleygraph/cayley/raw/master/data/30kmoviedata.nq.gz\ncayley http --load 30kmoviedata.nq.gz\n\n\ncayley repl\n"})}),"\n",(0,l.jsx)(n.h2,{id:"gizmo",children:"gizmo"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://cayley.gitbook.io/cayley/gizmoapi",children:"https://cayley.gitbook.io/cayley/gizmoapi"})}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"// \u57FA\u672C\u67E5\u8BE2\ng.V().getLimit(5);\n\n// \u5C5E\u6027\u67E5\u8BE2\ng.V().has('<name>', 'Humphrey Bogart').all();\n\n// \u590D\u6742\u8DEF\u5F84 - \u53EF\u4EE5\u9884\u5B9A\u4E49\u8DEF\u5F84\nvar filmToActor = g.Morphism().out('</film/film/starring>').out('</film/performance/actor>');\n\ng.V().has('<name>', 'Casablanca').follow(filmToActor).out('<name>').all();\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-js",children:"var result = {};\nvar person = g.V('wener');\nresult['id'] = 'wener';\nperson.outPredicates().forEach(function (d) {\n  result[d.id] = person.out(d.id).toValue();\n});\n\ng.emit(result);\n"})})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return s},a:function(){return i}});var a=t(75271);let l={},r=a.createContext(l);function i(e){let n=a.useContext(r);return a.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);