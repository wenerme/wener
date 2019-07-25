'//资源图片id
const PIC_BUT_UNPRESS = 4
const PIC_BUT_PRESSed = 5
const PIC_Start_menu = 6
'//菜单id

'这个的id和具体的图片相关的
const Menu_StartGame = 0
const Menu_ContinueGame = 1
const Menu_GameHelp = 2
const Menu_AboutGame = 3

const GAME_NOT_START = &hffffffff	'-1的补码  貌似不能直接-1

'//触摸区id定义
const Touch_PicChunk =	1
const Touch_Top	     =  1'当点击上面时 
const Touch_Menu =	2
const Touch_Scan_ALL =	3'浏览全图

const Touch_User_Choice_left = 4
const Touch_User_Choice_right = 5
const Touch_User_Choiced = 6
'游戏时的菜单相关
const Touch_Game_Menu_unfold = 7
const Touch_Game_Menu_fold  = 8

Dim G_key_x, G_key_y
Dim G_key_up, G_key_down, G_key_left, G_key_right
DIM G_key_escape, G_key_enter

Dim G_touch_x, G_touch_y	'触摸点的X Y
Dim G_touch_ID	'返回区域的id值

dim G_GAME_START	'是否开始游戏
dim G_GAME_OVER		'是否结束游戏

dim G_gate_count	'总的关数
'图片页面类变量
Dim G_main_pic, G_buff_page, G_bg_pic, G_logo_pic, G_num_pic, G_temp_pic, G_scan_pic, G_menu_p_pic, G_menu_u_pic

DIM G_User_pic 	'每次都不显示这一块
Dim G_User_Posid '用户控制的那一块的位置
Dim G_User_MoveNum '移动数值
Dim G_User_Inkey	'用户输入

Dim G_User_Dont_MOVE	'当使用记录返回时，这个为真
Dim G_User_PreMove 	'上一步的移动

Dim G_User_MoveCount  	'总的移动速度


dim G_User_Gate 	'当前关卡

dim G_User_Item1	'物品栏  道具系统未完成  觉得疲惫了~
dim G_User_Item2
dim G_User_Item3
'杂项变量全局
dim mn$, drawWelComePage_buffPage, FileLenghth

setlcd( 240, 320)

DECLARE FUNCTION calTouchId()
declare function ShowNum( hPage, hImg, x, y, num)
declare function drawMainPage()
declare function getInput()
declare function revInput()
declare function drawWelComePage()
declare function getSequence()
declare function drawPictureChunk()




declare function startGate()

declare function passGateAnimate()

declare function gameMenu()
'这个保存函数很草率  暂时将就用
declare function gameSave()

declare function getGateCount()

'//开始游戏
function startgame()
dim shared startgame_start, startgame_user_choice, startgame_menu_move
dim shared startgame_menu_pic, startgame_but_pic, startgame_butp_pic

dim shared startgame_i

dim shared getSequence_Sequence
startgame_but_pic = loadres( "PT_sys" + mn$, 4)
startgame_butp_pic = loadres( "PT_sys" + mn$, PIC_BUT_PRESSed)
startgame_menu_pic = loadres( "PT_sys" + mn$, PIC_Start_menu)

drawWelComePage_buffPage = createpage()

'获取关卡总数
getGateCount()

startgame_user_choice = 0

'在主菜单时为未开始游戏
G_GAME_START = GAME_NOT_START

