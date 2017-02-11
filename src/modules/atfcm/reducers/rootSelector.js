// @flow

import type { State } from './index';
import type { Selector } from '../../../store';

export const p: Selector<State> = state => state.atfcm;
export default p;
