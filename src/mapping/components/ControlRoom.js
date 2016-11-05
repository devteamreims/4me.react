import React, { Component } from 'react';

import Flexbox from 'flexbox-react';

import CwpButton from './CwpButton';
import RoomStatus from './RoomStatus';

// This is just a helper component which adds margins around buttons
const StyledCwpButton = ({cwpId}) => (
  <div style={{margin: 5}}>
    <CwpButton cwpId={cwpId} />
  </div>
);

// Helper components around flexbox-react
const Row = ({children, ...rest}) =>
  React.createElement(Flexbox, {...rest, flexDirection: 'row'}, children);

const Column = ({children, ...rest}) =>
  React.createElement(Flexbox, {...rest, flexDirection: 'column'}, children);


class ControlRoom extends Component {
  render() {
    return (
      <Column>
        <Row
          justifyContent="center"
        >
          <Column>
            <StyledCwpButton cwpId={23} />
            <StyledCwpButton cwpId={22} />
            <StyledCwpButton cwpId={21} />
            <StyledCwpButton cwpId={20} />
          </Column>
          <Column>
            <StyledCwpButton cwpId={24} />
            <StyledCwpButton cwpId={25} />
            <StyledCwpButton cwpId={26} />
            <StyledCwpButton cwpId={27} />
          </Column>
        </Row>
        <Row justifyContent="center">
          <Column
            flexBasis={0}
            flexGrow={1}
            alignItems="flex-end"
          >
            <Row>
              <StyledCwpButton cwpId={14} />
              <StyledCwpButton cwpId={15} />
              <StyledCwpButton cwpId={16} />
            </Row>
            <Row>
              <StyledCwpButton cwpId={13} />
              <StyledCwpButton cwpId={12} />
              <StyledCwpButton cwpId={11} />
            </Row>
          </Column>
          <Row
            justifyContent="center"
            alignItems="center"
          >
            <RoomStatus style={{margin: '0 100px'}} />
          </Row>
          <Column
            flexBasis={0}
            flexGrow={1}
          >
            <Row>
              <StyledCwpButton cwpId={30} />
              <StyledCwpButton cwpId={31} />
              <StyledCwpButton cwpId={32} />
              <StyledCwpButton cwpId={33} />
            </Row>
            <Row>
              <StyledCwpButton cwpId={37} />
              <StyledCwpButton cwpId={36} />
              <StyledCwpButton cwpId={35} />
              <StyledCwpButton cwpId={34} />
            </Row>
          </Column>
        </Row>
      </Column>
    );
  }
}

export default ControlRoom;
