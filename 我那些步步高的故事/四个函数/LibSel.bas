setlcd( 240, 320)
'这个是getLibCount打开文件的id号 可以更改的
const getLibCount_ID = 9


declare function LibSel( Lib_Name$)
'这两个函数是LibSel运行必须的
declare function getLibCount( LibName$)
declare function getInput()

'//获取Lib中图片的张数
function getLibCount( LibName$)
'Block

dim shared getLibCount_name$, getLibCount_re

getLibCount_name$ = LibName$

open getLibCount_name$ for binary as #getLibCount_ID

get #getLibCount_ID, getLibCount_re

getLibCount = getLibCount_re

end function

'EndBlock
'//获取输入消息
function getInput()
'Block
'//变量
'键值变量
Dim shared G_key_x, G_key_y
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


'//=========LibSel==========//
'//=========Lib图片选择函数==========//
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150
'//Lib图片选择函数
function LibSel( Lib_Name$)
'Block
	Dim shared LibSel_CurSelected	'是一个选中的id  一个页面中一共有四个图，也就是四个id嘛 1 2 3 4
	Dim shared LibSel_CurMove, LibSel_CurSelected_Temp
	Dim shared LibSel_CurBG_PicID, LibSel_CurBG_Pic, LibSel_LastBG_Pic
	Dim shared LibSel_Animate_Run	
	Dim shared LibSel_Animate_STEP

	Dim shared LibSel_LibPicCount
	Dim shared LibSel_PicOffsetCount	'这个是count/2 用来计算当前选中图片的id
	Dim shared LibSel_cur_PicOffset
	'页面句柄
	Dim shared LibSel_Buff_Page, LibSel_Bg_Page, LibSel_Scal_Page
	'图片句柄
	Dim shared LibSel_Selected_Pic, LibSel_CurSelected_Pic
	'ui的图片句柄和一些信息
	Dim shared LibSel_ui_Title, LibSel_ui_menu, LibSel_ui_menu_Pr, LibSel_ui_scroll
	Dim shared LibSel_ui_scroll_preWid, LibSel_ui_scroll_Max_X
	Dim shared LibSel_ui_scroll_curOffset '控制滚动条的偏移位置
	Dim shared LibSel_ui_scroll_PreMove	'每次移动的长度

	Dim shared LibSel_PicX, LibSel_PicY
	'一些信息
	Dim shared LibSel_Pic_ID, LibSel_Pic_Handle
	Dim shared LibSel_Pos_ID
	Dim shared LibSel_Res_Name$, LibSel_Lib_Name$

	Dim shared LibSel_i, LibSel_j, LibSel_increase, LibSel_Temp
	Dim shared LibSel_QuitState, LibSel_Main_Rs_Temp
	dim shared SYS_Fe$ '这个变量需要全局化
	
	LibSel_Lib_Name$ =  Lib_Name$
	asm
		call LibSel_Satrt_Lable
		LibSel_End_Lable:

		'返回值
		ld int [ rb ], [ vint_LibSel_CurBG_Pic ]
	endasm

end function
'LibSel函数主体
'Block
vasm(" jmp LibSel_QINGWUSHIWODECUNZAI:")


'//初始化
'/测试文件名
asm
LibSel_Satrt_Lable:
endasm

LibSel_CurSelected = 1
LibSel_Res_Name$ = "LibSel" + SYS_Fe$

LibSel_Buff_Page = createpage()
LibSel_Bg_Page 	 = createpage()
LibSel_Scal_Page = createpage()

LibSel_Selected_Pic 	= loadres( LibSel_Res_Name$, 1)
LibSel_CurSelected_Pic 	= loadres( LibSel_Res_Name$, 2)
'/加载ui图片
LibSel_ui_Title 	= loadres( LibSel_Res_Name$, 3)
LibSel_ui_menu 		= loadres( LibSel_Res_Name$, 4)
LibSel_ui_menu_Pr 	= loadres( LibSel_Res_Name$, 5)
LibSel_ui_scroll 	= loadres( LibSel_Res_Name$, 6)

LibSel_LibPicCount 		= getLibCount( LibSel_Lib_Name$)
LibSel_LibPicCount 		= LibSel_LibPicCount - ( LibSel_LibPicCount mod 2 )
LibSel_PicOffsetCount 	= LibSel_LibPicCount / 2 '暂时忽略图片为奇数张
LibSel_ui_scroll_preWid = 200 / LibSel_LibPicCount
'被自己搞糊涂了，也不知道这个每次移动的长度是怎么算的 反正这样是对的
LibSel_ui_scroll_PreMove = LibSel_ui_scroll_preWid
LibSel_ui_scroll_Max_X = LibSel_ui_scroll_PreMove * LibSel_LibPicCount - 1 '由于误差引起的 
'LibSel_ui_scroll_PreMove = ( 200 - LibSel_ui_scroll_preWid / 2 ) / LibSel_LibPicCount
LibSel_ui_scroll_curOffset = 0
LibSel_cur_PicOffset = 0

if LibSel_ui_scroll_preWid < 20 then LibSel_ui_scroll_preWid = 20


'//生成缩略
LibSel_Pos_ID = 1
asm
call LibSel_Init_Asm
call LibSel_ScalONE_and_CopyTOScal_Parameter_INIT
endasm
'//转换缩略的循环
LibSel_i = 0
while LibSel_i < 6 and LibSel_i < LibSel_LibPicCount

		asm
		call LibSel_ScalONE_and_CopyTOScal

		cal int add [ LibSel_loadres_ID ], 1
		cal int add [ vint_LibSel_Pos_ID ], 1

		endasm
LibSel_i = LibSel_i + 1
wend

'//================================选择的主循环===================================//

'Block
LibSel_CurBG_PicID = 1
LibSel_CurBG_Pic = loadres( LibSel_Lib_Name$, LibSel_CurBG_PicID)
LibSel_QuitState = 0

asm
ld int [ vint_G_Func_calTouchId ], LibSel_CalTouchID

out 46, 0
ld int [ vint_G_User_Inkey ], r3
jmp LibSel_TOEscapeTheFirstWaitkey
endasm
while not LibSel_QuitState
LibSel_CurMove = 0

'locate( 1, 1)
'print LibSel_PicOffsetCount; LibSel_cur_PicOffset
G_User_Inkey = waitkey()
asm
LibSel_TOEscapeTheFirstWaitkey:
endasm
getInput()

	if G_key_down then
		LibSel_CurMove = 1
	else if G_key_up then
		LibSel_CurMove = - 1
	else if G_key_left then
		LibSel_CurMove = - 2
	else if G_key_right then
		LibSel_CurMove = 2
	end if

