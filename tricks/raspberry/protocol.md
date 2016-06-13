
## RS-232

__Hardware Flow Controls__

DTE | Direction | DCE | Description | Active
----|----|----|----
RTS |→ |RTS |Request to send(†) |Low
CTS |← |CTS |Clear to send(†)|
DSR |← |DSR |Data set ready |Low
DTR |→ |DTR |Data terminal ready|

† Primary flow control signals

__Software Flow Control Characters__

Code | Meaning | ASCII | Hex | Keyboard
----|----|----
XOFF| Pause transmission |DC3 | 13 | Control-S
XON | Resume transmission |DC1 | 11 | Control-Q

The disadvantages of software flow control include the following:
1. Line noise can prevent the receiver from seeing the XOFF character and can lead to loss of
data (causing data overrun).
2. Line noise can prevent the remote end from seeing the XON character and can fail to
resume transmission (causing a link “lockup”).
3. Line noise can cause a false XON/XOFF character to be received (data loss or link lockup).
4. The delay in the remote end seeing a transmitted XOFF character can cause loss of data if
the receiving buffer is full.
5. The XON and XOFF characters cannot be used for data in the transmission.
Problems 1 to 3 can cause link lockups or data loss to occur. Problem 4 is avoidable if the buffer

## I2C

## 1Wire
