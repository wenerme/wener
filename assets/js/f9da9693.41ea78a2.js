"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["32169"],{17025:function(n,e,o){o.r(e),o.d(e,{metadata:()=>s,contentTitle:()=>c,default:()=>g,assets:()=>l,toc:()=>a,frontMatter:()=>r});var s=JSON.parse('{"id":"languages/go/go-windows","title":"Golang Windows","description":"- -ldflags=\\"-H=windowsgui\\" \u53EF\u4EE5\u907F\u514D\u663E\u793A\u63A7\u5236\u53F0","source":"@site/../notes/languages/go/go-windows.md","sourceDirName":"languages/go","slug":"/languages/go/windows","permalink":"/notes/languages/go/windows","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/go/go-windows.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1727602505000,"frontMatter":{"title":"Golang Windows"},"sidebar":"docs","previous":{"title":"Go WASM","permalink":"/notes/languages/go/wasm"},"next":{"title":"Go XML","permalink":"/notes/languages/go/xml"}}'),i=o("52676"),t=o("79938");let r={title:"Golang Windows"},c="Golang Windows",l={},a=[{value:"code",id:"code",level:2},{value:"is incompatible with i386 output .rsrc merge failure: corrupt .rsrc section",id:"is-incompatible-with-i386-output-rsrc-merge-failure-corrupt-rsrc-section",level:2}];function d(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"golang-windows",children:"Golang Windows"})}),"\n",(0,i.jsx)(e.admonition,{type:"tip",children:(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:'-ldflags="-H=windowsgui"'})," \u53EF\u4EE5\u907F\u514D\u663E\u793A\u63A7\u5236\u53F0"]}),"\n"]})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.a,{href:"https://studygolang.com/articles/7497",children:"golang\u4F7F\u7528execCommand\u8C03\u7528\u7684\u65F6\u5019\u5B50\u8FDB\u7A0B\u5982\u4F55\u6740\u6389\u5904\u7406\u65B9\u6CD5"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Linux \u53EF\u4EE5\u4F7F\u7528 Setpgid"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/go-cmd/cmd",children:"go-cmd/cmd"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://github.com/AllenDang/w32",children:"AllenDang/w32"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://pkg.go.dev/golang.org/x/sys/windows/svc/mgr",children:"golang.org/x/sys/windows/svc/mgr"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"# CGO \u4EA4\u53C9\u7F16\u8BD1\nGOOS=windows GOARCH=amd64 CGO_ENABLED=1 CXX=x86_64-w64-mingw32-g++ CC=x86_64-w64-mingw32-gcc go build main.go\n\n# ICON\n# ==========\n# \u751F\u6210 syso\ngo get github.com/akavel/rsrc\n# rsrc [-manifest FILE.exe.manifest] [-ico FILE.ico[,FILE2.ico...]] -o FILE.syso\nrsrc -manifest main.exe.manifest -ico pkg/icon/icon.ico -o cmd/launcher/main.syso\n\n# \u652F\u6301\u7248\u672C\u7B49\u8BE6\u7EC6\u4FE1\u606F\ngo get github.com/josephspurrier/goversioninfo/cmd/goversioninfo\ngoversioninfo -icon=pkg/icon/icon.ico -manifest=main.exe.manifest -o cmd/launcher/main.syso\n"})}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.strong,{children:"main.exe.manifest"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-xml",children:'<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<assembly xmlns="urn:schemas-microsoft-com:asm.v1" manifestVersion="1.0">\n<assemblyIdentity\n    version="1.0.0.0"\n    processorArchitecture="x86"\n    name="controls"\n    type="win32"\n></assemblyIdentity>\n<dependency>\n    <dependentAssembly>\n        <assemblyIdentity\n            type="win32"\n            name="Microsoft.Windows.Common-Controls"\n            version="6.0.0.0"\n            processorArchitecture="*"\n            publicKeyToken="6595b64144ccf1df"\n            language="*"\n        ></assemblyIdentity>\n    </dependentAssembly>\n</dependency>\n</assembly>\n'})}),"\n",(0,i.jsx)(e.h2,{id:"code",children:"code"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-go",children:'import "github.com/gonutz/ide/w32"\n\nfunc hideConsole() {\n    console := w32.GetConsoleWindow()\n    if console == 0 {\n        return // no console attached\n    }\n    // If this application is the process that created the console window, then\n    // this program was not compiled with the -H=windowsgui flag and on start-up\n    // it created a console along with the main application window. In this case\n    // hide the console window.\n    // See\n    // http://stackoverflow.com/questions/9009333/how-to-check-if-the-program-is-run-from-a-console\n    _, consoleProcID := w32.GetWindowThreadProcessId(console)\n    if w32.GetCurrentProcessId() == consoleProcID {\n        w32.ShowWindowAsync(console, w32.SW_HIDE)\n    }\n}\n'})}),"\n",(0,i.jsx)(e.h1,{id:"faq",children:"FAQ"}),"\n",(0,i.jsx)(e.h2,{id:"is-incompatible-with-i386-output-rsrc-merge-failure-corrupt-rsrc-section",children:"is incompatible with i386:x86-64 output .rsrc merge failure: corrupt .rsrc section"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u6DFB\u52A0 ",(0,i.jsx)(e.code,{children:"-64"})," \u53C2\u6570"]}),"\n"]})]})}function g(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},79938:function(n,e,o){o.d(e,{Z:function(){return c},a:function(){return r}});var s=o(75271);let i={},t=s.createContext(i);function r(n){let e=s.useContext(t);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),s.createElement(t.Provider,{value:e},n.children)}}}]);