# download: remote -> local
scp user@remote_host:remote_file local_file 

# local_file 可以为目录

# upload: local -> remote
scp local_file user@remote_host:remote_file

# 以第二列排序, 以数字的方法比较
sort -n -k 2

# 显示内存及cpu使用情况
top -bMmc -d 0.01 |head -20
# M 单位为 m
# m 显示进程使用的 而不是镜像大小 VIRT
# c 显示完整的命令行

# 类似树形的显示
ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'

# 使用 rsync + ssh 同步
rsync -avze ssh /localpath robot@192.168.1.171:/remote/path

# scp to 多台
for dest in $(<destfile.txt); do
  scp ourfile.txt ${dest}:remote/path/
done

# 在不用 scp 的情况下 拷贝到多台
cat file.txt | tee >(ssh user@ip1.com "cat > file.txt") \
                   >(ssh user@ip2.com "cat > file.txt")

tar cz file1 file2 file3 | tee >(ssh user@ip1.com "tar xz") \
                               >( ... )
							   
# 开机启动
chkconfig --level 23 network on

# 设置代理
export https_proxy=http://192.168.1.103:8087/
export http_proxy=$https_proxy
export ftp_proxy=$https_proxy

# 高亮关键字
echo -e "Wener\nis\ngreate" | grep -i -e "wen\|$" -e "greate\|$"

# bash 历史操作 http://superuser.com/questions/7414/
# Ctrl+R 开始搜索 继续 Ctrl+R 遍历搜索结果
# 可以绑定为其它按键
bind '"\C-t": reverse-search-history'
# 绑定上下键为 遍历搜索结果的按键
bind '"\e[A":history-search-backward'
bind '"\e[B":history-search-forward'
# 查看历史记录
history
# 使用某条
!2
# 或者负数的索引也可以
!-2
# 也可以直接使用匹配的命令
!ech
# 或者不一样匹配开始
!?ho
# 或者这样替换参数
^old^new
# 最好设置该选项, 以免运行了错误的命令
shopt -s histverify

# 判断变量状态
                        +-------+-------+-----------+
                VAR is: | unset | empty | non-empty |
+-----------------------+-------+-------+-----------+
| [ -z "${VAR}" ]       | true  | true  | false     |
| [ -z "${VAR+set}" ]   | true  | false | false     |
| [ -z "${VAR-unset}" ] | false | true  | false     |
| [ -n "${VAR}" ]       | false | false | true      |
| [ -n "${VAR+set}" ]   | false | true  | true      |
| [ -n "${VAR-unset}" ] | true  | false | true      |
+-----------------------+-------+-------+-----------+

# 展开变量  如果不存在或者未设置 则会显示消息
${STATE?"Need to set STATE"}
${DEST:?"Need to set DEST non-empty"}


# wget 可用于获取 googlecode 因为我实在是下载不下来~
# 需要开启代理 已经在 .wgetrc 中配置了代理
# http://downloadsvn.codeplex.com/ 也可以用来下载 svn 但是不好用代理
wget ... -e use_proxy=on


wget -m -np http://myproject.googlecode.com/svn/myproject/trunk/
wget --user=yourusername --ask-password -m -np http://myproject.googlecode.com/svn/myproject/trunk/


