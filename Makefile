#SHELL:=env bash -O extglob -O globstar
SHELL:=env bash -O extglob

status:
	git add -u && git diff --color=always --staged --stat | tee

pull:
	git pull --rebase --autostash origin $(shell git branch --show-current)

prepare-tikz:
	apk add texlive icu-data-full texmf-dist-latexextra texmf-dist-langchinese texmf-dist-pictures
	apk add -X http://mirrors.aliyun.com/alpine/edge/testing pdf2svg

tikz:
	time node ./site/dist/scripts/tikz2svg.js ./notes/courses/cs221/assets/*.tikz

svgo:
	pnpm svgo ./notes/courses/cs221/assets/*.svg
