# Angular seed project

[ ![Codeship Status for ChartIQ/Charting-Library---Angular-Seed-Project](https://app.codeship.com/projects/0b85d6c0-4010-0135-fa79-62e905eb1dfe/status?branch=master)](https://app.codeship.com/projects/229967)
[![dependencies Status](https://david-dm.org/ChartIQ/Charting-Library---Angular-2.0-Seed-Project/status.svg)](https://david-dm.org/ChartIQ/Charting-Library---Angular-2.0-Seed-Project)

## Working with CryptoIQ Plugin

This branch shows how to load the [CryptoIQ plugin] (https://www.chartiq.com/html5-charting-library/html5-cryptocurrency-charts/) and run create a market depth chart in Angular. The CryptoIQ plugin is designed to work out of the box with W3C web components and will therefore not work correctly if you try to include it in your app. Instead, for market depth charts, include *just* `marketdepth.js`. If you wish to use the orderbook you will need to rework the web component into an Angular component (pull requests welcome).

**THE CRYPTOIQ PLUGIN IS NOT PROVIDED IN THE REPO AND MUST BE SUPPLIED FROM A VALID CHARTIQ LICENSE FILE.** 

When you check out this branch and run `npm start` it *WILL NOT* work until you perform the following:
 -  copy `./plugins/cryptoiq/marketdepth.js` from the license bundle to `./src/chartiq_library/js`. Otherwise, you will see an error in `chart.component.ts` when compiling, go to that file and move the marketDepth file to where the project expects it to be. Once you've included marketdepth and splines you should be able to see a market depth chart instead of the normal candle chart when you build the project. 
 - copy  `./plugins/cryptoiq/cryptoiq.css` from the license bundle to `./src/chartiq_library/css`.  Note that the CSS is included in `index.html`.
 
- [Questions and support](#questions-and-support)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Contributing to this project](#contributing-to-this-project)

A basic build of the ChartIQ library within the Angular 2.0 framework. This provides an example of how to implement the most common elements in the charting library. This is not a comprehensive example, more like a good starting point for an Angular developer.

## Questions and support

If you have questions or get stuck using this project or the ChartIQ library, the dev support team can be reached through [dev@chartiq.com](mailto:dev@chartiq.com).

## Requirements

- A copy of the ChartIQ library, version 3.0+ is required. To get your copy, visit https://www.chartiq.com/products/html5-charting-library/ to see a demo and get in touch with us.
- [node.js](https://nodejs.org/) installed version 5+
- NPM installed (version 3+) or [Yarn](https://yarnpkg.com/en/)


## Getting started

- Clone this repository.
- Extract the contents of your zipped copy of the ChartIQ library into `src/chartiq_library/`. You should now have the folders `src/chartiq_library/css` and `src/chartiq_library/js`. You may be prompted about overwriting the contents of `src/chartiq_librar/js`. These pre-existing files are just stub files and should be overwritten. If you have any questions about where these files should go, follow their expected path backwards from either the `chart.service.ts` or `chart.component.ts`.
- Run `npm install` to install dependencies. It is strongly recommended to not have any of the dependencies installed globally.
- Run `npm start` to start up the dev server.
- Open your browser to [`http://localhost:3000`](http://localhost:3000).
  - ***If you have not already replaced `chartiq.js` and `quoteFeedSimulator.js` with your copies from the library zip you will see errors in the console reminding you to do so.***
- If you want to use another port, open `package.json` file, then change the `server` script from `--port 3000` to the desired port number. A full list of webpack-dev-server command line options can be found [here](https://webpack.js.org/api/cli/#common-options).

## Contributing to this project

If you wish to contribute to this project, fork it and send us a pull request.
We'd love to see what it is you want to do with our charting tools!
