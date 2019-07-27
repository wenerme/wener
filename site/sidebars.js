module.exports = {
  docs: {
    语言: [
      'languages/languages',
      'languages/peg',
      'languages/php',
      'languages/zig',
    ],
    Java: [
      'java/java',
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
    AlpineLinux: [
      'ops/os/alpine/alpine',
      'ops/os/alpine/alpine-intro',
      'ops/os/alpine/alpine-ops',
      'ops/os/alpine/alpine-pkgs',
      'ops/os/alpine/alpine-faq',
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
    运维: [
      {
        type: 'category',
        label: '网络',
        items: [
          'ops/network/application/http',
          'ops/network/application/ssl',
          'ops/network/application/dns',

          'ops/network/link/wireless',
          'ops/network/link/infiniband',

          'ops/network/private/intro',
          'ops/network/private/tinc',

          'ops/network/standard/ieee-802',
        ]
      },
      {
        type: 'category',
        label: '存储',
        items: [
          'ops/storage/fs/zfs',
          // 'ops/storage/fs/zfs-tuning',
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
  },
};
