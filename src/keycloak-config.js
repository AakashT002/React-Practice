import Keycloak from 'keycloak-js';

const keycloak = Keycloak({
  realm: process.env.REACT_APP_AUTH_REALM,
  url: process.env.REACT_APP_AUTH_URL,
  'ssl-required': 'external',
  clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  'public-client': true,
});

export default keycloak;