
## Prefix/Suffix
```bash
$ x="/foo/fizzbuzz.bar"
$ y=${x%.bar}
$ echo ${y##*/}
fizzbuzz

$ x="/foo/fizzbuzz.bar.quux"
$ y=${x%.*}
$ echo $y
/foo/fizzbuzz.bar
$ y=${x%%.*}
$ echo $y
/foo/fizzbuzz

$ x=/foo/bar/bim/baz/file.gif
$ y=${path##*/}
$ echo $y
file.gif
```

## Base N
```
# Encode base62
BASE62=($(echo {0..9} {a..z} {A..Z}))
for i in $(bc <<< "obase=62; 9207903953"); do
    echo -n ${BASE62[$(( 10#$i ))]}
done && echo
# Decode base62
base62_decode() { echo $((62#$1)) }
```


## SSH
```bash
# download: remote -> local
# local_file 可以为目录用 -r 递归
scp user@remote_host:remote_file local_file
# upload: local -> remote
scp local_file user@remote_host:remote_file

# To Forward sshtalk.in:8080 -> Cort.local:4567, you can do
local="Cort.local:4567" # or "localhost:4567"
remot="*:8080" # "*" for all interfaces (default is loopback)

ssh -R ${remote}:${local} sshtalk.in

# To forward localhost:1234 -> private-host:443, through public-host you can do
local="localhost:1234" # or just "1234" default is localhost
remot="private-host:443" # "*" for all interfaces (default is loopback)

ssh -L ${local}:${remote} public-host

# 须在在Server端允许转发
# 在 /etc/ssh/sshd_config 中添加
GatewayPorts yes
# 然后重启
sudo service sshd restart
```

```bash
# scp to 多台
for dest in $(<destfile.txt); do
  scp ourfile.txt ${dest}:remote/path/
done

# 在不用 scp 的情况下 拷贝到多台
cat file.txt | tee >(ssh user@ip1.com "cat > file.txt") \
                   >(ssh user@ip2.com "cat > file.txt")

tar cz file1 file2 file3 | tee >(ssh user@ip1.com "tar xz") \
                               >( ... )
```


## xargs

* [xargs example](http://www.thegeekstuff.com/2013/12/xargs-examples/)
