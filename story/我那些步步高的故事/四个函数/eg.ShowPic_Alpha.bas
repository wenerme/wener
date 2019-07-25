declare function showpic_alpha( srcPage, srcPic, alPic, DisX,DisY, Wid, Hgt, srcX, srcY, showMODE)


IF GetEnv!() = Env_SIM Then
	Fe$ = ".rlb"
Else
	Fe$ = ".lib"
End IF


setlcd( 240, 320)

pa = createpage()

im = loadres( "al" + fe$, 1)
ia = loadres( "al" + fe$, 2)

ib = loadres( "PT_res" + fe$, 5)
showpic( pa, ib, 0, 0, 240, 320, 0, 0, 1)



t = gettick()

showpic_alpha( pa, im, ia, 0, 0, 120, 160, 0, 0, 1)

flippage( pa)

print gettick() - t



waitkey()
waitkey()

end

'//=========ShowPic_Alpha==========//
'//=========带Alpha显示图片==========//
'作者 Wener
'论坛Id a3160586 (club.eebbk.com   编程区)
'QQ 514403150
function showpic_alpha( srcPage, srcPic, alPic, DisX, DisY, Wid, Hgt, srcX, srcY, showMODE)
'Block
dim shared showpic_alpha_srcPage, showpic_alpha_srcPic, showpic_alpha_alPic
dim shared showpic_alpha_DisX, showpic_alpha_DisY, showpic_alpha_Wid, showpic_alpha_Hgt
dim shared showpic_alpha_srcX, showpic_alpha_srcY, showpic_alpha_showMODE
dim shared showpic_alpha_catchPage, showpic_alpha_AlphaPage, showpic_alpha_disPage
dim shared showpic_alpha_px, showpic_alpha_py, showpic_alpha_pcolor, showpic_alpha_pal
dim shared showpic_alpha_Maxx, showpic_alpha_Maxy
dim shared showpic_alpha_bgcolor

showpic_alpha_srcPage 	= srcPage
showpic_alpha_srcPic 	= srcPic
showpic_alpha_alPic 	= alPic

showpic_alpha_DisX 	= DisX 
showpic_alpha_DisY 	= DisY 
showpic_alpha_Wid 	= Wid 
showpic_alpha_Hgt 	= Hgt 

showpic_alpha_srcX 		= srcX 
showpic_alpha_srcY 		= srcY 
showpic_alpha_showMODE 	= showMODE

showpic_alpha_catchPage = createpage()
showpic_alpha_AlphaPage = createpage()
showpic_alpha_disPage 	= createpage()

'//========初始化
asm
'汇编优化
' STRETCHBLTPAGEEX( showpic_alpha_DisX, showpic_alpha_Disy, showpic_alpha_Wid, showpic_alpha_HGT, showpic_alpha_srcX, showpic_alpha_srcy, showpic_alpha_disPage, showpic_alpha_srcPage)

ld int [ showpic_alpha_Paramater_1 ], 0
ld int [ showpic_alpha_Paramater_2 ], 0
ld int [ showpic_alpha_Paramater_3 ], [ vint_showpic_alpha_Wid ]
ld int [ showpic_alpha_Paramater_4 ], [ vint_showpic_alpha_hgt ]
ld int [ showpic_alpha_Paramater_5 ], [ vint_showpic_alpha_DisX ]
ld int [ showpic_alpha_Paramater_6 ], [ vint_showpic_alpha_Disy ]
ld int [ showpic_alpha_Paramater_7 ], [ vint_showpic_alpha_disPage ]
ld int [ showpic_alpha_Paramater_8 ], [ vint_showpic_alpha_srcPage ]

ld int r3, showpic_alpha_Paramater_8

OUT 80,0

' STRETCHBLTPAGEEX( ^, showpic_alpha_catchPage, showpic_alpha_srcPage)
ld int [ showpic_alpha_Paramater_7 ], [ vint_showpic_alpha_catchPage ]

OUT 80,0

'showpic( showpic_alpha_catchPage, showpic_alpha_srcPic, showpic_alpha_DisX, showpic_alpha_DisY, showpic_alpha_Wid, showpic_alpha_Hgt, showpic_alpha_srcX, showpic_alpha_srcY, showpic_alpha_showMODE)
ld int [ showpic_alpha_Paramater_1 ], [ vint_showpic_alpha_catchPage]
ld int [ showpic_alpha_Paramater_2 ], [ vint_showpic_alpha_srcPic]

