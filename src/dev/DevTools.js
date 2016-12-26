import React from 'react';
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import FilterMonitor from 'redux-devtools-filter-actions';

// createDevTools takes a monitor and produces a DevTools component
export default createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
  >
    <FilterMonitor>
      <LogMonitor theme="nicinabox" />
    </FilterMonitor>
  </DockMonitor>
);
