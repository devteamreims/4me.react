import MenuButtonComponent from './components/MenuButton';
import MainComponent from './components/Main';
import StatusComponent from './components/Status';

import rootReducer from './reducers';

import { setSlice } from './selectors/prefix';

const getReducer = slug => {
  setSlice(slug);
  return rootReducer;
};

import {
  getStatusString,
} from './selectors/status';

export default {
  MenuButtonComponent,
  MainComponent,
  StatusComponent,
  getReducer,
  getStatus: getStatusString,
};
