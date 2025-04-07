"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["96482"],{69353:function(n,e,s){s.r(e),s.d(e,{metadata:()=>l,contentTitle:()=>c,default:()=>x,assets:()=>t,toc:()=>h,frontMatter:()=>r});var l=JSON.parse('{"id":"dev/build/make","title":"make","description":"- Automatic-Variables","source":"@site/../notes/dev/build/make.md","sourceDirName":"dev/build","slug":"/dev/build/make","permalink":"/notes/dev/build/make","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/dev/build/make.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1729056347000,"frontMatter":{"title":"make"},"sidebar":"docs","previous":{"title":"magefile","permalink":"/notes/dev/build/mage"},"next":{"title":"Makefile","permalink":"/notes/dev/build/makefile"}}'),i=s("52676"),d=s("79938");let r={title:"make"},c="make",t={},h=[{value:"\u8981\u6C42\u73AF\u5883\u53D8\u91CF",id:"\u8981\u6C42\u73AF\u5883\u53D8\u91CF",level:2},{value:"\u63A5\u6536\u4EFB\u610F\u989D\u5916\u53C2\u6570",id:"\u63A5\u6536\u4EFB\u610F\u989D\u5916\u53C2\u6570",level:2},{value:"\u5E2E\u52A9\u6587\u6863",id:"\u5E2E\u52A9\u6587\u6863",level:2},{value:"Variables",id:"variables",level:2},{value:"\u7279\u6B8A\u53D8\u91CF",id:"\u7279\u6B8A\u53D8\u91CF",level:3},{value:"Targets",id:"targets",level:2},{value:"\u7279\u6B8A\u76EE\u6807",id:"\u7279\u6B8A\u76EE\u6807",level:3},{value:"\u51FD\u6570",id:"\u51FD\u6570",level:2},{value:"Recipes",id:"recipes",level:2},{value:"\u5E26\u5E2E\u52A9\u7684 Makefile",id:"\u5E26\u5E2E\u52A9\u7684-makefile",level:2}];function a(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,d.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"make",children:"make"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html",children:"Automatic-Variables"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://devhints.io/makefile",children:"Makefile cheatsheet"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://clarkgrubb.com/makefile-style-guide",children:"makefile style guide"})}),"\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.gnu.org/software/make/manual/make.html#Special-Built_002din-Target-Names",children:"Special Built-in Target Names"})}),"\n"]}),"\n",(0,i.jsx)(e.admonition,{type:"caution",children:(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"$(wildcard src/**/*.ts)"})," \u5728\u6709\u4E9B\u5E73\u53F0\u4E0A\u662F ",(0,i.jsx)(e.code,{children:"$(wildcard src/*/*.ts)"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u4E0D\u80FD\u904D\u5386\u6240\u6709\u6587\u4EF6"}),"\n",(0,i.jsx)(e.li,{children:"\u63A8\u8350 shell \u5C55\u5F00\u6216 find \u547D\u4EE4"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"macOS \u81EA\u5E26 make \u662F v3.1"}),"\n"]})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-Makefile",children:"# \u4FEE\u6539\u9ED8\u8BA4 shell\nSHELL=/bin/bash\n\n# \u4FDD\u7559\u4E2D\u95F4\u6587\u4EF6\n.PRECIOUS: public/modules/wener-apis-%.system.js\n# \u4E8C\u6B21\u6C42\u503C $$\n# \u8FD9\u4E2A\u9700\u8981\u653E\u5728\u524D\u9762\n.SECONDEXPANSION:\n\n# \u603B\u662F\u6267\u884C\n.PHONY: always\nalways:\n\n# \u6240\u6709 target \u90FD\u4E0D\u4F9D\u8D56 fs\n.PHONY: $(MAKECMDGOALS)\n\n# export \u6240\u6709\u53D8\u91CF\n.EXPORT_ALL_VARIABLES:\n\n# makefile \u6240\u5728\u76EE\u5F55\ncwd := $(notdir $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST))))))\n\n# \u66FF\u6362\u7A7A\u683C\u4E3A\u9017\u53F7\ntext := hello a b c\ncomma:= ,\nempty:=\nspace:= $(empty) $(empty)\nrel  := $(subst $(space),$(comma),${text})\n\n# @ \u4E0D\u8F93\u51FA\u8FD9\u884C\u547D\u4EE4\nok:\n	@echo OK\n# \u4E8C\u6B21\u6C42\u503C\ndo-%: ok $$(wildcard src/modules/%/*.c)\n  # ? ok - @ do-xxx - % - < ok - ^ ok - + ok - | - * xxx\n	echo '?' $? - '@' $@ - '%' $% - '<' $< - '^' $^ - '+' $+ - '|' $| - '*' $*\n\nmake-%: always\n# \u5982\u679C\u6587\u4EF6\u5B58\u5728\u624D\u6267\u884C\nifneq (\"$$(wildcard src/modules/$*/Makefile)\",\"\")\n	$(MAKE) -f src/modules/$*/Makefile build\nelse\n	@echo Skip - no makefile\nendif\n\n# \u5355\u6B21\nifneq (\"$(wildcard $(PATH_TO_FILE))\",\"\")\n    FILE_EXISTS = 1\nelse\n    FILE_EXISTS = 0\nendif\n\n# \u5FAA\u73AF\nLIST = one two three\nforeach:\n  for i in $(LIST); do \\\n      echo $$i; \\\n  done\n\n# \u76EE\u5F55\u5207\u6362\nfoo : bar/lose\n  cd $(<D) && gobble $(<F) > ../$@\n\n# \u4F7F\u7528 ONESHELL \u5219\u7B80\u5355\u4E00\u4E9B make v3.2+, macOS \u81EA\u5E26\u7684 make \u662F 3.1\n.ONESHELL:\nfoo : bar/lose\n  cd $(@D)\n  gobble $(@F) > ../$@\n"})}),"\n",(0,i.jsx)(e.h2,{id:"\u8981\u6C42\u73AF\u5883\u53D8\u91CF",children:"\u8981\u6C42\u73AF\u5883\u53D8\u91CF"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-makefile",children:"check-env:\nifndef ENV\n	$(error ENV is undefined)\nendif\n"})}),"\n",(0,i.jsx)(e.h2,{id:"\u63A5\u6536\u4EFB\u610F\u989D\u5916\u53C2\u6570",children:"\u63A5\u6536\u4EFB\u610F\u989D\u5916\u53C2\u6570"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-makefile",children:"CMD_ARGS = $(filter-out $@,$(MAKECMDGOALS))\n%:\n	@:\nrun:\n  @echo RUN $(CMD_ARGS)\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"make run app\n"})}),"\n",(0,i.jsx)(e.h2,{id:"\u5E2E\u52A9\u6587\u6863",children:"\u5E2E\u52A9\u6587\u6863"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html",children:"Self-Documented Makefile"})}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-makefile",children:".PHONY: help\n.DEFAULT_GOAL := help\nhelp:\n	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = \":.*?## \"}; {printf \"\\033[36m%-30s\\033[0m %s\\n\", $$1, $$2}'\n"})}),"\n",(0,i.jsx)(e.h2,{id:"variables",children:"Variables"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"${foo}"}),", ",(0,i.jsx)(e.code,{children:"$(foo)"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"$foo"})," \u5B9E\u9645\u662F ",(0,i.jsx)(e.code,{children:"$(f)oo"})," - \u6240\u4EE5\u4E0D\u8981\u8FD9\u6837\u7528"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.li,{children:"\u4F7F\u7528\u573A\u666F targets, prerequisites, recipes, most directives, new variable values"}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"="}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"set variable - \u9012\u5F52\u5C55\u5F00\uFF0C\u6BCF\u6B21\u6C42\u503C\u5C55\u5F00"}),"\n",(0,i.jsxs)(e.li,{children:["\u4E0D\u53EF\u4EE5 ",(0,i.jsx)(e.code,{children:"CFLAGS = $(CFLAGS) -O"}),", \u4F1A\u5BFC\u81F4\u65E0\u9650\u5FAA\u73AF\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u4F7F\u7528 ",(0,i.jsx)(e.code,{children:"+="})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:":="}),",",(0,i.jsx)(e.code,{children:"::="}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"Simply expanded variables"}),"\n",(0,i.jsx)(e.li,{children:"\u7ACB\u5373\u5C55\u5F00\uFF0C\u6267\u884C\u4E00\u6B21"}),"\n",(0,i.jsxs)(e.li,{children:["\u9012\u5F52\u5C55\u5F00 ",(0,i.jsx)(e.code,{children:"a := $($(x))"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"?="}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u9ED8\u8BA4\u503C"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"override variable := value"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\u8986\u76D6\u53D8\u91CF\uFF0C\u53EF\u4EE5\u4F7F\u7528 ",(0,i.jsx)(e.code,{children:"="}),",",(0,i.jsx)(e.code,{children:":="}),",",(0,i.jsx)(e.code,{children:"+="})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"undefine variable"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u53D6\u6D88\u53D8\u91CF\u5B9A\u4E49"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:[(0,i.jsx)(e.code,{children:"${var:a=b}"}),",",(0,i.jsx)(e.code,{children:"$(var:a=b)"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u66FF\u6362"}),"\n",(0,i.jsxs)(e.li,{children:["\u7B49\u540C\u4E8E ",(0,i.jsx)(e.code,{children:"$(patsubst %a,%b,var)"})]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u6C42\u503C\u987A\u5E8F\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u8986\u76D6\u53D8\u91CF"}),"\n",(0,i.jsx)(e.li,{children:"Setting Variables, verbatim definition - Defining Multi-Line Variables"}),"\n",(0,i.jsx)(e.li,{children:"\u73AF\u5883\u53D8\u91CF"}),"\n",(0,i.jsx)(e.li,{children:"\u81EA\u52A8\u53D8\u91CF"}),"\n",(0,i.jsx)(e.li,{children:"\u5E38\u91CF\u53D8\u91CF\u3001\u9690\u6027\u89C4\u5219"}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\u6CE8\u610F\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u4F9D\u8D56\u9879\u4F1A\u7EE7\u627F\u53D8\u91CF"}),"\n"]}),"\n"]}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"var"}),(0,i.jsx)(e.th,{children:"desc"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.code,{children:"$@"})}),(0,i.jsx)(e.td,{children:"target"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:(0,i.jsx)(e.code,{children:"$*"})}),(0,i.jsxs)(e.td,{children:[(0,i.jsx)(e.code,{children:"%"})," in target"]})]})]})]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-makefile",children:"# \u591A\u884C\u53D8\u91CF\n# \u7B49\u540C\u4E8E two-lines = echo foo; echo $(bar)\ndefine two-lines\necho foo\necho $(bar)\nendef\n\n$(info $(origin foo))\n$(info $(flavor bar))\n\n\nEXTRA_CFLAGS =\n# \u79C1\u6709\u53D8\u91CF\nprog: private EXTRA_CFLAGS = -L/usr/local/lib\nprog: a.o b.o\n\n# ?=\nifeq ($(origin FOO), undefined)\n  FOO = bar\nendif\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-makefile",children:"%.out: %.input1 %.input2\n    merge $<1 $<2 $@\n%.out: %.input1 %.input2\n    merge $^ $@\n\ndoit: project.out\n    # force build\n    touch $@\n"})}),"\n",(0,i.jsx)(e.h3,{id:"\u7279\u6B8A\u53D8\u91CF",children:"\u7279\u6B8A\u53D8\u91CF"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"var"}),(0,i.jsx)(e.th,{children:"desc"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"MAKEFILE_LIST"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".DEFAULT_GOAL"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"MAKE_RESTARTS"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"MAKE_TERMOUT,MAKE_TERMERR"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".RECIPEPREFIX"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".VARIABLES"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".FEATURES"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".INCLUDE_DIRS"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".EXTRA_PREREQS"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"MAKECMDGOALS"}),(0,i.jsx)(e.td,{children:"make \u65F6\u7684\u76EE\u6807"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"MAKE"}),(0,i.jsx)(e.td,{children:"make"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"MAKEFILES"}),(0,i.jsx)(e.td,{})]})]})]}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["CURDIR\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u5C3D\u91CF\u7528 CURDIR"}),"\n",(0,i.jsx)(e.li,{children:"\u7531 make \u7EF4\u62A4"}),"\n",(0,i.jsxs)(e.li,{children:["\u652F\u6301 ",(0,i.jsx)(e.code,{children:"-C"})," \u5207\u6362"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["PWD\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:"\u73AF\u5883\u53D8\u91CF\u63D0\u4F9B"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-makefile",children:"info:\n  echo $(info CURDIR is from $(origin CURDIR)) $(info PWD is from $(origin PWD))\n"})}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.gnu.org/software/make/manual/html_node/Quick-Reference.html",children:"https://www.gnu.org/software/make/manual/html_node/Quick-Reference.html"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"targets",children:"Targets"}),"\n",(0,i.jsx)(e.p,{children:(0,i.jsx)(e.a,{href:"https://www.gnu.org/software/make/manual/make.html#Standard-Targets",children:"Standard Targets"})}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"target"}),(0,i.jsx)(e.th,{children:"desc"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"all"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"clean"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"mostlyclean"}),(0,i.jsx)(e.td,{children:"\u4FDD\u7559\u4E0D\u60F3\u91CD\u65B0\u7F16\u8BD1\u7684\u6587\u4EF6\uFF0C\u4F8B\u5982 libgcc.a"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"distclean,realclean,clobber"}),(0,i.jsx)(e.td,{children:"\u6BD4 clean \u6E05\u9664\u66F4\u591A\u6587\u4EF6\uFF0C\u4F8B\u5982\u914D\u7F6E\u6587\u4EF6\uFF0Clink"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"install"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"print"}),(0,i.jsx)(e.td,{children:"\u663E\u793A\u53D8\u5316\u4E86\u7684\u6E90\u6587\u4EF6"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"tar"}),(0,i.jsx)(e.td,{children:"\u6E90\u6587\u4EF6 tar"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"shar"}),(0,i.jsx)(e.td,{children:"\u6E90\u6587\u4EF6 shar"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"dist"}),(0,i.jsx)(e.td,{})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"TAGS"}),(0,i.jsx)(e.td,{children:"\u66F4\u65B0 tags \u6587\u4EF6"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:"check,test"}),(0,i.jsx)(e.td,{children:"\u6D4B\u8BD5"})]})]})]}),"\n",(0,i.jsx)(e.h3,{id:"\u7279\u6B8A\u76EE\u6807",children:"\u7279\u6B8A\u76EE\u6807"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.gnu.org/software/make/manual/make.html#Special-Targets",children:"Special-Targets"})}),"\n"]}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,i.jsxs)(e.table,{children:[(0,i.jsx)(e.thead,{children:(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.th,{children:"target"}),(0,i.jsx)(e.th,{children:"desc"})]})}),(0,i.jsxs)(e.tbody,{children:[(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".PHONY"}),(0,i.jsx)(e.td,{children:"\u603B\u662F\u8FD0\u884C"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".SUFFIXES"}),(0,i.jsxs)(e.td,{children:["\u540E\u7F00\u6A21\u5F0F\u81EA\u52A8\u5339\u914D\uFF0C\u73B0\u5728\u4E00\u822C\u4F7F\u7528 ",(0,i.jsx)(e.code,{children:"%"})]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".DEFAULT"}),(0,i.jsx)(e.td,{children:"\u6CA1\u627E\u5230\u89C4\u5219\u65F6\u7684\u9ED8\u8BA4\u76EE\u6807"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".PRECIOUS"}),(0,i.jsx)(e.td,{children:"\u4FDD\u7559\u4E2D\u95F4\u6587\u4EF6"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".INTERMEDIATE"}),(0,i.jsx)(e.td,{children:"\u8868\u660E\u662F\u4E2D\u95F4\u6587\u4EF6"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".SECONDARY"}),(0,i.jsx)(e.td,{children:"\u9ED8\u8BA4\u4F9D\u8D56\u4E3A\u4E8C\u6B21\u5C55\u5F00"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".SECONDEXPANSION"}),(0,i.jsxs)(e.td,{children:[(0,i.jsx)(e.code,{children:"$$"})," \u4E8C\u6B21\u5C55\u5F00"]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".DELETE_ON_ERROR"}),(0,i.jsx)(e.td,{children:"\u9519\u8BEF\u65F6\u5220\u9664\u6587\u4EF6"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".IGNORE"}),(0,i.jsxs)(e.td,{children:["\u5FFD\u7565\u9519\u8BEF\uFF0C\u73B0\u5728\u4E00\u822C\u4F7F\u7528 ",(0,i.jsx)(e.code,{children:"-"})]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".LOW_RESOLUTION_TIME"}),(0,i.jsx)(e.td,{children:"\u5904\u7406\u6587\u4EF6\u4FEE\u6539\u65F6\u95F4\u65F6\u7528\u66F4\u4F4E\u7CBE\u5EA6\uFF0C\u73B0\u5728\u4E00\u822C\u4E0D\u4F7F\u7528"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".SILENT"}),(0,i.jsxs)(e.td,{children:["\u4E0D\u8F93\u51FA\uFF0C\u7C7B\u4F3C ",(0,i.jsx)(e.code,{children:"-s"})]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".EXPORT_ALL_VARIABLES"}),(0,i.jsx)(e.td,{children:"\u5BFC\u51FA\u6240\u6709\u53D8\u91CF"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".NOTPARALLEL"}),(0,i.jsxs)(e.td,{children:["\u4E0D\u5E76\u884C\uFF0C\u5FFD\u7565 ",(0,i.jsx)(e.code,{children:"-j"})]})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".ONESHELL"}),(0,i.jsx)(e.td,{children:"\u8FD0\u884C\u5728\u4E00\u4E2A shell \u91CC\u800C\u4E0D\u662F\u6BCF\u884C\u4E00\u4E2A shell"})]}),(0,i.jsxs)(e.tr,{children:[(0,i.jsx)(e.td,{children:".POSIX"}),(0,i.jsx)(e.td,{children:"POSIX \u517C\u5BB9\u6A21\u5F0F"})]})]})]}),"\n",(0,i.jsx)(e.h2,{id:"\u51FD\u6570",children:"\u51FD\u6570"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.gnu.org/software/make/manual/html_node/File-Name-Functions.html",children:"https://www.gnu.org/software/make/manual/html_node/File-Name-Functions.html"})}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"recipes",children:"Recipes"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsx)(e.li,{children:(0,i.jsx)(e.a,{href:"https://www.gnu.org/software/make/manual/make.html#Recipes",children:"Recipes"})}),"\n"]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-makefile",children:"subsystem:\n  # \u900F\u4F20 make\n  cd subdir && $(MAKE) $(MFLAGS)\n\nifeq (0,${MAKELEVEL})\nwhoami    := $(shell whoami)\nhost-type := $(shell arch)\nMAKE := ${MAKE} host-type=${host-type} whoami=${whoami}\nendif\n"})}),"\n",(0,i.jsx)(e.h2,{id:"\u5E26\u5E2E\u52A9\u7684-makefile",children:"\u5E26\u5E2E\u52A9\u7684 Makefile"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-makefile",children:"build: ## Build\n  echo BUILD\n.PHONY: help\nhelp: ## \u5E2E\u52A9\n	@egrep -h '\\s##\\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = \":.*?## \"}; {printf \"\\033[36m%-20s\\033[0m %s\\n\", $$1, $$2}'\n"})}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-bash",children:"make help\n"})})]})}function x(n={}){let{wrapper:e}={...(0,d.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(a,{...n})}):a(n)}},79938:function(n,e,s){s.d(e,{Z:function(){return c},a:function(){return r}});var l=s(75271);let i={},d=l.createContext(i);function r(n){let e=l.useContext(d);return l.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:r(n.components),l.createElement(d.Provider,{value:e},n.children)}}}]);