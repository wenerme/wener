---
title: Windows Installer (MSI)
tags:
  - Windows
  - MSI
  - Installer
  - DevOps
---

# Windows Installer (MSI) {#windows-installer}

- [StackOverflow: MSI vs EXE](https://stackoverflow.com/questions/49624070)
- [NSIS](http://nsis.sourceforge.net/)
- [WiX Toolset](https://github.com/wixtoolset/wix3)
  - [Manual](https://wixtoolset.org/documentation/manual/v3/)
- [Inno Setup](https://jrsoftware.org/isinfo.php)

> **Why MSI?**
>
> - [Non-MSI Installers](http://www.installsite.org/pages/en/tt_nonmsi.htm)
> - [MSI Authoring Tools](http://www.installsite.org/pages/en/msi/authoring.htm)

## Commands

```bash
# Download NSIS
curl -LOJ 'https://sourceforge.net/projects/nsis/files/NSIS%203/3.06.1/nsis-3.06.1-setup.exe/download'

# Install MSI silently with logging
msiexec /i c:\path\to\package.msi /quiet /qn /norestart /log c:\path\to\install.log PROPERTY1=value1 PROPERTY2=value2
```

## msiexec Help

```text
Windows (R) Installer. V 5.0.9600.16384

msiexec /Option <Required Parameter> [Optional Parameter]

Install Options
	</package | /i> <Product.msi>
		Install or configure product
	/a <Product.msi>
		Administrative install - install product on network
	/j<u|m> <Product.msi> [/t <Transform List>] [/g <Language ID>]
		Advertise product - m for all users, u for current user
	</uninstall | /x> <Product.msi | ProductCode>
		Uninstall product

Display Options
	/quiet
		Quiet mode, no user interaction
	/passive
		Unattended mode - progress bar only
	/q[n|b|r|f]
		Set UI level
		n - No UI
		b - Basic UI
		r - Reduced UI
		f - Full UI (default)

Restart Options
	/norestart
		Do not restart after installation complete
	/promptrestart
		Prompt user to restart if necessary
	/forcerestart
		Always restart computer after install

Logging Options
	/l[i|w|e|a|r|u|c|m|o|p|v|x|+|!|*] <LogFile>
		i - Status messages
		w - Non-fatal warnings
		e - All error messages
		a - Start of action
		r - Action-specific records
		u - User requests
		c - Initial UI parameters
		m - Out of memory or fatal exit info
		o - Out of disk space messages
		p - Terminal properties
		v - Verbose output
		x - Extra debugging info
		+ - Append to existing log file
		! - Flush each line to log
		* - Log all information, except v and x options
	/log <LogFile>
		Equivalent to /l* <LogFile>

Update Options
	/update <Update1.msp>[;Update2.msp]
		Apply updates
	/uninstall <PatchCodeGuid>[;Update2.msp] /package <Product.msi | ProductCode>
		Remove updates for a product

Repair Options
	/f[p|e|c|m|s|o|d|a|u|v] <Product.msi | ProductCode>
		Repair product
		p - Only if file is missing
		o - If file is missing or an older version is installed (default)
		e - If file is missing or an equal or older version is installed
		d - If file is missing or a different version is installed
		c - If file is missing or checksum does not match calculated value
		a - Force reinstall of all files
		u - All required user-specific registry entries (default)
		m - All required computer-specific registry entries (default)
		s - All existing shortcuts (default)
		v - Runs from source and recaches local package

Set Public Properties
	[PROPERTY=PropertyValue]
```
