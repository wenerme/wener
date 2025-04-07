"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["31805"],{3999:function(e,n,t){t.r(n),t.d(n,{metadata:()=>i,contentTitle:()=>a,default:()=>p,assets:()=>o,toc:()=>l,frontMatter:()=>c});var i=JSON.parse('{"id":"web/react/bit","title":"bit","description":"bit \u4F1A\u4E3A\u6BCF\u4E2A\u7EC4\u4EF6\u5EFA\u7ACB git \u201C\u4ED3\u5E93\u201D\uFF0C\u7EF4\u62A4\u6BCF\u4E2A\u7EC4\u4EF6\u7684\u751F\u547D\u5468\u671F\u3002","source":"@site/../notes/web/react/bit.md","sourceDirName":"web/react","slug":"/web/react/bit","permalink":"/notes/web/react/bit","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/web/react/bit.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1655510210000,"frontMatter":{"title":"bit"},"sidebar":"docs","previous":{"title":"Base UI","permalink":"/notes/web/react/base-ui"},"next":{"title":"BlueprinrJS","permalink":"/notes/web/react/blueprint"}}'),s=t("52676"),r=t("79938");let c={title:"bit"},a="bit",o={},l=[{value:"bit server",id:"bit-server",level:2},{value:"\u73AF\u5883",id:"\u73AF\u5883",level:2},{value:"\u5E94\u7528",id:"\u5E94\u7528",level:2},{value:"PKG",id:"pkg",level:2},{value:"\u901A\u8FC7\u4EE3\u7801\u83B7\u53D6\u7EC4\u4EF6\u4FE1\u606F",id:"\u901A\u8FC7\u4EE3\u7801\u83B7\u53D6\u7EC4\u4EF6\u4FE1\u606F",level:2}];function d(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"bit",children:"bit"})}),"\n",(0,s.jsx)(n.p,{children:"bit \u4F1A\u4E3A\u6BCF\u4E2A\u7EC4\u4EF6\u5EFA\u7ACB git \u201C\u4ED3\u5E93\u201D\uFF0C\u7EF4\u62A4\u6BCF\u4E2A\u7EC4\u4EF6\u7684\u751F\u547D\u5468\u671F\u3002"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/teambit/bit",children:"teambit/bit"})}),"\n",(0,s.jsx)(n.li,{children:"BVM - bit version manager"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.code,{children:"@<owner>/<scope>.<namespace>.<component-name>"})}),"\n",(0,s.jsxs)(n.li,{children:["my-org.my-scope/ui/inputs/button\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"ID: my-org.my-scope/ui/inputs/button"}),"\n",(0,s.jsx)(n.li,{children:"Scope: my-org.my-scope"}),"\n",(0,s.jsx)(n.li,{children:"Name: ui/inputs/button"}),"\n",(0,s.jsxs)(n.li,{children:["Package: ",(0,s.jsx)(n.code,{children:"@my-org/my-scope.ui.inputs.button"})]}),"\n",(0,s.jsx)(n.li,{children:"\u4E00\u822C\u4E3A organization.team - \u4F8B\u5982: teambit.docs"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["bit\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Git \u76F8\u5173: tag, untag, add, untrack, diff, lane, snap, export, import, checkout, artifacts, remote\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"lane = branch"}),"\n",(0,s.jsx)(n.li,{children:"export = push"}),"\n",(0,s.jsx)(n.li,{children:"import = pull"}),"\n",(0,s.jsx)(n.li,{children:".git/bit/scope.json = .git/config"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"pnpm \u76F8\u5173: install, link"}),"\n",(0,s.jsx)(n.li,{children:"scope fork = fork \u4ED3\u5E93"}),"\n",(0,s.jsx)(n.li,{children:"start, compile, test, lint, format, build"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/bit-demos/base-ui",children:"bit-demos/base-ui"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"caution",children:(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["react 18 ",(0,s.jsx)(n.a,{href:"https://github.com/teambit/bit/issues/5751",children:"#5751"})]}),"\n"]})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'# \u4E0B\u8F7D\u7F13\u5B58 ~/.bvm/temp/bit-0.0.762.tar.gz\n# \u5B89\u88C5\u4F4D\u7F6E \uFF5E/.bvm/versions/0.0.762\n# \u975E\u5E38\u5927 - \u7EA6 1.2G node_modules\n# https://bvm.bit.dev/\n# https://bvm.bit.dev/versions/dev/Darwin/0.0.762/bit-0.0.762.tar.gz\nnpx @teambit/bvm install\n\n# \u65B0\u9879\u76EE\n# ==========\n# \u9ED8\u8BA4 \u4F7F\u7528 pnpm\n# bit templates\n# --default-scope my-org.my-scope\nbit new react my-ui\ncd my-ui\nbit start\n\n# my-scope/ui/my-welcome\nbit create react ui/my-welcome              #  \u521B\u5EFA\u7EC4\u4EF6\nbit show ui/my-welcome                      # \u67E5\u770B\u7EC4\u4EF6\u72B6\u6001\nbit tag ui/my-welcome -v 1.0.0 -m "initial" # tag \u672C\u5730\u7248\u672C\nbit diff ui/my-welcome                      # \u4FEE\u6539\u540E\u53EF\u67E5\u770B\u53D8\u5316\nbit log ui/my-welcome                       # \u5386\u53F2\u4FEE\u6539\nbit artifacts ui/my-welcome                 #\u6587\u4EF6\u5185\u5BB9\nbit dependencies ui/my-welcome              # \u67E5\u770B\u7EC4\u4EF6\u4F9D\u8D56\n\n# \u5FEB\u7167\u4F1A\u751F\u6210 hash - \u7528\u4E8E\u534F\u4F5C\n# \u672C\u8D28\u7C7B\u4F3C tag\nbit snap ui/my-welcome --message "demo snapshot"\n\n# bit export [collection]\n# bit import\n# bit checkout latest --all\n# bit untag\n\nbit status\n\n# \u5DF2\u6709\u9879\u76EE\n# ==========\n# --bare \u7528\u4E8E\u81EA\u5EFA server\n# monorepo \u9700\u8981\u5728 root \u4F4D\u7F6E init\nbit init --bare\n\n# \u5E38\u7528\u64CD\u4F5C\n# ==========\nnpx @teambit/bvm upgrade          # \u5347\u7EA7 bit\nbit add src/components/button     # \u6DFB\u52A0\u7EC4\u4EF6\nbit untrack src/components/button #\u53D6\u6D88\u8DDF\u8E2A\u7EC4\u4EF6\n\nbit move ui/my-component design/my-component # \u8C03\u6574\u7EC4\u4EF6\u4F4D\u7F6E\n\nbit eject teambit.design/ui/buttons/button  # \u8C03\u6574\u7EC4\u4EF6\u4ED3\u5E93\nbit import teambit.design/ui/buttons/button # \u5728\u65B0\u7684\u4ED3\u5E93\u5BFC\u5165\n\nbit install "classnames@^2" -u # \u5B89\u88C5\u5347\u7EA7\u4F9D\u8D56\n\n# \u91CD\u547D\u540D\u7EC4\u4EF6\n# --refactor \u4F1A\u8C03\u6574\u73B0\u6709\u4EE3\u7801\nbit rename loaders/skeleton placeholders/skeleton --refactor\n\nbit show ui/my-welcome # \u67E5\u770B\u7EC4\u4EF6\u4FE1\u606F\n# \u83B7\u53D6\u7EC4\u4EF6 \u5143\u4FE1\u606F\n# \u53EF\u4EE5\u662F remote\nbit aspect get my-org.my-scope/ui/my-welcome\n\nbit cat-scope # \u67E5\u770B\u7528\u5230\u7684 scope\nbit insights  # \u5206\u6790\u5FAA\u73AF\u4F9D\u8D56\nbit env       # \u7EC4\u4EF6\u73AF\u5883\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:".bitmap - \u81EA\u52A8\u751F\u6210 - \u7EC4\u4EF6\u5230\u76EE\u5F55\u6620\u5C04"}),"\n",(0,s.jsx)(n.li,{children:"workspace.jsonc"}),"\n",(0,s.jsxs)(n.li,{children:[".git/bit - Local Scope\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"cache,components,objects,scope.json"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title="workspace.jsonc"',children:'{\n  "teambit.workspace/workspace": {\n    "name": "my-ui",\n    // icon: ""\n\n    // <root>/{scope}/{name}/button/index.ts\n    "defaultDirectory": "{scope}/{name}",\n    "defaultScope": "my-org.my-scope"\n  },\n  "teambit.dependencies/dependency-resolver": {\n    "packageManager": "teambit.dependencies/pnpm",\n    "policy": {\n      "dependencies": {},\n      "peerDependencies": {}\n    }\n  },\n  "teambit.workspace/variants": {\n    "{ui/**}": {\n      "teambit.dependencies/dependency-resolver": {\n        "policy": {\n          "dependencies": {\n            "classnames": "^2"\n          }\n        }\n      }\n    }\n  }\n}\n'})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["ui/my-button - \u7EC4\u4EF6\u76EE\u5F55\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"index.tsx - entry"}),"\n",(0,s.jsx)(n.li,{children:"my-button.tsx - main"}),"\n",(0,s.jsx)(n.li,{children:"my-button.spec.tsx - test"}),"\n",(0,s.jsx)(n.li,{children:"my-button.composition.tsx"}),"\n",(0,s.jsx)(n.li,{children:"my-button.docs.mdx"}),"\n",(0,s.jsx)(n.li,{children:"component.json"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://bit.dev/docs/workspace/workspace-json",children:"workspace.jsonc"})}),"\n"]}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u6BCF\u4E2A\u7EC4\u4EF6\u90FD\u4F4D\u4E8E\u4E00\u4E2A\u201C\u5C0F\u4ED3\u5E93\u201D\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"\u56E0\u6B64\u7248\u672C\u548C\u4FEE\u6539\u90FD\u662F\u72EC\u7ACB\u7684"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["capsules - \u7EC4\u4EF6\u7684\u4E34\u65F6\u5DE5\u4F5C\u7A7A\u95F4 - bit build\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"capsules_root_base_dir"}),"\n",(0,s.jsxs)(n.li,{children:["macOS ",(0,s.jsx)(n.code,{children:"~/Library/Caches/Bit/capsules/"})]}),"\n",(0,s.jsxs)(n.li,{children:["Windows ",(0,s.jsx)(n.code,{children:"%LOCALAPPDATA%\\Bit\\capsules\\"})]}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"component.json"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"# eject \u540E\u4F1A\u5F97\u5230 component.json\nbit eject-conf ui/my-button\n"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "componentId": {\n    "name": "ui/button",\n    "version": "0.0.1",\n    "scope": "company.scope"\n  },\n  "propagate": true,\n  "extensions": {\n    "teambit.dependencies/dependency-resolver": {\n      "policy": {\n        "dependencies": {\n          "lodash": "^14.17.21"\n        }\n      }\n    }\n  }\n}\n'})}),"\n",(0,s.jsx)(n.h2,{id:"bit-server",children:"bit server"}),"\n",(0,s.jsx)(n.p,{children:"\u672C\u8D28\u548C git bare \u4ED3\u5E93\u7C7B\u4F3C\uFF0C"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"docker run -it --rm \\\n  -v $PWD/remote-scope:/root/remote-scope \\\n  -p 3030:3000 \\\n  --name bit-server bitcli/bit-server:latest\n\nbit remote add http://localhost:3030\n\n# \u4E0D\u540C scope \u4E4B\u95F4\u4E92\u901A\n# docker exec -it bit-server bit remote add http://192.168.1.110:3000\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"/root/Library/Caches/Bit/logs"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/teambit/bit/blob/master/scripts/docker-teambit-bit/README.md",children:"scripts/docker-teambit-bit"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/teambit/bit-docker",children:"teambit/bit-docker"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://github.com/teambit/bit/discussions/4707",children:"How to self host components and publish to npm"})}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-dockerfile",children:"FROM node:12.22.0\nUSER root\n\nRUN npm i @teambit/bvm -g\nRUN bvm upgrade\nENV PATH=$PATH:/root/bin\n\n# increase memory to avoid 137 error code\nENV NODE_OPTIONS=--max_old_space_size=4096\n\nRUN bit config set analytics_reporting false\nRUN bit config set no_warnings false\nRUN bit config set interactive false\nRUN bit config set error_reporting true\n\nARG SCOPE_PATH=/root/remote-scope\nWORKDIR ${SCOPE_PATH}\nRUN bit init --bare\nCMD bit start\n"})}),"\n",(0,s.jsx)(n.h2,{id:"\u73AF\u5883",children:"\u73AF\u5883"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"builder, generator, compiler, tester, docs, compositions, preview, linter, formatter"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'bit env\nbit env get teambit.react/react\nbit show teambit.react/react\n# \u4FEE\u6539\u7EC4\u4EF6 env\nbit env set acme.demo/welcome acme.envs/react\n# \u6279\u91CF\u4FEE\u6539\nbit env set "acme.demo/ui/*" acme.envs/react\nbit env replace teambit.react/react acme.envs/react\n\n# \u81EA\u5B9A\u4E49 env\nbit create react-env envs/my-env\n'})}),"\n",(0,s.jsx)(n.h2,{id:"\u5E94\u7528",children:"\u5E94\u7528"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"bit fork learnbit.apps/node-app\nbit app list\nbit run hello-node-app\nbit build company.scope/apps/my-app\nbit tag company.scope/apps/my-app\n"})}),"\n",(0,s.jsx)(n.h2,{id:"pkg",children:"PKG"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u4FEE\u6539\u7EC4\u4EF6"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title="component.json"',children:'{\n  "teambit.pkg/pkg": {\n    "packageJson": {\n      "main": "dist/{main}.js"\n    }\n  }\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u4FEE\u6539\u5168\u90E8"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n  "teambit.workspace/variants": {\n    "{ui/*}": {\n      "teambit.pkg/pkg": {\n        "packageJson": {\n          "private": false,\n          "main": "dist/{main}.js",\n          "custom-prop": "value"\n        }\n      }\n    }\n  }\n}\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",metastring:'title="my-env.env.ts"',children:"import { PackageEnv } from '@teambit/envs';\n\nexport class MyEnv implements PackageEnv {\n  getPackageJsonProps() {\n    return {\n      main: 'dist/{main}.js',\n      types: '{main}.ts',\n    };\n  }\n}\n"})}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["my-env.main.runtime.ts\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"provider - \u5408\u5E76 pkg"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.li,{children:"\u7EF4\u62A4\u7EC4\u4EF6\u7684 package.json"}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://bit.dev/teambit/pkg/pkg",children:"https://bit.dev/teambit/pkg/pkg"})}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"\u901A\u8FC7\u4EE3\u7801\u83B7\u53D6\u7EC4\u4EF6\u4FE1\u606F",children:"\u901A\u8FC7\u4EE3\u7801\u83B7\u53D6\u7EC4\u4EF6\u4FE1\u606F"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import { Workspace, WorkspaceAspect } from '@teambit/workspace';\n// ...\nexport class MetadataRetrieval {\n  // ...\n  static dependencies = [WorkspaceAspect];\n  static async provider([workspace]: [Workspace]) {\n    // scope.get(componentId)\n    // component.getHost().get(componentId)\n    const component = await this.workspace.get(componentId);\n    /* retrieve the custom metadata provided by this aspect */\n    const componentCustomMetadata = component.state.aspects.get(MetadataRetrievalAspect.id).data;\n    return new CustomMetadataMain();\n  }\n}\n"})})]})}function p(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return c}});var i=t(75271);let s={},r=i.createContext(s);function c(e){let n=i.useContext(r);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);