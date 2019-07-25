setlcd( 240, 320)

declare function getInput()
declare function PageAdjust( hPage)
'//获取输入消息
function getInput()
'Block
'//变量
'键值变量
Dim shared G_key_up, G_key_down, G_key_left, G_key_right
Dim shared G_key_escape, G_key_enter
Dim shared G_touch_x, G_touch_y	'触摸点的X Y
Dim shared G_touch_ID	'返回区域的id值
Dim shared G_Func_calTouchId, G_User_Inkey
asm
'==/////=========== 方向键
ld int r3,38
out 34,0
ld int [vint_g_key_up],r3
ld int r3,40
out 34,0
ld int [vint_g_key_down],r3
ld int r3,37
out 34,0
ld int [vint_g_key_left],r3
ld int r3,39
out 34,0
ld int [vint_g_key_right],r3
ld int r3,13
out 34,0
'//==============其他键
ld int [vint_g_key_enter],r3
ld int r3,27
out 34,0
ld int [vint_g_key_escape],r3

endasm
'==/////===========触屏
if G_User_Inkey < 0 then
	G_touch_x = getpenposx( G_User_Inkey)
	G_touch_y = getpenposy( G_User_Inkey)
	G_touch_id = -1
	asm
	;'计算触摸
	call [ vint_G_Func_calTouchId ]
	
	endasm
	
else
	G_touch_x = -1
	G_touch_y = -1
	G_touch_id = -1
end if


end function
asm
jmp G_Func_calTouchId_WUSHI:
G_Func_calTouchId_UNDO:
ret
G_Func_calTouchId_WUSHI:
endasm
'EndBlock

IF GetEnv!() = Env_SIM Then
	SYS_Fe$ = ".rlb"
Else
	SYS_Fe$ = ".lib"
End IF


'//=========PageAdjust==========//
'//=========页面调整函数==========//
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150
function PageAdjust( hPage)
'Block
'/页面句柄'
dim shared PageAd_Page_Src, PageAd_Page_Buff, PageAd_Page_Buff_Catch
dim shared PageAd_Passage_R, PageAd_Passage_G, PageAd_Passage_B
dim shared PageAd_Mix_Red, PageAd_Mix_Green, PageAd_Mix_Blue, PageAd_Mix_Light	'每个颜色调整的值
'/状态信息
dim shared PageAd_Show_Passage	'如果为0 则显示rgb  1显示r通道 2G 3B
dim shared PageAd_Show_LR, PageAd_Show_TB	'是否倒置方向的
dim shared PageAd_Show_Gray	'是否灰度化
dim shared PageAd_Show_Scan_Type '查看的模式 1 2 3 
dim shared PageAd_Main_Max_X, PageAd_Main_Max_Y
dim shared PageAd_Pic_Menu, PageAd_Pic_Menu_Pr
dim shared PageAd_i, PageAd_Sys_Over

PageAd_Page_Buff_Catch = createpage() 'buff页面的缓存 如果用直接输出模式 只需要拷贝这个页面就好了
PageAd_Page_Buff 	= createpage()
PageAd_Page_Src 	= hPage

PageAd_Pic_Menu 	= loadres( "Page_AD" + SYS_Fe$, 1)
PageAd_Pic_Menu_Pr 	= loadres( "Page_AD" + SYS_Fe$, 2)

'默认的显示通道
PageAd_Show_Passage = 0
'默认的这种显示模式 全屏
PageAd_Show_Scan_Type = 3

PageAd_Main_Max_X = 240
PageAd_Main_Max_Y = 320
asm
'触屏处理
ld int [ vint_G_Func_calTouchId ], PageAd_CalTouch
'初始化
call PageAd_Initialization
'调用主循环
call PageAd_Main_While
endasm

'释放资源
deletepage( PageAd_Page_Buff)
deletepage( PageAd_Page_Buff_Catch)

freeres( PageAd_Pic_Menu )
freeres( PageAd_Pic_Menu_Pr )
end function

'//=====================汇编部分=========================//
'Block
asm
jmp PageAd_QingWuShiWo:

'//====================函数主循环=======================//
PageAd_Main_While:
'Block
ld int [ vint_PageAd_Sys_Over ], 0

'第一次需要运行循环
ld int [ vint_G_touch_ID ], 1
'避免第一次的Waitkey
jmp PageAd_Skip_The_First_Waitkey
endasm
while not PageAd_Sys_Over
G_User_Inkey = waitkey()
getInput()
	
	'重置值
	if G_key_escape then
		PageAd_Mix_Red 		= 0
		PageAd_Mix_Green 	= 0
		PageAd_Mix_Blue 	= 0
		PageAd_Mix_Light 	= 0
		G_touch_ID = 1	'需要处理 相当于从新载图
	'确认
	else if G_key_enter then
		vasm(" call PageAd_Menu_6")
	end if
	
	asm
	PageAd_Skip_The_First_Waitkey:
	
	'在后面 如果不想经过这一步 可以直接设置Id为 - 1
	cmp int [ vint_G_touch_ID ], - 1
	jpc z PageAd_Main_Process_NotRun:
		call PageAd_Main_Process_Circulation
	PageAd_Main_Process_NotRun:
	
	call PageAd_UI_Construct
	endasm
	
