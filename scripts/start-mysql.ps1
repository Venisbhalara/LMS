# Start MySQL Service Script
# This script attempts to start the MySQL80 service

Write-Host "Checking MySQL80 service status..." -ForegroundColor Cyan

# Check current status
$service = Get-Service -Name MySQL80 -ErrorAction SilentlyContinue

if ($null -eq $service) {
    Write-Host "ERROR: MySQL80 service not found!" -ForegroundColor Red
    Write-Host "Please check if MySQL is installed correctly." -ForegroundColor Yellow
    exit 1
}

Write-Host "Current Status: $($service.Status)" -ForegroundColor Yellow

if ($service.Status -eq "Running") {
    Write-Host "MySQL80 is already running!" -ForegroundColor Green
    exit 0
}

Write-Host "`nAttempting to start MySQL80 service..." -ForegroundColor Cyan
Write-Host "Note: This requires Administrator privileges." -ForegroundColor Yellow

try {
    Start-Service -Name MySQL80 -ErrorAction Stop
    Write-Host "`nSUCCESS! MySQL80 service started successfully!" -ForegroundColor Green
    
    # Verify it's running
    $service = Get-Service -Name MySQL80
    Write-Host "Current Status: $($service.Status)" -ForegroundColor Green
    
    Write-Host "`nYou can now open MySQL Workbench and connect to see your 'lms' database." -ForegroundColor Cyan
    
} catch {
    Write-Host "`nERROR: Failed to start MySQL80 service." -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Message -like "*Access is denied*" -or $_.Exception.Message -like "*cannot be started*") {
        Write-Host "`n=== SOLUTION ===" -ForegroundColor Yellow
        Write-Host "You need to run this script as Administrator:" -ForegroundColor Yellow
        Write-Host "1. Right-click on PowerShell" -ForegroundColor White
        Write-Host "2. Select 'Run as Administrator'" -ForegroundColor White
        Write-Host "3. Navigate to: d:\L-M-S" -ForegroundColor White
        Write-Host "4. Run: .\start-mysql.ps1" -ForegroundColor White
        Write-Host "`nOR use Services Manager:" -ForegroundColor Yellow
        Write-Host "1. Press Win+R" -ForegroundColor White
        Write-Host "2. Type: services.msc" -ForegroundColor White
        Write-Host "3. Find MySQL80, right-click, and select Start" -ForegroundColor White
    }
    
    exit 1
}
