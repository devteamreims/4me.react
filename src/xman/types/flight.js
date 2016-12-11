// @flow

export type IfplId = string;

export type Flight = {
  ifplId: IfplId,
  arcid: string,
  cop: string,
  delay: number,
  destination: string,
};

export type RichFlight = Flight & {
  isHighlighted: boolean,
  isTonedDown: boolean,
  isForcedOff: boolean,
  isForcedMcs: boolean,
};