flippage( PageAd_Page_Buff )
wend

asm
ret
'EndBlock
;'//====================初始化=======================//
data PageAd_Initialization_Temp_rs dword 0
PageAd_Initialization:
'Block
'/初始菜单跳转表
ld int [ PageAd_Menu_Jump_0 ], PageAd_Menu_0
ld int [ PageAd_Menu_Jump_1 ], PageAd_Menu_1
ld int [ PageAd_Menu_Jump_2 ], PageAd_Menu_2
ld int [ PageAd_Menu_Jump_3 ], PageAd_Menu_3
ld int [ PageAd_Menu_Jump_4 ], PageAd_Menu_4
ld int [ PageAd_Menu_Jump_5 ], PageAd_Menu_5
ld int [ PageAd_Menu_Jump_6 ], PageAd_Menu_6
ld int [ PageAd_Menu_Jump_7 ], PageAd_Menu_7
ld int [ PageAd_Menu_Jump_8 ], PageAd_Menu_8
'/初始Pixel的hpage  这个只有在完成的时候才更改  改为目标页面的句柄
ld int [ PageAd_Pixel_Param_hPage ], [ vint_PageAd_Page_Buff ]

'/初始 读入颜色信息
ld int [ PageAd_ReadPixel_Param_hPage ], [ vint_PageAd_Page_Src ]
'因为是用的Push 所以就从最后一行开始读取
ld int [ PageAd_Initialization_Temp_rs ], rs
ld int rs, PageAd_Color_Chunk_Last

ld int [ PageAd_ReadPixel_Param_Y ], 319
'while
PageAd_Init_While_Y:
cmp int [ PageAd_ReadPixel_Param_Y ], 0
Jpc B PageAd_Init_Wend_Y
	
	
	ld int [ PageAd_ReadPixel_Param_X ], 239
	'while 一次处理4点
	PageAd_Init_While_X:
	cmp int [ PageAd_ReadPixel_Param_X ], 0
	Jpc B PageAd_Init_Wend_X
	
	'1
	'用Push 我就不用自己加指针了 
	ld int r3, PageAd_ReadPixel_Parameter
	OUT 25,0
	'Push入
	push r3
	cal int add [ PageAd_ReadPixel_Param_X ], - 1
	'2
	ld int r3, PageAd_ReadPixel_Parameter
	OUT 25,0
	push r3
	cal int add [ PageAd_ReadPixel_Param_X ], - 1
	'3
	ld int r3, PageAd_ReadPixel_Parameter
	OUT 25,0
	push r3
	cal int add [ PageAd_ReadPixel_Param_X ], - 1
	'4
	ld int r3, PageAd_ReadPixel_Parameter
	OUT 25,0
	push r3
	cal int add [ PageAd_ReadPixel_Param_X ], - 1

	'wend
	jmp PageAd_Init_While_X
	PageAd_Init_Wend_X:

cal int add [ PageAd_ReadPixel_Param_Y ], - 1
'wend
jmp PageAd_Init_While_Y
PageAd_Init_Wend_Y:

'恢复栈指针
ld int rs , [ PageAd_Initialization_Temp_rs ]

ret
'EndBlock

;'//====================参数列表=======================//
'Block
;'//存颜色的地方  320 * 240 * 4的大小
PageAd_Color_Chunk:
.block 307196 0
PageAd_Color_Chunk_Last:
.block 4 0
'pixel( hPage, X, Y, color) 这个函数列表相当于是专用于主过程的
PageAd_Pixel_Parameter:
PageAd_Pixel_Param_4:
PageAd_Pixel_Param_Color:
PageAd_Main_CurColor:
'这里是RGB  本来bb是bgr的  因为写入的时候那个低位在前还是什么导致的 但是这个颜色是pixel的 所以没问题
PageAd_Main_CurColor_Red:
.block 1 0
PageAd_Main_CurColor_Green:
.block 1 0
PageAd_Main_CurColor_Blue:
.block 2 0
PageAd_Main_CurY:
PageAd_Pixel_Param_Y:
PageAd_Pixel_Param_3:
.block 4 0
PageAd_Main_CurX:
PageAd_Pixel_Param_X:
PageAd_Pixel_Param_2:
.block 4 0
PageAd_Pixel_Param_hPage:
PageAd_Pixel_Param_1:
.block 4 0