startgame_start = 1 
while startgame_start
	

	drawWelComePage()
	
	
	flippage( G_buff_page)
	'//获取输入
	G_User_Inkey = waitkey()
	getInput()
	revInput()
	
	'//startgame_user_choice是从0开始的！！菜单的移动
	
	startgame_menu_move = 0
	
	'这样感觉起来方便 把键盘换成触摸的
	if G_User_Inkey > 0 then
	
		if G_key_left then
			G_touch_id = Touch_User_Choice_left
		else if G_key_right then
			G_touch_id = Touch_User_Choice_right
		else if G_key_enter then	'确定选择转换成触摸的选择
			G_touch_id = Touch_User_Choiced
		end if
		
	end if
	
	
	
	if 0 < startgame_user_choice and startgame_user_choice < 3 then
		if G_touch_id = Touch_User_Choice_left then
			 startgame_menu_move = -1
		else if G_touch_id = Touch_User_Choice_right then
			 startgame_menu_move = 1
		end if
	else if startgame_user_choice = 0 then
		if G_touch_id = Touch_User_Choice_left then
			 startgame_menu_move = 3
		else if G_touch_id = Touch_User_Choice_right then
			 startgame_menu_move = 1
		end if		
	
	else if startgame_user_choice = 3 then
		if G_touch_id = Touch_User_Choice_left then
			 startgame_menu_move = - 1
		else if G_touch_id = Touch_User_Choice_right then
			 startgame_menu_move = - 3
		end if		
	end if
	
	'startgame_user_choice = startgame_user_choice + startgame_menu_move
	
	if G_touch_id = Touch_User_Choiced then
		
		if startgame_user_choice = Menu_GameHelp then
			
			startgame_i = loadres( "PT_sys" + mn$, 7)
			
			SHOWPIC( -1, startgame_i, 0, 0, 240, 240, 0, 0, 1)
			
			while waitkey() <> KEY_ESCAPE
			wend
			
			FREERES( startgame_i)
		else if startgame_user_choice = Menu_AboutGame then
		
			startgame_i = loadres( "PT_sys" + mn$, 8)
			
			SHOWPIC( -1, startgame_i, 0, 0, 240, 240, 0, 0, 1)
			
			while waitkey() <> KEY_ESCAPE
			wend
			
			FREERES( startgame_i)
		
		else if startgame_user_choice = Menu_StartGame then
			
			G_GAME_START = Menu_StartGame
			G_User_MoveCount = 0
			G_User_Gate = 1
			
			SHOWPIC( -1, G_bg_pic, 0, 0, 240, 240, 0, 0, 1)
			
			locate( 1, 1)
			
			print "拼图 v 1.0"
			print "","开始游戏啦！"
			 
			print "","欢迎玩玩这个游戏哦，要"
			print "是有什么不好的地方请告诉我哦。"
			
			print "","欢迎访问club.eebbk.com"
			print "","我的id是 a3160586"
			
			print ""
			print ""
			print "","按任意键继续"
			
			waitkey()

			startGate()
			
			'startNewGame()
			
			'startgame_start = 1
					
		else if startgame_user_choice = Menu_continueGame then
			
			'当把游戏读取后 游戏状态会回复到 Menu_StartGame
			G_GAME_START = Menu_continueGame
			
				open "PT_SAV.sav" for binary as #1
					fileLength = 	lof( 1)		'//判断是否存在文件
				if lof( 1)  then
					get #1, G_User_Gate
					get #1, getSequence_Sequence
				else
					'//不存在文件时则从新开始
					G_GAME_START = GAME_NOT_START
				end if
	
				close #1
			if G_GAME_START = Menu_continueGame then
			
			G_User_MoveCount = 0
			
			startGate()
			end if
			'G_User_Gate = 1
			'continueGame()
			
		end if
		
	end if
	
	
wend

DELETEPAGE( drawWelComePage_buffPage)
'基本是不可能从这里结束整个程序的  所以这些资源释放与否都是差不多的




end function


'//绘制欢迎的那个界面
function drawWelComePage()

dim shared startgame_start, startgame_user_choice
dim shared startgame_menu_pic, startgame_but_pic, startgame_butp_pic

dim shared drawWelComePage_i, drawWelComePage_pos, drawWelComePage_j,drawWelComePage_buffPage

SHOWPIC( G_buff_page, G_bg_pic, 0, 0,240, 320 , 0, 0, 1)

