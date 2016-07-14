@echo off

echo Commit message: " %1

set defaultmessage="Minor fixes"

IF [%1]==[] (
echo "no commit message given, will use default one: %defaultmessage%"
) ELSE (
set %defaultmessage%=%1

git add .
git commit -am %defaultmessage%
git push heroku master
)
