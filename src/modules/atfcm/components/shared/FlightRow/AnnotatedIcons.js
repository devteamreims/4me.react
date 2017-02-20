/* @flow */
import React from 'react';

import ColorizedContent, { hashToColor } from '../../../../../shared/components/ColorizedContent';
import F from 'flexbox-react';

type HelperProps = {
  icon: ?React.Element<*>,
  style?: ?Object,
  colorIcon?: boolean,
  colorAnnotation?: boolean,
  annotation: string,
};

const AnnotatedIcon = (props: HelperProps) => {
  const {
    icon = null,
    style = {},
    colorIcon = false,
    colorAnnotation = true,
    annotation,
  } = props;

  const color = hashToColor(annotation, 'dark');

  const iconProps: Object = {
    style: {marginRight: 10},
  };

  if(colorIcon) {
    Object.assign(iconProps, {color});
  }

  const styledIcon = icon ?
    React.cloneElement(icon, iconProps) :
    null;

  return (
    <F
      flexDirection="row"
      alignItems="center"
      style={Object.assign({}, style)}
    >
      {styledIcon}
      {colorAnnotation ? (
        <ColorizedContent
          hash={annotation}
        >
          {annotation}
        </ColorizedContent>
      ) : (
        <span>{annotation}</span>
      )}
    </F>
  );
};

type SectorProps = {
  sector: string,
  style?: ?Object,
};

import Build from 'material-ui/svg-icons/action/build';
export const ImplementingSector = (props: SectorProps) => {
  const {
    sector,
    style,
  } = props;

  return (
    <AnnotatedIcon
      icon={<Build color="grey" />}
      style={style}
      annotation={sector}
      colorIcon={true}
    />
  );
};

import AddCircle from 'material-ui/svg-icons/content/add-circle';
export const OnloadSector = (props: SectorProps) => {
  const {
    sector,
    style,
  } = props;

  return (
    <AnnotatedIcon
      icon={<AddCircle color="grey" />}
      style={style}
      annotation={sector}
      colorIcon={true}
    />
  );
};

type FlightLevelProps = {
  flightLevel: number,
  style?: ?Object,
};

import FlightTakeoff from 'material-ui/svg-icons/action/flight-takeoff';
export const FlightLevel = (props: FlightLevelProps) => {
  const {
    flightLevel,
    style,
  } = props;

  const fl = String(flightLevel);

  return (
    <AnnotatedIcon
      icon={<FlightTakeoff color="grey" />}
      style={style}
      annotation={fl}
      colorIcon={false}
      colorAnnotation={false}
    />
  );
};

type BeaconProps = {
  beacon: string,
  style?: ?Object,
};

import Location from 'material-ui/svg-icons/maps/my-location';
export const Beacon = (props: BeaconProps) => {
  const {
    beacon,
    style,
  } = props;

  return (
    <AnnotatedIcon
      icon={<Location color="grey" />}
      style={style}
      annotation={beacon}
      colorIcon={false}
      colorAnnotation={false}
    />
  );
};