'ReadpixelPixel( hPage, X, Y)
PageAd_ReadPixel_Param_4:
.block 4 0
PageAd_ReadPixel_Parameter:
PageAd_ReadPixel_Param_Y:
PageAd_ReadPixel_Param_3:
.block 4 0
PageAd_ReadPixel_Param_X:
PageAd_ReadPixel_Param_2:
.block 4 0
PageAd_ReadPixel_Param_hPage:
PageAd_ReadPixel_Param_1:
.block 4 0

PageAd_showpic_Paramater:
PageAd_showpic_Paramater_9:
data PageAd_showpic_mode dword 1 '因为基本来说模式都是1

'/showpic SHOWPIC(PAGE,PIC,DX,DY,W,H,X,Y,MODE)
PageAd_showpic_Paramater_8:
PageAd_showpic_SrcY:
.block 4 0
PageAd_showpic_Paramater_7:
PageAd_showpic_SrcX:
.block 4 0
PageAd_showpic_Paramater_6:
PageAd_showpic_Hgt:
.block 4 0
PageAd_showpic_Paramater_5:
PageAd_showpic_Wid:
.block 4 0
PageAd_showpic_Paramater_4:
PageAd_showpic_DesY:
.block 4 0
PageAd_showpic_Paramater_3:
PageAd_showpic_Desx:
.block 4 0
PageAd_showpic_Paramater_2:
PageAd_showpic_Pic:
.block 4 0
PageAd_showpic_Paramater_1:
PageAd_showpic_Page:
.block 4 0

'OUT 23,0 fillpage的端口
PageAd_FILLPAGE_Paramater:
PageAd_FILLPAGE_Paramater_6:
.block 4 0
PageAd_FILLPAGE_Paramater_5:
.block 4 0
PageAd_FILLPAGE_Paramater_4:
.block 4 0
PageAd_FILLPAGE_Paramater_3:
.block 4 0
PageAd_FILLPAGE_Paramater_2:
.block 4 0
PageAd_FILLPAGE_Paramater_1:
.block 4 0

PageAd_Menu_Jump_Table:
PageAd_Menu_Jump_0:
.block 4 0
PageAd_Menu_Jump_1:
.block 4 0
PageAd_Menu_Jump_2:
.block 4 0
PageAd_Menu_Jump_3:
.block 4 0
PageAd_Menu_Jump_4:
.block 4 0
PageAd_Menu_Jump_5:
.block 4 0
PageAd_Menu_Jump_6:
.block 4 0
PageAd_Menu_Jump_7:
.block 4 0
PageAd_Menu_Jump_8:
.block 4 0
'EndBlock

;'//===================构建UI========================//
PageAd_UI_Construct:
'Block

'[ vint_PageAd_Page_Buff ]
ld int [ PageAd_showpic_Paramater_1 ], [ vint_PageAd_Page_Buff ]
ld int [ PageAd_showpic_Paramater_2 ], [ vint_PageAd_Pic_Menu ]
ld int [ PageAd_showpic_Paramater_3 ], 5	'菜单在屏幕上的偏移是5 5
ld int [ PageAd_showpic_Paramater_4 ], 5
ld int [ PageAd_showpic_Paramater_5 ], 80
ld int [ PageAd_showpic_Paramater_6 ], 110
ld int [ PageAd_showpic_Paramater_7 ], 0
ld int [ PageAd_showpic_Paramater_8 ], 0
ld int r3, PageAd_showpic_Paramater
out 20, 0

'/显示按下的状态
'Block
ld int [ PageAd_showpic_Paramater_2 ], [ vint_PageAd_Pic_Menu_pr ]

cmp int [ vint_PageAd_Show_TB ], 0
jpc z PageAd_UI_Construct_NotTB:
	ld int r1, 0
	call PageAd_UI_Construct_Show_Menu_Pr_By_ID
PageAd_UI_Construct_NotTB:

cmp int [ vint_PageAd_Show_LR ], 0
jpc z PageAd_UI_Construct_NotLR:
	ld int r1, 1
	call PageAd_UI_Construct_Show_Menu_Pr_By_ID
PageAd_UI_Construct_NotLR:

cmp int [ vint_PageAd_Show_Gray ], 0
jpc z PageAd_UI_Construct_NotGray:
	ld int r1, 2
	call PageAd_UI_Construct_Show_Menu_Pr_By_ID
PageAd_UI_Construct_NotGray:
'浏览模式
ld int r1, [ vint_PageAd_Show_Scan_Type ]
cal int add r1, 2
call PageAd_UI_Construct_Show_Menu_Pr_By_ID
'通道单选按钮的显示
'1显示r通道 2G 3B


	ld int [ PageAd_showpic_Paramater_3 ], 8	'5 + 3 = 8
	'ld int [ PageAd_showpic_Paramater_4 ], 5
	ld int [ PageAd_showpic_Paramater_5 ], 10
	ld int [ PageAd_showpic_Paramater_6 ], 10
	ld int [ PageAd_showpic_Paramater_7 ], 3
	'ld int [ PageAd_showpic_Paramater_8 ], 0
	
	ld int [ PageAd_showpic_Paramater_8 ], [ vint_PageAd_Show_Passage ]
	cal int mul [ PageAd_showpic_Paramater_8 ], 10
	cal int add [ PageAd_showpic_Paramater_8 ], 5
	
	ld int [ PageAd_showpic_Paramater_4 ], [ PageAd_showpic_Paramater_8 ]
	cal int add [ PageAd_showpic_Paramater_4 ], 5
	
	ld int r3, PageAd_showpic_Paramater
	out 20, 0

