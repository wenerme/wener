"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["43977"],{7152:function(e,n,s){s.r(n),s.d(n,{metadata:()=>i,contentTitle:()=>l,default:()=>h,assets:()=>c,toc:()=>a,frontMatter:()=>o});var i=JSON.parse('{"id":"web/script/lib/zod","title":"zod","description":"- colinhacks/zod","source":"@site/../notes/web/script/lib/zod.md","sourceDirName":"web/script/lib","slug":"/web/script/lib/zod","permalink":"/notes/web/script/lib/zod","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/script/lib/zod.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1708697175000,"frontMatter":{"title":"zod"},"sidebar":"docs","previous":{"title":"typebox","permalink":"/notes/web/script/lib/typebox"},"next":{"title":"Polyfill","permalink":"/notes/web/script/polyfill"}}'),t=s("52676"),r=s("79938");let o={title:"zod"},l="zod",c={},a=[{value:"openapi",id:"openapi",level:2}];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"zod",children:"zod"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/colinhacks/zod",children:"colinhacks/zod"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["adpoted by: ",(0,t.jsx)(n.a,{href:"/notes/web/script/lib/trpc",children:"tRPC"})]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://zod.dev/",children:"zod.dev"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/StefanTerdell/zod-to-json-schema",children:"StefanTerdell/zod-to-json-schema"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/fabien0102/ts-to-zod",children:"fabien0102/ts-to-zod"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/asteasolutions/zod-to-openapi",children:"asteasolutions/zod-to-openapi"})}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/Effect-TS/schema",children:"Effect-TS/schema"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u6709\u70B9\u7C7B\u4F3C Typebox \u5B9A\u4E49 schema \u7684\u611F\u89C9"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["parse \u4F1A\u8FD4\u56DE clone \u7684\u5BF9\u8C61\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u6240\u4EE5\u6027\u80FD\u4F1A\u5DEE\u4E00\u70B9 ",(0,t.jsx)(n.a,{href:"https://github.com/colinhacks/zod/issues/205",children:"#205"})]}),"\n",(0,t.jsxs)(n.li,{children:["\u4F7F\u7528 proxy \u5BF9\u8C61\u65F6\u9700\u8981\u6CE8\u610F\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4F8B\u5982\u4E0D\u80FD\u914D\u5408 immer\u3001valtio \u4F7F\u7528"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/colinhacks/zod/issues/1769",children:"#1769"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://github.com/colinhacks/zod/discussions/2030",children:"#2030"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Serialize"}),"\n",(0,t.jsx)(n.li,{children:"Serialize \u63A8\u8350 JSONSchema - \u51CF\u5C11\u90E8\u5206\u6821\u9A8C\uFF0C\u4F46\u80FD\u7528\u5230\u66F4\u591A\u573A\u666F"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"// \u6821\u9A8C\u5408\u6CD5 JSON \u5BF9\u8C61\nconst LiteralSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);\ntype Literal = z.infer<typeof LiteralSchema>;\ntype Json = Literal | { [key: string]: Json } | Json[];\nconst JsonSchema: z.ZodType<Json> = z.lazy(() => z.union([LiteralSchema, z.array(JsonSchema), z.record(JsonSchema)]));\n"})}),"\n",(0,t.jsx)(n.h2,{id:"openapi",children:"openapi"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/asteasolutions/zod-to-openapi",children:"asteasolutions/zod-to-openapi"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';\nimport { z } from 'zod';\n\n// \u589E\u52A0 openapi \u65B9\u6CD5\nextendZodWithOpenApi(z);\n\n// \u652F\u6301\u5B9A\u4E49\u989D\u5916\u6570\u636E\nz.string().openapi({ description: 'Some string' });\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4F7F\u7528 registry \u5B9A\u4E49\u63A5\u53E3\u65B9\u6CD5"}),"\n",(0,t.jsx)(n.li,{children:"\u901A\u8FC7 schema \u5B9A\u4E49\u7684\u5BF9\u8C61\u9ED8\u8BA4\u4F1A\u5305\u542B\u5728 registry \u4E2D"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:"import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';\n\nconst registry = new OpenAPIRegistry();\n\n// Registry \u4E5F\u53EF\u4EE5\u5B9A\u4E49 Schema\nconst UserSchema = registry.register(\n  'User',\n  z.object({\n    id: z.string().openapi({ example: '1212121' }),\n    name: z.string().openapi({ example: 'John Doe' }),\n    age: z.number().openapi({ example: 42 }),\n  })\n);\n\n// \u5B9A\u4E49\u63A5\u53E3\nregistry.registerPath({\n  method: 'get',\n  path: '/users/{id}',\n  description: 'Get user data by its id',\n  summary: 'Get a single user',\n  request: {\n    params: z.object({\n      id: z.string().openapi({ example: '1212121' }),\n    }),\n  },\n  responses: {\n    200: {\n      description: 'Object with user data.',\n      content: {\n        'application/json': {\n          schema: UserSchema,\n        },\n      },\n    },\n    204: {\n      description: 'No content - successful operation',\n    },\n  },\n});\n\nconst generator = new OpenApiGeneratorV3(registry.definitions);\n\n// \u751F\u6210\u6587\u6863\ngenerator.generateComponents();\n"})})]})}function h(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return l},a:function(){return o}});var i=s(75271);let t={},r=i.createContext(t);function o(e){let n=i.useContext(r);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);