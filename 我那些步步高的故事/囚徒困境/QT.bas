'消息定义
const SYS_WaitMessage = &h00
const SYS_GameOver = 	&h01
const SYS_GameWin = 	&h02
const SYS_GameFailed = 	&h03
const SYS_GameDraw = 	&h04
const SYS_GameING = 	&h05
const SYS_GameQuit =	&h06


'菜单
const Menu_gameStart = 	&h101
const Menu_help = 	&h102
const Menu_about = 	&h103
const Menu_quit = 	&h104
'玩家事件
const User_Event = 	&h200
const User_cooperate = 	&h201
const User_defect = 	&h202

const User_Change_Times = &h203

'//其他的定义
'==//文字图片
const Text_Clean = &hffffffff	'-1
const Text_AnyKeyReturn = 0
const Text_AnyKeyStart = 1
const Text_SetTimes = 2
const Text_SetConfirm = 3
const Text_QuitConfirm = 4
const Text_ReStartConfirm = 5
const Text_WaitPlayer = 6


 




'所有的图片句柄
dim g_pic_bg, g_pic_Point, g_pic_Times, g_pic_gameHelp, g_pic_gameAbout, g_pic_text, g_pic_SelectedBox

'所有页面句柄
dim g_pg_ZK '战况的页面
dim g_pg_buff, g_pg_temp

dim G_User_Inkey
dim g_gameState

'键值变量
Dim G_key_x, G_key_y
Dim G_key_up, G_key_down, G_key_left, G_key_right
DIM G_key_escape, G_key_enter
Dim G_touch_x, G_touch_y	'触摸点的X Y
Dim G_touch_ID	'返回区域的id值

Dim G_Event_Id
'//==游戏数据
DIM G_User_points, G_Wen_points, G_CurrentGate, G_AllGate, G_User_CurPoints, G_Wen_CurPoints, G_User_LastChoice
Dim G_User_Choice, G_Wen_Choice, G_str_OP$( 2)'操作字符串定义
Dim G_ShowText_ID
'统计
Dim G_User_ChoiceCount( 2)

'杂项全局变量
dim fe$, res_file_name$, temp_data, temp_Boolean
'//==函数定义
declare function ShowNum( hPage, hImg, x, y, num)
declare function getInput()
declare function calTouchId()

declare function random( range)
declare function TriggerEvent( probability)

declare function ShowPlayerPoints( num)
declare function ShowWenPoints( num)
declare function ShowCurrentGate( num)
declare function ShowAllGate( num)
declare function ShowText( hPage, num)


declare function render()
declare function setTimes()
declare function Confirm( num)
declare function GameProcess()
declare function ZKDeal( ZKStr$, ShowPoint) '处理战况的显示
declare function ZKClean()

declare function WenProcess() 'AI过程
declare function PointProcess()
'declare function GateProcess()
declare function TimesOut()

declare function iSTRETCHBLTPAGEEX(X,Y,WID,HGT,CX,CY,DEST,SRC) '一个用来应付bug的函数 缓存页面用的 iSTRETCHBLTPAGEEX_Buff

iSTRETCHBLTPAGEEX_Buff = createpage()

setlcd( 240, 320)

IF GetEnv!() = Env_SIM Then
	fe$ = ".rlb"
Else
	fe$ = ".lib"
End IF

'//初始化
res_file_name$ = "QT_res" + fe$
g_pic_bg = Loadres( res_file_name$, 1)
g_pic_Times = Loadres( res_file_name$, 2)
g_pic_Point = Loadres( res_file_name$, 3)
g_pic_gameHelp = Loadres( res_file_name$, 4)
g_pic_gameAbout = Loadres( res_file_name$, 5)
g_pic_text = Loadres( res_file_name$, 6)
g_pic_SelectedBox = Loadres( res_file_name$, 7)
g_pic_Click = Loadres( res_file_name$, 8)

g_pg_ZK = createpage()
g_pg_buff = createpage()
g_pg_temp = createpage()

G_User_points = 0
G_Wen_points = 0
G_CurrentGate = 1
G_AllGate = 5

'文以合作开始
G_User_LastChoice = User_cooperate

G_str_OP$( 0) = "合作"
G_str_OP$( 1) = "背叛"

G_ShowText_ID = Text_AnyKeyStart

