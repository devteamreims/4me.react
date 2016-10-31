import MenuButtonComponent from './components/MenuButton';
import MainComponent from './components/Main';
import StatusComponent from './components/Status';
import WidgetComponent from './components/Widget';

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
  WidgetComponent,
  getReducer,
  getStatus: getStatusString,
};
