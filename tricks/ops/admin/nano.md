# nano

## Tips
* [nano.1](https://www.nano-editor.org/dist/latest/nano.1.html)
* [nanorc.5](https://www.nano-editor.org/dist/latest/nanorc.5.html)

## nanorc
```
# 默认为 8
set tabsize 4
```

## 快捷键

* <C-k><C-u><C-u> 复制当前行

按键|操作
----|----
<C-g> / <F1>| 帮助
<C-x> / <F2>| 退出
<C-o> / <F3>| 保存
<C-j> / <F4>| 格式调整
<C-r> / <F5>| 读文件
<C-w> / <F6>| 搜索
<C-y> / <F7>| 上一页
<C-v> / <F8>| 下一页
<C-k> / <F9>| 剪切
<C-u> / <F10>| 粘贴
<C-c> / <F11>| 当前位置
<C-t> / <F12>| 拼写检查
<M-\\> / <M-\|> | 第一行
<M-/> / <M-?|> | 最后一行
<C-\_> / <F13> / <M-g> | 跳转到指定行


^G      (F1)            Display this help text
^X      (F2)            Close the current file buffer / Exit from nano
^O      (F3)            Write the current file to disk
^J      (F4)            Justify the current paragraph

^R      (F5)            Insert another file into the current one
^W      (F6)            Search for a string or a regular expression
^Y      (F7)            Go to previous screen
^V      (F8)            Go to next screen

^K      (F9)            Cut the current line and store it in the cutbuffer
^U      (F10)           Uncut from the cutbuffer into the current line
^C      (F11)           Display the position of the cursor
^T      (F12)           Invoke the spell checker, if available

M-\     (M-|)           Go to the first line of the file
M-/     (M-?)           Go to the last line of the file

^_      (F13)   (M-G)   Go to line and column number
^\      (F14)   (M-R)   Replace a string or a regular expression
^^      (F15)   (M-A)   Mark text at the cursor position
M-W     (F16)           Repeat last search

M-^     (M-6)           Copy the current line and store it in the cutbuffer
M-}                     Indent the current line
M-{                     Unindent the current line
^F                      Go forward one character
^B                      Go back one character
^Space                  Go forward one word
M-Space                 Go back one word
^P                      Go to previous line
^N                      Go to next line

^A                      Go to beginning of current line
^E                      Go to end of current line
M-(     (M-9)           Go to beginning of paragraph; then of previous paragraph
M-)     (M-0)           Go just beyond end of paragraph; then of next paragraph
M-]                     Go to the matching bracket
M--     (M-\_)           Scroll up one line without scrolling the cursor
M-+     (M-=)           Scroll down one line without scrolling the cursor
M-<     (M-,)           Switch to the previous file buffer
M->     (M-.)           Switch to the next file buffer

M-V                     Insert the next keystroke verbatim
^I                      Insert a tab at the cursor position
^M                      Insert a newline at the cursor position
^D                      Delete the character under the cursor
^H                      Delete the character to the left of the cursor
M-T                     Cut from the cursor position to the end of the file

M-J                     Justify the entire file
M-D                     Count the number of words, lines, and characters
^L                      Refresh (redraw) the current screen
^Z                      Suspend the editor (if suspend is enabled)

(M-X)                   Help mode enable/disable
(M-C)                   Constant cursor position display enable/disable
(M-O)                   Use of one more line for editing enable/disable
(M-S)                   Smooth scrolling enable/disable
(M-P)                   Whitespace display enable/disable
(M-Y)                   Color syntax highlighting enable/disable
(M-H)                   Smart home key enable/disable
(M-I)                   Auto indent enable/disable
(M-K)                   Cut to end enable/disable
(M-L)                   Long line wrapping enable/disable
(M-Q)                   Conversion of typed tabs to spaces enable/disable
(M-B)                   Backup files enable/disable
(M-F)                   Multiple file buffers enable/disable
(M-M)                   Mouse support enable/disable
(M-N)                   No conversion from DOS/Mac format enable/disable
(M-Z)                   Suspension enable/disable
(M-$)                   Soft line wrapping enable/disable
