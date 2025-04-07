"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["13499"],{43888:function(e,n,t){t.r(n),t.d(n,{metadata:()=>r,contentTitle:()=>s,default:()=>m,assets:()=>l,toc:()=>d,frontMatter:()=>i});var r=JSON.parse('{"id":"ai/ml/datumaro","title":"datumaro","description":"- openvinotoolkit/datumaro","source":"@site/../notes/ai/ml/datumaro.md","sourceDirName":"ai/ml","slug":"/ai/ml/datumaro","permalink":"/notes/ai/ml/datumaro","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ai/ml/datumaro.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1720762271000,"frontMatter":{"title":"datumaro"},"sidebar":"docs","previous":{"title":"CVAT","permalink":"/notes/ai/ml/cvat"},"next":{"title":"DeepSpeech","permalink":"/notes/ai/ml/deepspeech"}}'),a=t("52676"),o=t("79938");let i={title:"datumaro"},s="datumaro",l={},d=[{value:"Reference",id:"reference",level:2},{value:"error: can&#39;t find Rust compiler",id:"error-cant-find-rust-compiler",level:2},{value:"disable telemetry",id:"disable-telemetry",level:2},{value:"schema",id:"schema",level:2}];function c(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"datumaro",children:"datumaro"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.a,{href:"https://github.com/openvinotoolkit/datumaro",children:"openvinotoolkit/datumaro"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"MIT, Python"}),"\n"]}),"\n"]}),"\n",(0,a.jsxs)(n.li,{children:["\u6CE8\u610F\u26A0\uFE0F \u4F9D\u8D56\u7684 ",(0,a.jsx)(n.a,{href:"/notes/ai/ml/openvino",children:"openvino"})," \u53EF\u80FD\u5BF9 Python \u7248\u672C\u6709\u8981\u6C42\uFF0C\u5B89\u88C5\u4E0D\u4E0A\u4F1A\u5BFC\u81F4\u5B89\u88C5 0.5.0 \u7684 datumaro\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["openvino==2023.2\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["\u8981\u6C42 Python ",(0,a.jsx)(n.strong,{children:"3.8-3.11"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# https://pypi.org/project/datumaro/\npip3 install datumaro                   # \u6838\u5FC3\u5E93\npip3 install 'datumaro[default]==1.7.0' # \u9ED8\u8BA4\u4F9D\u8D56\uFF0C\u4F5C\u4E3A CLI \u4F7F\u7528\n\ndatum --version\npip install --upgrade datumaro # \u5982\u679C\u662F\u65E7\u7248\u672C\uFF0C\u5219\u5C1D\u8BD5\u5347\u7EA7\n\nmkdir ds\ncd ds\n# \u4F1A\u521B\u5EFA .datumaro .dvc .dvcignore\ndatum project create\n\ndatum project export -e '/item/annotation' --filter-mode 'i+a' -f --save-images < your_target_format > --\n\n# -t TRANSFORM [-o DST_DIR] [--overwrite] [-p PROJECT_DIR] [--stage STAGE] [--apply APPLY] [target]\ndatum transform -t random_split ds:yolo -- --subset train:.67 --subset test:.33 # \u968F\u673A\u5206\u5272\u6570\u636E\u96C6\n"})}),"\n",(0,a.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# near-duplicated images\ndatum prune -m ndr -p </path/to/project/>\n\ndatum transform -t ndr -- \\\n  --working_subset train\n  --algorithm gradient\n  --num_cut 100\n  --over_sample random\n  --under_sample uniform\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["ndr\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://openvinotoolkit.github.io/datumaro/latest/docs/command-reference/context_free/transform.html#ndr",children:"https://openvinotoolkit.github.io/datumaro/latest/docs/command-reference/context_free/transform.html#ndr"})}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://openvinotoolkit.github.io/datumaro/latest/docs/command-reference/context_free/index.html",children:"https://openvinotoolkit.github.io/datumaro/latest/docs/command-reference/context_free/index.html"})}),"\n"]}),"\n",(0,a.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,a.jsx)(n.h2,{id:"error-cant-find-rust-compiler",children:"error: can't find Rust compiler"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"brew install rust\n"})}),"\n",(0,a.jsx)(n.h2,{id:"disable-telemetry",children:"disable telemetry"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"# %localappdata%\\Intel Corporation\\isip\nrm -rf $HOME/intel/isip\n"})}),"\n",(0,a.jsx)(n.h2,{id:"schema",children:"schema"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-ts",children:"export interface Root {\n  info: Info;\n  categories: Categories;\n  items: Item[];\n}\n\nexport interface Info {}\n\nexport interface Categories {\n  label: Label;\n  points: Points;\n}\n\nexport interface Label {\n  labels: Label2[];\n  attributes: string[];\n}\n\nexport interface Label2 {\n  name: string;\n  parent: string;\n  attributes: any[];\n}\n\nexport interface Points {\n  items: any[];\n}\n\nexport interface Item {\n  id: string; // frame_000000\n  annotations: Annotation[];\n  attr: Attr;\n  point_cloud: { path: '' };\n  image: Image;\n}\n\nexport interface Annotation {\n  id: number;\n  type: string;\n  attributes: Attributes;\n  group: number;\n  label_id: number;\n  z_order: number;\n  bbox: number[];\n}\n\nexport interface Attributes {\n  occluded: boolean;\n  rotation: number;\n  track_id: number;\n  keyframe: boolean;\n}\n\nexport interface Attr {\n  frame: number;\n}\n\nexport interface Image {\n  path: string;\n  size: number[];\n}\n"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.a,{href:"https://openvinotoolkit.github.io/datumaro/latest/docs/data-formats/formats/datumaro.html",children:"https://openvinotoolkit.github.io/datumaro/latest/docs/data-formats/formats/datumaro.html"})}),"\n"]})]})}function m(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return s},a:function(){return i}});var r=t(75271);let a={},o=r.createContext(a);function i(e){let n=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:i(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);