# Single-spa Demo - Root Config

## Overview

This is **polyglot** single-spa root cinfig app.
This repo is used in conjunction with eleven other repos listed below. Together they make up an application composed of microfrontends. Each app can be updated and deployed independently from the others.

- [**Root Config** (This Repo)](https://github.com/actionanand/single-spa-demo-root-config)
- [**Angular App**](https://github.com/actionanand/single-spa-angular)
- [**React App**](https://github.com/actionanand/single-spa-react)
- [**Vue App**](https://github.com/actionanand/single-spa-vue)
- [**Svelte App**](https://github.com/actionanand/single-spa-svelte)
- [**Nav Bar App**](https://github.com/actionanand/single-spa-nav)
- [**Footer App**](https://github.com/actionanand/single-spa-footer)
- [**404 App**](https://github.com/actionanand/single-spa-404)
- [**Vanilla JS App**](https://github.com/actionanand/single-spa-vanilla-js)
- [**Utility App**](https://github.com/actionanand/single-spa-utility)
- [**Angular Parcel App**](https://github.com/actionanand/angular-parcel-app)
- [**React Parcel App**](https://github.com/actionanand/react-parcel-app)

### Live site preview

1. https://ar-single-spa.surge.sh
2. https://ar-single-spa.onrender.com
3. https://actionanand.github.io/single-spa-angular-root-config

### How to deploy in surge

```sh
yarn run deploy:surge
```

## How to run this repo locally

```bash
yarn start:dev
```

## How to build for production

```bash
yarn build:webpack
```

## How to trigger express server

```bash
yarn start
```

## Creating surge token

1. install surge globally

```sh
npm install surge -g
```

2. Generating Surge token

```sh
surge token
```
For the first time, you installed surge, it takes your email and password to create/login account through terminal.

3. Save this token in a `SECRET` with name `SURGE_TOKEN`. For this goto Repo Settings > Secrets > New_secret. Enter Token Name `SURGE_TOKEN` and paste the token generated in it.

## How to create single-spa frontend app

```bash
npx create-single-spa
```

## How to serve raw github content as CDN

```
https://cdn.jsdelivr.net/gh/<github-username>/<github-repo-name@branch-name>/<filename>
```

## How to build prod build for heroku

```bash
$ npx heroku login -i
$ npx heroku create ar-single-spa-demo
$ git push heroku main
```

- `heroku login -i ` is to login with password.
- After creating heroku repo, you can use `git push heroku main` to push the new changes to heroku.

## How It Works

This project uses [single-spa](https://single-spa.js.org/) to architect an app composed of `micro-frontends`. In the root config, the eight other microfrontend apps (such as angular, react, vue, and svelte) are registered with singe-spa. The main `index.ejs` file contains an import map, which references where to find the compiled JavaScript bundle for each microfrontend. [SystemJS](https://github.com/systemjs/systemjs) is the module loader which then loads the bundles when needed. Utility app serves shared data between other apps.

### NB

Each repo can be set up with [Travis CI](https://travis-ci.org/) for running jobs as part of a continuous integration pipeline. When new code is pushed to the master branch for any of the repos, the new code is compiled and then uploaded to AWS S3, which serves as a CDN. The CI job also updates the import map file to reference the new bundle for the updated project.

### Sources

- [Single-spa Examples - config App](https://single-spa.js.org/docs/examples/#community-examples)
- [Should I have a parent/root config app and children apps? - Root Config from a single framework](https://single-spa.js.org/docs/faq/#should-i-have-a-parentroot-app-and-children-apps)
- [How to Develop and Deploy Micro-Frontends with Single-SPA](https://www.freecodecamp.org/news/developing-and-deploying-micro-frontends-with-single-spa/)
- [Fun with Micro-frontend in a single-spa way](https://dev.to/nitinreddy3/fun-with-micro-frontend-in-a-single-spa-way-1iok)
- [Connect Micro frontends with the Single-Spa framework. Step by step guide.](https://obaranovskyi.medium.com/connecting-micro-frontends-with-the-single-spa-framework-step-by-step-guide-e7fa87306bc7)
- [RawGit](https://rawgit.com/)
- [Raw Github js file not loading (direct link) like CDN - stackoverflow](https://stackoverflow.com/questions/62901066/raw-github-js-file-not-loading-direct-link-like-cdn/)
- [How to deploy a React, Angular and Vue project to Github pages](https://deepinder.me/how-to-deploy-a-react-angular-vue-project-to-github-pages)
- [Micro frontends: Cross-application communication with Single-Spa and RxJS.](https://obaranovskyi.medium.com/micro-frontends-cross-application-communication-with-single-spa-and-rxjs-aa55084bf344)
- [Implementing Micro Frontends Using Single SPA](https://betterprogramming.pub/implementing-micro-frontends-using-single-spa-1ac2a3f704a2)
- [Micro-Frontends Using Single-SPA Framework](kushki.com/en/blog/micro-frontends-utilizando-single-spa-framework)