'EndBlock
'/显示当前的 L R G B 值
'Block
'FILLPAGE(PAGE,X,Y,WID,HGT,COLOR)
'x 偏移 15 长度为 60 显示的块是 1 * 4
ld int [ PageAd_FILLPAGE_Paramater_1 ], [ vint_PageAd_Page_Buff ]

ld int [ PageAd_FILLPAGE_Paramater_4 ], 1
ld int [ PageAd_FILLPAGE_Paramater_5 ], 4
ld int [ PageAd_FILLPAGE_Paramater_6 ], 10576398
'15 + 30 + 5 = 50 '5 + 5 + 3 = 13
'L
ld int [ PageAd_FILLPAGE_Paramater_2 ], 50
ld int [ PageAd_FILLPAGE_Paramater_3 ], 13
cal int add [ PageAd_FILLPAGE_Paramater_2 ], [ vint_PageAd_Mix_Light ]
ld int r3,  PageAd_FILLPAGE_Paramater
OUT 23,0
'R
ld int [ PageAd_FILLPAGE_Paramater_2 ], 50
ld int [ PageAd_FILLPAGE_Paramater_3 ], 23
cal int add [ PageAd_FILLPAGE_Paramater_2 ], [ vint_PageAd_Mix_Red ]
'ld int r3,  PageAd_FILLPAGE_Paramater
OUT 23,0
'G
ld int [ PageAd_FILLPAGE_Paramater_2 ], 50
ld int [ PageAd_FILLPAGE_Paramater_3 ], 33
cal int add [ PageAd_FILLPAGE_Paramater_2 ], [ vint_PageAd_Mix_Green ]
'ld int r3,  PageAd_FILLPAGE_Paramater
OUT 23,0
'B
ld int [ PageAd_FILLPAGE_Paramater_2 ], 50
ld int [ PageAd_FILLPAGE_Paramater_3 ], 43
cal int add [ PageAd_FILLPAGE_Paramater_2 ], [ vint_PageAd_Mix_Blue ]
'ld int r3,  PageAd_FILLPAGE_Paramater
OUT 23,0
'EndBlock

ret

data PageAd_UI_Construct_Show_Menu_Pr_Wid dword 0
data PageAd_UI_Construct_Show_Menu_Pr_Hgt dword 0
'//显示下面的菜单 参数 r1

PageAd_UI_Construct_Show_Menu_Pr_By_ID:
'Block
' 012
' 345
' 678
'图标是 24 * 24 的
ld int [ PageAd_UI_Construct_Show_Menu_Pr_Wid ], r1
cal int mod [ PageAd_UI_Construct_Show_Menu_Pr_Wid ], 3
cal int mul [ PageAd_UI_Construct_Show_Menu_Pr_Wid ], 24

ld int [ PageAd_UI_Construct_Show_Menu_Pr_hgt ], r1
cal int div [ PageAd_UI_Construct_Show_Menu_Pr_Hgt ], 3
cal int mul [ PageAd_UI_Construct_Show_Menu_Pr_Hgt ], 24

'偏移
cal int add [ PageAd_UI_Construct_Show_Menu_Pr_Wid ], 3
cal int add [ PageAd_UI_Construct_Show_Menu_Pr_Hgt ], 41	'这个数值有待调试

ld int [ PageAd_showpic_Paramater_7 ], [ PageAd_UI_Construct_Show_Menu_Pr_Wid ]
ld int [ PageAd_showpic_Paramater_8 ], [ PageAd_UI_Construct_Show_Menu_Pr_Hgt ]

ld int [ PageAd_showpic_Paramater_3 ], [ PageAd_UI_Construct_Show_Menu_Pr_Wid ]
ld int [ PageAd_showpic_Paramater_4 ], [ PageAd_UI_Construct_Show_Menu_Pr_Hgt ]
'偏移
cal int add [ PageAd_showpic_Paramater_3 ], 5
cal int add [ PageAd_showpic_Paramater_4 ], 5

ld int [ PageAd_showpic_Paramater_5 ], 24
ld int [ PageAd_showpic_Paramater_6 ], 24

ld int r3, PageAd_showpic_Paramater
out 20, 0

