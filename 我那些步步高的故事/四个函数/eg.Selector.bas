setlcd( 240, 320)
declare function Selector( MustChoiceOne)
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



'//=========Selector==========//
'//=========菜单式选择==========//
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150
function Selector( MustChoiceOne)
'Block
dim shared Selector_Str$( 30), Selector_StrCount ', Selector_Selected( 30)
dim shared Selector_i
dim shared Selector_CurSel '这个只是在当前页面中  值为 0 - 11
dim shared Selector_CurSel_Temp
dim shared Selector_CurLineCount
dim shared Selector_Offset '显示文字的偏移 偏移了多少行
dim shared Selector_CurSel_Move	'当前选择的移动
dim shared Selector_Page_Buff, Selector_Page_Text
dim shared Selector_Pic_Title, Selector_Pic_Scroll, Selector_Scroll_preLenght
dim shared Selector_Over_State, Selector_Return, Selector_MustChoiceOne

FONT( FONT_24HEI)
setbkmode( TRANSPARENT)

Selector_Page_Buff = createpage()
Selector_Page_Text = createpage()

Selector_MustChoiceOne = MustChoiceOne
Selector_Pic_Scroll = loadres( "Selector" + SYS_Fe$, 1 )
Selector_Pic_title  = loadres( "Selector" + SYS_Fe$, 2 )
Selector_CurSel = 0
Selector_Offset = 0
Selector_Scroll_preLenght = 280 / Selector_StrCount

if Selector_StrCount > 12 then
	Selector_CurLineCount = 12
else
	Selector_CurLineCount = Selector_StrCount
end if

asm
call Selector_Start_label
ld int [ rb ], [ vint_Selector_Return ]
endasm

freeres( Selector_Pic_Scroll)
freeres( Selector_Pic_title)

end function
'主体部分
'Block
asm
jmp Selector_QINGWUSHI:
Selector_Start_label:

ld int [ vint_G_Func_calTouchId ], Selector_CalTouch
call Selector_Initialization

call Selector_ShowText
endasm

BITBLTPAGE( Selector_Page_Buff, - 1)
Selector_Over_State = 0
asm
call Selector_Skip_The_First_WaitKey
endasm
while not Selector_Over_State

Selector_CurSel_Move = 0
G_User_Inkey = waitkey()
getInput()
vasm(" Selector_Skip_The_First_WaitKey:")

	if G_key_Enter then
		Selector_Return = Selector_Offset + Selector_CurSel
		Selector_Over_State = 1
	else if G_key_escape and not Selector_MustChoiceOne then
		Selector_Return = - 1
		Selector_Over_State = 1
	end if

	if G_key_up then
		Selector_CurSel_Move = - 1
	else if G_key_Down then
		Selector_CurSel_Move = 1
	end if
	
	Selector_CurSel_Temp = Selector_CurSel + Selector_CurSel_Move
	Selector_i = Selector_CurSel_Temp + Selector_Offset
	'判断溢出
	if not ( Selector_i > = 0 and Selector_i < Selector_StrCount ) then Selector_CurSel_Move = 0
'当移动单行的时候 暂时不支持左右翻译
if abs( Selector_CurSel_Move ) = 1 then
	if Selector_CurSel_Temp < 0 then
		STRETCHBLTPAGEEX( 0, 45, 240, 275, 0, 20, - 1, Selector_Page_Buff)
		Selector_Offset = Selector_Offset - 1
			asm
			ld int [ Selector_Show_Normal_Num ], 0
			call Selector_Show_Normal
			endasm

			BITBLTPAGE( Selector_Page_Buff, - 1)
		Selector_CurSel_Move = 0
	else if Selector_CurSel_Temp > 11 then
		
			STRETCHBLTPAGEEX( 0, 20, 240, 275, 0, 45, - 1, Selector_Page_Buff)
			Selector_Offset = Selector_Offset + 1
			asm
			ld int [ Selector_Show_Normal_Num ], 11
			call Selector_Show_Normal
			endasm
			BITBLTPAGE( Selector_Page_Buff, - 1)
		Selector_CurSel_Move = 0
		
	end if
end if
	Selector_CurSel = Selector_CurSel + Selector_CurSel_Move
'滚动条的背景
fillpage(  Selector_Page_Buff, 220, 20, 20, 300, &ha95509)
asm
call Selector_Show_Scroll
endasm
flippage( Selector_Page_Buff)
asm
call Selector_Show_CurSelected
endasm

wend
asm
ret

'//===========初始化==============//
Selector_Initialization:
'Block
ld int [ Selector_FILLPAGE_Paramater_1 ], - 1


