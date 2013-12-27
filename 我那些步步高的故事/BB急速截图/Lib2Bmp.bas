declare function ScreenPrint_Rect( ScrP_p_PAGE, ScrP_p_x, ScrP_p_y, ScrP_p_Wid, ScrP_p_Hgt, ScrP_p_BMP_FileName$)
const ScreenPrint_Use_File_ID = 1

declare function lib2bmp()
setlcd( 240, 320)
print "使用方法："
print "    自动将 Lib2Bmp.lib中的所有图片转换"
print "成bmp。"
print "    bmp的命名为"
print "       SP_Wen-{总张数}-{当前第几张}"
print
print "按确认继续转换"
print "按退出退出程序转换"

jixuXunhuan:

wk = waitkey()



if wk = key_escape then


	cls
	locate( 1, 1)
vasm(" lable_Exit:")
	
	print
	print "退出程序"
	
	print "谢谢使用"
	
	print "作者信息"	
	print "作者 Wener"
	print "ID a3160586"
	print "      club.eebbk.com"
	
	print "qq 514403150"
	
	msdelay( 1500)
	end
else if wk = key_enter then

cls
locate( 1, 1)
print "开始转换"

lib2bmp()

vasm(" jmp lable_Exit")

print "转换完毕"

else

goto jixuXunhuan:

end if


'//程序主体
function lib2bmp()
dim shared fn$, count, cur, im, page, wid, hgt, bfn$

fn$ = "Lib2Bmp.lib"

open fn$ for binary as #1

if lof( 1) < 8 then

print "Lib文件错误，无法转换"

vasm(" jmp lable_Exit")
end if


page = createpage()
get #1, count
close #1

print "共计图片" + count + " 张"

print "转换中.";

cur = 1
while cur < = count

im = loadres( fn$, cur)
wid = getpicwid( im)
hgt = getpichgt( im)
fillpage( page, 0, 0, 240, 320, &hff00ff)
showpic( page, im, 0, 0, wid, hgt, 0, 0, 1)

ScreenPrint_Rect(page, 0, 0, wid, hgt,  "SP_WEN-" + count + "-" + cur )



print ".";
cur = cur + 1
wend

end function




























'//矩形截图
function ScreenPrint_Rect( ScrP_p_PAGE, ScrP_p_x, ScrP_p_y, ScrP_p_Wid, ScrP_p_Hgt, ScrP_p_BMP_FileName$)
'//=========截图类函数 之局部截图==========
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150
Dim Shared ScrP_src_x, ScrP_src_y
Dim Shared ScrP_x, ScrP_y, ScrP_page
Dim Shared ScrP_wid, ScrP_hgt
Dim Shared ScrP_FileHandle, ScrP_FileName$, ScrP_FileOffset
Dim Shared Scrp_DataOffSet, Scrp_Save_PreLine
Dim Shared ScrP_BMP_FileName$

ScrP_page = ScrP_p_PAGE

ScrP_FileHandle = ScreenPrint_Use_File_ID
ScrP_BMP_FileName$ = ScrP_p_BMP_FileName$

ScrP_src_x = ScrP_p_x
ScrP_src_y = ScrP_p_y
ScrP_Wid = ScrP_p_Wid
ScrP_hgt = ScrP_p_Hgt

asm
;'调用主过程
call ScreenCapture_CommonInitialization
call [ ScreenCapture_MainProcess_TYPE ]
endasm

end function



asm
Jmp Scrp_QingWuShi:
;数据块
ScreenCapture_Catch:
.block 1 0
ScreenCapture_Catch_SavePostion:
.block 4096 0

;颜色
ScreenCapture_ColorTranslate_Catch_Blue:
.block 1 0
ScreenCapture_ColorTranslate_Catch_Green:
.block 1 0
ScreenCapture_ColorTranslate_Catch_Red:
.block 2 0

;16位色的缓存
ScreenCapture_ColorTranslate_Catch_16Bit_1:
.block 1 0
ScreenCapture_ColorTranslate_Catch_16Bit_2:
.block 3 0

;调用一些端口的参数列表
ScreenCapture_Paramater_4:
.block 4 0
ScreenCapture_Paramater_3:
.block 4 0
ScreenCapture_Paramater_2:
.block 4 0
ScreenCapture_Paramater_1:
.block 4 0
ScreenCapture_Paramater_Catch:

;初始化的缓存
ScreenCapture_Init_Bit1:
.block 2 0
ScreenCapture_Init_Bit2:
.block 4 0

