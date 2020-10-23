---
id: systemd
---
# Systemd

## Tips

- [systemd.unit](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)
- [systemctl manpage](https://www.freedesktop.org/software/systemd/man/systemctl.html)
- [How To Use Systemctl to Manage Systemd Services and Units](https://www.digitalocean.com/community/tutorials/how-to-use-systemctl-to-manage-systemd-services-and-units)
- 配置目录
  - `/etc/systemd/system/docker.service.d/*.conf`
  - `/etc/systemd/system/`
  - `/lib/systemd/system/`

https://wiki.archlinux.org/index.php/Systemd-networkd

```bash
# 查看配置
systemctl show docker
# 修改 Service 需要重载
systemctl daemon-reload
# 查看定义的配置
systemctl show --property=Environment docker
# 重启服务
systemctl restart docker

systemctl list-units --all
systemctl list-units --type=service
systemctl list-unit-files
# 查看 service 文件
systemctl cat docker.service
# 查看依赖
systemctl list-dependencies sshd.service
# mask 后的服务不能被启动
systemctl mask nginx.service
systemctl unmask nginx.service
# 编辑 service 文件
systemctl edit nginx.service
# 编辑完整的文件,而不是一个片段,会生成部分内容
systemctl edit --full nginx.service

# 服务状态
systemctl status prometheus-node-exporter.service
```

| command                            | mean                            |
| ---------------------------------- | ------------------------------- |
| 查询                               | -                               |
| systemctl list-dependencies        | unit 依赖                       |
| systemctl list-sockets             | sockets 状态                    |
| systemctl list-jobs                | 活跃 jobs                       |
| systemctl list-unit-files          | unit 文件和状态                 |
| systemctl list-units               | units loaded/active             |
| systemctl get-default              | default target (like run level) |
| 服务                               | -                               |
| systemctl stop _service_           | 停止                            |
| systemctl start _service_          | 启动                            |
| systemctl restart _service_        | 重启                            |
| systemctl reload _service_         | 配置重载                        |
| systemctl daemon-reload            | 重载 unit 文件                  |
| systemctl status _service_         | 服务状态                        |
| systemctl --failed                 | 失败的服务                      |
| systemctl reset-failed             | 重置失败的状态                  |
| systemctl enable _service_         | 服务自启动                      |
| systemctl disable _service_        | 关闭自启动                      |
| systemctl show _service_           | 服务信息                        |
| systemctl edit _service_           | 编辑 unit                       |
| systemctl edit --full _service_    | 编辑服务                        |
| systemctl -H _host_ status network | 远程执行                        |
| 系统状态                           | -                               |
| systemctl reboot                   | 重启 / reboot.target            |
| systemctl poweroff                 | 关机 / poweroff.target          |
| systemctl emergency                | emergency.target                |
| systemctl default                  | 恢复到默认 multi-user.target    |
| 日志                               | -                               |
| journalctl                         | 所有日志                        |
| journalctl -u network.service      | 网络服务日志                    |
| journalctl -f                      | 跟随显示                        |
| journalctl -k                      | 内核日志                        |

## Service

## Unit

# Example

- [docker systemd](https://github.com/docker/docker/blob/master/contrib/init/systemd/)

**/etc/systemd/system/prometheus-node-exporter.service**

```ini
[Unit]
Description=Prometheus Node Exporter
After=network-online.target

[Service]
# User=prometheus
Restart=on-failure

ExecStart=/opt/prometheus/bin/node_exporter
```

## help

```
systemctl [OPTIONS...] {COMMAND} ...

Query or send control commands to the systemd manager.

  -h --help           Show this help
     --version        Show package version
     --system         Connect to system manager
     --user           Connect to user service manager
  -H --host=[USER@]HOST
                      Operate on remote host
  -M --machine=CONTAINER
                      Operate on local container
  -t --type=TYPE      List units of a particular type
     --state=STATE    List units with particular LOAD or SUB or ACTIVE state
  -p --property=NAME  Show only properties by this name
  -a --all            Show all properties/all units currently in memory,
                      including dead/empty ones. To list all units installed on
                      the system, use the 'list-unit-files' command instead.
     --failed         Same as --state=failed
  -l --full           Don't ellipsize unit names on output
  -r --recursive      Show unit list of host and local containers
     --reverse        Show reverse dependencies with 'list-dependencies'
     --job-mode=MODE  Specify how to deal with already queued jobs, when
                      queueing a new job
     --show-types     When showing sockets, explicitly show their type
     --value          When showing properties, only print the value
  -i --ignore-inhibitors
                      When shutting down or sleeping, ignore inhibitors
     --kill-who=WHO   Who to send signal to
  -s --signal=SIGNAL  Which signal to send
     --now            Start or stop unit in addition to enabling or disabling it
     --dry-run        Only print what would be done
  -q --quiet          Suppress output
     --wait           For (re)start, wait until service stopped again
     --no-block       Do not wait until operation finished
     --no-wall        Don't send wall message before halt/power-off/reboot
     --no-reload      Don't reload daemon after en-/dis-abling unit files
     --no-legend      Do not print a legend (column headers and hints)
     --no-pager       Do not pipe output into a pager
     --no-ask-password
                      Do not ask for system passwords
     --global         Enable/disable/mask unit files globally
     --runtime        Enable/disable/mask unit files temporarily until next
                      reboot
  -f --force          When enabling unit files, override existing symlinks
                      When shutting down, execute action immediately
     --preset-mode=   Apply only enable, only disable, or all presets
     --root=PATH      Enable/disable/mask unit files in the specified root
                      directory
  -n --lines=INTEGER  Number of journal entries to show
  -o --output=STRING  Change journal output mode (short, short-precise,
                             short-iso, short-iso-precise, short-full,
                             short-monotonic, short-unix,
                             verbose, export, json, json-pretty, json-sse, cat)
     --firmware-setup Tell the firmware to show the setup menu on next boot
     --plain          Print unit dependencies as a list instead of a tree

Unit Commands:
  list-units [PATTERN...]             List units currently in memory
  list-sockets [PATTERN...]           List socket units currently in memory,
                                      ordered by address
  list-timers [PATTERN...]            List timer units currently in memory,
                                      ordered by next elapse
  start UNIT...                       Start (activate) one or more units
  stop UNIT...                        Stop (deactivate) one or more units
  reload UNIT...                      Reload one or more units
  restart UNIT...                     Start or restart one or more units
  try-restart UNIT...                 Restart one or more units if active
  reload-or-restart UNIT...           Reload one or more units if possible,
                                      otherwise start or restart
  try-reload-or-restart UNIT...       If active, reload one or more units,
                                      if supported, otherwise restart
  isolate UNIT                        Start one unit and stop all others
  kill UNIT...                        Send signal to processes of a unit
  is-active PATTERN...                Check whether units are active
  is-failed PATTERN...                Check whether units are failed
  status [PATTERN...|PID...]          Show runtime status of one or more units
  show [PATTERN...|JOB...]            Show properties of one or more
                                      units/jobs or the manager
  cat PATTERN...                      Show files and drop-ins of specified units
  set-property UNIT PROPERTY=VALUE... Sets one or more properties of a unit
  help PATTERN...|PID...              Show manual for one or more units
  reset-failed [PATTERN...]           Reset failed state for all, one, or more
                                      units
  list-dependencies [UNIT]            Recursively show units which are required
                                      or wanted by this unit or by which this
                                      unit is required or wanted

Unit File Commands:
  list-unit-files [PATTERN...]        List installed unit files
  enable [UNIT...|PATH...]            Enable one or more unit files
  disable UNIT...                     Disable one or more unit files
  reenable UNIT...                    Reenable one or more unit files
  preset UNIT...                      Enable/disable one or more unit files
                                      based on preset configuration
  preset-all                          Enable/disable all unit files based on
                                      preset configuration
  is-enabled UNIT...                  Check whether unit files are enabled
  mask UNIT...                        Mask one or more units
  unmask UNIT...                      Unmask one or more units
  link PATH...                        Link one or more units files into
                                      the search path
  revert UNIT...                      Revert one or more unit files to vendor
                                      version
  add-wants TARGET UNIT...            Add 'Wants' dependency for the target
                                      on specified one or more units
  add-requires TARGET UNIT...         Add 'Requires' dependency for the target
                                      on specified one or more units
  edit UNIT...                        Edit one or more unit files
  get-default                         Get the name of the default target
  set-default TARGET                  Set the default target

Machine Commands:
  list-machines [PATTERN...]          List local containers and host

Job Commands:
  list-jobs [PATTERN...]              List jobs
  cancel [JOB...]                     Cancel all, one, or more jobs

Environment Commands:
  show-environment                    Dump environment
  set-environment VARIABLE=VALUE...   Set one or more environment variables
  unset-environment VARIABLE...       Unset one or more environment variables
  import-environment [VARIABLE...]    Import all or some environment variables

Manager Lifecycle Commands:
  daemon-reload                       Reload systemd manager configuration
  daemon-reexec                       Reexecute systemd manager

System Commands:
  is-system-running                   Check whether system is fully running
  default                             Enter system default mode
  rescue                              Enter system rescue mode
  emergency                           Enter system emergency mode
  halt                                Shut down and halt the system
  poweroff                            Shut down and power-off the system
  reboot [ARG]                        Shut down and reboot the system
  kexec                               Shut down and reboot the system with kexec
  exit [EXIT_CODE]                    Request user instance or container exit
  switch-root ROOT [INIT]             Change to a different root file system
  suspend                             Suspend the system
  hibernate                           Hibernate the system
  hybrid-sleep                        Hibernate and suspend the system
```
