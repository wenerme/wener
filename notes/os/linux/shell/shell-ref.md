---
tags:
  - Reference
---

# Shell Reference

:::tip

- SSH 登录的 shell 为非 login shell
  - `$-` = himBHs

:::

| var         | for                                             |
| ----------- | ----------------------------------------------- |
| `$0`        | 当前脚本名                                      |
| `@#`        | 参数数量                                        |
| `$1` - `$9` | 第N个参数                                       |
| `$*`        | 所有参数, 单个字符串                            |
| `$@`        | 所有参数, 数组                                  |
| `$?`        | 上一个命令的退出状态                            |
| `$$`        | 当前进程的 PID                                  |
| `$!`        | 后台运行的最后一个进程的 PID                    |
| `$-`        | set options                                     |
| `$_`        | 上一个命令的最后一个参数, `mkdir -p ~ && cd $_` |

| var   | for             |
| ----- | --------------- |
| SHELL | 当前 shell PATH |
| SHLVL | shell 嵌套深度  |

```bash
# 当前 SHELL - $0 最稳定
echo $SHELL                       # /bin/bash - ash 不支持
ps -p $$                          # busybox ps 没有 -p
echo $0                           # /bin/zsh, -bash, ash
getent passwd $USER | cut -d: -f7 # 为用户配置的 shell
chsh -l                           # 列出可用 shell - 一般 chsh 不支持

# check Login
shopt -q login_shell && echo Login shell # for Bash
[[ -o login ]] && echo Login shell       # for ZSH
[[ "$0" == -* ]] && echo Login shell     # for Posix

[[ "$-" == *i* ]] && echo Interactive shell
```

## Options

| opt         | `$-` | desc                           |
| ----------- | ---- | ------------------------------ |
| allexport   | a    | export 所有变量                |
| braceexpand | B    | {a,b} -> a b                   |
| emacs       |      | emacs 模式                     |
| errexit     | e    | 命令失败则退出                 |
| errtrace    | E    | 继承 ERR trap                  |
| functrace   | T    | 继承 DEBUG, RETURN trap        |
| hashall     | h    | 跟踪 PATH 发现的命令           |
| histexpand  | H    | history expansion, `!number`   |
| history     |      |
| ignoreeof   |      | 交互式 shell, `Ctrl-D` 退出    |
| interactive | i    | 交互                           |
| keyword     | k    |
| monitor     | m    | job 管理                       |
| noclobber   | C    | 避免 `>`, `>&`, `<>` 覆盖文件  |
| noexec      | n    |
| noglob      | f    |
| nolog       |
| notify      | b    |
| nounset     | u    |
| onecmd      | t    |
| physical    | P    | 不 resolve symlink             |
| pipefail    |
| posix       |
| privileged  | P    | 特权 模式                      |
| stdin       | s    | 从 stdin 读取                  |
| verbose     | v    |
| vi          |      | vi 模式                        |
| xtrace      | x    | 回显执行的内容, 输出前缀为 PS4 |
|             | r    | restricted 模式                |

- privileged
  - 不处理 $BASH_ENV, $ENV
  - 不继承 shell 函数
  - 不继承 HELLOPTS, BASHOPTS, CDPATH, GLOBIGNORE
- Bash
  - https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html
  - https://www.gnu.org/software/bash/manual/html_node/The-Set-Builtin.html

## Compact

- `[`
  - 不支持 glob match - 可以使用 case 写法
- `[[`
  - ksh, bash, zsh
  - dash 现在也支持
- test

```bash
case "abc" in; *b*) echo 1 ;; esac # 这样兼容性最好
[[ "abc" == '*b*' ]] && echo 1
test "abc" == *b* && echo 1 # 如果会匹配文件有问题

# Glob match 文件
# for Bash
if compgen -G "/tmp/someFiles*" > /dev/null; then
  echo "Some files exist."
fi

if test -n "$(
  shopt -s nullglob
  echo glob*
)"; then
  echo found
fi

if test -n "$(find . -maxdepth 1 -name 'glob*' -print -quit)"; then
  echo found
fi

stat -t glob* > /dev/null 2>&1

(
  shopt -s failglob
  : *
) 2> /dev/null && echo exists
```

## Configuration

- profile - for **login** shell
  - 只在 login 时加载一次，之后会继承
  - setup PATH
- rc - for **interactive** shell
  - 每次启动 shell 时加载
  - setup Terminal, autocomplete, prompt