data Scrp_i dword 0
data Scrp_j dword 0
data Scrp_k dword 0
data ScreenCapture_Color_Tranform_TYPE dword 0
data ScreenCapture_SaveAs_TYPE dword 0
data ScreenCapture_MainProcess_TYPE dword 0
;//=============颜色转换过程=============//
;子过程，把BGR的颜色制式和RGB互相转换
;基本上这个过程是多余的，应该都不会用到~
ScreenCapture_ColorTranslate:
;参数： r0 
;返回： r0




ld int [ ScreenCapture_ColorTranslate_Catch_Blue ], r0
ld byte r0, [ ScreenCapture_ColorTranslate_Catch_Blue ]

ld byte [ ScreenCapture_ColorTranslate_Catch_Blue ], [ ScreenCapture_ColorTranslate_Catch_Red ]
ld byte [ ScreenCapture_ColorTranslate_Catch_Red ], r0

ld int r0, [ ScreenCapture_ColorTranslate_Catch_Blue ]
ret
;
;//==========子过程，把R8 G8 B8转换成R5 G6 B5==========//
;'缓存机制，初始为-1
data ScreenCapture_ColorTranslate_LastColor_Catch dword %ffffffff%

ScreenCapture_ColorCover_16Bit:
;参数: r0
;返回: r0 返回值是8位的颜色

;'if r0 = LastColor_Catch 缓存
;\\
cmp int r0, [ ScreenCapture_ColorTranslate_LastColor_Catch ]
jpc z ScreenCapture_ColorTranslate_ColorEqual:

ld int [ ScreenCapture_ColorTranslate_LastColor_Catch ], r0
;'如果两次的颜色相同，则不处理

;\\
ld int [ ScreenCapture_ColorTranslate_Catch_Blue ], r0

ld int r1, 0
ld int r2, 0
ld int r3, 0
;换色 取色

call [ ScreenCapture_Color_Tranform_TYPE ]


ld int r0, r1
cal int add r0, r2
cal int add r0, r3



;处理00
ld int [ ScreenCapture_ColorTranslate_Catch_16Bit_1 ], r0



;用这个逻辑更精确 颜色偏差没那么难看
; if bit12 = 0 then
;	bit12 = 2113
; else
;	if bite1 = 0 then
;		bit2 + 1
;		
;	else
;		bit2 + 8
;	end if
; end if


;12代表word，也就是1 2位，1就是1位，2就是2位
; if bit12 = 0 then
cmp int [ ScreenCapture_ColorTranslate_Catch_16Bit_1 ], 0
JPC NZ ScreenCapture_ColorCover_Else_12:

ld int [ ScreenCapture_ColorTranslate_Catch_16Bit_1 ], 2113

jmp ScreenCapture_ColorCover_EndIf_12:
; else
ScreenCapture_ColorCover_Else_12:

	;第一位
	; if bite1 = 0 then
	cmp byte [ ScreenCapture_ColorTranslate_Catch_16Bit_1 ], 0
	JPC NZ ScreenCapture_ColorCover_Else_1:
	
	ld byte [ ScreenCapture_ColorTranslate_Catch_16Bit_1 ], 1
	
	jmp ScreenCapture_ColorCover_EndIf_12:
	; else if bite2 = 0 then
	ScreenCapture_ColorCover_Else_1:

	cmp byte [ ScreenCapture_ColorTranslate_Catch_16Bit_2 ], 0
	JPC NZ ScreenCapture_ColorCover_EndIf_12:
	
	ld byte [ ScreenCapture_ColorTranslate_Catch_16Bit_2 ], 8
	
ScreenCapture_ColorCover_EndIf_12:



;'相同则跳过处理
ScreenCapture_ColorTranslate_ColorEqual:

ld int r0, [ ScreenCapture_ColorTranslate_Catch_16Bit_1 ]

ret

;//=============颜色转换过程====Lib 或 BMP=================//
ScreenCapture_Color_Tranform_LIB:

ld byte r1, [ ScreenCapture_ColorTranslate_Catch_Red ]	;[ ScreenCapture_ColorTranslate_Catch_Blue ]
ld byte r2, [ ScreenCapture_ColorTranslate_Catch_Green ]
ld byte r3, [ ScreenCapture_ColorTranslate_Catch_Blue ]	;[ ScreenCapture_ColorTranslate_Catch_Red ]

cal int Div r1, 8
cal int Div r2, 4	;G6
cal int Div r3, 8

