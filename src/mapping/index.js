import MenuButtonComponent from './components/MenuButton';
import MainComponent from './components/Main';
import StatusComponent from './components/Status';

import rootReducer from './reducers';

export const name = 'mapping';
export const uri = '/mapping';

export const MenuButton = MenuButtonComponent;
export const Main = MainComponent;
export const Status = StatusComponent;

export const getReducer = () => {
  return rootReducer;
};

export { getStatusString } from './selectors/status';

export default {
  MenuButtonComponent,
  MainComponent,
  StatusComponent,
  getReducer,
};
