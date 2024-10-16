---
title: make
---

# make

- [Automatic-Variables](https://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html)
- [Makefile cheatsheet](https://devhints.io/makefile)
- [makefile style guide](https://clarkgrubb.com/makefile-style-guide)
- [Special Built-in Target Names](https://www.gnu.org/software/make/manual/make.html#Special-Built_002din-Target-Names)

:::caution

- `$(wildcard src/**/*.ts)` 在有些平台上是 `$(wildcard src/*/*.ts)`
  - 不能遍历所有文件
  - 推荐 shell 展开或 find 命令
- macOS 自带 make 是 v3.1

:::

```Makefile
# 修改默认 shell
SHELL=/bin/bash

# 保留中间文件
.PRECIOUS: public/modules/wener-apis-%.system.js
# 二次求值 $$
# 这个需要放在前面
.SECONDEXPANSION:

# 总是执行
.PHONY: always
always:

# 所有 target 都不依赖 fs
.PHONY: $(MAKECMDGOALS)

# export 所有变量
.EXPORT_ALL_VARIABLES:

# makefile 所在目录
cwd := $(notdir $(patsubst %/,%,$(dir $(abspath $(lastword $(MAKEFILE_LIST))))))

# 替换空格为逗号
text := hello a b c
comma:= ,
empty:=
space:= $(empty) $(empty)
rel  := $(subst $(space),$(comma),${text})

# @ 不输出这行命令
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

# 单次
ifneq ("$(wildcard $(PATH_TO_FILE))","")
    FILE_EXISTS = 1
else
    FILE_EXISTS = 0
endif

# 循环
LIST = one two three
foreach:
  for i in $(LIST); do \
      echo $$i; \
  done

# 目录切换
foo : bar/lose
  cd $(<D) && gobble $(<F) > ../$@

# 使用 ONESHELL 则简单一些 make v3.2+, macOS 自带的 make 是 3.1
.ONESHELL:
foo : bar/lose
  cd $(@D)
  gobble $(@F) > ../$@
```

## 要求环境变量

```makefile
check-env:
ifndef ENV
	$(error ENV is undefined)
endif
```

## 接收任意额外参数

```makefile
CMD_ARGS = $(filter-out $@,$(MAKECMDGOALS))
%:
	@:
run:
  @echo RUN $(CMD_ARGS)
```

```bash
make run app
```

## 帮助文档

- [Self-Documented Makefile](https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html)

```makefile
.PHONY: help
.DEFAULT_GOAL := help
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
```

## Variables

- `${foo}`, `$(foo)`
  - `$foo` 实际是 `$(f)oo` - 所以不要这样用
- 使用场景 targets, prerequisites, recipes, most directives, new variable values
- `=`
  - set variable - 递归展开，每次求值展开
  - 不可以 `CFLAGS = $(CFLAGS) -O`, 会导致无限循环
    - 使用 `+=`
- `:=`,`::=`
  - Simply expanded variables
  - 立即展开，执行一次
  - 递归展开 `a := $($(x))`
- `?=`
  - 默认值
- `override variable := value`
  - 覆盖变量，可以使用 `=`,`:=`,`+=`
- `undefine variable`
  - 取消变量定义
- `${var:a=b}`,`$(var:a=b)`
  - 替换
  - 等同于 `$(patsubst %a,%b,var)`
- 求值顺序
  - 覆盖变量
  - Setting Variables, verbatim definition - Defining Multi-Line Variables
  - 环境变量
  - 自动变量
  - 常量变量、隐性规则
- 注意
  - 依赖项会继承变量

| var  | desc          |
| ---- | ------------- |
| `$@` | target        |
| `$*` | `%` in target |

```makefile
# 多行变量
# 等同于 two-lines = echo foo; echo $(bar)
define two-lines
echo foo
echo $(bar)
endef

$(info $(origin foo))
$(info $(flavor bar))


EXTRA_CFLAGS =
# 私有变量
prog: private EXTRA_CFLAGS = -L/usr/local/lib
prog: a.o b.o

# ?=
ifeq ($(origin FOO), undefined)
  FOO = bar
endif
```

```makefile
%.out: %.input1 %.input2
    merge $<1 $<2 $@
%.out: %.input1 %.input2
    merge $^ $@

doit: project.out
    # force build
    touch $@
```

### 特殊变量

| var                       | desc          |
| ------------------------- | ------------- |
| MAKEFILE_LIST             |
| .DEFAULT_GOAL             |
| MAKE_RESTARTS             |
| MAKE_TERMOUT,MAKE_TERMERR |
| .RECIPEPREFIX             |
| .VARIABLES                |
| .FEATURES                 |
| .INCLUDE_DIRS             |
| .EXTRA_PREREQS            |
| MAKECMDGOALS              | make 时的目标 |
| MAKE                      | make          |
| MAKEFILES                 |

- CURDIR
  - 尽量用 CURDIR
  - 由 make 维护
  - 支持 `-C` 切换
- PWD
  - 环境变量提供

```makefile
info:
  echo $(info CURDIR is from $(origin CURDIR)) $(info PWD is from $(origin PWD))
```

- https://www.gnu.org/software/make/manual/html_node/Quick-Reference.html

## Targets

[Standard Targets](https://www.gnu.org/software/make/manual/make.html#Standard-Targets)

| target                      | desc                                      |
| --------------------------- | ----------------------------------------- |
| all                         |
| clean                       |
| mostlyclean                 | 保留不想重新编译的文件，例如 libgcc.a     |
| distclean,realclean,clobber | 比 clean 清除更多文件，例如配置文件，link |
| install                     |
| print                       | 显示变化了的源文件                        |
| tar                         | 源文件 tar                                |
| shar                        | 源文件 shar                               |
| dist                        |
| TAGS                        | 更新 tags 文件                            |
| check,test                  | 测试                                      |

### 特殊目标

- [Special-Targets](https://www.gnu.org/software/make/manual/make.html#Special-Targets)

| target                | desc                                         |
| --------------------- | -------------------------------------------- |
| .PHONY                | 总是运行                                     |
| .SUFFIXES             | 后缀模式自动匹配，现在一般使用 `%`           |
| .DEFAULT              | 没找到规则时的默认目标                       |
| .PRECIOUS             | 保留中间文件                                 |
| .INTERMEDIATE         | 表明是中间文件                               |
| .SECONDARY            | 默认依赖为二次展开                           |
| .SECONDEXPANSION      | `$$` 二次展开                                |
| .DELETE_ON_ERROR      | 错误时删除文件                               |
| .IGNORE               | 忽略错误，现在一般使用 `-`                   |
| .LOW_RESOLUTION_TIME  | 处理文件修改时间时用更低精度，现在一般不使用 |
| .SILENT               | 不输出，类似 `-s`                            |
| .EXPORT_ALL_VARIABLES | 导出所有变量                                 |
| .NOTPARALLEL          | 不并行，忽略 `-j`                            |
| .ONESHELL             | 运行在一个 shell 里而不是每行一个 shell      |
| .POSIX                | POSIX 兼容模式                               |

## 函数

- https://www.gnu.org/software/make/manual/html_node/File-Name-Functions.html

## Recipes

- [Recipes](https://www.gnu.org/software/make/manual/make.html#Recipes)

```makefile
subsystem:
  # 透传 make
  cd subdir && $(MAKE) $(MFLAGS)

ifeq (0,${MAKELEVEL})
whoami    := $(shell whoami)
host-type := $(shell arch)
MAKE := ${MAKE} host-type=${host-type} whoami=${whoami}
endif
```

## 带帮助的 Makefile

```makefile
build: ## Build
  echo BUILD
.PHONY: help
help: ## 帮助
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
```

```bash
make help
```
