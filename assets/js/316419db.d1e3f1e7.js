"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["91834"],{16865:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>l,default:()=>u,assets:()=>r,toc:()=>k,frontMatter:()=>t});var i=JSON.parse('{"id":"devops/xaas/paas/dokku","title":"Dokku","description":"Tips","source":"@site/../notes/devops/xaas/paas/dokku.md","sourceDirName":"devops/xaas/paas","slug":"/devops/xaas/paas/dokku","permalink":"/notes/devops/xaas/paas/dokku","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/devops/xaas/paas/dokku.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1617957226000,"frontMatter":{"id":"dokku","title":"Dokku"},"sidebar":"docs","previous":{"title":"Tenant DB Schema","permalink":"/notes/devops/xaas/db-schema"},"next":{"title":"\u7ECF\u6D4E\u5B66","permalink":"/notes/economics/"}}'),o=s("52676"),d=s("79938");let t={id:"dokku",title:"Dokku"},l="Dokku",r={},k=[{value:"Tips",id:"tips",level:2},{value:"Notes",id:"notes",level:2},{value:"\u5B89\u88C5",id:"\u5B89\u88C5",level:2},{value:"Docker \u5B89\u88C5",id:"docker-\u5B89\u88C5",level:2},{value:"\u8FDC\u7A0B\u8BBF\u95EE",id:"\u8FDC\u7A0B\u8BBF\u95EE",level:2},{value:"\u5BA2\u6237\u7AEF",id:"\u5BA2\u6237\u7AEF",level:2},{value:"Reference",id:"reference",level:2}];function c(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,d.a)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.header,{children:(0,o.jsx)(e.h1,{id:"dokku",children:"Dokku"})}),"\n",(0,o.jsx)(e.h2,{id:"tips",children:"Tips"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"\u5355\u670D\u52A1\u5668\u7684 PaaS, \u975E\u5E38\u7B80\u5355\u6613\u7528."}),"\n",(0,o.jsx)(e.li,{children:(0,o.jsx)(e.a,{href:"http://dokku.viewdocs.io/dokku",children:"\u6587\u6863"})}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"# \u65E0\u6CD5\u64CD\u4F5C\u6302\u8F7D\u7684\u76EE\u5F55\u65F6\ndokku plugin:install https://github.com/expa/dokku-app-user.git\n\n# Git \u90E8\u7F72\n# \u4F7F\u7528 Buildpack \u6784\u5EFA\ndokku config:set <app> DOKKU_APP_USER=expauser\ngit push dokku@dokku.me:<app> master\n\n# Docker \u955C\u50CF\u90E8\u7F72\n# \u5C06\u5E94\u7528\u955C\u50CF\u62C9\u5230\u672C\u5730\ndocker pull registry.gitlab.com/wenerme/myapp:master\n# tag \u4E3A dokku \u4E0B myapp \u7684 v1\ndocker tag registry.gitlab.com/wenerme/myapp:master dokku/myapp:v1\n# \u90E8\u7F72 v1\ndokku tags:deploy myapp v1\n"})}),"\n",(0,o.jsx)(e.h2,{id:"notes",children:"Notes"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["Dokku \u63A7\u5236 Docker\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"\u4E5F\u53EF\u4EE5\u901A\u8FC7 Nomad \u6216 Kubernates \u8C03\u5EA6"}),"\n",(0,o.jsx)(e.li,{children:"\u4F46\u4F7F\u7528 Dokku \u4E00\u822C\u662F\u5355\u673A Docker"}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(e.li,{children:"\u63D0\u4F9B\u7C7B\u4F3C Heroku \u7684\u63A5\u53E3"}),"\n",(0,o.jsx)(e.li,{children:"\u6BCF\u4E2A\u5E94\u7528\u66B4\u9732\u7AEF\u53E3\uFF0C\u901A\u8FC7\u5185\u7F6E\u7684 Nginx \u8FDB\u884C\u57DF\u540D\u53CD\u5411\u4EE3\u7406"}),"\n",(0,o.jsxs)(e.li,{children:["Nginx\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["\u8BBF\u95EE\u65E5\u5FD7 ",(0,o.jsx)(e.code,{children:"/var/log/nginx/${APP}-access.log"})]}),"\n",(0,o.jsxs)(e.li,{children:["\u9519\u8BEF\u65E5\u5FD7 ",(0,o.jsx)(e.code,{children:"/var/log/nginx/${APP}-error.log"})]}),"\n",(0,o.jsxs)(e.li,{children:[(0,o.jsx)(e.code,{children:"dokku nginx:report"})," \u67E5\u770B Nginx \u4FE1\u606F"]}),"\n",(0,o.jsxs)(e.li,{children:[(0,o.jsx)(e.code,{children:"dokku nginx:show-config"})," \u67E5\u770B\u751F\u6210\u7684\u914D\u7F6E"]}),"\n",(0,o.jsxs)(e.li,{children:[(0,o.jsx)(e.code,{children:"dokku nginx:validate-config"})," \u914D\u7F6E\u6821\u9A8C"]}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(e.li,{children:[(0,o.jsx)(e.a,{href:"http://dokku.viewdocs.io/dokku/configuration/nginx/#customizing-the-nginx-configuration",children:"\u81EA\u5B9A\u4E49 Nginx \u914D\u7F6E"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["\u914D\u7F6E\u6A21\u677F\u4F7F\u7528 ",(0,o.jsx)(e.a,{href:"https://github.com/gliderlabs/sigil",children:"gliderlabs/sigil"})," \u751F\u6210"]}),"\n",(0,o.jsxs)(e.li,{children:["\u6A21\u7248 ",(0,o.jsx)(e.a,{href:"https://github.com/dokku/dokku/blob/master/plugins/nginx-vhosts/templates/nginx.conf.sigil",children:"nginx.conf.sigil"})," \u653E\u5230 WORKDIR \u6216 ",(0,o.jsx)(e.code,{children:"/app"})," \u76EE\u5F55"]}),"\n",(0,o.jsxs)(e.li,{children:["\u9ED8\u8BA4\u4F1A include ",(0,o.jsx)(e.code,{children:"nginx.conf.d/"})," \u4E0B\u7684\u914D\u7F6E - \u53EF\u4EE5\u5728\u8FD9\u91CC\u914D\u7F6E\u81EA\u5B9A\u4E49\u800C\u4E0D\u662F\u5168\u91CF\u66FF\u6362\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsxs)(e.li,{children:["\u4F8B\u5982 ",(0,o.jsx)(e.code,{children:"/home/dokku/myapp/nginx.conf.d/upload.conf"})]}),"\n",(0,o.jsxs)(e.li,{children:["\u91CD\u8F7D nginx \u751F\u6548 ",(0,o.jsx)(e.code,{children:"service nginx reload"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(e.h2,{id:"\u5B89\u88C5",children:"\u5B89\u88C5"}),"\n",(0,o.jsx)(e.p,{children:(0,o.jsx)(e.strong,{children:"\u9700\u6C42"})}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:"Ubuntu 16.04/18.04 x64, Debian 9+ x64 or CentOS 7 x64"}),"\n",(0,o.jsx)(e.li,{children:"1GB \u5185\u5B58"}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"# \u5B89\u88C5\nwget https://raw.githubusercontent.com/dokku/dokku/v0.20.4/bootstrap.sh\nsudo DOKKU_TAG=v0.20.4 bash bootstrap.sh\n\n# \u6D4F\u89C8\u5668\u6253\u5F00\u8BE5\u4E3B\u673A\u7684 80 \u7AEF\u53E3,\u8BBE\u7F6E\u516C\u94A5\n# \u5982\u679C\u4E3A\u4E3B\u673A\u8BBE\u7F6E\u4E86\u57DF\u540D,\u53EF\u4F7F\u7528\u865A\u62DF\u4E3B\u673A\n# sudo hostname -f\n\n# \u5B89\u88C5 Redis \u63D2\u4EF6\nsudo dokku plugin:install --help https://github.com/dokku/dokku-redis.git redis\n\n# \u670D\u52A1\u5668: \u521B\u5EFA\u5E94\u7528\ndokku apps:create my-app\n# \u6DFB\u52A0\u76F8\u5173\u914D\u7F6E\ndokku config:set my-app PORT=2333\n# \u5C06\u5E94\u7528\u5BB9\u5668\u4E2D\u7684 2333 \u6620\u5C04\u4E3A\u4E3B\u673A\u4E0A\u7684 8080\ndokku proxy:proxys-add my-app http:8080:2333\n\n# \u672C\u5730: \u9879\u76EE\u6709 Git \u4ED3\u5E93\u6DFB\u52A0\u670D\u52A1\u5668\u4F5C\u4E3A\u4ED3\u5E93\u5730\u5740\ngit remote add svr dokku@\u670D\u52A1\u5668\u5730\u5740:my-app\n# \u53D1\u5E03\u5E94\u7528\ngit push svr\n\n\n# \u53EF\u76F4\u63A5\u8FDC\u7A0B\u6267\u884C dokku \u547D\u4EE4\nssh -t dokku@\u670D\u52A1\u5668\u5730\u5740 -- help\n# \u5728\u73AF\u5883\u4E2D\u6267\u884C\u547D\u4EE4\ndokku run my-app ls\n# \u5982\u679C\u5728 Procfile \u4E2D\u5B9A\u4E49\u4E86\u547D\u4EE4,\u53EF\u6267\u884C\u901A\u8FC7 run \u6267\u884C\n# console: bundle exec racksh\ndokku run my-app console\n# \u76F4\u63A5\u8FDB\u5165 APP \u5BB9\u5668\ndokku enter my-app web\n# \u6307\u5B9A\u4F7F\u7528\u7684 buildpack\ndokku config:set APP BUILDPACK_URL=https://github.com/heroku/heroku-buildpack-ruby.git#v142\n# \u4E5F\u53EF\u5728 .buildpacks \u6587\u4EF6\u4E2D\u6307\u5B9A\u591A\u4E2A buildpack\n"})}),"\n",(0,o.jsx)(e.h2,{id:"docker-\u5B89\u88C5",children:"Docker \u5B89\u88C5"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:(0,o.jsx)(e.a,{href:"http://dokku.viewdocs.io/dokku/getting-started/install/docker/",children:"http://dokku.viewdocs.io/dokku/getting-started/install/docker/"})}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"# \u81EA\u52A8\u5B89\u88C5\u7684\u63D2\u4EF6\u5217\u8868\nmkdir -p /data/dokku/data\ncat <<PLUGINS > /data/dokku/data/plugin-list\npostgres: https://github.com/dokku/dokku-postgres.git\nredis: https://github.com/dokku/dokku-redis.git\nPLUGINS\n\n# \u542F\u52A8\ndocker run \\\n  --env DOKKU_HOSTNAME=dokku.me \\\n  --name dokku \\\n  --publish 3022:22 \\\n  --publish 8080:80 \\\n  --publish 8443:443 \\\n  --volume /data/dokku/data:/mnt/dokku \\\n  --volume /var/run/docker.sock:/var/run/docker.sock \\\n  dokku/dokku\n\n# \u6DFB\u52A0\u516C\u94A5\ndocker exec -it dokku bash\ncurl https://github.com/wenerme.keys >> ~dokku/.ssh/authorized_keys\n"})}),"\n",(0,o.jsx)(e.h2,{id:"\u8FDC\u7A0B\u8BBF\u95EE",children:"\u8FDC\u7A0B\u8BBF\u95EE"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{children:"Host my-dokku\nHostname 192.168.1.1\nUser dokku\nRequestTTY yes\n"})}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"ssh my-dokku dokku apps:list\n"})}),"\n",(0,o.jsx)(e.h2,{id:"\u5BA2\u6237\u7AEF",children:"\u5BA2\u6237\u7AEF"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:(0,o.jsx)(e.a,{href:"http://dokku.viewdocs.io/dokku/community/clients/",children:"http://dokku.viewdocs.io/dokku/community/clients/"})}),"\n"]}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-bash",children:"# \u5B98\u65B9\u5BA2\u6237\u7AEF - \u4F7F\u7528 SSH \u6267\u884C\n# \u672C\u8D28\u662F alias dokku='$HOME/.dokku/contrib/dokku_client.sh'\nbrew install dokku/repo/dokku\nDOKKU_HOST=mydokku dokku apps:list\n\n# \u624B\u52A8\u5B89\u88C5\n# \bbrew \u5B89\u88C5\u53EF\u80FD\u7248\u672C\u4E0D\u5339\u914D\n# https://github.com/dokku/dokku/blob/master/contrib/dokku_client.sh\ngit clone https://github.com/dokku/dokku ~/.dokku\n\ncd ~/.dokku\n# \u5207\u6362\u7248\u672C\ngit checkout <tag/branch>\nalias dokku='$HOME/.dokku/contrib/dokku_client.sh'\nDOKKU_HOST=mydokku dokku dokku apps:list\n"})}),"\n",(0,o.jsx)(e.h2,{id:"reference",children:"Reference"}),"\n",(0,o.jsxs)(e.ul,{children:["\n",(0,o.jsx)(e.li,{children:(0,o.jsx)(e.a,{href:"https://glebbahmutov.com/blog/running-multiple-applications-in-dokku/",children:"Running multiple applications in Dokku"})}),"\n"]})]})}function u(n={}){let{wrapper:e}={...(0,d.a)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(c,{...n})}):c(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return l},a:function(){return t}});var i=s(75271);let o={},d=i.createContext(o);function t(n){let e=i.useContext(d);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:t(n.components),i.createElement(d.Provider,{value:e},n.children)}}}]);