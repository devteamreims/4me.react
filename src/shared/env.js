// @flow
import getEnv from '4me.env';
import { getKey } from './config';

const envId = getKey('FOURME_ENV');

const env = getEnv(envId);

export default env;

export const clients = env.clients;
export const sectors = env.sectors;
export const components = env.components;
