const moment = require('moment-timezone');
const math = require('remark-math');
const katex = require('rehype-katex');
const { writeFileSync } = require('fs');

// https://docusaurus.io/docs/api/docusaurus-config

/** @type {import('@docusaurus/types').Plugin} */
function RewritePlugin(context, options) {
  return {
    name: 'wener-rewrite-plugin',
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Wener Live & Life',
  tagline: "Passion I've found",
  url: 'https://wener.me',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'wenerme',
  projectName: 'wener',

  trailingSlash: false,
  // https://github.com/ToolJet/ToolJet/issues/852
  // https://github.com/facebook/docusaurus/issues/3136#issuecomment-664941437
  // onBrokenLinks: 'throw', // warn, ignore
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: 'notes',
          path: 'notes',
          sidebarPath: require.resolve('./sidebars.js'),

          editUrl: 'https://github.com/wenerme/wener/edit/master/',

          showLastUpdateTime: true,
          showLastUpdateAuthor: true,

          remarkPlugins: [math],
          rehypePlugins: [katex],

          sidebarItemsGenerator: async ({ defaultSidebarItemsGenerator, ...args }) => {
            const items = await defaultSidebarItemsGenerator(args);
            // items.forEach(v => {
            //   if (!v.id) {
            //     return;
            //   }
            //   let sp = v.id.split('/');
            //   if (sp.length <= 1) {
            //     return;
            //   }
            //   // alpine/alpine-version
            //   let parent = sp.at(-2);
            //   let last = sp.at(-1);
            //   if (last.startsWith(parent)) {
            //     last = last.substring(parent.length + 1);
            //     sp.pop();
            //     sp.push(last);
            //     console.log(`Mapping`, v.id, sp.join('/'));
            //   }
            // });
            // console.log(`Generate items`);
            writeFileSync('items.json', JSON.stringify(items, null, 2));
            // process.exit(1)
            return items;
          },
        },
        blog: {
          routeBasePath: 'story',
          path: 'story',
          include: ['**/*.md', '**/*.mdx'],
          truncateMarker: /<!--\s*more\s*-->/,
          editUrl: 'https://github.com/wenerme/wener/edit/master/',

          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          // cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: 'daily',
          priority: 0.5,
        },
        gtag: {
          trackingID: 'UA-30404720-1',
        },
        googleAnalytics: {
          trackingID: 'UA-30404720-1',
        },
      }),
    ],
  ],
  themeConfig: /** @type {import('@docusaurus/preset-classic').ThemeConfig} */ {
    prism: {
      // https://prismjs.com/#supported-languages
      additionalLanguages: [
        // 'go-mod', // error in current version
        'go',
        'graphql',
        'hcl',
        'ini',
        'java',
        'nginx',
        'php',
        'promql',
        'properties',
        'protobuf',
        'toml',
        // 'ts',
        'makefile',
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },

    algolia: {
      appId: '37P8DMWBKF',
      apiKey: '2c9df87f2ccde17db1ccfc2886b03765',
      indexName: 'wener',
      // no mutli lang, version
      contextualSearch: false,
      searchParameters: {},
    },
    navbar: {
      title: 'Wener',
      logo: {
        alt: 'Wener Logo',
        src: 'img/wener-logo-head.svg',
      },
      items: [
        { to: 'notes', label: '笔记', position: 'left' },
        { to: 'story', label: '故事', position: 'left' },
        {
          href: 'https://github.com/wenerme/wener',
          label: 'GitHub',
          position: 'right',
        },
        { to: 'notes/howto/network/dns-prevent-spoofing', label: '指南', position: 'left' },
        // { to: 'notes/tool/network/ip-lookup', label: '工具', position: 'left' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '笔记',
          items: [
            {
              label: 'Java',
              to: 'notes/java',
            },
            {
              label: 'AlpineLinux',
              to: 'notes/os/alpine',
            },
            {
              label: 'Kubernates',
              to: 'notes/devops/kubernetes',
            },
            {
              label: 'VoIP',
              to: 'notes/voip',
            },
          ],
        },
        {
          title: 'Projects',
          items: [
            {
              // label: 'Wener',
              // href: 'https://github.com/wenerme/wener',
              html: `
              <div>
              <a class='footer__link-item' href='https://github.com/wenerme/wener'>Wener</a>
              - <a class='footer__link-item' href='https://github.com/wenerme/wener/actions' title='wenerme/wener - ci'>
                <img style='vertical-align: middle;opacity: .4;' src='https://github.com/wenerme/wener/workflows/Build/badge.svg'/>
                </a>
              </div>
              `,
            },
            {
              label: "Wener's Apis",
              href: 'https://apis.wener.me',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'story',
            },
            {
              label: 'GitHub',
              to: 'https://github.com/wenerme',
            },
            {
              label: 'Twitter',
              to: 'https://twitter.com/wenerme',
            },
          ],
        },
      ],
      logo: {
        alt: 'Wener Site',
        src: 'img/wener-logo.svg',
      },
      copyright: `Copyright © 1992-${new Date().getFullYear()} Wener - <img alt='cc-by-sa-4.0' src='https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by-sa.svg' /> - Build @${moment()
        .tz('Asia/Shanghai')
        .format('YYYY-MM-DD HH:mm')}`,
    },
  },
  // i18n: {
  //   defaultLocale: 'zh',
  //   locales: ['zh', 'en'],
  // },
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          {
            to: '/story',
            from: ['/blog'],
          },
        ],
        createRedirects: function (existingPath) {
          if (existingPath.startsWith('/story/')) {
            return ['/blog/' + existingPath.substring('/story/'.length)];
          }
          return [];
        },
      },
    ],
    RewritePlugin,
  ],

  themes: ['@docusaurus/theme-live-codeblock'],

  stylesheets: [
    'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
    // {
    //   href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
    //   integrity: 'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
    //   crossorigin: 'anonymous',
    // },
  ],
};
module.exports = config;
