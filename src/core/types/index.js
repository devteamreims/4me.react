// @flow

export type Sector = string;

export type Sectors = Array<string>;

export type ClientId = number;
export type ClientType = string;

// Workaround described here : https://github.com/facebook/flow/issues/2405#issuecomment-253153366
type Client_ = {
  id: ClientId,
  name: string,
  disabled: boolean,
  type: ClientType,
};

export type Client = Client_ & $Shape<Client_>;
