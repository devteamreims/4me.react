export const name = 'etfmsProfile';
export const uri = '/etfms-profile';

import rootReducer from './reducers';
export const getReducer = () => rootReducer;

import MenuButtonComponent from './components/MenuButton';
import MainComponent from './components/Main';
import StatusComponent from './components/Status';
import WidgetComponent from './components/Widget';

export const Main = MainComponent;
export const Status = StatusComponent;
export const MenuButton = MenuButtonComponent;
export const Widget = WidgetComponent;

export { getStatusString } from './selectors/status';
