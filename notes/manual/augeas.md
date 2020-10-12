# augeas

## Tips
* [Augeas](http://augeas.net/) - a configuration API
* 结构化的编辑各种配置文件
  * 可以用于非交互式的编辑结构化配置文件
  * 操作起来比 set/grep 之类的更加简单
* augparse - Evaluate MODULE
* augtool - Load the Augeas tree and modify it. If no COMMAND is given, run interactively
* fadot - Compile REGEXP and apply operation to them. By default, just print the minimized regexp.
* augmatch
* 概念
  * Lens - 处理文件的方式
    * [当前的 Lens 列表](http://augeas.net/stock_lenses.html)
  * [Tree](http://augeas.net/docs/tree.html) - 内部树结构
    * `/augeas` - 运行的内部状态
      * `/root` - 原始文件
      * `/save` - 保存模式
    * `/files` - 本地文件

```bash
brew install augeas

# 输出 augeas 内部结构
augmatch /etc/hosts
# 输出处理文件的 Lens
augmatch /etc/hosts -L

# 只输出匹配内容
augmatch /etc/hosts -m '*/ipaddr'

# 输出内部的语法树
augtool 'dump-xml /files/etc/hosts'
```