'字体设置 103 48
SETBKMODE( TRANSPARENT)

'//===主循环===


g_gameState = SYS_WaitMessage
while 1


render()

ShowText( g_pg_buff, G_ShowText_ID)

if g_gameState = SYS_GameING or g_gameState = SYS_GameOver then
	STRETCHBLTPAGEEX( 100, 48, 140, 195, 0, 0, g_pg_buff, G_PG_ZK)
end if

flippage( g_pg_buff)



G_User_Inkey = waitkey()

'ZKDeal( "NOW:" + gettick() )


getinput()

'有有效消息时
if G_touch_ID <> - 1 then

'大范围
if G_touch_ID < &h200 and G_touch_ID > &h100 then
	'菜单
	if G_touch_ID = Menu_gameStart then
		
		if g_gameState <> SYS_GameING then
			
			g_gameState = SYS_GameING
			
			G_User_points = 0
			G_Wen_points = 0
			G_CurrentGate = 1			
			
			ZKClean()
			ZKDeal( "开始游戏，共" + G_AllGate + "局", 0)
			
			G_ShowText_ID = Text_WaitPlayer
		else if confirm( Text_ReStartConfirm) then
		
			g_gameState = SYS_GameING
			'从新开始
			G_User_points = 0
			G_Wen_points = 0
			G_CurrentGate = 1
			
			ZKClean()
			
			ZKDeal( "开始游戏，共" + G_AllGate + "局", 0)
			
			G_ShowText_ID = Text_WaitPlayer
			
		end if

		
	else if G_touch_ID = Menu_help  then
		showpic( -1, g_pic_gameHelp, 99, 48, 141, 157, 0, 0, 1)
		
		ShowText( - 1, Text_AnyKeyReturn)
		waitkey()
	else if G_touch_ID = Menu_about then
		showpic( -1, g_pic_gameHelp, 99, 47, 141, 159, 0, 0, 1)
		
		ShowText( - 1, Text_AnyKeyReturn)
		waitkey()
	else if G_touch_ID = Menu_quit then
		if confirm( Text_QuitConfirm) then
			g_gameState = SYS_GameQuit
			
			color( &h5167fb, 0, 0)
			
			ZKClean()
			ZKDeal( "游戏作者：Wener", 0)
			ZKDeal( "论坛Id：a3160586", 0)
			ZKDeal( "欢迎访问", 0)
			ZKDeal( "   club.eebbk.com", 0)
			ZKDeal( "      期待您的来到", 0)
			
			msdelay( 1500)
			
			end
		end if
		
	end if
'用户操作范围
else if G_touch_ID < &h300 and G_touch_ID > &h200 then
	
	if G_touch_ID = User_cooperate or G_touch_ID = User_defect and g_gameState = SYS_GameING then
		'如果减了User_Event 就是合作为1 背叛为2
		G_User_Choice = G_touch_ID '- User_Event
		
		'文的处理过程
		WenProcess()
		
		'积分过程
		PointProcess()
		
		ZKDeal( "", 1)
		
		'关卡处理过程
		'GateProcess()
		
		'次数完毕 包括玩家胜利判断
		TimesOut()
		
		
	
	else if G_touch_ID = User_Change_Times then
	
		SetTimes()

	end if
end if

end if


wend

'//==函数主体定义==

'//Wen的处理过程 AI计算
function WenProcess() 
DIM shared G_User_points, G_Wen_points, G_CurrentGate, G_AllGate, G_User_CurPoints, G_Wen_CurPoints
Dim shared G_User_Choice, G_Wen_Choice, G_User_LastChoice

Dim shared G_User_ChoiceCount( 2)

dim shared WenProcess_CoTime, WenProcess_DeTime, WenProcess_Pro



WenProcess_CoTime = G_User_ChoiceCount( 0)
WenProcess_DeTime = G_User_ChoiceCount( 1)


if ( WenProcess_DeTime > WenProcess_CoTime and TriggerEvent( 30 )) then
	

	G_Wen_Choice = User_cooperate
	
else if ( WenProcess_DeTime < WenProcess_CoTime and TriggerEvent( 50 )) then

	G_Wen_Choice = User_Defect

else 
	'以牙还牙策略
	G_Wen_Choice = G_User_LastChoice
	
end if


