const ScreenPrint_Use_File_ID = 1
const ScrP_touch_id_Selected_LT = &h01
const ScrP_touch_id_Selected_RB = &h02

'//=========截图类函数v1.0==========
declare function ScreenPrint_ALL( ScrP_p_page, ScrP_p_BMP_FileName$)
declare function ScreenPrint_Rect( ScrP_p_PAGE, ScrP_p_x, ScrP_p_y, ScrP_p_Wid, ScrP_p_Hgt, ScrP_p_BMP_FileName$)
declare function ScreenPrint_Supper( ScrP_p_page)
'//全屏截图


function ScreenPrint_ALL( ScrP_p_page, ScrP_p_BMP_FileName$)
'//=========截图类函数 之全屏截图==========
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150
Dim Shared ScrP_src_x, ScrP_src_y
Dim Shared ScrP_x, ScrP_y, ScrP_page
Dim Shared ScrP_wid, ScrP_hgt
Dim Shared ScrP_FileHandle, ScrP_FileName$, ScrP_FileOffset
Dim Shared Scrp_DataOffSet, Scrp_Save_PreLine
Dim Shared ScrP_BMP_FileName$

ScrP_page = ScrP_p_page
ScrP_BMP_FileName$ = ScrP_p_BMP_FileName$

ScrP_FileHandle = ScreenPrint_Use_File_ID
ScrP_wid = 240
ScrP_hgt = 320

asm
call Scrp_CommonInitialization
call [ Scrp_MainProcess_TYPE ]
endasm

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
call Scrp_CommonInitialization
call [ Scrp_MainProcess_TYPE ]
endasm

end function

'//超级截图函数
function ScreenPrint_Supper( ScrP_p_page)
'//=========截图类函数 之超级截图==========
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150
Dim shared ScrP_src_x, ScrP_src_y
Dim shared ScrP_x, ScrP_y, ScrP_page
Dim shared ScrP_wid, ScrP_hgt
Dim shared ScrP_FileHandle, ScrP_FileName$, ScrP_FileOffset
Dim shared Scrp_DataOffSet, Scrp_Save_PreLine
Dim shared ScrP_BMP_FileName$

Dim shared ScrP_key_x, ScrP_key_y
Dim shared ScrP_key_up, ScrP_key_down, ScrP_key_left, ScrP_key_right
Dim shared ScrP_key_escape, ScrP_key_enter
Dim shared ScrP_touch_x, ScrP_touch_y	'触摸点的X Y
Dim shared ScrP_touch_ID	'返回区域的id值
Dim shared Scrp_Supper_UI

Dim shared Scrp_SuperState
'//两个点 选中区域 selected
Dim shared Scrp_Super_Sel_Left, Scrp_Super_Sel_Right, Scrp_Super_Sel_Top, Scrp_Super_Sel_Bottom
Dim shared Scrp_Super_Sel_Wid, Scrp_Super_Sel_Hgt
'//存放当前选中点的指针
Dim shared Scrp_Super_CurP_X, Scrp_Super_CurP_Y, Scrp_Super_CurSel
Dim shared Scrp_Super_Dis_X, Scrp_Super_Dis_Y

'//页面变量
Dim shared Scrp_Super_CatchPage, Scrp_Super_SrcPage, Scrp_Super_GrayPage, Scrp_Super_MenuPage
Dim shared Scrp_Supper_Waiting_IM , Scrp_Supper_Menu_IM, Scrp_Supper_Menu_PR_IM


'//延时变量
Dim shared Scrp_Super_Tick, Scrp_Super_DrawDelay
'/菜单
Dim shared Scrp_Super_Menu_Delay, Scrp_Super_Menu_Alpha!, Scrp_Super_FadeOut_Delay
Dim shared Scrp_Super_Menu_Show_State

Dim shared Scrp_Super_Save_Type '0为Bmp，1为lib

Dim shared Scrp_Super_Temp_X, Scrp_Super_Temp_Y
Dim shared Scrp_Fe$

IF GetEnv!() = Env_SIM Then
	Scrp_Fe$ = ".rlb"
Else
	Scrp_Fe$ = ".lib"
End IF

Scrp_Super_SrcPage = createpage()

BITBLTPAGE( Scrp_Super_SrcPage, ScrP_p_page)

asm
call Scrp_Supper_Main:

Scrp_Supper_Main_END:
endasm
deletepage( Scrp_Super_CatchPage)
deletepage( Scrp_Super_SrcPage)
deletepage( Scrp_Super_GrayPage)
deletepage( Scrp_Super_MenuPage)

freeres( Scrp_Supper_Waiting_IM)
freeres( Scrp_Supper_Menu_IM)
freeres( Scrp_Supper_Menu_PR_IM)

end function

asm
jmp Scrp_Super_QingWuShi:
;//=================超级截图函数的函数主体=======================//
scrp_Supper_Main:
endasm
Scrp_Super_Sel_Left = 60
Scrp_Super_Sel_Right = 180
Scrp_Super_Sel_Top = 80
Scrp_Super_Sel_Bottom = 240
setlcd( 240, 320)
Scrp_Super_CatchPage = createpage()

Scrp_Super_GrayPage = createpage()
Scrp_Super_MenuPage = createpage()
setpen( Scrp_Super_CatchPage, 1, 0, &hffffff)


Scrp_Supper_Waiting_IM = loadres( "ScrP_UI" + Scrp_Fe$, 1)
Scrp_Supper_Menu_IM = loadres( "ScrP_UI" + Scrp_Fe$, 2)
Scrp_Supper_Menu_PR_IM = loadres( "ScrP_UI" + Scrp_Fe$, 3)

'显示菜单到菜单的缓存页
showpic( Scrp_Super_MenuPage, Scrp_Supper_Menu_IM, 116, 0, 124, 24, 0, 0, 1 )

'初始选择的控制点
Scrp_Super_CurSel = ScrP_touch_id_Selected_LT

BITBLTPAGE( Scrp_Super_GrayPage, Scrp_Super_SrcPage)

asm
;'灰度化页面
call Scrp_Super_PageGray_Main_Proc:

