
ci: sync process build stats

sync:
	node -r ts-node/register src/scripts/sync.ts -dir=../story/ > story.list.txt
	rsync -a --files-from=story.list.txt ../ ./contents/ -v

	node -r ts-node/register src/scripts/sync.ts -dir=../tricks/ > notes.list.txt
	rsync -a --files-from=notes.list.txt ../ ./contents/ -v

process:
	node -r ts-node/register src/scripts/process.ts

stats:
	node -r ts-node/register src/scripts/stats.ts

build:
	yarn build

.PHONY: build ci
