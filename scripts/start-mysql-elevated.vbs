Set objShell = CreateObject("Shell.Application")

' This VBScript will attempt to start the MySQL80 service with elevated privileges
' It will prompt for administrator access

objShell.ShellExecute "net", "start MySQL80", "", "runas", 1

WScript.Echo "Attempting to start MySQL80 service with administrator privileges..."
WScript.Echo "Please approve the User Account Control (UAC) prompt if it appears."
