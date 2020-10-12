const path = require("path");
const moment = require("moment-timezone");

module.exports = {
  title: "Wener Live & Life",
  tagline: "Passion I've found",
  url: "https://wener.me",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "wenerme",
  projectName: "wener",
  plugins: [],
  themeConfig: {
    googleAnalytics: {
      trackingID: "UA-30404720-1",
    },
    gtag: {
      trackingID: "UA-30404720-1",
    },
    navbar: {
      title: "Wener",
      logo: {
        alt: "Wener Logo",
        src: "img/wener-logo-head.svg",
      },
      items: [
        { to: "notes/java/java", label: "笔记", position: "left" },
        { to: "blog", label: "故事", position: "left" },
        {
          href: "https://github.com/wenerme/wener",
          label: "GitHub",
          position: "right",
        },
        { to: "notes/howto/network/dns-prevent-spoofing", label: "指南", position: "left" },
        { to: "notes/tool/network/ip-lookup", label: "工具", position: "left" },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "笔记",
          items: [
            {
              label: "Java",
              to: "notes/java/java",
            },
            {
              label: "AlpineLinux",
              to: "notes/ops/os/alpine/alpine",
            },
            {
              label: "Kubernates",
              to: "notes/devops/kubernetes/k8s-intro",
            },
            {
              label: "VoIP",
              to: "notes/voip/voip-intro",
            },
          ],
        },
        {
          title: "Projects",
          items: [
            {
              // label: 'Wener',
              // href: 'https://github.com/wenerme/wener',
              html: `
              <div>
              <a class="footer__link-item" href="https://github.com/wenerme/wener">Wener</a>
              - <a class="footer__link-item" href="https://travis-ci.com/wenerme/wener" title="wenerme/wener - travis-ci">
                <img style="vertical-align: middle;opacity: .4;" src="https://travis-ci.com/wenerme/wener.svg?branch=master"/>
                </a>
              - <a class="footer__link-item" href="https://github.com/wenerme/wenerme.github.io/deployments" title="GitHub Pages 部署">部署状态</a>
              </div>
              `,
            },
            {
              label: "Wener's Apis",
              href: "https://apis.wener.me",
            },
          ],
        },
        {
          title: "Social",
          items: [
            {
              label: "Blog",
              to: "blog",
            },
            {
              label: "GitHub",
              to: "https://github.com/wenerme",
            },
            {
              label: "Twitter",
              to: "https://twitter.com/wenerme",
            },
          ],
        },
      ],
      logo: {
        alt: "Wener Site",
        src: "img/wener-logo.svg",
      },
      copyright: `Copyright © 1992-${new Date().getFullYear()} Wener - 构建时间 ${moment()
        .tz("Asia/Shanghai")
        .format("YYYY-MM-DD HH:mm")}`,
    },
  },
  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          path: "./contents/notes",
          routeBasePath: "notes",
        },
        blog: {
          path: "./contents/story",
          include: ["**/*.md", "**/*.mdx"],
          truncateMarker: /<!--\s*more\s*-->/,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          cacheTime: 600 * 1000, // 600 sec - cache purge period
          changefreq: "weekly",
          priority: 0.5,
          trailingSlash: false,
        },
      },
    ],
  ],
};