LibSel_CurSelected_Temp =  LibSel_CurSelected + LibSel_CurMove 

	if LibSel_CurSelected_Temp < 1 or LibSel_CurSelected_Temp > 4 then
			
			if LibSel_CurMove > 0 and LibSel_cur_PicOffset < LibSel_PicOffsetCount - 2 then
				LibSel_cur_PicOffset = LibSel_cur_PicOffset + 1
				LibSel_Animate_Run = 1
				asm
				ld int [ vint_LibSel_Show_ScalOnBG_run  ], 1
				ld int [ LibSel_Show_ScalOnBG_Offset_T ], - 1
				
				call LibSel_Selected_BaseAnimate
				call LibSel_Selected_Animate
				endasm
				
				freeres( LibSel_LastBG_Pic )
				
				'需要对Scal页面处理 把 1 2 位置的移出去
				STRETCHBLTPAGEEX( 0, 0, 160, 220, 80, 0, LibSel_Scal_Page, LibSel_Scal_Page)
				'加入新的两个图
				if LibSel_cur_PicOffset < = LibSel_PicOffsetCount - 3 then
				asm
				call LibSel_ScalONE_and_CopyTOScal_Parameter_INIT
				
				ld int r1, [ vint_LibSel_cur_PicOffset ]
				cal int add r1, 3
				cal int mul r1, 2
				ld int [ vint_LibSel_Temp ], r1
				ld int [ LibSel_loadres_ID ], r1
				ld int [ vint_LibSel_Pos_ID ], 6
				call LibSel_ScalONE_and_CopyTOScal
				
				cal int add [ vint_LibSel_Temp ], - 1
				ld int [ LibSel_loadres_ID ], [ vint_LibSel_Temp ]
				ld int [ vint_LibSel_Pos_ID ], 5
				call LibSel_ScalONE_and_CopyTOScal	
				endasm
				end if
				'flippage( LibSel_Scal_Page)
				'waitkey()
			else if LibSel_CurMove < 0 and LibSel_cur_PicOffset > 0 then
				LibSel_cur_PicOffset = LibSel_cur_PicOffset - 1
				LibSel_Animate_Run = 1
				'需要对Scal页面处理 把 56 位置的移出去
				STRETCHBLTPAGEEX( 80, 0, 160, 220, 0, 0, LibSel_Scal_Page, LibSel_Scal_Page)
				'加入新的两个图
				asm
				call LibSel_ScalONE_and_CopyTOScal_Parameter_INIT
				
				ld int r1, [ vint_LibSel_cur_PicOffset ]
				cal int add r1, 1
				cal int mul r1, 2
				ld int [ vint_LibSel_Temp ], r1
				ld int [ LibSel_loadres_ID ], r1
				ld int [ vint_LibSel_Pos_ID ], 2
				call LibSel_ScalONE_and_CopyTOScal
				
				cal int add [ vint_LibSel_Temp ], - 1
				ld int [ LibSel_loadres_ID ], [ vint_LibSel_Temp ]
				ld int [ vint_LibSel_Pos_ID ], 1
				call LibSel_ScalONE_and_CopyTOScal	
				endasm
				'flippage( LibSel_Scal_Page)
				'waitkey()				
				asm
				ld int [ vint_LibSel_Show_ScalOnBG_run  ], 1
				ld int [ LibSel_Show_ScalOnBG_Offset_T ], 1
				
				call LibSel_Selected_BaseAnimate
				call LibSel_Selected_Animate
				endasm
			
				freeres( LibSel_LastBG_Pic )
				

				
			end if
			
			
			LibSel_CurMove = 0
			
	else if LibSel_CurMove then
		LibSel_CurSelected = LibSel_CurSelected_Temp
		
			asm
				call LibSel_Selected_BaseAnimate
				call LibSel_Selected_Animate
			endasm
			freeres( LibSel_LastBG_Pic )
		
		
	end if

asm

'添加背景色
ld int [ LibSel_FILLPAGE_Paramater_1 ], [ vint_LibSel_BG_Page ]
ld int r3, LibSel_FILLPAGE_Paramater
out 23, 0

'showpic( LibSel_BG_Page, LibSel_CurBG_Pic, 0, 0, 240, 320, 0, 0, 1)
ld int [ LibSel_ShowPic_Paramater_1 ], [ vint_LibSel_BG_Page ]
ld int [ LibSel_ShowPic_Paramater_2 ], [ vint_LibSel_CurBG_Pic ]

ld int [ LibSel_ShowPic_Paramater_5 ], 240
ld int [ LibSel_ShowPic_Paramater_6 ], 320
ld int [ LibSel_ShowPic_Paramater_7 ], 0
ld int [ LibSel_ShowPic_Paramater_8 ], 0
'图片居中
call LibSel_Center_Pic:
ld int r3, LibSel_ShowPic_Paramater
out 20, 0
endasm

'动画
asm


'//构建UI
call LibSel_UI_Constructor
'//显示选择图
call LibSel_Show_ScalOnBG_NOSlide
endasm
flippage( LibSel_BG_Page )
'msdelay( 50)
asm
ld int r3, 35
out 27, 0
endasm
wend
'EndBlock

'释放资源
deletepage( LibSel_Buff_Page)
deletepage( LibSel_Bg_Page 	)
deletepage( LibSel_Scal_Page)

freeres( LibSel_Selected_Pic)
freeres( LibSel_CurSelected_Pic )

freeres( LibSel_ui_Title 	)
freeres( LibSel_ui_menu 	)
freeres( LibSel_ui_menu_Pr 	)
freeres( LibSel_ui_scroll 	)

asm
'返回

ret
endasm


'//////////////汇编部分

asm
;//===========Init===========//
LibSel_Init_Asm:
'Block
;'为了尽量的少做运算 直接用查表方便 傻瓜式的做法
;'/Buff页
ld int [ LibSel_ID2CD_Jump_1 ], LibSel_ID2CD_1
ld int [ LibSel_ID2CD_Jump_2 ], LibSel_ID2CD_2
ld int [ LibSel_ID2CD_Jump_3 ], LibSel_ID2CD_3
ld int [ LibSel_ID2CD_Jump_4 ], LibSel_ID2CD_4
ld int [ LibSel_ID2CD_Jump_5 ], LibSel_ID2CD_5
ld int [ LibSel_ID2CD_Jump_6 ], LibSel_ID2CD_6

;'/BG页
ld int [ LibSel_ID2CD_BG_Jump_1 ], LibSel_ID2CD_BG_1
ld int [ LibSel_ID2CD_BG_Jump_2 ], LibSel_ID2CD_BG_2
ld int [ LibSel_ID2CD_BG_Jump_3 ], LibSel_ID2CD_BG_3
ld int [ LibSel_ID2CD_BG_Jump_4 ], LibSel_ID2CD_BG_4

;'/初始化对背景色的支持 颜色统一为 0x0e62a1 10576398

ld int [ LibSel_FILLPAGE_Paramater_2 ], 0
ld int [ LibSel_FILLPAGE_Paramater_3 ], 0
ld int [ LibSel_FILLPAGE_Paramater_4 ], 240
ld int [ LibSel_FILLPAGE_Paramater_5 ], 320
ld int [ LibSel_FILLPAGE_Paramater_6 ], 10576398

ret
'EndBlock
'//参数列表
'Block
'为了添加背景色
'OUT 23,0 fillpage的端口
LibSel_FILLPAGE_Paramater:
LibSel_FILLPAGE_Paramater_6:
.block 4 0
LibSel_FILLPAGE_Paramater_5:
.block 4 0
LibSel_FILLPAGE_Paramater_4:
.block 4 0
LibSel_FILLPAGE_Paramater_3:
.block 4 0
LibSel_FILLPAGE_Paramater_2:
.block 4 0
LibSel_FILLPAGE_Paramater_1:
.block 4 0

'/为了减少参数更改的次数  就多增加了些参数列表。 因为这几个函数都是一起调用的
'/showpic SHOWPIC(PAGE,PIC,DX,DY,W,H,X,Y,MODE)
LibSel_showpic_Paramater:
LibSel_showpic_Paramater_9:
data LibSel_showpic_mode dword 1 '因为基本来说模式都是1

LibSel_showpic_Paramater_8:
LibSel_showpic_SrcY:
.block 4 0
LibSel_showpic_Paramater_7:
LibSel_showpic_SrcX:
.block 4 0
LibSel_showpic_Paramater_6:
LibSel_showpic_Hgt:
.block 4 0
LibSel_showpic_Paramater_5:
LibSel_showpic_Wid:
.block 4 0
LibSel_showpic_Paramater_4:
LibSel_showpic_DesY:
.block 4 0
LibSel_showpic_Paramater_3:
LibSel_showpic_Desx:
.block 4 0
LibSel_showpic_Paramater_2:
LibSel_showpic_Pic:
.block 4 0
LibSel_showpic_Paramater_1:
LibSel_showpic_Page:
.block 4 0

'/STRETCHBLTPAGEEX(X,Y,WID,HGT,CX,CY,DEST,SRC)
LibSel_STRETCHBLTPAGEEX_Paramater:

LibSel_STRETCHBLTPAGEEX_Paramater_8:
 LibSel_STRETCHBLTPAGEEX_SrcPage:
.block 4 0
LibSel_STRETCHBLTPAGEEX_Paramater_7:
 LibSel_STRETCHBLTPAGEEX_DesPage:
.block 4 0
LibSel_STRETCHBLTPAGEEX_Paramater_6:
 LibSel_STRETCHBLTPAGEEX_SrcY:
