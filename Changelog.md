# Master
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