| item    | sh       | BASH          | ZSH       |
| ------- | -------- | ------------- | --------- |
| profile | .profile | .bash_profile | .zprofile |
| rc      |          | .bashrc       | .zshrc    |
| login   |          | .bash_login   | .zlogin   |
| logout  |          | .bash_logout  | .zlogout  |

- PATH
  - $HOME/.local/bin - by XDG 3.0
  - $HOME/bin - persinal bin
- bash
  - `--login`, `-l` - Login
  - `-i` - Interactive
  - `-r` - Restricted
  - `--noprofile`
    - /etc/profile, ~/.bash_profile, ~/.bash_login, ~/.profile
  - `--norc`
    - ~/.bashrc
  - `--rcfile ~/.bashrc`
  - `--init-file FILE`
  - non-interactively
    - load `$BASH_ENV`
      - e.g. `if [ -n "$BASH_ENV" ]; then . "$BASH_ENV"; fi`
  - symlink to sh
    - minimic sh
    - `.profile`
  - SHELLOPTS, BASHOPTS, CDPATH, GLOBIGNORE
- zsh
  - ZDOTDIR=$HOME
  - TMPPREFIX=/tmp/zsh

---

- TCSH
  - .login, tcshrc, .logout
- PDKSH
  - .profile, .kshrc
- [bash.1](https://www.man7.org/linux/man-pages/man1/bash.1.html)
- [Bash Startup Files](https://www.gnu.org/software/bash/manual/html_node/Bash-Startup-Files.html)

## ZSH

| opt               | flag   | for                                                        |
| ----------------- | ------ | ---------------------------------------------------------- |
| >                 | >      | **目录修改**                                               |
| AUTO_CD           | -J     | 输入目录名后自动执行 `cd` 命令，适用于交互模式             |
| AUTO_PUSHD        | -N     | `cd` 命令会将旧目录推入目录栈                              |
| CDABLE_VARS       | -T     | `cd` 参数不是目录时，尝试将其扩展为变量                    |
| CD_SILENT         |        | `cd` 后不打印当前目录                                      |
| CHASE_DOTS        |        | 处理 `..` 时解析为物理目录路径，而不是取消上一个路径段     |
| CHASE_LINKS       | -w     | 切换目录时解析符号链接为真实路径，包含 `CHASE_DOTS` 的效果 |
| POSIX_CD          | <K><S> | 使 `cd` 和 `pushd` 更符合 POSIX 标准                       |
| PUSHD_IGNORE_DUPS |        | 不将相同目录多次推入目录栈                                 |
| PUSHD_MINUS       |        | 交换 `+` 和 `-` 在目录栈中的含义                           |
| PUSHD_SILENT      | -E     | `pushd` 和 `popd` 后不打印目录栈                           |
| PUSHD_TO_HOME     | -D     | `pushd` 无参数时切换到 `$HOME`                             |
| >                 | >      | **补全**                                                   |
| >                 | >      | **Expansion and Globbing**                                 |
| >                 | >      | **History**                                                |
| >                 | >      | **初始化**                                                 |
| >                 | >      | **输入/输出**                                              |
| >                 | >      | **Job Control**                                            |
| >                 | >      | **Prompting**                                              |
| >                 | >      | **脚本和函数**                                             |
| >                 | >      | **Shell Emulation**                                        |
| >                 | >      | **Shell State**                                            |
| INTERACTIVE       | -i     | 交互式 shell，启用后从标准输入读取命令。                   |
| LOGIN             | -l     | 登录 shell，启用时标识为登录会话。                         |
| PRIVILEGED        | -p     | 特权模式，启用后用于提升权限运行脚本。                     |
| RESTRICTED        | -r     | 限制模式，启用后限制对系统资源的访问。                     |
| SHIN_STDIN        | -s     | 从标准输入读取命令，如果未指定命令文件则启用。             |
| SINGLE_COMMAND    | -t     | 从标准输入读取并执行单个命令后退出。                       |
| >                 | >      | **Zle**                                                    |

- ZSH
  - https://zsh.sourceforge.io/Doc/Release/Shell-Builtin-Commands.html
  - https://zsh.sourceforge.io/Doc/Release/Options.html

## Posix

- 函数名字 - `[a-zA-Z_][a-zA-Z0-9_]*`
- https://pubs.opengroup.org/onlinepubs/9699919799/utilities/V3_chap02.html