;'初始控制点
ld int [ vint_Scrp_Super_CurP_X ], vint_Scrp_Super_Sel_Left
ld int [ vint_Scrp_Super_CurP_Y ], vint_Scrp_Super_Sel_Top

;'初始绘图
call Scrp_Super_DrawRect:
endasm

'菜单初始
Scrp_Super_Menu_Alpha! = 0.0
Scrp_Super_FadeOut_Delay = gettick()

showpic( Scrp_Super_MenuPage, Scrp_Supper_Menu_PR_IM, 215, 0, 25, 12, 99, Scrp_Super_Save_Type * 12, 1)

'//====================主循环===================//
Scrp_SuperState = 1
while Scrp_SuperState = 1

flippage( Scrp_Super_CatchPage)
ScrP_User_Inkey = inkey()
vasm(" call Scrp_Super_GetInput:")

Scrp_Super_Tick = gettick()

'//==选择框缓动==
if ( Scrp_Super_Tick - Scrp_Super_DrawDelay ) > 100 and ( Scrp_Super_Dis_X or Scrp_Super_Dis_Y ) then

'Scrp_Super_Temp_X, Scrp_Super_Temp_Y 一次的移动量
Scrp_Super_Temp_X = Scrp_Super_Dis_X * 0.5
Scrp_Super_Temp_Y = Scrp_Super_Dis_Y * 0.5

asm

ld int r1, [ vint_Scrp_Super_CurP_X ]
ld int r2, [ vint_Scrp_Super_CurP_Y ]

cal int add [ r1 ], [ vint_Scrp_Super_Temp_X ]
cal int add [ r2 ], [ vint_Scrp_Super_Temp_Y ]

call Scrp_Super_DrawRect:
endasm

Scrp_Super_Dis_X = Scrp_Super_Dis_X - Scrp_Super_Temp_X
Scrp_Super_Dis_Y = Scrp_Super_Dis_Y - Scrp_Super_Temp_Y

Scrp_Super_DrawDelay = gettick()
end if

'//==菜单的淡入淡出==
if Scrp_Super_Menu_Show_State then
if ( Scrp_Super_Tick - Scrp_Super_FadeOut_Delay ) > 2500 then
	
	'/这里开始出来淡出
	if ( Scrp_Super_Tick - Scrp_Super_Menu_Delay) > 200 then
	asm
	;'初始绘图
	call Scrp_Super_DrawRect:
	
	call Scrp_Super_AphlaMix_Process:

	;'把那部分从新拷贝到菜单的缓存页,位置就在源菜单的下面
	ld int [ Scrp_Super_Show_MenuPage_Para_dest ], [ vint_Scrp_Super_MenuPage ]
	ld int [ Scrp_Super_Show_MenuPage_Para_src ], [ vint_Scrp_Super_CatchPage ]

	ld int [ Scrp_Super_Show_MenuPage_Para_src_y ], 0
	ld int [ Scrp_Super_Show_MenuPage_Para_dest_y ], 24
	
	ld int r3, Scrp_Super_Show_MenuPage_Para_Src
	OUT 80,0
	endasm
	
	Scrp_Super_Menu_Alpha! = Scrp_Super_Menu_Alpha! + 0.1
	Scrp_Super_Menu_Delay = gettick()
	
	else if Scrp_Super_Menu_Alpha! > 0.8 then
	
	
	'重置
	Scrp_Super_Menu_Alpha! = 0
	Scrp_Super_Menu_Show_State = 0
	
	'显示淡出缓存
	else
	
	asm
	;'不可能每次都对Alpha混合计算，所以就显示缓存的
	ld int [ Scrp_Super_Show_MenuPage_Para_src ], [ vint_Scrp_Super_MenuPage ]
	ld int [ Scrp_Super_Show_MenuPage_Para_Dest ], [ vint_Scrp_Super_CatchPage ]

	ld int [ Scrp_Super_Show_MenuPage_Para_dest_y ], 0
	ld int [ Scrp_Super_Show_MenuPage_Para_src_y ], 24

		ld int r3, Scrp_Super_Show_MenuPage_Para_Src
		OUT 80,0

	endasm
	
	end if




else 

asm
;'显示菜单
;'这个在前面显示，导致后面按键盘再次刷新页面的时候就没有了这个，这样一来感觉还是可以的
ld int [ Scrp_Super_Show_MenuPage_Para_Dest ], [ vint_Scrp_Super_CatchPage ]
ld int [ Scrp_Super_Show_MenuPage_Para_Src ], [ vint_Scrp_Super_MenuPage ]

ld int [ Scrp_Super_Show_MenuPage_Para_src_y ], 0
ld int [ Scrp_Super_Show_MenuPage_Para_dest_y ], 0
	ld int r3, Scrp_Super_Show_MenuPage_Para_Src
	OUT 80,0

endasm
end if

end if




'//处理菜单点击
if ScrP_key_escape then

	if Scrp_Super_Menu_Show_State then
	else
		Scrp_Super_Menu_Show_State = 1
		Scrp_Super_FadeOut_Delay = gettick()
		vasm(" call Scrp_Super_DrawRect:") '刷新页面
	end if
	
'//处理普通点击
else if ScrP_touch_id > 0 then





'//处理单独的键盘操作
else 
'==//退出
if ScrP_key_escape then
	Scrp_SuperState = 0
'==//确认
else if ScrP_key_Enter then
	vasm(" call Scrp_Super_Save")
'==//剩下的只有方向键了
else if ScrP_key_left or ScrP_key_Right or ScrP_key_up or ScrP_key_down then
	
	Scrp_Super_Temp_X = - ScrP_key_left + ScrP_key_Right
	Scrp_Super_Temp_Y = - ScrP_key_up + ScrP_key_down 
	
	if ( Scrp_Super_Sel_Left + Scrp_Super_Temp_X ) >= 0 and ( Scrp_Super_Sel_Right + Scrp_Super_Temp_X ) < 240 and ( Scrp_Super_Sel_Top + Scrp_Super_Temp_Y ) >= 0 and ( Scrp_Super_Sel_bottom + Scrp_Super_Temp_Y ) < 320  then
	
		Scrp_Super_Sel_Left = Scrp_Super_Sel_Left + Scrp_Super_Temp_X
		Scrp_Super_Sel_Right = Scrp_Super_Sel_Right + Scrp_Super_Temp_X
		Scrp_Super_Sel_Top = Scrp_Super_Sel_Top + Scrp_Super_Temp_Y
		Scrp_Super_Sel_Bottom = Scrp_Super_Sel_Bottom + Scrp_Super_Temp_Y
	
	

	asm
	call Scrp_Super_DrawRect:
	endasm
	
	end if
	
