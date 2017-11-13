# KeyFob Provisioning

This is a React app which will help a developer to provision their applications into Keycloak for AuthN/AuthZ.
You will require to install Keycloak before you can run this application.

## Steps

### Installation
* Install the [JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
* Set the JAVA_HOME environment variable to the installed jdk
* Add %JAVA_HOME%/bin to the PATH
* Install [Keycloak](http://www.keycloak.org/downloads.html)
* Set the KEYCLOAK_HOME to the directory of your local keycloak installation.
* Add %KEYCLOAK_HOME%/bin to the PATH
* Default port for `KEYCLOAK` is 8080.

### Adding users for Keyfob

* Add a admin user for keyfob using : `add-user-keycloak -r master -u admin -p password` (Choose any name for -u and -p option but remember them)
* Now start to create non-admin users for keyfob using the keyfob.bat script. Eg: `team-03-developer`, `team-03-john`
* Clone this repository
* Default port for `KEYFOB` is 3000. 
* If you are planning to `KEYFOB` is different port, please set the KEYFOB_PORT in the environment variables.
* Run the keyfob.bat and follow the instructions in the script.
* Edit the .env.development if necessary
* `npm install`
* `npm start`
* KeyFob is now up and running.
* Log in with the user that was created for your team (not the `admin` user)
* Start to add your application domain, clients and user for your application
* Your apps are now provisioned inside Keycloak for AuthN/Authz
* Based on the application client type, you may choose appropriate start kit to begin your application.
* For start kits, please refer here

# Redux

Project template for create-react-app which includes useful Redux patterns.

This project was bootstrapped from a template using a forked version of [Create React App](https://github.com/facebookincubator/create-react-app). For more information view the [template](https://github.com/reedsa/create-react-app-templates) or the [forked Create React App](https://github.com/reedsa/create-react-app).

You can find the most recent version of the Create React App guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Getting Started

* `yarn start` to run the application
* `yarn test` to run tests
* `yarn lint` to run additional linter rules

## Deployment

* **Heroku** - Use the create-react-app buildpack as described [here](https://blog.heroku.com/deploying-react-with-zero-configuration).

* **AWS (S3/CloudFront)** - Follow along with this [blog post](https://medium.com/@omgwtfmarc/deploying-create-react-app-to-s3-or-cloudfront-48dae4ce0af).

## Features

### React and Redux

* **create-react-app** - Facebook's [create-react-app](https://github.com/facebookincubator/create-react-app) is used to get a production-ready React application quickly off the ground. It configures things like Webpack and Babel, so you don't have to. In order to further customize this starter kit with some additional tools, like Sass, we leverage a fork of react-scripts, called [custom-react-scripts](https://github.com/kitze/custom-react-scripts).

* **Redux** - We use [Redux](https://github.com/reactjs/redux) to manage complex application state. In this app, you'll find an example for a user login flow, an example asynchronous request for a list, and how to maintain the value for a counter.

* **react-redux-modules** - [react-redux-modules](https://github.com/reedsa/react-redux-modules) are prebuilt React component modules that easily integrate with your Redux store.

### Testing

* **Jest** - Facebook's [Jest](https://github.com/facebook/jest/) is configured out of the box with create-react-app. This comprehensive testing tool is built on top of Jasmine and will satisfy most of your unit testing needs.

* **Enzyme** - [Enzyme](https://github.com/airbnb/enzyme) is pulled in to facilitate easier component testing.

### Routing

* **React Router** - The latest overhaul from [React Router](https://reacttraining.com/react-router/web). Please note that this library diverges significantly from previous versions.

* **react-router-redux** - [react-router-redux](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux) also underwent an overhaul to keep up with React Router, and has been merged into the React Router codebase.

### Styling

* **Sass** - [Sass](http://sass-lang.com/) is used as the CSS Preprocessor within the unejected create-react-app. The recommended package is [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar)

* **react-md** - A material design (md) component library for React. View the docs [here](https://react-md.mlaursen.com/).

* **material-design-icons** - Icons that can be used within react-md components. Available icons and docs are listed [here](https://material.io/icons/).

### Tooling

* **Prettier** - [Prettier](https://github.com/prettier/prettier) is wonderful magic that formats your JavaScript code for you. It is configured (using [Husky](https://github.com/typicode/husky)) to format JavaScript code in a precommit hook. You may also choose to configure Prettier with your editor of choice.

* **Hot Module Replacement (HMR)** -
[Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement) updates the application on code change, without refreshing. Redux state is maintained.

* **Redux DevTools - Chrome extension** - The app is configured to allow this [Chrome extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) to display dispatched actions and state diffs.
