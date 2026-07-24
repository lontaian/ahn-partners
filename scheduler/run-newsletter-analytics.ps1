$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot
$output = Join-Path $repo 'exports\newsletter-analytics'
$logs = Join-Path $output 'logs'
New-Item -ItemType Directory -Path $logs -Force | Out-Null
$log = Join-Path $logs ("task-{0}.log" -f (Get-Date -Format 'yyyy-MM-dd'))

Set-Location $repo
try {
  & 'C:\Program Files\nodejs\node.exe' --env-file=.env scripts/newsletter-analytics.mjs *>> $log
  if ($LASTEXITCODE -ne 0) {
    throw "Newsletter analytics exited with code $LASTEXITCODE"
  }
} catch {
  "[$(Get-Date -Format o)] ERROR $($_.Exception.Message)" | Add-Content -LiteralPath $log
  throw
}
