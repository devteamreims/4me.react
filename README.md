# 4ME UI

This is 4ME main client.


[![build status](https://gitlab.com/devteamreims/4me.frontend/badges/master/build.svg)](https://gitlab.com/devteamreims/4me.frontend/commits/master)


## Build (dev env)

Dependencies :
* NodeJS (tested with 7.2.0)
* yarn (`npm install --global yarn`)

```
# git clone
# yarn
# cp src/config.api.js.example src/config.api.js
```

Then edit `src/config.api.js` to setup a proper 4ME environment (data services + 4ME environment designator)

```
# npm start
```

## Build (prod)
```
# git clone
# yarn
# npm run build
```

Packaged app output is in `build/` folder


## Configuration
The main configuration entry point for this application is the `config.api.js` file. This file is loaded separately from the application bundle and attaches a Javascript Object containing configuration data to the `window` object.

This file is kept separate to the application bundle to allow building generic artefacts and overrriding configuration at runtime.

### config.api.js content
```Javascript
window.FOURME_CONFIG = {
// `4me.env` environment (see https://gitlab.com/devteamreims/4me.env)
  FOURME_ENV: 'LFEE',
  disabledModules: ['exampleModule'],
  core: {
    mappingUrl: 'http://mapping.4me',
    overrideClientId: 32,
  },
  mapping: {
    url: 'http://mapping.4me',
    disableEmergencyRadios: true,
  },
  xman: {
    url: 'http://xman.4me',
  },
  etfmsProfile: {
    url: 'http://etfms-profile.4me',
  }
};
```

The configuration object contains a set of global configuration keys and multiple subsets of per-module configuration.

* `FOURME_ENV` : defines the 4ME environment identifier, see [4me.env project][4me_env] for more information
* `disabledModules` : The 4me.frontend app bundles all submodules. All these submodules are activated by default. This parameter allows to disable specific 4ME submodules.
* `core`: 4ME core specific configuration
* `mapping`: 4ME Control Room submodule configuration
* `xman`: 4ME XMAN submodule configuration
* `etfmsProfile`: 4ME ETFMS PROFILE submodule configuration

#### `core`
* `mappingUrl`: root path to the mapping service
* `overrideClientId` (optional): allows to override the client identification process and force the 4ME client to configure itself based on the provided clientId

#### `mapping`
* `url`: root path to the mapping service
* `disabledEmergencyRadios` (optional, default to false): feature flag to explicitely disable emergency radio information

#### `xman`
* `url`: root path to the xman orchestrator service

#### `etfmsProfile`
* `url`: root path to the flightPlanFetcher service

[4me_env]: https://gitlab.com/devteamreims/4me.env
