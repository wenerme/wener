---
slug: decrypt-classfinal-jar
title: 解密 ClassFinal 加密的 Java Jar 包
tags:
  - Java
  - Decrypt
---

# 解密 ClassFinal 加密的 Java Jar 包

[ClassFinal](https://github.com/roseboy/classfinal) 是一款java class文件安全加密工具，支持直接加密jar包或war包，无需修改任何项目代码，兼容spring-framework；可避免源码泄漏或字节码被反编译。

**要点**

- 拿到 password
  - 可能内置了
    - META-INF/.classes/org.springframework.config.Pass
  - 可能需要通过外部方式获取
    - 命令行参数或者环境变量或者拦截 Class 加载
  - 总的来说比较容易获取
- 将 jar 添加到 classpath - 方便直接调用 net.roseboy.classfinal 内内容
  - 通过 IDE 或者通过命令行参数
- 解压 jar 到当前 目录 tmp
- 解密 class
- 反编译得到 java
- 添加 lib 目录到 classpath
- 通过 IDEA 可直接调用原始 jar 里内容或直接启动 Application
  - 可能需要修改反编译后的 java 文件 - 部分反编译语法错误

<!-- more -->

```java title="DecryptClassFinal.java"
package main;

import net.roseboy.classfinal.JarDecryptor;
import net.roseboy.classfinal.util.EncryptUtils;
import net.roseboy.classfinal.util.StrUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class DecryptClassFinal {
    public static void main(String[] args) throws IOException {
        String src =System.getProperty("user.dir") +  "/tmp/META-INF/.classes";
        String dst = System.getProperty("user.dir") + "/src/main/class";

        File srcDir = new File(src);
        JarDecryptor.getInstance();
        // 默认 password 位置
        String pass = Files.readString(Path.of(src+"/org.springframework.config.Pass"));
        char[] password =  EncryptUtils.md5(pass.toCharArray());

        System.out.printf("src:%s\n", src);
        System.out.printf("dst:%s\n", dst);
        System.out.printf("password:%s\n", pass);

        if (srcDir.isDirectory()) {
            for (File file : srcDir.listFiles()) {
                String fp = file.getName();
                if (fp.startsWith("org.springframework")) {
                    continue;
                }

                byte[] fileBytes = Files.readAllBytes(file.toPath());
                byte[] out = dec(password, fp, fileBytes);

                String[] split = fp.split("[.]");
                String fn = split[split.length-1];

                String p = dst+"/"+ fp.substring(0, fp.lastIndexOf('.')).replaceAll("[.]", "/");
                new File(p).mkdirs();
                String f = p+"/"+ fn +".class";

                System.out.println("Write to: "+f+" Len:"+out.length);
                Files.write(new File(f).toPath(), out);
            }
        }

    }

    public static byte[] dec(char[] password, String fileName, byte[] bytes){
        char[] pass;
        pass = StrUtils.merger(new char[][]{password, fileName.toCharArray()});
        return  EncryptUtils.de(bytes, pass, 1);
    }
}
```

运行 main 后 src/main/class 目录下会生成解密后的 class 文件。

```bash title="反编译 class 为 java"
# 假设是 macOS 安装的 IDEA
# IDEA 自带的反编译工具解密即可
java -cp ~/Applications/IntelliJ\ IDEA\ Ultimate.app/Contents/plugins/java-decompiler/lib/java-decompiler.jar \
  org.jetbrains.java.decompiler.main.decompiler.ConsoleDecompiler \
  -dgs=true \
  src/main/class/ src/main/java/
```

执行后 src/main/java 目录下会生成反编译后的 java 文件。

:::tip

解压得到的 lib 目录(sprint-boot 的 jar)，可以直接加入到 classpath 中，然后即可直接在代码中调用 jar 或者直接运行 Application。

:::