.block 4 0
LibSel_STRETCHBLTPAGEEX_Paramater_5:
 LibSel_STRETCHBLTPAGEEX_Srcx:
.block 4 0
LibSel_STRETCHBLTPAGEEX_Paramater_4:
 LibSel_STRETCHBLTPAGEEX_Hgt:
.block 4 0
LibSel_STRETCHBLTPAGEEX_Paramater_3:
 LibSel_STRETCHBLTPAGEEX_Wid:
.block 4 0
LibSel_STRETCHBLTPAGEEX_Paramater_2:
 LibSel_STRETCHBLTPAGEEX_DesY:
.block 4 0
LibSel_STRETCHBLTPAGEEX_Paramater_1:
 LibSel_STRETCHBLTPAGEEX_Desx:
.block 4 0

'/loadres name$ id
LibSel_loadres_Paramater:
LibSel_loadres_Paramater_2:
 LibSel_loadres_ID:
.block 4 0
LibSel_loadres_Paramater_1:
 LibSel_loadres_Name:
.block 4 0

'//
LibSel_ID2CD_Jump_Table:
LibSel_ID2CD_Jump_1:
.block 4 0
LibSel_ID2CD_Jump_2:
.block 4 0
LibSel_ID2CD_Jump_3:
.block 4 0
LibSel_ID2CD_Jump_4:
.block 4 0
LibSel_ID2CD_Jump_5:
.block 4 0
LibSel_ID2CD_Jump_6:
.block 4 0

LibSel_ID2CD_1:
ld int r1, 0
ld int r2, 0
ret

LibSel_ID2CD_2:
ld int r1, 0
ld int r2, 107
ret

LibSel_ID2CD_3:
ld int r1, 80
ld int r2, 0
ret

LibSel_ID2CD_4:
ld int r1, 80
ld int r2, 107
ret

LibSel_ID2CD_5:
ld int r1, 160
ld int r2, 0
ret

LibSel_ID2CD_6:
ld int r1, 160
ld int r2, 107
ret

'//BG 这个是缩略图的位置 显示选择框的时候要 - 2
LibSel_ID2CD_BG_Jump_Table:
LibSel_ID2CD_BG_Jump_1:
.block 4 0
LibSel_ID2CD_BG_Jump_2:
.block 4 0
LibSel_ID2CD_BG_Jump_3:
.block 4 0
LibSel_ID2CD_BG_Jump_4:
.block 4 0

LibSel_ID2CD_BG_1:
ld int r1, 20
ld int r2, 34
ret

LibSel_ID2CD_BG_2:
ld int r1, 20
ld int r2, 155
ret

LibSel_ID2CD_BG_3:
ld int r1, 140
ld int r2, 34
ret

LibSel_ID2CD_BG_4:
ld int r1, 140
ld int r2, 155
ret
'EndBlock
;//=================Id转坐标--BUFF页布局==================//
LibSel_ID2CD:
'Block
;这是小页面的id排列  如果是显示的buff页面中只有 1234 id
;参数 r3 返回 r1, r2
'//id转坐标
'/布局
'
' 1 3 5
' 2 4 6
'
cal int add r3, - 1
cal int mul r3, 4
cal int add r3, LibSel_ID2CD_Jump_Table

call [ r3 ]

ret
'EndBlock
;//=================Id转坐标--BG页布局==================//
LibSel_ID2CD_BG:
'Block
;这是小页面的id排列
;参数 r3 返回 r1, r2
'//id转坐标
'/布局
'
' 1 3
' 2 4 
'
cal int add r3, - 1
cal int mul r3, 4
cal int add r3, LibSel_ID2CD_BG_Jump_Table

call [ r3 ]

ret
'EndBlock
;//===================生成小图====================//
PageScal_Process:
;参数 r1 来源页面 r2 输出页面
'Block

ld int [ PageScal_Process_ReadPixel_Page ], r1
ld int [ PageScal_Process_Pixel_Page ], r2

ld int [ PageScal_Process_x ], 0
ld int [ PageScal_Process_y ], 0

ld int [ PageScal_Process_srcy ], 0

PageScal_Process_Y_Bend:
;'while < 320
cmp int [ PageScal_Process_srcy ], 320
jpc AE PageScal_Process_Y_Wend:
	
	;'=0
	ld int [ PageScal_Process_srcx ], 0
	ld int [ PageScal_Process_x ], 0
	;'while < 240
	PageScal_Process_X_Bend:
	cmp int [ PageScal_Process_srcx ], 240
	jpc AE PageScal_Process_X_Wend:
	
	;'readpixel
	LD int r3, PageScal_Process_ReadPixel_Param_3
	OUT 25,0
	
	LD int [ PageScal_Process_color ],r3
	
	;'pixel
	LD int r3, PageScal_Process_Pixel_Param_4	
	OUT 24,0
	
	;'+
	cal int add [ PageScal_Process_srcx ], 3
	;'+1
	cal int add [ PageScal_Process_x ], 1
	;'wend
	jmp PageScal_Process_X_Bend:
	PageScal_Process_X_Wend:
;'+
cal int add [ PageScal_Process_srcy ], 3
;'+1
cal int add [ PageScal_Process_y ], 1
;'wend
jmp PageScal_Process_Y_Bend:
PageScal_Process_Y_Wend:

ret

;'//==参数些


PageScal_Process_srcy:
PageScal_Process_ReadPixel_Param_3:
.block 4 0
PageScal_Process_srcx:
PageScal_Process_ReadPixel_Param_2:
.block 4 0
PageScal_Process_ReadPixel_Page:
PageScal_Process_ReadPixel_Param_1:
.block 4 0

PageScal_Process_color:
PageScal_Process_Pixel_Param_4:
.block 4 0
PageScal_Process_y:
PageScal_Process_Pixel_Param_3:
.block 4 0
PageScal_Process_x:
PageScal_Process_Pixel_Param_2:
.block 4 0
PageScal_Process_Pixel_Page:
PageScal_Process_Pixel_Param_1:
.block 4 0
'EndBlock

;//=================缩放拷贝的参数初始
LibSel_ScalONE_and_CopyTOScal_Parameter_INIT:
'Block

ld int [ LibSel_loadres_Name ], [ vstr_LibSel_Lib_Name ]
ld int [ LibSel_loadres_ID ], 1


ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_3 ], 80
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_4 ], 107

ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_5 ], 0
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_6 ], 0
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_7 ], [ vint_LibSel_Scal_Page ]
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_8 ], [ vint_LibSel_Buff_Page ]


ld int [ LibSel_showpic_SrcX ], 0
ld int [ LibSel_showpic_SrcY ], 0
ld int [ LibSel_showpic_DesX ], 0
ld int [ LibSel_showpic_DesY ], 0
ld int [ LibSel_showpic_Wid ], 240
ld int [ LibSel_showpic_hgt ], 320
ld int [ LibSel_showpic_Page ], [ vint_LibSel_Buff_Page ]

ret
'EndBlock
;//=================缩放一个图并拷贝到Scal页面的过程====================//
LibSel_ScalONE_and_CopyTOScal:
'参数 
'LibSel_loadres_ID 加载图片的ID
'vint_LibSel_Pos_ID	图片位置 1 - 6
'Block

'添加背景色
ld int [ LibSel_FILLPAGE_Paramater_1 ], [ vint_LibSel_Buff_Page ]
ld int r3, LibSel_FILLPAGE_Paramater
out 23, 0

;'/loadres 1
ld int r3, [ LibSel_loadres_Name ]
ld int r2, [ LibSel_loadres_ID ]
out 19, 0
ld int [ vint_LibSel_Pic_Handle ], r3
'/showpic

ld int [ LibSel_showpic_Pic ], r3
'使图片在中心
call LibSel_Center_Pic
ld int r3, LibSel_showpic_Paramater
out 20, 0
'/缩放
ld int r1, [ vint_LibSel_Buff_Page ]
ld int r2, [ vint_LibSel_Buff_Page ]
call PageScal_Process:

'/计算位置
ld int r3, [ vint_LibSel_Pos_ID ]
call LibSel_ID2CD