end if

end if



wend

asm
ret

;'//======================获取输入消息
Scrp_Super_GetInput:
endasm
'==/////===========触屏
if ScrP_User_Inkey < 0 then
	ScrP_touch_x = getpenposx( ScrP_User_Inkey)
	ScrP_touch_y = getpenposy( ScrP_User_Inkey)
	ScrP_touch_id = -1
	VASM(" call Scrp_Super_calTouchId") '计算触摸
	
else
	ScrP_touch_x = -1
	ScrP_touch_y = -1
	ScrP_touch_id = -1
end if
'==/////=========== 方向键
VASM("LD INT r3,38") '//==UP
VASM("OUT 34,0")
VASM("LD INT [VINT_ScrP_key_up],r3")

VASM("LD INT r3,40") '//==DOWN
VASM("OUT 34,0")
VASM("LD INT [VINT_ScrP_Key_Down],r3")

VASM("LD INT r3,37") '//==left
VASM("OUT 34,0")
VASM("LD INT [VINT_ScrP_Key_Left],r3")

VASM("LD INT r3,39") '//==right
VASM("OUT 34,0")
VASM("LD INT [VINT_ScrP_Key_Right],r3")
'//==============其他键
VASM("LD INT r3,13") '//==ENTER
VASM("OUT 34,0")
VASM("LD INT [VINT_ScrP_Key_Enter],r3")

VASM("LD INT r3,27") '//==ESCAPE
VASM("OUT 34,0")
VASM("LD INT [VINT_ScrP_Key_Escape],r3")
asm
ret

;'STRETCHBLTPAGEEX(X,Y,WID,HGT,CX,CY,DEST,SRC)
;显示菜单页的参数
data Scrp_Super_Show_MenuPage_Para_Src dword 0
data Scrp_Super_Show_MenuPage_Para_Dest dword 0
data Scrp_Super_Show_MenuPage_Para_src_Y dword 0, 116, 24, 124
data Scrp_Super_Show_MenuPage_Para_dest_Y dword 0, 116
;能够对y值进行修改，显示上一个的缓存

;调用一些端口的参数列表
Scrp_Super_Paramater_8:
.block 4 0
Scrp_Super_Paramater_7:
.block 4 0
Scrp_Super_Paramater_6:
.block 4 0
Scrp_Super_Paramater_5:
.block 4 0
Scrp_Super_Paramater_4:
.block 4 0
Scrp_Super_Paramater_3:
.block 4 0
Scrp_Super_Paramater_2:
.block 4 0
Scrp_Super_Paramater_1:
.block 4 0
Scrp_Super_Paramater_Catch:

;颜色
Scrp_Super_ColorBlue:
.block 1 0
Scrp_Super_ColorGreen:
.block 1 0
Scrp_Super_ColorRed:
.block 2 0

;//============页面半灰过程---颜色减半==============//
;颜色减半
Scrp_Super_HalfGray:
;传入参数 r0
;结果返回 r0

ld int [ Scrp_Super_ColorBlue ], r0

cal byte div [ Scrp_Super_ColorBlue ], 2
cal byte div [ Scrp_Super_ColorGreen ], 2
cal byte div [ Scrp_Super_ColorRed ], 2

ld int r0, [ Scrp_Super_ColorBlue ]

ret

;//========绘制页面==========//
;这个是这个的核心，所以大部分汇编，本来速度不是很快的
;'//矩形绘制  因为矩形绘制函数有问题，所以才用的这个函数
Scrp_Super_DrawRect:

;页面绘制
;先用灰度的填充整个页面
;BITBLTPAGE(DEST,SRC)
;Scrp_Super_CatchPage, Scrp_Super_SrcPage, Scrp_Super_GrayPage

ld int r2, [ vint_Scrp_Super_CatchPage ]
ld int r3, [ vint_Scrp_Super_GrayPage ]

OUT 22,0
;显示原页面
;'STRETCHBLTPAGEEX(X,Y,WID,HGT,CX,CY,DEST,SRC)

ld int [ Scrp_Super_Paramater_1 ], [ vint_Scrp_Super_Sel_Left ]
ld int [ Scrp_Super_Paramater_2 ], [ vint_Scrp_Super_Sel_Top ]

ld int r1, [ vint_Scrp_Super_Sel_Left ]
ld int r2, [ vint_Scrp_Super_Sel_Right ]
cal int sub r2, r1

ld int [ Scrp_Super_Paramater_3 ], r2	'wid

ld int r1, [ vint_Scrp_Super_Sel_Top ]
ld int r2, [ vint_Scrp_Super_Sel_Bottom ]
cal int sub r2, r1

ld int [ Scrp_Super_Paramater_4 ], r2	'hgt
ld int [ Scrp_Super_Paramater_5 ], [ vint_Scrp_Super_Sel_Left ]
ld int [ Scrp_Super_Paramater_6 ], [ vint_Scrp_Super_Sel_Top ] 
ld int [ Scrp_Super_Paramater_7 ], [ vint_Scrp_Super_CatchPage ]
ld int [ Scrp_Super_Paramater_8 ], [ vint_Scrp_Super_SrcPage ]

ld int r3, Scrp_Super_Paramater_8
OUT 80,0

;'==//绘制矩形框
ld int r1, [ vint_Scrp_Super_CatchPage ]

;MoveTo左上
ld int r2, [ vint_Scrp_Super_Sel_Left ]
ld int r3, [ vint_Scrp_Super_Sel_Top ]
out 66, 0

;LineTo右上
ld int r2, [ vint_Scrp_Super_Sel_Right ]
out 67, 0

;LineTo右下
ld int r3, [ vint_Scrp_Super_Sel_Bottom ]
out 67, 0

