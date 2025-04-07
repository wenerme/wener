"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["97784"],{67265:function(e,n,r){r.r(n),r.d(n,{metadata:()=>t,contentTitle:()=>a,default:()=>d,assets:()=>o,toc:()=>c,frontMatter:()=>i});var t=JSON.parse('{"id":"service/api/graphql/graphql-code-generator","title":"graphql-code-generator","description":"- dotansimha/graphql-code-generator \u662F\u4EC0\u4E48\uFF1F","source":"@site/../notes/service/api/graphql/graphql-code-generator.md","sourceDirName":"service/api/graphql","slug":"/service/api/graphql/code-generator","permalink":"/notes/service/api/graphql/code-generator","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/api/graphql/graphql-code-generator.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1721277861000,"frontMatter":{"title":"graphql-code-generator"},"sidebar":"docs","previous":{"title":"GraphQL Awesome","permalink":"/notes/service/api/graphql/awesome"},"next":{"title":"graphql config","permalink":"/notes/service/api/graphql/config"}}'),l=r("52676"),s=r("79938");let i={title:"graphql-code-generator"},a="graphql-code-generator",o={},c=[{value:"plugins",id:"plugins",level:2},{value:"examples",id:"examples",level:2},{value:"Bundle size",id:"bundle-size",level:2}];function p(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.header,{children:(0,l.jsx)(n.h1,{id:"graphql-code-generator",children:"graphql-code-generator"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:[(0,l.jsx)(n.a,{href:"https://github.com/dotansimha/graphql-code-generator",children:"dotansimha/graphql-code-generator"})," \u662F\u4EC0\u4E48\uFF1F\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u57FA\u4E8E GraphQL \u7684\u4EE3\u7801\u751F\u6210\u5DE5\u5177"}),"\n",(0,l.jsx)(n.li,{children:"\u652F\u6301\u7684\u524D\u7AEF\u6846\u67B6 urql, apollo, react-query, react, vue, svelte"}),"\n",(0,l.jsx)(n.li,{children:"\u652F\u6301\u7684\u540E\u7AEF Java Resolver, Kotlin, Java, Java Apollo Android"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://the-guild.dev/graphql/codegen",children:"https://the-guild.dev/graphql/codegen"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:'# \u5B89\u88C5 cli - \u4F9D\u8D56\u63D2\u4EF6\u65E0\u6CD5 npx\nnpm add -D @graphql-codegen/cli @graphql-codegen/typescript\nnpx -y graphql-codegen init\n\nnpx -y graphql-codegen download-schema http://localhost:8080/graphql --output graphql.schema.json\nnpx -y graphql-codegen download-schema http://localhost:8080/graphql -H "Authorization: Bearer $TOKEN" --output graphql.schema.json\n\n# \u5BA2\u6237\u7AEF\u76F8\u5173\nnpm add -D @graphql-codegen/typescript-urql\n\n# introspection \u751F\u6210 schema \u65B9\u4FBF IDE \u8865\u5168\nnpm add -D @graphql-codegen/introspection\n'})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"overwrite: true\n# \u63A5\u53E3\nschema: 'http://localhost:8080/api/v1/graphql'\n# \u626B\u63CF\u6587\u4EF6\ndocuments: 'src/**/*.graphql'\ngenerates:\n  # \u751F\u6210\u5B9A\u4E49\n  src/generated/graphql.ts:\n    plugins:\n      - typescript:\n      # \u751F\u6210 query / mutation / subscription / fragment\n      - typescript-operations\n      # gql-tag \u7684 document\n      - typescript-document-nodes\n\n      # @graphql-codegen/typed-document-node\n      # https://github.com/dotansimha/graphql-typed-document-node\n      # \u7F16\u8BD1\u540E\u7684 Node - JSON \u5BF9\u8C61 - \u4E0D\u9700\u8981 gql-tag\n      # \u4F53\u79EF\u4F1A\u66F4\u5927 - \u4F46\u4E0D\u9700\u8981\u8FD0\u884C\u65F6 parse\n      - typed-document-node\n      # @graphql-codegen/typescript-urql\n      # URQL \u5BA2\u6237\u7AEF - hook\n      - typescript-urql:\n          urqlImportFrom: ../client/urql\n          documentMode: external\n          # in same file - fake import\n          importDocumentNodeExternallyFrom: '../client/urql'\n    config:\n      # URQL \u751F\u6210 useQuery, useMutation\n      withHooks: true\n      useTypeImports: true\n  # \u751F\u6210 introspection\n  ./graphql.schema.json:\n    plugins:\n      - 'introspection'\n  # \u751F\u6210 URQL \u7528\u7684 Schema - \u76F8\u5BF9\u5C0F\u4E00\u70B9\n  src/generated/urql.schema.json:\n    plugins:\n      - 'urql-introspection'\n"})}),"\n",(0,l.jsx)(n.h2,{id:"plugins",children:"plugins"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["@graphql-codegen/client-preset\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"@apollo/client"}),"\n",(0,l.jsx)(n.li,{children:"@urql/core"}),"\n",(0,l.jsx)(n.li,{children:"@urql/preset"}),"\n",(0,l.jsx)(n.li,{children:"urql"}),"\n",(0,l.jsx)(n.li,{children:"graphql-request"}),"\n",(0,l.jsx)(n.li,{children:"react-query + graphql-request"}),"\n",(0,l.jsx)(n.li,{children:"swr + graphql-request"}),"\n",(0,l.jsx)(n.li,{children:"Embrace Fragment Masking principles"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"FragmentType<T>"})}),"\n",(0,l.jsxs)(n.li,{children:["useFragment/getFragmentData\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"\u4E0D\u662F\u4E00\u4E2A hook"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen",children:"Unleash the power of Fragments with GraphQL Codegen"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"npm add -D @graphql-codegen/near-operation-file-preset\n"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-yaml",children:"generates:\n  src/:\n    preset: near-operation-file\n    presetConfig:\n      extension: .generated.tsx\n      # baseTypesPath: types.ts\n      baseTypesPath: '~@src/generated/graphql'\n    plugins:\n      - typescript-operations\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://the-guild.dev/graphql/codegen/plugins",children:"https://the-guild.dev/graphql/codegen/plugins"})}),"\n"]}),"\n",(0,l.jsx)(n.h2,{id:"examples",children:"examples"}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"codegen.ts"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import type { CodegenConfig } from '@graphql-codegen/cli';\nimport dotenv from 'dotenv';\n\ndotenv.config({ path: ['.env.local', '.env'] });\n\nconst config: CodegenConfig = {\n  overwrite: true,\n  schema: {\n    'http://127.0.0.:3000/graphql': {\n      headers: {\n        Authorization: `Bearer ${process.env.GQL_TOKEN}`,\n      },\n    },\n  },\n  documents: 'src/**/*.graphql',\n  hooks: {},\n  generates: {\n    'src/gen/gql.ts': { plugins: ['typescript'] },\n    './graphql.schema.json': {\n      plugins: ['introspection'],\n    },\n    'src/': {\n      preset: 'near-operation-file',\n      presetConfig: {\n        extension: '.gen.tsx',\n        baseTypesPath: '~@/gen/gql',\n      },\n      plugins: ['typescript-operations'],\n    },\n  },\n};\n\nexport default config;\n"})}),"\n",(0,l.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,l.jsx)(n.h2,{id:"bundle-size",children:"Bundle size"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-ts",children:"import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react-swc';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [\n    react({\n      plugins: [\n        ['@graphql-codegen/client-preset-swc-plugin', { artifactDirectory: './src/gql', gqlTagName: 'graphql' }],\n      ],\n    }),\n  ],\n});\n"})}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.code,{children:"@graphql-codegen/client-preset-swc-plugin"})}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://the-guild.dev/blog/optimize-bundle-size-with-swc-and-graphql-codegen",children:"https://the-guild.dev/blog/optimize-bundle-size-with-swc-and-graphql-codegen"})}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return a},a:function(){return i}});var t=r(75271);let l={},s=t.createContext(l);function i(e){let n=t.useContext(s);return t.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:i(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);