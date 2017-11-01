import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import Keycloak from 'keycloak-js';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';
import configureStore from './store/configureStore';

import './assets/stylesheets/index.css';

const history = createBrowserHistory();
const store = configureStore(history);
const keycloak = Keycloak('keycloak.json');

keycloak
  .init({ onLoad: 'check-sso', checkLoginIframeInterval: 1 })
  .success(authenticated => {
    if (keycloak.authenticated) {
      setInterval(() => {
        keycloak.updateToken(10).error(() => keycloak.logout());
        sessionStorage.setItem('kctoken', keycloak.token);
        sessionStorage.setItem(
          'username',
          keycloak.tokenParsed.preferred_username
        );
      }, 10000);
    } else {
      keycloak.login();
    }
  });

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

// In development, hot module replacement (HMR) updates the application
// when changes are made, without having to refresh.
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(NextApp);
  });
}

registerServiceWorker();
