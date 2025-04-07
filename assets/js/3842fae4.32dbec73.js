"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["5153"],{68225:function(e,n,t){t.r(n),t.d(n,{metadata:()=>i,contentTitle:()=>a,default:()=>u,assets:()=>c,toc:()=>l,frontMatter:()=>s});var i=JSON.parse('{"id":"service/forge/git/gitconfig","title":"gitconfig","description":"crlf","source":"@site/../notes/service/forge/git/gitconfig.md","sourceDirName":"service/forge/git","slug":"/service/forge/git/gitconfig","permalink":"/notes/service/forge/git/gitconfig","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/service/forge/git/gitconfig.md","tags":[{"inline":true,"label":"Configuration","permalink":"/notes/tags/configuration"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1677768806000,"frontMatter":{"tags":["Configuration"]},"sidebar":"docs","previous":{"title":"Sync","permalink":"/notes/service/forge/git/sync"},"next":{"title":"gitflow","permalink":"/notes/service/forge/git/gitflow"}}'),r=t("52676"),o=t("79938");let s={tags:["Configuration"]},a="gitconfig",c={},l=[{value:"crlf",id:"crlf",level:2}];function g(e){let n={code:"code",h1:"h1",h2:"h2",header:"header",pre:"pre",...(0,o.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"gitconfig",children:"gitconfig"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:'git config --global user.email "you@example.com"\ngit config --global user.name "Your Name"\n\ngit config --global credential.helper "cache --timeout=36000"\n'})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-ini",children:"[push]\n  default = simple\n[user]\n	editor = nano\n	quotepath = false\n	# name = wener\n	# email =\n	# signingkey = ssh-ed25519 AAAA wener\n[alias]\n	master = checkout master\n	ci = commit\n	co = checkout\n	wt = worktree\n	loggo = log --graph --oneline\n	l = log --graph --oneline --decorate\n	logg = log --graph\n	sti = status --ignored\n	st = status\n	sts = status -s\n  stsb = status -sb\n  latest = clone --depth 1 -v --progress\n	# svn push\n	svnc = !git stash && git svn dcommit && git stash pop\n	svnr = !git stash && git svn rebase  && git stash pop\n[color]\n  diff = auto\n  status = auto\n  branch = auto\n	ui = true\n[core]\n	autocrlf = input\n	safecrlf = false\n	quotepath = false\n	ignorecase = false\n[credential]\n	helper = cache --timeout=36000\n[pull]\n	ff = only\n# git init\n[init]\n  # \u4F7F\u7528 main \u4F5C\u4E3A\u9ED8\u8BA4\u5206\u652F\n	defaultBranch = main\n[gpg]\n	format = ssh\n# git commit\n[commit]\n  # \u63D0\u4EA4\u65F6\u81EA\u52A8 sign, -S\n	gpgsign = true\n"})}),"\n",(0,r.jsx)(n.h2,{id:"crlf",children:"crlf"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"git config --global core.eol lf\ngit config --global core.autocrlf input\ngit add -u --renormalize .\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-gitattributes",metastring:'title=".gitattributes"',children:"* text=auto eol=lf\n\n*.sln text eol=crlf\n*.png binary\n*.jpg binary\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{children:"core.autocrlf=true:      core.autocrlf=input:     core.autocrlf=false:\n\n     repository               repository               repository\n      ^      V                 ^      V                 ^      V\n     /        \\               /        \\               /        \\\ncrlf->lf    lf->crlf     crlf->lf       \\             /          \\\n   /            \\           /            \\           /            \\\n"})})]})}function u(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(g,{...e})}):g(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return a},a:function(){return s}});var i=t(75271);let r={},o=i.createContext(r);function s(e){let n=i.useContext(o);return i.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);