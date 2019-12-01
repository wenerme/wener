/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const path = require('path');

module.exports = {
  title: 'Wener Live & Life',
  tagline: 'Passion I\'ve found',
  url: 'https://wener.me',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'wenerme',
  projectName: 'wener',
  themeConfig: {
    navbar: {
      title: 'Wener',
      logo: {
        alt: 'Wener Logo',
        src: 'img/wener-logo-head.svg',
      },
      links: [
        {to: 'notes/languages/languages', label: '笔记', position: 'left'},
        {to: 'blog', label: '故事', position: 'left'},
        {
          href: 'https://github.com/wenerme/wener',
          label: 'GitHub',
          position: 'right',
        },
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
              to: 'notes/java/java',
            },
            {
              label: 'AlpineLinux',
              to: 'notes/ops/os/alpine/alpine',
            },
            {
              label: '语言',
              to: 'notes/languages/languages',
            },
          ],
        },
        {
          title: 'Projects',
          items: [
            {
              label: 'Wener',
              href: 'https://github.com/wenerme/wener',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
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
      copyright: `Copyright © 1992-${new Date().getFullYear()} Wener 🦖️`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          path: '../tricks',
          routeBasePath: 'notes',
        },
        blog: {
          path: '../story',
          include: ['**/*.md', '**/*.mdx'],
          truncateMarker: /<!--\s*more\s*-->/,
          mdxLoaderOptions: {
            // onInput: require('./extensions/onMdxInput'),
            // onRemarkPlugins: require('./extensions/onRemarkPlugins'),
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        googleAnalytics: {
          trackingID: 'UA-30404720-1',
        },
      },
    ],
  ],
};
