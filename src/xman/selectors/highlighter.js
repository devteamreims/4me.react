import _ from 'lodash';
import p from './prefix';

export const getRaw = (state) => _.get(p(state), 'highlighter', {});

export const isPendingActionFilterEnabled = (state) => !!_.get(getRaw(state), 'pendingAction');
export const getToneDownFilter = (state) => _.get(getRaw(state), 'toneDown');
