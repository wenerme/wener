ci: ci-install sync process notes.json build stats

ci-install:
	npm ci

install:
	npm install

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
	npm run build

dev:
	npm run start

.PHONY: build ci

docs.json:
	node -r ts-node/register src/scripts/process.ts $(ARGS)
notes.json: notes.ts notes.yaml docs.json
	node -r ts-node/register notes.ts