cal int mul r2, 32
cal int mul r3, 2048

ret

ScreenCapture_Color_Tranform_BMP:

ld byte r1, [ ScreenCapture_ColorTranslate_Catch_Red ]
ld byte r2, [ ScreenCapture_ColorTranslate_Catch_Green ]
ld byte r3, [ ScreenCapture_ColorTranslate_Catch_Blue ]


cal int Div r1, 8
cal int Div r2, 8
cal int Div r3, 8

cal int mul r2, 32
cal int mul r3, 1024

ret

;//=============公有的初始化=====================//
ScreenCapture_CommonInitialization:

;初始化参数 这样确保只运行一次
ld int [ ScreenCapture_Paramater_1 ], [ vint_ScrP_page ]

;重置数据偏移
ld int [ vint_Scrp_DataOffSet ], ScreenCapture_Catch:

;计算多少行保存一次
ld int r0, [ vint_ScrP_wid ]
cal int mul r0, 2

ld int [ vint_Scrp_Save_PreLine ], 4095
cal int div [ vint_Scrp_Save_PreLine ], r0

endasm
'保存为的文件格式
if ScrP_BMP_FileName$ = "" then

ScrP_FileName$ = "ScreenPrint.lib"
asm
ld int [ ScreenCapture_SaveAs_TYPE ], ScreenCapture_SaveAs_lib
ld int [ ScreenCapture_Color_Tranform_TYPE ], ScreenCapture_Color_Tranform_lib
ld int [ ScreenCapture_MainProcess_TYPE ], ScreenCapture_MainProcess_lib
endasm

else
ScrP_FileName$ = ScrP_BMP_FileName$ + ".bmp"
asm
ld int [ ScreenCapture_SaveAs_TYPE ], ScreenCapture_SaveAs_bmp
ld int [ ScreenCapture_Color_Tranform_TYPE ], ScreenCapture_Color_Tranform_bmp
ld int [ ScreenCapture_MainProcess_TYPE ], ScreenCapture_MainProcess_bmp
endasm

end if

asm
;生成头文件，计算写入位置
call [ ScreenCapture_SaveAs_TYPE ]

ret


	;//=============一个点的颜色处理过程=================//
	ScreenCapture_OnePixel_Proc:
	
	;参数是倒序的~
	;这一句放到了初始化中处理
	;'ld int [ ScreenCapture_Paramater_1 ], [ vint_ScrP_page ]
	ld int [ ScreenCapture_Paramater_2 ], [ vint_ScrP_x ]
	;这一句已经放到了主循环中处理 加快速度
	;' ld int [ ScreenCapture_Paramater_3 ], [ vint_ScrP_y ]
	ld int r3, ScreenCapture_Paramater_3
	OUT 25,0
	
	ld int r0, r3

	call ScreenCapture_ColorCover_16Bit
	
	ld int r1, [ vint_Scrp_DataOffSet ]

	ld int [ r1 ], r0

	ret


;//=============保存一次的过程=================//
ScreenCapture_OnePixel_Save_Proc:

ld int r1, [ vint_ScrP_y ]

;'if ( ScrP_y mod PreLine ) = 0 then
cal int mod r1, [ vint_Scrp_Save_PreLine ]
cmp int r1, 0
jpc NZ ScreenCapture_Main_Save_EndIf:

;此时指的是下一个，因为避免参差的长度，所以写个0在后面防止意外
ld int r1, [ vint_Scrp_DataOffSet ]
ld int [ r1 ], 0

;存入
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, ScreenCapture_Catch

out 51, 18

;重置数据指针
ld int [ vint_Scrp_DataOffSet ], ScreenCapture_Catch


;指针回一字节
; loc( 1) - 1
ld int r3, [ vint_ScrP_FileHandle ]
out 54, 0

;seek
ld int r2, [ vint_ScrP_FileHandle ]
cal int add r3, - 1
out 55, 16

;'end if
ScreenCapture_Main_Save_EndIf:


ret

;//=============主要的截图过程----LIB=================//
ScreenCapture_MainProcess_LIB:



;'下面这个循环运行次数是最多的，所以全都汇编了

;'这个运算是截图矩形框的偏移
cal int add [ vint_ScrP_Hgt ], [ vint_ScrP_src_y ]
cal int add [ vint_ScrP_wid ], [ vint_ScrP_src_x ]

;'ScrP_y = src_y 
;'while ScrP_y < Hgt

ld int [ vint_ScrP_y ], [ vint_ScrP_src_y ]

