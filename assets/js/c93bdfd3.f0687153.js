"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["21286"],{73456:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>r,default:()=>o,assets:()=>c,toc:()=>d,frontMatter:()=>h});var s=JSON.parse('{"id":"dev/format/json/README","title":"JSON","description":"- rfc6901 - JavaScript Object Notation (JSON) Pointer","source":"@site/../notes/dev/format/json/README.md","sourceDirName":"dev/format/json","slug":"/dev/format/json/","permalink":"/notes/dev/format/json/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/format/json/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1733281920000,"frontMatter":{"title":"JSON"},"sidebar":"docs","previous":{"title":"HTTP Archive format","permalink":"/notes/dev/format/har"},"next":{"title":"JSON Schema","permalink":"/notes/dev/format/jsonschema/"}}'),l=i("52676"),t=i("79938");let h={title:"JSON"},r="JSON",c={},d=[{value:"Schema",id:"schema",level:2},{value:"Patch",id:"patch",level:2},{value:"Diff",id:"diff",level:2},{value:"Command line tools",id:"command-line-tools",level:2},{value:"ETL",id:"etl",level:2},{value:"Misc",id:"misc",level:2},{value:"FAQ",id:"faq",level:2},{value:"JSON Patch and JSON Merge Patch",id:"json-patch-and-json-merge-patch",level:3},{value:"\u65F6\u95F4\u683C\u5F0F\u9009\u62E9",id:"\u65F6\u95F4\u683C\u5F0F\u9009\u62E9",level:3}];function a(n){let e={a:"a",code:"code",del:"del",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"json",children:"JSON"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://tools.ietf.org/html/rfc6901",children:"rfc6901"})," - JavaScript Object Notation (JSON) Pointer"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/automerge/automerge",children:"automerge/automerge"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"A JSON-like data structure that can be modified concurrently by different users, and merged again automatically."}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Extension\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"geojson"}),"\n",(0,l.jsx)(e.li,{children:"hljson"}),"\n",(0,l.jsx)(e.li,{children:"json5"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Variants\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"yaml"}),"\n",(0,l.jsx)(e.li,{children:"toml"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/jsonata-js/jsonata",children:"jsonata-js/jsonata"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"JSON query and transformation language"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://jsonata.org/",children:"https://jsonata.org/"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["jsonnl - JSON with new line\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://jsonlines.org/",children:"https://jsonlines.org/"})}),"\n",(0,l.jsxs)(e.li,{children:["Standard MIME content-type ",(0,l.jsx)(e.a,{href:"https://github.com/wardi/jsonlines/issues/19",children:"#19"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:".jsonl"}),", ",(0,l.jsx)(e.code,{children:"application/jsonl"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["jsonlines.org and ndjson.org ",(0,l.jsx)(e.a,{href:"https://github.com/wardi/jsonlines/issues/22",children:"wardi/jsonlines#22"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["ndjson - Newline delimited JSON\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u26A0\uFE0F \u4E0D\u6D3B\u8DC3"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/ndjson/ndjson-spec",children:"ndjson/ndjson-spec"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["wikipedia ",(0,l.jsx)(e.a,{href:"https://en.wikipedia.org/wiki/JSON_streaming",children:"JSON streaming"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"line delimited JSON"}),"\n",(0,l.jsx)(e.li,{children:"concatenated JSON"}),"\n",(0,l.jsx)(e.li,{children:"length-prefixed JSON"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"schema",children:"Schema"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"http://json-schema.org/",children:"json-schema"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://www.jsonschema2pojo.org/",children:"jsonschema2pojo"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Json Schema \u751F\u6210 Pojo"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://app.quicktype.io",children:"app.quicktype.io"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"patch",children:"Patch"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://tools.ietf.org/html/rfc6902",children:"rfc6902"})," - JSON Patch\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"application/json-patch+json"})}),"\n",(0,l.jsx)(e.li,{children:"\u57FA\u4E8E\u64CD\u4F5C - op, path, value - \u66F4\u9002\u7528\u4E8E\u590D\u6742\u573A\u666F"}),"\n",(0,l.jsx)(e.li,{children:"op = add, remove, replace, move, copy, test"}),"\n",(0,l.jsxs)(e.li,{children:["test \u7528\u4E8E\u65AD\u8A00\uFF0C\u65AD\u8A00\u5931\u8D25\u5219\u64CD\u4F5C\u5931\u8D25\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u4F8B\u5982 ",(0,l.jsx)(e.code,{children:'{ "op": "test", "path": "/a/b/c", "value": "foo" }'})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://tools.ietf.org/html/rfc7396",children:"rfc7396"})," - JSON Merge Patch\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.code,{children:"application/merge-patch+json"})}),"\n",(0,l.jsxs)(e.li,{children:["\u57FA\u4E8E\u6587\u6863\u5408\u5E76 - ",(0,l.jsx)(e.code,{children:'{"key":"new value"}'})," - \u9002\u7528\u4E8E\u7B80\u5355\u573A\u666F"]}),"\n",(0,l.jsx)(e.li,{children:"\u8BBE\u7F6E key \u4E3A null \u8868\u793A\u5220\u9664"}),"\n",(0,l.jsx)(e.li,{children:"\u6570\u7EC4\u53EA\u80FD\u66FF\u6362"}),"\n",(0,l.jsx)(e.li,{children:"\u5408\u5E76\u64CD\u4F5C\u4E0D\u4F1A\u51FA\u9519"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.del,{children:"rfc7386"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"http://jsonpatch.com/",children:"jsonpatch"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://news.ycombinator.com/item?id=31301627",children:"HN"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/flipkart-incubator/zjsonpatch",children:"flipkart-incubator/zjsonpatch"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#patch-operations",children:"https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#patch-operations"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"application/strategic-merge-patch+json"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u57FA\u4E8E Merge Patch"}),"\n",(0,l.jsxs)(e.li,{children:["list \u5408\u5E76\u57FA\u4E8E name \u53BB\u91CD\u5408\u5E76\uFF0C\u800C\u4E0D\u662F\u76F4\u63A5\u66FF\u6362\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"patchStrategy"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"$patch"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"replace, delete"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/kubernetes/community/blob/master/contributors/devel/sig-api-machinery/strategic-merge-patch.md",children:"Strategic Merge Patch"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"diff",children:"Diff"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/DoneDeal0/superdiff",children:"DoneDeal0/superdiff"})}),"\n",(0,l.jsxs)(e.li,{children:["[benjamine/jsondiffpatch](- ",(0,l.jsx)(e.a,{href:"https://github.com/benjamine/jsondiffpatch",children:"https://github.com/benjamine/jsondiffpatch"}),")\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"npm:jsondiffpatch"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/benjamine/jsondiffpatch/blob/master/docs/formatters.md",children:"https://github.com/benjamine/jsondiffpatch/blob/master/docs/formatters.md"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://benjamine.github.io/jsondiffpatch",children:"https://benjamine.github.io/jsondiffpatch"})}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/andreyvit/json-diff",children:"andreyvit/json-diff"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"MIT, CoffeeScript"}),"\n",(0,l.jsx)(e.li,{children:"npm:json-diff"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/google/diff-match-patch",children:"google/diff-match-patch"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"plain text"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/trailofbits/graphtage",children:"trailofbits/graphtage"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"LGPLv3, Python"}),"\n",(0,l.jsx)(e.li,{children:"JSON, JSON5, XML, HTML, YAML, CSV"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/sanity-io/mendoza",children:"sanity-io/mendoza"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"MIT, Go"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://www.sanity.io/blog/mendoza",children:"Mendoza: Use stack machines to compute efficient JSON diffs"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://news.ycombinator.com/item?id=24943775",children:"HN"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://extendsclass.com/json-diff.html",children:"https://extendsclass.com/json-diff.html"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/zgrossbart/jdd",children:"zgrossbart/jdd"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"http://www.jsondiff.com/",children:"http://www.jsondiff.com/"})}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://json-diff.com/",children:"https://json-diff.com/"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/mattphillips/deep-object-diff",children:"mattphillips/deep-object-diff"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/flitbit/diff",children:"flitbit/diff"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/Starcounter-Jack/JSON-Patch",children:"Starcounter-Jack/JSON-Patch"})}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/kpdecker/jsdiff",children:"kpdecker/jsdiff"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Text Diff"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"command-line-tools",children:"Command line tools"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/antonmedv/fx",children:"antonmedv/fx"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/jmespath/jp",children:"jmespath/jp"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"etl",children:"ETL"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/jsonata-js/jsonata",children:"jsonata-js/jsonata"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"JSONata query and transformation language"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/bazaarvoice/jolt",children:"bazaarvoice/jolt"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Apache-2.0, Java"}),"\n",(0,l.jsx)(e.li,{children:"JOLT - JsOn Language for Transform"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://jmespath.org/",children:"jmespath"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/jmespath/go-jmespath",children:"jmespath/go-jmespath"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"misc",children:"Misc"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/WebReflection/JSONH",children:"WebReflection/JSONH"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Reducce JSON Size"}),"\n",(0,l.jsx)(e.li,{children:"hpack"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"faq",children:"FAQ"}),"\n",(0,l.jsx)(e.h3,{id:"json-patch-and-json-merge-patch",children:"JSON Patch and JSON Merge Patch"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"rfc6902 vs rfc7396"}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://erosb.github.io/post/json-patch-vs-merge-patch/",children:"JSON Patch and JSON Merge Patch"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h3,{id:"\u65F6\u95F4\u683C\u5F0F\u9009\u62E9",children:"\u65F6\u95F4\u683C\u5F0F\u9009\u62E9"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"ISO 8601"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"new Date().toJSON()"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"2018-04-16T05:24:53.603Z"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["Java ",(0,l.jsx)(e.code,{children:"new SimpleDateFormat(\"yyyy-MM-dd'T'HH:mm:ss.SSS'Z'\", Locale.CHINA)"})]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://stackoverflow.com/q/10286204/1870054",children:"The \u201Cright\u201D JSON date format"})}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-js",children:"new Date().toJSON() === new Date().toISOString();\n"})})]})}function o(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(a,{...n})}):a(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return r},a:function(){return h}});var s=i(75271);let l={},t=s.createContext(l);function h(n){let e=s.useContext(t);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:h(n.components),s.createElement(t.Provider,{value:e},n.children)}}}]);