'显示拼图背景
RANDOMIZE( gettick())
temp_data = rnd( G_GATE_COUNT - 1 ) * 2 + 2
G_main_pic = loadres( "PT_res" + mn$, temp_data - 1)

getSequence()
vasm(" ld int [ vint_G_User_Posid], [ pic_8_posid]")
drawPictureChunk()

FREERES( G_main_pic)

SHOWPIC( G_buff_page, G_logo_pic, 8, 252, 60, 60 , 0, 0, 1)
'SHOWPIC( G_buff_page, G_scan_pic, 8, 252, 60, 60 , 0, 0, 1)

SHOWPIC( G_buff_page, startgame_but_pic, 47, 120, 30, 20 , 0, 0, 1)

SHOWPIC( G_buff_page, startgame_but_pic, 161, 120, 30, 20 , 30, 0, 1)

'移动的过渡

if startgame_menu_move <> 0 then
	
	if G_touch_id = Touch_User_Choice_left then
		SHOWPIC( G_buff_page, startgame_butp_pic, 47, 120, 30, 20 , 0, 0, 1)
	else
		SHOWPIC( G_buff_page, startgame_butp_pic, 161, 120, 30, 20 , 30, 0, 1)
	end if
	
	'缓动动画用的这个缓存页面
	BITBLTPAGE( drawWelComePage_buffPage, G_buff_page)
	'drawWelComePage_transfer! = 0.5
	drawWelComePage_i = 84 * startgame_menu_move
	drawWelComePage_pos = startgame_user_choice * 84
	while drawWelComePage_i 
		
		
		SHOWPIC( drawWelComePage_buffPage, startgame_menu_pic, 77, 120, 84, 20 , drawWelComePage_pos, 0, 1)
		
		flippage( drawWelComePage_buffPage)
		
		STRETCHBLTPAGEEX(77, 120, 84, 20 , 77, 120, drawWelComePage_buffPage, G_buff_page)
		
		
		
	drawWelComePage_i = 0.7 * drawWelComePage_i
	drawWelComePage_pos = drawWelComePage_i + drawWelComePage_pos
	wend
	
	startgame_user_choice = startgame_user_choice + startgame_menu_move
end if

SHOWPIC( G_buff_page, startgame_menu_pic, 77, 120, 84, 20 , startgame_user_choice * 84, 0, 1)

SHOWPIC( G_buff_page, startgame_but_pic, 47, 120, 30, 20 , 0, 0, 1)

SHOWPIC( G_buff_page, startgame_but_pic, 161, 120, 30, 20 , 30, 0, 1)

end function

'// 获取图片块的随机数列
function getSequence()

dim shared getSequence_Sequence

dim shared temp_data, detail_data, temp_i

open "hash_list.dat" for binary as #9

RANDOMIZE( gettick())

'继续游戏时所需要的操作
if G_GAME_START = Menu_continueGame then
	temp_data = getSequence_Sequence
else
	temp_data = rnd(1023) * 9 * 4

	getSequence_Sequence = temp_data
end if

seek #9, temp_data

temp_data = 0
vasm(" ld int [vint_temp_i], pic_0_posid")
'vasm(" cal int sub [vint_temp_i], 4")
while temp_data < 9
	
	'get #9, detail_data
	asm
	
	LD int r1,9
	LD int r2,2147483647
	OUT 50,16
		ld int r0, [vint_temp_i]
		ld int [ r0 ], r3
		;out 0, r3
		;out 0, [vint_temp_i]
		cal int add [vint_temp_i], 4
		
	endasm
	
temp_data = temp_data + 1
wend

close #9
end function

'//获取关卡总数
function getGateCount()

dim shared getGateCount_fn$

getGateCount_fn$ = "pt_res" + mn$

open getGateCount_fn$ for binary as #1
	
	get #1, G_GATE_COUNT
	
close #9

G_GATE_COUNT = G_GATE_COUNT / 2

end function

'//主要绘图部分，这里要进行位置计算
function drawPictureChunk()
dim shared temp_data, detail_data, temp_i