;' while ScrP_Y < Hgt
ScreenCapture_Main_Y_Bend_LIB:
cmp int [ vint_ScrP_Y ], [ vint_ScrP_Hgt ]
jpc AE ScreenCapture_Main_Y_Wend_LIB:


	;'ScrP_x = src_x 
	ld int [ vint_ScrP_x ], [ vint_ScrP_src_x ]
	
	; 'while ScrP_x < Wid
	ScreenCapture_Main_X_Bend_LIB:
	cmp int [ vint_ScrP_x ], [ vint_ScrP_wid ]
	jpc AE ScreenCapture_Main_X_Wend_LIB:
	

	call ScreenCapture_OnePixel_Proc:
	
	;'数据偏移+2
	cal int add [ vint_Scrp_DataOffSet ], 2
	; 'ScrP_x ++
	cal int add [ vint_ScrP_x ], 1
	
	;'Wend
	jmp ScreenCapture_Main_X_Bend_LIB:
	ScreenCapture_Main_x_Wend_LIB:


;'ScrP_y = ScrP_y + 1

cal int add [ vint_ScrP_y ], 1
;'有种觉得 Srcp_Y是多余的感觉
;'参数赋值
ld int [ ScreenCapture_Paramater_3 ], [ vint_ScrP_y ]


;'判断是否储存
call ScreenCapture_OnePixel_Save_Proc:

;'wend
jmp ScreenCapture_Main_Y_Bend_LIB:
ScreenCapture_Main_Y_Wend_LIB:


call ScreenCapture_MainProcess_Last:

ret


;//=============主要的截图过程----BMP=================//
ScreenCapture_MainProcess_BMP:



;'下面这个循环运行次数是最多的，所以全都汇编了

;'bmp 4bit  计算
ld int [ scrp_i ], [ vint_ScrP_wid ]
cal int mod [ scrp_i ], 2


'cal int add [ vint_ScrP_src_y ], 1 
;'这个运算是截图矩形框的偏移
cal int add [ vint_ScrP_Hgt ], [ vint_ScrP_src_y ]
cal int add [ vint_ScrP_wid ], [ vint_ScrP_src_x ]



;'ScrP_y = src_y
;'while ScrP_y < Hgt

ld int [ vint_ScrP_y ], [ vint_ScrP_Hgt ]
;'矫正
cal int add [ vint_ScrP_y ], - 1

;' while ScrP_Y < Hgt
ScreenCapture_Main_Y_Bend_BMP:
cmp int [ vint_ScrP_Y ], [ vint_ScrP_src_y ]
jpc B ScreenCapture_Main_Y_Wend_BMP:


	;'ScrP_x = src_x 
	ld int [ vint_ScrP_x ], [ vint_ScrP_src_x ]
	
	; 'while ScrP_x < Wid
	ScreenCapture_Main_X_Bend_BMP:
	cmp int [ vint_ScrP_x ], [ vint_ScrP_wid ]
	jpc AE ScreenCapture_Main_X_Wend_BMP:
	
	
	
	call ScreenCapture_OnePixel_Proc:

	;'数据偏移+2
	cal int add [ vint_Scrp_DataOffSet ], 2
	; 'ScrP_x ++
	cal int add [ vint_ScrP_x ], 1
	
	;'Wend
	jmp ScreenCapture_Main_X_Bend_BMP:
	ScreenCapture_Main_x_Wend_BMP:

cmp int [ scrp_i ], 0
jpc z ScreenCapture_BMP_Spc_Deal_End:

ld int r1, [ vint_Scrp_DataOffSet ]
ld int [ r1 ], 65535
cal int add [ vint_Scrp_DataOffSet ], 2

ScreenCapture_BMP_Spc_Deal_End:

;'ScrP_y = ScrP_y + 1
cal int add [ vint_ScrP_y ], - 1
;'有种觉得 Srcp_Y是多余的感觉
;'参数赋值
ld int [ ScreenCapture_Paramater_3 ], [ vint_ScrP_y ]


;'判断是否储存
call ScreenCapture_OnePixel_Save_Proc:

;'wend
jmp ScreenCapture_Main_Y_Bend_BMP:
ScreenCapture_Main_Y_Wend_BMP:


call ScreenCapture_MainProcess_Last:

ret

;//==============扫尾处理=================//
ScreenCapture_MainProcess_Last:
;'最后的扫尾处理 可能会多输出一个无效字符
;最后再写一次
ld int r1, [ vint_Scrp_DataOffSet ]
ld int [ r1 ], 0
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, ScreenCapture_Catch

