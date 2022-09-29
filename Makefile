status:
	git add -u && git diff --staged --stat | tee

pull:
	git pull --rebase --autostash