'/STRETCHBLTPAGEEX( ?, ?, 80, 107, 0, 0, re, buff)
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_1 ], r1
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_2 ], r2

ld int r3, LibSel_STRETCHBLTPAGEEX_Paramater
OUT 80,0

'/freeres
ld int r3, [ vint_LibSel_Pic_Handle ]
OUT 26,0

ret
'EndBlock

data LibSel_Show_FlyOut_Transfer_X_Offset dword 0
data LibSel_Show_FlyOut_Transfer_Y_Offset dword 0
data LibSel_Show_FlyOut_Transfer_SrcID  dword 0
data LibSel_Show_FlyOut_Transfer_DesID  dword 0

data LibSel_Show_FlyOut_Transfer_ToWord  dword 0	'方向1为合拢  -1为飞出
DATA LibSel_Show_FlyOut_Transfer_ToWord_RELATE dword 0 	'为了使方向相关联
;//========================缩略图的飞出特效============================//
LibSel_Show_FlyOut_Transfer:

'Block

cmp int [ LibSel_Show_FlyOut_Transfer_ToWord ], - 1
jpc z LibSel_Show_FlyOut_Transfer_ToWord_FlyOyt:

	ld int [ LibSel_Show_FlyOut_Transfer_ToWord_RELATE ], 120
	'120 - y
	cal int sub [ LibSel_Show_FlyOut_Transfer_ToWord_RELATE ], [ LibSel_Show_FlyOut_Transfer_Y_Offset ]
	ld int [ LibSel_Show_FlyOut_Transfer_Y_Offset ], [ LibSel_Show_FlyOut_Transfer_ToWord_RELATE ]

	ld int [ LibSel_Show_FlyOut_Transfer_ToWord_RELATE ], 120
	'120 - x
	cal int sub [ LibSel_Show_FlyOut_Transfer_ToWord_RELATE ], [ LibSel_Show_FlyOut_Transfer_X_Offset ]
	ld int [ LibSel_Show_FlyOut_Transfer_X_Offset ], [ LibSel_Show_FlyOut_Transfer_ToWord_RELATE ]

LibSel_Show_FlyOut_Transfer_ToWord_FlyOyt:

call LibSel_Show_FlyOut_Transfer_AND_ScalOnBG_Parameter_INIT:


cal int mul [ LibSel_Show_FlyOut_Transfer_Y_Offset ], - 1
cal int mul [ LibSel_Show_FlyOut_Transfer_X_Offset ], - 1

ld int [ LibSel_Show_FlyOut_Transfer_SrcID ], 1
ld int [ LibSel_Show_FlyOut_Transfer_DesID ], 1
call LibSel_Show_FlyOut_Transfer_Process

cal int mul [ LibSel_Show_FlyOut_Transfer_Y_Offset ], -1

ld int [ LibSel_Show_FlyOut_Transfer_SrcID ], 2
ld int [ LibSel_Show_FlyOut_Transfer_DesID ], 2
call LibSel_Show_FlyOut_Transfer_Process

cal int mul [ LibSel_Show_FlyOut_Transfer_Y_Offset ], -1
cal int mul [ LibSel_Show_FlyOut_Transfer_X_Offset ], -1

ld int [ LibSel_Show_FlyOut_Transfer_SrcID ], 3
ld int [ LibSel_Show_FlyOut_Transfer_DesID ], 3
call LibSel_Show_FlyOut_Transfer_Process

cal int mul [ LibSel_Show_FlyOut_Transfer_Y_Offset ], -1

ld int [ LibSel_Show_FlyOut_Transfer_SrcID ], 4
ld int [ LibSel_Show_FlyOut_Transfer_DesID ], 4
call LibSel_Show_FlyOut_Transfer_Process

ret

;'//飞出的计算 主要是偏移和 LibSel_Show_ScalOnBG_Process: 过程不同
'/本来想公用一个的 还是算了
LibSel_Show_FlyOut_Transfer_Process:

;'/目标位置
ld int r3, [ LibSel_Show_FlyOut_Transfer_DesID ]
call LibSel_ID2CD_BG

cal int add r1, [ LibSel_Show_FlyOut_Transfer_X_Offset ]'、、偏移
cal int add r2, [ LibSel_Show_FlyOut_Transfer_Y_Offset ]

ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_1 ], r1
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_2 ], r2



;'/源位置
ld int r3, [ LibSel_Show_FlyOut_Transfer_SrcID ]
call LibSel_ID2CD

ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_5 ], r1
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_6 ], r2

ld int r3, LibSel_STRETCHBLTPAGEEX_Paramater
out 80, 0

'/最后帖图片
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_Selected_Pic ]

ld int [ LibSel_Showpic_Desx ], [ LibSel_STRETCHBLTPAGEEX_Paramater_1 ]
ld int [ LibSel_Showpic_DesY ], [ LibSel_STRETCHBLTPAGEEX_Paramater_2 ]
cal int add [ LibSel_Showpic_DesY ], - 2
ld int r3, LibSel_showpic_Paramater

out 20, 0

ret
'EndBlock

'//=========两个过程的参数初始=========//
LibSel_Show_FlyOut_Transfer_AND_ScalOnBG_Parameter_INIT:
'Block
;'/
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_3 ], 80
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_4 ], 107
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_7 ], [ vint_LibSel_BG_Page ]
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_8 ], [ vint_LibSel_Scal_Page ]

ld int [ LibSel_Showpic_Paramater_1 ], [ vint_LibSel_BG_Page ]

ld int [ LibSel_Showpic_Paramater_5 ], 80
ld int [ LibSel_Showpic_Paramater_6 ], 110
ld int [ LibSel_Showpic_Paramater_7 ], 0
ld int [ LibSel_Showpic_Paramater_8 ], 0
ret
'EndBlock

;//========================显示缩略和选中图片到BG-----不带滑动，普通版============================//
LibSel_Show_ScalOnBG_NOSlide:
'Block

call LibSel_Show_FlyOut_Transfer_AND_ScalOnBG_Parameter_INIT:
'/相当于是个 4次循环
'/这个参数在这几次循环中不变
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_Selected_Pic ]

ld int [ LibSel_Show_ScalOnBG_SrcID ], 1
ld int [ LibSel_Show_ScalOnBG_DesID ], 1
call LibSel_Show_ScalOnBG_Process

ld int [ LibSel_Show_ScalOnBG_SrcID ], 2
ld int [ LibSel_Show_ScalOnBG_DesID ], 2
call LibSel_Show_ScalOnBG_Process

ld int [ LibSel_Show_ScalOnBG_SrcID ], 3
ld int [ LibSel_Show_ScalOnBG_DesID ], 3
call LibSel_Show_ScalOnBG_Process

ld int [ LibSel_Show_ScalOnBG_SrcID ], 4
ld int [ LibSel_Show_ScalOnBG_DesID ], 4
call LibSel_Show_ScalOnBG_Process

'/、、选中的图片
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_CurSelected_Pic ]

ld int r3, [ vint_LibSel_CurSelected ]
call LibSel_ID2CD_BG

cal int add r2, - 2

ld int [ LibSel_Showpic_Desx ], r1
ld int [ LibSel_Showpic_DesY ], r2

ld int r3, LibSel_showpic_Paramater
out 20, 0

ret
'EndBlock
data LibSel_Show_ScalOnBG_Offset dword 0
data LibSel_Show_ScalOnBG_SrcID  dword 0
data LibSel_Show_ScalOnBG_DesID  dword 0
data LibSel_Show_ScalOnBG_Offset_T dword 0	'方向 如果左为 - 1 右为 1

data LibSel_Show_ScalOnBG_Slide_ID_Offset  dword 0	'不同的滑动方向处理不同 左0 右2
;//========================显示缩略和选中图片到BG============================//
LibSel_Show_ScalOnBG:
'Block
'让这两个变量的方向处理都和 [ LibSel_Show_ScalOnBG_Offset_T ] 关系起来
cal int mul [ LibSel_Show_ScalOnBG_Offset ], [ LibSel_Show_ScalOnBG_Offset_T ]

ld int [ LibSel_Show_ScalOnBG_Slide_ID_Offset ], [ LibSel_Show_ScalOnBG_Offset_T ]
cal int add [ LibSel_Show_ScalOnBG_Slide_ID_Offset ], 1

