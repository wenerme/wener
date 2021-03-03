const YAML = require('yaml');
const fs = require('fs');
const all = JSON.parse(fs.readFileSync('docs.json').toString());

const verbose = process.env.verbose;

function items(opt, opt2) {
  if (typeof opt === 'string') {
    const s = opt;
    let { excludes = [] } = opt2 || {};
    excludes = excludes.map((v) => `${s}/${v}`);
    opt = { prefix: s, excludes };
  }

  const { prefix, excludes = [] } = opt;

  let r = all.filter((v) => v.refId.startsWith(prefix));
  for (const ex of excludes) {
    r = r.filter((v) => !v.refId.startsWith(ex));
  }
  r.filter((v) => {
    const ok = !v.refed;
    v.refed = v.refed || prefix;
    return ok;
  });
  verbose && console.log(`items ${prefix} - [${excludes.join(',')}] :`, r.length);
  if (r.length === 0) {
    console.error(`items ${prefix} - [${excludes.join(',')}] : No items`);
  }
  return r.map((v) => v.refId);
}

function match(m, v) {
  if (m.test) {
    return m.test(v);
  }
  return m.startsWith(v);
}

function mark(...a) {
  return a;
}

module.exports = {
  docs: {
    Java: [
      ...items('java', { excludes: ['version', 'spring', 'library'] }),
      {
        type: 'category',
        label: '版本',
        items: items({ prefix: 'java/version' }),
      },
      {
        type: 'category',
        label: 'Spring',
        items: items({ prefix: 'java/spring' }),
      },
      {
        type: 'category',
        label: 'Library',
        items: items({ prefix: 'java/library' }),
      },
    ],
    前端技术: [
      {
        type: 'category',
        label: '框架',
        items: items({ prefix: 'web/framework' }),
      },
      {
        type: 'category',
        label: 'React',
        items: items({ prefix: 'web/react' }),
      },
      {
        type: 'category',
        label: 'NodeJS',
        items: items({ prefix: 'web/node' }),
      },
      ...items({ prefix: 'web' }),
    ],
    语言: [
      ...items({ prefix: 'languages', excludes: ['go'] }),
      {
        type: 'category',
        label: 'Golang',
        items: items({ prefix: 'languages/go' }),
      },
    ],
    开发: [
      {
        type: 'category',
        label: '构建',
        items: items('dev/build'),
      },
      ...items('dev'),
    ],
    开发运维: [
      ...items('devops/intro'),
      {
        type: 'category',
        label: '指标监控',
        items: items({ prefix: 'devops/metrics' }),
      },
      {
        type: 'category',
        label: '调用链',
        items: items({ prefix: 'devops/tracing' }),
      },
      {
        type: 'category',
        label: '日志',
        items: items({ prefix: 'service/logging' }),
      },
      {
        type: 'category',
        label: '服务',
        items: items({ prefix: 'devops/service' }),
      },
      {
        type: 'category',
        label: 'Web',
        items: items({ prefix: 'devops/web' }),
      },
      {
        type: 'category',
        label: '平台服务',
        items: items({ prefix: 'devops/xaas' }),
      },
      ...items({ prefix: 'devops' }),
    ],
    AlpineLinux: [...items({ prefix: 'os/alpine' })],
    Docker: [...items({ prefix: 'devops/docker' })],
    Kubernetes: [
      ...items('devops/kubernetes', {
        excludes: ['network', 'storage', 'app', 'platform'],
      }),
      {
        type: 'category',
        label: '网络',
        items: items('devops/kubernetes/network'),
      },
      {
        type: 'category',
        label: '存储',
        items: items('devops/kubernetes/storage'),
      },
      {
        type: 'category',
        label: '平台',
        items: items('devops/kubernetes/platform'),
      },
      {
        type: 'category',
        label: '应用',
        items: items('devops/kubernetes/app'),
      },
    ],
    Linux: [
      ...items('os/linux/linux'),
      {
        type: 'category',
        label: '启动',
        items: items('os/linux/boot'),
      },
      {
        type: 'category',
        label: '网络',
        items: items('os/linux/network'),
      },
      ...items('os/linux'),
    ],
    虚拟化: [...items('os/virt')],
    操作系统: [
      {
        type: 'category',
        label: 'Darwin',
        items: items('os/darwin'),
      },
      {
        type: 'category',
        label: 'Windows',
        items: items('os/windows'),
      },
      {
        type: 'category',
        label: 'Centos',
        items: items('os/centos'),
      },
      {
        type: 'category',
        label: 'Busybox',
        items: items('os/busybox'),
      },
      {
        type: 'category',
        label: '网络操作系统',
        items: items('os/network'),
      },
      ...items('os'),
    ],
    指南: [
      {
        type: 'category',
        label: '运维',
        items: items('howto/ops'),
      },
      {
        type: 'category',
        label: '网络',
        items: items('howto/network'),
      },
      ...items('howto'),
    ],
    系统管理: items('ops/admin'),
    基础设施: items('ops/infra'),
    工具: [
      {
        type: 'category',
        label: '网络',
        items: items('tool/network'),
      },
    ],
    数据库: [
      ...items('db/db'),
      {
        type: 'category',
        label: 'PostgreSQL',
        items: items('db/relational/postgresql'),
      },
      {
        type: 'category',
        label: '关系型',
        items: items('db/relational', { excludes: ['postgresql'] }),
      },
      {
        type: 'category',
        label: '文档型',
        items: items('db/document'),
      },
      {
        type: 'category',
        label: '键值型',
        items: items('db/kv'),
      },
      ...items('db'),
    ],
    参考: [
      ...items('reference', { excludes: ['software', 'growth', 'cook'] }),
      {
        type: 'category',
        label: '软件',
        items: items('reference/software'),
      },
      {
        type: 'category',
        label: '用户增长',
        items: items('reference/growth'),
      },
      {
        type: 'category',
        label: '烹饪',
        items: items('reference/cook'),
      },
    ],
    网络: [
      {
        type: 'category',
        label: '应用',
        items: items('ops/network/application'),
      },
      {
        type: 'category',
        label: '链路',
        items: items('ops/network/link'),
      },
      {
        type: 'category',
        label: '私有',
        items: items('ops/network/private'),
      },
      {
        type: 'category',
        label: '工具',
        items: items('ops/network/tool'),
      },
      ...items('ops/network'),
    ],
    存储: [
      ...items('ops/storage', { excludes: ['block', 'fs', 'network'] }),
      {
        type: 'category',
        label: '块存储',
        items: items('ops/storage/block'),
      },
      {
        type: 'category',
        label: '文件存储',
        items: items('ops/storage/fs'),
      },
      {
        type: 'category',
        label: '网络存储',
        items: items('ops/storage/network'),
      },
    ],
    服务: [
      {
        type: 'category',
        label: 'Auth',
        items: items('service/auth'),
      },
      {
        type: 'category',
        label: '内容管理',
        items: items('service/cms'),
      },
      {
        type: 'category',
        label: 'Office',
        items: items('service/office'),
      },
      {
        type: 'category',
        label: '客户关系管理',
        items: items('service/crm'),
      },
      {
        type: 'category',
        label: '文件',
        items: items('service/file'),
      },
      {
        type: 'category',
        label: '存储',
        items: items('service/storage'),
      },
      {
        type: 'category',
        label: '网络',
        items: items('service/network'),
      },
      {
        type: 'category',
        label: '仓库',
        items: items('service/repository'),
      },
      ...items('service'),
    ],
    运维: [
      {
        type: 'category',
        label: '服务',
        items: items('ops/service', { excludes: ['gitlab-'] }),
      },
      {
        type: 'category',
        label: 'Gitlab',
        items: items('ops/service/gitlab'),
      },
    ],
    硬件: [
      {
        type: 'category',
        label: '硬件',
        items: [...items('hardware')],
      },
    ],
    算法: [
      {
        type: 'category',
        label: '计算机视觉',
        items: [...items('algorithm/cv')],
      },
    ],
    VoIP: [
      ...items('voip', { excludes: ['asterisk'] }),
      {
        type: 'category',
        label: 'Asterisk',
        items: items('voip/asterisk'),
      },
    ],
    医学: [...items('medicine')],
  },
};

const rest = all.filter((v) => !v.refed);
console.log(`outof sidebar :`, rest.length);
fs.writeFileSync(
  'sidebar.rest.txt',
  rest
    .map((v) => v.refId)
    .sort()
    .join('\n'),
);
