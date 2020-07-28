
* [Automatic-Variables](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)
* [Makefile cheatsheet](https://devhints.io/makefile)
* [makefile style guide](https://clarkgrubb.com/makefile-style-guide)
* [Special Built-in Target Names](https://www.gnu.org/software/make/manual/make.html#Special-Built_002din-Target-Names)

```Makefile
# 保留中间文件
.PRECIOUS: public/modules/wener-apis-%.system.js
# 二次求值 $$
# 这个需要放在前面
.SECONDEXPANSION:
.PHONEY: always

text := hello a b c
comma:= ,
empty:=
space:= $(empty) $(empty)
# 替换空格为逗号
rel  := $(subst $(space),$(comma),${text})

ok:
	@echo OK
# 二次求值
do-%: ok $$(wildcard src/modules/%/*.c)
  # ? ok - @ do-xxx - % - < ok - ^ ok - + ok - | - * xxx
	echo '?' $? - '@' $@ - '%' $% - '<' $< - '^' $^ - '+' $+ - '|' $| - '*' $*

make-%: always
# 如果文件存在才执行
ifneq ("$$(wildcard src/modules/$*/Makefile)","")
	$(MAKE) -f src/modules/$*/Makefile build
else
	@echo Skip - no makefile
endif

always:

```
