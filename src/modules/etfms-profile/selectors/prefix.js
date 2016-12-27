import { name } from '../index';

export const getPrefixed = state => state[name];
export const p = getPrefixed;
export default getPrefixed;
