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
