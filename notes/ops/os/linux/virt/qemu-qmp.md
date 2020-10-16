---
slug: qemu-qmp
title: QEMU QMP
---

# QEMU QEMU Machine Protocol

## Tips

- [QEMU QMP reference](https://www.qemu.org/docs/master/interop/qemu-qmp-ref.html)
- [qmp-shell](https://github.com/qemu/qemu/blob/master/scripts/qmp/qmp-shell)
  - Low-level QEMU shell on top of QMP
- https://www.nico.schottelius.org/blog/control-and-shutdown-qemu-kvm-vm-via-unix-socket/
- https://wiki.qemu.org/Documentation/QMP
- `-qmp unix:./qmp-sock,server`
- 常用命令
  - system_powerdown
  - system_reset
  - system_wakeup
  - query-status

```json
// 服务端响应
{"QMP": {"version": {"qemu": {"micro": 0, "minor": 1, "major": 5}, "package": ""}, "capabilities": ["oob"]}}

// 协商能力
{ "execute": "qmp_capabilities" }
//
{ "return": {}}

// 查询状态
{ "execute": "query-status" }
//
{"return": {"status": "running", "singlestep": false, "running": true}}

// 查询所有命令
{ "execute": "query-commands" }

// 内存
{ "execute": "query-memdev" }
//
{"return": [{"prealloc": false, "host-nodes": [], "size": 134217728, "merge": true, "dump": true, "policy": "default", "id": "pc.ram"}]}
```

## QMP 命令

| command                                | desc |
| -------------------------------------- | ---- |
| add-fd                                 |
| add_client                             |
| announce-self                          |
| balloon                                |
| block-commit                           |
| block-dirty-bitmap-add                 |
| block-dirty-bitmap-clear               |
| block-dirty-bitmap-disable             |
| block-dirty-bitmap-enable              |
| block-dirty-bitmap-merge               |
| block-dirty-bitmap-remove              |
| block-job-cancel                       |
| block-job-complete                     |
| block-job-dismiss                      |
| block-job-finalize                     |
| block-job-pause                        |
| block-job-resume                       |
| block-job-set-speed                    |
| block-latency-histogram-set            |
| block-set-write-threshold              |
| block-stream                           |
| block_passwd                           |
| block_resize                           |
| block_set_io_throttle                  |
| blockdev-add                           |
| blockdev-backup                        |
| blockdev-change-medium                 |
| blockdev-close-tray                    |
| blockdev-create                        |
| blockdev-del                           |
| blockdev-insert-medium                 |
| blockdev-mirror                        |
| blockdev-open-tray                     |
| blockdev-remove-medium                 |
| blockdev-snapshot                      |
| blockdev-snapshot-delete-internal-sync |
| blockdev-snapshot-internal-sync        |
| blockdev-snapshot-sync                 |
| change                                 |
| change-backing-file                    |
| change-vnc-password                    |
| chardev-add                            |
| chardev-change                         |
| chardev-remove                         |
| chardev-send-break                     |
| client_migrate_info                    |
| closefd                                |
| cont                                   |
| cpu-add                                |
| device-list-properties                 |
| device_add                             |
| device_del                             |
| drive-backup                           |
| drive-mirror                           |
| dump-guest-memory                      |
| eject                                  |
| expire_password                        |
| getfd                                  |
| human-monitor-command                  |
| inject-nmi                             |
| input-send-event                       |
| job-cancel                             |
| job-complete                           |
| job-dismiss                            |
| job-finalize                           |
| job-pause                              |
| job-resume                             |
| memsave                                |
| migrate                                |
| migrate-continue                       |
| migrate-incoming                       |
| migrate-pause                          |
| migrate-recover                        |
| migrate-set-cache-size                 |
| migrate-set-capabilities               |
| migrate-set-parameters                 |
| migrate-start-postcopy                 |
| migrate_cancel                         |
| migrate_set_downtime                   |
| migrate_set_speed                      |
| nbd-server-add                         |
| nbd-server-remove                      |
| nbd-server-start                       |
| nbd-server-stop                        |
| netdev_add                             |
| netdev_del                             |
| object-add                             |
| object-del                             |
| pmemsave                               |
| qmp_capabilities                       |
| qom-get                                |
| qom-list                               |
| qom-list-properties                    |
| qom-list-types                         |
| qom-set                                |
| query-acpi-ospm-status                 |
| query-balloon                          |
| query-block                            |
| query-block-jobs                       |
| query-blockstats                       |
| query-chardev                          |
| query-chardev-backends                 |
| query-colo-status                      |
| query-command-line-options             |
| query-commands                         |
| query-cpu-definitions                  |
| query-cpu-model-expansion              |
| query-cpus                             |
| query-cpus-fast                        |
| query-current-machine                  |
| query-display-options                  |
| query-dump                             |
| query-dump-guest-memory-capability     |
| query-events                           |
| query-fdsets                           |
| query-hotpluggable-cpus                |
| query-iothreads                        |
| query-jobs                             |
| query-kvm                              |
| query-machines                         |
| query-memdev                           |
| query-memory-devices                   |
| query-memory-size-summary              |
| query-mice                             |
| query-migrate                          |
| query-migrate-cache-size               |
| query-migrate-capabilities             |
| query-migrate-parameters               |
| query-name                             |
| query-named-block-nodes                |
| query-pci                              |
| query-pr-managers                      |
| query-qmp-schema                       |
| query-rocker                           |
| query-rocker-of-dpa-flows              |
| query-rocker-of-dpa-groups             |
| query-rocker-ports                     |
| query-rx-filter                        |
| query-sev                              |
| query-sev-capabilities                 |
| query-sev-launch-measure               |
| query-status                           |
| query-target                           |
| query-tpm                              |
| query-tpm-models                       |
| query-tpm-types                        |
| query-uuid                             |
| query-version                          |
| query-vm-generation-id                 |
| query-vnc                              |
| query-vnc-servers                      |
| query-xen-replication-status           |
| quit                                   |
| remove-fd                              |
| ringbuf-read                           |
| ringbuf-write                          |
| rtc-reset-reinjection                  |
| screendump                             |
| send-key                               |
| set-numa-node                          |
| set_link                               |
| set_password                           |
| stop                                   |
| system_powerdown                       |
| system_reset                           |
| system_wakeup                          |
| trace-event-get-state                  |
| trace-event-set-state                  |
| transaction                            |
| watchdog-set-action                    |
| x-blockdev-amend                       |
| x-blockdev-change                      |
| x-blockdev-reopen                      |
| x-blockdev-set-iothread                |
| x-colo-lost-heartbeat                  |
| x-debug-block-dirty-bitmap-sha256      |
| x-debug-query-block-graph              |
| x-exit-preconfig                       |
| xen-colo-do-checkpoint                 |
| xen-load-devices-state                 |
| xen-save-devices-state                 |
| xen-set-global-dirty-log               |
| xen-set-replication                    |
