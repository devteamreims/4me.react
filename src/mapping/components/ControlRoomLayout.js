import React, { Component } from 'react';

import Flexbox from 'flexbox-react';


// Helper components around flexbox-react
const Row = ({children, ...rest}) =>
  React.createElement(Flexbox, {...rest, flexDirection: 'row'}, children);

const Column = ({children, ...rest}) =>
  React.createElement(Flexbox, {...rest, flexDirection: 'column'}, children);

const RenderCwpButton = ({
  component: Component,
  cwpId,
  ...rest
}) => (
  <div style={{margin: 5}}>
    <Component cwpId={cwpId} {...rest} />
  </div>
);

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
      roomStatusComponent: RoomStatus,
    } = this.props;

    return (
      <Column>
        <Row
          justifyContent="center"
        >
          <Column>
            <RenderCwpButton component={cwpButtonComponent} cwpId={23} />
            <RenderCwpButton component={cwpButtonComponent} cwpId={22} />
            <RenderCwpButton component={cwpButtonComponent} cwpId={21} />
            <RenderCwpButton component={cwpButtonComponent} cwpId={20} />
          </Column>
          <Column>
            <RenderCwpButton component={cwpButtonComponent} cwpId={24} />
            <RenderCwpButton component={cwpButtonComponent} cwpId={25} />
            <RenderCwpButton component={cwpButtonComponent} cwpId={26} />
            <RenderCwpButton component={cwpButtonComponent} cwpId={27} />
          </Column>
        </Row>
        <Row justifyContent="center">
          <Column
            flexBasis={0}
            flexGrow={1}
            alignItems="flex-end"
          >
            <Row>
              <RenderCwpButton component={cwpButtonComponent} cwpId={14} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={15} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={16} />
            </Row>
            <Row>
              <RenderCwpButton component={cwpButtonComponent} cwpId={13} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={12} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={11} />
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
              <RenderCwpButton component={cwpButtonComponent} cwpId={30} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={31} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={32} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={33} />
            </Row>
            <Row>
              <RenderCwpButton component={cwpButtonComponent} cwpId={37} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={36} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={35} />
              <RenderCwpButton component={cwpButtonComponent} cwpId={34} />
            </Row>
          </Column>
        </Row>
      </Column>
    );
  }
}

export default ControlRoomLayout;
