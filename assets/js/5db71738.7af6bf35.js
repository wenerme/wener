"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["51997"],{44080:function(e,r,a){a.r(r),a.d(r,{metadata:()=>n,contentTitle:()=>o,default:()=>u,assets:()=>d,toc:()=>i,frontMatter:()=>s});var n=JSON.parse('{"id":"java/build/gradle/gradle-faq","title":"Gradle FAQ","description":"killall","source":"@site/../notes/java/build/gradle/gradle-faq.md","sourceDirName":"java/build/gradle","slug":"/java/build/gradle/faq","permalink":"/notes/java/build/gradle/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/java/build/gradle/gradle-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1731847972000,"frontMatter":{"tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Gradle","permalink":"/notes/java/build/gradle/"},"next":{"title":"jib","permalink":"/notes/java/build/jib"}}'),l=a("52676"),t=a("79938");let s={tags:["FAQ"]},o="Gradle FAQ",d={},i=[{value:"killall",id:"killall",level:2},{value:"Waiting to acquire shared lock on daemon addresses registry",id:"waiting-to-acquire-shared-lock-on-daemon-addresses-registry",level:2},{value:"Proxy",id:"proxy",level:2}];function c(e){let r={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,t.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.header,{children:(0,l.jsx)(r.h1,{id:"gradle-faq",children:"Gradle FAQ"})}),"\n",(0,l.jsx)(r.h2,{id:"killall",children:"killall"}),"\n",(0,l.jsx)(r.pre,{children:(0,l.jsx)(r.code,{className:"language-bash",children:"pkill -9 -f GradleDaemon\nkill -9 $(pgrep -f GradleDaemon)\n"})}),"\n",(0,l.jsx)(r.h2,{id:"waiting-to-acquire-shared-lock-on-daemon-addresses-registry",children:"Waiting to acquire shared lock on daemon addresses registry"}),"\n",(0,l.jsxs)(r.ul,{children:["\n",(0,l.jsx)(r.li,{children:"~/.gradle/daemon/6.8/registry.bin.lock"}),"\n"]}),"\n",(0,l.jsx)(r.pre,{children:(0,l.jsx)(r.code,{children:"[org.gradle.execution.plan.DefaultExecutionPlan] No node could be selected, nodes ready: false\n[org.gradle.cache.internal.DefaultFileLockManager] Waiting to acquire shared lock on daemon addresses registry.\n[org.gradle.cache.internal.DefaultFileLockManager] Lock acquired on daemon addresses registry.\n[org.gradle.cache.internal.DefaultFileLockManager] Releasing lock on daemon addresses registry.\n"})}),"\n",(0,l.jsx)(r.pre,{children:(0,l.jsx)(r.code,{className:"language-bash",children:"find .gradle/ -name '*.lock'\n\nrm -rf .gradle\nrm -rf ~/.gradle/caches\nrm -rf ~/.gradle/daemon\n"})}),"\n",(0,l.jsxs)(r.ul,{children:["\n",(0,l.jsx)(r.li,{children:"lombok val"}),"\n",(0,l.jsx)(r.li,{children:(0,l.jsx)(r.a,{href:"https://github.com/gradle/gradle/issues/14531",children:"https://github.com/gradle/gradle/issues/14531"})}),"\n"]}),"\n",(0,l.jsx)(r.h2,{id:"proxy",children:"Proxy"}),"\n",(0,l.jsx)(r.pre,{children:(0,l.jsx)(r.code,{className:"language-bash",children:"./gradlew build \\\n    -Dhttp.proxyHost=your.proxy.host -Dhttp.proxyPort=your_proxy_port \\\n    -Dhttp.proxyUser=your_username -Dhttp.proxyPassword=your_password\n"})}),"\n",(0,l.jsx)(r.pre,{children:(0,l.jsx)(r.code,{className:"language-bash",children:'export GRADLE_OPTS="-Dhttp.proxyHost=your.proxy.host -Dhttp.proxyPort=your_proxy_port -Dhttps.proxyHost=your.proxy.host -Dhttps.proxyPort=your_proxy_port"\n'})})]})}function u(e={}){let{wrapper:r}={...(0,t.a)(),...e.components};return r?(0,l.jsx)(r,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},79938:function(e,r,a){a.d(r,{Z:function(){return o},a:function(){return s}});var n=a(75271);let l={},t=n.createContext(l);function s(e){let r=n.useContext(t);return n.useMemo(function(){return"function"==typeof e?e(r):{...r,...e}},[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:s(e.components),n.createElement(t.Provider,{value:r},e.children)}}}]);