ret
'EndBlock
'EndBlock
data PageAd_Main_Offset dowrd 0
data PageAd_Main_CurPos dword 0
data PageAd_Main_Red_temp dword 0
data PageAd_Main_Green_temp dword 0
data PageAd_Main_Blue_temp dword 0
;'//====================主要处理循环=======================//
PageAd_Main_Process_Circulation:
'Block

'拷贝原页面作为背景
ld int r2, [ vint_PageAd_Page_Buff ]
ld int r3, [ vint_PageAd_Page_Src ]
OUT 22,0
'绘图都是从左上开始  当max_x不为240的时候 要进行加偏移
ld int [ PageAd_Main_CurPos ], PageAd_Color_Chunk
'计算偏移
ld int [ PageAd_Main_Offset ], 240
cal int sub [ PageAd_Main_Offset ], [ vint_PageAd_Main_Max_X ]
cal int mul [ PageAd_Main_Offset ], 4
'初始哪些要运行
'/对颜色的处理
'Block
'由于亮度对Rgb的进行了改变 所以要先缓存rGB 然后完了再恢复
ld int [ PageAd_Main_Red_temp ], [ vint_PageAd_Mix_Red ]
ld int [ PageAd_Main_Green_temp ], [ vint_PageAd_Mix_Green ]
ld int [ PageAd_Main_Blue_temp ], [ vint_PageAd_Mix_Blue ]
'/对亮度的处理
cal int add [ vint_PageAd_Mix_Red ], [ vint_PageAd_Mix_Light ]
cal int add [ vint_PageAd_Mix_Green ], [ vint_PageAd_Mix_Light ]
cal int add [ vint_PageAd_Mix_Blue ], [ vint_PageAd_Mix_Light ]
'r
cmp int [ vint_PageAd_Mix_Red ], 0
jpc z PageAd_Show_NotDealRed:
	ld int [ PageAd_Pic_ColorAd_Red_Block ], [ PageAd_Pic_ColorAd_Red_Call ]
PageAd_Show_NotDealRed:
'g
cmp int [ vint_PageAd_Mix_Green ], 0
jpc z PageAd_Show_NotDealGreen:
	ld int [ PageAd_Pic_ColorAd_Green_Block ], [ PageAd_Pic_ColorAd_Green_Call ]
PageAd_Show_NotDealGreen:
'b
cmp int [ vint_PageAd_Mix_Blue ], 0
jpc z PageAd_Show_NotDealBlue:
	ld int [ PageAd_Pic_ColorAd_Blue_Block ], [ PageAd_Pic_ColorAd_Blue_Call ]
PageAd_Show_NotDealBlue:
'EndBlock

'/是否显示单通道 PageAd_Show_Passage控制 0-rgb 1-r 2-g 3-b
'Block
cmp int [ vint_PageAd_Show_Passage ], 0
jpc z PageAd_Show_Passage_RGB
	'r
	cmp int [ vint_PageAd_Show_Passage ], 1
	jpc nz PageAd_Show_Passage_NotRed:
		ld int [ PageAd_Pic_Show_Passage_Block ], [ PageAd_Pic_Show_Passage_Red_Call ]
	jmp PageAd_Show_Passage_Out
	PageAd_Show_Passage_NotRed:
	'g
	cmp int [ vint_PageAd_Show_Passage ], 2
	jpc nz PageAd_Show_Passage_NotGreen:
		ld int [ PageAd_Pic_Show_Passage_Block ], [ PageAd_Pic_Show_Passage_Green_Call ]
	jmp PageAd_Show_Passage_Out
	PageAd_Show_Passage_NotGreen:
	'b
	cmp int [ vint_PageAd_Show_Passage ], 3
	jpc nz PageAd_Show_Passage_NotBlue:
		ld int [ PageAd_Pic_Show_Passage_Block ], [ PageAd_Pic_Show_Passage_Blue_Call ]
	jmp PageAd_Show_Passage_Out
	PageAd_Show_Passage_NotBlue:
	
PageAd_Show_Passage_RGB:
PageAd_Show_Passage_Out:
'EndBlock

'/是否倒置
'Block
'left right
cmp int [ vint_PageAd_Show_LR ], 0
jpc z PageAd_Show_LR_Not

	ld int [ PageAd_Pic_LR_Block ], [ PageAd_Pic_LR_Call ]
	ld int [ PageAd_Pic_Coordinate_BackUp_Block ], [ PageAd_Pic_Coordinate_BackUp_Call ]
	ld int [ PageAd_Pic_Coordinate_Return_Block ], [ PageAd_Pic_Coordinate_Return_Call ]
	
PageAd_Show_LR_Not:
'top bottom
cmp int [ vint_PageAd_Show_TB ], 0
jpc z PageAd_Show_TB_Not

	ld int [ PageAd_Pic_TB_Block ], [ PageAd_Pic_TB_Call ]
	ld int [ PageAd_Pic_Coordinate_BackUp_Block ], [ PageAd_Pic_Coordinate_BackUp_Call ]
	ld int [ PageAd_Pic_Coordinate_Return_Block ], [ PageAd_Pic_Coordinate_Return_Call ]
	