dim shared pic_src_x, pic_src_y, pic_des_x, pic_des_y
dim shared pic_w, pic_h, pic_posid
'似乎主要还是用计算行列的方法
dim shared pic_row, pic_list

temp_data = 0
vasm(" ld int [vint_temp_i], pic_0_posid")
while temp_data < 9

	asm
	ld int r0, [vint_temp_i]	'当前的posid
	ld int [ vint_pic_posid] ,[ r0 ]
	endasm

	if temp_data = G_User_posid then
		vasm(" jmp Bu_Xian_Shi_Yong_Hu_Kong_Zhi_Na_Ge:")
	end if
	
	'posid 是从0开始的	'

	pic_src_x = ( pic_posid mod 3) * 80
	pic_src_y = ( pic_posid / 3) * 80
	
	pic_des_x = ( temp_data mod 3) * 80
	pic_des_y = ( temp_data / 3) * 80
	
	SHOWPIC( G_buff_page, G_main_pic, pic_des_x, pic_des_y,80, 80 , pic_src_x, pic_src_y, 1)
	'print pic_posid;temp_data,dx;dy,sx;sy
	
	asm
	Bu_Xian_Shi_Yong_Hu_Kong_Zhi_Na_Ge:
	cal int add [vint_temp_i], 4	
	endasm
	
temp_data = temp_data + 1
wend

end function

'//绘制主要的
function drawMainPage()
dim shared G_buff_page, G_bg_pic, G_scan_pic, G_num_pic, G_User_MoveCount

'背景
SHOWPIC( G_buff_page, G_bg_pic, 0, 0,240, 320 , 0, 0, 1)

'缩略图
SHOWPIC( G_buff_page, G_scan_pic, 8, 252, 60, 60 , 0, 0, 1)

'用户那缺的位置
pic_des_x = ( G_User_pic mod 3) * 20 + 8
pic_des_y = ( G_User_pic / 3) * 20 + 252

SHOWPIC( G_buff_page, G_bg_pic, pic_des_x, pic_des_y, 20, 20 , pic_des_x, pic_des_y, 1)

'显示移动了的步数
ShowNum( G_buff_page, G_num_pic, 240, 245, G_User_MoveCount)

'这个菜单的机制还不够完整  暂时只能将就用了
'菜单那一点点
SHOWPIC( G_buff_page, G_menu_u_pic, 234, 270, 6, 50 , 0, 0, 1)

end function

'//获取用户输入
function getInput()

'/////===========触屏
if G_User_Inkey < 0 then
	G_touch_x = getpenposx( G_User_Inkey)
	G_touch_y = getpenposy( G_User_Inkey)
	
	calTouchId() '计算触摸
	
else
	G_touch_x = -1
	G_touch_y = -1
	G_touch_id = -1
end if
'/////=========== 方向键
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

function picMove()

dim shared pic_row, pic_list, G_User_Posid, G_User_MoveNum

dim shared temp_data, detail_data, temp_i, temp_j, temp_k, temp_l
	
	if G_User_MoveNum = 0 then
		vasm(" jmp FINT_picMove_Exit")
	end if
	
	'//添加移动步骤的信息
	G_User_PreMove = G_User_MoveNum
	
	G_User_MoveCount = G_User_MoveCount + 1
	'//
	
	temp_data = G_User_MoveNum
	
	temp_j = G_User_Posid + temp_data
	temp_i = temp_j * 4
	temp_k = G_User_Posid * 4
	
	'变换位置id
	asm
	
	ld int r1, pic_0_posid
	cal int add r1, [vint_temp_i]
	

	ld int r2, pic_0_posid
	cal int add r2, [vint_temp_k]
	
	ld int r0, [ r1 ]
	ld int [ r1 ], [ r2 ]
	ld int [ r2 ], r0	
	endasm
	G_User_Posid = G_User_Posid + temp_data
	
	vasm(" jmp FINT_picMove_Exit")	
	