call LibSel_Show_FlyOut_Transfer_AND_ScalOnBG_Parameter_INIT:
'/相当于是个 4次循环
'/这个参数在这几次循环中不变
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_Selected_Pic ]

ld int [ LibSel_Show_ScalOnBG_SrcID ], 1
cal int add [ LibSel_Show_ScalOnBG_SrcID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]
ld int [ LibSel_Show_ScalOnBG_DesID ], 1
call LibSel_Show_ScalOnBG_Process

ld int [ LibSel_Show_ScalOnBG_SrcID ], 2
cal int add [ LibSel_Show_ScalOnBG_SrcID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]
ld int [ LibSel_Show_ScalOnBG_DesID ], 2
call LibSel_Show_ScalOnBG_Process

ld int [ LibSel_Show_ScalOnBG_SrcID ], 3
cal int add [ LibSel_Show_ScalOnBG_SrcID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]
ld int [ LibSel_Show_ScalOnBG_DesID ], 3
call LibSel_Show_ScalOnBG_Process

ld int [ LibSel_Show_ScalOnBG_SrcID ], 4
cal int add [ LibSel_Show_ScalOnBG_SrcID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]
ld int [ LibSel_Show_ScalOnBG_DesID ], 4
call LibSel_Show_ScalOnBG_Process

'/下面是多的两个 这两个似乎在不同的情况下要不同处理
'/偏移变相反
ld int r1, [ LibSel_Show_ScalOnBG_Offset_T ]
cal int mul r1, - 120
cal int add [ LibSel_Show_ScalOnBG_Offset ], r1

cal int mul [ LibSel_Show_ScalOnBG_Slide_ID_Offset ], - 1

'//这两个源id应该是1 2的 所以就减了2次
ld int [ LibSel_Show_ScalOnBG_SrcID ], 5
cal int add [ LibSel_Show_ScalOnBG_SrcID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]
cal int add [ LibSel_Show_ScalOnBG_SrcID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]

ld int [ LibSel_Show_ScalOnBG_DesID ], 3
cal int add [ LibSel_Show_ScalOnBG_DesID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]
call LibSel_Show_ScalOnBG_Process


ld int [ LibSel_Show_ScalOnBG_SrcID ], 6
cal int add [ LibSel_Show_ScalOnBG_SrcID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]
cal int add [ LibSel_Show_ScalOnBG_SrcID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]

ld int [ LibSel_Show_ScalOnBG_DesID ], 4
cal int add [ LibSel_Show_ScalOnBG_DesID ], [ LibSel_Show_ScalOnBG_Slide_ID_Offset ]
call LibSel_Show_ScalOnBG_Process


'/、、选中的图片
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_CurSelected_Pic ]

ld int r3, [ vint_LibSel_CurSelected ]
call LibSel_ID2CD_BG

;'cal int add [ LibSel_Show_ScalOnBG_Offset ], - 120
;'cal int add r1, [ LibSel_Show_ScalOnBG_Offset ] '//偏移
cal int add r2, - 2

ld int [ LibSel_Showpic_Desx ], r1
ld int [ LibSel_Showpic_DesY ], r2

ld int r3, LibSel_showpic_Paramater
out 20, 0

ret

;'//处理一次的过程 需要两个位置id
LibSel_Show_ScalOnBG_Process:
'Block
;'/目标位置
ld int r3, [ LibSel_Show_ScalOnBG_DesID ]
call LibSel_ID2CD_BG

cal int add r1, [ LibSel_Show_ScalOnBG_Offset ]'、、偏移

ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_1 ], r1
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_2 ], r2



;'/源位置
ld int r3, [ LibSel_Show_ScalOnBG_SrcID ]
call LibSel_ID2CD

ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_5 ], r1
ld int [ LibSel_STRETCHBLTPAGEEX_Paramater_6 ], r2

ld int r3, LibSel_STRETCHBLTPAGEEX_Paramater
out 80, 0

'/最后帖图片


ld int [ LibSel_Showpic_Desx ], [ LibSel_STRETCHBLTPAGEEX_Paramater_1 ]
ld int [ LibSel_Showpic_DesY ], [ LibSel_STRETCHBLTPAGEEX_Paramater_2 ]
cal int add [ LibSel_Showpic_DesY ], - 2
ld int r3, LibSel_showpic_Paramater

out 20, 0

ret
'EndBlock
'EndBlock

;//========================构建UI--普通版============================//
LibSel_UI_Constructor_NOSlide:
'Block



ld int [ LibSel_Showpic_Paramater_1 ], [ vint_LibSel_BG_Page ]
ld int [ LibSel_Showpic_Paramater_3 ], 0
ld int [ LibSel_Showpic_Paramater_5 ], 240
ld int [ LibSel_Showpic_Paramater_7 ], 0
ld int [ LibSel_Showpic_Paramater_8 ], 0
ld int [ LibSel_Showpic_Paramater_9 ], 1
'showpic( LibSel_Bg_Page, LibSel_ui_Title, 0, 0, 240, 32, 0, 0, 1)
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_ui_Title ]

ld int [ LibSel_Showpic_Paramater_4 ], 0
ld int [ LibSel_Showpic_Paramater_6 ], 32
ld int r3, LibSel_showpic_Paramater

out 20, 0

'showpic( LibSel_Bg_Page, LibSel_ui_menu, 0, 268, 240, 52, 0, 0, 1)
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_ui_menu ]


ld int [ LibSel_Showpic_Paramater_4 ], 268
ld int [ LibSel_Showpic_Paramater_6 ], 52

out 20, 0

'、、显示滚动条
'Block
'滚动条是变长的，所以先把中间部分画在一个缓存页面上，然后一次性放到BG上
'滚动条的长度 LibSel_ui_scroll_preWid
ld int [ LibSel_Showpic_Paramater_1 ], [ vint_LibSel_Buff_Page ]
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_ui_scroll ]
ld int [ LibSel_Showpic_Paramater_3 ], 0
ld int [ LibSel_Showpic_Paramater_4 ], 0
ld int [ LibSel_Showpic_Paramater_5 ], 40
ld int [ LibSel_Showpic_Paramater_6 ], 17
ld int [ LibSel_Showpic_Paramater_7 ], 10
ld int r3, LibSel_showpic_Paramater
out 20, 0
cal int add [ LibSel_Showpic_Paramater_3 ], 40
out 20, 0
cal int add [ LibSel_Showpic_Paramater_3 ], 40
out 20, 0
cal int add [ LibSel_Showpic_Paramater_3 ], 40
out 20, 0
cal int add [ LibSel_Showpic_Paramater_3 ], 40
out 20, 0

'截取LibSel_ui_scroll_preWid - 20 的长度到BG页面
'STRETCHBLTPAGEEX(X,Y,WID,HGT,CX,CY,DEST,SRC)
ld int [ LibSel_UI_Constructor_Temp_rb ], rs
ld int rs, LibSel_STRETCHBLTPAGEEX_Paramater_1
'一直都在Ld  累了 换push算了
ld int r1, [ vint_LibSel_ui_scroll_curOffset ]
cal int add r1, 30
push r1

push 280
ld int r1, [ vint_LibSel_ui_scroll_preWid ]
cal int add r1, - 20
push r1
push 16
push 0
push 0
push [ vint_LibSel_BG_Page ]
push [ vint_LibSel_Buff_Page ]
'恢复堆指针
ld int rs, [ LibSel_UI_Constructor_Temp_rb ]



ld int r3, LibSel_STRETCHBLTPAGEEX_Paramater
out 80, 0

'绘制两头部分
'SHOWPIC(PAGE,PIC,DX,DY,W,H,X,Y,MODE)
ld int [ LibSel_UI_Constructor_Temp_rb ], rs
ld int rs, LibSel_ShowPic_Paramater_1

push [ vint_LibSel_BG_Page ]
push [ vint_LibSel_ui_scroll ]
ld int r1, [ vint_LibSel_ui_scroll_curOffset ]
cal int add r1, 20
push r1
push 280
push 10
push 16
push 0
push 0
push 1

