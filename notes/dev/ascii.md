---
title: ASCII
---

# ASCII

- ASCII - American Standard Code for Information Interchange - 美国信息交换标准代码
- 7-bit 编码，0-127 共 128 个字符
- 0-31, 127: 控制字符
- 32-126: 可打印字符

## 控制字符 (0-31, 127)

| Dec | Hex  | Oct | 按键  | 缩写 | 名称                    | 说明             |
| --- | ---- | --- | ----- | ---- | ----------------------- | ---------------- |
| 0   | 0x00 | 000 | `C-@` | NUL  | Null                    | 空字符           |
| 1   | 0x01 | 001 | `C-a` | SOH  | Start of Heading        | 标题开始         |
| 2   | 0x02 | 002 | `C-b` | STX  | Start of Text           | 正文开始         |
| 3   | 0x03 | 003 | `C-c` | ETX  | End of Text             | 正文结束 (中断)  |
| 4   | 0x04 | 004 | `C-d` | EOT  | End of Transmission     | 传输结束 (EOF)   |
| 5   | 0x05 | 005 | `C-e` | ENQ  | Enquiry                 | 请求             |
| 6   | 0x06 | 006 | `C-f` | ACK  | Acknowledge             | 确认             |
| 7   | 0x07 | 007 | `C-g` | BEL  | Bell                    | 响铃 \a          |
| 8   | 0x08 | 010 | `C-h` | BS   | Backspace               | 退格 \b          |
| 9   | 0x09 | 011 | `C-i` | HT   | Horizontal Tab          | 水平制表符 \t    |
| 10  | 0x0A | 012 | `C-j` | LF   | Line Feed               | 换行 \n          |
| 11  | 0x0B | 013 | `C-k` | VT   | Vertical Tab            | 垂直制表符 \v    |
| 12  | 0x0C | 014 | `C-l` | FF   | Form Feed               | 换页 \f          |
| 13  | 0x0D | 015 | `C-m` | CR   | Carriage Return         | 回车 \r          |
| 14  | 0x0E | 016 | `C-n` | SO   | Shift Out               | 移出             |
| 15  | 0x0F | 017 | `C-o` | SI   | Shift In                | 移入             |
| 16  | 0x10 | 020 | `C-p` | DLE  | Data Link Escape        | 数据链路转义     |
| 17  | 0x11 | 021 | `C-q` | DC1  | Device Control 1        | 设备控制1 (XON)  |
| 18  | 0x12 | 022 | `C-r` | DC2  | Device Control 2        | 设备控制2        |
| 19  | 0x13 | 023 | `C-s` | DC3  | Device Control 3        | 设备控制3 (XOFF) |
| 20  | 0x14 | 024 | `C-t` | DC4  | Device Control 4        | 设备控制4        |
| 21  | 0x15 | 025 | `C-u` | NAK  | Negative Acknowledge    | 否定确认         |
| 22  | 0x16 | 026 | `C-v` | SYN  | Synchronous Idle        | 同步空闲         |
| 23  | 0x17 | 027 | `C-w` | ETB  | End of Transmission Blk | 传输块结束       |
| 24  | 0x18 | 030 | `C-x` | CAN  | Cancel                  | 取消             |
| 25  | 0x19 | 031 | `C-y` | EM   | End of Medium           | 介质结束         |
| 26  | 0x1A | 032 | `C-z` | SUB  | Substitute              | 替换 (SIGTSTP)   |
| 27  | 0x1B | 033 | `C-[` | ESC  | Escape                  | 转义             |
| 28  | 0x1C | 034 | `C-\` | FS   | File Separator          | 文件分隔符       |
| 29  | 0x1D | 035 | `C-]` | GS   | Group Separator         | 组分隔符         |
| 30  | 0x1E | 036 | `C-^` | RS   | Record Separator        | 记录分隔符       |
| 31  | 0x1F | 037 | `C-_` | US   | Unit Separator          | 单元分隔符       |
| 127 | 0x7F | 177 | `C-?` | DEL  | Delete                  | 删除             |

## 可打印字符 (32-126)

| Dec | Hex  | Char | Dec | Hex  | Char | Dec | Hex  | Char |
| --- | ---- | ---- | --- | ---- | ---- | --- | ---- | ---- |
| 32  | 0x20 | SP   | 64  | 0x40 | @    | 96  | 0x60 | \`   |
| 33  | 0x21 | !    | 65  | 0x41 | A    | 97  | 0x61 | a    |
| 34  | 0x22 | "    | 66  | 0x42 | B    | 98  | 0x62 | b    |
| 35  | 0x23 | #    | 67  | 0x43 | C    | 99  | 0x63 | c    |
| 36  | 0x24 | $    | 68  | 0x44 | D    | 100 | 0x64 | d    |
| 37  | 0x25 | %    | 69  | 0x45 | E    | 101 | 0x65 | e    |
| 38  | 0x26 | &    | 70  | 0x46 | F    | 102 | 0x66 | f    |
| 39  | 0x27 | '    | 71  | 0x47 | G    | 103 | 0x67 | g    |
| 40  | 0x28 | (    | 72  | 0x48 | H    | 104 | 0x68 | h    |
| 41  | 0x29 | )    | 73  | 0x49 | I    | 105 | 0x69 | i    |
| 42  | 0x2A | \*   | 74  | 0x4A | J    | 106 | 0x6A | j    |
| 43  | 0x2B | +    | 75  | 0x4B | K    | 107 | 0x6B | k    |
| 44  | 0x2C | ,    | 76  | 0x4C | L    | 108 | 0x6C | l    |
| 45  | 0x2D | -    | 77  | 0x4D | M    | 109 | 0x6D | m    |
| 46  | 0x2E | .    | 78  | 0x4E | N    | 110 | 0x6E | n    |
| 47  | 0x2F | /    | 79  | 0x4F | O    | 111 | 0x6F | o    |
| 48  | 0x30 | 0    | 80  | 0x50 | P    | 112 | 0x70 | p    |
| 49  | 0x31 | 1    | 81  | 0x51 | Q    | 113 | 0x71 | q    |
| 50  | 0x32 | 2    | 82  | 0x52 | R    | 114 | 0x72 | r    |
| 51  | 0x33 | 3    | 83  | 0x53 | S    | 115 | 0x73 | s    |
| 52  | 0x34 | 4    | 84  | 0x54 | T    | 116 | 0x74 | t    |
| 53  | 0x35 | 5    | 85  | 0x55 | U    | 117 | 0x75 | u    |
| 54  | 0x36 | 6    | 86  | 0x56 | V    | 118 | 0x76 | v    |
| 55  | 0x37 | 7    | 87  | 0x57 | W    | 119 | 0x77 | w    |
| 56  | 0x38 | 8    | 88  | 0x58 | X    | 120 | 0x78 | x    |
| 57  | 0x39 | 9    | 89  | 0x59 | Y    | 121 | 0x79 | y    |
| 58  | 0x3A | :    | 90  | 0x5A | Z    | 122 | 0x7A | z    |
| 59  | 0x3B | ;    | 91  | 0x5B | [    | 123 | 0x7B | {    |
| 60  | 0x3C | <    | 92  | 0x5C | \    | 124 | 0x7C | \|   |
| 61  | 0x3D | =    | 93  | 0x5D | ]    | 125 | 0x7D | }    |
| 62  | 0x3E | >    | 94  | 0x5E | ^    | 126 | 0x7E | ~    |
| 63  | 0x3F | ?    | 95  | 0x5F | \_   |     |      |      |

## 常用转义序列

| 转义 | ASCII | 说明     |
| ---- | ----- | -------- |
| `\0` | 0     | 空字符   |
| `\a` | 7     | 响铃     |
| `\b` | 8     | 退格     |
| `\t` | 9     | 水平制表 |
| `\n` | 10    | 换行     |
| `\v` | 11    | 垂直制表 |
| `\f` | 12    | 换页     |
| `\r` | 13    | 回车     |
| `\\` | 92    | 反斜杠   |
| `\'` | 39    | 单引号   |
| `\"` | 34    | 双引号   |

