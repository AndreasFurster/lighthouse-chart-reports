@echo off

if not exist "result\" mkdir result
cd result

for /f "delims=" %%a in (../urls.txt) DO (
    ECHO Line is: %%a
    lighthouse --output csv html json --chrome-flags="--headless" %%a
)