"use strict";(self.webpackChunkwener_website=self.webpackChunkwener_website||[]).push([["65215"],{7621:function(n,s,e){e.r(s),e.d(s,{assets:function(){return c},contentTitle:function(){return l},default:function(){return d},frontMatter:function(){return i},metadata:function(){return r},toc:function(){return o}});var r=e(78010),t=e(52676),a=e(79938);let i={slug:"decrypt-classfinal-jar",title:"\u89E3\u5BC6 ClassFinal \u52A0\u5BC6\u7684 Java Jar \u5305",tags:["Java","Decrypt"]},l="\u89E3\u5BC6 ClassFinal \u52A0\u5BC6\u7684 Java Jar \u5305",c={authorsImageUrls:[]},o=[];function p(n){let s={a:"a",admonition:"admonition",code:"code",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"https://github.com/roseboy/classfinal",children:"ClassFinal"})," \u662F\u4E00\u6B3Ejava class\u6587\u4EF6\u5B89\u5168\u52A0\u5BC6\u5DE5\u5177\uFF0C\u652F\u6301\u76F4\u63A5\u52A0\u5BC6jar\u5305\u6216war\u5305\uFF0C\u65E0\u9700\u4FEE\u6539\u4EFB\u4F55\u9879\u76EE\u4EE3\u7801\uFF0C\u517C\u5BB9spring-framework\uFF1B\u53EF\u907F\u514D\u6E90\u7801\u6CC4\u6F0F\u6216\u5B57\u8282\u7801\u88AB\u53CD\u7F16\u8BD1\u3002"]}),"\n",(0,t.jsx)(s.p,{children:(0,t.jsx)(s.strong,{children:"\u8981\u70B9"})}),"\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\u62FF\u5230 password\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsxs)(s.li,{children:["\u53EF\u80FD\u5185\u7F6E\u4E86\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"META-INF/.classes/org.springframework.config.Pass"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\u53EF\u80FD\u9700\u8981\u901A\u8FC7\u5916\u90E8\u65B9\u5F0F\u83B7\u53D6\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"\u547D\u4EE4\u884C\u53C2\u6570\u6216\u8005\u73AF\u5883\u53D8\u91CF\u6216\u8005\u62E6\u622A Class \u52A0\u8F7D"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"\u603B\u7684\u6765\u8BF4\u6BD4\u8F83\u5BB9\u6613\u83B7\u53D6"}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(s.li,{children:["\u5C06 jar \u6DFB\u52A0\u5230 classpath - \u65B9\u4FBF\u76F4\u63A5\u8C03\u7528 net.roseboy.classfinal \u5185\u5185\u5BB9\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"\u901A\u8FC7 IDE \u6216\u8005\u901A\u8FC7\u547D\u4EE4\u884C\u53C2\u6570"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.li,{children:"\u89E3\u538B jar \u5230\u5F53\u524D \u76EE\u5F55 tmp"}),"\n",(0,t.jsx)(s.li,{children:"\u89E3\u5BC6 class"}),"\n",(0,t.jsx)(s.li,{children:"\u53CD\u7F16\u8BD1\u5F97\u5230 java"}),"\n",(0,t.jsx)(s.li,{children:"\u6DFB\u52A0 lib \u76EE\u5F55\u5230 classpath"}),"\n",(0,t.jsxs)(s.li,{children:["\u901A\u8FC7 IDEA \u53EF\u76F4\u63A5\u8C03\u7528\u539F\u59CB jar \u91CC\u5185\u5BB9\u6216\u76F4\u63A5\u542F\u52A8 Application\n",(0,t.jsxs)(s.ul,{children:["\n",(0,t.jsx)(s.li,{children:"\u53EF\u80FD\u9700\u8981\u4FEE\u6539\u53CD\u7F16\u8BD1\u540E\u7684 java \u6587\u4EF6 - \u90E8\u5206\u53CD\u7F16\u8BD1\u8BED\u6CD5\u9519\u8BEF"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-java",metastring:'title="DecryptClassFinal.java"',children:'package main;\n\nimport net.roseboy.classfinal.JarDecryptor;\nimport net.roseboy.classfinal.util.EncryptUtils;\nimport net.roseboy.classfinal.util.StrUtils;\n\nimport java.io.File;\nimport java.io.IOException;\nimport java.nio.file.Files;\nimport java.nio.file.Path;\n\npublic class DecryptClassFinal {\n    public static void main(String[] args) throws IOException {\n        String src =System.getProperty("user.dir") +  "/tmp/META-INF/.classes";\n        String dst = System.getProperty("user.dir") + "/src/main/class";\n\n        File srcDir = new File(src);\n        JarDecryptor.getInstance();\n        // \u9ED8\u8BA4 password \u4F4D\u7F6E\n        String pass = Files.readString(Path.of(src+"/org.springframework.config.Pass"));\n        char[] password =  EncryptUtils.md5(pass.toCharArray());\n\n        System.out.printf("src:%s\\n", src);\n        System.out.printf("dst:%s\\n", dst);\n        System.out.printf("password:%s\\n", pass);\n\n        if (srcDir.isDirectory()) {\n            for (File file : srcDir.listFiles()) {\n                String fp = file.getName();\n                if (fp.startsWith("org.springframework")) {\n                    continue;\n                }\n\n                byte[] fileBytes = Files.readAllBytes(file.toPath());\n                byte[] out = dec(password, fp, fileBytes);\n\n                String[] split = fp.split("[.]");\n                String fn = split[split.length-1];\n\n                String p = dst+"/"+ fp.substring(0, fp.lastIndexOf(\'.\')).replaceAll("[.]", "/");\n                new File(p).mkdirs();\n                String f = p+"/"+ fn +".class";\n\n                System.out.println("Write to: "+f+" Len:"+out.length);\n                Files.write(new File(f).toPath(), out);\n            }\n        }\n\n    }\n\n    public static byte[] dec(char[] password, String fileName, byte[] bytes){\n        char[] pass;\n        pass = StrUtils.merger(new char[][]{password, fileName.toCharArray()});\n        return  EncryptUtils.de(bytes, pass, 1);\n    }\n}\n'})}),"\n",(0,t.jsx)(s.p,{children:"\u8FD0\u884C main \u540E src/main/class \u76EE\u5F55\u4E0B\u4F1A\u751F\u6210\u89E3\u5BC6\u540E\u7684 class \u6587\u4EF6\u3002"}),"\n",(0,t.jsx)(s.pre,{children:(0,t.jsx)(s.code,{className:"language-bash",metastring:'title="\u53CD\u7F16\u8BD1 class \u4E3A java"',children:"# \u5047\u8BBE\u662F macOS \u5B89\u88C5\u7684 IDEA\n# IDEA \u81EA\u5E26\u7684\u53CD\u7F16\u8BD1\u5DE5\u5177\u89E3\u5BC6\u5373\u53EF\njava -cp ~/Applications/IntelliJ\\ IDEA\\ Ultimate.app/Contents/plugins/java-decompiler/lib/java-decompiler.jar \\\n  org.jetbrains.java.decompiler.main.decompiler.ConsoleDecompiler \\\n  -dgs=true \\\n  src/main/class/ src/main/java/\n"})}),"\n",(0,t.jsx)(s.p,{children:"\u6267\u884C\u540E src/main/java \u76EE\u5F55\u4E0B\u4F1A\u751F\u6210\u53CD\u7F16\u8BD1\u540E\u7684 java \u6587\u4EF6\u3002"}),"\n",(0,t.jsx)(s.admonition,{type:"tip",children:(0,t.jsx)(s.p,{children:"\u89E3\u538B\u5F97\u5230\u7684 lib \u76EE\u5F55(sprint-boot \u7684 jar)\uFF0C\u53EF\u4EE5\u76F4\u63A5\u52A0\u5165\u5230 classpath \u4E2D\uFF0C\u7136\u540E\u5373\u53EF\u76F4\u63A5\u5728\u4EE3\u7801\u4E2D\u8C03\u7528 jar \u6216\u8005\u76F4\u63A5\u8FD0\u884C Application\u3002"})})]})}function d(n={}){let{wrapper:s}={...(0,a.a)(),...n.components};return s?(0,t.jsx)(s,{...n,children:(0,t.jsx)(p,{...n})}):p(n)}},79938:function(n,s,e){e.d(s,{Z:function(){return l},a:function(){return i}});var r=e(75271);let t={},a=r.createContext(t);function i(n){let s=r.useContext(a);return r.useMemo(function(){return"function"==typeof n?n(s):{...s,...n}},[s,n])}function l(n){let s;return s=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:i(n.components),r.createElement(a.Provider,{value:s},n.children)}},78010:function(n){n.exports=JSON.parse('{"permalink":"/story/decrypt-classfinal-jar","editUrl":"https://github.com/wenerme/wener/edit/master/story/../story/2024/2024-09-18-decrypt-classfinal-jar.md","source":"@site/../story/2024/2024-09-18-decrypt-classfinal-jar.md","title":"\u89E3\u5BC6 ClassFinal \u52A0\u5BC6\u7684 Java Jar \u5305","description":"ClassFinal \u662F\u4E00\u6B3Ejava class\u6587\u4EF6\u5B89\u5168\u52A0\u5BC6\u5DE5\u5177\uFF0C\u652F\u6301\u76F4\u63A5\u52A0\u5BC6jar\u5305\u6216war\u5305\uFF0C\u65E0\u9700\u4FEE\u6539\u4EFB\u4F55\u9879\u76EE\u4EE3\u7801\uFF0C\u517C\u5BB9spring-framework\uFF1B\u53EF\u907F\u514D\u6E90\u7801\u6CC4\u6F0F\u6216\u5B57\u8282\u7801\u88AB\u53CD\u7F16\u8BD1\u3002","date":"2024-09-18T00:00:00.000Z","tags":[{"inline":true,"label":"Java","permalink":"/story/tags/java"},{"inline":true,"label":"Decrypt","permalink":"/story/tags/decrypt"}],"readingTime":2.415,"hasTruncateMarker":true,"authors":[],"frontMatter":{"slug":"decrypt-classfinal-jar","title":"\u89E3\u5BC6 ClassFinal \u52A0\u5BC6\u7684 Java Jar \u5305","tags":["Java","Decrypt"]},"unlisted":false,"nextItem":{"title":"\u6211\u8BB0\u5F55\u601D\u8003\u7684\u65B9\u5F0F\u7B80\u5355\u603B\u7ED3","permalink":"/story/how-i-note"}}')}}]);