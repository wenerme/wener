"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["36922"],{80871:function(e,n,s){s.r(n),s.d(n,{metadata:()=>o,contentTitle:()=>c,default:()=>h,assets:()=>i,toc:()=>a,frontMatter:()=>t});var o=JSON.parse('{"id":"languages/php/composer","title":"composer","description":"- https://repo.packagist.org/","source":"@site/../notes/languages/php/composer.md","sourceDirName":"languages/php","slug":"/languages/php/composer","permalink":"/notes/languages/php/composer","draft":false,"unlisted":false,"editUrl":"https://github.com/wenerme/wener/edit/master/notes/../notes/languages/php/composer.md","tags":[],"version":"current","lastUpdatedBy":"wener","lastUpdatedAt":1734683606000,"frontMatter":{"title":"composer"},"sidebar":"docs","previous":{"title":"PHP","permalink":"/notes/languages/php/"},"next":{"title":"hyperf","permalink":"/notes/languages/php/hyperf"}}'),r=s("52676"),p=s("79938");let t={title:"composer"},c="composer",i={},a=[{value:"composer.json",id:"composerjson",level:2},{value:"config",id:"config",level:2},{value:"auth.json",id:"authjson",level:2},{value:"file_put_contents(./composer.lock): Failed to open stream: Permission denied",id:"file_put_contentscomposerlock-failed-to-open-stream-permission-denied",level:2}];function l(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",pre:"pre",ul:"ul",...(0,p.a)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"composer",children:"composer"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://repo.packagist.org/",children:"https://repo.packagist.org/"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://repo.packagist.org/mirrors",children:"https://repo.packagist.org/mirrors"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://packagist.pages.dev/",children:"https://packagist.pages.dev/"})}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://pkg.xyz/",children:"https://pkg.xyz/"})}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:"https://mirrors.aliyun.com/composer/composer.phar",children:"https://mirrors.aliyun.com/composer/composer.phar"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://developer.aliyun.com/composer",children:"https://developer.aliyun.com/composer"})}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# v1 \u5347\u7EA7\u5230 v2\ncomposer self-update --2\n\n# macOS\nbrew install composer\n# \u5168\u5C40\u4ED3\u5E93\u955C\u50CF\ncomposer config -g repos.packagist composer https://packagist.pages.dev\n# \u963F\u91CC\u4E91\n# composer config -g repos.packagist composer https://mirrors.aliyun.com/composer/\n# \u4E0A\u6D77\u4EA4\u5927\n# composer config -g repos.packagist composer https://packagist.mirrors.sjtug.sjtu.edu.cn\n\n# \u7981\u7528\ncomposer config -g --unset repos.packagist\n\ncomposer init\n# \u5355\u9879\u76EE\u4ED3\u5E93\u955C\u50CF\ncomposer config repos.packagist composer https://mirrors.aliyun.com/composer/\n\ncomposer dump-autoload -o\n\n# \u9879\u76EE \u5B89\u88C5 composer\nphp -r \"copy('https://getcomposer.org/installer', 'composer-setup.php');\"\n# --install-dir\n# --filename\n# --version\nphp composer-setup.php\nphp -r \"unlink('composer-setup.php');\"\n\nphp composer.phar init\n\nphp composer.phar update\n\ncomposer config --list\ncomposer config --global\n\n# \u624B\u52A8\u5B89\u88C5\nphp -r \"copy('https://install.phpcomposer.com/installer', 'composer-setup.php');\" \\\n  && php composer-setup.php \\\n  && php -r \"unlink('composer-setup.php');\" \\\n  && mv composer.phar /usr/local/bin/composer\n\n# CI\ncomposer install --no-ansi --no-dev --no-interaction --no-plugins --no-progress --no-scripts --optimize-autoloader\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-php",children:"<?php\nrequire __DIR__ . '/vendor/autoload.php';\n"})}),"\n",(0,r.jsx)(n.h2,{id:"composerjson",children:"composer.json"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"# \u53EF\u4EE5\u901A\u8FC7 config.platform \u8986\u76D6\ncomposer show --platform\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",metastring:'title="composer.json"',children:'{\n  "name": "vendor-name/package-name",\n  "description": "This is a package",\n  // library - \u9ED8\u8BA4 - \u4F1A\u5C06\u6587\u4EF6 copy \u5230 vendor\n  // project - \u9879\u76EE\n  // metapackage\n  // composer-plugin\n  // php-ext\n  // php-ext-zend\n  "type": "library",\n  "license": "MIT",\n  "license": [],\n  "keywords": [],\n  "homepage": "https://example.com",\n  "readme": "README.md",\n  // \u53D1\u5E03\u65F6\u95F4\n  // YYYY-MM-DD, YYYY-MM-DD HH:MM:SS\n  "time": "2021-01-01",\n  "authors": [\n    {\n      "name": "Author Name",\n      "email": "",\n      "homepage": "",\n      "role": ""\n    }\n  ],\n  "support": {},\n  // {type,url}[]\n  "funding":[],\n  "require": {\n    "php": "^7.4",\n    "vendor-name/package-name": "^1.0"\n  },\n  "require-dev": {\n    "phpunit/phpunit": "^9.5"\n  },\n  "autoload": {\n    "psr-4": {\n      "VendorName\\\\PackageName\\\\": "src/"\n    }\n  },\n  "autoload-dev": {\n    "psr-4": {\n      "VendorName\\\\PackageName\\\\Tests\\\\": "tests/"\n    }\n  },\n  "scripts": {\n    "test": "phpunit"\n  },\n  // https://getcomposer.org/doc/06-config.md\n  "config":{}\n}\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://getcomposer.org/schema.json",children:"https://getcomposer.org/schema.json"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://getcomposer.org/doc/04-schema.md",children:"https://getcomposer.org/doc/04-schema.md"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"config",children:"config"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["$HOME/.composer - data-dir/home\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"auth.json"}),"\n",(0,r.jsx)(n.li,{children:"config.json"}),"\n",(0,r.jsx)(n.li,{children:"keys.dev.pub"}),"\n",(0,r.jsx)(n.li,{children:"keys.tags.pub"}),"\n",(0,r.jsxs)(n.li,{children:["cache/ - cache-dir macOS ~/Library/Caches/composer\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"files/"}),"\n",(0,r.jsx)(n.li,{children:"repo/"}),"\n",(0,r.jsx)(n.li,{children:"vcs/"}),"\n"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://getcomposer.org/doc/06-config.md",children:"https://getcomposer.org/doc/06-config.md"})}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"authjson",children:"auth.json"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["COMPOSER_AUTH\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u53EF\u4EE5\u5B58\u50A8 json"}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:"https://getcomposer.org/doc/03-cli.md#composer-auth",children:"https://getcomposer.org/doc/03-cli.md#composer-auth"})}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-json",metastring:'title="~/.composer/auth.json"',children:'{\n  "bitbucket-oauth": {},\n  "github-oauth": {},\n  "gitlab-oauth": {},\n  "gitlab-token": {},\n  "http-basic": {\n    "try.gitea.com": {\n      "username": "wener",\n      "password": ""\n    }\n  },\n  "bearer": {}\n}\n'})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"gitea \u53EF\u4EE5\u4F7F\u7528 PAT"}),"\n"]}),"\n",(0,r.jsx)(n.h1,{id:"faq",children:"FAQ"}),"\n",(0,r.jsx)(n.h2,{id:"file_put_contentscomposerlock-failed-to-open-stream-permission-denied",children:"file_put_contents(./composer.lock): Failed to open stream: Permission denied"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-bash",children:"chown $USER .\nsudo chown -R $USER ~/.composer/\n"})})]})}function h(e={}){let{wrapper:n}={...(0,p.a)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(l,{...e})}):l(e)}},79938:function(e,n,s){s.d(n,{Z:function(){return c},a:function(){return t}});var o=s(75271);let r={},p=o.createContext(r);function t(e){let n=o.useContext(p);return o.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),o.createElement(p.Provider,{value:n},e.children)}}}]);