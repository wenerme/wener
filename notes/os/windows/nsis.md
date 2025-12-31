---
title: NSIS
tags:
  - Windows
  - Installer
  - NSIS
  - Development
---

# NSIS {#nsis}

- [NSIS User Manual](https://nsis.sourceforge.io/Docs/Contents.html)
- [Scripting Reference](https://nsis.sourceforge.io/Docs/Chapter4.html)
- [Modern UI Readme](https://nsis.sourceforge.io/Docs/Modern%20UI/Readme.html)

## Examples

```nsis
; Example.nsi
; Very simple example: all optional settings left as default.

; Name the installer
Name "Example"
; Set the installer output file name
OutFile "ExampleInstaller.exe"
; Set the default installation directory
InstallDir $PROGRAMFILES\Arrayjet\Sprint
; Set the text to prompt user to enter a directory
DirText "This will install My Cool Program on your computer. Choose a directory"

; Specify all files needed for installation
Section "MainSection" SEC01
   SetOutPath $INSTDIR
   CreateDirectory $INSTDIR
   File Program.exe
   File Text.txt
SectionEnd
```

```nsis
Unicode True
Name "我的应用"
OutFile "MyInstaller.exe"
InstallDir "$ProgramFiles\$(^Name)"

Section
  MessageBox MB_OK "${U+2115}SIS" # DOUBLE-STRUCK CAPITAL N + "SIS"
SectionEnd
```

### Modern UI

```nsis
!include MUI2.nsh
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_LANGUAGE SimpChinese
```

```nsis
!include "MUI2.nsh"
!define MUI_ICON "path\to\icon.ico"
!define MUI_HEADERIMAGE
!define MUI_HEADERIMAGE_BITMAP "path\to\InstallerLogo.bmp"
!define MUI_HEADERIMAGE_RIGHT
```

### Shortcuts & Uninstaller

```nsis
Name "Delete Startup File"
OutFile "Delete Startup File.exe"
InstallDir "$PROGRAMFILES\myapp"

Page directory
Page instfiles
UninstPage instfiles

Section
  SetOutPath "$INSTDIR"
  CreateShortCut "$SMSTARTUP\Uninstall this app.lnk" "$INSTDIR\uninstall.exe"
  WriteUninstaller "$INSTDIR\uninstall.exe"
SectionEnd

Section Uninstall
  Delete "$SMSTARTUP\Uninstall this app.lnk"
  Delete "$INSTDIR\uninstall.exe"
  RMDir "$INSTDIR"
SectionEnd
```

### Checkbox on Finish Page

```nsis
Function finishpageaction
  CreateShortcut "$desktop\foo.lnk" "$instdir\foo.exe"
FunctionEnd

!define MUI_FINISHPAGE_SHOWREADME ""
!define MUI_FINISHPAGE_SHOWREADME_NOTCHECKED
!define MUI_FINISHPAGE_SHOWREADME_TEXT "Create Desktop Shortcut"
!define MUI_FINISHPAGE_SHOWREADME_FUNCTION finishpageaction
!define MUI_FINISHPAGE_RUN "$INSTDIR\app.exe"
!insertmacro MUI_PAGE_FINISH
```

## Commands

```nsis
; Execute
Exec '"$INSTDIR\someprogram.exe"'
Exec '"$INSTDIR\someprogram.exe" some parameters'
```

## Tips

- `$PROGRAMFILES`: Usually `C:\Program Files`.
  - On x64, `$PROGRAMFILES` and `$PROGRAMFILES32` -> `C:\Program Files (x86)`.
  - `$PROGRAMFILES64` -> `C:\Program Files`.