end function

'//==计算移动的数值
function calMoveNum()

dim shared pic_row, pic_list, G_User_Posid

dim shared temp_data, detail_data, temp_i, temp_j, temp_k, temp_l

	'//使用记录时不计算
	if G_User_Dont_MOVE then
		G_User_Dont_MOVE = 0
		vasm(" JMP FINT_calMoveNum_EXIT:")
	end if


	pic_list = G_User_Posid mod 3
	pic_row = G_User_Posid / 3	
	
	G_User_MoveNum = 0

	'//触屏式
	
	'中心点
	temp_i = pic_list * 80 + 40
	temp_j = pic_row * 80 + 40
	'相对
	temp_i = temp_i - G_touch_x
	temp_j = temp_j - G_touch_y

	'Ps 我觉得应该可以不要这么多jmp的 因为要是很好的程序 jmp不jmp是一样的，但是在bb中~~还是jmp好
	if G_touch_id = Touch_PicChunk then
		
		if -40 < temp_i and temp_i < 40	then
		
			if temp_j > 40 and temp_j < 120  then
				G_User_MoveNum = -3
				vasm(" JMP FINT_calMoveNum_EXIT:")
			else if -120 < temp_j and temp_j < -40  then
				G_User_MoveNum = 3
				vasm(" JMP FINT_calMoveNum_EXIT:")			
			end if
		
		else if -40 < temp_j and temp_j < 40	then
			
			if temp_i > 40 and temp_i < 120  then
				G_User_MoveNum = -1
				vasm(" JMP FINT_calMoveNum_EXIT:")
			else if -120 < temp_i and temp_i < -40  then
				G_User_MoveNum = 1
				vasm(" JMP FINT_calMoveNum_EXIT:")			
			end if		
			
		end if
		
	vasm(" JMP FINT_calMoveNum_EXIT:")
	end if
	'//键盘式

	if G_key_down and pic_row > 0 then
		G_User_MoveNum = - 3
		
	else if G_key_up and pic_row < 2 then
		G_User_MoveNum = 3
		
	else if G_key_right and pic_list > 0 then
		G_User_MoveNum = - 1
	
	else if G_key_left and pic_list < 2 then
		G_User_MoveNum = 1
	end if

end function
'//检测是否通关
function gamePassGate()
dim shared pic_row, pic_list, G_User_Posid

dim shared temp_data, detail_data, temp_i, temp_j, temp_k, temp_l

temp_j = 0
detail_data = 0
temp_data = 0
vasm(" ld int [vint_temp_i], pic_0_posid")
while temp_data < 9

	asm
	ld int r0, [vint_temp_i]
	ld int [ vint_detail_data], [ r0 ]
	endasm
	'detail_data
	if detail_data = temp_data then
		temp_j = temp_j + 1
	end if
	
temp_i = temp_i + 4
temp_data = temp_data + 1
wend

'//===进入下一关  这里尚不完善
if temp_j = 9 then
	passGateAnimate()
	'进入下一关
	G_USer_GATE = G_USer_GATE + 1
	'返回值
	gamePassGate = 1
else
	gamePassGate = 0
end if

end function

function confirm( string$)

dim confirm_choice, confirm_key, confirm_x, confirm_y, confirm_str$

	locate( 2,1 )
  
	SHOWPIC( -1, G_bg_pic, 0, 0, 240, 240, 0, 0, 1)	
	
	print string$	
	
	locate( 15,29 )
	print  "是"

	locate( 15,1 )
	print  "否"	
	
	confirm_choice = -1
	
	while confirm_choice = -1
		
		confirm_key = waitkey()
		
		if confirm_key = KEY_ESCAPE then
			
			confirm_choice = 0
			
		else if confirm_key = key_enter then
			
			confirm_choice = 1
			
		else if confirm_key < 0 then '触摸屏模式
			
			confirm_y = getpenposy( confirm_key) 
			confirm_x = getpenposx( confirm_key) 
			if 224 < confirm_y and confirm_y < 240 then
				
				if confirm_x < 16 then
					
					confirm_choice = 0
					
				else if confirm_x > 220 then
					
					confirm_choice = 1
					
				end if		
			end if
			
		end if

	wend
	
	confirm = confirm_choice
	
