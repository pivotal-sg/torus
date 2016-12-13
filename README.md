# TORUS

[![Build Status](https://travis-ci.org/pivotal-sg/torus.svg?branch=master)](https://travis-ci.org/pivotal-sg/torus)

# Usage

1. Run `npm install && gulp`

1. Open [http://localhost:8080](http://localhost:8080) to see your game, code changes will cause the page to automatically reload

# Deployment

You can deploy to Github pages using the following command, which will push your `dist` folder onto the gh-pages branch of your repo.

`./deploy.sh`

If you need to push a different folder of your project, you can use the `GIT_DEPLOY_DIR` env var.
<br>
If you need to push to a different branch, you can use the `GIT_DEPLOY_BRANCH` env var.

Example:

`GIT_DEPLOY_DIR=dist GIT_DEPLOY_BRANCH=gh-pages ./deploy.sh`

After a few minutes your game will be playable at http://pivotal-sg.github.io/codename

