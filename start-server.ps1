# COA_Tools Backend Server Launcher (PowerShell)
# This script starts the Node.js backend server for COA_Tools

Write-Host "=================================" -ForegroundColor Cyan
Write-Host "  COA_Tools Backend Server" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
    } else {
        throw "Node.js not found"
    }
} catch {
    Write-Host "✗ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "Recommended version: v14 or higher" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Check if npm is installed
Write-Host "Checking npm installation..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ npm found: v$npmVersion" -ForegroundColor Green
    } else {
        throw "npm not found"
    }
} catch {
    Write-Host "✗ npm is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "npm should come with Node.js. Please reinstall Node.js." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host ""

# Check if node_modules exists
if (-Not (Test-Path "node_modules")) {
    Write-Host "node_modules not found. Installing dependencies..." -ForegroundColor Yellow
    Write-Host ""
    npm install
    Write-Host ""
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install dependencies!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Press any key to exit..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        exit 1
    }
    Write-Host "✓ Dependencies installed successfully!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "✓ Dependencies already installed" -ForegroundColor Green
    Write-Host ""
}

# Start the server
Write-Host "=================================" -ForegroundColor Cyan
Write-Host "  Starting Backend Server..." -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Server will be available at: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Start the server
npm start