end function

'//处理接受的信息
function revInput()

dim shared pic_row, pic_list, G_User_Posid

dim shared temp_data, detail_data, temp_i, temp_j, temp_k, temp_l

if G_Key_Escape then
	
	
	if G_GAME_START = GAME_NOT_START then
	'结束游戏  在主菜单按退出键
		
		if confirm("确认退出游戏吗？") then
		
			end
			
		end if
		
	else
	'游戏的时候按退出键 返回上一步
	G_User_MoveNum = - G_User_PreMove
	G_User_Dont_MOVE = 1
	
		
	end if
end if

'下面是只有在游戏运行时才处理的事件
if G_GAME_START = GAME_NOT_START then
	vasm(" jmp fint_revInput_exit:")
end if


'浏览全图
if G_touch_id = Touch_Scan_all then
	showpic( -1, G_main_pic, 0, 0, 240, 240, 0, 0, 1)
	G_User_Dont_MOVE = 1
	G_User_MoveNum = 0
	waitkey()
	
end if

'展开菜单
if G_touch_id = Touch_Game_Menu_unfold then
	gameMenu()
end if

end function

'//计算触摸区的id=====
function calTouchId()

'最先用y值来区分大范围
if G_touch_y < 240 then
	G_touch_id = Touch_PicChunk' = Touch_Top 
	
	
	'游戏未开始的时候需要处理的
	if G_GAME_START <> GAME_NOT_START then 
		goto Ru_Guo_You_Xi_Kai_Shi_Le_Qing_Wu_Shi_FcalTouchId
	end if
	
	if 120 < G_touch_y and G_touch_y < 140 then
		
		if 47 < G_touch_x and G_touch_x < 191 then
			
			if G_touch_x < 77 then
				G_touch_id = Touch_User_Choice_left
			else if G_touch_x < 161 then
				G_touch_id = Touch_User_Choiced
			else 
				G_touch_id = Touch_User_Choice_right
			end if
			
		end if
		
	end if
	
	Ru_Guo_You_Xi_Kai_Shi_Le_Qing_Wu_Shi_FcalTouchId:
	'//以上就是游戏为开始时需要处理的
else
	G_touch_id = Touch_Menu
	
	'浏览全图
	if 252 < G_touch_y and G_touch_y < 312 and 8 < G_touch_x and G_touch_x < 68	then
		G_touch_id = Touch_Scan_all
	end if
	'点击展开菜单
	if 270 < G_touch_y and 234 < G_touch_x then
		G_touch_id = Touch_Game_Menu_unfold

	end if
	
	
		
end if

end function

'//图片是右对齐的！！用图片显示数字
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
while ShowNum_num

	ShowNum_cur_num =  ShowNum_num mod 10
	ShowNum_at_x = ShowNum_at_x - ShowNum_pic_wid
		
	showpic( ShowNum_hPage, ShowNum_hImg, ShowNum_at_x, ShowNum_at_y, ShowNum_pic_wid, ShowNum_pic_heg, ShowNum_cur_num * ShowNum_pic_wid, 0, 1)
	
ShowNum_num = ShowNum_num / 10
wend

end function

function passGateAnimate()



end function

function specialGate()

dim shared specialGate_var

dim shared pic_row, pic_list, G_User_Posid

dim shared temp_data, detail_data, temp_i, temp_j, temp_k, temp_l

specialGate_var = 0

'//==特殊关的特殊值
if G_User_Gate = 6 then
	
	specialGate_var = 8

end if

'//==

if not specialGate_var then
	vasm(" jmp fint_specialGate_exit")
end if

