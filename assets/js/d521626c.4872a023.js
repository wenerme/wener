"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["52711"],{56997:function(e,n,a){a.r(n),a.d(n,{metadata:()=>r,contentTitle:()=>l,default:()=>d,assets:()=>h,toc:()=>c,frontMatter:()=>i});var r=JSON.parse('{"id":"java/lib/arthas","title":"arthas","description":"- alibaba/arthas","source":"@site/../notes/java/lib/arthas.md","sourceDirName":"java/lib","slug":"/java/lib/arthas","permalink":"/notes/java/lib/arthas","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/java/lib/arthas.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1691332314000,"frontMatter":{"title":"arthas"},"sidebar":"docs","previous":{"title":"JDWP","permalink":"/notes/java/jdwp"},"next":{"title":"CHANGELOG","permalink":"/notes/java/lib/changes"}}'),t=a("52676"),s=a("79938");let i={title:"arthas"},l="arthas",h={},c=[{value:"\u5E38\u7528",id:"\u5E38\u7528",level:2},{value:"Commands",id:"commands",level:2},{value:"redefine",id:"redefine",level:3},{value:"Arthas Tunnel",id:"arthas-tunnel",level:2},{value:"Spring Boot Starter",id:"spring-boot-starter",level:2}];function o(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",ul:"ul",...(0,s.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"arthas",children:"arthas"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/alibaba/arthas",children:"alibaba/arthas"})}),"\n",(0,t.jsxs)(n.li,{children:["IDEA \u63D2\u4EF6\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://plugins.jetbrains.com/plugin/13581-arthas-idea",children:"https://plugins.jetbrains.com/plugin/13581-arthas-idea"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"OGNL \u8BED\u6CD5"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"curl -O https://arthas.aliyun.com/arthas-boot.jar\n\n# web console http://127.0.0.1:8563\n# --tunnel-server 'ws://127.0.0.1:7777/ws'\njava -jar arthas-boot.jar -h # \u5E2E\u52A9\njava -jar arthas-boot.jar 1  # \u4EA4\u4E92\u5F0F\u547D\u4EE4\u884C - Docker \u91CC pid \u4E3A 1\n\n# Alpine\ncurl -O https://arthas.aliyun.com/arthas-boot.jar\ntouch /proc/1/cwd/.attach_pid1 && kill -SIGQUIT 1 && sleep 2 && ls /proc/1/root/tmp/.java_pid$1\njava -jar arthas-boot.jar 1\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"sc -d com.wener.Application\nvmtool --action getInstances --className java.lang.String --limit 10\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://arthas.aliyun.com/doc/dashboard.html",children:"https://arthas.aliyun.com/doc/dashboard.html"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/alibaba/arthas/issues/71",children:"https://github.com/alibaba/arthas/issues/71"})}),"\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/younggungun/Arthas-Learning/issues/1",children:"https://github.com/younggungun/Arthas-Learning/issues/1"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u5E38\u7528",children:"\u5E38\u7528"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u89C2\u5BDF Spring HTTP \u8BF7\u6C42\u7684\u54CD\u5E94\u65F6\u95F4\nwatch org.springframework.web.servlet.DispatcherServlet doService '{params[0].getRequestURI()+\" \"+ #cost}' -n 5 -x 3 '#cost>1'\n\n# \u89C2\u5BDF Spring \u54CD\u5E94\u5934\u4FE1\u606F\nwatch org.springframework.web.servlet.DispatcherServlet doService '{params[0].getRequestURI()+\"  header=\"+params[1].getHeaders(\"trace-id\")}' -n 10 -x 3 -f\n\n# \u89C2\u5BDF MyBatis SQL\nwatch org.apache.ibatis.mapping.BoundSql getSql '{params,returnObj,target.parameterObject,throwExp}' -n 5 -x 3\n\n# JDBC\nwatch java.sql.Connection prepareStatement '{params,throwExp}' -n 5 -x 3 'clazz.getName().startsWith(\"com.mysql\") and params.length==1' and #cost>1\n\nwatch java.sql.Connection prepareStatement '{params,throwExp}' -n 5 -x 3\n\ntt -t org.springframework.data.redis.connection.jedis.JedisConnectionFactory getConnection\ntt -t org.springframework.data.redis.cache.DefaultRedisCacheWriter get\n\n# Controller \u65B9\u6CD5\u5185\u4E0D\u6162\uFF0C\u4F46\u6574\u4F53\u6162\u65F6\uFF0C\u6392\u67E5\u8BF7\u6C42\u65B9\u6CD5\u524D\u7684\u903B\u8F91\n# getMethodArgumentValues \u6162\u8BF4\u660E\u6CE8\u89E3\u6821\u9A8C\u95EE\u9898\n# doInvoke \u6162\u8BF4\u660E\u662F\u65B9\u6CD5\u6162\ntrace org.springframework.web.method.support.InvocableHandlerMethod invokeForRequest\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/WangJi92/arthas-idea-plugin/issues/80",children:"https://github.com/WangJi92/arthas-idea-plugin/issues/80"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"commands",children:"Commands"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["tt - TimeTunnel - \u8BB0\u5F55\u73B0\u573A\uFF0C\u901A\u8FC7 index \u56DE\u67E5\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"-l"})," list"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"-s"})," search, Advice \u5BF9\u8C61"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.code,{children:"-i INDEX"})," \u56DE\u67E5"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.li,{children:"trace - \u8DDF\u8E2A\u5411\u4E0B\u8C03\u7528\u65B9\u6CD5\u65F6\u95F4\u6D88\u8017"}),"\n",(0,t.jsx)(n.li,{children:"stack - \u83B7\u53D6\u8C03\u7528\u94FE - \u5C1D\u8BD5\u5F80\u4E0A\u6392\u67E5\u6162\u7684\u8282\u70B9"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"trace demo.MathGame run\n"})}),"\n",(0,t.jsx)(n.h3,{id:"redefine",children:"redefine"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u751F\u6210\u6E90\u7801\njad --source-only com.example.demo.arthas.user.UserController > /tmp/UserController.java\n# \u7F16\u8BD1\nmc /tmp/UserController.java -d /tmp\n# \u52A0\u8F7D\nredefine /tmp/com/example/demo/arthas/user/UserController.class\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"\u4E0D\u652F\u6301\u65B0\u65B9\u6CD5\u65B0\u5B57\u6BB5"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"arthas-tunnel",children:"Arthas Tunnel"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"java -jar arthas-tunnel-server.jar\n"})}),"\n",(0,t.jsx)(n.h2,{id:"spring-boot-starter",children:"Spring Boot Starter"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"http://localhost:8080/actuator/arthas",children:"http://localhost:8080/actuator/arthas"})}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-xml",children:"<dependency>\n    <groupId>com.taobao.arthas</groupId>\n    <artifactId>arthas-spring-boot-starter</artifactId>\n    <version>${arthas.version}</version>\n</dependency>\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ini",children:"arthas.agent-id=XXX\narthas.tunnel-server=ws://127.0.0.1:7777/ws\n"})}),"\n",(0,t.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"/notes/java/faq#unable-to-get-pid-of-linuxthreads-manager-thread",children:"Unable to get pid of LinuxThreads manager thread"})}),"\n"]})]})}function d(e={}){let{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},79938:function(e,n,a){a.d(n,{Z:function(){return l},a:function(){return i}});var r=a(75271);let t={},s=r.createContext(t);function i(e){let n=r.useContext(s);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);