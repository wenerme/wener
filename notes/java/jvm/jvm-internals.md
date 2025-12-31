---
title: JVM 内部原理 (Internals)
---

# JVM 内部原理

## 运行时数据区 (Runtime Data Areas)

JVM 内存主要分为**线程共享**和**线程隔离**两大类。

### 线程共享区

1.  **方法区 (Method Area)** (逻辑概念)
    - **作用**: 存储已被虚拟机加载的类信息、常量、静态变量、即时编译器编译后的代码等。
    - **实现**:
      - **PermGen (永久代)**: JDK 7 及之前。位于堆内存中，有固定大小限制 (`-XX:MaxPermSize`)，容易 OOM。
      - **Metaspace (元空间)**: JDK 8 及之后。使用**本地内存 (Native Memory)**。默认不设上限 (受物理内存限制)，可通过 `-XX:MaxMetaspaceSize` 限制。
2.  **堆 (Heap)**
    - **作用**: 存放对象实例和数组。
    - **特点**: JVM 启动时创建，是垃圾收集器 (GC) 管理的主要区域。

### 线程隔离区

1.  **虚拟机栈 (VM Stack)**
    - **作用**: Java 方法执行的线程内存模型。
    - **结构**: 栈帧 (Stack Frame)，包含局部变量表、操作数栈、动态链接、方法出口。
    - **异常**: 栈深度过大抛出 `StackOverflowError`；无法申请内存抛出 `OutOfMemoryError`。
2.  **本地方法栈 (Native Method Stack)**
    - **作用**: 为 Native 方法服务。
3.  **程序计数器 (Program Counter Register)**
    - **作用**: 记录当前线程执行的字节码行号指示器。唯一不会抛出 OOM 的区域。

### 直接内存 (Direct Memory)

- 并不是虚拟机运行时数据区的一部分。
- NIO (`DirectByteBuffer`) 使用 Native 函数库直接分配堆外内存，通过 Java 堆中的 `DirectByteBuffer` 对象作为引用进行操作。
- **优点**: 避免了在 Java 堆和 Native 堆之间来回复制数据。

---

## 垃圾收集 (Garbage Collection)

### 判断对象存活

- **可达性分析 (Reachability Analysis)**: 从 **GC Roots** 开始向下搜索，不可达的对象即可回收。
  - **GC Roots 包括**: 虚拟机栈中引用的对象、静态属性/常量引用的对象、JNI 引用的对象。
- **引用类型**:
  - **强引用 (Strong)**: 只要存在，GC 就不会回收。
  - **软引用 (Soft)**: 内存不足时回收。
  - **弱引用 (Weak)**: 下一次 GC 时无论内存是否充足都会回收。
  - **虚引用 (Phantom)**: 用于跟踪对象被回收的状态 (配合 `ReferenceQueue`)。

### 垃圾收集算法

1.  **标记-清除 (Mark-Sweep)**: 效率一般，产生内存碎片。
2.  **标记-复制 (Copying)**: 将内存分为两块，每次只用一块。效率高，无碎片，但减半可用空间。新生代常用 (Eden:Survivor = 8:1)。
3.  **标记-整理 (Mark-Compact)**: 标记后将存活对象移向一端。老年代常用。

### 常见垃圾收集器

| 收集器                          | 作用区域 | 特点                                 | 备注                        |
| :------------------------------ | :------- | :----------------------------------- | :-------------------------- |
| **Serial** / **Serial Old**     | 新/老    | 单线程，简单高效 (Client 模式)       | -                           |
| **ParNew**                      | 新生代   | Serial 的多线程版本                  | 常配合 CMS 使用             |
| **Parallel Scavenge** / **Old** | 新/老    | **吞吐量优先**，多线程               | JDK 8 默认组合 (ParallelGC) |
| **CMS** (Concurrent Mark Sweep) | 老年代   | **低停顿**，并发收集，标记-清除      | JDK 14 中被移除             |
| **G1** (Garbage First)          | 整堆     | **可预测停顿**，Region 布局，无碎片  | **JDK 9+ 默认收集器**       |
| **ZGC** / **Shenandoah**        | 整堆     | **极低停顿 (<10ms/1ms)**，几乎全并发 | JDK 11/15+ 引入             |

### 内存分配与回收策略

- **TLAB (Thread Local Allocation Buffer)**: 线程在 Eden 区私有的分配缓冲区，减少锁竞争。
- **对象晋升**:
  - 长期存活对象进入老年代 (默认 15 岁，`-XX:MaxTenuringThreshold`)。
  - 大对象直接进入老年代 (`-XX:PretenureSizeThreshold`)。
  - 动态对象年龄判定: 同龄对象总和 > Survivor/2，大于等于该年龄的对象晋升。

---

## JVM 内存模型 (JMM)

- **主内存 vs 工作内存**: 所有变量在主内存，线程有自己的工作内存（缓存/寄存器），保存了变量副本。
- **原子性、可见性、有序性**: `volatile` 关键字保证可见性和禁止指令重排序，但不保证原子性。
