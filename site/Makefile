
ci: install sync process build stats

install:
	yarn install

sync:
	node -r ts-node/register src/scripts/sync.ts -dir=../story/ > story.list.txt
	rsync -a --files-from=story.list.txt ../ ./

	node -r ts-node/register src/scripts/sync.ts -dir=../notes/ > notes.list.txt
	rsync -a --files-from=notes.list.txt ../ ./

process:
	node -r ts-node/register src/scripts/process.ts $(ARGS)

stats:
	node -r ts-node/register src/scripts/stats.ts
sidebar:
	node -r ts-node/register src/scripts/sidebar.ts $(ARGS)

build:
	yarn build

dev:
	yarn start

.PHONY: build ci
