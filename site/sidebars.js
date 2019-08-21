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
      'java/libs/productive',
    ],
    语言: [
      'languages/languages',
      'languages/peg',
      'languages/php',
      'languages/zig',
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
    操作系统: [
      {
        type: 'category',
        label: 'Darwin',
        items: [
          'ops/os/darwin/darwin',
          'ops/os/darwin/macOs',
          'ops/os/darwin/brew',
        ]
      }
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
          'ops/network/link/wireless',
          'ops/network/link/infiniband',
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
          'ops/network/tool/iptable',
          // 'ops/network/tool/mitmproxy',
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
      {
        type: 'category',
        label: '存储服务',
        items: [
          'ops/storage/service/minio',
          'ops/storage/service/nextcloud',
        ]
      },
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
          'voip/asterisk/dev',
          'voip/asterisk/chan_dahdi',
          'voip/asterisk/chan_dongle',
          'voip/asterisk/reference',
          'voip/asterisk/faq',
          'voip/asterisk/the-definitive-guide-4th',
        ]
      }
    ],
    数据库: [
      {
        type: 'category',
        label: 'SQL',
        items: [],
      },
      {
        type: 'category',
        label: 'NoSQL',
        items: [],
      },
      {
        type: 'category',
        label: 'Cloud',
        items: [],
      },
    ],
  },
};
