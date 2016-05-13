import {
  isNormalCwp,
  isSupervisor,
  isFmp,
} from './cwp';

export const getIndexRoute = (state) => {
  if(isSupervisor(state)) {
    return '/mapping';
  }

  if(isFmp(state)) {
    return '/arcid';
  }

  return '/xman';
};
