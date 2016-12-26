import _ from 'lodash';
import p from './prefix';


export const getRaw = (state) => _.get(p(state), 'resultTabs', {});

export const getVisibleTab = (state) => _.get(getRaw(state), 'visibleTab', 'history');