PageAd_Show_TB_Not:
'EndBlock

'/是否灰度化
'Block
cmp int [ vint_PageAd_Show_Gray ], 0
jpc z PageAd_Show_Gray_not
	ld int [ PageAd_Pic_Gray_Block ], [ PageAd_Pic_Gray_Call ]
PageAd_Show_Gray_not:
'EndBlock
'/循环开始
'Block
ld int [ PageAd_Pixel_Param_Y ], 0
'while
PageAd_Main_Process_While_Y:
cmp int [ PageAd_Pixel_Param_Y ], [ vint_PageAd_Main_Max_Y ]
jpc AE PageAd_Main_Process_Wend_Y


	ld int [ PageAd_Pixel_Param_X ], 0
	'while
	PageAd_Main_Process_While_X:
	cmp int [ PageAd_Pixel_Param_X ], [ vint_PageAd_Main_Max_X ]
	jpc AE PageAd_Main_Process_Wend_X
	
	'/读入当前颜色
	ld int r0, [ PageAd_Main_CurPos ]
	'/curColor 也是当期Pixel的color参数
	ld int [ PageAd_Pixel_Param_Color ], [ r0 ]
	
	'//对图片操作的调用区域
	'/坐标备份
	PageAd_Pic_Coordinate_BackUp_block:
	.block 5 0
	'/对颜色的处理
	PageAd_Pic_ColorAd_Red_Block:
	.block 5 0
	PageAd_Pic_ColorAd_Green_Block:
	.block 5 0
	PageAd_Pic_ColorAd_Blue_Block:
	.block 5 0
	'/灰化页面
	PageAd_Pic_Gray_Block:
	.block 5 0
	'/只显示某一通道的颜色
	PageAd_Pic_Show_Passage_Block:
	.block 5 0
	'/左右倒置
	PageAd_Pic_LR_Block:
	.block 5 0
	'/上下倒置
	PageAd_Pic_TB_Block:
	.block 5 0
	
	'/pixel 处理完后上色
	ld int r3, PageAd_Pixel_Parameter
	out 24, 0
	
	'/坐标恢复
	PageAd_Pic_Coordinate_Return_Block:
	.block 5 0
	
	'颜色位置递增
	cal int add [ PageAd_Main_CurPos ], 4
	cal int add [ PageAd_Pixel_Param_X ], 1
	'wend
	jmp PageAd_Main_Process_While_X
	PageAd_Main_Process_Wend_X:

'/加补足x的偏移
cal int add [ PageAd_Main_CurPos ], [ PageAd_Main_Offset ]
cal int add [ PageAd_Pixel_Param_Y ], 1
'wend
jmp PageAd_Main_Process_While_Y
PageAd_Main_Process_Wend_Y:
'EndBlock

'缓存页面
ld int r2, [ vint_PageAd_Page_Buff_Catch ]
ld int r3, [ vint_PageAd_Page_Buff ]
OUT 22,0

ld int [ vint_PageAd_Mix_Red ]	, [ PageAd_Main_Red_temp ]
ld int [ vint_PageAd_Mix_Green ]	, [ PageAd_Main_Green_temp ]
ld int [ vint_PageAd_Mix_Blue ]	, [ PageAd_Main_Blue_temp ]
'重置
ld int [ PageAd_Pic_Coordinate_BackUp_block ] , 0
ld int [ PageAd_Pic_ColorAd_Red_Block ]		 , 0
ld int [ PageAd_Pic_ColorAd_Green_Block ]	 , 0
ld int [ PageAd_Pic_ColorAd_Blue_Block ]	 , 0
ld int [ PageAd_Pic_Gray_Block ]			 , 0
ld int [ PageAd_Pic_Show_Passage_Block ]	 , 0
ld int [ PageAd_Pic_LR_Block ]				 , 0
ld int [ PageAd_Pic_TB_Block ]				 , 0
ld int [ PageAd_Pic_Coordinate_Return_Block ] , 0

ret
'EndBlock
;'//====================处理部分=======================//
'Block
;'//====================对图片进行灰度处理=======================//
PageAd_Pic_Gray:
'Block
'我计算的就是求R G B 的平均值
ld int r0, 0
ld int r1, 0

ld byte r0, [ PageAd_Main_CurColor_Red ]
ld byte r1, [ PageAd_Main_CurColor_Green ]

cal int add r0, r1
ld byte r1, [ PageAd_Main_CurColor_Blue ]
cal int add r0, r1
cal int div r0, 3

ld byte [ PageAd_Main_CurColor_Red ], r0
ld byte [ PageAd_Main_CurColor_Green ], r0
ld byte [ PageAd_Main_CurColor_Blue ], r0

ret
PageAd_Pic_Gray_Call:
call PageAd_Pic_Gray
'EndBlock

