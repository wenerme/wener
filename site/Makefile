SHELL:=env bash -O extglob -O globstar

ci: ci-install sync process notes.json build stats

host-info:
	-@echo "CPU: `nproc`"
	-@which free && free || true
	@echo -n "Default heap size: "
	@node -e 'console.log(v8.getHeapStatistics().heap_size_limit/(1024*1024))'

ci-install: host-info
	npm add -g pnpm
	pnpm install --frozen-lockfile

install:
	pnpm install

sync:
#	pnpm exec tsx src/scripts/sync.ts -dir=../story/ > story.list.txt
#	rsync -a --files-from=story.list.txt ../ ./

#	pnpm exec tsx src/scripts/sync.ts -dir=../notes/ > notes.list.txt
#	rsync -a --files-from=notes.list.txt ../ ./

process:
#	pnpm exec tsx src/scripts/process.ts $(ARGS)

stats:
#	pnpm exec tsx src/scripts/stats.ts
sidebar:
#	pnpm exec tsx src/scripts/sidebar.ts $(ARGS)

plugins: bundle
	pnpm exec esbuild  ./src/plugins/deflist.ts --outdir=./lib/plugins/ --format=cjs

# cjs do not support --splitting
# BUNDLE_FLAGS=--external:{unist-util-visit,mdast-util-to-string,mdast-util-from-markdown,mdast-util-to-markdown,unified,unist,mdast}
BUNDLE_FLAGS=--external:{unist-util-visit,unified,unist,mdast} --platform=node --target=node16
bundle:
	pnpm exec esbuild $(BUNDLE_FLAGS) --bundle ./src/plugins/table.mts  ./src/plugins/deflist.ts --outdir=./dist/plugins/ --format=cjs
	grep '^// ' ./dist/plugins/* | grep node_modules
	pnpm exec esbuild --platform=node --target=node16 --bundle ./src/scripts/tikz2svg.mts  --outdir=./dist/scripts/ --format=cjs


build: plugins
	NODE_OPTIONS="--max-old-space-size=8192" pnpm run build

dev:
	pnpm run start

.PHONY: build ci

docs.json:
#	pnpm exec tsx src/scripts/process.ts $(ARGS)
notes.json: notes.ts notes.yaml docs.json
#	pnpm exec tsx notes.ts

status:
	git add -u && git diff --staged --stat | tee

test:
	TEST=1 pnpm exec ava
test-build: TEST=1
test-build: build