' - User_cooperate 是为了保证 合作为0 背叛为1	
'这里 最后才知道用户选择的，所以本次处理的时候并不知道用户选择
G_User_ChoiceCount( G_User_Choice - User_cooperate) = G_User_ChoiceCount( G_User_Choice - User_cooperate)  + 1

G_User_LastChoice = G_User_Choice

end function

'//分数计算过程
function PointProcess()

	'wen背叛 玩家合作
	if G_Wen_Choice > G_User_Choice then
		
		G_User_CurPoints = 0
		G_Wen_CurPoints  = 5
	'相同选择
	else if G_Wen_Choice = G_User_Choice then
		
		'同时合作
		if G_Wen_Choice = User_cooperate then
		
			G_User_CurPoints = 3
			G_Wen_CurPoints  = 3
		'同时背叛
		else if G_Wen_Choice = User_Defect then

			G_User_CurPoints = 1
			G_Wen_CurPoints  = 1
		'异常
		else 
			ZKDeal( "程序异常 积分过程出错", 0)
		end if
	'玩家背叛 wen合作
	else
		G_User_CurPoints = 5
		G_Wen_CurPoints  = 0	
				
	end if
	
'积分总数
G_User_points = G_User_points + G_User_CurPoints
G_Wen_points = G_Wen_points + G_Wen_CurPoints

end function

'//局次计算和玩家胜利与否的判断
function TimesOut()

G_CurrentGate = G_CurrentGate + 1
'游戏结束
if G_AllGate = G_CurrentGate - 1 then
	
	color( &h5167fb, 0, 0)
	
	if G_Wen_Points > G_User_Points then
		
		ZKDeal( "失败了，再试一次吧！", 0 )
		g_gameState = SYS_WaitMessage
		
	else if G_Wen_Points < G_User_Points then
	
		ZKDeal( "胜利啦！你好厉害哦！", 0 )
		g_gameState = SYS_WaitMessage
		
	else

		ZKDeal( "平手耶，再试一次吧！", 0 )
		g_gameState = SYS_WaitMessage
		
	end if

	color( &hffffff, 0, 0)
	'这个-1是为了之后的正确显示
	G_CurrentGate = G_CurrentGate - 1
	g_gameState = SYS_GameOver
	
	G_ShowText_ID = Text_AnyKeyStart
end if
	


end function

'//获取随机数
function random( range)
	RANDOMIZE( gettick())
	random = rnd( range)
	'确保是随机数
	msdelay( 10)
end function

'//随机概率事件 
'probability 为 100以内  触发了返回1 否则返回0
function TriggerEvent( probability)
	if random( 100) < probability then
		TriggerEvent = 1
	else
		TriggerEvent = 0
	end if
end function

'//显示玩家分数
function ShowPlayerPoints( num)
	ShowNum( g_pg_buff, g_pic_Point, 55, 34, num)
end function
'//显示Wen的分数
function ShowWenPoints( num)
	ShowNum( g_pg_buff, g_pic_Point, 55, 97, num)
end function
'//显示当前局次
function ShowCurrentGate( num)
	ShowNum( g_pg_buff, g_pic_Times, 54, 215, num)
end function
'//显示总局次
function ShowAllGate( num)
	ShowNum( g_pg_buff, g_pic_Times, 78, 215, num)
end function

'//渲染
function render()
	showpic( g_pg_buff, g_pic_bg, 0, 0, 240, 320, 0, 0, 1)
	ShowPlayerPoints( G_User_points)
	ShowWenPoints( G_Wen_points)
	
	ShowCurrentGate( G_CurrentGate)
	ShowAllGate( G_AllGate)

end function
'//设置次数
function setTimes()

ShowText( - 1, Text_SetTimes )
showpic( - 1, g_pic_SelectedBox, 61, 214, 18, 18, 0, 0, 1)
ShowNum( -1, g_pic_Times, 78, 215, G_AllGate)

temp_data = G_AllGate
temp_Boolean = 1
	
	
while temp_Boolean
	G_User_Inkey = waitkey()
	getinput()
	
