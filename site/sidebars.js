module.exports = {
  docs: {
    Java: [
      'java/java',
      'java/maven',
      {
        type: 'category',
        label: '版本',
        items: [
          'java/version/version',
          'java/version/java-11',
          'java/version/java-10',
          'java/version/java-9',
          'java/version/java-8',
          'java/version/java-7',
          'java/version/java-6',
        ],
      },
      {
        type: 'category',
        label: 'Spring',
        items: [
          'java/spring/spring',
          'java/spring/boot',
          'java/spring/data',
          'java/spring/data-rest',
          'java/spring/security',
          'java/spring/security-oauth2',
          'java/spring/cloud',
          'java/spring/releases',
        ],
      },
      'java/library/productive',
    ],
    前端技术: [
      {
        type: 'category',
        label: '框架',
        items: [
          'web/framework/nextjs',
          'web/framework/nextjs-cookbook',
          'web/framework/electron',
          'web/framework/vue',
          'web/framework/angular',
          'web/framework/riot',
          'web/framework/prisma',
        ],
      },
    ],
    语言: [
      'languages/languages',
      'languages/parsing',
      'languages/peg',
      'languages/pegjs',
      'languages/php',
      'languages/zig',
      'languages/go/hello-cgo',
      'languages/go/go-template',
    ],
    开发运维: [
      'devops/tracing/tracing',
      {
        type: 'category',
        label: '指标监控',
        items: [
          'devops/metrics/metrics',
          'devops/metrics/prometheus',
        ],
      },
      {
        type: 'category',
        label: 'Web',
        items: [
          'devops/web/nginx',
          'devops/web/caddy',
          'devops/web/traefik',
        ],
      },
      {
        type: 'category',
        label: '平台服务',
        items: [
          'devops/xaas/db-schema',
          'devops/xaas/paas/dokku',
        ],
      },
    ],
    AlpineLinux: [
      'ops/os/alpine/alpine',
      'ops/os/alpine/alpine-intro',
      'ops/os/alpine/alpine-ops',
      'ops/os/alpine/alpine-pkgs',
      'ops/os/alpine/alpine-faq',
    ],
    Docker: [
      'devops/docker/docker-intro',
      'devops/docker/docker-network',
      'devops/docker/docker-storage',
      'devops/docker/docker-swarm',
      'devops/docker/docker-cookbook',
    ],
    Kubernetes: [
      'devops/kubernetes/k8s-intro',
      'devops/kubernetes/k8s-dashboard',
      'devops/kubernetes/k3s',
      'devops/kubernetes/k3d',
      'devops/kubernetes/k8s-glossary',
      'devops/kubernetes/helm-intro',
      'devops/kubernetes/helm2',
      'devops/kubernetes/rancher-intro',
      'devops/kubernetes/rancher-rke',
      {
        type: 'category',
        label: '网络',
        items: [
          'devops/kubernetes/network/k8s-network',
          'devops/kubernetes/network/kong-ingress',
          'devops/kubernetes/network/metallb',
          'devops/kubernetes/network/flannel',
        ],
      },
      {
        type: 'category',
        label: '存储',
        items: [
          'devops/kubernetes/storage/k8s-storage',
          'devops/kubernetes/storage/longhorn',
          'devops/kubernetes/storage/k8s-nfs',
          'devops/kubernetes/storage/rook',
        ],
      },
      {
        type: 'category',
        label: '平台',
        items: [
          'devops/kubernetes/platform/knative-intro',
          'devops/kubernetes/platform/istio-intro',
        ],
      },
      {
        type: 'category',
        label: '应用',
        items: [
          'devops/kubernetes/app/cert-manager',
          'devops/kubernetes/app/k8s-consul',
          'devops/kubernetes/app/harbor',
        ],
      },
    ],
    指南: [
      {
        type:'category',
        label:'运维',
        items:[
          'howto/ops/alpine-admin-ansible',
        ]
      },
      {
        type:'category',
        label:'网络',
        items:[
          'howto/network/dns-prevent-spoofing',
          'howto/network/tinc-get-started',
          'howto/network/tinc-multi-path-failover',
          'howto/network/tinc-transparency-proxy',
        ]
      },
    ],
    系统管理: [
      'ops/admin/htop',
      'ops/admin/mosh',
    ],
    基础设施: [
      'ops/infra/infra',
      'ops/infra/ansible',
      'ops/infra/ansible-awx',
      'ops/infra/ansible-faq',
      'ops/infra/terraform',
    ],
    虚拟化: [
      'ops/os/linux/virt/virt',
      'ops/os/linux/virt/qemu-doc',
      'ops/os/linux/virt/qemu-monitor',
      'ops/os/linux/virt/libvirt-faq',
      'ops/os/linux/virt/virsh',
    ],
    工具: [
      {
        type:'category',
        label:'网络',
        items:[
          'tool/network/ip-lookup',
        ]
      }
    ],
    操作系统: [
      {
        type: 'category',
        label: 'Darwin',
        items: [
          'ops/os/darwin/darwin',
          'ops/os/darwin/macos',
          'ops/os/darwin/brew',
        ]
      },
      {
        type: 'category',
        label: 'Windows',
        items: [
          'ops/os/windows/windows',
          'ops/os/windows/windows-dc',
          'ops/os/windows/windows-faq',
        ]
      },
    ],
    数据库: [
      'db/db',
      {
        type: 'category',
        label: 'PostgreSQL',
        items: [
          'db/relational/postgresql/postgresql',
          'db/relational/postgresql/datatype',
          'db/relational/postgresql/fts',
          'db/relational/postgresql/version',
          'db/relational/postgresql/faq',
          'db/relational/postgresql/timescale',
          'db/relational/postgresql/postgrest-hello',
          'db/relational/postgresql/hasura',
        ]
      },
      {
        type: 'category',
        label: '关系型',
        items: [
          'db/relational/mysql',
          'db/relational/mysql-gtid',
          'db/relational/sqlite',
        ]
      },
      {
        type: 'category',
        label: '文档型',
        items: [
          'db/document/mongodb',
          'db/document/rethinkdb',
          'db/document/couchdb',
        ]
      },
      {
        type: 'category',
        label: '键值型',
        items: [
          'db/kv/kv',
          'db/kv/redis',
          'db/kv/lmdb',
          'db/kv/leveldb',
        ]
      },
    ],
    参考: [
      'reference/words',
      {
        type: 'category',
        label: '软件',
        items: [
          'reference/software/saas',
          'reference/software/glossary',
        ],
      },
      {
        type: 'category',
        label: '用户增长',
        items: [
          'reference/growth/formula',
          'reference/growth/glossary',
        ],
      },
      {
        type: 'category',
        label: '烹饪',
        items: [
          'reference/cook/glossary',
        ],
      },
    ],
    网络: [
      {
        type: 'category',
        label: '应用',
        items: [
          'ops/network/application/dns',
          'ops/network/application/http',
          'ops/network/application/ssl',
        ]
      },
      {
        type: 'category',
        label: '链路',
        items: [
          'ops/network/link/wireless',
          'ops/network/link/infiniband',
        ]
      },
      {
        type: 'category',
        label: '私有',
        items: [
          'ops/network/private/intro',
          'ops/network/private/tinc',
          'ops/network/private/privoxy',
          'ops/network/private/privoxy-action',
          'ops/network/private/ipsec',
          'ops/network/private/wireguard',
        ]
      },
      {
        type: 'category',
        label: '工具',
        items: [
          'ops/network/tool/intro',
          'ops/network/tool/bonding',
          'ops/network/tool/dnsmasq',
          'ops/network/tool/ifconfig',
          'ops/network/tool/iproute2',
          'ops/network/tool/iptables',
          'ops/network/tool/mitmproxy',
          'ops/network/tool/nmap',
          'ops/network/tool/powerdns',
          'ops/network/tool/wireshark',
        ]
      },
      'ops/network/standard/ieee-802',
    ],
    存储: [
      'ops/storage/intro',
      {
        type: 'category',
        label: '块存储',
        items: [
          'ops/storage/block/raid',
          'ops/storage/block/mdadm',
          'ops/storage/block/lvm',
        ]
      },
      {
        type: 'category',
        label: '文件存储',
        items: [
          'ops/storage/fs/intro',
          'ops/storage/fs/zfs',
          'ops/storage/fs/btrfs',
          'ops/storage/fs/fuse',
          'ops/storage/fs/nfs',
          'ops/storage/fs/smb',
          'ops/storage/fs/ntfs',
          // 'ops/storage/fs/zfs-tuning',
        ]
      },
      {
        type: 'category',
        label: '网络存储',
        items: [
          'ops/storage/network/share',
          'ops/storage/network/sshfs',
        ]
      },
    ],
    开发服务:[
      {
        type: 'category',
        label: 'Auth',
        items: [
          'dev/service/auth/auth',
          'dev/service/auth/keycloak',
          'dev/service/auth/keycloak-dev',
          'dev/service/auth/keycloak-faq',
          'dev/service/auth/louketo',
          'dev/service/auth/ldap',
          'dev/service/auth/ldap-schema',
          'dev/service/auth/ldif',
          'dev/service/auth/apacheds',
          'dev/service/auth/apacheds-ops',
          'dev/service/auth/apacheds-kerberos',
          'dev/service/auth/kerberos',
          'dev/service/auth/kerberos-faq',
          'dev/service/auth/oauth',
          'dev/service/auth/jwt',
          'dev/service/auth/auth-protocol',
          'dev/service/auth/auth-glossary',
        ],
      },
      {
        type: 'category',
        label: '内容管理',
        items: [
          'dev/service/cms/cms',
        ],
      },
      {
        type: 'category',
        label: '客户关系管理',
        items: [
          'dev/service/crm/crm-insight',
        ],
      },
      {
        type: 'category',
        label: '文件',
        items: [
          'dev/service/file/nextcloud',
          'dev/service/file/nextcloud-config',
          'dev/service/file/nextcloud-faq',
        ],
      },
      {
        type: 'category',
        label: '存储',
        items: [
          'dev/service/storage/minio',
          'dev/service/storage/ceph',
        ],
      },
      {
        type: 'category',
        label: '仓库',
        items: [
          'dev/service/repository/nexus',
        ],
      },
    ],
    运维: [
      {
        type: 'category',
        label: '服务',
        items: [
          'ops/service/remote-desktop',
          'ops/service/matomo',
        ],
      },
      {
        type: 'category',
        label: 'Gitlab',
        items: [
          'ops/service/gitlab-config',
          'ops/service/gitlab-cicd',
          'ops/service/gitlab-k8s',
        ],
      }
    ],
    VoIP: [
      'voip/voip-intro',
      'voip/hardware',
      'voip/glossary',
      {
        'type': 'category',
        'label': 'Asterisk',
        'items': [
          'voip/asterisk/intro',
          'voip/asterisk/version',
          'voip/asterisk/dev',
          'voip/asterisk/conf',
          'voip/asterisk/dialplan',
          'voip/asterisk/codec',
          'voip/asterisk/chan_dahdi',
          'voip/asterisk/chan_dongle',
          'voip/asterisk/reference',
          'voip/asterisk/glossory',
          'voip/asterisk/faq',
          'voip/asterisk/the-definitive-guide-4th',
        ]
      }
    ],
  },
};
