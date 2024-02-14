# Wener Site


```bash
# 升级 @docusaurus/core 后需要重新 patch
pnpm patch @docusaurus/plugin-content-docs
```

- ID prefix 处理
  - `/a/a-b/` -> `/a-b/`
- 内容过滤，只包含有 frontmatter 的文件
  - `--` 开头的文件

```diff
diff --git a/lib/docs.js b/lib/docs.js
index 32b77c3661adbeda0a0ab7e898c969c1a6242a1c..f06a68fa6d24ee7c37b6fc049c9a4c1a31ebfa1a 100644
--- a/lib/docs.js
+++ b/lib/docs.js
@@ -108,7 +108,7 @@ async function doProcessDocMetadata({ docFile, versionMetadata, context, options
         frontMatterSlug: frontMatter.slug,
         stripDirNumberPrefixes: parseNumberPrefixes,
         numberPrefixParser: options.numberPrefixParser,
-    });
+    }).replace(/\/([^\/]+)\/([^\/]+)\/\1-\2-/, '/$1/$2/').replace(/\/([^/]+)\/\1-/,'/$1/').replace(/\/(kubernetes)\/k8s-/,'/$1/');
     // Note: the title is used by default for page title, sidebar label,
     // pagination buttons... frontMatter.title should be used in priority over
     // contentTitle (because it can contain markdown/JSX syntax)
diff --git a/lib/index.js b/lib/index.js
index 13101ac2bd8112fd6699cb604a3cbe04b73bc936..c9a4120b1ed0e5daef847ed0173c8282c9445655 100644
--- a/lib/index.js
+++ b/lib/index.js
@@ -82,7 +82,8 @@ async function pluginContentDocs(context, options) {
                         env,
                     });
                 }
-                return Promise.all(docFiles.map(processVersionDoc));
+                console.log(`Inject custom docs filter`);
+                return Promise.all(docFiles.filter(v=>v.content.startsWith('--')).map(processVersionDoc));
             }
             async function doLoadVersion(versionMetadata) {
                 const docsBase = await loadVersionDocsBase(versionMetadata);
```
