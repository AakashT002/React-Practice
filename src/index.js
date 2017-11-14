import createBrowserHistory from 'history/createBrowserHistory';
import React from 'react';
import ReactDOM from 'react-dom';
import keycloak from './keycloak-config';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import registerServiceWorker from './registerServiceWorker';

import App from './containers/App';
import configureStore from './store/configureStore';

import './assets/stylesheets/index.css';
import { setUserName } from './store/user/action.js';

const history = createBrowserHistory();
const store = configureStore(history);
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

      render(App);
    } else {
      keycloak.login();
    }
  });
// In development, hot module replacement (HMR) updates the application
// when changes are made, without having to refresh.
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default;
    render(NextApp);
  });
}

registerServiceWorker();
