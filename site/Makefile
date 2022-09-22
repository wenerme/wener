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

plugins:
	pnpm exec esbuild ./src/plugins/deflist.ts --outdir=./lib/plugins/ --format=cjs
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