;LineTo左下
ld int r2, [ vint_Scrp_Super_Sel_Left ]
out 67, 0
;LineTo左上
ld int r3, [ vint_Scrp_Super_Sel_Top ]
out 67, 0


;'下面的所有操作都是在这个页面上
ld int [ Scrp_Super_Paramater_1 ], [ vint_Scrp_Super_CatchPage ]
;'==//绘制控制点
ld int [ Scrp_Super_Paramater_4 ], 10	'wid
ld int [ Scrp_Super_Paramater_5 ], 10	'hgt
ld int [ Scrp_Super_Paramater_6 ], 16777215	'color 0xffffff
;'=/左上点
ld int [ Scrp_Super_Paramater_2 ], [ vint_Scrp_Super_Sel_Left ]
ld int [ Scrp_Super_Paramater_3 ], [ vint_Scrp_Super_Sel_Top ]

cal int add [ Scrp_Super_Paramater_2 ], - 5
cal int add [ Scrp_Super_Paramater_3 ], - 5

ld int r3, Scrp_Super_Paramater_6
OUT 23,0
;'=/右下点
ld int [ Scrp_Super_Paramater_2 ], [ vint_Scrp_Super_Sel_Right ]
ld int [ Scrp_Super_Paramater_3 ], [ vint_Scrp_Super_Sel_Bottom ]

cal int add [ Scrp_Super_Paramater_2 ], - 5
cal int add [ Scrp_Super_Paramater_3 ],  - 5

ld int r3, Scrp_Super_Paramater_6
OUT 23,0

;'==//当前选中控制点
ld int r1, [ vint_Scrp_Super_CurP_X ]
ld int r2, [ vint_Scrp_Super_CurP_Y ]

ld int [ Scrp_Super_Paramater_2 ], [ r1 ]	'x
ld int [ Scrp_Super_Paramater_3 ], [ r2 ]	'y

cal int add [ Scrp_Super_Paramater_2 ], - 3
cal int add [ Scrp_Super_Paramater_3 ],  - 3

ld int [ Scrp_Super_Paramater_4 ], 6	'wid
ld int [ Scrp_Super_Paramater_5 ], 6	'hgt
ld int [ Scrp_Super_Paramater_6 ], 16711680	'color 0xff 本来应该是红色，在bb中是蓝色

OUT 23,0

ret

;'//=================计算触摸区Id======================//
Scrp_Super_calTouchId:
endasm

'//===============================菜单显示的时候的时候，检测选择的菜单项
if Scrp_Super_Menu_Show_State and ScrP_touch_x > 118 and ScrP_touch_Y < 22 then

'选择到了菜单区域


Scrp_Super_Temp_X = ScrP_touch_x - 118
Scrp_Super_FadeOut_Delay = gettick()

'菜单选择就在这里处理了，不再放在上面处理
	if Scrp_Super_Temp_X < 10 then
	Scrp_SuperState = 0
	
	else if Scrp_Super_Temp_X < 25 then
	
	Scrp_Super_Sel_Left = 0
	Scrp_Super_Sel_Right = 239
	Scrp_Super_Sel_Top = 0 
	Scrp_Super_Sel_Bottom = 319
	
	Scrp_Super_Dis_X = 0
	Scrp_Super_Dis_T = 0
	
	else if Scrp_Super_Temp_X < 62 then
	
	vasm(" call Scrp_Super_Save")
	
	'浏览
	else if Scrp_Super_Temp_X < 99 then
	
	fillpage( -1, 0, 0, 240, 320, 0)
	Scrp_Super_Sel_Wid = Scrp_Super_Sel_Right - Scrp_Super_Sel_Left + 1
	Scrp_Super_Sel_Hgt = Scrp_Super_Sel_bottom - Scrp_Super_Sel_top + 1
	
	STRETCHBLTPAGEEX( ( 240 - Scrp_Super_Sel_Wid ) / 2, ( 320 - Scrp_Super_Sel_Hgt ) / 2, Scrp_Super_Sel_Wid, Scrp_Super_Sel_Hgt, Scrp_Super_Sel_left, Scrp_Super_Sel_top, - 1, Scrp_Super_SrcPage)
	
	waitkey()
	
	'选择保存的格式
	else 
	
	showpic( Scrp_Super_MenuPage, Scrp_Supper_Menu_IM, 215, Scrp_Super_Save_Type * 12, 25, 12, 99, Scrp_Super_Save_Type * 12, 1)
	
	if ScrP_touch_Y < 12 then
	Scrp_Super_Save_Type = 0
	else 
	Scrp_Super_Save_Type = 1
	end if
	
	showpic( Scrp_Super_MenuPage, Scrp_Supper_Menu_PR_IM, 215, Scrp_Super_Save_Type * 12, 25, 12, 99, Scrp_Super_Save_Type * 12, 1)

	end if

'//===============================普通点击
else

'计算触摸范围  是否选中控制点
if ScrP_touch_x < Scrp_Super_Sel_Left + 5 and ScrP_touch_x > Scrp_Super_Sel_Left - 5 and ScrP_touch_y < Scrp_Super_Sel_Top + 5 and ScrP_touch_y > Scrp_Super_Sel_Top - 5 then

ScrP_touch_id = ScrP_touch_id_Selected_LT
Scrp_Super_CurSel = ScrP_touch_id_Selected_LT
asm

ld int [ vint_Scrp_Super_CurP_X ], vint_Scrp_Super_Sel_Left
ld int [ vint_Scrp_Super_CurP_Y ], vint_Scrp_Super_Sel_Top

call Scrp_Super_DrawRect:
endasm
else if ScrP_touch_x < Scrp_Super_Sel_right + 5 and ScrP_touch_x > Scrp_Super_Sel_right - 5 and ScrP_touch_y < Scrp_Super_Sel_bottom + 5 and ScrP_touch_y > Scrp_Super_Sel_bottom - 5 then

ScrP_touch_id = ScrP_touch_id_Selected_RB
Scrp_Super_CurSel = ScrP_touch_id_Selected_RB
asm

ld int [ vint_Scrp_Super_CurP_X ], vint_Scrp_Super_Sel_Right
ld int [ vint_Scrp_Super_CurP_Y ], vint_Scrp_Super_Sel_Bottom

