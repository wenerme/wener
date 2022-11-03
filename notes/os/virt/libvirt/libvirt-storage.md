# Libvirt Storage

## Tips

- [Storage Management](https://libvirt.org/storage.html)
- [Storage pool and volume XML format](https://libvirt.org/formatstorage.html)
- 注意
  - 存放 disk 的目录在启动时会自动创建 dir pool，名字为目录名
  - dir 的 pool 使用 btrfs 可以支持 cow

| Pool Type    | Pool Format                                                                        | Volume Format                                                          | Desc         |
| ------------ | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------- | ------------ |
| dir          |                                                                                    | raw, bochs, cloop, cow, dmg, iso, qcow, qcow2, qed, vmdk, vpc          | 目录         |
| fs           | auto, ext2, ext3, ext4, ufs, iso9660, udf, gfs, gfs2, vfat, hfs+, xfs, ocfs2, vmfs | ..                                                                     | 文件系统     |
| netfs        | auto, nfs, glusterfs, cifs                                                         | ..                                                                     | 网络文件系统 |
| logical      | lvm2                                                                               | ..                                                                     | LVM          |
| disk         | dos, dvh, gpt, mac, bsd, pc98, sun, lvm2                                           | none, linux, fat16, fat32, linux-swap, linux-lvm, linux-raid, extended | 多硬盘       |
| iscsi        |
| iscsi-direct |
| scsi         |
| mpath        |
| rbd          |
| sheepdog     |
| gluster      |                                                                                    | > directory                                                            |
| zfs          |                                                                                    |                                                                        | zfs pool     |
| vstorage     |                                                                                    | > directory                                                            |


```xml
<pool type="dir">
  <name>virtimages</name>
  <target>
    <path>/var/lib/virt/images</path>
  </target>
</pool>
```

<storagepoolCapabilities>
  <pool type='dir' supported='yes'>
    <volOptions>
      <defaultFormat type='raw'/>
      <enum name='targetFormatType'>
        <value>none</value>
        <value>raw</value>
        <value>dir</value>
        <value>bochs</value>
        <value>cloop</value>
        <value>dmg</value>
        <value>iso</value>
        <value>vpc</value>
        <value>vdi</value>
        <value>fat</value>
        <value>vhd</value>
        <value>ploop</value>
        <value>cow</value>
        <value>qcow</value>
        <value>qcow2</value>
        <value>qed</value>
        <value>vmdk</value>
      </enum>
    </volOptions>
  </pool>
  <pool type='fs' supported='yes'>
    <poolOptions>
      <defaultFormat type='auto'/>
      <enum name='sourceFormatType'>
        <value>auto</value>
        <value>ext2</value>
        <value>ext3</value>
        <value>ext4</value>
        <value>ufs</value>
        <value>iso9660</value>
        <value>udf</value>
        <value>gfs</value>
        <value>gfs2</value>
        <value>vfat</value>
        <value>hfs+</value>
        <value>xfs</value>
        <value>ocfs2</value>
        <value>vmfs</value>
      </enum>
    </poolOptions>
    <volOptions>
      <defaultFormat type='raw'/>
      <enum name='targetFormatType'>
        <value>none</value>
        <value>raw</value>
        <value>dir</value>
        <value>bochs</value>
        <value>cloop</value>
        <value>dmg</value>
        <value>iso</value>
        <value>vpc</value>
        <value>vdi</value>
        <value>fat</value>
        <value>vhd</value>
        <value>ploop</value>
        <value>cow</value>
        <value>qcow</value>
        <value>qcow2</value>
        <value>qed</value>
        <value>vmdk</value>
      </enum>
    </volOptions>
  </pool>
  <pool type='netfs' supported='yes'>
    <poolOptions>
      <defaultFormat type='auto'/>
      <enum name='sourceFormatType'>
        <value>auto</value>
        <value>nfs</value>
        <value>glusterfs</value>
        <value>cifs</value>
      </enum>
    </poolOptions>
    <volOptions>
      <defaultFormat type='raw'/>
      <enum name='targetFormatType'>
        <value>none</value>
        <value>raw</value>
        <value>dir</value>
        <value>bochs</value>
        <value>cloop</value>
        <value>dmg</value>
        <value>iso</value>
        <value>vpc</value>
        <value>vdi</value>
        <value>fat</value>
        <value>vhd</value>
        <value>ploop</value>
        <value>cow</value>
        <value>qcow</value>
        <value>qcow2</value>
        <value>qed</value>
        <value>vmdk</value>
      </enum>
    </volOptions>
  </pool>
  <pool type='logical' supported='yes'>
    <poolOptions>
      <defaultFormat type='lvm2'/>
      <enum name='sourceFormatType'>
        <value>unknown</value>
        <value>lvm2</value>
      </enum>
    </poolOptions>
  </pool>
  <pool type='disk' supported='yes'>
    <poolOptions>
      <defaultFormat type='unknown'/>
      <enum name='sourceFormatType'>
        <value>unknown</value>
        <value>dos</value>
        <value>dvh</value>
        <value>gpt</value>
        <value>mac</value>
        <value>bsd</value>
        <value>pc98</value>
        <value>sun</value>
        <value>lvm2</value>
      </enum>
    </poolOptions>
    <volOptions>
      <defaultFormat type='none'/>
      <enum name='targetFormatType'>
        <value>none</value>
        <value>linux</value>
        <value>fat16</value>
        <value>fat32</value>
        <value>linux-swap</value>
        <value>linux-lvm</value>
        <value>linux-raid</value>
        <value>extended</value>
      </enum>
    </volOptions>
  </pool>
  <pool type='iscsi' supported='no'>
  </pool>
  <pool type='iscsi-direct' supported='no'>
  </pool>
  <pool type='scsi' supported='yes'>
  </pool>
  <pool type='mpath' supported='yes'>
  </pool>
  <pool type='rbd' supported='no'>
    <volOptions>
      <defaultFormat type='raw'/>
      <enum name='targetFormatType'>
      </enum>
    </volOptions>
  </pool>
  <pool type='sheepdog' supported='no'>
  </pool>
  <pool type='gluster' supported='no'>
    <volOptions>
      <defaultFormat type='raw'/>
      <enum name='targetFormatType'>
        <value>none</value>
        <value>raw</value>
        <value>dir</value>
        <value>bochs</value>
        <value>cloop</value>
        <value>dmg</value>
        <value>iso</value>
        <value>vpc</value>
        <value>vdi</value>
        <value>fat</value>
        <value>vhd</value>
        <value>ploop</value>
        <value>cow</value>
        <value>qcow</value>
        <value>qcow2</value>
        <value>qed</value>
        <value>vmdk</value>
      </enum>
    </volOptions>
  </pool>
  <pool type='zfs' supported='yes'>
  </pool>
  <pool type='vstorage' supported='no'>
    <volOptions>
      <defaultFormat type='raw'/>
      <enum name='targetFormatType'>
        <value>none</value>
        <value>raw</value>
        <value>dir</value>
        <value>bochs</value>
        <value>cloop</value>
        <value>dmg</value>
        <value>iso</value>
        <value>vpc</value>
        <value>vdi</value>
        <value>fat</value>
        <value>vhd</value>
        <value>ploop</value>
        <value>cow</value>
        <value>qcow</value>
        <value>qcow2</value>
        <value>qed</value>
        <value>vmdk</value>
      </enum>
    </volOptions>
  </pool>
</storagepoolCapabilities>

## zfs

- 会使用 zvol
- snapshot 不推荐使用 zvol - [PSA: SNAPSHOTS ARE BETTER THAN ZVOLS.](http://www.openoid.net/psa-snapshots-are-better-than-zvols/)
- 参考
  - [jimsalterjrs/sanoid/](https://github.com/jimsalterjrs/sanoid/)
    - [#191](https://github.com/jimsalterjrs/sanoid/issues/191) - Best practices for libvirt and zfs images
  - [Consistently backup your virtual machines using libvirt and zfs](http://www.linuxsystems.it/2018/10/consistently-backup-your-virtual-machines-using-libvirt-and-zfs-part-1/)
    - 运行时快照而不是关机状态快照
    - qcow2 实时快照不适用于 uefi，开发不太活跃
    - libvirt 也能 freeze 来进行快照
    - 使用 pre 和 post 脚本与 libvirt 交互
  - [No QCOW2 on ZFS?](https://forum.proxmox.com/threads/no-qcow2-on-zfs.37518/)
  - [KVM and ZFS setup recommendations](https://zfs-discuss.zfsonlinux.narkive.com/2Nkiem37/kvm-and-zfs-setup-recommendations)

```bash
# /dev/zvol/brian-kit/images/
virsh vol-create-as --pool zfsimages --name vol1 --capacity 1G
```

```bash
# http://www.linuxsystems.it/2018/10/consistently-backup-your-virtual-machines-using-libvirt-and-zfs-part-1
virsh snapshot-create-as ${DOMAIN} ${SNAPSHOT_NAME} \
--diskspec vda,snapshot=external,file=/var/lib/libvirt/snapshots/${DOMAIN}.${SNAPSHOT_NAME}.disk.qcow2 \
--memspec file=/var/lib/libvirt/snapshots/${DOMAIN}.${SNAPSHOT_NAME}.mem.qcow2,snapshot=external \
--atomic
fi
```
