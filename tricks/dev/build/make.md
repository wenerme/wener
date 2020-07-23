
* [Automatic-Variables](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)
* [Makefile cheatsheet](https://devhints.io/makefile)
* [makefile style guide](https://clarkgrubb.com/makefile-style-guide)

```Makefile
ok:
	@echo OK

do-%: ok $$(wildcard src/modules/%/*.c)
  # ? ok - @ do-xxx - % - < ok - ^ ok - + ok - | - * xxx
	echo '?' $? - '@' $@ - '%' $% - '<' $< - '^' $^ - '+' $+ - '|' $| - '*' $*

always:

# 保留中间文件
.PRECIOUS: public/modules/wener-apis-%.system.js
# 二次求值 $$
.SECONDEXPANSION:
.PHONEY: always
```