temp_j = 0
detail_data = 0
temp_data = 0
vasm(" ld int [vint_temp_i], pic_0_posid")
while temp_data < 9

	asm
	ld int r0, [vint_temp_i]
	ld int [ vint_detail_data], [ r0 ]
	endasm

	if detail_data = specialGate_var then
		G_User_Posid = temp_data
	end if
	
temp_i = temp_i + 4
temp_data = temp_data + 1
wend

end function

'//==游戏时的菜单
function gameMenu()
dim gameMenu_choice, gameMenu_last_choice, gameMenu_esc, gameMenu_x, gameMenu_y, gameMenu_key
dim shared temp_data, detail_data, temp_i, temp_j, temp_k, temp_l
'展开动画
temp_i = 0
temp_j = getpicwid( G_menu_u_pic) - 6
while temp_j
	
	SHOWPIC( - 1, G_menu_u_pic, 234 - temp_i, 270, 46, 50 , 0, 0, 1)
MSDELAY( 100)
temp_j = temp_j *  0.5
temp_i = temp_j + temp_i
wend

'//处理菜单
gameMenu_esc = 0
gameMenu_last_choice = 0
'现阶段的菜单只有两个选项~~~
while not gameMenu_esc
	
	G_User_Inkey = waitkey()
	getInput()
	
	if 270 < G_touch_y then
		
		'其实x可以不用这样计算的，这样变复杂了~
		'是从右到左计算的，所以最左边就是1
		'在这里 1就是 退出 2 就是保存
		if 220 < G_touch_x then
			gameMenu_choice = 1
		else if 200 < G_touch_x then
			gameMenu_choice = 2
		else 
			gameMenu_choice = 0	'点其他地方也退出菜单s
		end if
	else if G_touch_y > 0 then
			gameMenu_choice = 0	'点其他地方也退出菜单
	end if
	
	'由于只有两个选项就直接这样处理了
	if G_key_left then
		gameMenu_choice = 2
	else if G_key_right then
		gameMenu_choice = 1
	else if G_key_escape then
		gameMenu_choice = 0
	else if G_key_enter then
		gameMenu_choice = gameMenu_last_choice
	end if
	
	
	'在触屏的时候双击就相当于点了确定！
	if G_User_Inkey < 0  and gameMenu_last_choice = gameMenu_choice then
		G_key_enter = 1
	end if
	
	'处理选择的情况
	if not gameMenu_esc and G_key_enter then
		if gameMenu_choice = 1 then
			'退出关卡
			if confirm("确认返回主菜单吗？") then

				G_GAME_START = GAME_NOT_START
				gameMenu_choice = 0
			else
			'如果不退出则还原界面
			STRETCHBLTPAGEEX( 0, 0, 240, 240, 0, 0, - 1, G_buff_page)
			end if		
		else 
			'游戏保存
			if confirm("确认保存吗？") then
				
				gameSave()
				
				gameMenu_choice = 0
			else
			'如果不退出则还原界面
			STRETCHBLTPAGEEX( 0, 0, 240, 240, 0, 0, - 1, G_buff_page)
			end if
		end if
		
	end if
	
	'处理退出菜单的情况
	if gameMenu_choice then
		gameMenu_last_choice = gameMenu_choice
		
		'绘图
		SHOWPIC( - 1, G_menu_u_pic, 194, 270, 46, 50 , 0, 0, 1)
		SHOWPIC( - 1, G_menu_p_pic, 240 - gameMenu_last_choice * 20, 270, 20, 50 , 40 - gameMenu_last_choice * 20 , 0, 1)
	else
		gameMenu_esc = 1
	end if
	

wend

'折叠动画
temp_i = getpicwid( G_menu_u_pic) - 6
while temp_i
	
	SHOWPIC( - 1, G_menu_u_pic, 234 - temp_i, 270, 46, 50 , 0, 0, 1)
	'扫清页面
	STRETCHBLTPAGEEX( 194, 270, 46 - temp_i, 50 , 194, 270, - 1, G_buff_page)

