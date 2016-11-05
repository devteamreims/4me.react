import React, { Component } from 'react';

import Flexbox from 'flexbox-react';


// Helper components around flexbox-react
const Row = ({children, ...rest}) =>
  React.createElement(Flexbox, {...rest, flexDirection: 'row'}, children);

const Column = ({children, ...rest}) =>
  React.createElement(Flexbox, {...rest, flexDirection: 'column'}, children);


/**
 * This component controls the general layout of the control room
 * The idea is to allow callers to provide two sub components as props :
 * * A CwpButton, which will get a cwpId injected as prop
 * * An optional RoomStatus
 * The layout should be built using Flexbox
 * This allows the layout to be reused in different places where the container size changes
 * For instance, this layout could be used in a widget context or a modal context
 */
class ControlRoomLayout extends Component {
  static propTypes = {
    cwpButtonComponent: React.PropTypes.element.isRequired,
    roomStatusComponent: React.PropTypes.element,
  };

  static defaultProps = {
    roomStatusComponent: () => null,
  };

  render() {
    const {
      cwpButtonComponent,
      roomStatusComponent,
    } = this.props;


    // This will inject cwpId as a prop to supplied component
    const renderCwpButton = (cwpId) => React.cloneElement(cwpButtonComponent, {cwpId});


    return (
      <Column>
        <Row
          justifyContent="center"
        >
          <Column>
            {renderCwpButton(23)}
            {renderCwpButton(22)}
            {renderCwpButton(21)}
            {renderCwpButton(20)}
          </Column>
          <Column>
            {renderCwpButton(24)}
            {renderCwpButton(25)}
            {renderCwpButton(26)}
            {renderCwpButton(27)}
          </Column>
        </Row>
        <Row justifyContent="center">
          <Column
            flexBasis={0}
            flexGrow={1}
            alignItems="flex-end"
          >
            <Row>
              {renderCwpButton(14)}
              {renderCwpButton(15)}
              {renderCwpButton(16)}
            </Row>
            <Row>
              {renderCwpButton(13)}
              {renderCwpButton(12)}
              {renderCwpButton(11)}
            </Row>
          </Column>
          <Row
            justifyContent="center"
            alignItems="center"
          >
            {roomStatusComponent}
          </Row>
          <Column
            flexBasis={0}
            flexGrow={1}
          >
            <Row>
              {renderCwpButton(30)}
              {renderCwpButton(31)}
              {renderCwpButton(32)}
              {renderCwpButton(33)}
            </Row>
            <Row>
              {renderCwpButton(37)}
              {renderCwpButton(36)}
              {renderCwpButton(35)}
              {renderCwpButton(34)}
            </Row>
          </Column>
        </Row>
      </Column>
    );
  }
}

export default ControlRoomLayout;
