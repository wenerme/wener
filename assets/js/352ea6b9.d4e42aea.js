"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["43453"],{23739:function(n,e,l){l.r(e),l.d(e,{metadata:()=>i,contentTitle:()=>r,default:()=>h,assets:()=>c,toc:()=>d,frontMatter:()=>a});var i=JSON.parse('{"id":"os/virt/lima","title":"lima","description":"- lima-vm/lima","source":"@site/../notes/os/virt/lima.md","sourceDirName":"os/virt","slug":"/os/virt/lima","permalink":"/notes/os/virt/lima","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/os/virt/lima.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1659680046000,"frontMatter":{"title":"lima"},"sidebar":"docs","previous":{"title":"Libvirt Daemon","permalink":"/notes/os/virt/libvirt/libvirtd"},"next":{"title":"MicroVM","permalink":"/notes/os/virt/microvm"}}'),s=l("52676"),t=l("79938");let a={title:"lima"},r="lima",c={},d=[{value:"lima.yaml",id:"limayaml",level:2},{value:"mount",id:"mount",level:2},{value:"9p",id:"9p",level:3},{value:"reverse-sshfs",id:"reverse-sshfs",level:3}];function o(n){let e={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,t.a)(),...n.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(e.header,{children:(0,s.jsx)(e.h1,{id:"lima",children:"lima"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/lima-vm/lima",children:"lima-vm/lima"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Lima -> Linux on Mac"}),"\n",(0,s.jsx)(e.li,{children:"Linux vm on macOS for running containerd"}),"\n",(0,s.jsx)(e.li,{children:"\u57FA\u4E8E Qemu"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u6587\u4EF6\u5171\u4EAB\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u9ED8\u8BA4 Reverse SSHFS"}),"\n",(0,s.jsx)(e.li,{children:"\u53EF\u7528 virtio-9p-pci - virtfs"}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"vm \u5185\u4F1A\u76D1\u542C /proc/net/tcp \u548C iptables \u4E8B\u4EF6\uFF0C\u81EA\u52A8 ssh -L"}),"\n",(0,s.jsxs)(e.li,{children:["used by Rancher Desktop, ",(0,s.jsx)(e.a,{href:"https://github.com/abiosoft/colima",children:"Colima"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"Colima -> Containers on Linux on Mac"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u53C2\u8003\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/lima-vm/lima/blob/master/docs/internal.md",children:"https://github.com/lima-vm/lima/blob/master/docs/internal.md"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/lima-vm/lima/tree/master/examples",children:"https://github.com/lima-vm/lima/tree/master/examples"})}),"\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.a,{href:"https://github.com/chainguard-dev/apko/blob/main/mac/lima/apko-playground.yaml",children:"https://github.com/chainguard-dev/apko/blob/main/mac/lima/apko-playground.yaml"})}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.a,{href:"https://github.com/lima-vm/alpine-lima",children:"lima-vm/alpine-lima"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"rd -> Rancher Desktop"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.admonition,{type:"note",children:(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["alpine-lima \u6682\u4E0D\u652F\u6301 containerd ",(0,s.jsx)(e.a,{href:"https://github.com/lima-vm/lima/issues/489",children:"#489"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"installer \u4F9D\u8D56 systemd"}),"\n",(0,s.jsx)(e.li,{children:"\u53EF\u81EA\u5DF1 provision"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["Support Virtualization.framework on macOS 13 ",(0,s.jsx)(e.a,{href:"https://github.com/lima-vm/lima/issues/889",children:"#889"})]}),"\n",(0,s.jsxs)(e.li,{children:["Windows ",(0,s.jsx)(e.a,{href:"https://github.com/lima-vm/lima/issues/909",children:"#909"})]}),"\n",(0,s.jsxs)(e.li,{children:["default mount driver from reverse-sshfs to 9p ",(0,s.jsx)(e.a,{href:"https://github.com/lima-vm/lima/issues/971",children:"#971"})]}),"\n"]})}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-bash",children:"brew install lima\n\nsource <(limactl completion bash) # \u8865\u5168\n\n# https://raw.githubusercontent.com/lima-vm/lima/master/examples/alpine.yaml\n# /usr/local/share/lima/examples/fedora.yaml\n# limactl start --name=default template://docker\nlimactl start\n\n# limactl shell <INSTANCE> <COMMAND>\n# LIMA_INSTANCE\nlima uname -a\n\nls /usr/local/share/lima/examples   # \u6A21\u677F\nlimactl start --list-templates      # \u6A21\u677F\u5217\u8868\nlimactl list                        # \u5B9E\u4F8B\nlimactl copy default:/etc/ dst:/etc # \u8DE8\u5B9E\u4F8B\u590D\u5236\u6587\u4EF6\nlimactl stop default\nlimactl delete default\nlimactl factory-reset default\nlimactl edit default\n"})}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["\u6A21\u677F\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"alpine, buildkit, docker, k3s, nomad, ubuntu-lts"}),"\n",(0,s.jsx)(e.li,{children:"default,docker,k3s -> ubuntu-lts"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",metastring:'title="alpine.yaml"',children:"images:\n  - location: 'https://github.com/lima-vm/alpine-lima/releases/download/v0.2.18/alpine-lima-std-3.16.0-x86_64.iso'\n    arch: 'x86_64'\n    digest: 'sha512:234e407867a8955b9835b08e605b38583815dbd63c5690b558fbbd7b519af115c53694ddc3ff498cddb112f113e350c9f8b2a3351be038aa443399a39eff6007'\n  - location: 'https://github.com/lima-vm/alpine-lima/releases/download/v0.2.18/alpine-lima-std-3.16.0-aarch64.iso'\n    arch: 'aarch64'\n    digest: 'sha512:4e2cb238c78910384f30fb2aba02892d5b5092d50dfb0e345de71f7f194d24b890c81d2d502a0910d150de023ae77a3dbcda76cd6b71df2dd43e4dbccfc85170'\n\nmountType: '9p'\nmounts:\n  - location: '~'\n  - location: '/tmp/lima'\n    writable: true\n\nfirmware:\n  legacyBIOS: true\n\n# The built-in containerd installer does not support Alpine currently.\n# Hint: use the \"rd\" ISO instead of the \"std\" ISO to enable containerd: https://github.com/lima-vm/alpine-lima/releases/\ncontainerd:\n  # system-wide (aka rootful)  containerd and its dependencies (BuildKit, Stargz Snapshotter)\n  system: false\n  # user-scoped (aka rootless) containerd and its dependencies (currently requires systemd)\n  user: false\n"})}),"\n",(0,s.jsx)(e.h2,{id:"limayaml",children:"lima.yaml"}),"\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n",(0,s.jsxs)(e.table,{children:[(0,s.jsx)(e.thead,{children:(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.th,{children:"env"}),(0,s.jsx)(e.th,{children:"default"})]})}),(0,s.jsxs)(e.tbody,{children:[(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"LIMA_HOME"}),(0,s.jsx)(e.td,{children:"~/.lima"})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"LIMA_INSTANCE"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"LIMA_SHELL"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"LIMA_WORKDIR"}),(0,s.jsx)(e.td,{})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"LIMA_SYSTEM_X86_64"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"which qemu-system-x86_64"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:"QEMU_SYSTEM_AARCH64"}),(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"which qemu-system-aarch64"})})]}),(0,s.jsxs)(e.tr,{children:[(0,s.jsx)(e.td,{children:(0,s.jsx)(e.code,{children:"LIMA_CIDATA_*"})}),(0,s.jsx)(e.td,{})]})]})]}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:["LIMA_HOME\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"_config"})}),"\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"<INSTANCE>"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"lima.yaml"}),"\n",(0,s.jsxs)(e.li,{children:["cidata.iso - ",(0,s.jsx)(e.a,{href:"../../ops/infra/cloud-init.md",children:"cloud-init"})]}),"\n",(0,s.jsx)(e.li,{children:"basedisk"}),"\n",(0,s.jsx)(e.li,{children:"diffdisk"}),"\n",(0,s.jsx)(e.li,{children:"kernel"}),"\n",(0,s.jsx)(e.li,{children:"kernel.cmdline"}),"\n",(0,s.jsx)(e.li,{children:"initrd"}),"\n",(0,s.jsxs)(e.li,{children:["qemu.{pid,sock}, serial.{log,sock}\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:(0,s.jsx)(e.code,{children:"socat -,echo=0,icanon=0 unix-connect:serial.sock"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.li,{children:"ssh.sock"}),"\n",(0,s.jsx)(e.li,{children:"ga.sock -> /run/lima-guestagent.sock"}),"\n",(0,s.jsx)(e.li,{children:"ha.{pid,sock,stdout.log,stderr.log} - Host agent"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["~/Library/Caches/lima\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsxs)(e.li,{children:[(0,s.jsx)(e.code,{children:"~/Library/Caches/lima/download/by-url-sha256/<SHA256_OF_URL>"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"url"}),"\n",(0,s.jsx)(e.li,{children:"data.tmp"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["\u7F51\u7EDC\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"user-mode, slirp 192.168.5.0/24"}),"\n",(0,s.jsx)(e.li,{children:"guest 192.168.5.15"}),"\n",(0,s.jsx)(e.li,{children:"host 192.168.5.2 host.lima.internal"}),"\n",(0,s.jsxs)(e.li,{children:["dns 192.168.5.3\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"lima.yaml useHostResolver"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(e.li,{children:["vde_vmnet 192.168.105.0/24\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u652F\u6301\u4E3A guest \u6DFB\u52A0\u989D\u5916 IP"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:"# host \u548C guest \u4E0D\u540C\u8FD0\u884C\u4F1A\u975E\u5E38\u6162\narch: 'x86_64'\n# arch: \"aarch64\"\n\n# multi arch\n# https://github.com/lima-vm/lima/blob/master/docs/multi-arch.md\nimages:\n  - location: 'https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-amd64.img'\n    arch: 'x86_64'\n  - location: 'https://cloud-images.ubuntu.com/jammy/current/jammy-server-cloudimg-arm64.img'\n    arch: 'aarch64'\n\n# Disable mounts and containerd, otherwise booting up may timeout if the host is slow\nmounts: []\ncontainerd:\n  system: false\n  user: false\n"})}),"\n",(0,s.jsx)(e.h2,{id:"mount",children:"mount"}),"\n",(0,s.jsx)(e.h3,{id:"9p",children:"9p"}),"\n",(0,s.jsxs)(e.ul,{children:["\n",(0,s.jsx)(e.li,{children:"\u8981\u6C42\u9AD8\u7248\u672C kernel"}),"\n",(0,s.jsx)(e.li,{children:"\u4E0D\u652F\u6301 CentOS, Rocky Linux, AlmaLinux"}),"\n"]}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:'mountType: \'9p\'\nmounts:\n  - location: \'~\'\n    9p:\n      # Supported security models are "passthrough", "mapped-xattr", "mapped-file" and "none".\n      # \uD83D\uDFE2 Builtin default: "mapped-xattr"\n      securityModel: null\n      # Select 9P protocol version. Valid options are: "9p2000" (legacy), "9p2000.u", "9p2000.L".\n      # \uD83D\uDFE2 Builtin default: "9p2000.L"\n      protocolVersion: null\n      # The number of bytes to use for 9p packet payload, where 4KiB is the absolute minimum.\n      # \uD83D\uDFE2 Builtin default: "128KiB"\n      msize: null\n      # Specifies a caching policy. Valid options are: "none", "loose", "fscache" and "mmap".\n      # Try choosing "mmap" or "none" if you see a stability issue with the default "fscache".\n      # See https://www.kernel.org/doc/Documentation/filesystems/9p.txt\n      # \uD83D\uDFE2 Builtin default: "fscache" for non-writable mounts, "mmap" for writable mounts\n      cache: null\n'})}),"\n",(0,s.jsx)(e.h3,{id:"reverse-sshfs",children:"reverse-sshfs"}),"\n",(0,s.jsx)(e.pre,{children:(0,s.jsx)(e.code,{className:"language-yaml",children:'mountType: \'reverse-sshfs\'\nmounts:\n  - location: \'~\'\n    sshfs:\n      # Enabling the SSHFS cache will increase performance of the mounted filesystem, at\n      # the cost of potentially not reflecting changes made on the host in a timely manner.\n      # Warning: It looks like PHP filesystem access does not work correctly when\n      # the cache is disabled.\n      # \uD83D\uDFE2 Builtin default: true\n      cache: null\n      # SSHFS has an optional flag called \'follow_symlinks\'. This allows mounts\n      # to be properly resolved in the guest os and allow for access to the\n      # contents of the symlink. As a result, symlinked files & folders on the Host\n      # system will look and feel like regular files directories in the Guest OS.\n      # \uD83D\uDFE2 Builtin default: false\n      followSymlinks: null\n      # SFTP driver, "builtin" or "openssh-sftp-server". "openssh-sftp-server" is recommended.\n      # \uD83D\uDFE2 Builtin default: "openssh-sftp-server" if OpenSSH SFTP Server binary is found, otherwise "builtin"\n      sftpDriver: null\n'})})]})}function h(n={}){let{wrapper:e}={...(0,t.a)(),...n.components};return e?(0,s.jsx)(e,{...n,children:(0,s.jsx)(o,{...n})}):o(n)}},79938:function(n,e,l){l.d(e,{Z:function(){return r},a:function(){return a}});var i=l(75271);let s={},t=i.createContext(s);function a(n){let e=i.useContext(t);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function r(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:a(n.components),i.createElement(t.Provider,{value:e},n.children)}}}]);