call Scrp_Super_DrawRect:
endasm


else

Scrp_Super_DrawDelay = gettick()

'//这里要检查边界 两个点不能变换
if Scrp_Super_CurSel = ScrP_touch_id_Selected_LT then
	
	if ScrP_touch_x < Scrp_Super_Sel_Right and ScrP_touch_y < Scrp_Super_Sel_Bottom then
	
		Scrp_Super_Dis_X = ScrP_touch_x - Scrp_Super_Sel_Left
		Scrp_Super_Dis_Y = ScrP_touch_y - Scrp_Super_Sel_Top
	
	end if
else

	if ScrP_touch_x > Scrp_Super_Sel_Left and ScrP_touch_y > Scrp_Super_Sel_Top then
	
		Scrp_Super_Dis_X = ScrP_touch_x - Scrp_Super_Sel_Right
		Scrp_Super_Dis_Y = ScrP_touch_y - Scrp_Super_Sel_Bottom
	
	end if

end if

'这个是结束普通点击屏幕的
end if

'这个是结束esc判断的
end if

asm
ret

;//==========保存===========//
Scrp_Super_Save:
endasm

ScrP_page = Scrp_Super_SrcPage

ScrP_src_x = Scrp_Super_Sel_Left
ScrP_src_y = Scrp_Super_Sel_top
ScrP_Wid = Scrp_Super_Sel_Right - Scrp_Super_Sel_Left + 1
ScrP_hgt = Scrp_Super_Sel_bottom - Scrp_Super_Sel_top + 1

ScrP_FileHandle = ScreenPrint_Use_File_ID

'存为lib
if Scrp_Super_Save_Type then

ScrP_BMP_FileName$ = ""

'存为Bmp
else

ScrP_BMP_FileName$ = "SP_Wen" + gettick()
end if

showpic( -1, Scrp_Supper_Menu_PR_IM, 116, 0, 100, 24, 0, 24, 1)

asm
;'调用主过程
call Scrp_CommonInitialization
call [ Scrp_MainProcess_TYPE ]
endasm

showpic( -1, Scrp_Supper_Menu_PR_IM, 116, 0, 100, 24, 0, 0, 1)

waitkey()

asm
ret

;//==========页面灰度化的主要过程===========//
;速度较快，在小机上一秒都用不到
Scrp_Super_PageGray_Main_Proc:

ld int [ vint_Scrp_Super_Temp_Y ], 0
ld int [ Scrp_Super_Paramater_1 ], [ vint_Scrp_Super_GrayPage ]

;'Scrp_Super_Temp_Y = 0
;'while Scrp_Super_Temp_Y < 320

Scrp_Super_GrayPage_y_Bend:
cmp int [ vint_Scrp_Super_Temp_Y ], 320
jpc AE Scrp_Super_GrayPage_y_Wend:
	
	ld int [ vint_Scrp_Super_Temp_x ], 0
	
;'	Scrp_Super_Temp_X = 0
;'	while Scrp_Super_Temp_X < 240

	Scrp_Super_GrayPage_x_Bend:
	cmp int [ vint_Scrp_Super_Temp_X ], 240
	jpc AE Scrp_Super_GrayPage_x_Wend:
		
		
		;' readpixel
		;'ld int [ Scrp_Super_Paramater_1 ], [ vint_Scrp_Super_CatchPage ]
		ld int [ Scrp_Super_Paramater_2 ], [ vint_Scrp_Super_Temp_X ]
		;'ld int [ Scrp_Super_Paramater_3 ], [ vint_Scrp_Super_Temp_Y ]
		
		ld int r3, Scrp_Super_Paramater_3
		OUT 25,0
		
		ld int r0, r3
		
		;'处理颜色
		call Scrp_Super_HalfGray
		
		;' pixel
		ld int [ Scrp_Super_Paramater_4 ], r0
		ld int r3, Scrp_Super_Paramater_4
		OUT 24,0
		
		
		cal int add [ vint_Scrp_Super_Temp_X ], 1
		
	;'Scrp_Super_Temp_X = Scrp_Super_Temp_X + 1
	;'wend
	jmp Scrp_Super_GrayPage_x_Bend:
	Scrp_Super_GrayPage_X_Wend:

cal int add [ vint_Scrp_Super_Temp_Y ], 1
ld int [ Scrp_Super_Paramater_3 ], [ vint_Scrp_Super_Temp_Y ]

;显示等待图片
call Scrp_Supper_Show_Waiting_Img:
;'Scrp_Super_Temp_Y = Scrp_Super_Temp_Y + 1
;'wend

jmp Scrp_Super_GrayPage_y_Bend:
Scrp_Super_GrayPage_Y_Wend:

ret

;//===========显示等待的图片===========//
;每调用20次显示一次 这样才没有那么浪费时间
data Scrp_Supper_Show_Waiting_Img_Times dword 0

data Scrp_Supper_Show_Waiting_Img_p_9 dword 0
data Scrp_Supper_Show_Waiting_Img_p_8 dword 0
data Scrp_Supper_Show_Waiting_Img_p_7 dword 0
data Scrp_Supper_Show_Waiting_Img_p_6 dword 40
data Scrp_Supper_Show_Waiting_Img_p_5 dword 40
data Scrp_Supper_Show_Waiting_Img_p_4 dword 280
data Scrp_Supper_Show_Waiting_Img_p_3 dword 0
data Scrp_Supper_Show_Waiting_Img_p_2 dword 0
data Scrp_Supper_Show_Waiting_Img_p_1 dword - 1


;WaitProc
Scrp_Supper_Show_Waiting_Img:

cal int mod [ Scrp_Supper_Show_Waiting_Img_Times ], 20
cmp int [ Scrp_Supper_Show_Waiting_Img_Times ], 0
jpc NZ Scrp_Supper_Show_Waiting_Img_End


cal int mod [ Scrp_Supper_Show_Waiting_Img_p_7 ], 200


ld int [ Scrp_Supper_Show_Waiting_Img_p_2 ], [ vint_Scrp_Supper_Waiting_IM ]
ld int r3, Scrp_Supper_Show_Waiting_Img_p_9
out 20, 0

