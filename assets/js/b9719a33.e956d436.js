"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["45063"],{14612:function(n,e,a){a.r(e),a.d(e,{metadata:()=>i,contentTitle:()=>l,default:()=>h,assets:()=>o,toc:()=>d,frontMatter:()=>t});var i=JSON.parse('{"id":"ops/admin/vbox","title":"VirtualBox","description":"- \u78C1\u76D8\u7C7B\u578B","source":"@site/../notes/ops/admin/vbox.md","sourceDirName":"ops/admin","slug":"/ops/admin/vbox","permalink":"/notes/ops/admin/vbox","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/ops/admin/vbox.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1621756378000,"frontMatter":{"title":"VirtualBox"},"sidebar":"docs","previous":{"title":"upterm","permalink":"/notes/ops/admin/upterm"},"next":{"title":"Cache","permalink":"/notes/ops/cache"}}'),r=a("52676"),s=a("79938");let t={title:"VirtualBox"},l="VirtualBox",o={},d=[{value:"\u6DFB\u52A0 USB \u8BBE\u5907",id:"\u6DFB\u52A0-usb-\u8BBE\u5907",level:3},{value:"\u547D\u4EE4\u884C\u521B\u5EFA\u865A\u62DF\u673A",id:"\u547D\u4EE4\u884C\u521B\u5EFA\u865A\u62DF\u673A",level:3},{value:"Vagrant",id:"vagrant",level:2},{value:"Vagrantfile",id:"vagrantfile",level:2},{value:"\u6DFB\u52A0\u989D\u5916\u78C1\u76D8\u548C\u5206\u533A",id:"\u6DFB\u52A0\u989D\u5916\u78C1\u76D8\u548C\u5206\u533A",level:3},{value:"\u78C1\u76D8\u63A7\u5236",id:"\u78C1\u76D8\u63A7\u5236",level:4},{value:"Vagrant Tips",id:"vagrant-tips",level:2},{value:"FAQ",id:"faq",level:2},{value:"\u627E\u4E0D\u5230 64bit \u7684\u865A\u62DF",id:"\u627E\u4E0D\u5230-64bit-\u7684\u865A\u62DF",level:3},{value:"VBoxManage: error: Could not rename the directory",id:"vboxmanage-error-could-not-rename-the-directory",level:3},{value:"Vagrant \u5728\u5F53\u524D\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E86\u5927\u91CF\u6587\u4EF6",id:"vagrant-\u5728\u5F53\u524D\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E86\u5927\u91CF\u6587\u4EF6",level:3},{value:"Windows \u4E0B\u5F00\u673A\u542F\u52A8",id:"windows-\u4E0B\u5F00\u673A\u542F\u52A8",level:2}];function c(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,s.a)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.header,{children:(0,r.jsx)(e.h1,{id:"virtualbox",children:"VirtualBox"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u78C1\u76D8\u7C7B\u578B\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["VDI\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"vbox \u81EA\u5DF1\u7684\u78C1\u76D8\u683C\u5F0F"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["VMDK\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u6700\u5148\u7531 vm \u63D0\u51FA,\u5927\u591A\u865A\u62DF\u73AF\u5883\u90FD\u652F\u6301"}),"\n",(0,r.jsx)(e.li,{children:"\u652F\u6301\u5212\u5206\u4E3A 2G \u5C0F\u6587\u4EF6\u529F\u80FD"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["VHD\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4E3B\u8981\u5728 Windows \u4E2D\u4F7F\u7528"}),"\n",(0,r.jsx)(e.li,{children:"HyperV \u9ED8\u8BA4\u78C1\u76D8\u7C7B\u578B"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["VHDX\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.virtualbox.org/ticket/12616",children:"#12616"})}),"\n",(0,r.jsx)(e.li,{children:"\u6682\u65F6\u53EA\u80FD\u53EA\u8BFB"}),"\n",(0,r.jsxs)(e.li,{children:["\u53EF\u4EE5\u8F6C\u6362\u4E3A\u5176\u4ED6\u683C\u5F0F\u518D\u6302\u8F7D ",(0,r.jsx)(e.code,{children:"VBoxManage clonemedium disk <input VHDX> <output image>"})]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:[(0,r.jsx)(e.a,{href:"https://www.virtualbox.org/ticket/819",children:"vboxvfs seems to have problems with mmapped access to files => retry with 3.1.4"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"vbox \u6620\u5C04\u7684\u76EE\u5F55\u4E0D\u80FD\u505A mmap"}),"\n",(0,r.jsx)(e.li,{children:"\u5BFC\u81F4 boot2docker \u5F88\u955C\u50CF\u591A\u4E0D\u80FD\u7528, mongodb, realmdb, ipfs \u7B49"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# Download and install vbox and extension pack\n# https://www.virtualbox.org/wiki/Linux_Downloads\nVBoxManage extpack install  --replace FILE_NAME\n\n# \u78C1\u76D8\u683C\u5F0F\u8F6C\u6362\nVBoxManage clonemedium disk <input VHDX> <output image>\n\n# \u5BFC\u51FA\u78C1\u76D8\nVBoxManage clonehd --format RAW debian.vdi debian.img\n#\nVBoxManage internalcommands converttoraw Ubuntu.vdi Ubuntu.raw\n"})}),"\n",(0,r.jsx)(e.h3,{id:"\u6DFB\u52A0-usb-\u8BBE\u5907",children:"\u6DFB\u52A0 USB \u8BBE\u5907"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# \u542F\u7528 USB \u8BBE\u5907\u63A7\u5236\u5668,\u9700\u8981\u865A\u62DF\u673A\u672A\u8FD0\u884C\n# ohci -> usb1.0, echi -> usb2.0 ,xchi -> usb3.0\n# echi \u548C xchi \u9700\u8981\u5B89\u88C5 ext packet\nVBoxManage modifyvm <\u4E3B\u673A\u540D> --usb on --usbxhci on\n\n# \u67E5\u770B\u6B63\u5728\u8FD0\u884C\u7684\u865A\u62DF\u673A\nVBoxManage list runningvms\n# \u67E5\u770B\u4E3B\u673A\u4E0A\u7684 USB \u8BBE\u5907\nVBoxManage list usbhost\n# \u6302\u8F7D USB \u8BBE\u5907\u865A\u62DF\u673A\nVBoxManage controlvm <\u4E3B\u673A\u540D> usbattach <\u8BBE\u5907 UUID>\n# \u786E\u8BA4\u6302\u8F7D\u6210\u529F\nVBoxManage showvminfo <\u4E3B\u673A\u540D>\n# \u79FB\u9664 USB \u8BBE\u5907\nVBoxManage controlvm <\u4E3B\u673A\u540D> usbdetach <\u8BBE\u5907 UUID>\n"})}),"\n",(0,r.jsx)(e.h3,{id:"\u547D\u4EE4\u884C\u521B\u5EFA\u865A\u62DF\u673A",children:"\u547D\u4EE4\u884C\u521B\u5EFA\u865A\u62DF\u673A"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:'#!/bin/bash -ex\n## \u865A\u62DF\u673A\u540D\u5B57\nvmname="Win7ult"\n\n## \u865A\u62DF\u673A\u7684\u64CD\u4F5C\u7CFB\u7EDF\u548C\u7CFB\u7EDF\u955C\u50CF\n## vboxmanage list ostypes \u67E5\u770B\u652F\u6301\u7684\u7CFB\u7EDF, \u4F7F\u7528 ID \u4F5C\u4E3A ostype\nostype="Windows7_64"\nisofile="/data/vm/vbox/iso_files/Windows7_UltimateNL_32bit_SP1.iso"\n\n## \u5185\u5B58\u548C\u663E\u5B58\nmemory="2048"\nvram="32"\n\n## \u4E91\u76D8\u7A7A\u95F4\nhddsize="8192"\n\n## VRDP \u7AEF\u53E3\u8303\u56F4\nvrdeport="5041-5049"\n\n## \u58F0\u5361\n#audio="alsa --audiocontroller ac97"\naudio="none"\n\n#######################################################################\n### \u521B\u5EFA\u865A\u62DF\u673A\n#######################################################################\n# \u5B9A\u4E49\u78C1\u76D8\u6587\u4EF6\u8DEF\u5F84\nhddfile=/data/vm/vbox/vbox_guests/${vmname}/${vmname}.vdi\nclear\n\n# \u521B\u5EFA\u865A\u62DF\u673A\nvboxmanage createvm --name $vmname --ostype $ostype --register\n\n# \u8BBE\u7F6E\u5185\u5B58\u663E\u5B58\u58F0\u5361\u548C vdre \u7684\u7AEF\u53E3\u8303\u56F4\nvboxmanage modifyvm $vmname --memory $memory --vram $vram --acpi on --ioapic on --cpus 1 --cpuexecutioncap 75 --rtcuseutc on --cpuhotplug on --pae on --hwvirtex on\nvboxmanage modifyvm $vmname --nic1 bridged --bridgeadapter1 eth0 --cableconnected1 on\nvboxmanage modifyvm $vmname --audio $audio\nvboxmanage modifyvm $vmname --vrde on --vrdeport $vrdeport --vrdeauthtype null\n\n\n# \u521B\u5EFA HDD \u548C SATA \u63A7\u5236\u5668\nvboxmanage createhd --filename $hddfile --size $hddsize\nvboxmanage storagectl $vmname --name "SATA controller" --add sata\nvboxmanage storageattach $vmname --storagectl "SATA controller" --port 0 --device 0 --type hdd --medium $hddfile\n\n# \u521B\u5EFA IDE \u63A7\u5236\u5668\u5E76\u6DFB\u52A0 DVD\nvboxmanage storagectl $vmname --name "IDE controller" --add ide\nvboxmanage storageattach $vmname --storagectl "IDE controller"  --port 0 --device 0 --type dvddrive --medium $isofile\n'})}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# \u542F\u52A8\u865A\u62DF\u673A\nvboxmanage startvm $vmname --type headless\n# \u67E5\u770B RDP \u7684\u4FE1\u606F\nvboxmanage showvminfo $vmname | grep VRDE:\n# \u901A\u8FC7 RDP \u8FDC\u7A0B\u8FDE\u63A5\n\nvboxmanage list vms\nvboxmanage list runningvms\nvboxmanage showvminfo $vmname\n\n# \u67E5\u770B VRDE \u7AEF\u53E3\u4EE5\u4FBF\u8FDC\u7A0B\u8FDE\u63A5\nvboxmanage showvminfo $vmname |grep VRDE:\n\n# \u91CD\u542F\nvboxmanage controlvm $vmname reset\n# \u65AD\u7535\nvboxmanage controlvm $vmname poweroff\n# \u79FB\u9664\u865A\u62DF\u673A\nvboxmanage unregistervm $vmname\n# \u79FB\u9664\u5E76\u5220\u9664\u76F8\u5173\u6587\u4EF6\nvboxmanage unregistervm $vmname --delete\n"})}),"\n",(0,r.jsx)(e.h2,{id:"vagrant",children:"Vagrant"}),"\n",(0,r.jsx)(e.h2,{id:"vagrantfile",children:"Vagrantfile"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ruby",children:'Vagrant.configure(2) do |config|\n  # \u914D\u7F6E\u53EF\u53C2\u8003https://docs.vagrantup.com.\n\n  # \u914D\u7F6E\u4F7F\u7528\u7684\u865A\u62DF\u673A\n  config.vm.box = "ubuntu/trusty64"\n  # \u662F\u5426\u9700\u8981\u81EA\u52A8\u66F4\u65B0\u955C\u50CF,\u5EFA\u8BAE\u5173\u95ED,\u56E0\u4E3A\u56FD\u5185\u7F51\u7EDC\u8F83\u5DEE,\u5F71\u54CD\u542F\u52A8\u901F\u5EA6\n  config.vm.box_check_update = false\n  # \u914D\u7F6E\u5171\u4EAB\u6587\u4EF6\u5939,\u4EE5\u4E0B\u914D\u7F6E\u4F1A\u5C06\u4E3B\u673A\u5F53\u524D\u76EE\u5F55\u4E0B\u7684 data \u5171\u4EAB\u5230\u865A\u62DF\u673A\u4E2D\u7684 /host\n  config.vm.synced_folder "./data", "/host"\n  # \u914D\u7F6E\u5916\u90E8\u7F51\u7EDC\u5730\u5740,\u5C40\u57DF\u7F51\u53EF\u8BBF\u95EE\n  config.vm.network "public_network", ip: "10.4.231.186"\n  # \u914D\u7F6E\u5185\u90E8\u7F51\u7EDC\u5730\u5740,\u53EA\u6709\u4E3B\u673A\u80FD\u8BBF\u95EE\n  config.vm.network "private_network", ip: "192.168.33.9"\n  # \u7AEF\u53E3\u8F6C\u53D1,\u4EE5\u4E0B\u914D\u7F6E\u4F1A\u5C06\u865A\u62DF\u673A\u7684 8080 \u7AEF\u53E3\u8F6C\u53D1\u5230\u4E3B\u673A\u7684 80 \u7AEF\u53E3\n  config.vm.network "forwarded_port", guest: 80, host: 8080\n\n  # \u5BF9\u4E0D\u540C\u7684\u8FD0\u884C\u73AF\u5883\u8FDB\u884C\u914D\u7F6E\n  config.vm.provider "virtualbox" do |vb|\n    # virtualbox \u76F8\u5173\u914D\u7F6E\u53EF\u53C2\u8003 https://www.vagrantup.com/docs/virtualbox/configuration.html\n    # \u5728\u542F\u52A8\u65F6\u7981\u7528 VirtualBox \u56FE\u5F62\u754C\u9762\n    vb.gui = false\n\n    # \u6307\u5B9A\u865A\u62DF\u673A\u4F7F\u7528\u7684\u5185\u5B58\u91CF\n    vb.memory = "1024"\n    # \u6307\u5B9A\u865A\u62DF\u673A\u4F7F\u7528\u7684\u6838\u6570\n    vb.cpus = 2\n  end\n\n  # \u914D\u7F6E\u76D1\u542C,\u5728\u865A\u62DF\u673A\u542F\u52A8\u540E\u6267\u884C\n  config.vm.provision "shell", inline: <<-SHELL\n    echo Cool stuff\n    date >> /host/hello.txt\n  SHELL\n\n  # \u53EF\u914D\u7F6E\u591A\u4E2A\u4E3B\u673A,\u53EF\u901A\u8FC7 vagrant up \u4E3B\u673A\u540D, vagrant ssh \u4E3B\u673A\u540D \u64CD\u4F5C\u5355\u4E2A\u4E3B\u673A\n  config.vm.define "db-1" do |node|\n    node.vm.network "private_network", ip: "192.168.33.10"\n    node.vm.provision "shell",\n      inline: "echo hello from node db-1"\n  end\nend\n'})}),"\n",(0,r.jsx)(e.h3,{id:"\u6DFB\u52A0\u989D\u5916\u78C1\u76D8\u548C\u5206\u533A",children:"\u6DFB\u52A0\u989D\u5916\u78C1\u76D8\u548C\u5206\u533A"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ruby",children:"Vagrant.configure(2) do |config|\n\n  config.vm.box = \"ubuntu/trusty64\"\n  config.vm.box_check_update = false\n  config.vm.network \"private_network\", ip: \"192.168.33.9\"\n  config.vm.provider \"virtualbox\" do |vb|\n    vb.gui = false\n    vb.memory = \"1024\"\n    # machine name in virtualbox\n    vb.name = \"try_disk\"\n\n    file_to_disk = File.realpath( \".\" ).to_s + \"/disk.vdi\"\n\n    if ARGV[0] == \"up\" && ! File.exist?(file_to_disk)\n       vb.customize [\n            'createhd',\n            '--filename', file_to_disk,\n            '--format', 'VDI',\n            '--size', 30 * 1024 # 30 GB\n            ]\n       vb.customize [\n            'storageattach', :id,\n            # The name may vary, found by\n            # VBoxManage showvminfo try_disk|grep 'Storage Controller Name'|\n            '--storagectl', 'SATAController',\n            '--port', 1, '--device', 0,\n            '--type', 'hdd', '--medium',\n            file_to_disk\n            ]\n    end\n  end\n\n  # Tow partition in one disk 10G,20G\n  config.vm.provision \"shell\", inline: <<-SHELL\nset -e\nset -x\n\nif [ -f /etc/provision_env_disk_added_date ]\nthen\n   echo \"Provision runtime already done.\"\n   exit 0\nfi\n\n\nfdisk -u /dev/sdb <<EOF\nn\np\n1\n\n+10G\nn\np\n2\n\n\nw\nEOF\n\nmkfs.ext4 /dev/sdb1\nmkfs.ext4 /dev/sdb2\nmkdir -p /{data,extra}\necho '/dev/sdb1 /data ext4 defaults 0 0'>> /etc/fstab\necho '/dev/sdb2 /extra ext4 defaults 0 0'>> /etc/fstab\nmount -a\n\ndate > /etc/provision_env_disk_added_date\n  SHELL\n\n  config.vm.provision \"shell\", inline: <<-SHELL\n    echo Well done\n  SHELL\nend\n"})}),"\n",(0,r.jsx)(e.h4,{id:"\u78C1\u76D8\u63A7\u5236",children:"\u78C1\u76D8\u63A7\u5236"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# \u67E5\u770B\u5F53\u524D\u78C1\u76D8\nlsblk -io KNAME,TYPE,SIZE,MODEL\n# \u521B\u5EFA\u78C1\u76D8\nVBoxManage createhd --filename disk.vid --format VDI --size 1000\n# \u6DFB\u52A0\u5A92\u4ECB\nVBoxManage storageattach try_disk --storagectl SATA --port 1 --device 0 --type hdd --medium `pwd`/disk.vid\n\n# \u5728\u65B0\u78C1\u76D8\u4E0A\u521B\u5EFA\u5355\u4E2A\u5206\u533A\nsudo fdisk -u /dev/sdb <<EOF\nn\np\n1\n\n\nt\n8e\nw\nEOF\n# \u4F7F\u7528 ext4 \u78C1\u76D8\nmkfs.ext4 /dev/sdb1\n# \u6302\u8F7D\u78C1\u76D8\nmount -t ext4 /dev/sdb1 /data\n# \u5224\u65AD\u6302\u8F7D\u6210\u529F\ndf  -h\n"})}),"\n",(0,r.jsx)(e.h2,{id:"vagrant-tips",children:"Vagrant Tips"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u542F\u52A8\u540E\u8FD0\u884C\u547D\u4EE4"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ruby",children:'config.vm.provision "shell", inline: "echo Hello"\n'})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u540C\u65F6\u542F\u52A8\u591A\u4E2A\u865A\u62DF\u673A"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ruby",children:'(1..3).each do |i|\n  config.vm.define "node-#{i}" do |node|\n    node.vm.provision "shell",\n      inline: "echo hello from node #{i}"\n  end\nend\n'})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u53EA\u542F\u52A8\u914D\u7F6E\u4E2D\u7684\u6307\u5B9A\u865A\u62DF\u673A"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"vagrant up node-1\nvagrant up /node-(1|2)/\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u4F20\u9012\u73AF\u5883\u53D8\u91CF"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ruby",children:'ENV["LC_ALL"] = "en_US.UTF-8"\n\nVagrant.configure("2") do |config|\n  # ...\nend\n'})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u7F51\u7EDC\u914D\u7F6E"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ruby",children:'# \u7AEF\u53E3\u8F6C\u53D1\nconfig.vm.network "forwarded_port", guest: 80, host: 8080\n# \u6307\u5B9A\u516C\u7F51\u5730\u5740\nconfig.vm.network "public_network", ip: "192.168.0.17"\n'})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5171\u4EAB\u76EE\u5F55"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-ruby",children:'# create \u81EA\u52A8\u521B\u5EFA\u4E3B\u673A\u4E2D\u7684\u76EE\u5F55\n# disabled \u7981\u7528\nconfig.vm.synced_folder "src/", "/srv/website", create: true, owner: "root", group: "root"\n# \u7981\u7528\u9ED8\u8BA4\u6302\u8F7D\u76EE\u5F55\nconfig.vm.synced_folder \'.\', \'/vagrant\', disabled: true\n'})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u624B\u52A8\u5B89\u88C5 box"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"vagrant box add laravel/homestead path/to/your/box/file.box\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5E38\u7528 BOX"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{children:"centos/7\nubuntu/trusty64\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"\u5E38\u7528\u547D\u4EE4"}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"vagrant up # \u542F\u52A8\nvagrant halt # \u5173\u673A\nvagrant destroy # \u6E05\u9664\u865A\u62DF\u673A\nvagrant status # \u67E5\u770B\u8FD0\u884C\u72B6\u6001\nvagrant suspend # \u4F7F\u673A\u5668\u6302\u8D77\nvagrant ssh # SSH \u8FDB\u5165\u673A\u5668\nvagrant reload # \u91CD\u542F\u673A\u5668\nvagrant global-status # \u67E5\u770B\u6240\u6709\u865A\u62DF\u673A\u7684\u8FD0\u884C\u72B6\u6001,\u4E0D\u9700\u8981\u5F53\u524D\u76EE\u5F55\u6709 Vagrantfile\n"})}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsxs)(e.li,{children:["\u5E38\u7528\u63D2\u4EF6\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:"landrush"}),"\n",(0,r.jsx)(e.li,{children:"vagrant-vbguest"}),"\n",(0,r.jsx)(e.li,{children:"vagrant-cachier"}),"\n",(0,r.jsx)(e.li,{children:"vagrant-omnibus"}),"\n",(0,r.jsx)(e.li,{children:"vagrant-proxyconf"}),"\n",(0,r.jsx)(e.li,{children:"vagrant-share"}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u6DFB\u52A0\u989D\u5916\u78C1\u76D8\u5206\u533A\u548C\u4FEE\u6539\u78C1\u76D8\u5927\u5C0F\u548C\u901A\u8FC7\u5B9A\u5236\u5316\u53C2\u6570\u5B9E\u73B0,\u5177\u4F53\u53EF\u53C2\u8003",(0,r.jsx)(e.a,{href:"https://github.com/mitchellh/vagrant/issues/2339#issuecomment-33064917",children:"\u8FD9\u91CC"})]}),"\n",(0,r.jsxs)(e.li,{children:["\u641C\u7D22 BOX\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"http://www.vagrantbox.es/",children:"vagrantbox"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://atlas.hashicorp.com/boxes/search",children:"boxes/search"})}),"\n"]}),"\n"]}),"\n",(0,r.jsxs)(e.li,{children:["\u5B98\u65B9\u7F51\u7AD9\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.vagrantup.com/",children:"Vagrantup"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.vagrantup.com/downloads.html",children:"\u8F6F\u4EF6\u4E0B\u8F7D"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.vagrantup.com/docs/",children:"\u5B98\u65B9\u6587\u4EF6\u6587\u6863"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://www.vagrantup.com/docs/vagrantfile/",children:"\u914D\u7F6E\u6587\u4EF6\u6587\u6863"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(e.h2,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(e.h3,{id:"\u627E\u4E0D\u5230-64bit-\u7684\u865A\u62DF",children:"\u627E\u4E0D\u5230 64bit \u7684\u865A\u62DF"}),"\n",(0,r.jsx)(e.p,{children:"\u53EF\u80FD\u7531\u4E8E CPU \u4E0D\u652F\u6301\u786C\u4EF6\u865A\u62DF\u5316\u6280\u672F(Intel VT-x \u6216 AMD-v),\u6216\u8005\u88AB\u5176\u4ED6\u7A0B\u5E8F\u5360\u7528,\u4F8B\u5982\u88C5\u4E86 HyperV."}),"\n",(0,r.jsx)(e.h3,{id:"vboxmanage-error-could-not-rename-the-directory",children:"VBoxManage: error: Could not rename the directory"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"vagrant destroy -f\nrm ~/VirtualBox\\ VMs/YOUR_NAME_HERE\n"})}),"\n",(0,r.jsx)(e.h3,{id:"vagrant-\u5728\u5F53\u524D\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E86\u5927\u91CF\u6587\u4EF6",children:"Vagrant \u5728\u5F53\u524D\u76EE\u5F55\u4E0B\u521B\u5EFA\u4E86\u5927\u91CF\u6587\u4EF6"}),"\n",(0,r.jsx)(e.p,{children:"\u8FD9\u662F\u7531\u4E8E\u4E34\u65F6\u76EE\u5F55\u5F02\u5E38\u5BFC\u81F4\u7684,\u53EF\u53C2\u8003"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/mitchellh/vagrant/issues/3493",children:"#3493"})}),"\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"https://github.com/mitchellh/vagrant/issues/3514",children:"#3514"})}),"\n",(0,r.jsxs)(e.li,{children:["Vagrant \u5224\u65AD\u8BE5\u76EE\u5F55\u7684",(0,r.jsx)(e.a,{href:"https://github.com/ruby/ruby/blob/2254fc650b681c2582f25aa0d2be2cc8aba3cb8e/lib/tmpdir.rb#L25",children:"\u4EE3\u7801"})]}),"\n"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-bash",children:"# \u786E\u4FDD\u5C5E\u6027\u6B63\u786E\nchmod 1777 /tmp\n# \u6216\u5C1D\u8BD5 \u9700\u8C28\u614E!\nchmod +s /tmp\n"})}),"\n",(0,r.jsx)(e.h2,{id:"windows-\u4E0B\u5F00\u673A\u542F\u52A8",children:"Windows \u4E0B\u5F00\u673A\u542F\u52A8"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-batch",children:'# Win 10 \u7684\u5F00\u542F\u542F\u52A8\u76EE\u5F55\u662F\u9690\u85CF\u7684\nshell:startup\n# \u6216\u8005\u76F4\u63A5\u6253\u5F00\nstart C:\\Users\\$USER\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\n# \u521B\u5EFA\u7528\u4E8E\u542F\u52A8\u7684 bat\n# "C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage.exe" startvm "NameOfYourVM" --type "headless"\n'})}),"\n",(0,r.jsx)(e.p,{children:"\u4F5C\u4E3A\u670D\u52A1\u4F7F\u7528"}),"\n",(0,r.jsxs)(e.ul,{children:["\n",(0,r.jsx)(e.li,{children:(0,r.jsx)(e.a,{href:"http://stackoverflow.com/a/19017826/1870054",children:"http://stackoverflow.com/a/19017826/1870054"})}),"\n"]})]})}function h(n={}){let{wrapper:e}={...(0,s.a)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(c,{...n})}):c(n)}},79938:function(n,e,a){a.d(e,{Z:function(){return l},a:function(){return t}});var i=a(75271);let r={},s=i.createContext(r);function t(n){let e=i.useContext(s);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function l(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:t(n.components),i.createElement(s.Provider,{value:e},n.children)}}}]);