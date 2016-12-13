// @flow

export type Sector = string;

export type Sectors = Array<string>;

export type ClientId = number;
export type ClientType = string;

import type { Exact } from '../../utils/types';
export type Client = Exact<{
  id: ClientId,
  name: string,
  disabled?: boolean,
  type: ClientType,
}>;


// Types related to status
export type StatusItem = Exact<{
  name: string,
  status: StatusLevel,
  description?: string,
  items?: Array<StatusItem>,
}>;

export type StatusLevel = 'normal' | 'error' | 'warning' | 'critical';
export type StatusDisplayLevel = 'dumb' | 'normal' | 'extended';