cal int add [ Scrp_Supper_Show_Waiting_Img_p_7 ], 40

Scrp_Supper_Show_Waiting_Img_End:

cal int add [ Scrp_Supper_Show_Waiting_Img_Times ], 1

ret


;'需要用来存放合成颜色的的空间
Scrp_Super_Temp_ColorBlue:
.block 1 0
Scrp_Super_Temp_ColorGreen:
.block 1 0
Scrp_Super_Temp_ColorRed:
.block 2 0

;alpha混合
;//===============Alpha混合单步过程==================//
Scrp_Super_AphlaMix:
;参数 透明度 r0 混合色 r1, 原色 r2 
;注意 r3 的范围是 0 - 1 的浮点数
;返回 r1
; C1 * Al + c2 * ( 1 - al ) = C1 * al + c2 - c2 * al


ld int [ Scrp_Super_ColorBlue ], r1
ld int [ Scrp_Super_temp_ColorBlue ], r2



;B
;'每次都要置0
ld int r3, 0

ld byte r3, [ Scrp_Super_ColorBlue ]
in r1, 1

ld byte r3, [ Scrp_Super_temp_ColorBlue ]
in r2, 1

;call Scrp_Super_AphlaMix_Sub_One:
cal float mul r1, r0
cal float add r1, r2
cal float mul r2, r0
cal float sub r1, r2
ld int r3, r1
in r1, 0

ld byte [ Scrp_Super_ColorBlue ], r1

;G
ld int r3, 0

ld byte r3, [ Scrp_Super_ColorGreen ]
in r1, 1

ld byte r3, [ Scrp_Super_temp_ColorGreen ]
in r2, 1

;call Scrp_Super_AphlaMix_Sub_One:

cal float mul r1, r0
cal float add r1, r2
cal float mul r2, r0
cal float sub r1, r2
ld int r3, r1
in r1, 0

ld byte [ Scrp_Super_ColorGreen ], r1

;R
ld int r3, 0

ld byte r3, [ Scrp_Super_ColorRed ]
in r1, 1

ld byte r3, [ Scrp_Super_temp_ColorRed ]
in r2, 1

;call Scrp_Super_AphlaMix_Sub_One:
cal float mul r1, r0
cal float add r1, r2
cal float mul r2, r0
cal float sub r1, r2
ld int r3, r1
in r1, 0

ld byte [ Scrp_Super_ColorRed ], r1

;返回结果
ld int r1, [ Scrp_Super_ColorBlue ]

ret
;//===============Alpha混合-循环全过程==================//
;这一步是要求尽可能的快  所以在很多地方都处理了下，计算的时候是直接用的参数来计算的
;可能看起来有点不太明白，但是我也没办法了
;要是这一步慢了，那会影响使用的

Scrp_Super_AphlaMix_Process:
;初始

;'Scrp_Super_Temp_Y = 0
ld int [ Scrp_Super_Paramater_3 ], 0

Scrp_Super_AphlaMix_Process_Y_Bend:
;'while Scrp_Super_Temp_Y < 24	
cmp int [ Scrp_Super_Paramater_3 ], 24
jpc AE Scrp_Super_AphlaMix_Process_Y_Wend
	
	;'Scrp_Super_Temp_X = 115
	ld int [ Scrp_Super_Paramater_2 ], 115
	Scrp_Super_AphlaMix_Process_X_Bend:
	;'while Scrp_Super_Temp_X < 240
	
	cmp int [ Scrp_Super_Paramater_2 ], 240
	jpc AE Scrp_Super_AphlaMix_Process_X_Wend
	
	;'cm = readpixel( m, x, Scrp_Super_Temp_Y )
	;'cn = readpixel( n, x, Scrp_Super_Temp_Y )
	
	ld int [ Scrp_Super_Paramater_1 ], [ vint_Scrp_Super_MenuPage ]
	ld int r3, Scrp_Super_Paramater_3
	OUT 25,0
	
	ld int r2, r3
	
	ld int [ Scrp_Super_Paramater_1 ], [ vint_Scrp_Super_CatchPage ]
	ld int r3, Scrp_Super_Paramater_3
	OUT 25,0
	
	ld int r1, r3
		
	ld int r0, [ vflo_Scrp_Super_Menu_Alpha]
	call Scrp_Super_AphlaMix:
	
	;混合颜色
	ld int [ Scrp_Super_Paramater_4 ], r1
	'pixel( n, x, Scrp_Super_Temp_Y, cn )
	ld int r3, Scrp_Super_Paramater_4
	OUT 24,0
	
	
	cal int add [ Scrp_Super_Paramater_2 ], 1
	'wend
	jmp Scrp_Super_AphlaMix_Process_X_Bend
	Scrp_Super_AphlaMix_Process_X_Wend:
		

;'Scrp_Super_Temp_Y = Scrp_Super_Temp_Y + 1
;'wend

cal int add [ Scrp_Super_Paramater_3 ], 1
	
'wend
jmp Scrp_Super_AphlaMix_Process_Y_Bend
Scrp_Super_AphlaMix_Process_Y_Wend:

ret
Scrp_Super_QingWuShi:
endasm

asm
Jmp Scrp_QingWuShi:
;数据块
Scrp_Catch:
.block 1 0
Scrp_Catch_SavePostion:
.block 4096 0

;颜色
Scrp_ColorTranslate_Catch_Blue:
.block 1 0
Scrp_ColorTranslate_Catch_Green:
.block 1 0
Scrp_ColorTranslate_Catch_Red:
.block 2 0

;16位色的缓存
Scrp_ColorTranslate_Catch_16Bit_1:
.block 1 0
Scrp_ColorTranslate_Catch_16Bit_2:
.block 3 0

;调用一些端口的参数列表
Scrp_Paramater_4:
.block 4 0
Scrp_Paramater_3:
.block 4 0
Scrp_Paramater_2:
.block 4 0
Scrp_Paramater_1:
.block 4 0
Scrp_Paramater_Catch:

;初始化的缓存
Scrp_Init_Bit1:
.block 2 0
Scrp_Init_Bit2:
.block 4 0