'恢复指针
ld int rs, [ LibSel_UI_Constructor_Temp_rb ]
'左边
ld int r3, LibSel_showpic_Paramater
out 20, 0
'右边
cal int add [ LibSel_showpic_Desx ], [ vint_LibSel_ui_scroll_preWid ]
cal int add [ LibSel_showpic_Desx ], - 10
ld int [ LibSel_Showpic_SrcX ], 50
ld int r3, LibSel_showpic_Paramater
out 20, 0
'EndBlock



ret
'EndBlock
' data LibSel_UI_Constructor_Scroll_Offset dword 0
data LibSel_UI_Constructor_Scroll_Mid_Wid dword 0

data LibSel_UI_Constructor_FlyOut_Offset dword 0	'0 - 120的值 和其他的相对应
data LibSel_UI_Constructor_FlyOut_Offset_temp dword 0	'缓存 少计算下
data LibSel_UI_Constructor_FlyOut_Toward dword 0	'方向1为合拢  -1为飞出

data LibSel_UI_Constructor_Temp_rb dword 0
;//========================构建UI============================//
LibSel_UI_Constructor:
'Block

cmp int [ LibSel_UI_Constructor_FlyOut_Toward ], 1
jpc nz	LibSel_UI_Constructor_FlyOut_Toward_Out
ld int r1, 120
cal int sub r1, [ LibSel_UI_Constructor_FlyOut_Offset ]
ld int [ LibSel_UI_Constructor_FlyOut_Offset ], r1
LibSel_UI_Constructor_FlyOut_Toward_Out:



'这个调用很多 所以汇编提速
ld int [ LibSel_Showpic_Paramater_1 ], [ vint_LibSel_BG_Page ]
ld int [ LibSel_Showpic_Paramater_3 ], 0
ld int [ LibSel_Showpic_Paramater_5 ], 240
ld int [ LibSel_Showpic_Paramater_7 ], 0
ld int [ LibSel_Showpic_Paramater_8 ], 0
ld int [ LibSel_Showpic_Paramater_9 ], 1
'showpic( LibSel_Bg_Page, LibSel_ui_Title, 0, 0, 240, 32, 0, 0, 1)
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_ui_Title ]
'//修改偏移
ld int r1, [ LibSel_UI_Constructor_FlyOut_Offset ]
cal int mul r1, - 32
cal int div r1, 120

ld int [ LibSel_Showpic_Paramater_4 ], r1
ld int [ LibSel_Showpic_Paramater_6 ], 32
ld int r3, LibSel_showpic_Paramater

out 20, 0

'showpic( LibSel_Bg_Page, LibSel_ui_menu, 0, 268, 240, 52, 0, 0, 1)
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_ui_menu ]
'//修改偏移
ld int r1, [ LibSel_UI_Constructor_FlyOut_Offset ]
cal int mul r1, 52
cal int div r1, 120
ld int [ LibSel_UI_Constructor_FlyOut_Offset_temp ], r1
cal int add r1, 268
ld int [ LibSel_Showpic_Paramater_4 ], r1
ld int [ LibSel_Showpic_Paramater_6 ], 52

out 20, 0

'、、显示滚动条
'Block
'滚动条是变长的，所以先把中间部分画在一个缓存页面上，然后一次性放到BG上
'滚动条的长度 LibSel_ui_scroll_preWid
ld int [ LibSel_Showpic_Paramater_1 ], [ vint_LibSel_Buff_Page ]
ld int [ LibSel_Showpic_Paramater_2 ], [ vint_LibSel_ui_scroll ]
ld int [ LibSel_Showpic_Paramater_3 ], 0
ld int [ LibSel_Showpic_Paramater_4 ], 0
ld int [ LibSel_Showpic_Paramater_5 ], 40
ld int [ LibSel_Showpic_Paramater_6 ], 17
ld int [ LibSel_Showpic_Paramater_7 ], 10
ld int r3, LibSel_showpic_Paramater
out 20, 0
cal int add [ LibSel_Showpic_Paramater_3 ], 40
out 20, 0
cal int add [ LibSel_Showpic_Paramater_3 ], 40
out 20, 0
cal int add [ LibSel_Showpic_Paramater_3 ], 40
out 20, 0
cal int add [ LibSel_Showpic_Paramater_3 ], 40
out 20, 0

'截取LibSel_ui_scroll_preWid - 20 的长度到BG页面
'STRETCHBLTPAGEEX(X,Y,WID,HGT,CX,CY,DEST,SRC)
ld int [ LibSel_UI_Constructor_Temp_rb ], rs
ld int rs, LibSel_STRETCHBLTPAGEEX_Paramater_1
'一直都在Ld  累了 换push算了
ld int r1, [ vint_LibSel_ui_scroll_curOffset ]
cal int add r1, 30
push r1
'//修改偏移
cal int add [ LibSel_UI_Constructor_FlyOut_Offset_temp ], 280
push [ LibSel_UI_Constructor_FlyOut_Offset_temp ]
ld int r1, [ vint_LibSel_ui_scroll_preWid ]
cal int add r1, - 20
push r1
push 16
push 0
push 0
push [ vint_LibSel_BG_Page ]
push [ vint_LibSel_Buff_Page ]
'恢复堆指针
ld int rs, [ LibSel_UI_Constructor_Temp_rb ]



ld int r3, LibSel_STRETCHBLTPAGEEX_Paramater
out 80, 0

'绘制两头部分
'SHOWPIC(PAGE,PIC,DX,DY,W,H,X,Y,MODE)
ld int [ LibSel_UI_Constructor_Temp_rb ], rs
ld int rs, LibSel_ShowPic_Paramater_1

push [ vint_LibSel_BG_Page ]
push [ vint_LibSel_ui_scroll ]
ld int r1, [ vint_LibSel_ui_scroll_curOffset ]
cal int add r1, 20
push r1
push [ LibSel_UI_Constructor_FlyOut_Offset_temp ]
push 10
push 16
push 0
push 0
push 1

'恢复指针
ld int rs, [ LibSel_UI_Constructor_Temp_rb ]
'左边
ld int r3, LibSel_showpic_Paramater
out 20, 0
'右边
cal int add [ LibSel_showpic_Desx ], [ vint_LibSel_ui_scroll_preWid ]
cal int add [ LibSel_showpic_Desx ], - 10
ld int [ LibSel_Showpic_SrcX ], 50
ld int r3, LibSel_showpic_Paramater
out 20, 0
'EndBlock


ret
'EndBlock

data LibSel_BG_Slide_Left_Pic_ID dword 0
data LibSel_BG_Slide_Right_Pic_ID dword 0
data LibSel_BG_Slide_offset dword 0	'为0 - 120  就和上面的相对应了
data LibSel_BG_Slide_toward dword 0	'方向 -1左 1 右
data LibSel_BG_Slide_toward_relate dword 0	
;'//=====================背景滑动==========================//
LibSel_BG_Slide:
'参数 LibSel_BG_Slide_Left_Pic_ID LibSel_BG_Slide_Right_Pic_ID 
'LibSel_BG_Slide_offset LibSel_BG_Slide_toward
'Block
'没有优化

cal int mul [ LibSel_BG_Slide_offset ], 2
cal int mul [ LibSel_BG_Slide_offset ], [ LibSel_BG_Slide_toward]

cmp int [ LibSel_BG_Slide_toward ], 1
jpc z LibSel_BG_Slide_toward_LEFT
cal int add [ LibSel_BG_Slide_offset ], 240
LibSel_BG_Slide_toward_LEFT:

'添加背景色
ld int [ LibSel_FILLPAGE_Paramater_1 ], [ vint_LibSel_BG_Page ]
ld int r3, LibSel_FILLPAGE_Paramater
out 23, 0

'SHOWPIC(PAGE,PIC,DX,DY,W,H,X,Y,MODE)
ld int [ LibSel_Showpic_Paramater_1 ], [ vint_LibSel_BG_Page ]
ld int [ LibSel_Showpic_Paramater_4 ], 0
ld int [ LibSel_Showpic_Paramater_5 ], 240
ld int [ LibSel_Showpic_Paramater_6 ], 320
ld int [ LibSel_Showpic_Paramater_7 ], 0
ld int [ LibSel_Showpic_Paramater_8 ], 0
ld int [ LibSel_Showpic_Paramater_9 ], 1

