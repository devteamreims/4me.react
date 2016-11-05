import React, { Component } from 'react';

import CwpButton from './CwpButton';
import RoomStatus from './RoomStatus';


// We flexbox layout here
// The main idea is to use 'wrap' with maxHeight/maxWidth breakpoints to
// display multiple rows / columns
const styles = {
  outerDiv: {
    display: 'flex',
    flexGrow: '0',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignContent: 'flex-start',
    marginTop: '30px',
  },
  north: {
    container: {
      flexBasis: '100%',
      flexGrow: '1',
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignContent: 'center',
      maxHeight: '500px',
    },
    element: {
      flex: '1',
      flexBasis: '25%',
      flexGrow: '1',
      flexShrink: '0',
      textAlign: 'center',
      display: 'inline',
      padding: '5px',
    }
  },
  west: {
    container: {
      display: 'flex',
      flexGrow: '1',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      maxWidth: '500px',
      paddingLeft: '100px',
    },
    element: {
      display: 'inline',
      padding: '5px',
      margin: '0',
    },
  },
  east: {
    container: {
      display: 'flex',
      flexGrow: '1',
      flexDirection: 'row',
      flexWrap: 'wrap',
      maxWidth: '500px',
    },
    element: {
      display: 'inline',
      padding: '5px',
    },
  },
  roomStatus: {
    container: {
      display: 'flex',
      flexGrow: '0',
      flexDirection: 'row',
      flexWrap: 'wrap',
      // maxWidth: '100px',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};

// This is just a helper component which increases readability of <ControlRoom />
const StyledCwpButton = ({cwpId, style}) => (
  <div style={style}>
    <CwpButton cwpId={cwpId} />
  </div>
);

class ControlRoom extends Component {
  render() {
    return (
      <div style={styles.outerDiv}>
        <div key="north" style={styles.north.container}>
          <StyledCwpButton style={styles.north.element} cwpId={23} />
          <StyledCwpButton style={styles.north.element} cwpId={22} />
          <StyledCwpButton style={styles.north.element} cwpId={21} />
          <StyledCwpButton style={styles.north.element} cwpId={20} />
          <StyledCwpButton style={styles.north.element} cwpId={24} />
          <StyledCwpButton style={styles.north.element} cwpId={25} />
          <StyledCwpButton style={styles.north.element} cwpId={26} />
          <StyledCwpButton style={styles.north.element} cwpId={27} />
        </div>
        <div key="west" style={styles.west.container}>
          <StyledCwpButton style={styles.west.element} cwpId={14} />
          <StyledCwpButton style={styles.west.element} cwpId={15} />
          <StyledCwpButton style={styles.west.element} cwpId={16} />
          <StyledCwpButton style={styles.west.element} cwpId={13} />
          <StyledCwpButton style={styles.west.element} cwpId={12} />
          <StyledCwpButton style={styles.west.element} cwpId={11} />
        </div>
        <div style={styles.roomStatus.container}>
          <RoomStatus />
        </div>
        <div key="east" style={styles.east.container}>
          <StyledCwpButton style={styles.east.element} cwpId={30} />
          <StyledCwpButton style={styles.east.element} cwpId={31} />
          <StyledCwpButton style={styles.east.element} cwpId={32} />
          <StyledCwpButton style={styles.east.element} cwpId={33} />
          <StyledCwpButton style={styles.east.element} cwpId={37} />
          <StyledCwpButton style={styles.east.element} cwpId={36} />
          <StyledCwpButton style={styles.east.element} cwpId={35} />
          <StyledCwpButton style={styles.east.element} cwpId={34} />
        </div>
      </div>
    );
  }
}

export default ControlRoom;
