"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["86322"],{50188:function(e,t,n){n.r(t),n.d(t,{metadata:()=>o,contentTitle:()=>l,default:()=>p,assets:()=>u,toc:()=>c,frontMatter:()=>a});var o=JSON.parse('{"id":"languages/go/go-cookbook","title":"Go Cookbook","description":"http reverse proxy","source":"@site/../notes/languages/go/go-cookbook.md","sourceDirName":"languages/go","slug":"/languages/go/cookbook","permalink":"/notes/languages/go/cookbook","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/go/go-cookbook.md","tags":[{"inline":true,"label":"Cookbook","permalink":"/notes/tags/cookbook"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1656388638000,"frontMatter":{"tags":["Cookbook"]},"sidebar":"docs","previous":{"title":"Concurrent","permalink":"/notes/languages/go/concurrent"},"next":{"title":"Debugging","permalink":"/notes/languages/go/debug"}}'),r=n("52676"),s=n("79938");let a={tags:["Cookbook"]},l="Go Cookbook",u={},c=[{value:"http reverse proxy",id:"http-reverse-proxy",level:2}];function i(e){let t={code:"code",h1:"h1",h2:"h2",header:"header",pre:"pre",...(0,s.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.header,{children:(0,r.jsx)(t.h1,{id:"go-cookbook",children:"Go Cookbook"})}),"\n",(0,r.jsx)(t.h2,{id:"http-reverse-proxy",children:"http reverse proxy"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-go",children:'package main\n\nimport (\n	"fmt"\n	"log"\n	"net/http"\n	"net/http/httputil"\n	"net/url"\n)\n\nfunc main() {\n	u, _ := url.Parse("https://wener.me")\n	proxy := httputil.NewSingleHostReverseProxy(u)\n\n	proxy.Director = func(r *http.Request) {\n		r.URL.Scheme = u.Scheme\n		r.URL.Host = u.Host\n		r.Host = u.Host\n		dump, _ := httputil.DumpRequest(r, false)\n		fmt.Println(string(dump))\n	}\n	http.Handle("/", proxy)\n	log.Fatalln(http.ListenAndServe(":8088", http.DefaultServeMux))\n}\n'})}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-bash",children:"curl 127.0.0.1:8088\n"})})]})}function p(e={}){let{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}},79938:function(e,t,n){n.d(t,{Z:function(){return l},a:function(){return a}});var o=n(75271);let r={},s=o.createContext(r);function a(e){let t=o.useContext(s);return o.useMemo(function(){return"function"==typeof e?e(t):{...t,...e}},[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);