"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["81313"],{17729:function(e,n,t){t.r(n),t.d(n,{metadata:()=>s,contentTitle:()=>i,default:()=>u,assets:()=>o,toc:()=>p,frontMatter:()=>l});var s=JSON.parse('{"id":"languages/python/pyinstaller","title":"PyInstaller","description":"- pyi-makespec","source":"@site/../notes/languages/python/pyinstaller.md","sourceDirName":"languages/python","slug":"/languages/python/pyinstaller","permalink":"/notes/languages/python/pyinstaller","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/python/pyinstaller.md","tags":[{"inline":true,"label":"Bundle","permalink":"/notes/tags/bundle"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1733665497000,"frontMatter":{"title":"PyInstaller","tags":["Bundle"]},"sidebar":"docs","previous":{"title":"pyenv","permalink":"/notes/languages/python/pyenv"},"next":{"title":"Python Awesome","permalink":"/notes/languages/python/awesome"}}'),a=t("52676"),r=t("79938");let l={title:"PyInstaller",tags:["Bundle"]},i="PyInstaller",o={},p=[];function c(e){let n={code:"code",h1:"h1",header:"header",li:"li",pre:"pre",ul:"ul",...(0,r.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"pyinstaller",children:"PyInstaller"})}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"pyi-makespec"}),"\n",(0,a.jsxs)(n.li,{children:["MEI - MEIPASS\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"sys._MEIPASS"}),"\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"C:\\Users\\<username>\\AppData\\Local\\Temp"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-bash",children:"pyi-makespec --onefile --windowed --name myapp app.py\n"})}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-py",children:'import sys\nimport os\n\ndef resource_path(relative_path):\n    """ Get absolute path to resource, works for dev and for PyInstaller """\n    base_path = getattr(sys, \'_MEIPASS\', os.path.dirname(os.path.abspath(__file__)))\n    return os.path.join(base_path, relative_path)\n'})})]})}function u(e={}){let{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},79938:function(e,n,t){t.d(n,{Z:function(){return i},a:function(){return l}});var s=t(75271);let a={},r=s.createContext(a);function l(e){let n=s.useContext(r);return s.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);