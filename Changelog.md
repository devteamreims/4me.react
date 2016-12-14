# Master
  * <Widget> API is now slightly different and will render a title bar unless explicity told not to (devteamreims/4ME#165)
  * <Widget> will now accept a `linkTo` prop and render a icon allowing navigation to supplied uri (devteamreims/4ME#166)

# v1.0.1 (2016-12-14)
  * Build will fail if lint step fails
  * Refresh history in ETFMS PROFILE when backend connection is restored (devteamreims/4ME#139)
  * Update dependencies :
    * Material-UI@0.16.5
    * babel-*
    * webpack plugins
    * eslint-* + improve rules
    * lodash@4.17.2
    * flexbox-react@4.1.0
    * moment@2.17.1
    * redux-*
    * react-router@4.0.0-alpha.6
  * Move components to JSS (devteamreims/4ME#161)
  * Clean build process (remove unused stuff, move webpack config files in a more explicit folder)
  * Remove SASS dependency (devteamreims/4ME#161)
  * Remove core.mapping dependency for cwp list, use 4me.env instead (devteamreims/4ME#146)
  * Use `4me.env` <ControlRoomLayout /> (devteamreims/4ME#148)
  * Use `4me.env` suggestion engine (devteamreims/4ME#153)
  * Change orange to teal in CONTROL ROOM (devteamreims/4ME#157)
  * Implement flow in project (devteamreims/4ME#111)

# v1.0.0 (2016-12-06)
  * Move to React v15.4.1
  * Close CwpDialog when navigating out of CONTROL ROOM (devteamreims/4ME#144)

# v1.0.0-1 (2016-12-03)
  * Add delay column to XMAN Widget (devteamreims/4ME#147)
  * Use `4me.env` as our environment library (devteamreims/4ME#146)
    * Implement environment config via our dynamic config file
    * Use `4me.env` in all components instead of state selector
    * Remove `sectorTree` from state (selectors/reducers/actions)
  * CwpDialog won't discard checked elementary sectors after a while (devteamreims/4ME#145)
  * Move to yarn for package management (devteamreims/4ME#141)
  * Use controlled Docker image in CI pipeline (devteamreims/4ME#140)

# v1.0.0-0
  * Add consitency between cwp button colors in widget and full view (devteamreims/4ME#132)
  * Remove useless stuff to the TopBar to increase readability (devteamreims/4ME#133 / devteamreims/4ME#137)
  * Make the TopBar grey when no sectors are bound to a CWP client (devteamreims/4ME#108)
  * Eliminate CwpDialog repositioning issues (devteamreims/4ME#135)
  * Display sector alongside point in pointProfile (devteamreims/4ME#66)
  * Install timeouts to ETFMS PROFILE HTTP requests (devteamreims/4ME#124)
  * Do not disable XMAN buttons when advisedMach === 0 (devteamreims/4ME#123)
  * Extract Control Room layout in a separate reusable component (devteamreims/4ME#125)
  * Extract CwpDialog SectorPicker configuration in our window.FOURME_CONFIG object (devteamreims/4ME#125)
  * Fix status page icons and fix control room status component description
  * Only redirect from XMAN to Dashboard when no actions needed (devteamreims/4ME#130)
  * Fixes CWP disabled status reverting back to enabled (devteamreims/4ME#131)
  * Display material-ui <Badge /> in left menu instead of svg icons (devteamreims/#96)
  * Correct react-hot-loader behaviour
  * Implement an example module (see src/example-module) for future developpers
  * Implement a basic Dashboard
  * Refactor the whole 4ME module API (devteamreims/4ME#126)
  * Updated to react-router v4
  * Extract <InteractionCatcher /> component to handle our redirect logic
  * Refactor <Keyboard />
  * Updated to Material-UI 0.16.1
  * Correct ESLint setup, add a Gitlab-CI lint job
  * Allow cwpId to be overriden via external configuration file at loaded at runtime

# v0.2.5
  * Update dependencies, use Webpack2
  * Extract API endpoints configuration to a separate file, non bundled, and overridable at runtime [#119](devteamreims/4ME#119)/[#118](devteamreims/4ME#118)
  * Change topbar color when no sectors are bound [#108](devteamreims/4ME#108)

# v0.2.4
  * Correct returnToDashboard mechanism [#103](devteamreims/4ME#103)/[#104](devteamreims/4ME#104)
  * Setup ESLint for this project
  * Migrate to react 15 and material-ui 0.15 [#106](devteamreims/4ME#106)
  * Add npm-check script and integrates with gitlab-ci [#115](devteamreims/4ME#115)/[#45](devteamreims/4ME#45)

# 0.2.3
  * Properly update XMAN socket subscription

# 0.2.2
  * Add Changelog
  * Add a precommit linting rule
  * Add david-dm badge to README
  * Add version to status page [#91](devteamreims/4ME#91)
  * Prevent drag to select in prod env [#94](devteamreims/4ME#94)
  * Fix keyboard caret position handling [#93](devteamreims/4ME#93)
  * Add elastic return to homepage [#90](devteamreims/4ME#90)
  * Display control center in pointProfile [#66](devteamreims/4ME#66)

# 0.2.1
  * Initial version
