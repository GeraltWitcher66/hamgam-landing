# Builds public/og.png (1200x630) with System.Drawing so the card can use the
# self-hosted Vazirmatn font and never depend on a browser screenshot.
# Run: powershell -ExecutionPolicy Bypass -File scripts/og.ps1
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$fontDir = Join-Path $PSScriptRoot 'fonts'

# One collection per file: the same family name in one collection collapses
# to a single entry, so bold has to come from its own collection.
$regularFonts = New-Object System.Drawing.Text.PrivateFontCollection
$regularFonts.AddFontFile((Join-Path $fontDir 'Vazirmatn-Regular.ttf'))
$regular = $regularFonts.Families[0]

$boldFonts = New-Object System.Drawing.Text.PrivateFontCollection
$boldFonts.AddFontFile((Join-Path $fontDir 'Vazirmatn-Bold.ttf'))
$bold = $boldFonts.Families[0]

$width = 1200
$height = 630
$bmp = New-Object System.Drawing.Bitmap($width, $height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.Clear([System.Drawing.Color]::FromArgb(11, 9, 8))

# Two soft ember glows, the same palette as the landing page.
$glow1 = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow1.AddEllipse(-140, -300, 780, 780)
$brush1 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow1)
$brush1.CenterColor = [System.Drawing.Color]::FromArgb(95, 255, 122, 69)
$brush1.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 255, 122, 69))
$g.FillPath($brush1, $glow1)

$glow2 = New-Object System.Drawing.Drawing2D.GraphicsPath
$glow2.AddEllipse(760, 300, 640, 640)
$brush2 = New-Object System.Drawing.Drawing2D.PathGradientBrush($glow2)
$brush2.CenterColor = [System.Drawing.Color]::FromArgb(55, 255, 181, 71)
$brush2.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 255, 181, 71))
$g.FillPath($brush2, $glow2)

$rtl = New-Object System.Drawing.StringFormat
$rtl.FormatFlags = [System.Drawing.StringFormatFlags]::DirectionRightToLeft
$rtl.Alignment = [System.Drawing.StringAlignment]::Near
$rtl.LineAlignment = [System.Drawing.StringAlignment]::Near

$fg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(243, 237, 232))
$amber = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 181, 71))
$muted = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(168, 158, 151))
$faint = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(116, 106, 100))

$fontBrand = New-Object System.Drawing.Font($bold, 38, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fontTitle = New-Object System.Drawing.Font($bold, 62, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fontLead = New-Object System.Drawing.Font($regular, 25, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$fontFoot = New-Object System.Drawing.Font($regular, 21, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

# Logo tile, top-right.
$tile = New-Object System.Drawing.Drawing2D.GraphicsPath
$tile.AddArc(1048, 58, 26, 26, 180, 90)
$tile.AddArc(1048 + 72 - 26, 58, 26, 26, 270, 90)
$tile.AddArc(1048 + 72 - 26, 58 + 72 - 26, 26, 26, 0, 90)
$tile.AddArc(1048, 58 + 72 - 26, 26, 26, 90, 90)
$tile.CloseFigure()
$tileFill = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(25, 21, 20))
$g.FillPath($tileFill, $tile)
$tilePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(45, 255, 236, 224), 1.5)
$g.DrawPath($tilePen, $tile)

$chevron = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(255, 181, 71), 4.5)
$chevron.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
$chevron.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
$g.DrawLines($chevron, @(
  (New-Object System.Drawing.PointF(1070, 108)),
  (New-Object System.Drawing.PointF(1084, 84)),
  (New-Object System.Drawing.PointF(1098, 108))
))
$g.FillEllipse($amber, 1081, 112, 6, 6)

$g.DrawString('همگام', $fontBrand, $fg, (New-Object System.Drawing.RectangleF(600, 66, 432, 60)), $rtl)

$g.DrawString('جلسه کمتر، تحویل بیشتر', $fontTitle, $fg, (New-Object System.Drawing.RectangleF(80, 226, 1040, 90)), $rtl)
$g.DrawString('کار تیم را روان‌تر کنید', $fontTitle, $amber, (New-Object System.Drawing.RectangleF(80, 308, 1040, 90)), $rtl)
$g.DrawString('نقشه راه، وظایف و گفت‌وگوها در یک جای واحد؛ با میزبانی داده در ایران.', $fontLead, $muted, (New-Object System.Drawing.RectangleF(80, 414, 1040, 44)), $rtl)

$g.DrawString('برنامه‌ریزی  ·  تحویل  ·  گزارش', $fontFoot, $fg, (New-Object System.Drawing.RectangleF(80, 520, 1040, 34)), $rtl)

$ltr = New-Object System.Drawing.StringFormat
$ltr.Alignment = [System.Drawing.StringAlignment]::Near
$g.DrawString('hamgam.ir', $fontFoot, $faint, (New-Object System.Drawing.RectangleF(80, 562, 400, 34)), $ltr)

$out = Join-Path $root 'public\og.png'
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()
Write-Output "wrote $out"
