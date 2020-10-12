# Linux

## Tips

* [Linux insides](https://github.com/0xAX/linux-insides)
* [How to Make a Computer Operating System](https://github.com/SamyPesse/How-to-Make-a-Computer-Operating-System)

Linux as Firmware
https://www.linuxboot.org/

The Yocto Project (YP) is an open source collaboration project that helps developers create custom Linux-based systems for embedded products, regardless of the hardware architecture. 
https://www.yoctoproject.org/

The Zephyr™ Project is a scalable real-time operating system (RTOS) supporting multiple hardware architectures, optimized for resource constrained devices, and built with security in mind.
https://www.zephyrproject.org/

## Facts

Linux is a Unix-like operating system, which runs on PC-386 computers. It was implemented first as extension to the Minix operating system [Tanenbaum 1987] and its first versions included support for the Minix filesystem only. The Minix filesystem contains two serious limitations: block addresses are stored in 16 bit integers, thus the maximal filesystem size is restricted to 64 mega bytes, and directories contain fixed-size entries and the maximal file name is 14 characters.

## CentOS change hostname
https://www.vultr.com/docs/how-to-change-your-hostname-on-centos

```bash
hostname server01
nano /etc/hosts
nano /etc/sysconfig/network # HOSTNAME=server01
hostname # check is ok
```

