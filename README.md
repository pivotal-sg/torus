# Usage

run `npm install`

run `gulp`

open [http://localhost:8080](http://localhost:8080) to see your game, code changes will cause the page to automatically reload

# Notes

edit [src/ts/app.ts](src/ts/app.ts) for the size, position, font of the game

# Deployment

You can deploy to github pages using the following command, which will push your dist folder onto the gh-pages branch of your repo.

`GIT_DEPLOY_DIR=dist GIT_DEPLOY_BRANCH=gh-pages ./deploy.sh`

After a few minutes your game will be playable at http://USERNAME.github.io/REPOSITORY

# Thanks

A lot of the code used in this project originated in the source files of this great template -

[https://github.com/kiswa/phaser-template-tsc](https://github.com/kiswa/phaser-template-tsc)

The deploy.sh file came from -

[https://github.com/X1011/git-directory-deploy/raw/master/deploy.sh](https://github.com/X1011/git-directory-deploy/raw/master/deploy.sh)
