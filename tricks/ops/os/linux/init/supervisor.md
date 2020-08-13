# Supervisor

* supervisor
  * size: 4161536
  * Python
  * https://pkgs.alpinelinux.org/package/edge/main/x86_64/supervisor
* [runit](http://smarden.org/runit/)
  * https://pkgs.alpinelinux.org/package/edge/community/x86_64/runit
  * size: 258048
* systemd
  * Pythonee
* initd
* upstart
* tini
  * https://github.com/krallin/tini
  * size: 40960
  * docker 1.13 后内建
  * 主要用于处理僵尸集成和信号量处理
* dump-init
  * https://pkgs.alpinelinux.org/package/edge/community/x86_64/dumb-init
* openrc
* Gentoo [Comparison of init systems](https://wiki.gentoo.org/wiki/Comparison_of_init_systems)
* [OpenRC to systemd Cheatsheet](https://wiki.gentoo.org/wiki/OpenRC_to_systemd_Cheatsheet)

## docker
* tinit - 如果使用单个进程
* 如果要允许多个服务，选择 s6 或 runit
