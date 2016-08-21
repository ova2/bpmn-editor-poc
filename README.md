### PoC for web based BPMN editor in two variants: SVG and Canvas.

## Install

The PoC is written in TypeScipt 2 and AngularJS 2. Clone the project from the GitHub repository and install it by typing

```sh
npm install
```

## Commands

After that you can build the project for development with

```sh
npm run build:dev
```

This command generates source maps for debugging purpose. Type the next command to run the Webpack development server.

```sh
npm run server:dev
```

Alternative, it is possible to build the project for development and starts the web application in just one command.

```sh
npm run build:serve
```

The application is available at [http://localhost:3000/](http://localhost:3000/). All files are watched continuously and the application gets updated in the browser when you make any changes.

The following command builds the project for production. The delivered project can be found below the `dist` folder.

```sh
npm run build:prod
```

All files for production are minimized. The linting of TypeScript files occurs during the build.