'fillpage( -1, 0, 0, 240, 320, &ha95509)
'初始背景
ld int [ Selector_FILLPAGE_Paramater_4 ], 240
ld int [ Selector_FILLPAGE_Paramater_5 ], 320
ld int [ Selector_FILLPAGE_Paramater_6 ], 11097353
ld int r3, Selector_FILLPAGE_Paramater
OUT 23,0

'为后面调用的时候做初始
ld int [ Selector_FILLPAGE_Paramater_2 ], 0
ld int [ Selector_FILLPAGE_Paramater_4 ], 220
ld int [ Selector_FILLPAGE_Paramater_5 ], 25

'/显示图片UI
ld int [ Selector_showpic_Paramater_1 ], - 1
ld int [ Selector_showpic_Paramater_2 ], [ vint_Selector_Pic_title ]
ld int [ Selector_showpic_Paramater_5 ], 240
ld int [ Selector_showpic_Paramater_6 ], 20
ld int r3, Selector_showpic_Paramater
out 20, 0
'为后面显示滚动条做初始
ld int [ Selector_showpic_Paramater_2 ], [ vint_Selector_Pic_Scroll ]
ld int [ Selector_showpic_Paramater_3 ], 220
ld int [ Selector_showpic_Paramater_5 ], 20
ld int [ Selector_showpic_Paramater_6 ], 40

ld int [ Selector_showpic_Paramater_1 ], [ vint_Selector_Page_Buff ]
ret
'EndBlock
data Selector_ShowText_i dword 0
data Selector_ShowText_CurStr_Pos dword 0
data Selector_ShowText_CurLine dword 0
;'//==================初始显示文字=====================//
Selector_ShowText:
'Block
ld int [ Selector_ShowText_i ], 0
ld int [ Selector_ShowText_CurStr_Pos ], 1'vstr_Selector_Str
ld int [ Selector_ShowText_CurLine ], 0'20

ld int [ Selector_ShowText_BK_Color ], 13922067
ld int [ Selector_ShowText_Txt_Color ], 2029294
endasm
Selector_i = 0
while Selector_i < Selector_CurLineCount 'Selector_i < Selector_StrCount and 
	asm

		'call Selector_ShowText_Line
		ld int [ Selector_Show_Normal_Num ], [ Selector_ShowText_CurLine ]
		;'cal int add [ Selector_ShowText_CurLine ], 25
		;'cal int add [ Selector_ShowText_CurStr_Pos ], 4
		
		call Selector_Show_Normal
		cal int add [ Selector_ShowText_CurLine ], 1
	endasm
	
Selector_i = Selector_i + 1
wend
asm

ret
'EndBlock
data Selector_ShowText_LineNum dword 0
data Selector_ShowText_BK_Color dword 0
data Selector_ShowText_TXt_Color dword 0
'//===================显示一行文字=====================//
Selector_ShowText_Line:
'Block
'/文字的显示位置
'Block
ld int r3, [ Selector_ShowText_LineNum ]
ld int r2, 0
out 42, 0
'cal int add [ Selector_ShowText_CurLine ], 25
'EndBlock
'/文字背景
'Block
ld int [ Selector_FILLPAGE_Paramater_3 ], [ Selector_ShowText_LineNum ]
ld int [ Selector_FILLPAGE_Paramater_5 ], 24
ld int [ Selector_FILLPAGE_Paramater_6 ], [ Selector_ShowText_BK_Color ]
ld int r3, Selector_FILLPAGE_Paramater
OUT 23,0

cal int add [ Selector_FILLPAGE_Paramater_3 ], 24
ld int [ Selector_FILLPAGE_Paramater_5 ], 1
ld int [ Selector_FILLPAGE_Paramater_6 ], [ Selector_ShowText_Txt_Color ]
ld int r3, Selector_FILLPAGE_Paramater
OUT 23,0
'EndBlock
'/显示文字
'Block
ld int r1, [ Selector_ShowText_CurStr_Pos ]
out 1, [ r1 ]

'cal int add [ Selector_ShowText_CurPos ], 4
'EndBlock
ret
'EndBlock
'//===================显示当先选择---黄底蓝线=====================//
Selector_Show_CurSelected:
'Block
ld int [ Selector_ShowText_Line_ByLine_Num ], [ vint_Selector_CurSel ]

ld int [ Selector_ShowText_Txt_Color ], 13922067
ld int [ Selector_ShowText_BK_Color ], 2029294

call Selector_ShowText_Line_ByLine
ret
'EndBlock
data Selector_Show_Normal_Num dword 0

'//===================显示普通的一行---蓝底黄线=====================//
Selector_Show_Normal:
'Block