## 字符分类

| 范围    | 类型     | 说明                           |
| ------- | -------- | ------------------------------ |
| 0-31    | 控制字符 | 不可打印                       |
| 32      | 空格     | SP (Space)                     |
| 33-47   | 标点符号 | ! " # $ % & ' ( ) \* + , - . / |
| 48-57   | 数字     | 0-9                            |
| 58-64   | 标点符号 | : ; < = > ? @                  |
| 65-90   | 大写字母 | A-Z                            |
| 91-96   | 标点符号 | [ \ ] ^ \_ \`                  |
| 97-122  | 小写字母 | a-z                            |
| 123-126 | 标点符号 | { \| } ~                       |
| 127     | 控制字符 | DEL                            |

## 计算规则

```bash
# 大小写转换 (差值 32)
'A' (65) + 32 = 'a' (97)
'a' (97) - 32 = 'A' (65)

# 数字字符转数值
'5' (53) - '0' (48) = 5

# Ctrl 组合键 (减去 64 或 0x40)
'C' (67) - 64 = 3 (C-c = ETX)
'M' (77) - 64 = 13 (C-m = CR)
```

# FAQ

## LF vs CR

不同操作系统使用不同的换行符：

| 系统           | 换行符 | ASCII     | 转义   | 说明                 |
| -------------- | ------ | --------- | ------ | -------------------- |
| Unix/Linux/Mac | LF     | 10 (0x0A) | `\n`   | Line Feed            |
| Windows        | CRLF   | 13+10     | `\r\n` | Carriage Return + LF |
| 旧版 Mac (≤9)  | CR     | 13 (0x0D) | `\r`   | Carriage Return      |

**历史来源 (打字机)**:

- **CR (Carriage Return)**: 打印头回到行首
- **LF (Line Feed)**: 纸张向上移动一行

**常见问题**:

```bash
# 查看文件换行符
file myfile.txt   # 显示 "with CRLF line terminators"
cat -A myfile.txt # ^M 表示 CR

# 转换换行符
dos2unix myfile.txt         # CRLF → LF
unix2dos myfile.txt         # LF → CRLF
sed -i 's/\r$//' myfile.txt # 删除 CR

# Git 配置
git config --global core.autocrlf input # Linux/Mac
git config --global core.autocrlf true  # Windows
```

**.gitattributes 配置**:

```
* text=auto eol=lf
*.bat text eol=crlf
*.sh text eol=lf
```
