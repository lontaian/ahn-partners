$ErrorActionPreference = 'Stop'

$gcloud = Join-Path $env:LOCALAPPDATA 'Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd'
if (-not (Test-Path -LiteralPath $gcloud)) {
  throw "Google Cloud SDK not found: $gcloud"
}

& $gcloud auth application-default login --scopes='https://www.googleapis.com/auth/analytics.readonly,https://www.googleapis.com/auth/gmail.readonly,https://www.googleapis.com/auth/cloud-platform'
if ($LASTEXITCODE -ne 0) {
  throw "Google application-default login failed with code $LASTEXITCODE"
}
