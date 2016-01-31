@echo off

echo Commit message: " %1

REM ------------------------------------------------------------------
REM set commit message

set defaultmessage="Minor fixes"

IF [%1]==[] (
REM if there is no message, exit
echo "no commit message given, will use default one: %defaultmessage%"
) ELSE (
REM there is a message, lets do a commit

set %defaultmessage%=%1

git add .
git commit -am %defaultmessage%
git push heroku master
)