;'//====================只显示某个通道=======================//
'名字是 PageAd_Pic_Show_Passage_ + color
'Block
PageAd_Pic_Show_Passage_Red:
'红
'Block
ld byte [ PageAd_Main_CurColor_Blue ], [ PageAd_Main_CurColor_Red ]
ld byte [ PageAd_Main_CurColor_Green ], [ PageAd_Main_CurColor_Red ]

ret
PageAd_Pic_Show_Passage_Red_Call:
call PageAd_Pic_Show_Passage_Red
'EndBlock
PageAd_Pic_Show_Passage_Green:
'绿
'Block
ld byte [ PageAd_Main_CurColor_Blue ], [ PageAd_Main_CurColor_Green ]
ld byte [ PageAd_Main_CurColor_Red ], [ PageAd_Main_CurColor_Green ]

ret
PageAd_Pic_Show_Passage_Green_Call:
call PageAd_Pic_Show_Passage_Green
'EndBlock
PageAd_Pic_Show_Passage_Blue:
'蓝
'Block

ld byte [ PageAd_Main_CurColor_Red ], [ PageAd_Main_CurColor_Blue ]
ld byte [ PageAd_Main_CurColor_Green ], [ PageAd_Main_CurColor_Blue ]

ret
PageAd_Pic_Show_Passage_Blue_Call:
call PageAd_Pic_Show_Passage_Blue
'EndBlock
'EndBlock

;'//===================某一颜色调整========================//
'命名 PageAd_Pic_ColorAd_ + color
'Block
PageAd_Pic_ColorAd_Red:
'Block
'调整值都为 -30-0-30 的值
ld int r0, 0
ld byte r0, [ PageAd_Main_CurColor_Red ]
ld int r1, r0

cal int mul r0, [ vint_PageAd_Mix_Red ]
cal int div r0, 30
cal int add r1, r0
'上限和下限的溢出
cmp int r1, 255
jpc B PageAd_Pic_ColorAd_Red_NotOver
	ld int r1, 255
PageAd_Pic_ColorAd_Red_NotOver:

cmp int r1, 0
jpc A PageAd_Pic_ColorAd_Red_NotLow
	ld int r1, 0
PageAd_Pic_ColorAd_Red_NotLow:

ld byte [ PageAd_Main_CurColor_Red ], r1

ret
PageAd_Pic_ColorAd_Red_Call:
call PageAd_Pic_ColorAd_Red
'EndBlock
PageAd_Pic_ColorAd_Green:
'Block
ld int r0, 0
ld byte r0, [ PageAd_Main_CurColor_Green ]
ld int r1, r0

cal int mul r0, [ vint_PageAd_Mix_Green ]
cal int div r0, 30
cal int add r1, r0

cmp int r1, 255
jpc B PageAd_Pic_ColorAd_Green_NotOver
	ld int r1, 255
PageAd_Pic_ColorAd_Green_NotOver:

cmp int r1, 0
jpc A PageAd_Pic_ColorAd_Green_NotLow
	ld int r1, 0
PageAd_Pic_ColorAd_Green_NotLow:

ld byte [ PageAd_Main_CurColor_Green ], r1

ret
PageAd_Pic_ColorAd_Green_Call:
call PageAd_Pic_ColorAd_Green
'EndBlock
PageAd_Pic_ColorAd_Blue:
'Block
ld int r0, 0
ld byte r0, [ PageAd_Main_CurColor_Blue ]
ld int r1, r0

cal int mul r0, [ vint_PageAd_Mix_Blue ]
cal int div r0, 30
cal int add r1, r0

cmp int r1, 255
jpc B PageAd_Pic_ColorAd_Blue_NotOver
	ld int r1, 255
PageAd_Pic_ColorAd_Blue_NotOver:

cmp int r1, 0
jpc A PageAd_Pic_ColorAd_Blue_NotLow
	ld int r1, 0
PageAd_Pic_ColorAd_Blue_NotLow:

ld byte [ PageAd_Main_CurColor_Blue ], r1

ret
PageAd_Pic_ColorAd_Blue_Call:
call PageAd_Pic_ColorAd_Blue
'EndBlock
'EndBlock

data PageAd_Pic_Coordinate_Temp_X dword 0
data PageAd_Pic_Coordinate_Temp_Y dword 0
;'//===================方向倒置========================//
'Block
PageAd_Pic_LR:
'left right
'Block

ld int r0, 239
cal int sub r0, [ PageAd_Main_CurX ]
ld int [ PageAd_Main_CurX ], r0

ret
PageAd_Pic_LR_Call:
call PageAd_Pic_LR
'EndBlock

PageAd_Pic_TB:
'top bottom
'Block

ld int r0, 319
cal int sub r0, [ PageAd_Main_CurY ]
ld int [ PageAd_Main_CurY ], r0