'==//有效消息才处理
if G_User_Inkey > 0 then
	
	'控制判断
	if G_key_up or G_key_down then
		temp_data = temp_data + G_key_up - G_key_down
	else if G_key_left or G_key_right then
		temp_data = temp_data + G_key_left * 3 - G_key_right * 3
		
	else if G_key_escape or G_key_enter then
		'确认
		if G_key_enter then
			G_AllGate = temp_data
		end if
		
		temp_Boolean = 0
	
	end if
	
	'局次界定 G_CurrentGate-30  g_gameState = SYS_GameING
	if temp_data < G_CurrentGate + 1 then
		temp_data = G_CurrentGate + 1
	else if temp_data > 30 then
		temp_data = 30
	end if
	
	
	showpic( - 1, g_pic_bg, 62, 215, 16, 13, 62, 215, 1)
	ShowNum( -1, g_pic_Times, 78, 215, temp_data)
	
	
'==//点击屏幕其他位置的时候确认  不是点之前的那个位置 所以有个判断
else if G_touch_ID <> User_Change_Times then
	temp_Boolean = 0
	
	if confirm( Text_SetConfirm) then
		G_AllGate = temp_data
	end if
	ShowText( - 1, Text_SetConfirm)
	
end if
	
wend
	
	
end function

'//显示数字图片
function ShowNum( hPage, hImg, x, y, num)

dim shared ShowNum_at_x, ShowNum_at_y, ShowNum_pic_wid, ShowNum_pic_heg, ShowNum_cur_num, ShowNum_num
dim shared ShowNum_hPage, ShowNum_hImg, ShowNum_i

ShowNum_hPage = hPage
ShowNum_hImg = hImg

ShowNum_at_x = x
ShowNum_at_y = y


ShowNum_pic_wid = getpicwid( himg) / 10
ShowNum_pic_heg = getpichgt( himg)

ShowNum_num = num
if ShowNum_num = 0 then
	showpic( ShowNum_hPage, ShowNum_hImg, ShowNum_at_x, ShowNum_at_y, ShowNum_pic_wid, ShowNum_pic_heg, 0, 0, 1)
else
	while ShowNum_num

		ShowNum_cur_num =  ShowNum_num mod 10
		ShowNum_at_x = ShowNum_at_x - ShowNum_pic_wid
		
		showpic( ShowNum_hPage, ShowNum_hImg, ShowNum_at_x, ShowNum_at_y, ShowNum_pic_wid, ShowNum_pic_heg, ShowNum_cur_num * ShowNum_pic_wid, 0, 1)
	
	ShowNum_num = ShowNum_num / 10
	wend
end if

end function

'//显示文字图片
function ShowText( hPage, num)

if num >= 0 then
	showpic( hPage, g_pic_text, 0, 258, 240, 20, 0, 20 * num, 1)
else'恢复
	showpic( hPage, g_pic_bg, 0, 258, 240, 20, 0, 258, 1)
end if
end function

'//游戏过程
function GameProcess()

dim shared GameProcess_state



end function
'//战况的处理 如果ShowPoint 为真则是显示分数 此时ZKstr$值无效
function ZKDeal( ZKstr$, ShowPoint)

dim shared ZKDeal_PrintLine, ZKDeal_scrollMode, ZKDeal_Temp_Str$, G_PG_temp

if ZKDeal_scrollMode then

	'STRETCHBLTPAGEEX( 0, - 13, 140, 195, 0, 0, G_PG_ZK, G_PG_ZK)
	'STRETCHBLTPAGEEX( 100, 48, 140, 182, 0, 0, - 1, G_PG_ZK)
	'滚动动画
	iSTRETCHBLTPAGEEX( 0, - 5, 140, 195, 0, 0, G_PG_temp, G_PG_ZK)
	iSTRETCHBLTPAGEEX( 100, 48, 140, 182, 0, 0, - 1, G_PG_temp)
	msdelay( 100)
	iSTRETCHBLTPAGEEX( 0, - 9, 140, 195, 0, 0, G_PG_temp, G_PG_ZK)
	iSTRETCHBLTPAGEEX( 100, 48, 140, 182, 0, 0, - 1, G_PG_temp)
	msdelay( 100)
	iSTRETCHBLTPAGEEX( 0, - 12, 140, 195, 0, 0, G_PG_temp, G_PG_ZK)
	iSTRETCHBLTPAGEEX( 100, 48, 140, 182, 0, 0, - 1, G_PG_temp)
	msdelay( 100)
	iSTRETCHBLTPAGEEX( 0, - 13, 140, 195, 0, 0, G_PG_ZK, G_PG_ZK)
	iSTRETCHBLTPAGEEX( 100, 48, 140, 182, 0, 0, - 1, G_PG_ZK)
