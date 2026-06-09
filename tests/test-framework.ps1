# Top-Kit Framework Test Script
# Tests that all components are properly configured and working

param(
    [switch]$Verbose
)

$ErrorActionPreference = "Continue"
$TestCount = 0
$PassCount = 0
$FailCount = 0

function Write-Test {
    param(
        [string]$Name,
        [bool]$Passed,
        [string]$Message = ""
    )
    $script:TestCount++
    if ($Passed) {
        $script:PassCount++
        Write-Host "[PASS] $Name" -ForegroundColor Green
    } else {
        $script:FailCount++
        Write-Host "[FAIL] $Name" -ForegroundColor Red
        if ($Message) {
            Write-Host "       $Message" -ForegroundColor Yellow
        }
    }
}

function Test-FileExists {
    param([string]$Path, [string]$Name)
    $exists = Test-Path -Path $Path
    Write-Test -Name $Name -Passed $exists -Message "File not found: $Path"
    return $exists
}

function Test-SkillFrontmatter {
    param([string]$SkillPath, [string]$SkillName)
    
    if (-not (Test-Path $SkillPath)) {
        Write-Test -Name "Skill $SkillName frontmatter" -Passed $false -Message "File not found"
        return $false
    }
    
    $content = Get-Content -Path $SkillPath -Raw
    $hasFrontmatter = $content -match '^---\r?\nname: .+\r?\ndescription: .+\r?\n---'
    
    if ($hasFrontmatter) {
        $name = ($content | Select-String -Pattern 'name: (.+)' -AllMatches).Matches[0].Groups[1].Value
        $desc = ($content | Select-String -Pattern 'description: "(.+)"' -AllMatches).Matches[0].Groups[1].Value
        $nameMatches = $name -eq $SkillName
        $descValid = $desc.Length -gt 10
        
        Write-Test -Name "Skill ${SkillName}: name field" -Passed $nameMatches -Message "Expected: $SkillName, Got: $name"
        Write-Test -Name "Skill ${SkillName}: description field" -Passed $descValid -Message "Description too short or missing"
        return ($nameMatches -and $descValid)
    } else {
        Write-Test -Name "Skill $SkillName frontmatter" -Passed $false -Message "Invalid YAML frontmatter"
        return $false
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Top-Kit Framework Test Suite" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Test 1: Core Files
Write-Host "`n--- Core Files ---" -ForegroundColor Yellow
Test-FileExists -Path "AGENTS.md" -Name "AGENTS.md exists"
Test-FileExists -Path "core-instructions.md" -Name "core-instructions.md exists"
Test-FileExists -Path "CLAUDE.md" -Name "CLAUDE.md exists"
Test-FileExists -Path "GEMINI.md" -Name "GEMINI.md exists"
Test-FileExists -Path "gemini-extension.json" -Name "gemini-extension.json exists"
Test-FileExists -Path "README.md" -Name "README.md exists"

# Test 2: Package Config
Write-Host "`n--- Package Config ---" -ForegroundColor Yellow
Test-FileExists -Path "package.json" -Name "package.json exists"

# Test 3: CLI Entry Point
Write-Host "`n--- CLI Entry Point ---" -ForegroundColor Yellow
Test-FileExists -Path "bin/topkit.js" -Name "bin/topkit.js exists"

# Test 4: Library Files
Write-Host "`n--- Library Files ---" -ForegroundColor Yellow
Test-FileExists -Path "lib/installer.js" -Name "lib/installer.js exists"
Test-FileExists -Path "lib/detector.js" -Name "lib/detector.js exists"
Test-FileExists -Path "lib/skills-installer.js" -Name "lib/skills-installer.js exists"
Test-FileExists -Path "lib/utils.js" -Name "lib/utils.js exists"

# Test 5: Plugin Installers
Write-Host "`n--- Plugin Installers ---" -ForegroundColor Yellow
Test-FileExists -Path "lib/plugins/claude-code.js" -Name "lib/plugins/claude-code.js exists"
Test-FileExists -Path "lib/plugins/opencode.js" -Name "lib/plugins/opencode.js exists"
Test-FileExists -Path "lib/plugins/cursor.js" -Name "lib/plugins/cursor.js exists"
Test-FileExists -Path "lib/plugins/codex.js" -Name "lib/plugins/codex.js exists"

# Test 6: Plugin Source Files
Write-Host "`n--- Plugin Source Files ---" -ForegroundColor Yellow
Test-FileExists -Path "plugins/claude-code/plugin.json" -Name "Claude Code plugin manifest"
Test-FileExists -Path "plugins/claude-code/hooks/hooks.json" -Name "Claude Code hooks config"
Test-FileExists -Path "plugins/claude-code/hooks/session-start" -Name "Claude Code session-start script"
Test-FileExists -Path "plugins/claude-code/hooks/run-hook.cmd" -Name "Claude Code run-hook.cmd"
Test-FileExists -Path "plugins/opencode/topkit.js" -Name "OpenCode plugin"
Test-FileExists -Path "plugins/cursor/plugin.json" -Name "Cursor plugin manifest"
Test-FileExists -Path "plugins/cursor/hooks/hooks-cursor.json" -Name "Cursor hooks config"
Test-FileExists -Path "plugins/cursor/hooks/session-start" -Name "Cursor session-start script"
Test-FileExists -Path "plugins/codex/plugin.json" -Name "Codex plugin manifest"

# Test 7: Skills
Write-Host "`n--- Skills ---" -ForegroundColor Yellow
$skills = @(
    "top-using-topkit",
    "top-brainstorming",
    "top-writing-plans",
    "top-test-driven-development",
    "top-executing-plans"
)

foreach ($skill in $skills) {
    $skillPath = "skills/$skill/SKILL.md"
    Test-FileExists -Path $skillPath -Name "Skill: $skill"
    Test-SkillFrontmatter -SkillPath $skillPath -SkillName $skill | Out-Null
}

# Test 8: Hook Script Works
Write-Host "`n--- Hook Script Test ---" -ForegroundColor Yellow

# Check if bash is available
$bashAvailable = $false
if (Get-Command bash -ErrorAction SilentlyContinue) {
    $bashAvailable = $true
}
Write-Test -Name "Bash available on PATH" -Passed $bashAvailable

# Test the session-start script (if bash available)
if ($bashAvailable) {
    try {
        $env:CLAUDE_PLUGIN_ROOT = (Get-Location).Path
        $output = bash "$PSScriptRoot/../plugins/claude-code/hooks/session-start" 2>&1
        $isValidJson = $false
        try {
            $null = $output | ConvertFrom-Json
            $isValidJson = $true
        } catch {}
        Write-Test -Name "session-start produces valid JSON" -Passed $isValidJson -Message "Output: $output"
    } catch {
        Write-Test -Name "session-start script runs" -Passed $false -Message $_.Exception.Message
    }
} else {
    Write-Test -Name "session-start script (skipped - no bash)" -Passed $true
}

# Test 9: Plugin JSON Validity
Write-Host "`n--- Plugin JSON Validity ---" -ForegroundColor Yellow

$jsonFiles = @(
    "plugins/claude-code/plugin.json",
    "plugins/codex/plugin.json",
    "plugins/cursor/plugin.json",
    "plugins/claude-code/hooks/hooks.json",
    "plugins/cursor/hooks/hooks-cursor.json",
    "gemini-extension.json",
    "package.json"
)

foreach ($file in $jsonFiles) {
    if (Test-Path $file) {
        $content = Get-Content -Path $file -Raw
        $isValid = $false
        try {
            $null = $content | ConvertFrom-Json
            $isValid = $true
        } catch {}
        Write-Test -Name "JSON valid: $file" -Passed $isValid
    }
}

# Test 10: OpenCode Plugin Syntax
Write-Host "`n--- OpenCode Plugin Syntax ---" -ForegroundColor Yellow
$pluginContent = Get-Content -Path "plugins/opencode/topkit.js" -Raw
$hasExport = $pluginContent -match 'export\s+(const|default)'
$hasHooks = $pluginContent -match 'experimental\.chat\.messages\.transform'
$hasConfig = $pluginContent -match 'config:'
Write-Test -Name "OpenCode plugin has exports" -Passed $hasExport
Write-Test -Name "OpenCode plugin has message transform hook" -Passed $hasHooks
Write-Test -Name "OpenCode plugin has config hook" -Passed $hasConfig

# Test 11: Package.json Validity
Write-Host "`n--- Package.json Validity ---" -ForegroundColor Yellow
if (Test-Path "package.json") {
    $pkg = Get-Content -Path "package.json" -Raw | ConvertFrom-Json
    Write-Test -Name "package.json has name" -Passed ($pkg.name -eq "topkit")
    Write-Test -Name "package.json has bin" -Passed ($null -ne $pkg.bin)
    Write-Test -Name "package.json has type module" -Passed ($pkg.type -eq "module")
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  Test Results" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Total:  $TestCount" -ForegroundColor White
Write-Host "Passed: $PassCount" -ForegroundColor Green
Write-Host "Failed: $FailCount" -ForegroundColor $(if ($FailCount -gt 0) { "Red" } else { "Green" })
Write-Host ""

if ($FailCount -eq 0) {
    Write-Host "All tests passed!" -ForegroundColor Green
    exit 0
} else {
    Write-Host "Some tests failed. Check output above." -ForegroundColor Red
    exit 1
}
