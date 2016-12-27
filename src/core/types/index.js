// @flow

export type Sector = string;

export type Sectors = Array<string>;

export type ClientId = number;
export type ClientType = string;

import type { Exact } from '../../shared/types';
export type Client = Exact<{
  id: ClientId,
  name: string,
  disabled?: boolean,
  type: ClientType,
}>;
