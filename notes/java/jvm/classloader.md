---
title: JVM 类加载器
---

# JVM 类加载器 (ClassLoader)

Java 的类加载机制负责动态地将 class 文件加载到内存中，并加以验证、准备和初始化，最终形成可以被虚拟机直接使用的 Java 类型。

## 类加载器层次 (JDK 9+)

自 JDK 9 引入模块化系统 (JPMS) 后，类加载器层次结构发生了微调，但双亲委派模型依然存在。

1.  **启动类加载器 (Bootstrap ClassLoader)**
    - **职责**: 加载核心 Java 模块 (如 `java.base`, `java.logging`, `java.xml`)。
    - **实现**: 在 HotSpot中由 C++ 实现。
    - **获取**: 无法通过 Java 代码直接获取，`String.class.getClassLoader()` 返回 `null`。

2.  **平台类加载器 (Platform ClassLoader)** (JDK 9 之前叫 Extension ClassLoader)
    - **职责**: 加载扩展的 Java 模块 (如 `java.scripting`, `java.sql`)。
    - **变化**: JDK 9 废弃了 `jre/lib/ext` 目录和 `java.ext.dirs` 机制。现在主要负责加载 JDK 中非核心的模块。
    - **父加载器**: Bootstrap ClassLoader。

3.  **系统/应用类加载器 (System/App ClassLoader)**
    - **职责**: 加载应用程序类路径 (`-cp`, `CLASSPATH`) 上的类和模块。
    - **父加载器**: Platform ClassLoader。
    - **获取**: `ClassLoader.getSystemClassLoader()`。

## 核心机制

### 双亲委派模型 (Parent Delegation Model)

- **工作原理**: 当一个类加载器收到加载请求时，优先委派给父加载器去完成。只有父加载器反馈无法加载（找不到类）时，子加载器才尝试自己加载。
- **目的**:
  1.  **安全性**: 这里的"沙箱"机制防止核心 API 被篡改。例如，用户无法定义一个 `java.lang.String` 来替换核心库中的版本，因为 Bootstrap ClassLoader 会优先加载核心库中的版本。
  2.  **避免重复加载**: 保证在 JVM 中同一个类（全限定名）只被加载一次。

### 破坏双亲委派

- **场景**: 基础类需要调用用户代码（SPI 场景，如 JDBC 驱动加载）。
- **手段**: **线程上下文类加载器 (Thread Context ClassLoader)**。
  - 核心库接口（由 Bootstrap 加载）可以使用 `Thread.currentThread().getContextClassLoader()`（通常是 AppClassLoader）来加载服务提供商的实现类。

## 类加载过程

1.  **加载 (Loading)**
    - 通过全类名获取二进制字节流。
    - 将字节流转化为方法区的运行时数据结构。
    - 在堆中生成 `java.lang.Class` 对象。

2.  **链接 (Linking)**
    - **验证 (Verification)**: 确保字节流符合规范，安全。
    - **准备 (Preparation)**: 为 **static 变量** 分配内存并设置**零值**（如 int=0, ref=null）。
      - _注意_: `static final` 常量在此阶段直接赋值。
    - **解析 (Resolution)**: 符号引用 -> 直接引用。

3.  **初始化 (Initialization)**
    - 执行类构造器 `<clinit>()` 方法（静态变量赋值 + 静态代码块）。
    - **触发条件**: `new`、访问静态字段/方法、反射、子类初始化、Main 类启动。