ld int [ LibSel_Showpic_Paramater_2 ], [ LibSel_BG_Slide_right_Pic_ID ]
ld int [ LibSel_Showpic_Paramater_3 ], [ LibSel_BG_Slide_offset ]

'使图片居中
'获取宽
ld int r3, [ LibSel_BG_Slide_right_Pic_ID ]
OUT 40,0
ld int [ LibSel_Center_Pic_Wid ], r3
'获取高
ld int r3, [ LibSel_BG_Slide_right_Pic_ID ]
OUT 41,0
ld int [ LibSel_Center_Pic_Hgt ], r3

ld int [ LibSel_Showpic_Paramater_3 ], 240
cal int sub [ LibSel_Showpic_Paramater_3 ], [ LibSel_Center_Pic_Wid ]
cal int div [ LibSel_Showpic_Paramater_3 ], 2
cal int add [ LibSel_Showpic_Paramater_3 ], [ LibSel_BG_Slide_offset ]

ld int [ LibSel_Showpic_Paramater_4 ], 320
cal int sub [ LibSel_Showpic_Paramater_4 ], [ LibSel_Center_Pic_Hgt ]
cal int div [ LibSel_Showpic_Paramater_4 ], 2

ld int r3, LibSel_showpic_Paramater
out 20, 0

ld int [ LibSel_Showpic_Paramater_2 ], [ LibSel_BG_Slide_Left_Pic_ID ]
cal int add [ LibSel_Showpic_Paramater_3 ], - 240

'使图片居中
'获取宽
ld int r3, [ LibSel_BG_Slide_Left_Pic_ID ]
OUT 40,0
ld int [ LibSel_Center_Pic_Wid ], r3
'获取高
ld int r3, [ LibSel_BG_Slide_Left_Pic_ID ]
OUT 41,0
ld int [ LibSel_Center_Pic_Hgt ], r3

ld int [ LibSel_Showpic_Paramater_3 ], 240
cal int sub [ LibSel_Showpic_Paramater_3 ], [ LibSel_Center_Pic_Wid ]
cal int div [ LibSel_Showpic_Paramater_3 ], 2
cal int add [ LibSel_Showpic_Paramater_3 ], [ LibSel_BG_Slide_offset ]
cal int add [ LibSel_Showpic_Paramater_3 ], - 240

ld int [ LibSel_Showpic_Paramater_4 ], 320
cal int sub [ LibSel_Showpic_Paramater_4 ], [ LibSel_Center_Pic_Hgt ]
cal int div [ LibSel_Showpic_Paramater_4 ], 2

ld int r3, LibSel_showpic_Paramater
out 20, 0


ret
'EndBlock


;'//====================动画======================//
LibSel_Selected_Animate:
'Block
endasm
dim shared LibSel_BG_Move_ShowPic, LibSel_BG_Move_HidePic
'显示的动画些
dim shared LibSel_Show_ScalOnBG_Run, LibSel_BG_Slide_run
dim shared LibSel_Selected_BOX_Move_Run
dim shared LibSel_Show_FlyOut_Transfer_Run
dim shared LibSel_UI_Constructor_Run
dim shared LibSel_ui_scroll_Run
dim shared LibSel_ui_scroll_Val '这个是LibSel_ui_scroll_Run的参数
dim shared LibSel_ui_scroll_Val_temp

LibSel_ui_scroll_Val_temp = LibSel_ui_scroll_curOffset

LibSel_Out = 1
LibSel_j = 0
LibSel_increase = 0
while LibSel_Out

LibSel_increase = LibSel_increase + 2
LibSel_j = LibSel_j + LibSel_increase

if LibSel_j >= 120 then
	LibSel_j = 120
	LibSel_Out = 0
end if

asm



'//
cmp int [ vint_LibSel_BG_Slide_run ], 1
jpc nz LibSel_BG_Slide_NotRun
		ld int [ LibSel_BG_Slide_offset ], [ vint_LibSel_j ]
		call LibSel_BG_Slide:
LibSel_BG_Slide_NotRun:

'//
cmp int [ vint_LibSel_ui_scroll_Run ], 1
jpc nz LibSel_ui_scroll_NotRun
		ld int [ vint_LibSel_ui_scroll_curOffset ], [ vint_LibSel_ui_scroll_Val_temp ]
		ld int r1, [ vint_LibSel_ui_scroll_Val ]
		cal int mul r1, [ vint_LibSel_j ]
		cal int div r1, 120
		cal int add [ vint_LibSel_ui_scroll_curOffset ], r1
LibSel_ui_scroll_NotRun:


'//飞入飞出的动画 是把两个综合在一起的 vint_LibSel_Show_FlyOut_Transfer_run 控制方向
cmp int [ vint_LibSel_Show_FlyOut_Transfer_run ], 0
jpc z LibSel_Show_FlyOut_Transfer_NotRun

	'添加背景色
	ld int [ LibSel_FILLPAGE_Paramater_1 ], [ vint_LibSel_BG_Page ]
	ld int r3, LibSel_FILLPAGE_Paramater
	out 23, 0
	'showpic( LibSel_BG_Page, LibSel_CurBG_Pic, 0, 0, 240, 320, 0, 0, 1)
	ld int [ LibSel_ShowPic_Paramater_1 ], [ vint_LibSel_BG_Page ]
	ld int [ LibSel_ShowPic_Paramater_2 ], [ vint_LibSel_CurBG_Pic ]

	ld int [ LibSel_ShowPic_Paramater_5 ], 240
	ld int [ LibSel_ShowPic_Paramater_6 ], 320
	ld int [ LibSel_ShowPic_Paramater_7 ], 0
	ld int [ LibSel_ShowPic_Paramater_8 ], 0
	'图片居中
	call LibSel_Center_Pic:
	ld int r3, LibSel_ShowPic_Paramater
	out 20, 0

		ld int [ LibSel_Show_FlyOut_Transfer_ToWord ], [ vint_LibSel_Show_FlyOut_Transfer_run ]
		ld int [ LibSel_Show_FlyOut_Transfer_X_Offset ], [ vint_LibSel_j ]
		'本来想把这两个xy用不同的范围的
		ld int [ LibSel_Show_FlyOut_Transfer_Y_Offset ], [ vint_LibSel_j ]
		call LibSel_Show_FlyOut_Transfer:
		
		ld int [ LibSel_UI_Constructor_FlyOut_Toward ], [ vint_LibSel_Show_FlyOut_Transfer_run ]
		ld int [ LibSel_UI_Constructor_FlyOut_Offset ], [ vint_LibSel_j ]
		'跳过绘制缩略
		jmp LibSel_Show_ScalOnBG_NotRun
LibSel_Show_FlyOut_Transfer_NotRun:

'//这里的情况要复杂点
cmp int [ vint_LibSel_Show_ScalOnBG_run ], 1
jpc nz LibSel_Show_ScalOnBG_Run_NoSlide
		ld int [ LibSel_Show_ScalOnBG_Offset ], [ vint_LibSel_j ]
		call LibSel_Show_ScalOnBG
		jmp LibSel_Show_ScalOnBG_NotRun
LibSel_Show_ScalOnBG_Run_NoSlide:
		call LibSel_Show_ScalOnBG_NoSlide
LibSel_Show_ScalOnBG_NotRun:

'这个过程都必须有的
call LibSel_UI_Constructor



endasm
flippage( LibSel_BG_Page )
'msdelay( 30)
asm
ld int r3, 25
out 27, 0
endasm
wend

asm
ld int [ LibSel_UI_Constructor_FlyOut_Toward ], 0
ld int [ LibSel_UI_Constructor_FlyOut_Offset ], 0
endasm