ld int [ Selector_ShowText_Line_ByLine_Num ], [ Selector_Show_Normal_Num ]
ld int [ Selector_ShowText_Txt_Color ], 2029294
ld int [ Selector_ShowText_BK_Color ], 13922067

call Selector_ShowText_Line_ByLine
ret
'EndBlock
data Selector_ShowText_Line_ByLine_Num dword 0
data Selector_ShowText_Line_ByLine_LineNum dword 0
'//===================显示文字=====================//
Selector_ShowText_Line_ByLine:
'参数为行数
'Block
ld int [ Selector_ShowText_LineNum ], [ Selector_ShowText_Line_ByLine_Num ]
cal int mul [ Selector_ShowText_LineNum ], 25
cal int add [ Selector_ShowText_LineNum ], 20

'显示的文字加偏移
'cal int add [ Selector_ShowText_Line_ByLine_Num ], [ vint_Selector_Offset ]
ld int [ Selector_ShowText_CurStr_Pos ], [ Selector_ShowText_Line_ByLine_Num ]
cal int add [ Selector_ShowText_CurStr_Pos ], [ vint_Selector_Offset ]
cal int mul [ Selector_ShowText_CurStr_Pos ], 4
cal int add [ Selector_ShowText_CurStr_Pos ], vstr_Selector_Str


call Selector_ShowText_Line
ret
'EndBlock
'//===================显示滚动条=====================//
Selector_Show_Scroll:
ld int r1 , [ vint_Selector_CurSel ]
cal int add r1, [ vint_Selector_Offset ]
cal int mul r1, [ vint_Selector_Scroll_preLenght ]

cal int add r1, 20

ld int [ Selector_showpic_Paramater_4 ], r1
ld int r3, Selector_showpic_Paramater
out 20, 0
ret
'//=============参数列表=================//
'Block
'OUT 23,0 fillpage的端口
Selector_FILLPAGE_Paramater:
Selector_FILLPAGE_Paramater_6:
.block 4 0
Selector_FILLPAGE_Paramater_5:
.block 4 0
Selector_FILLPAGE_Paramater_4:
.block 4 0
Selector_FILLPAGE_Paramater_3:
.block 4 0
Selector_FILLPAGE_Paramater_2:
.block 4 0
Selector_FILLPAGE_Paramater_1:
.block 4 0

'/showpic SHOWPIC(PAGE,PIC,DX,DY,W,H,X,Y,MODE)
Selector_showpic_Paramater:
Selector_showpic_Paramater_9:
data Selector_showpic_mode dword 1 '因为基本来说模式都是1

Selector_showpic_Paramater_8:
Selector_showpic_SrcY:
.block 4 0
Selector_showpic_Paramater_7:
Selector_showpic_SrcX:
.block 4 0
Selector_showpic_Paramater_6:
Selector_showpic_Hgt:
.block 4 0
Selector_showpic_Paramater_5:
Selector_showpic_Wid:
.block 4 0
Selector_showpic_Paramater_4:
Selector_showpic_DesY:
.block 4 0
Selector_showpic_Paramater_3:
Selector_showpic_Desx:
.block 4 0
Selector_showpic_Paramater_2:
Selector_showpic_Pic:
.block 4 0
Selector_showpic_Paramater_1:
Selector_showpic_Page:
.block 4 0

'EndBlock
'//=============处理触屏=================//
Selector_CalTouch:
endasm
dim Selector_CurSel_Temp, Selector_CurSel_Move_Temp
if G_touch_y > 20 then
	if G_touch_x < 200 then
		Selector_CurSel = ( G_touch_y - 20 ) / 25
	'对滚动条的支持 实在憔悴  不想写了
	else
		
	end if
end if

asm
ret
Selector_QINGWUSHI:
endasm
'EndBlock

'EndBlock

Selector_Str$( 0) = "你"
Selector_Str$( 1) = "我"
Selector_Str$( 2) = "她"
Selector_Str$( 3) = "我们都是好孩子"
Selector_Str$( 4) = "都是好孩子"
Selector_Str$( 5) = "NotePad"
Selector_Str$( 6) = "MyNotePad"
Selector_Str$( 7) = "WenerSNotePad"
Selector_Str$( 8) = "我"
Selector_Str$( 9) = "她"
Selector_Str$( 10) = "我们都是好孩子"
Selector_Str$( 11) = "都是好孩子"
Selector_Str$( 12) = "好孩子"
Selector_Str$( 13) = "快乐每一天"
Selector_Str$( 14) = "快乐"
Selector_Str$( 15) = "每一天"
Selector_StrCount = 16

i= Selector( 1)
cls
print Selector_Str$( i)
