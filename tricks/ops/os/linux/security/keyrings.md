# keyrings

## Tips

- [keyrings.7](https://www.man7.org/linux/man-pages/man7/keyrings.7.html)

| keyring id | desc                                  |
| ---------- | ------------------------------------- |
| `<nnn>`    | numeric keyring ID                    |
| @t         | thread keyring                        |
| @p         | process keyring                       |
| @s         | session keyring                       |
| @u         | user keyring                          |
| @us        | user default session keyring          |
| @g         | group keyring                         |
| @a         | assumed request_key authorisation key |

```bash
# https://pkgs.alpinelinux.org/contents?branch=v3.12&name=keyutils&arch=x86_64&repo=main
apk add keyutils
# 支持情况
keyctl supports

# 添加
echo -n <passphrase> | keyctl padd user my_pass @u
# 删除 - 908362744 为上一个命令返回的 ID
keyctl unlink 908362744 @u

keyctl list @u
keyctl show @u
```