ld int [ showpic_alpha_Paramater_3 ], 0
ld int [ showpic_alpha_Paramater_4 ], 0
ld int [ showpic_alpha_Paramater_5 ], [ vint_showpic_alpha_Wid ]
ld int [ showpic_alpha_Paramater_6 ], [ vint_showpic_alpha_hgt ]
ld int [ showpic_alpha_Paramater_7 ], [ vint_showpic_alpha_SrcX ]
ld int [ showpic_alpha_Paramater_8 ], [ vint_showpic_alpha_Srcy ]
ld int [ showpic_alpha_Paramater_9 ], [ vint_showpic_alpha_showMODE ]

ld int r3, showpic_alpha_Paramater_9

OUT 20,0

'Alpha  页面
'showpic( showpic_alpha_alphaPage, showpic_alpha_alPic, ……)
ld int [ showpic_alpha_Paramater_1 ], [ vint_showpic_alpha_alphaPage ]
ld int [ showpic_alpha_Paramater_2 ], [ vint_showpic_alpha_alPic ]

OUT 20,0

'调用主过程
call showpic_alpha_main:

endasm

'//====把合成的部分拷回原来的页面
STRETCHBLTPAGEEX( showpic_alpha_DisX, showpic_alpha_DisY, showpic_alpha_Wid, showpic_alpha_HGT, 0, 0, showpic_alpha_srcPage, showpic_alpha_catchPage)

deletepage( showpic_alpha_catchPage)
deletepage( showpic_alpha_AlphaPage)
deletepage( showpic_alpha_DisPage)
end function
asm
'//=========汇编部分===========//
'Block
'//===调用端口的参数列表
'Block
showpic_alpha_Paramater_9:
.block 4 0
showpic_alpha_Paramater_8:
.block 4 0
showpic_alpha_Paramater_7:
.block 4 0
showpic_alpha_Paramater_6:
.block 4 0
showpic_alpha_Paramater_5:
.block 4 0
showpic_alpha_Paramater_4:
.block 4 0
showpic_alpha_Paramater_3:
.block 4 0
showpic_alpha_Paramater_2:
.block 4 0
showpic_alpha_Paramater_1:
.block 4 0
'EndBlock


;//====================循环的主过程========================//
showpic_alpha_main:
'Block
;'showpic_alpha_pY = showpic_alpha_srcY
ld int [ vint_showpic_alpha_pY ], 0

showpic_alpha_Process_Y_Bend:
;'while showpic_alpha_py < showpic_alpha_Maxy
cmp int [ vint_showpic_alpha_py ], [ vint_showpic_alpha_Hgt ]
jpc AE showpic_alpha_Process_Y_Wend:
	
	;'showpic_alpha_px = showpic_alpha_srcX
	ld int [ vint_showpic_alpha_px ], 0
	
	;'while showpic_alpha_pX < showpic_alpha_Maxx
	showpic_alpha_Process_X_Bend:
	cmp int [ vint_showpic_alpha_pX ], [ vint_showpic_alpha_Wid ]
	jpc AE showpic_alpha_Process_X_Wend:
	
	call showpic_alpha_MixOne:
	
	;'showpic_alpha_px = showpic_alpha_px + 1
	cal int add [ vint_showpic_alpha_px ], 1
	;'wend
	jmp showpic_alpha_Process_X_Bend:
	showpic_alpha_Process_X_Wend:

cal int add [ vint_showpic_alpha_py ], 1
;'wend
jmp showpic_alpha_Process_Y_Bend:
showpic_alpha_Process_Y_Wend:

'out 0, [ vint_showpic_alpha_py ]

ret
'EndBlock
showpic_alpha_AlphaMAX_blue_1:
.block 1 0
showpic_alpha_AlphaMAX_green_1:
.block 1 0
showpic_alpha_AlphaMAX_red_1:
.block 2 0

showpic_alpha_AlphaMAX_blue_2:
.block 1 0
showpic_alpha_AlphaMAX_green_2:
.block 1 0
showpic_alpha_AlphaMAX_red_2:
.block 2 0
;//====================Alpha颜色混合=======================//

showpic_alpha_AlphaMAX:

;参数 r1 颜色1 r2 颜色2 r0 Alpha 为0 - 255的值
;这个过程只管混合颜色 不处理alpha为0 或255的优化
;返回值在 r1 中
'Block

