# Serial


## Tips
* http://tldp.org/HOWTO/Remote-Serial-Console-HOWTO/
```bash
# https://wiki.archlinux.org/index.php/working_with_the_serial_console#Command_line
minicom -s

screen /dev/ttyS0 115200
# <C-A><C-\> 退出
# https://www.gnu.org/software/screen/manual/html_node/Key-Binding.html#Key-Binding
```

### screen

```bash

```

### minicom

* 默认 Meta 为 ESC

```
+-------------------------------------------------------------------+
|                      Minicom Command Summary                      |
|                                                                   |
|               Commands can be called by Meta-<key>                |
|                                                                   |
|               Main Functions                  Other Functions     |
|                                                                   |
| Dialing directory..D  run script (Go)....G | Clear Screen.......C |
| Send files.........S  Receive files......R | cOnfigure Minicom..O |
| comm Parameters....P  Add linefeed.......A | Suspend minicom....J |
| Capture on/off.....L  Hangup.............H | eXit and reset.....X |
| send break.........F  initialize Modem...M | Quit with no reset.Q |
| Terminal settings..T  run Kermit.........K | Cursor key mode....I |
| lineWrap on/off....W  local Echo on/off..E | Help screen........Z |
| Paste file.........Y  Timestamp toggle...N | scroll Back........B |
| Add Carriage Ret...U                                              |
|                                                                   |
|             Select function or press Enter for none.              |
+-------------------------------------------------------------------+
```


### cu.* vs tty.*

The idea is to supplement software in sharing a line between incoming and outgoing calls. The callin device (typically /dev/tty*) is used for incoming traffic. Any process trying to open it blocks within the open() call as long as DCD is not asserted by hardware (i.e. as long as the modem doesn't have a carrier). During this, the callout device (typically /dev/cu* -- cu stands for "calling unit") can be freely used. Opening /dev/cu* doesn't require DCD to be asserted and succeeds immediately. Once succeeded, the blocked open() on the callin device will be suspended, and cannot even complete when DCD is raised, until the cu device is closed again.

That way, you can have a getty listening on /dev/tty*, and can still use /dev/cu* without restrictions.

http://stackoverflow.com/questions/8632586
