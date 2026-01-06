#!/bin/bash
echo "--- START GIT FIX ---" > git_log.txt
echo "Removing lock file if exists..." >> git_log.txt
rm -f .git/index.lock >> git_log.txt 2>&1

echo "Git Status:" >> git_log.txt
git status >> git_log.txt 2>&1

echo "Git Pulling:" >> git_log.txt
git pull origin main --rebase >> git_log.txt 2>&1

echo "Git Adding:" >> git_log.txt
git add . >> git_log.txt 2>&1

echo "Git Committing:" >> git_log.txt
git commit -m "fix(git): auto-resolve state and push" >> git_log.txt 2>&1

echo "Git Pushing:" >> git_log.txt
git push origin main >> git_log.txt 2>&1

echo "--- END GIT FIX ---" >> git_log.txt
