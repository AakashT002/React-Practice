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
import { setUserName } from './store/user/action.js';

const history = createBrowserHistory();
const store = configureStore(history);
const keycloak = Keycloak({
  realm: process.env.REACT_APP_AUTH_REALM,
  url: process.env.REACT_APP_AUTH_URL,
  'ssl-required': 'external',
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  'public-client': true,
});

keycloak
  .init({ onLoad: 'check-sso', checkLoginIframe: false })
  .success(authenticated => {
    if (authenticated) {
      sessionStorage.setItem('kctoken', keycloak.token);
      sessionStorage.setItem(
        'username',
        keycloak.tokenParsed.preferred_username
      );
      store.dispatch(setUserName(keycloak.tokenParsed.preferred_username));
      setInterval(() => {
        keycloak.updateToken(10).error(() => keycloak.logout());
        sessionStorage.setItem('kctoken', keycloak.token);
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
