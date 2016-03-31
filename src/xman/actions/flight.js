import _ from 'lodash';

export const SET_MACH = 'xman/flight/SET_MACH';
export const SET_SPEED = 'xman/flight/SET_SPEED';
export const SET_MCS = 'xman/flight/SET_MCS';

export const CLEAR_ACTION = 'xman/flight/CLEAR_ACTION';

import {
  sendXmanAction
} from '../socket';


function setMachAction(ifplId, machReduction, who = {}) {
  return {
    type: SET_MACH,
    ifplId,
    machReduction,
    who,
  };
}

function setSpeedAction(ifplId, speed, who = {}) {
  return {
    type: SET_SPEED,
    ifplId,
    speed,
    who,
  };
}

function setMcsAction(ifplId, minimumCleanSpeed, who = {}) {
  return {
    type: SET_MCS,
    ifplId,
    minimumCleanSpeed,
    who,
  };
}

function clearActionAction(ifplId, who = {}) {
  return {
    type: CLEAR_ACTION,
    ifplId,
    who,
  };
}

import {
  getFlightByIfplId,
} from '../selectors/flight-list';

import {
  getActionAuthor,
} from '../selectors/flight';

export function setMach(ifplId, machReduction) {
  return (dispatch, getState) => {
    // Check if flight exists
    const flight = getFlightByIfplId(getState(), ifplId);

    if(_.isEmpty(flight)) {
      console.log(`XMAN Actions : setMach : unknown flight with id ${ifplId}`);
      return;
    }


    const who = getActionAuthor(getState());

    // Dispatch action
    dispatch(setMachAction(ifplId, machReduction, who));


    // Build 'status' object
    const status = {
      who,
      xmanAction: {
        machReduction,
      },
    };

    // Emit action via socket
    sendXmanAction(ifplId, status);
  }
}

export function setSpeed(ifplId, speed) {
  return (dispatch, getState) => {
    // Check if flight exists
    const flight = getFlightByIfplId(getState(), ifplId);

    if(_.isEmpty(flight)) {
      console.log(`XMAN Actions : setSpeed : unknown flight with id ${ifplId}`);
      return;
    }

    const who = getActionAuthor(getState());

    // Dispatch action
    dispatch(setSpeedAction(ifplId, speed, who));

    // Build 'status' object
    const status = {
      who,
      xmanAction: {
        speed,
      },
    };

    // Emit action via socket
    sendXmanAction(ifplId, status);
  }
}

export function setMcs(ifplId, mcs) {
  return (dispatch, getState) => {
    const flight = getFlightByIfplId(getState(), ifplId);

    if(_.isEmpty(flight)) {
      console.log(`XMAN Actions : setMcs : unknown flight with id ${ifplId}`);
      return;
    }

    const who = getActionAuthor(getState());

    // Dispatch action
    dispatch(setMcsAction(ifplId, mcs, who));

    // Build 'status' object
    const status = {
      who,
      xmanAction: {
        minimumCleanSpeed: mcs,
      },
    };

    // Emit action via socket
    sendXmanAction(ifplId, status);

  }
}

export function clearAction(ifplId) {
  return (dispatch, getState) => {
    // Check if flight exists
    const flight = getFlightByIfplId(getState(), ifplId);

    if(_.isEmpty(flight)) {
      console.log(`XMAN Actions : clearAction : unknown flight with id ${ifplId}`);
      return;
    }


    const who = getActionAuthor(getState());

    // Dispatch action
    dispatch(clearActionAction(ifplId, who));

    // Build 'status' object
    const status = {
      who,
      xmanAction: {
        machReduction: null,
        speed: null,
        minimumCleanSpeed: null,
      },
    };

    // Emit action via socket
    sendXmanAction(ifplId, status);
  }
}
