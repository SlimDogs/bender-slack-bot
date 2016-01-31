@echo off

echo "Param 1: " %1
echo "Param 2: " %2

REM ------------------------------------------------------------------
REM SET BRANCH

REM set default branch
set branch=master

REM if there is a second parameter (branch), we set default branch to the new one (from 2nd parameter)
IF [%2]==[] (
echo "no branch given, will commit to default %branch%"
) ELSE (
echo "ok, setting branch to %2 ..."
set %branch%=%2
)

REM ------------------------------------------------------------------
REM set commit message

IF [%1]==[] (
REM if there is no message, exit
echo "there is no commit message! exit..."
Exit /b
) ELSE (
REM there is a message, lets do a commit
git add .
git commit -m %1
git push origin %branch%
)
