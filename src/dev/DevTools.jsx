import React from 'react';
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';

import {
  SET_FETCHER_SERVICES_STATUS,
  SET_POSITION_SERVICE_STATUS,
} from '../xman/actions/backend-status';

import {
  COMPLETE,
} from '../xman/actions/flight-list';

// createDevTools takes a monitor and produces a DevTools component
export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
  >
    <FilterMonitor
      blacklist={[
        SET_FETCHER_SERVICES_STATUS,
        SET_POSITION_SERVICE_STATUS,
        COMPLETE,
      ]}
    >
      <LogMonitor theme="nicinabox" />
    </FilterMonitor>
  </DockMonitor>
);
