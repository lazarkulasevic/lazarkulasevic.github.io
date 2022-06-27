#!/usr/bin/env sh

set -e

rm -rf docs/.vitepress/dist

npm run build

cd docs/.vitepress/dist

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/lazarkulasevic/lazarkulasevic.github.io.git gh-pages

cd -
