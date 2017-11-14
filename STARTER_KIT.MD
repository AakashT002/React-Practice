# Starter Kits

This document provides a list of available starter kits which have support for AuthN/Authz using Keycloak/KeyFob

Before we begin to create new repository, please refer to README for Keycloak and KeyFob installation and provisioning.

## Browser based application (Single Page Application)

### React/Redux
Repo : https://github.com/CognizantStudio/lp-auth-react-app


## Backend
### Only API
Repo : https://github.com/CognizantStudio/lp-auth-node-app-api

### With View
Repo : https://github.com/CognizantStudio/lp-auth-node-app-api (TODO)

# Steps to begin

* Create a new repository say `my-app`: `https://github.com/CognizantStudio/my-app`
* Clone the appropriate starter kit as per your application type

## For SPA
````
git clone --bare https://github.com/CognizantStudio/lp-auth-react-app.git
cd lp-auth-react-app.git
git push --mirror https://github.com/CognizantStudio/<<your-new-repo>>.git
cd ..
del lp-auth-react-app.git
git clone https://github.com/CognizantStudio/<<your-new-repo>>.git
````

## For Backend API
````
git clone --bare https://github.com/CognizantStudio/lp-auth-node-app-api.git
cd lp-auth-node-app-api.git
git push --mirror https://github.com/CognizantStudio/<<your-new-repo>>.git
cd ..
del lp-auth-node-app-api.git
git clone https://github.com/CognizantStudio/<<your-new-repo>>.git
````