data Scrp_i dword 0
data Scrp_j dword 0
data Scrp_k dword 0
data Scrp_Color_Tranform_TYPE dword 0
data Scrp_SaveAs_TYPE dword 0
data Scrp_MainProcess_TYPE dword 0
;//=============颜色转换过程=============//
;子过程，把BGR的颜色制式和RGB互相转换
;基本上这个过程是多余的，应该都不会用到~
Scrp_ColorTranslate:
;参数： r0 
;返回： r0




ld int [ Scrp_ColorTranslate_Catch_Blue ], r0
ld byte r0, [ Scrp_ColorTranslate_Catch_Blue ]

ld byte [ Scrp_ColorTranslate_Catch_Blue ], [ Scrp_ColorTranslate_Catch_Red ]
ld byte [ Scrp_ColorTranslate_Catch_Red ], r0

ld int r0, [ Scrp_ColorTranslate_Catch_Blue ]
ret
;
;//==========子过程，把R8 G8 B8转换成R5 G6 B5==========//
;'缓存机制，初始为-1
data Scrp_ColorTranslate_LastColor_Catch dword %ffffffff%

Scrp_ColorCover_16Bit:
;参数: r0
;返回: r0 返回值是8位的颜色

;'if r0 = LastColor_Catch 缓存
;\\
cmp int r0, [ Scrp_ColorTranslate_LastColor_Catch ]
jpc z Scrp_ColorTranslate_ColorEqual:

ld int [ Scrp_ColorTranslate_LastColor_Catch ], r0
;'如果两次的颜色相同，则不处理

;\\
ld int [ Scrp_ColorTranslate_Catch_Blue ], r0

ld int r1, 0
ld int r2, 0
ld int r3, 0
;换色 取色

call [ Scrp_Color_Tranform_TYPE ]


ld int r0, r1
cal int add r0, r2
cal int add r0, r3



;处理00
ld int [ Scrp_ColorTranslate_Catch_16Bit_1 ], r0



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
cmp int [ Scrp_ColorTranslate_Catch_16Bit_1 ], 0
JPC NZ Scrp_ColorCover_Else_12:

ld int [ Scrp_ColorTranslate_Catch_16Bit_1 ], 2113

jmp Scrp_ColorCover_EndIf_12:
; else
Scrp_ColorCover_Else_12:

	;第一位
	; if bite1 = 0 then
	cmp byte [ Scrp_ColorTranslate_Catch_16Bit_1 ], 0
	JPC NZ Scrp_ColorCover_Else_1:
	
	ld byte [ Scrp_ColorTranslate_Catch_16Bit_1 ], 1
	
	jmp Scrp_ColorCover_EndIf_12:
	; else if bite2 = 0 then
	Scrp_ColorCover_Else_1:

	cmp byte [ Scrp_ColorTranslate_Catch_16Bit_2 ], 0
	JPC NZ Scrp_ColorCover_EndIf_12:
	
	ld byte [ Scrp_ColorTranslate_Catch_16Bit_2 ], 8
	
Scrp_ColorCover_EndIf_12:



;'相同则跳过处理
Scrp_ColorTranslate_ColorEqual:

ld int r0, [ Scrp_ColorTranslate_Catch_16Bit_1 ]

ret

;//=============颜色转换过程====Lib 或 BMP=================//
Scrp_Color_Tranform_LIB:

ld byte r1, [ Scrp_ColorTranslate_Catch_Red ]	;[ Scrp_ColorTranslate_Catch_Blue ]
ld byte r2, [ Scrp_ColorTranslate_Catch_Green ]
ld byte r3, [ Scrp_ColorTranslate_Catch_Blue ]	;[ Scrp_ColorTranslate_Catch_Red ]

cal int Div r1, 8
cal int Div r2, 4	;G6
cal int Div r3, 8

cal int mul r2, 32
cal int mul r3, 2048

ret

Scrp_Color_Tranform_BMP:

ld byte r1, [ Scrp_ColorTranslate_Catch_Red ]
ld byte r2, [ Scrp_ColorTranslate_Catch_Green ]
ld byte r3, [ Scrp_ColorTranslate_Catch_Blue ]


cal int Div r1, 8
cal int Div r2, 8
cal int Div r3, 8

cal int mul r2, 32
cal int mul r3, 1024

ret

;//=============公有的初始化=====================//
Scrp_CommonInitialization:

;初始化参数 这样确保只运行一次
ld int [ Scrp_Paramater_1 ], [ vint_ScrP_page ]

;重置数据偏移
ld int [ vint_Scrp_DataOffSet ], Scrp_Catch:

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
ld int [ Scrp_SaveAs_TYPE ], Scrp_SaveAs_lib
ld int [ Scrp_Color_Tranform_TYPE ], Scrp_Color_Tranform_lib
ld int [ Scrp_MainProcess_TYPE ], Scrp_MainProcess_lib
endasm

else
ScrP_FileName$ = ScrP_BMP_FileName$ + ".bmp"
asm
ld int [ Scrp_SaveAs_TYPE ], Scrp_SaveAs_bmp
ld int [ Scrp_Color_Tranform_TYPE ], Scrp_Color_Tranform_bmp
ld int [ Scrp_MainProcess_TYPE ], Scrp_MainProcess_bmp
endasm

end if

asm
;生成头文件，计算写入位置
call [ Scrp_SaveAs_TYPE ]

ret


	;//=============一个点的颜色处理过程=================//
	Scrp_OnePixel_Proc:
	
	;参数是倒序的~
	;这一句放到了初始化中处理
	;'ld int [ Scrp_Paramater_1 ], [ vint_ScrP_page ]
	ld int [ Scrp_Paramater_2 ], [ vint_ScrP_x ]
	;这一句已经放到了主循环中处理 加快速度
	;' ld int [ Scrp_Paramater_3 ], [ vint_ScrP_y ]
	ld int r3, Scrp_Paramater_3
	OUT 25,0
	
	ld int r0, r3

	call Scrp_ColorCover_16Bit
	
	ld int r1, [ vint_Scrp_DataOffSet ]

	ld int [ r1 ], r0

	ret


;//=============保存一次的过程=================//
Scrp_OnePixel_Save_Proc:

ld int r1, [ vint_ScrP_y ]