out 51, 18

;关闭文件
out 49, [ vint_ScrP_FileHandle ]

ret


ScreenCapture_SaveAs_LIB:
;=================================
;======//文件初始操作过程//=======
;=================================
;为了简单起见，新的截图都是放在文件末尾
;打开文件
;open
ld int r0, 1
ld int r1, [ vint_ScrP_FileHandle ]
ld int r3, [ vstr_ScrP_FileName ]
out 48, 0

;这里要说明下，在生成的lib中，都在前面预留位子，来放截图的。预留的多少也就是看
;最开始空的lib有多大
;获取一共有多少图片
;get #, Scrp_i
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
out 50, 16
ld int [ Scrp_i ], r3

;没有文件的时候 r3 < 0
;在这里，不处理没有lib文件的情况，因为本来只有前面有一大段空的才能大量截图



;seek #, 0
ld int r2, [ vint_ScrP_FileHandle ]
ld int r3, 0
out 55, 16

;存入更改后的总张数
cal int add [ Scrp_i ], 1
;put
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, [ Scrp_i ]
out 51, 16

;获取文件长度
;lof
ld int r3, [ vint_ScrP_FileHandle ]
out 53, 0
ld int [ Scrp_j ], r3

;seek #, 当前张的偏移位置
cal int mul [ Scrp_i ], 4

ld int r2, [ vint_ScrP_FileHandle ]
ld int r3, [ Scrp_i ]
out 55, 16


;存入偏移
;put
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, [ Scrp_j ]
out 51, 16



;移动到文件末尾
;seek #, 当前张的偏移位置
ld int r2, [ vint_ScrP_FileHandle ]
ld int r3, [ Scrp_j ]
out 55, 16

;创建文件头
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, 153612
out 51, 16

;存入大小
ld int [ ScreenCapture_Init_Bit1 ], [ vint_ScrP_wid ]
ld int [ ScreenCapture_Init_Bit2 ], [ vint_ScrP_hgt ]
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, [ ScreenCapture_Init_Bit1 ]
out 51, 16

;指针 + 8
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, 0
out 51, 16

ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, 0
out 51, 16

;现在的文件偏移就是该写入文件的地方了ScrP_FileOffset
ld int r3, [ vint_ScrP_FileHandle ]
out 53, 0
ld int [ vint_ScrP_FileOffset ], r3

ret

;//===========存储为BMP文件===============//
;创建头文件
ScreenCapture_SaveAs_BMP:
;open
ld int r0, 1
ld int r1, [ vint_ScrP_FileHandle ]
ld int r3, [ vstr_ScrP_FileName ]
out 48, 0

'BM
;put
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, 19778
out 51, 16

;seek #, 2
ld int r2, [ vint_ScrP_FileHandle ]
ld int r3, 2
out 55, 16

;'计算文件大小   一个大小存在scrp_i，下面要使用
ld int r1, [ vint_ScrP_wid ]
ld int r3, [ vint_ScrP_hgt ]

cal int mul r3, r1
cal int mul r3, 2

ld int [ scrp_i ], r3

cal int add r3, 54
;存入
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647

out 51, 16
;'存入BBMP 作为这种文件的标识
ld int r3, 1347240514
out 51, 16

;'存入标准的头文件长度
ld int r3, 54
out 51, 16

;'存入标准的头文件大小
ld int r3, 40
out 51, 16

;'存入宽
ld int r3, [ vint_ScrP_wid ]
out 51, 16

;'存入高
ld int r3, [ vint_ScrP_Hgt ]
out 51, 16

;'存入一些其他信息 这个只占2byte
ld int r3, 1
out 51, 16

;seek #, 28
ld int r2, [ vint_ScrP_FileHandle ]
ld int r3, 28
out 55, 16

;'存入颜色制式 16bit 这个只占2byte
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, 16
out 51, 16

;seek #, 30
ld int r2, [ vint_ScrP_FileHandle ]
ld int r3, 30
out 55, 16

;'存入压缩方法 无压缩
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, 0
out 51, 16

;'存入图像数据长度
ld int r3, [ scrp_i ]
out 51, 16

;'其他
ld int r3, 2834
out 51, 16

;'其他
ld int r3, 2834
out 51, 16

;'其他
ld int r3, 0
out 51, 16

;'其他
out 51, 16

ret
Scrp_QingWuShi:
endasm

