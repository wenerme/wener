---
tags:
  - Shell
  - Command
---

# rg

- `rg` - ripgrep
- Rust 实现的递归文本搜索工具，默认尊重 `.gitignore`，常用于替代 `grep -R`
- 支持正则、文件类型过滤、上下文行、JSON 输出、隐藏文件/忽略规则控制
- https://github.com/BurntSushi/ripgrep

```bash
# 安装
brew install ripgrep
apk add ripgrep
apt install ripgrep

# 基础搜索
rg 'pattern'
rg 'pattern' path/to/dir

# 搜索文件名
rg --files
rg --files -g '*.md'

# 忽略大小写 / 智能大小写
rg -i 'pattern'
rg -S 'Pattern'

# 显示上下文
rg -n 'pattern'
rg -C 2 'pattern'
rg -A 3 -B 1 'pattern'

# 文件过滤
rg -t js 'function name'
rg -t md 'TODO'
rg -g '*.ts' 'interface Foo'
rg -g '!dist' 'pattern'

# 搜索隐藏文件、忽略 ignore 规则
rg --hidden 'pattern'
rg --no-ignore 'pattern'
rg -uuu 'pattern'

# 只列出匹配文件 / 不匹配文件
rg -l 'pattern'
rg -L 'pattern'

# 替换预览
rg 'old' -r 'new'

# JSON 输出，适合脚本处理
rg --json 'pattern'
```

| 参数 | 说明 |
| --- | --- |
| `-i` | 忽略大小写 |
| `-S` | smart case，有大写时区分大小写，否则忽略大小写 |
| `-n` | 显示行号 |
| `-C N` | 显示前后 `N` 行上下文 |
| `-A N` | 显示匹配后 `N` 行 |
| `-B N` | 显示匹配前 `N` 行 |
| `-l` | 只显示包含匹配的文件名 |
| `-L` | 只显示不包含匹配的文件名 |
| `-g GLOB` | 按 glob 包含或排除文件 |
| `-t TYPE` | 按内置文件类型过滤 |
| `--files` | 只列出会被搜索的文件 |
| `--hidden` | 搜索隐藏文件 |
| `--no-ignore` | 不读取 `.gitignore`、`.ignore` 等忽略规则 |
| `-u` / `-uu` / `-uuu` | 逐级放宽 ignore、hidden、binary 限制 |
| `--json` | 输出 JSON 事件流 |

## FAQ

### rg vs grep

- `rg` 默认递归搜索当前目录，`grep` 通常需要 `grep -R`
- `rg` 默认跳过 `.gitignore` 忽略的文件和二进制文件
- `rg` 默认输出文件名、行号、匹配高亮，更适合代码库搜索

### 搜索所有内容

```bash
rg -uuu 'pattern'
```

- `-u`：不过滤 ignore
- `-uu`：包含 hidden
- `-uuu`：包含 binary
