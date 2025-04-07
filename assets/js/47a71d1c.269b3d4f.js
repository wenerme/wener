"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["20830"],{18409:function(e,t,n){n.r(t),n.d(t,{metadata:()=>s,contentTitle:()=>d,default:()=>l,assets:()=>i,toc:()=>c,frontMatter:()=>a});var s=JSON.parse('{"id":"os/debian/debian-setup","title":"Debian Setup","description":"","source":"@site/../notes/os/debian/debian-setup.md","sourceDirName":"os/debian","slug":"/os/debian/setup","permalink":"/notes/os/debian/setup","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/debian/debian-setup.md","tags":[{"inline":true,"label":"Setup","permalink":"/notes/tags/setup"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1724402050000,"frontMatter":{"tags":["Setup"]},"sidebar":"docs","previous":{"title":"Debian FAQ","permalink":"/notes/os/debian/faq"},"next":{"title":"Debian \u7248\u672C","permalink":"/notes/os/debian/version"}}'),o=n("52676"),r=n("79938");let a={tags:["Setup"]},d="Debian Setup",i={},c=[];function u(e){let t={code:"code",h1:"h1",header:"header",pre:"pre",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.header,{children:(0,o.jsx)(t.h1,{id:"debian-setup",children:"Debian Setup"})}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-bash",children:'sudo apt-get update\nsudo apt-get install ca-certificates curl rsync htop\n\n# Docker from docker.com\n# ====================\nsudo install -m 0755 -d /etc/apt/keyrings\nsudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc\nsudo chmod a+r /etc/apt/keyrings/docker.asc\n# Add the repository to Apt sources:\necho "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian $(. /etc/os-release && echo "$VERSION_CODENAME") stable" \\\n  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null\nsudo apt-get update\n\nsudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin\n\nsudo systemctl restart docker\n\nsudo usermod -aG docker $USER\n'})})]})}function l(e={}){let{wrapper:t}={...(0,r.a)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return d},a:function(){return a}});var s=n(75271);let o={},r=s.createContext(o);function a(e){let t=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),s.createElement(r.Provider,{value:t},e.children)}}}]);