MSDELAY( 100)
temp_i = temp_i *  0.5

wend

end function

'//保存游戏的函数
function gameSave()
dim shared getSequence_Sequence, G_User_Gate

	open "PT_SAV.sav" for binary as #1
	
	put #1, G_User_Gate
	put #1, getSequence_Sequence
	
	close #1

end function

'//=========================全局初始化量=========================================
IF GetEnv!() = Env_SIM Then
  mn$ = ".rlb"
Else
    mn$ = ".lib"
End IF

G_buff_page = Createpage()
'logo图
G_logo_pic = loadres( "PT_sys" + mn$, 1)
'全局背景
G_bg_pic = loadres( "PT_sys" + mn$, 2)
'数字图
G_num_pic = loadres( "PT_sys" + mn$, 3)
'未选中 游戏时的菜单
G_menu_u_pic = loadres( "PT_sys" + mn$, 9)
'选中
G_menu_p_pic = loadres( "PT_sys" + mn$, 10)
'//基本配置
'字体大小
FONT( FONT_16HEI)
'字体背景透明
SETBKMODE( TRANSPARENT)
'字体颜色
COLOR( 4028394, 0, 0)


'G_User_Gate = 1

'//============================开始游戏======================================

startgame()

end
'//==================================================================




'//==**==开始关卡==**==//
function startGate()

vasm(" StartGate:")
'//========**********关卡初始化值***********=====
'//G_User_Gate是当前关卡值
'//获取散列值
getSequence()

vasm(" ld int [ vint_G_User_Posid], [ pic_8_posid]")

'//===特殊关卡的特殊处理   要改变G_User_Posid的值  其实只是改变 G_User_Posid 的值

specialGate()

'//===
'//反算缺的那个位置
asm
ld int r0, pic_0_posid
ld int r1, [ vint_G_User_Posid]

cal int mul r1, 4
cal int add r0, r1

ld int [ vint_G_User_Pic], [ r0 ]
endasm

'
temp_data = G_User_Gate * 2
G_main_pic = loadres( "PT_res" + mn$, temp_data - 1)


G_scan_pic = loadres( "PT_res" + mn$, temp_data)


vasm(" Tiao_Zhuan_Dao_Main_While_Lable:")
'//绘制主屏

drawMainPage()

'//绘制小图块那些

drawPictureChunk()

flippage( G_buff_page)

LOCATE( 1, 1)

'print G_user_pic;G_user_posid

'当通关之后
if gamePassGate() then

	freeres( G_main_pic)
	freeres( G_scan_pic)
	
	if G_User_Gate = G_GATE_COUNT then
		
		SHOWPIC( -1, G_bg_pic, 0, 0, 240, 240, 0, 0, 1)
		locate( 1, 1)
		print "您太帅，太美丽了"
		print "恭喜您完美通关。"
		print "按任意键返回主界面"
		
		waitkey()
		G_GAME_START = GAME_NOT_START
	end if
	
	vasm(" jmp StartGate")
end if
'//获取输入
G_User_Inkey = waitkey()


'//获取计算输入
getInput()

'//处理用户输入
revInput()

'//计算移动的数值
calMoveNum()
'//计算图片的运动
picMove()

if G_GAME_START <> GAME_NOT_START	then

	vasm( " jmp Tiao_Zhuan_Dao_Main_While_Lable")
	
end if
'//=======结束函数体========//
end function

asm



exit

;玩家默认控制最右下角的哪个
;这个结果是最终拼图完成后的位置。开始的具体位置还是posid决定
;读取res分割的时候就用顺序分割，因为位置随机了

data pic_0_posid dword 0
data pic_1_posid dword 1
data pic_2_posid dword 2
data pic_3_posid dword 3
data pic_4_posid dword 4
data pic_5_posid dword 5
data pic_6_posid dword 6
data pic_7_posid dword 8
User_Ctr_posid:
data pic_8_posid dword 7

endasm






