end if

pixlocate( 100 , 48 + 13 * ZKDeal_PrintLine )

'分数显示 用汇编是不想搞繁杂的定位
if ShowPoint = 1 then
	ZKDeal_Temp_Str$ = "玩家"
	vasm(" out 2, [ Vstr_ZKDeal_Temp_Str]")
	
	color( &h8eeff8, 0, 0)
	ZKDeal_Temp_Str$ = g_str_OP$( G_User_Choice - User_cooperate)
	vasm(" out 2, [ Vstr_ZKDeal_Temp_Str]")
	
	color( &hffffff, 0, 0)
	ZKDeal_Temp_Str$ = "，文"
	vasm(" out 2, [ Vstr_ZKDeal_Temp_Str]")
	
	color( &h3ec68b, 0, 0)
	
	ZKDeal_Temp_Str$ = g_str_OP$( G_Wen_Choice - User_cooperate)
	
	vasm(" out 2, [ Vstr_ZKDeal_Temp_Str]")
	
	color( &hffffff, 0, 0)
	
	
	
'显示分数的第二阶段
else if ShowPoint = 2 then

	ZKDeal_Temp_Str$ = "玩家得分"
	vasm(" out 2, [ Vstr_ZKDeal_Temp_Str]")
	
	color( &h8eeff8, 0, 0)
	ZKDeal_Temp_Str$ = g_str_OP$( G_User_Choice - User_cooperate)
	vasm(" out 3, [ Vint_g_User_CurPoints]")
	
	color( &hffffff, 0, 0)
	ZKDeal_Temp_Str$ = "，文得分"
	vasm(" out 2, [ Vstr_ZKDeal_Temp_Str]")
	
	color( &h3ec68b, 0, 0)
	
	ZKDeal_Temp_Str$ = g_str_OP$( G_Wen_Choice - User_cooperate)
	
	vasm(" out 3, [ Vint_g_Wen_CurPoints]")
	
	color( &hffffff, 0, 0)
	
	'本来下面这样写也是正确的 但是不知道为什么编译的时候有时会出错~
'	print "玩家得分:";
	
'	color( &h3ec68b, 0, 0)
'	print g_User_CurPoints; 
	
'	color( &hffffff, 0, 0)
'	print "文得分";
	
'	color( &h3ec68b, 0, 0)
'	print g_Wen_CurPoints; 	
	
'	color( &hffffff, 0, 0)
	
else

print ZKstr$

end if

if ZKDeal_scrollMode then

	iSTRETCHBLTPAGEEX( 0, 169, 140, 26, 100, 217, G_PG_ZK, -1)
	
else
	iSTRETCHBLTPAGEEX( 0, 0, 140, 195, 100, 48, G_PG_ZK, -1)
	ZKDeal_PrintLine = ZKDeal_PrintLine + 1
	
	if ZKDeal_PrintLine > 13 then
		
		iSTRETCHBLTPAGEEX( 0, 169, 140, 26, 100, 217, G_PG_ZK, -1)

		ZKDeal_scrollMode = 1
		ZKDeal_PrintLine = 13
	end if

end if

'最后来递归才是对的
if ShowPoint = 1 then
	ZKDeal( "", 2)
end if

end function

'//清除战况面板
function ZKClean()
dim shared ZKDeal_PrintLine, ZKDeal_scrollMode
	
	ZKDeal_PrintLine = 0
	ZKDeal_scrollMode = 0
	
	showpic( G_PG_ZK, g_pic_bg, 0, 0, 140, 195, 100, 48, 1)
	showpic( -1, g_pic_bg, 100, 48, 140, 195, 100, 48, 1)

end function

'//获取输入消息
function getInput()

'==/////===========触屏
if G_User_Inkey < 0 then
	G_touch_x = getpenposx( G_User_Inkey)
	G_touch_y = getpenposy( G_User_Inkey)
	G_touch_id = -1
	calTouchId() '计算触摸
	
else
	G_touch_x = -1
	G_touch_y = -1
	G_touch_id = -1
