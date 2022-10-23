ci: ci-install sync process notes.json build stats

ci-install:
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

# BUNDLE_FLAGS=--external:{unist-util-visit,mdast-util-to-string,mdast-util-from-markdown,mdast-util-to-markdown,unified,unist,mdast}
BUNDLE_FLAGS=--external:{unist-util-visit,unified,unist,mdast} --platform=node --target=node16
bundle:
	pnpm exec esbuild $(BUNDLE_FLAGS) --bundle  ./src/plugins/deflist.ts --outdir=./dist/plugins/ --format=cjs
	grep '^// ' ./dist/plugins/* | grep node_modules

build: plugins
	pnpm run build

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
	NODE_TEST=1 pnpm exec ava
