#!/bin/bash
open -a Docker
docker ps -a 
docker start `docker ps -q -l`

osascript -e 'tell application "Terminal" to activate
tell application "System Events" to tell process "Terminal" to keystroke "t" using command down
tell application "Terminal"
    delay 0.25
    do script "cd factoryApiSolution/factoryApi && dotnet run" in front window
end tell'

osascript -e 'tell application "Terminal" to activate
tell application "System Events" to tell process "Terminal" to keystroke "t" using command down
tell application "Terminal"
    delay 0.25
    do script "cd productionApiSolution/productionApi && dotnet run" in front window
end tell'

osascript -e 'tell application "Terminal" to activate
tell application "System Events" to tell process "Terminal" to keystroke "t" using command down
tell application "Terminal"
    delay 0.25
    do script "cd myOwnCutleryWebApp && ng serve" in front window
end tell'