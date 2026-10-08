param(
    [switch]$Publish
)

$ErrorActionPreference = 'Stop'

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

$module = Get-Content 'module.json' -Raw | ConvertFrom-Json
$version = $module.version
$tag = "release-$version"
$zipName = "marvel-character-library-$version.zip"
$zipPath = Join-Path $repoRoot $zipName
$staging = Join-Path $env:TEMP "marvel-character-library-release-$version"

npm run validate:release
npm run build

if (Test-Path $staging) {
    Remove-Item -LiteralPath $staging -Recurse -Force
}
New-Item -ItemType Directory -Path $staging | Out-Null

Copy-Item -Path (Join-Path $repoRoot 'packs') -Destination $staging -Recurse -Force
$sourcePackData = Join-Path $staging 'packs\_source'
if (Test-Path $sourcePackData) {
    Remove-Item -LiteralPath $sourcePackData -Recurse -Force
}

$files = @('CONTENT-POLICY.md', 'README.md', 'module.json')
foreach ($file in $files) {
    Copy-Item -Path (Join-Path $repoRoot $file) -Destination $staging -Force
}

if (Test-Path $zipPath) {
    Remove-Item -LiteralPath $zipPath -Force
}
Compress-Archive -Path (Join-Path $staging '*') -DestinationPath $zipPath -CompressionLevel Optimal

if ($Publish) {
    gh release create $tag $zipPath 'module.json' `
        --repo 'DeadEzrah/marvel-character-library' `
        --title "Marvel Character Library $version" `
        --generate-notes
}

Write-Output "Release package ready: $zipPath"
