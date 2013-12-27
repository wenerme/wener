


水平空白期 
[Horizontal 
     Blank period] (HBlank).
	 
竖直空白期 
[Vertial Blank period] (VBlank).

NES使用一个定制的NMOS 6502 CPU, 由Ricoh设计制造. 他最初的定制是添加了音频.

NTSC制式的NES频率是 1.7897725MHZ, PAL的是 1.773447MHZ.

6502有三种 (3) 中断: IRQ/BRK, NMI和RESET.

NMI的意思是 Non-Maskable Interrupt

NES     - 任天堂娱乐系统: Self-explanitory.
     Dany    - 与Famicom同义(硬件范围).
     Famicom - 与NES同义，但不支持原始的DMC数字音频重放.
     FDS     - Famicom磁盘系统: 安装在Famicom顶部，支持3"双面游戏软盘.

	 
     CPU     - 中央处理器: Self-explanitory. NES使用一个标准6502 ( NMOS )
     PPU     - 图形处理器: 用来控制图形，活动块和其他视频相关特点
     pAPU    - pseuedo-Audio 处理器: 固化于CPU; 产生 (5) 声音通道的波形:: 四个 (4) 模拟
               和一个 (1) 数字. 在NES内部没有处理音频的物理芯片.
     MMC     - 大量内存控制器: 微型控制器, 用来控制使NES游戏使用6502的64Kbyte以外的存储器.
               他们也可以被用来控制使用CHR-ROM，也许被用来产生“特别效果”，比如强制和中断，
               以及其他一些.
     VRAM    - 图形储存器: 这个储存器在PPU内部. NES中安装了16kbits 的VRAM.
     SPR-RAM - 子画面储存器: 用来储存子画面，共256 bytes. 虽然他也在PPU内部，但不是VRAM或者
               ROM的一部分.
     PRG-ROM - 程序只读储存器: 存储程序代码的存储器. 也可以认为是通过MMC控制的扩展存储器中
               的代码部分.
     PRG-RAM - 程序可写存储器: 于PRG-ROM同义，不过这个是RAM.
     CHR-ROM - 角色只读存储器: 在PPU外部的VRAM数据, 通过MMC在PPU内部与外部交换，或者在启动队
               列中“读入”VRAM.
     VROM    - 与CHR-ROM同义.
     SRAM    - 存档可写存储器: 一般用来保存RPG游戏的进度. 就像最终幻想系列的“水井”，和“塞
               尔达传说”.
     WRAM    - 与SRAM同义.
     DMC     - δ调制通道: APU中处理数字信号的通道. 通常被认为是PCM (Pulse信号调制器)通道.
     EX-RAM  - 扩展存储器: 在任天堂的MMC5中使用的，允许游戏扩展VRAM的容量.