"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["47509"],{26153:function(n,e,s){s.r(e),s.d(e,{metadata:()=>i,contentTitle:()=>o,default:()=>a,assets:()=>d,toc:()=>c,frontMatter:()=>r});var i=JSON.parse('{"id":"languages/go/go-faq","title":"Go FAQ","description":"- golang/go#9200","source":"@site/../notes/languages/go/go-faq.md","sourceDirName":"languages/go","slug":"/languages/go/faq","permalink":"/notes/languages/go/faq","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/go/go-faq.md","tags":[{"inline":true,"label":"FAQ","permalink":"/notes/tags/faq"}],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1730783995000,"frontMatter":{"title":"Go FAQ","tags":["FAQ"]},"sidebar":"docs","previous":{"title":"Debugging","permalink":"/notes/languages/go/debug"},"next":{"title":"\u6CDB\u578B","permalink":"/notes/languages/go/generic"}}'),l=s("52676"),t=s("79938");let r={title:"Go FAQ",tags:["FAQ"]},o="Go FAQ",d={},c=[{value:"\u5B89\u88C5",id:"\u5B89\u88C5",level:2},{value:"\u5B89\u88C5\u6307\u5B9A\u7248\u672C Golang \u73AF\u5883",id:"\u5B89\u88C5\u6307\u5B9A\u7248\u672C-golang-\u73AF\u5883",level:2},{value:"tip \u7248\u672C",id:"tip-version",level:2},{value:"iota",id:"iota",level:2},{value:"GOVCS disallows using git for public",id:"govcs-disallows-using-git-for-public",level:2},{value:"go: cannot find GOROOT directory: /usr/local/go",id:"go-cannot-find-goroot-directory-usrlocalgo",level:2},{value:"golang.org/x",id:"golangorgx",level:2},{value:"\u67E5\u627E\u7528\u5230\u4E86 cgo \u7684\u6A21\u5757",id:"\u67E5\u627E\u7528\u5230\u4E86-cgo-\u7684\u6A21\u5757",level:2},{value:"JSON string to int",id:"json-string-to-int",level:2},{value:"sql null",id:"sql-null",level:2},{value:"Struct \u662F\u5426\u4F7F\u7528\u6307\u9488",id:"struct-\u662F\u5426\u4F7F\u7528\u6307\u9488",level:2},{value:"text/template vs html/template",id:"texttemplate-vs-htmltemplate",level:2},{value:"\u4E0D\u4F1A\u4F7F\u7528 /etc/hosts \u5C31\u884C\u89E3\u6790",id:"\u4E0D\u4F1A\u4F7F\u7528-etchosts-\u5C31\u884C\u89E3\u6790",level:2},{value:"Windows \u5B89\u88C5",id:"windows-\u5B89\u88C5",level:2},{value:"reflect.Value.Interface: cannot return value obtained from unexported field or method",id:"reflectvalueinterface-cannot-return-value-obtained-from-unexported-field-or-method",level:2},{value:"bufio.Reader vs bufio.Scanner",id:"bufioreader-vs-bufioscanner",level:2},{value:"pq vs pgx",id:"pq-vs-pgx",level:2},{value:"gc vs gccgo",id:"gc-vs-gccgo",level:2},{value:"compile: version does not match go tool version",id:"compile-version-does-not-match-go-tool-version",level:2},{value:"Cipher CBC / ECB / CFB / GCM",id:"cipher-cbc--ecb--cfb--gcm",level:2},{value:"memstats.gc_sys undefined (type mstats has no field or method gc_sys)",id:"memstatsgc_sys-undefined-type-mstats-has-no-field-or-method-gc_sys",level:2},{value:"go.sum h1",id:"gosum-h1",level:2},{value:"GODEBUG",id:"godebug",level:2},{value:"\u5E38\u89C1\u5927\u5199\u5B57\u6BB5\u540D\u5B57",id:"\u5E38\u89C1\u5927\u5199\u5B57\u6BB5\u540D\u5B57",level:2},{value:"regexp",id:"regexp",level:2},{value:"go build static",id:"go-build-static",level:2},{value:"struct \u53EF\u6BD4\u8F83",id:"struct-\u53EF\u6BD4\u8F83",level:2},{value:"\u5224\u65AD int \u7C7B\u578B",id:"\u5224\u65AD-int-\u7C7B\u578B",level:2},{value:"\u5185\u5B58\u6A21\u578B",id:"\u5185\u5B58\u6A21\u578B",level:2},{value:"This program can only be run on AMD64 processors with v3 microarchitecture support",id:"this-program-can-only-be-run-on-amd64-processors-with-v3-microarchitecture-support",level:2},{value:"unknown-unsupported file format error",id:"unknown-unsupported-file-format-error",level:2},{value:".syso",id:"syso",level:2},{value:"SysProcAttr",id:"sysprocattr",level:2},{value:"\u6587\u4EF6\u540D",id:"filename-convention",level:2}];function h(n){let e={a:"a",admonition:"admonition",annotation:"annotation",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",math:"math",mi:"mi",mrow:"mrow",ol:"ol",p:"p",pre:"pre",semantics:"semantics",span:"span",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"go-faq",children:"Go FAQ"})}),"\n",(0,l.jsx)(e.admonition,{type:"caution",children:(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/golang/go/issues/9200",children:"golang/go#9200"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"html/template JS \u4E0D\u80FD\u5305\u542B ```"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/golang/go/issues/13492",children:"golang/go#13492"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"musl \u4E0D\u652F\u6301 c-shared"}),"\n",(0,l.jsx)(e.li,{children:"\u56E0\u4E3A c-shared \u7528\u5230\u4E86 glibc \u6269\u5C55"}),"\n",(0,l.jsx)(e.li,{children:"initial-exec TLS resolves to dynamic definition"}),"\n"]}),"\n"]}),"\n"]})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-Makefile",children:"tidy:\n  go mod tidy\nfmt: tidy\n  go fmt ./...\noutdated:\n  go list -u -m -f '{{if .Update}}{{.}}{{end}}' all\nupdate:\n	go get -u ./...\n"})}),"\n",(0,l.jsx)(e.h2,{id:"\u5B89\u88C5",children:"\u5B89\u88C5"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://go.dev/dl/",children:"https://go.dev/dl/"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://mirrors.ustc.edu.cn/golang/",children:"https://mirrors.ustc.edu.cn/golang/"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# Windows go1.17.6.windows-amd64.zip\n# macOS go1.18.3.darwin-amd64.tar.gz\ncurl -LO https://mirrors.ustc.edu.cn/golang/go1.17.6.windows-amd64.zip\nmkdir -p ~/sdk\nunzip go1.17.6.windows-amd64.zip -d ~/sdk\nmv ~/sdk/go ~/sdk/go1.17.6\n~/sdk/go1.17.6/bin/go version\n\nexport PATH=$HOME/sdk/go1.17.6/bin:$PATH\n"})}),"\n",(0,l.jsx)(e.h2,{id:"\u5B89\u88C5\u6307\u5B9A\u7248\u672C-golang-\u73AF\u5883",children:"\u5B89\u88C5\u6307\u5B9A\u7248\u672C Golang \u73AF\u5883"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u4E0B\u8F7D\u4F4D\u7F6E\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsxs)(e.span,{className:"katex",children:[(0,l.jsx)(e.span,{className:"katex-mathml",children:(0,l.jsx)(e.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,l.jsxs)(e.semantics,{children:[(0,l.jsxs)(e.mrow,{children:[(0,l.jsx)(e.mi,{children:"H"}),(0,l.jsx)(e.mi,{children:"O"}),(0,l.jsx)(e.mi,{children:"M"}),(0,l.jsx)(e.mi,{children:"E"}),(0,l.jsx)(e.mi,{mathvariant:"normal",children:"/"}),(0,l.jsx)(e.mi,{children:"s"}),(0,l.jsx)(e.mi,{children:"d"}),(0,l.jsx)(e.mi,{children:"k"}),(0,l.jsx)(e.mi,{mathvariant:"normal",children:"/"}),(0,l.jsx)(e.mi,{children:"g"}),(0,l.jsx)(e.mi,{children:"o"})]}),(0,l.jsx)(e.annotation,{encoding:"application/x-tex",children:"HOME/sdk/go"})]})})}),(0,l.jsx)(e.span,{className:"katex-html","aria-hidden":"true",children:(0,l.jsxs)(e.span,{className:"base",children:[(0,l.jsx)(e.span,{className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.08125em"},children:"H"}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.05764em"},children:"OME"}),(0,l.jsx)(e.span,{className:"mord",children:"/"}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"s"}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"d"}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.03148em"},children:"k"}),(0,l.jsx)(e.span,{className:"mord",children:"/"}),(0,l.jsx)(e.span,{className:"mord mathnormal",style:{marginRight:"0.03588em"},children:"g"}),(0,l.jsx)(e.span,{className:"mord mathnormal",children:"o"})]})})]}),"VERSION/go$VERSION.darwin-amd64.tar.gz"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u5B89\u88C5\u903B\u8F91 [golang.org/dl/internal/version/version.go]\uFF08",(0,l.jsx)(e.a,{href:"https://cs.opensource.google/go/dl/+/1eec6072:internal/version/version.go",children:"https://cs.opensource.google/go/dl/+/1eec6072:internal/version/version.go"})]}),"\n",(0,l.jsx)(e.li,{children:"\u5B89\u88C5\u5B8C\u6210\u4E0D\u4F1A\u5220\u9664\u538B\u7F29\u5305\uFF0C\u53EF\u81EA\u5DF1\u5220\u9664"}),"\n",(0,l.jsxs)(e.li,{children:["tip \u6700\u65B0 latest\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4E0B\u8F7D\u6E90\u7801\u8FDB\u884C\u7F16\u8BD1"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u9ED8\u8BA4\u4E0B\u8F7D\u5730\u5740 ",(0,l.jsx)(e.code,{children:'"https://dl.google.com/go/" + version + "." + goos + "-" + arch + ext'})]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'# \u4E0B\u8F7D tip \u7248\u672C\ngo install golang.org/dl/gotip@latest\ngotip download\n\n# \u4E0B\u8F7D\u6700\u65B0\u7248\u672C\n# \u4ECE dl.google.com \u4E0B\u8F7D\n# \u9ED8\u8BA4\u5B89\u88C5\u5230 ~/sdk/\n# \u5176\u4ED6\u7248\u672C \u4F8B\u5982 go1.18rc1\ngo install golang.org/dl/go1.18@latest\ngo1.18 download\ngo1.18 env GOROOT\n\uFF5E/sdk/go1.18/bin/go env\n\n# \u5B89\u88C5\u5230\u522B\u7684\u5730\u65B9\nHOME=/opt ~/go/bin/go1.18 download\n/opt/sdk/go1.18/bin/go env\n\n# \u4EA4\u53C9\u7F16\u8BD1\nmkdir work && cd work\ngo mod init work\ngo get -u golang.org/dl/go1.18\nGOOS=linux go build -o go1.18_linux golang.org/dl/go1.18@latest\n\n# AlpineLinux \u57FA\u7840\u4F9D\u8D56\napk add libc6-compat gcompat\n# AlpineLinux CGO \u4F9D\u8D56\napk add gcc musl-dev\n\n# \u6CE8\u610F\u8BBE\u7F6E GOROOT - \u9ED8\u8BA4 /usr/go\nexport GOROOT=/opt/sdk/go1.18\n\nexport PATH="$GOROOT/bin:$HOME/go/bin:$PATH"\n'})}),"\n",(0,l.jsx)(e.h2,{id:"tip-version",children:"tip \u7248\u672C"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"@latest - \u7A33\u5B9A\u7248\u672C"}),"\n",(0,l.jsxs)(e.li,{children:["@main, @master, @HEAD -> @tip\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6700\u65B0\u7684\u63D0\u4EA4"}),"\n",(0,l.jsx)(e.li,{children:"\u501F\u7528\u81EA Mercurial"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"iota",children:"iota"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://en.wiktionary.org/wiki/iota#Etymology",children:"https://en.wiktionary.org/wiki/iota#Etymology"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"govcs-disallows-using-git-for-public",children:"GOVCS disallows using git for public"}),"\n",(0,l.jsxs)(e.p,{children:["\u6DFB\u52A0 GOVCS \u8BBE\u7F6E\uFF0C\u9ED8\u8BA4\u4E3A ",(0,l.jsx)(e.code,{children:"public:git|hg,private:all"})]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"# \u5168\u90E8\u5141\u8BB8\nGOVCS=*:all go get github.com/wenerme/apki\n# \u9650\u5B9A\nGOVCS=github.com:git,*:off go get github.com/wenerme/apki\n"})}),"\n",(0,l.jsx)(e.h2,{id:"go-cannot-find-goroot-directory-usrlocalgo",children:"go: cannot find GOROOT directory: /usr/local/go"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4ECE\u6E90\u7801\u6784\u5EFA\u9ED8\u8BA4 GOROOT_FINAL=/usr/local/go"}),"\n",(0,l.jsxs)(e.li,{children:["AlpineLinux \u9ED8\u8BA4\u4E3A /usr/lib/go\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u81EA\u884C\u6784\u5EFA\u53EF\u4FEE\u6539 - ",(0,l.jsx)(e.a,{href:"https://gitlab.alpinelinux.org/alpine/aports/-/blob/master/community/go/APKBUILD#L135",children:"alpinelinix/go/APKBUILD"})]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"bazel \u5B89\u88C5\u7684 Go \u4E5F\u6709\u8FD9\u4E2A\u95EE\u9898"}),"\n"]}),"\n",(0,l.jsx)(e.hr,{}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsx)(e.li,{children:"\u521B\u5EFA\u76EE\u5F55 - \u63A8\u8350\u65B9\u5F0F"}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"ln -s /opt/sdk/go1.18beta1 /usr/local/go\n"})}),"\n",(0,l.jsxs)(e.ol,{start:"2",children:["\n",(0,l.jsx)(e.li,{children:"\u4FEE\u6539 GOROOT \u914D\u7F6E"}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"GOROOT=/opt/sdk/go1.18beta1 /opt/sdk/go1.18beta1/bin/go env\n# \u5199\u5165\u540E\u4FBF\u4E0D\u4F1A\u62A5\u9519\nGOROOT=/opt/sdk/go1.18beta1 /opt/sdk/go1.18beta1/bin/go env -w GOROOT=/opt/sdk/go1.18beta1\n/opt/sdk/go1.18beta1/bin/go env\n"})}),"\n",(0,l.jsx)(e.h2,{id:"golangorgx",children:"golang.org/x"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["x/net\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/golang/net",children:"https://github.com/golang/net"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://cs.opensource.google/go/x/net",children:"https://cs.opensource.google/go/x/net"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"\u67E5\u627E\u7528\u5230\u4E86-cgo-\u7684\u6A21\u5757",children:"\u67E5\u627E\u7528\u5230\u4E86 cgo \u7684\u6A21\u5757"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'go list -f "{{if .CgoFiles}}{{.ImportPath}}{{end}}" $(go list -f "{{.ImportPath}}{{range .Deps}} {{.}}{{end}}" ./...)\n'})}),"\n",(0,l.jsx)(e.h2,{id:"json-string-to-int",children:"JSON string to int"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"json.Number - encode \u4FDD\u7559 number"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:'json:",string"'})," - encode \u4F1A\u8F6C string"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"sql-null",children:"sql null"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u76F4\u63A5\u4F7F\u7528\u6307\u9488\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u7B80\u5355\u3001\u65E0\u5916\u90E8\u4F9D\u8D56"}),"\n",(0,l.jsx)(e.li,{children:"json\u3001mapstructure \u80FD\u6B63\u786E\u5904\u7406"}),"\n",(0,l.jsx)(e.li,{children:"\u4EE3\u7801\u903B\u8F91\u590D\u6742\u4E00\u70B9"}),"\n",(0,l.jsx)(e.li,{children:"\u53EF\u80FD\u5BFC\u81F4\u672A\u9884\u671F\u7684\u4FEE\u6539"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["sql.NullType\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u4EE3\u7801\u903B\u8F91\u6E05\u6670\uFF0C\u4E0D\u4F1A\u5BFC\u81F4\u6307\u9488\u4FEE\u6539"}),"\n",(0,l.jsx)(e.li,{children:"json\u3001mapstructure \u65E0\u6CD5\u6B63\u786E\u5904\u7406"}),"\n",(0,l.jsx)(e.li,{children:"mapstructure \u9700\u8981\u81EA\u5B9A\u4E49 Hook"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["null.Type - ",(0,l.jsx)(e.a,{href:"https://github.com/guregu/null",children:"guregu/null"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5F15\u5165\u5916\u90E8\u5E93"}),"\n",(0,l.jsx)(e.li,{children:"\u63D0\u4F9B\u4FBF\u6377\u65B9\u6CD5"}),"\n",(0,l.jsx)(e.li,{children:"\u652F\u6301 json"}),"\n",(0,l.jsx)(e.li,{children:"mapstructure \u65E0\u6CD5\u6B63\u786E\u5904\u7406"}),"\n",(0,l.jsx)(e.li,{children:"mapstructure \u9700\u8981\u81EA\u5B9A\u4E49 Hook"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"struct-\u662F\u5426\u4F7F\u7528\u6307\u9488",children:"Struct \u662F\u5426\u4F7F\u7528\u6307\u9488"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u5C3D\u91CF\u4E0D\u4F7F\u7528\u6307\u9488 - \u76F4\u63A5\u4F7F\u7528 Struct \u4F1A\u66F4\u5FEB\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\uD83C\uDF1F \u4F7F\u7528\u6307\u9488\u4F1A\u7528\u5230\u5168\u5C40\u5806\uFF0C\u4F7F\u7528 struct \u526F\u672C\u53EF\u76F4\u63A5\u653E\u5230\u6808"}),"\n",(0,l.jsx)(e.li,{children:"\u7528\u5230\u5806\u5C31\u4F1A\u6D89\u53CA\u5230 GC"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u4F7F\u7528 Pointer\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u8C03\u7528\u5BC6\u5EA6\u9AD8"}),"\n",(0,l.jsx)(e.li,{children:"\u4E0D\u9700\u8981\u526F\u672C\u573A\u666F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u4F7F\u7528 Struct\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6570\u636E\u5BC6\u5EA6\u9AD8\u4F46\u4E0D\u9700\u8981\u7ECF\u5E38\u8C03\u7528"}),"\n",(0,l.jsx)(e.li,{children:"\u786E\u4FDD\u6570\u636E\u4E0D\u53D1\u751F\u53D8\u5316"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"\u5982\u679C Struct \u5305\u542B\u4E86\u4E0D\u53EF\u590D\u5236\u5BF9\u8C61\uFF0C\u5219\u4E00\u5B9A\u8981\u7528\u6307\u9488 - \u4F8B\u5982 sycn.Mutex"}),"\n",(0,l.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://medium.com/a-journey-with-go/44b43b104963",children:"Go: Should I Use a Pointer instead of a Copy of my Struct?"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://www.ardanlabs.com/blog/2017/06/design-philosophy-on-data-and-semantics.html",children:"https://www.ardanlabs.com/blog/2017/06/design-philosophy-on-data-and-semantics.html"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-golang",children:'type Server struct {\n  // \u5185\u90E8\u914D\u7F6E\u5BF9\u8C61\u53EF\u4F7F\u7528 Struct\n  conf ServerConf\n}\n// \u56E0\u4E3A\u4F1A\u5BF9 conf \u8FDB\u884C\u9ED8\u8BA4\u503C\u8865\u9F50 - \u56E0\u6B64\u4F20\u5165\u6307\u9488\nfunc NewServer(conf *ServerConf)*Server{\n  // \u4FEE\u6539\n  if conf.Bind == "" {\n    conf.Bind = "0.0.0.0"\n  }\n  // \u590D\u5236\u4E00\u4E2A conf \u907F\u514D\u5916\u90E8\u66F4\u6539\n  // Server \u4F7F\u7528\u6307\u9488\uFF0C\u56E0\u4E3A\u4E0D\u9700\u8981\u526F\u672C\n  return &Server{ Conf = *conf }\n}\n'})}),"\n",(0,l.jsx)(e.h2,{id:"texttemplate-vs-htmltemplate",children:"text/template vs html/template"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["html/template\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u8F93\u51FA\u5185\u5BB9\u88AB\u8F6C\u4E49\uFF0C\u907F\u514D\u4EE3\u7801\u6CE8\u5165"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"\u4E0D\u4F1A\u4F7F\u7528-etchosts-\u5C31\u884C\u89E3\u6790",children:"\u4E0D\u4F1A\u4F7F\u7528 /etc/hosts \u5C31\u884C\u89E3\u6790"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u6DFB\u52A0 ",(0,l.jsx)(e.code,{children:"/etc/nsswitch.conf"})," \u53EF\u4EE5\u89E3\u51B3\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:'echo "hosts: files dns" > /etc/nsswitch.conf'}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/gliderlabs/docker-alpine/issues/367#issuecomment-424546457",children:"1"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/golang/go/issues/35305",children:"#35305"})," - net: prefer /etc/hosts over DNS when no /etc/nsswitch.conf is present"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/golang/go/issues/22846",children:"#22846"})," - net: Go DNS resolver does not read /etc/hosts"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:(0,l.jsx)(e.strong,{children:"/etc/nsswitch.conf"})}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"# /etc/nsswitch.conf\n#\n# As described on the web page https://man7.org/linux/man-pages/man3/gethostbyname.3.html,\n# without the nsswitch.conf file, the gethostbyname() and gethostbyaddr() domain queries\n# will fail to a local name server, thus the /etc/hosts will take no effect.\n#\n# For example, when hostaliases are specified for a kubernetes pod, without proper settings\n# defined in this file, the hostaliases settings will not take effect.\n#\n# Following contents of this file is from the ubuntu:16.04 docker image.\n\npasswd:         compat\ngroup:          compat\nshadow:         compat\ngshadow:        files\n\nhosts:          files dns\nnetworks:       files\n\nprotocols:      db files\nservices:       db files\nethers:         db files\nrpc:            db files\n\nnetgroup:       nis\n"})}),"\n",(0,l.jsx)(e.h2,{id:"windows-\u5B89\u88C5",children:"Windows \u5B89\u88C5"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://golang.org/dl/",children:"https://golang.org/dl/"})," - \u4E0B\u8F7D MSI \u6216 Zip\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["MSI \u9ED8\u8BA4\u5B89\u88C5\u5728 ",(0,l.jsx)(e.code,{children:"C:\\GO"})]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'# msys \u4E0B\nexport GOPATH=$HOME/go\nexport PATH="$PATH:/c/GO/bin:$HOME/go/bin"\nexport GO111MODULE=on\nexport GOPROXY=https://goproxy.io\n'})}),"\n",(0,l.jsx)(e.h2,{id:"reflectvalueinterface-cannot-return-value-obtained-from-unexported-field-or-method",children:"reflect.Value.Interface: cannot return value obtained from unexported field or method"}),"\n",(0,l.jsx)(e.p,{children:"relfect \u4E0D\u5141\u8BB8\u8BBF\u95EE\u672A\u5BFC\u51FA\u5B57\u6BB5"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["Hack access ",(0,l.jsx)(e.a,{href:"https://stackoverflow.com/a/43918797/1870054",children:"https://stackoverflow.com/a/43918797/1870054"})]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"bufioreader-vs-bufioscanner",children:"bufio.Reader vs bufio.Scanner"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["bufio.Scanner\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u4E00\u6B21\u8BFB\u4E00\u884C - \u4E0D\u5305\u542B\u5206\u9694\u7B26 ",(0,l.jsx)(e.code,{children:"\\r\\n"})]}),"\n",(0,l.jsx)(e.li,{children:"\u9ED8\u8BA4 64k \u884C\u9650\u5236"}),"\n",(0,l.jsx)(e.li,{children:"\u63A5\u53E3\u4F7F\u7528\u53CB\u597D\uFF0CScan \u548C \u9519\u8BEF \u72EC\u7ACB"}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"io.EOF"})," \u65F6 Err \u4E3A nil"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.li,{children:"bufio.Reader"}),"\n",(0,l.jsx)(e.li,{children:"\u5185\u90E8 4k \u7F13\u51B2"}),"\n",(0,l.jsxs)(e.li,{children:["ReadLine \u4E0D\u8FD4\u56DE\u6362\u884C\uFF0C\u7C7B\u4F3C Scanner\uFF0C\u4F46\u8FD4\u56DE ",(0,l.jsx)(e.code,{children:"[]byte"})," - ",(0,l.jsx)(e.strong,{children:"\u4E0D\u63A8\u8350"})," \u4F7F\u7528"]}),"\n",(0,l.jsx)(e.li,{children:"ReadString - \u8BFB\u53D6\u76F4\u5230\u6307\u5B9A\u5206\u9694\u7B26\uFF0C\u8FD4\u56DE\u5206\u9694\u7B26 - \u7C7B\u4F3C Scanner"}),"\n",(0,l.jsxs)(e.li,{children:["\u5B9E\u73B0 ",(0,l.jsx)(e.code,{children:"io.Reader"})," - \u5F88\u591A\u65F6\u5019\u8FD9\u4E2A\u662F\u9009\u62E9\u7684 ",(0,l.jsx)(e.em,{children:"\u51B3\u5B9A\u56E0\u7D20"})]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"pq-vs-pgx",children:"pq vs pgx"}),"\n",(0,l.jsxs)(e.blockquote,{children:["\n",(0,l.jsx)(e.p,{children:"pq \u4F5C\u8005\u63A8\u8350\u63A8\u8350\u4F7F\u7528 pgx"}),"\n"]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/lib/pq",children:"pq"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u9879\u76EE\u5904\u4E8E\u7EF4\u62A4\u6A21\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.a,{href:"https://github.com/jackc/pgx",children:"pgx"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u652F\u6301\u6240\u6709 native \u7C7B\u578B"}),"\n",(0,l.jsx)(e.li,{children:"\u652F\u6301\u903B\u8F91\u590D\u5236\u534F\u8BAE"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"gc-vs-gccgo",children:"gc vs gccgo"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["gc - \u9ED8\u8BA4 Golang \u5B9E\u73B0\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u534A\u5E74\u5347\u7EA7\u4E00\u6B21 - \u8DDF\u968F spec \u7248\u672C"}),"\n",(0,l.jsx)(e.li,{children:"1.5 \u540E\u4E0D\u518D\u4F9D\u8D56 C \u7F16\u8BD1\u5668"}),"\n",(0,l.jsx)(e.li,{children:"\u8DE8\u5E73\u53F0\u7F16\u8BD1 - \u4E0D\u4F9D\u8D56 CGO \u65F6"}),"\n",(0,l.jsx)(e.li,{children:"\u9759\u6001\u7F16\u8BD1 - \u4F53\u79EF\u5927 - HelloWorld 2M+"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["gccgo - \u57FA\u4E8E GCC \u5B9E\u73B0\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u968F GCC \u5347\u7EA7 - \u7248\u672C\u4E00\u822C\u843D\u540E\uFF0C\u5347\u7EA7\u6162"}),"\n",(0,l.jsx)(e.li,{children:"\u4F9D\u8D56 OS \u63D0\u4F9B GCC \u5305 - \u4E00\u822C\u843D\u540E\u4E3B GCC \u7248\u672C"}),"\n",(0,l.jsx)(e.li,{children:"\u7F16\u8BD1\u66F4\u5FEB\uFF0C\u4F46\u652F\u6301\u66F4\u591A\u4F18\u5316 - \u91CD CPU \u573A\u666F\u6027\u80FD\u66F4\u597D"}),"\n",(0,l.jsx)(e.li,{children:"\u9ED8\u8BA4\u652F\u6301 CGO"}),"\n",(0,l.jsx)(e.li,{children:"\u652F\u6301\u66F4\u591A\u5E73\u53F0 - \u6240\u6709 GCC \u652F\u6301\u7684\u5E73\u53F0"}),"\n",(0,l.jsx)(e.li,{children:"\u4EA4\u53C9\u7F16\u8BD1\u975E\u5E38\u96BE"}),"\n",(0,l.jsxs)(e.li,{children:["\u52A8\u6001\u94FE\u63A5 - \u4F53\u79EF\u975E\u5E38\u5C0F - HelloWorld 250K vs 2MB\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"libgo, libm, libgcc, libz, libpthread, ld.so, linux-vdso.so - virtual shared object"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:'# go \u53EF\u76F4\u63A5\u4F7F\u7528 gccgo \u7F16\u8BD1\ngo build -compiler gccgo myprog\n\n# gccgo flags\ngo build -gccgoflags "-s -w" main.go\n'})}),"\n",(0,l.jsx)(e.h2,{id:"compile-version-does-not-match-go-tool-version",children:"compile: version does not match go tool version"}),"\n",(0,l.jsx)(e.p,{children:"\u6CE8\u610F\u8C03\u6574 GOROOT"}),"\n",(0,l.jsx)(e.h2,{id:"cipher-cbc--ecb--cfb--gcm",children:"Cipher CBC / ECB / CFB / GCM"}),"\n",(0,l.jsx)(e.h2,{id:"memstatsgc_sys-undefined-type-mstats-has-no-field-or-method-gc_sys",children:"memstats.gc_sys undefined (type mstats has no field or method gc_sys)"}),"\n",(0,l.jsx)(e.p,{children:"\u5347\u7EA7\u540E\u51FA\u73B0\uFF0C\u5C1D\u8BD5\u5378\u8F7D\u91CD\u88C5\u3002"}),"\n",(0,l.jsx)(e.p,{children:"\u5C1D\u8BD5\u5220\u9664\u76EE\u5F55 /usr/lib/go/ \u540E\u91CD\u88C5\u3002"}),"\n",(0,l.jsx)(e.h2,{id:"gosum-h1",children:"go.sum h1"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["h1: hash-v1\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"sha256+base64"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/vikyd/go-checksum",children:"https://github.com/vikyd/go-checksum"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-go.sum",children:"<module> <version> <hash>\n<module> <version>/go.mod <hash>\n"})}),"\n",(0,l.jsx)(e.h2,{id:"godebug",children:"GODEBUG"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"GODEBUG=netdns=go"}),"\n",(0,l.jsx)(e.li,{children:"GODEBUG=netdns=cgo"}),"\n",(0,l.jsx)(e.li,{children:"GODEBUG=netdns=go+2"}),"\n",(0,l.jsx)(e.li,{children:"GODEBUG=netdns=cgo+2"}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"\u5E38\u89C1\u5927\u5199\u5B57\u6BB5\u540D\u5B57",children:"\u5E38\u89C1\u5927\u5199\u5B57\u6BB5\u540D\u5B57"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{children:"ACL\nAPI\nASCII\nCPU\nCSS\nDNS\nEOF\nGUID\nHTML\nHTTP\nHTTPS\nID\nIP\nJSON\nLHS\nQPS\nRAM\nRHS\nRPC\nSLA\nSMTP\nSQL\nSSH\nTCP\nTLS\nTTL\nUDP\nUI\nUID\nURI\nURL\nUTF8\nUUID\nVM\nXML\nXMPP\nXSRF\nXSS\n"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/golang/lint/blob/6edffad5e6160f5949cdefc81710b2706fbcd4f6/lint.go#L770-L809",children:"commonInitialisms"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"regexp",children:"regexp"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Index \u4E3A byte index"}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://pkg.go.dev/regexp",children:"https://pkg.go.dev/regexp"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://pkg.go.dev/regexp/syntax",children:"https://pkg.go.dev/regexp/syntax"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"go-build-static",children:"go build static"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-bash",children:"CGO_ENABLED=0 go build -a -ldflags '-extldflags \"-static\"'\n# statically linked PIE\nCGO_ENABLED=1 go build -buildmode=pie -tags 'osusergo,netgo,static,static_build' -ldflags '-linkmode=external -extldflags \"-static-pie\"' .\n\nGOOS=linux go build -tags 'osusergo netgo'\nGOFLAGS=-static\n\nCGO_ENABLED=0 go build -a -tags 'osusergo netgo' -ldflags '-extldflags \"-static\"'\n"})}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/golang/go/issues/26492",children:"https://github.com/golang/go/issues/26492"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"struct-\u53EF\u6BD4\u8F83",children:"struct \u53EF\u6BD4\u8F83"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5982\u679C\u6240\u6709\u5B57\u6BB5\u53EF\u6BD4\u8F83\uFF0C\u5219 struct \u53EF\u6BD4\u8F83"}),"\n",(0,l.jsxs)(e.li,{children:["\u4F7F\u7528 struct \u4F5C\u4E3A context key \u9700\u8981\u6CE8\u610F\u6BD4\u8F83\u903B\u8F91\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u6307\u9488\u548C\u975E\u6307\u9488\u6BD4\u8F83\u903B\u8F91\u76F8\u540C"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-go",children:"// nocmp is an uncomparable struct. Embed this inside another struct to make\n// it uncomparable.\n//\n//  type Foo struct {\n//    nocmp\n//    // ...\n//  }\n//\n// This DOES NOT:\n//\n//  - Disallow shallow copies of structs\n//  - Disallow comparison of pointers to uncomparable structs\ntype nocmp [0]func()\n"})}),"\n",(0,l.jsx)(e.h2,{id:"\u5224\u65AD-int-\u7C7B\u578B",children:"\u5224\u65AD int \u7C7B\u578B"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-go",children:'package main\n\nimport (\n	"fmt"\n	"runtime"\n	"unsafe"\n)\n\nfunc main() {\n	fmt.Println("arch", runtime.GOARCH)\n  // 8 -> int64\n  // 4 -> int32\n	fmt.Println("int", unsafe.Sizeof(int(0)))\n}\n'})}),"\n",(0,l.jsx)(e.h2,{id:"\u5185\u5B58\u6A21\u578B",children:"\u5185\u5B58\u6A21\u578B"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://research.swtch.com/mm",children:"https://research.swtch.com/mm"})}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://go.dev/ref/mem",children:"https://go.dev/ref/mem"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"this-program-can-only-be-run-on-amd64-processors-with-v3-microarchitecture-support",children:"This program can only be run on AMD64 processors with v3 microarchitecture support"}),"\n",(0,l.jsx)(e.h2,{id:"unknown-unsupported-file-format-error",children:"unknown-unsupported file format error"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["\u68C0\u67E5\u4E0B\u662F\u4E0D\u662F\u6709 .syso\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"macOS \u4E0B\u7528\u4E0D\u4E86"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"syso",children:".syso"}),"\n",(0,l.jsx)(e.p,{children:"Go \u8BED\u8A00\u9879\u76EE\u4E2D\u4F7F\u7528\u7684\u4E00\u79CD\u8D44\u6E90\u6587\u4EF6\uFF0C\u4E3B\u8981\u7528\u4E8E\u5C06\u9759\u6001\u8D44\u6E90\uFF08\u5982\u56FE\u6807\u3001\u7248\u672C\u4FE1\u606F\u3001Windows \u6E05\u5355\u6587\u4EF6\u7B49\uFF09\u5D4C\u5165\u5230\u7F16\u8BD1\u540E\u7684\u4E8C\u8FDB\u5236\u6587\u4EF6\u4E2D\u3002"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:["windres\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:".rc -> .syso"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"sysprocattr",children:"SysProcAttr"}),"\n",(0,l.jsx)(e.pre,{children:(0,l.jsx)(e.code,{className:"language-go",children:"type Credential struct {\n	Uid         uint32   // User ID.\n	Gid         uint32   // Group ID.\n	Groups      []uint32 // Supplementary group IDs.\n	NoSetGroups bool     // If true, don't set supplementary groups\n}\n\ntype SysProcAttr struct {\n  // linux like\n\n	Chroot     string      // Chroot.\n	Credential *Credential // Credential.\n	Ptrace     bool        // Enable tracing.\n	Setsid     bool        // Create session.\n	// Setpgid sets the process group ID of the child to Pgid,\n	// or, if Pgid == 0, to the new child's process ID.\n	Setpgid bool\n	// Setctty sets the controlling terminal of the child to\n	// file descriptor Ctty. Ctty must be a descriptor number\n	// in the child process: an index into ProcAttr.Files.\n	// This is only meaningful if Setsid is true.\n	Setctty bool\n	Noctty  bool // Detach fd 0 from controlling terminal\n	Ctty    int  // Controlling TTY fd\n	// Foreground places the child process group in the foreground.\n	// This implies Setpgid. The Ctty field must be set to\n	// the descriptor of the controlling TTY.\n	// Unlike Setctty, in this case Ctty must be a descriptor\n	// number in the parent process.\n	Foreground bool\n	Pgid       int // Child's process group ID if Setpgid.\n\n  //region Linux\n\n  // Pdeathsig, if non-zero, is a signal that the kernel will send to\n	// the child process when the creating thread dies. Note that the signal\n	// is sent on thread termination, which may happen before process termination.\n	// There are more details at https://go.dev/issue/27505.\n	Pdeathsig    Signal\n	Cloneflags   uintptr        // Flags for clone calls.\n	Unshareflags uintptr        // Flags for unshare calls.\n	UidMappings  []SysProcIDMap // User ID mappings for user namespaces.\n	GidMappings  []SysProcIDMap // Group ID mappings for user namespaces.\n	// GidMappingsEnableSetgroups enabling setgroups syscall.\n	// If false, then setgroups syscall will be disabled for the child process.\n	// This parameter is no-op if GidMappings == nil. Otherwise for unprivileged\n	// users this should be set to false for mappings work.\n	GidMappingsEnableSetgroups bool\n	AmbientCaps                []uintptr // Ambient capabilities.\n	UseCgroupFD                bool      // Whether to make use of the CgroupFD field.\n	CgroupFD                   int       // File descriptor of a cgroup to put the new process into.\n	// PidFD, if not nil, is used to store the pidfd of a child, if the\n	// functionality is supported by the kernel, or -1. Note *PidFD is\n	// changed only if the process starts successfully.\n	PidFD *int\n\n  //endregion\n\n  //region Windows\n  // https://learn.microsoft.com/en-us/windows/win32/procthread/process-creation-flags\n\n  HideWindow                 bool                 // \u9690\u85CF Promopt/\u63D0\u793A\u7A97\u53E3 0x08000000 CREATE_NO_WINDOW\n  CmdLine                    string               // \u82E5\u975E\u7A7A\uFF0C\u5219\u4F7F\u7528\u6B64\u547D\u4EE4\u884C\uFF1B\u5426\u5219\uFF0C\u6839\u636E\u4F20\u9012\u7ED9 StartProcess \u7684\u53C2\u6570\u6784\u5EFA\n  CreationFlags              uint32\n  Token                      Token                // \u5728\u8BE5 token \u8868\u793A\u7684\u5B89\u5168\u4E0A\u4E0B\u6587\u4E2D\u8FD0\u884C\u65B0\u8FDB\u7A0B\n  ProcessAttributes          *SecurityAttributes  // \u5E94\u7528\u8FD9\u4E9B\u5B89\u5168\u5C5E\u6027\u4F5C\u4E3A\u65B0\u8FDB\u7A0B\u7684\u63CF\u8FF0\u7B26\n  ThreadAttributes           *SecurityAttributes  // \u5E94\u7528\u8FD9\u4E9B\u5B89\u5168\u5C5E\u6027\u4F5C\u4E3A\u65B0\u8FDB\u7A0B\u4E3B\u7EBF\u7A0B\u7684\u63CF\u8FF0\u7B26\n  NoInheritHandles           bool                 // \u65B0\u8FDB\u7A0B\u4E0D\u7EE7\u627F\u4EFB\u4F55\u53E5\u67C4\uFF0C\u751A\u81F3\u5305\u62EC ProcAttr.Files \u4E2D\u7684\u6807\u51C6\u53E5\u67C4\uFF0C\u4EE5\u53CA AdditionalInheritedHandles \u4E2D\u7684\u53E5\u67C4\n  AdditionalInheritedHandles []Handle             // \u5DF2\u6807\u8BB0\u4E3A\u53EF\u7EE7\u627F\u7684\u65B0\u8FDB\u7A0B\u5C06\u7EE7\u627F\u7684\u989D\u5916\u53E5\u67C4\u5217\u8868\n  ParentProcess              Handle               // \u65B0\u8FDB\u7A0B\u5C06\u8BE5\u53E5\u67C4\u6307\u5B9A\u7684\u8FDB\u7A0B\u89C6\u4E3A\u7236\u8FDB\u7A0B\uFF0C\u4E14 AdditionalInheritedHandles\uFF08\u5982\u679C\u8BBE\u7F6E\uFF09\u5E94\u8BE5\u5B58\u5728\u4E8E\u8BE5\u7236\u8FDB\u7A0B\u4E2D\n\n  //endregion\n}\n"})}),"\n",(0,l.jsx)(e.h2,{id:"filename-convention",children:"\u6587\u4EF6\u540D"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,l.jsxs)(e.table,{children:[(0,l.jsx)(e.thead,{children:(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.th,{style:{textAlign:"right"},children:"fn"}),(0,l.jsx)(e.th,{children:"for"}),(0,l.jsx)(e.th,{children:"node"})]})}),(0,l.jsxs)(e.tbody,{children:[(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:"snake_case.go"}),(0,l.jsx)(e.td,{children:"\u6587\u4EF6\u540D"}),(0,l.jsx)(e.td,{children:"\u4E0D\u5F3A\u5236"})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.code,{children:"internal/"})}),(0,l.jsx)(e.td,{children:"\u5185\u90E8\u5305"}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.strong,{children:"Go Testing"})}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.code,{children:"x_test.go"})}),(0,l.jsx)(e.td,{children:"\u6D4B\u8BD5\u6587\u4EF6"}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.code,{children:"testdata/"})}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.strong,{children:"Go Build Constraints"})}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.code,{children:"x_GOOS.go"})}),(0,l.jsx)(e.td,{children:(0,l.jsx)(e.code,{children:"//go:build OS"})}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.code,{children:"x_linux.go"})}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.code,{children:"x_windows.go"})}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.code,{children:"x_GOARCH.go"})}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.code,{children:"x_amd64.go"})}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{})]}),(0,l.jsxs)(e.tr,{children:[(0,l.jsx)(e.td,{style:{textAlign:"right"},children:(0,l.jsx)(e.code,{children:"x_GOOS_GOARCH"})}),(0,l.jsx)(e.td,{}),(0,l.jsx)(e.td,{})]})]})]}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"// +build linux"})," < go 1.17"]}),"\n",(0,l.jsxs)(e.li,{children:[(0,l.jsx)(e.code,{children:"//go:build linux"})," >= go 1.17"]}),"\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/golang/go/issues/36060",children:"https://github.com/golang/go/issues/36060"})}),"\n"]})]})}function a(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(h,{...n})}):h(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return o},a:function(){return r}});var i=s(75271);let l={},t=i.createContext(l);function r(n){let e=i.useContext(t);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:r(n.components),i.createElement(t.Provider,{value:e},n.children)}}}]);