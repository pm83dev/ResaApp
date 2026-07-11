# start-all.ps1 - Avvia Backend e Frontend in modo asincrono
Write-Host "Avvio Backend in background..." -ForegroundColor Green

# Avvia il backend in una finestra nascosta
Start-Process -FilePath "dotnet" -ArgumentList "run", "--project", "ResaBackend/ResaBackend.csproj", "--urls", "https://localhost:7261" -WindowStyle Hidden

Write-Host "Avvio Frontend..." -ForegroundColor Green
Set-Location ResaFrontend
npm start
