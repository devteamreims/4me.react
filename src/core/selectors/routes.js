// TODO: Unused file : delete
import {
  isSupervisor,
  isFmp,
  isTechSupervisor,
} from './cwp';

export const getIndexRoute = (state) => {
  if(isSupervisor(state)) {
    return '/mapping';
  }

  if(isFmp(state)) {
    return '/arcid';
  }

  if(isTechSupervisor(state)) {
    return '/status';
  }

  return '/xman';
};
