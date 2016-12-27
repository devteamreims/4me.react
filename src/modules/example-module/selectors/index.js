// @flow
import { name } from '../index';

// This type is a helper for a selector function
import type { Selector } from '../../../store';
// This is our state slice
import type { State } from '../reducer';

// We define here a selector with this type signature :
// :: RootState => StateSlice
export const getPrefixed: Selector<State> = state => state[name];

/**
 * Flow type knows about our state shape
 * The following code will raise an error
 */
// const test: Selector<*> = state => state['non-existent-key'];

export const p = getPrefixed;
export default p;
