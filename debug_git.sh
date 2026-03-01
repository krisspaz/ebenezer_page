#!/bin/bash
LOGfile="git_debug.log"
echo "Starting Git Debug..." > $LOGfile
pwd >> $LOGfile

echo "--- GIT STATUS ---" >> $LOGfile
git status >> $LOGfile 2>&1

echo "--- GIT ADD ---" >> $LOGfile
git add . >> $LOGfile 2>&1

echo "--- GIT COMMIT ---" >> $LOGfile
git commit -m "chore: sync all pending changes including assets and fixes" >> $LOGfile 2>&1

echo "--- GIT PULL REBASE ---" >> $LOGfile
git pull origin main --rebase >> $LOGfile 2>&1

echo "--- GIT PUSH ---" >> $LOGfile
git push origin main >> $LOGfile 2>&1

echo "Done." >> $LOGfile
