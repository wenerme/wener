"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["20356"],{34327:function(e,n,i){i.r(n),i.d(n,{metadata:()=>r,contentTitle:()=>s,default:()=>d,assets:()=>l,toc:()=>c,frontMatter:()=>o});var r=JSON.parse('{"id":"java/build/jib","title":"jib","description":"- GoogleContainerTools/jib","source":"@site/../notes/java/build/jib.md","sourceDirName":"java/build","slug":"/java/build/jib","permalink":"/notes/java/build/jib","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/java/build/jib.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1699003495000,"frontMatter":{"title":"jib"},"sidebar":"docs","previous":{"title":"Gradle FAQ","permalink":"/notes/java/build/gradle/faq"},"next":{"title":"Maven","permalink":"/notes/java/build/maven/"}}'),t=i("52676"),a=i("79938");let o={title:"jib"},s="jib",l={},c=[{value:"Auth",id:"auth",level:2},{value:"Setup",id:"setup",level:2},{value:"multi-platform image building not supported when pushing to Docker engine",id:"multi-platform-image-building-not-supported-when-pushing-to-docker-engine",level:2},{value:"Request to write &#39;5569&#39; bytes exceeds size in header of &#39;13740&#39; bytes for entry",id:"request-to-write-5569-bytes-exceeds-size-in-header-of-13740-bytes-for-entry",level:2}];function u(e){let n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"jib",children:"jib"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://github.com/GoogleContainerTools/jib",children:"GoogleContainerTools/jib"})}),"\n"]}),"\n",(0,t.jsx)(n.admonition,{type:"tip",children:(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["tar\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"docker \u8981\u5148 load \u624D\u80FD push"}),"\n",(0,t.jsx)(n.li,{children:"crane \u53EF\u4EE5\u76F4\u63A5 push"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mvn compile jib:build       # \u4E0D\u4F9D\u8D56 docker \u76F4\u63A5\u63A8\u9001\nmvn compile jib:dockerBuild # \u4F7F\u7528 docker\nmvn compile jib:buildTar\n\nmvn compile com.google.cloud.tools:jib-maven-plugin:3.4.0:buildTar\nls target/jib-image.tar\nmvn compile com.google.cloud.tools:jib-maven-plugin:3.4.0:build -Dimage=IMAGE\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"51ec4eb40e96   53 years ago   jib-maven-plugin:3.3.1                          70B       jvm arg files\n<missing>      53 years ago   jib-maven-plugin:3.3.1                          546kB     classes\n<missing>      53 years ago   jib-maven-plugin:3.3.1                          139kB     resources\n<missing>      53 years ago   jib-maven-plugin:3.3.1                          2.18MB    snapshot dependencies\n<missing>      53 years ago   jib-maven-plugin:3.3.1                          350MB     dependencies\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"java -cp /app/resources:/app/classes:/app/libs/* $MAINCLASS\n"})}),"\n",(0,t.jsx)(n.h2,{id:"auth",children:"Auth"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"credential helpers"}),"\n",(0,t.jsx)(n.li,{children:"$XDG_RUNTIME_DIR/containers/auth.json"}),"\n",(0,t.jsx)(n.li,{children:"$XDG_CONFIG_HOME/containers/auth.json"}),"\n",(0,t.jsx)(n.li,{children:"$HOME/.config/containers/auth.json"}),"\n",(0,t.jsx)(n.li,{children:"$DOCKER_CONFIG/config.json"}),"\n",(0,t.jsx)(n.li,{children:"$HOME/.docker/config.json"}),"\n",(0,t.jsx)(n.li,{children:"-Djib.from.auth.username -Djib.from.auth.password"}),"\n",(0,t.jsx)(n.li,{children:"-Djib.to.auth.username -Djib.to.auth.password"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-json",children:'{\n  "auths": {\n    "docker.io": {\n      "auth": "erfi7sYi89234xJUqaqxgmzcnQ2rRFWM5aJX0EC="\n    },\n    "docker.io/wener": {\n      "auth": "erfi7sYi89234xJUqaqxgmzcnQ2rRFWM5aJX0EC="\n    },\n    "quay.io": {\n      "auth": "juQAqGmz5eR1ipzx8Evn6KGdw8fEa1w5MWczmgY="\n    }\n  },\n  "credHelpers": {\n    "registry.example.com": "secretservice"\n  }\n}\n'})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'echo -n "$DOCKER_REGISTRY_USERNAME:$DOCKER_REGISTRY_PASSWORD" | base64 -w 0\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:(0,t.jsx)(n.a,{href:"https://www.mankier.com/5/containers-auth.json",children:"https://www.mankier.com/5/containers-auth.json"})}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"root pom"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-xml",children:"<project>\n<properties>\n		\x3c!-- for repro --\x3e\n		<project.build.outputTimestamp>2023-01-01T00:00:00Z</project.build.outputTimestamp>\n		\x3c!-- for jib --\x3e\n		<image>REGISTRY/REPO-${project.artifactId}:${image-tag}</image>\n    <image-tag>latest</image-tag>\n</properties>\n<profiles>\n  <profile>\n      <id>ci</id>\n      <activation>\n          <property>\n              <name>env.DOCKER_IMAGE_TAG</name>\n          </property>\n      </activation>\n      <properties>\n          <image-tag>${env.DOCKER_IMAGE_TAG}</image-tag>\n      </properties>\n  </profile>\n</profiles>\n<build>\n  <pluginManagement>\n    <plugins>\n      <plugin>\n        <groupId>com.google.cloud.tools</groupId>\n        <artifactId>jib-maven-plugin</artifactId>\n        <version>3.3.1</version>\n        <configuration>\n          <from>\n            <image>wener/java:8</image>\n            <platforms>\n              <platform>\n                <architecture>amd64</architecture>\n                <os>linux</os>\n              </platform>\n              <platform>\n                <architecture>arm64</architecture>\n                <os>linux</os>\n              </platform>\n            </platforms>\n          </from>\n        </configuration>\n      </plugin>\n      <plugin>\n        <groupId>io.github.zlika</groupId>\n        <artifactId>reproducible-build-maven-plugin</artifactId>\n        <version>0.16</version>\n      </plugin>\n    </plugins>\n  </pluginManagement>\n</build>\n</project>\n"})}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"common"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-xml",children:"<build>\n  <plugins>\n    <plugin>\n      <groupId>com.google.cloud.tools</groupId>\n      <artifactId>jib-maven-plugin</artifactId>\n      <configuration>\n        <skip>true</skip>\n      </configuration>\n    </plugin>\n    <plugin>\n      <groupId>io.github.zlika</groupId>\n      <artifactId>reproducible-build-maven-plugin</artifactId>\n      <executions>\n        <execution>\n          <id>run-when-packaged</id>\n          <goals>\n            <goal>strip-jar</goal>\n          </goals>\n          <phase>package</phase>\n        </execution>\n      </executions>\n    </plugin>\n  </plugins>\n</build>\n"})}),"\n",(0,t.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,t.jsx)(n.h2,{id:"multi-platform-image-building-not-supported-when-pushing-to-docker-engine",children:"multi-platform image building not supported when pushing to Docker engine"}),"\n",(0,t.jsx)(n.h2,{id:"request-to-write-5569-bytes-exceeds-size-in-header-of-13740-bytes-for-entry",children:"Request to write '5569' bytes exceeds size in header of '13740' bytes for entry"})]})}function d(e={}){let{wrapper:n}={...(0,a.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},79938:function(e,n,i){i.d(n,{Z:function(){return s},a:function(){return o}});var r=i(75271);let t={},a=r.createContext(t);function o(e){let n=r.useContext(a);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),r.createElement(a.Provider,{value:n},e.children)}}}]);