LibSel_ui_scroll_curOffset = LibSel_ui_scroll_Val_temp + LibSel_ui_scroll_Val
LibSel_ui_scroll_Val = 0
'重置
LibSel_ui_scroll_Run 		= 0
LibSel_Show_ScalOnBG_Run 	= 0
LibSel_BG_Slide_run 		= 0
LibSel_Selected_BOX_Move_Run	= 0
LibSel_Show_FlyOut_Transfer_Run = 0
LibSel_UI_Constructor_Run 		= 0
asm
ret
'EndBlock

;'//====================基础动画设置======================//
LibSel_Selected_BaseAnimate:
'Block


endasm
			'//背景移动处理
			LibSel_LastBG_Pic = LibSel_CurBG_Pic
			LibSel_CurBG_PicID = LibSel_CurSelected + LibSel_cur_PicOffset * 2
			LibSel_CurBG_Pic = loadres( LibSel_Lib_Name$, LibSel_CurBG_PicID)
			
			'设置背景移动
			LibSel_BG_Slide_run = 1
			if LibSel_CurMove > 0 then
			
				asm
				'方向
				ld int [ LibSel_BG_Slide_toward ], 1
				ld int [ LibSel_BG_Slide_Left_Pic_ID ], [ vint_LibSel_CurBG_Pic ]
				ld int [ LibSel_BG_Slide_Right_Pic_ID ], [ vint_LibSel_LastBG_Pic ]
				endasm
			else
				asm
				'方向
				ld int [ LibSel_BG_Slide_toward ], - 1
				ld int [ LibSel_BG_Slide_Left_Pic_ID ], [ vint_LibSel_LastBG_Pic ]
				ld int [ LibSel_BG_Slide_Right_Pic_ID ], [ vint_LibSel_CurBG_Pic ]
				endasm				
			end if
			LibSel_ui_scroll_Val = LibSel_ui_scroll_PreMove * LibSel_CurMove
			LibSel_ui_scroll_Run = 1

asm
ret
'EndBlock

data LibSel_Center_Pic_Wid dword 0
data LibSel_Center_Pic_Hgt dword 0
;'//===============使图片居中的计算过程=================//
LibSel_Center_Pic:
'不需要参数， 直接读取showpic的参数
'Block
'获取宽
ld int r3, [ LibSel_showpic_Pic ]
OUT 40,0
ld int [ LibSel_Center_Pic_Wid ], r3

'获取高
ld int r3, [ LibSel_showpic_Pic ]
OUT 41,0
ld int [ LibSel_Center_Pic_Hgt ], r3


ld int r0, 240
cal int sub r0, [ LibSel_Center_Pic_Wid ]
cal int div r0, 2
ld int [ LibSel_showpic_DesX ], r0

ld int r0, 320
cal int sub r0, [ LibSel_Center_Pic_Hgt ]
cal int div r0, 2
ld int [ LibSel_showpic_DesY ], r0

ret
'EndBlock


'//尽量避免Call一个真的函数 因为那样容易爆栈

LibSel_CalTouchID:
endasm
'Block
dim shared LibSel_CalTouchID_CurSel, LibSel_CalTouchID_temp, LibSel_PicOffset_temp

if G_touch_y < 265 then
	if G_touch_y > 155 then
		
		if G_touch_X > 20 and G_touch_X < 100 then
		'2
		LibSel_CalTouchID_CurSel = 2
		else if G_touch_X > 140 and G_touch_X < 220 then
		'4
		LibSel_CalTouchID_CurSel = 4
		end if
	else if  G_touch_y > 34 and G_touch_y < 144 then
		
		if G_touch_X > 20 and G_touch_X < 100 then
		'1
		LibSel_CalTouchID_CurSel = 1
		else if G_touch_X > 140 and G_touch_X < 220 then
		'3
		LibSel_CalTouchID_CurSel = 3
		end if
		
	end if
	LibSel_CurMove = LibSel_CalTouchID_CurSel - LibSel_CurSelected
'暂时不支持滚动条
else if G_touch_y > 280 and G_touch_y < 300 and G_touch_X > 20 and G_touch_X < 220  then
		
		G_touch_X = G_touch_X - 20 
		'超出偏移
		if G_touch_X > LibSel_ui_scroll_Max_X then G_touch_X = LibSel_ui_scroll_Max_X
		
		'对滚动条的处理更复杂
		'LibSel_CalTouchID_temp 
		'这个是当前选中的图片位置的id
		LibSel_CalTouchID_CurSel = G_touch_X  / LibSel_ui_scroll_PreMove
		
		LibSel_PicOffset_temp = LibSel_CalTouchID_CurSel / 2
		
		LibSel_Scroll_Support_MaxLoad = 6
		if LibSel_PicOffset_temp = LibSel_PicOffsetCount - 1 then
			LibSel_PicOffset_temp = LibSel_PicOffsetCount - 2
			LibSel_Scroll_Support_MaxLoad = 4
			
		else if LibSel_PicOffset_temp = LibSel_PicOffsetCount - 2 then
			LibSel_PicOffset_temp = LibSel_PicOffsetCount - 2
			
		end if
		asm
			call LibSel_Scroll_Support
		endasm
		'LibSel_CurMove = 0
'最下面的菜单部分
else if G_touch_y > 300 then

	G_touch_id = G_touch_X / 24
	LibSel_CalTouchID_temp = G_touch_id * 24
	showpic( -1, LibSel_ui_menu_Pr, LibSel_CalTouchID_temp, 296, 24, 24, LibSel_CalTouchID_temp, 0, 1 )
	msdelay( 50)
	'确认
	if G_touch_id = 0 then
			LibSel_QuitState = 1
			'在原函数中返回
	'取消
	else if G_touch_id = 1 then
			LibSel_QuitState = 1
			freeres( LibSel_CurBG_Pic)
	'浏览
	else if G_touch_id = 2 then
			asm
				ld int [ vint_LibSel_Show_FlyOut_Transfer_run ], - 1
				call LibSel_Selected_Animate:
			endasm
			waitkey()
			asm
				ld int [ vint_LibSel_Show_FlyOut_Transfer_run ], 1
				call LibSel_Selected_Animate:
			endasm
	end if


	
end if

'EndBlock
asm
ret
'//================对滚动条的支持==================//
LibSel_Scroll_Support:
'已经计算出来了 LibSel_CurMove的值 和当先选择的图片id LibSel_CalTouchID_CurSel 还有当前偏移 LibSel_PicOffset_temp
endasm
dim shared LibSel_Scroll_Support_MaxLoad

'如果页面偏移没变  那么就只是 LibSel_CurMove
if LibSel_cur_PicOffset = LibSel_PicOffset_temp then

	asm
	ret
	endasm
end if
	LibSel_CurMove = ( LibSel_PicOffset_temp - LibSel_cur_PicOffset ) * 2

	LibSel_cur_PicOffset = LibSel_PicOffset_temp
	
'/滚动条的移动
LibSel_ui_scroll_Val = LibSel_ui_scroll_PreMove * LibSel_CurMove
'只显示了滚动条的动画
LibSel_ui_scroll_Run = 1
	
		'最后设为0  避免在主循环中又处理
		LibSel_CurMove = 0
asm
call LibSel_Selected_Animate

;'//从新转换缩略

call LibSel_ScalONE_and_CopyTOScal_Parameter_INIT
ld int [ LibSel_loadres_ID ], [ vint_LibSel_cur_PicOffset ]
cal int mul [ LibSel_loadres_ID ], 2

cal int add [ LibSel_loadres_ID ], 1
endasm

LibSel_Pos_ID = 1
LibSel_i = 0
while LibSel_i < LibSel_Scroll_Support_MaxLoad
		
		asm		
		call LibSel_ScalONE_and_CopyTOScal:
		
		cal int add [ LibSel_loadres_ID ], 1
		cal int add [ vint_LibSel_Pos_ID ], 1

		endasm
LibSel_i = LibSel_i + 1
wend

'/从新载入当前背景图片
freeres( LibSel_CurBG_Pic )

LibSel_CurBG_PicID = LibSel_CurSelected + LibSel_cur_PicOffset * 2
LibSel_CurBG_Pic = loadres( LibSel_Lib_Name$, LibSel_CurBG_PicID)

asm
ret

LibSel_QINGWUSHIWODECUNZAI:
endasm
'EndBlock
'EndBlock