ld int [ showpic_alpha_AlphaMAX_blue_1 ], r1
ld int [ showpic_alpha_AlphaMAX_blue_2 ], r2

;在下面的过程中，r1为当前处理的颜色1 ,r2为当前处理的颜色2,r3为颜色2的alpha值 也就是 255 - r0
ld int r3, 255
cal int sub r3, r0

;b
ld int r1, 0
ld byte r1, [ showpic_alpha_AlphaMAX_blue_1 ]

ld int r2, 0
ld byte r2, [ showpic_alpha_AlphaMAX_blue_2 ]

cal int mul r1, r0
;== 这个应该可以用位运算来优化吧？
cal int div r1, 255

cal int mul r2, r3
cal int div r2, 255

cal int add r1, r2

ld byte [ showpic_alpha_AlphaMAX_blue_1 ], r1

;g
ld int r1, 0
ld byte r1, [ showpic_alpha_AlphaMAX_green_1 ]

ld int r2, 0
ld byte r2, [ showpic_alpha_AlphaMAX_green_2 ]

cal int mul r1, r0
cal int div r1, 255

cal int mul r2, r3
cal int div r2, 255

cal int add r1, r2

ld byte [ showpic_alpha_AlphaMAX_green_1 ], r1

;r
ld int r1, 0
ld byte r1, [ showpic_alpha_AlphaMAX_red_1 ]

ld int r2, 0
ld byte r2, [ showpic_alpha_AlphaMAX_red_2 ]

cal int mul r1, r0
cal int div r1, 255

cal int mul r2, r3
cal int div r2, 255

cal int add r1, r2

ld byte [ showpic_alpha_AlphaMAX_red_1 ], r1

;==返回

ld int r1, [ showpic_alpha_AlphaMAX_blue_1 ]

ret
'EndBlock

;//==========在主过程中混合一个颜色的过程===========//
showpic_alpha_MixOne:
'Block
;'showpic_alpha_pal = readpixel( showpic_alpha_alphaPage, showpic_alpha_px, showpic_alpha_py)
ld int [ showpic_alpha_Paramater_1 ], [ vint_showpic_alpha_alphaPage ]
ld int [ showpic_alpha_Paramater_2 ], [ vint_showpic_alpha_px ]
ld int [ showpic_alpha_Paramater_3 ], [ vint_showpic_alpha_py ]

ld int r3, showpic_alpha_Paramater_3

OUT 25,0
;'此时r3为颜色值
ld int [ vint_showpic_alpha_pal ], r3

;'if showpic_alpha_pal = &hffffff then
cmp byte [ vint_showpic_alpha_pal ], 255
jpc z showpic_alpha_MixOne_EndCmp:

;'showpic_alpha_bgcolor = readpixel( showpic_alpha_disPage, showpic_alpha_px, showpic_alpha_py)
ld int [ showpic_alpha_Paramater_1 ], [ vint_showpic_alpha_disPage]

ld int r3, showpic_alpha_Paramater_3
OUT 25,0
ld int [ vint_showpic_alpha_bgcolor ], r3

;'showpic_alpha_pcolor = readpixel( showpic_alpha_catchPage, showpic_alpha_px, showpic_alpha_py)
ld int [ showpic_alpha_Paramater_1 ], [ vint_showpic_alpha_catchPage]

ld int r3, showpic_alpha_Paramater_3
OUT 25,0
ld int [ vint_showpic_alpha_pcolor ], r3

		;Alpha 的混合过程
		ld int r1, [ vint_showpic_alpha_pcolor ]
		ld int r2, [ vint_showpic_alpha_bgcolor ]
		ld int r0, 0
		ld byte r0, [ vint_showpic_alpha_pal ]
		
		call showpic_alpha_AlphaMAX:
		
		ld int [ vint_showpic_alpha_pcolor ], r1

;'pixel( showpic_alpha_catchPage, showpic_alpha_px, showpic_alpha_py, showpic_alpha_pcolor)
;这一步是可以不要的  因为和上面一样的 但是为了代码明了~还是加上了
ld int [ showpic_alpha_Paramater_1 ], [ vint_showpic_alpha_catchPage]

ld int [ showpic_alpha_Paramater_4 ], [ vint_showpic_alpha_pcolor ]
ld int r3, showpic_alpha_Paramater_4
OUT 24,0

showpic_alpha_MixOne_EndCmp:

ret
'EndBlock
'EndBlock
endasm
'EndBlock








