"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["40165"],{95123:function(n,e,i){i.r(e),i.d(e,{metadata:()=>s,contentTitle:()=>d,default:()=>o,assets:()=>c,toc:()=>a,frontMatter:()=>l});var s=JSON.parse('{"id":"service/forge/jenkins/README","title":"Jenkins","description":"- jenkinsci/jenkins","source":"@site/../notes/service/forge/jenkins/README.md","sourceDirName":"service/forge/jenkins","slug":"/service/forge/jenkins/","permalink":"/notes/service/forge/jenkins/","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/jenkins/README.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1681042995000,"frontMatter":{"title":"Jenkins"},"sidebar":"docs","previous":{"title":"goproxy","permalink":"/notes/service/forge/goproxy"},"next":{"title":"Jenkins FAQ","permalink":"/notes/service/forge/jenkins/faq"}}'),r=i("52676"),t=i("79938");let l={title:"Jenkins"},d="Jenkins",c={},a=[{value:"Docker",id:"docker",level:2},{value:"jenkins/ssh-agent",id:"jenkinsssh-agent",level:2},{value:"Failed to dynamically deploy this plugin",id:"failed-to-dynamically-deploy-this-plugin",level:2},{value:"System Properties",id:"system-properties",level:2}];function h(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,t.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"jenkins",children:"Jenkins"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/jenkinsci/jenkins",children:"jenkinsci/jenkins"})}),"\n",(0,r.jsxs)(e.li,{children:["\u7CFB\u7EDF\u8981\u6C42\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"4GB+ \u5185\u5B58"}),"\n",(0,r.jsx)(e.li,{children:"50GB+ \u78C1\u76D8"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"docker",children:"Docker"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://github.com/jenkinsci/docker",children:"jenkinsci/docker"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["jenkins/jenkins\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["lts-alpine\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u53EA\u6709 amd64"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["lts-jdk11\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"debian"}),"\n",(0,r.jsx)(e.li,{children:"amd64, arm64"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"lts-jdk17"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"/var/jenkins_home"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["50000\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"agent"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"docker run --rm -it \\\n  -v $PWD/data:/var/jenkins_home \\\n  -p 8080:8080 -p 50000:50000 \\\n  --name jenkins jenkins/jenkins:lts-jdk11\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"/var/jenkins_home/secrets/initialAdminPassword"}),"\n",(0,r.jsxs)(e.li,{children:["\u9ED8\u8BA4\u63D2\u4EF6\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"Folders"}),"\n",(0,r.jsx)(e.li,{children:"OWASP Markup Formatter"}),"\n",(0,r.jsx)(e.li,{children:"Build Timeout"}),"\n",(0,r.jsx)(e.li,{children:"Credentials Binding"}),"\n",(0,r.jsx)(e.li,{children:"Timestamper"}),"\n",(0,r.jsx)(e.li,{children:"Workspace Cleanup"}),"\n",(0,r.jsx)(e.li,{children:"Ant"}),"\n",(0,r.jsx)(e.li,{children:"Gradle"}),"\n",(0,r.jsx)(e.li,{children:"Pipeline"}),"\n",(0,r.jsx)(e.li,{children:"GitHub Branch Source"}),"\n",(0,r.jsx)(e.li,{children:"Pipeline: GitHub Groovy Libraries"}),"\n",(0,r.jsx)(e.li,{children:"Pipeline: Stage View"}),"\n",(0,r.jsx)(e.li,{children:"Git"}),"\n",(0,r.jsx)(e.li,{children:"SSH Build Agents"}),"\n",(0,r.jsx)(e.li,{children:"Matrix Authorization Strategy"}),"\n",(0,r.jsx)(e.li,{children:"PAM Authentication"}),"\n",(0,r.jsx)(e.li,{children:"LDAP"}),"\n",(0,r.jsx)(e.li,{children:"Email Extension"}),"\n",(0,r.jsx)(e.li,{children:"Mailer"}),"\n",(0,r.jsx)(e.li,{children:"Localization: Chinese (Simplified)"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"jenkinsssh-agent",children:"jenkins/ssh-agent"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"docker run --rm -it \\\n  jenkins/ssh-agent:4.13.0-alpine-jdk17\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["alpine\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"based on adoptopenjdk/openjdk"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.li,{children:"JENKINS_AGENT_SSH_PUBKEY"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://plugins.jenkins.io/ssh-slaves/",children:"SSH Build Agents"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.jenkins.io/doc/book/using/using-agents/#configuring-agents-with-docker",children:"https://www.jenkins.io/doc/book/using/using-agents/#configuring-agents-with-docker"})}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"failed-to-dynamically-deploy-this-plugin",children:"Failed to dynamically deploy this plugin"}),"\n",(0,r.jsx)(e.p,{children:"\u4E0B\u8F7D\u5931\u8D25"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://updates.jenkins-ci.org/download/plugins/",children:"https://updates.jenkins-ci.org/download/plugins/"})}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"system-properties",children:"System Properties"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ini",children:'jenkins.install.runSetupWizard=true\n# $JENKINS_HOME/secrets/initialAdminApiToken\n# "TOKEN" - `echo "11$(openssl rand -hex 16)"`\n# "@file"\njenkins.install.SetupWizard.adminInitialApiToken=true\n\nJENKINS_HOME=~/.jenkins\n'})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://archives.jenkins.io/status.html",children:"https://archives.jenkins.io/status.html"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://mirrors.tuna.tsinghua.edu.cn/jenkins/",children:"https://mirrors.tuna.tsinghua.edu.cn/jenkins/"})}),"\n",(0,r.jsx)(e.li,{children:"mirror.xmission.com"}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.jenkins.io/doc/book/managing/system-properties/",children:"https://www.jenkins.io/doc/book/managing/system-properties/"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://get.jenkins.io/plugins/",children:"https://get.jenkins.io/plugins/"})}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"JENKINS_UC=https://updates.jenkins.io/update-center.json\nJENKINS_UC_EXPERIMENTAL=https://updates.jenkins.io/experimental/update-center.json\nJENKINS_INCREMENTALS_REPO_MIRROR=https://repo.jenkins-ci.org/incrementals\nJENKINS_UC_DOWNLOAD=$JENKINS_UC/download\n\nJENKINS_PLUGIN_INFO=https://updates.jenkins.io/plugin-versions.json\n"})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"export JENKINS_UC=https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json\nexport JENKINS_UC_DOWNLOAD=https://mirrors.tuna.tsinghua.edu.cn/jenkins/\njenkins-plugin-cli --verbose -d $JENKINS_HOME/plugins/ --plugins cloudbees-folder\n\njenkins-plugin-cli -d $JENKINS_HOME/plugins/ --plugins cloudbees-folder antisamy-markup-formatter build-timeout credentials-binding timestamper ws-cleanup ant gradle workflow-aggregator github-branch-source pipeline-github-lib pipeline-stage-view git ssh-slaves matrix-auth pam-auth ldap email-ext mailer locale msbuild\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://updates.jenkins.io/plugin-versions.json",children:"https://updates.jenkins.io/plugin-versions.json"})}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"http://mirror.esuni.jp/jenkins/updates/update-center.json\nhttps://updates.jenkins-zh.cn/update-center.json\nhttps://jenkins-zh.gitee.io/update-center-mirror/tsinghua/current/update-center.json\nhttp://mirror.xmission.com/jenkins/updates/update-center.json\nhttp://updates.jenkins-ci.org/update-center.json\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/lework/jenkins-update-center",children:"https://github.com/lework/jenkins-update-center"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"http://mirrors.jenkins-ci.org/status.html",children:"http://mirrors.jenkins-ci.org/status.html"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://updates.jenkins.io/",children:"https://updates.jenkins.io/"})}),"\n"]})]})}function o(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(h,{...n})}):h(n)}},79938:function(n,e,i){i.d(e,{Z:function(){return d},a:function(){return l}});var s=i(75271);let r={},t=s.createContext(r);function l(n){let e=s.useContext(t);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:l(n.components),s.createElement(t.Provider,{value:e},n.children)}}}]);