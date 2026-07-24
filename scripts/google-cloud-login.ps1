$ErrorActionPreference = 'Stop'

$gcloud = Join-Path $env:LOCALAPPDATA 'Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd'
if (-not (Test-Path -LiteralPath $gcloud)) {
  throw "Google Cloud SDK not found: $gcloud"
}

& $gcloud auth login phantas19@gmail.com --force
if ($LASTEXITCODE -ne 0) {
  throw "Google Cloud login failed with code $LASTEXITCODE"
}
