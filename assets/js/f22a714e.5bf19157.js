"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["71189"],{99235:function(e,n,r){r.r(n),r.d(n,{metadata:()=>s,contentTitle:()=>i,default:()=>a,assets:()=>c,toc:()=>h,frontMatter:()=>o});var s=JSON.parse('{"id":"platform/heroku","title":"Heroku","description":"- Node","source":"@site/../notes/platform/heroku.md","sourceDirName":"platform","slug":"/platform/heroku","permalink":"/notes/platform/heroku","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/platform/heroku.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1659031280000,"frontMatter":{"title":"Heroku"},"sidebar":"docs","previous":{"title":"gcloud","permalink":"/notes/platform/google/gcloud"},"next":{"title":"Linode","permalink":"/notes/platform/linode"}}'),t=r("52676"),l=r("79938");let o={title:"Heroku"},i="Heroku",c={},h=[{value:"auth",id:"auth",level:2},{value:"dyno",id:"dyno",level:2},{value:"\u8FDB\u7A0B\u7C7B\u578B",id:"\u8FDB\u7A0B\u7C7B\u578B",level:2},{value:"\u8C03\u5EA6\u5668 / \u5468\u671F\u6267\u884C",id:"\u8C03\u5EA6\u5668--\u5468\u671F\u6267\u884C",level:2},{value:"postgres",id:"postgres",level:2},{value:"redis",id:"redis",level:2},{value:"\u5F00\u53D1",id:"\u5F00\u53D1",level:2}];function d(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,l.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"heroku",children:"Heroku"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Node\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://devcenter.heroku.com/changelog-items/1573",children:"\u90E8\u7F72\u8FD0\u884C build \u6216 heroku-postbuild \u811A\u672C"})}),"\n",(0,t.jsxs)(n.li,{children:["\u542F\u52A8\u9ED8\u8BA4\u4E3A ",(0,t.jsx)(n.code,{children:"npm start"})," \u9664\u975E\u5728 Procfile \u6307\u5B9A\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.code,{children:"web: yarn start"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"\u542F\u52A8\u9700\u8981\u7ED1\u5B9A\u5230 PORT"}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/heroku/heroku-buildpack-nodejs",children:"heroku/heroku-buildpack-nodejs"})}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://devcenter.heroku.com/articles/request-timeout#long-polling-and-streaming-responses",children:"\u8FDE\u63A5\u8D85\u65F6"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u521D\u59CB 30s \u54CD\u5E94\u7A97\u53E3"}),"\n",(0,t.jsx)(n.li,{children:"\u4E4B\u540E 55s \u54CD\u5E94\u7A97\u53E3"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://devcenter.heroku.com/articles/ssl-endpoint",children:"\u81EA\u5B9A\u4E49\u57DF\u540D SSL"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u9700\u8981\u8D2D\u4E70\u8BC1\u4E66"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://devcenter.heroku.com/articles/limits",children:"\u9650\u5236"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'# \u5B89\u88C5\u547D\u4EE4\u884C\u5DE5\u5177\nbrew tap heroku/brew && brew install heroku\n\n# \u5347\u7EA7 CLI\nheroku update\n\n# \u6784\u5EFA\u8865\u5168\nheroku autocomplete\n# \u52A0\u8F7D\u8865\u5168\n$(heroku autocomplete:script bash)\n# \u6DFB\u52A0\u5230 profile \u81EA\u52A8\u52A0\u8F7D\nprintf "$(heroku autocomplete:script bash)" >> ~/.bashrc; source ~/.bashrc\n\n# \u521B\u5EFA\u5E94\u7528\n# \u8BBF\u95EE\u5730\u5740 https://myapp.herokuapp.com/\n# \u4ED3\u5E93\u5730\u5740 https://git.heroku.com/myapp.git\nheroku apps:create myapp\n\n# Git \u90E8\u7F72\nheroku git:remote -a <\u5E94\u7528\u540D\u5B57>\ngit push heroku master\n\n# \u5BB9\u5668\u90E8\u7F72\n# https://devcenter.heroku.com/articles/container-registry-and-runtime\nheroku container:login\n# web \u4E3A\u7C7B\u578B - \u5F53\u524D\u76EE\u5F55\u4E0B\u8981\u6709 Dockerfile\n# \u955C\u50CF\u4E3A registry.heroku.com/myapp/web\nheroku container:push web\nheroku container:release web\n\n# \u4F7F\u7528\u5DF2\u6709\u7684\u955C\u50CF\ndocker tag <image> registry.heroku.com/<app>/<process-type>\ndocker push registry.heroku.com/<app>/<process-type>\n\n# \u542F\u52A8\u955C\u50CF\n# type \u9ED8\u8BA4\u4E3A web\nheroku run bash --type=worker\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u81EA\u5B9A\u4E49\u57DF\u540D\nheroku domains:add app.my.com\n\n# heroku addons:create ssl:endpoint\nheroku certs:add server.crt server.key --type endpoint\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u5E94\u7528\u6267\u884C\u60C5\u51B5\nheroku ps -a wener\n"})}),"\n",(0,t.jsx)(n.h2,{id:"auth",children:"auth"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\u9ED8\u8BA4\u4F7F\u7528 ",(0,t.jsx)(n.code,{children:"~/.netrc"})," \u4E2D\u7684\u9274\u6743\u4FE1\u606F"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u53EF\u4EE5\u4F7F\u7528 TOKEN \u767B\u5F55\nHEROKU_API_KEY=XXX heroku login\n\n# \u67E5\u770B\u5F53\u524D Token\nheroku auth:token\n\n# \u767B\u5F55 docker\nheroku container:login\n"})}),"\n",(0,t.jsx)(n.h2,{id:"dyno",children:"dyno"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://www.heroku.com/dynos",children:"https://www.heroku.com/dynos"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://devcenter.heroku.com/articles/dyno-types",children:"https://devcenter.heroku.com/articles/dyno-types"})}),"\n",(0,t.jsx)(n.li,{children:"\u7C7B\u4F3C\u4E8E\u7B97\u529B"}),"\n",(0,t.jsxs)(n.li,{children:["Free - ",(0,t.jsx)(n.a,{href:"https://www.heroku.com/pricing",children:"\u4EF7\u683C"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"30 \u5206\u949F\u4F11\u7720"}),"\n",(0,t.jsx)(n.li,{children:"512 MB RAM \u2502 1 web/1 worker"}),"\n",(0,t.jsx)(n.li,{children:"Postgres 10K \u884C"}),"\n",(0,t.jsx)(n.li,{children:"Redis 25 MB \u5185\u5B58, 20 \u8FDE\u63A5"}),"\n",(0,t.jsx)(n.li,{children:"\u6BCF\u6708 1000 \u5C0F\u65F6"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u8FDB\u7A0B\u7C7B\u578B",children:"\u8FDB\u7A0B\u7C7B\u578B"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://devcenter.heroku.com/articles/procfile",children:"Procfile"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u8C03\u5EA6\u5668--\u5468\u671F\u6267\u884C",children:"\u8C03\u5EA6\u5668 / \u5468\u671F\u6267\u884C"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://devcenter.heroku.com/articles/scheduler",children:"https://devcenter.heroku.com/articles/scheduler"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u5B89\u88C5\u6269\u5C55\nheroku addons:create scheduler:standard\n"})}),"\n",(0,t.jsx)(n.h2,{id:"postgres",children:"postgres"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u514D\u8D39\u7684 hobby-dev\n# 1W\u884C 20\u5E76\u53D1\n# basic 9$/\u6708 100W \u884C\n# \u521B\u5EFA\u540E\u4F1A\u751F\u6210 DATABASE_URL \u53D8\u91CF\nheroku addons:create heroku-postgresql:hobby-dev\n"})}),"\n",(0,t.jsx)(n.h2,{id:"redis",children:"redis"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://elements.heroku.com/addons/heroku-redis",children:"https://elements.heroku.com/addons/heroku-redis"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# free dev: 20M 20\u5E76\u53D1\n# 15$ premium-0: 50M 40\u5E76\u53D1\n# \u521B\u5EFA\u540E\u4F1A\u751F\u6210 REDIS_URL \u53D8\u91CF\nheroku addons:create heroku-redis:hobby-dev\n"})}),"\n",(0,t.jsx)(n.h2,{id:"\u5F00\u53D1",children:"\u5F00\u53D1"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://devcenter.heroku.com/articles/dyno-metadata",children:"https://devcenter.heroku.com/articles/dyno-metadata"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"HEROKU_APP_ID:                   9daa2797-e49b-4624-932f-ec3f9688e3da\nHEROKU_APP_NAME:                 example-app\nHEROKU_DYNO_ID:                  1vac4117-c29f-4312-521e-ba4d8638c1ac\nHEROKU_RELEASE_CREATED_AT:       2015-04-02T18:00:42Z\nHEROKU_RELEASE_VERSION:          v42\nHEROKU_SLUG_COMMIT:              2c3a0b24069af49b3de35b8e8c26765c1dba9ff0\nHEROKU_SLUG_DESCRIPTION:         Deploy 2c3a0b2\n"})})]})}function a(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},79938:function(e,n,r){r.d(n,{Z:function(){return i},a:function(){return o}});var s=r(75271);let t={},l=s.createContext(t);function o(e){let n=s.useContext(l);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);