end if
'==/////=========== 方向键
VASM("LD INT r3,38") '//==UP
VASM("OUT 34,0")
VASM("LD INT [VINT_G_key_up],r3")

VASM("LD INT r3,40") '//==DOWN
VASM("OUT 34,0")
VASM("LD INT [VINT_G_Key_Down],r3")

VASM("LD INT r3,37") '//==left
VASM("OUT 34,0")
VASM("LD INT [VINT_G_Key_Left],r3")

VASM("LD INT r3,39") '//==right
VASM("OUT 34,0")
VASM("LD INT [VINT_G_Key_Right],r3")
'//==============其他键
VASM("LD INT r3,13") '//==ENTER
VASM("OUT 34,0")
VASM("LD INT [VINT_G_Key_Enter],r3")

VASM("LD INT r3,27") '//==ESCAPE
VASM("OUT 34,0")
VASM("LD INT [VINT_G_Key_Escape],r3")

end function

'//计算触摸区Id
function calTouchId()

'菜单的
if G_touch_y > 297 and G_touch_x > 10 and G_touch_x < 126 and G_touch_y < 311 then

	if G_touch_x < 34 then
		G_touch_id = Menu_gameStart
		
		showpic( - 1, g_pic_Click, 8, 296, 28, 14, 8, 16, 1)
		
	else if G_touch_x < 64 then
		G_touch_id = Menu_help
		
		showpic( - 1, g_pic_Click, 40, 296, 26, 14, 40, 16, 1)
		
	else if G_touch_x < 94 then
		G_touch_id = Menu_about
		
		showpic( - 1, g_pic_Click, 70, 296, 26, 14, 70, 16, 1)
		
	else if G_touch_x < 126 then
		G_touch_id = Menu_quit
		
		showpic( - 1, g_pic_Click, 101, 296, 26, 14, 101, 16, 1)
		
	end if

'玩家选择
else if G_touch_y > 280 and G_touch_x > 145 then
	
	if G_touch_x < 192 then
		G_touch_id = User_cooperate 
		
		showpic( - 1, g_pic_Click, 143, 280, 50, 40, 143, 0, 1)
		
	else 
		G_touch_id = User_defect
		
		showpic( - 1, g_pic_Click, 194, 280, 56, 40, 194, 0, 1)
	end if
'选择次数
else if G_touch_x > 63 and G_touch_y > 215 and G_touch_x < 79 and G_touch_y < 228 then

	G_touch_id = User_Change_Times
	
end if
	

end function

'//确认设置
function Confirm( num)

dim shared SetConfirm_inkey, SetConfirm_inkey_x, SetConfirm_inkey_y, SetConfirm_return

ShowText( - 1, num)

SetConfirm_return = -1

while SetConfirm_return = -1
	
	SetConfirm_inkey = waitkey()
	
	'这样做事为了确保这个函数的独立，不影响调用它的函数	
	if SetConfirm_inkey < 0 then
	
	SetConfirm_inkey_x = getpenposx( SetConfirm_inkey)
	SetConfirm_inkey_y = getpenposy( SetConfirm_inkey)
		if SetConfirm_inkey_y > 258 and SetConfirm_inkey_y < 278 then
		
			if SetConfirm_inkey_x > 141 and SetConfirm_inkey_x < 182 then
			
				SetConfirm_return = 1
			
			else if SetConfirm_inkey_x > 188 and SetConfirm_inkey_x < 229 then
			
				SetConfirm_return = 0
			
			end if
		
		end if
		
	else if SetConfirm_inkey = KEY_ENTER then
		
		SetConfirm_return = 1
		
	else if SetConfirm_inkey = KEY_ESCAPE then
	
		SetConfirm_return = 0
		
	end if
	
wend

Confirm = SetConfirm_return

end function

'//避免bug的函数
function iSTRETCHBLTPAGEEX(X,Y,WID,HGT,CX,CY,DEST,SRC)

dim shared iSTRETCHBLTPAGEEX_Buff

if SRC = - 1 then

	BITBLTPAGE( iSTRETCHBLTPAGEEX_Buff, -1)
	STRETCHBLTPAGEEX( X,Y,WID,HGT,CX,CY,DEST, iSTRETCHBLTPAGEEX_Buff )
else
	STRETCHBLTPAGEEX(X,Y,WID,HGT,CX,CY,DEST,SRC)
end if

end function