ret
PageAd_Pic_TB_Call:
call PageAd_Pic_TB
'EndBlock

'/坐标备份
PageAd_Pic_Coordinate_BackUp:
'Block
ld int [ PageAd_Pic_Coordinate_Temp_X ], [ PageAd_Main_CurX ]
ld int [ PageAd_Pic_Coordinate_Temp_Y ], [ PageAd_Main_CurY ]
ret
PageAd_Pic_Coordinate_BackUp_Call:
call PageAd_Pic_Coordinate_BackUp
'EndBlock

'/恢复坐标值
PageAd_Pic_Coordinate_Return:
'Block
ld int [ PageAd_Main_CurX ], [ PageAd_Pic_Coordinate_Temp_X ]
ld int [ PageAd_Main_CurY ], [ PageAd_Pic_Coordinate_Temp_Y ]
ret
PageAd_Pic_Coordinate_Return_Call:
call PageAd_Pic_Coordinate_Return
'EndBlock
'EndBlock
'EndBlock

'//=================触屏处理=====================//
PageAd_CalTouch:
'Block
endasm

Dim shared PageAd_CalTouch_CurVal
'PageAd_Sys_Over


if G_touch_x > 8 and G_touch_X < 80 then

	'上面的四条
	if G_touch_y > 10 and G_touch_y < 50 then
		'确保运行主循环
		G_touch_ID = 1
		PageAd_CalTouch_CurVal = G_touch_x - 50 '- 15 - 30
		'选择通道
		if G_touch_x < 20  then
			PageAd_Show_Passage = ( G_touch_y - 10 ) / 10
		
		'颜色值 L
		else if G_touch_y < 20 then
		PageAd_Mix_Light = PageAd_CalTouch_CurVal
		'R
		else if G_touch_y < 30 then
		PageAd_Mix_Red = PageAd_CalTouch_CurVal
		'G
		else if G_touch_y < 40 then
		PageAd_Mix_Green = PageAd_CalTouch_CurVal
		'B
		else if G_touch_y < 50 then
		PageAd_Mix_Blue = PageAd_CalTouch_CurVal
		end if
		
	else if G_touch_y < 112 and G_touch_y > 52 then
		G_touch_ID = ( ( G_touch_y - 52 ) / 20 ) * 3 + ( G_touch_x - 3 ) / 24
		'用跳转表对菜单进行处理
		asm
		ld int r1, [ vint_G_touch_ID ]
		cal int mul r1, 4
		cal int add r1, PageAd_Menu_Jump_Table
		call [ r1 ]
		endasm
	end if

end if

asm
ret
'EndBlock
'//==========对菜单的处理==========//
'Block
PageAd_Menu_0:
ld int r1, 1
cal int sub r1, [ vint_PageAd_Show_TB ]
ld int [ vint_PageAd_Show_TB ], r1
ret

PageAd_Menu_1:
ld int r1, 1
cal int sub r1, [ vint_PageAd_Show_LR ]
ld int [ vint_PageAd_Show_LR ], r1
ret

PageAd_Menu_2:
ld int r1, 1
cal int sub r1, [ vint_PageAd_Show_Gray ]
ld int [ vint_PageAd_Show_Gray ], r1
ret

PageAd_Menu_3:
ld int [ vint_PageAd_Show_Scan_Type ], 1
ld int [ vint_PageAd_Main_Max_X ], 120
ld int [ vint_PageAd_Main_Max_Y ], 320
ret

PageAd_Menu_4:
ld int [ vint_PageAd_Show_Scan_Type ], 2
ld int [ vint_PageAd_Main_Max_X ], 320
ld int [ vint_PageAd_Main_Max_Y ], 160
ret

PageAd_Menu_5:
ld int [ vint_PageAd_Show_Scan_Type ], 3
ld int [ vint_PageAd_Main_Max_X ], 240
ld int [ vint_PageAd_Main_Max_Y ], 320
ret
'/确认
PageAd_Menu_6:
'更改处理页面
ld int [ PageAd_Pixel_Param_hPage ], [ vint_PageAd_Page_Src ]
'更改处理页面的大小
ld int [ vint_PageAd_Show_Scan_Type ], 3
ld int [ vint_PageAd_Main_Max_X ], 240
ld int [ vint_PageAd_Main_Max_Y ], 320
'退出
ld int [ vint_PageAd_Sys_Over ], 1
ret

'/取消
PageAd_Menu_7:

ld int [ vint_PageAd_Sys_Over ], 1
ret

'/直接返回当前效果页面
PageAd_Menu_8:
'拷贝页面
ld int r2, [ vint_PageAd_Page_Src ]
ld int r3, [ vint_PageAd_Page_Buff_Catch ]
OUT 22,0
'退出
ld int [ vint_PageAd_Sys_Over ], 1
ret
'EndBlock
PageAd_QingWuShiWo:
endasm
'EndBlock

'EndBlock