;'if ( ScrP_y mod PreLine ) = 0 then
cal int mod r1, [ vint_Scrp_Save_PreLine ]
cmp int r1, 0
jpc NZ Scrp_Main_Save_EndIf:

;此时指的是下一个，因为避免参差的长度，所以写个0在后面防止意外
ld int r1, [ vint_Scrp_DataOffSet ]
ld int [ r1 ], 0

;存入
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, Scrp_Catch

out 51, 18

;重置数据指针
ld int [ vint_Scrp_DataOffSet ], Scrp_Catch


;指针回一字节
; loc( 1) - 1
ld int r3, [ vint_ScrP_FileHandle ]
out 54, 0

;seek
ld int r2, [ vint_ScrP_FileHandle ]
cal int add r3, - 1
out 55, 16

;'end if
Scrp_Main_Save_EndIf:


ret

;//=============主要的截图过程----LIB=================//
Scrp_MainProcess_LIB:



;'下面这个循环运行次数是最多的，所以全都汇编了

;'这个运算是截图矩形框的偏移
cal int add [ vint_ScrP_Hgt ], [ vint_ScrP_src_y ]
cal int add [ vint_ScrP_wid ], [ vint_ScrP_src_x ]

;'ScrP_y = src_y 
;'while ScrP_y < Hgt

ld int [ vint_ScrP_y ], [ vint_ScrP_src_y ]

;' while ScrP_Y < Hgt
Scrp_Main_Y_Bend_LIB:
cmp int [ vint_ScrP_Y ], [ vint_ScrP_Hgt ]
jpc AE Scrp_Main_Y_Wend_LIB:


	;'ScrP_x = src_x 
	ld int [ vint_ScrP_x ], [ vint_ScrP_src_x ]
	
	; 'while ScrP_x < Wid
	Scrp_Main_X_Bend_LIB:
	cmp int [ vint_ScrP_x ], [ vint_ScrP_wid ]
	jpc AE Scrp_Main_X_Wend_LIB:
	

	call Scrp_OnePixel_Proc:
	
	;'数据偏移+2
	cal int add [ vint_Scrp_DataOffSet ], 2
	; 'ScrP_x ++
	cal int add [ vint_ScrP_x ], 1
	
	;'Wend
	jmp Scrp_Main_X_Bend_LIB:
	Scrp_Main_x_Wend_LIB:


;'ScrP_y = ScrP_y + 1

cal int add [ vint_ScrP_y ], 1
;'有种觉得 Srcp_Y是多余的感觉
;'参数赋值
ld int [ Scrp_Paramater_3 ], [ vint_ScrP_y ]


;'判断是否储存
call Scrp_OnePixel_Save_Proc:

;'wend
jmp Scrp_Main_Y_Bend_LIB:
Scrp_Main_Y_Wend_LIB:


call Scrp_MainProcess_Last:

ret


;//=============主要的截图过程----BMP=================//
Scrp_MainProcess_BMP:



;'下面这个循环运行次数是最多的，所以全都汇编了

;'bmp 4bit  计算
ld int [ scrp_i ], [ vint_ScrP_wid ]
cal int mod [ scrp_i ], 2

;'这个运算是截图矩形框的偏移
cal int add [ vint_ScrP_Hgt ], [ vint_ScrP_src_y ]
cal int add [ vint_ScrP_wid ], [ vint_ScrP_src_x ]


;'ScrP_y = src_y
;'while ScrP_y < Hgt

ld int [ vint_ScrP_y ], [ vint_ScrP_Hgt ]
;'矫正
cal int add [ vint_ScrP_y ], - 1

;' while ScrP_Y < Hgt
Scrp_Main_Y_Bend_BMP:
cmp int [ vint_ScrP_Y ], [ vint_ScrP_src_y ]
jpc BE Scrp_Main_Y_Wend_BMP:


	;'ScrP_x = src_x 
	ld int [ vint_ScrP_x ], [ vint_ScrP_src_x ]
	
	; 'while ScrP_x < Wid
	Scrp_Main_X_Bend_BMP:
	cmp int [ vint_ScrP_x ], [ vint_ScrP_wid ]
	jpc AE Scrp_Main_X_Wend_BMP:
	
	
	
	call Scrp_OnePixel_Proc:

	;'数据偏移+2
	cal int add [ vint_Scrp_DataOffSet ], 2
	; 'ScrP_x ++
	cal int add [ vint_ScrP_x ], 1
	
	;'Wend
	jmp Scrp_Main_X_Bend_BMP:
	Scrp_Main_x_Wend_BMP:

cmp int [ scrp_i ], 0
jpc z Scrp_BMP_Spc_Deal_End:

ld int r1, [ vint_Scrp_DataOffSet ]
ld int [ r1 ], 65535
cal int add [ vint_Scrp_DataOffSet ], 2

Scrp_BMP_Spc_Deal_End:

;'ScrP_y = ScrP_y + 1
cal int add [ vint_ScrP_y ], - 1
;'有种觉得 Srcp_Y是多余的感觉
;'参数赋值
ld int [ Scrp_Paramater_3 ], [ vint_ScrP_y ]


;'判断是否储存
call Scrp_OnePixel_Save_Proc:

;'wend
jmp Scrp_Main_Y_Bend_BMP:
Scrp_Main_Y_Wend_BMP:


call Scrp_MainProcess_Last:

ret

;//==============扫尾处理=================//
Scrp_MainProcess_Last:
;'最后的扫尾处理 可能会多输出一个无效字符
;最后再写一次
ld int r1, [ vint_Scrp_DataOffSet ]
ld int [ r1 ], 0
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, Scrp_Catch

out 51, 18

;关闭文件
out 49, [ vint_ScrP_FileHandle ]

ret


Scrp_SaveAs_LIB:
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
ld int [ Scrp_Init_Bit1 ], [ vint_ScrP_wid ]
ld int [ Scrp_Init_Bit2 ], [ vint_ScrP_hgt ]
ld int r1, [ vint_ScrP_FileHandle ]
ld int r2, 2147483647
ld int r3, [ Scrp_Init_Bit1 ]
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
Scrp_SaveAs_BMP:
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


