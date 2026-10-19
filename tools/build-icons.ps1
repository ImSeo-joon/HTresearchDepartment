Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
$brandDir = Join-Path $root "assets\img\brand"
$sourcePath = Join-Path $brandDir "app-icon-source.jpg"
$source = [System.Drawing.Image]::FromFile($sourcePath)

function New-SquirclePath {
  param(
    [float]$Width,
    [float]$Height,
    [float]$Exponent = 5.0,
    [int]$Segments = 240
  )

  $points = New-Object 'System.Drawing.PointF[]' $Segments
  $cx = $Width / 2.0
  $cy = $Height / 2.0
  $rx = $Width / 2.0
  $ry = $Height / 2.0
  $power = 2.0 / $Exponent

  for ($i = 0; $i -lt $Segments; $i++) {
    $t = (2.0 * [Math]::PI * $i) / $Segments
    $c = [Math]::Cos($t)
    $s = [Math]::Sin($t)
    $x = [Math]::Sign($c) * [Math]::Pow([Math]::Abs($c), $power)
    $y = [Math]::Sign($s) * [Math]::Pow([Math]::Abs($s), $power)
    $points[$i] = New-Object System.Drawing.PointF ([float]($cx + $x * $rx)), ([float]($cy + $y * $ry))
  }

  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddPolygon($points)
  return $path
}

function New-Icon {
  param(
    [System.Drawing.Rectangle]$Crop,
    [int]$Size,
    [string]$Output,
    [switch]$Transparent,
    [float]$FillScale = 1.0
  )

  $bitmap = New-Object System.Drawing.Bitmap $Size, $Size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $graphics.Clear([System.Drawing.Color]::Transparent)

  $path = New-SquirclePath -Width $Size -Height $Size
  $navy = [System.Drawing.Color]::FromArgb(255, 8, 18, 31)

  if ($Transparent) {
    $fillBrush = New-Object System.Drawing.SolidBrush $navy
    $graphics.FillPath($fillBrush, $path)
    $graphics.SetClip($path)
  } else {
    $graphics.Clear($navy)
  }

  $inset = [int](($Size * (1.0 - $FillScale)) / 2.0)
  $dest = New-Object System.Drawing.Rectangle $inset, $inset, ($Size - 2 * $inset), ($Size - 2 * $inset)
  $graphics.DrawImage($source, $dest, $Crop, [System.Drawing.GraphicsUnit]::Pixel)
  $graphics.ResetClip()

  $borderColor = [System.Drawing.Color]::FromArgb(190, 222, 187, 128)
  $borderWidth = [Math]::Max(1.0, $Size * 0.005)
  $borderPen = New-Object System.Drawing.Pen $borderColor, ([float]$borderWidth)
  $borderPen.Alignment = [System.Drawing.Drawing2D.PenAlignment]::Inset
  $graphics.DrawPath($borderPen, $path)

  $bitmap.Save($Output, [System.Drawing.Imaging.ImageFormat]::Png)

  $borderPen.Dispose()
  $path.Dispose()
  $graphics.Dispose()
  $bitmap.Dispose()
}

$panelCrop = New-Object System.Drawing.Rectangle 100, 80, 1054, 1094
$emblemCrop = New-Object System.Drawing.Rectangle 370, 130, 500, 500

foreach ($size in @(48, 72, 96, 128, 144, 192, 256, 384, 512)) {
  New-Icon -Crop $panelCrop -Size $size -Output (Join-Path $brandDir ("icon-{0}.png" -f $size)) -Transparent
}

New-Icon -Crop $panelCrop -Size 512 -Output (Join-Path $brandDir "icon-maskable-512.png") -FillScale 0.92
New-Icon -Crop $panelCrop -Size 180 -Output (Join-Path $brandDir "apple-touch-icon.png")
New-Icon -Crop $panelCrop -Size 152 -Output (Join-Path $brandDir "icon-152.png") -Transparent

foreach ($size in @(16, 32, 64)) {
  New-Icon -Crop $emblemCrop -Size $size -Output (Join-Path $brandDir ("favicon-{0}.png" -f $size)) -Transparent
}

$source.Dispose()
Write-Output "Icons rebuilt from app-icon-source.jpg"
