import React, {Component} from 'react';

import { GridList } from 'material-ui/GridList';
import { injectOrganProps } from '../../wrappers/injectOrganProps';

const styles = {
  gridList: {
    margin: 0,
    alignContent: 'flex-start',
  },
};

import * as MappingModule from '../../../mapping';
import * as ExampleModule from '../../../example-module';
import * as XmanModule from '../../../xman';
import * as EtfmsProfileModule from '../../../arcid';

import { isModuleDisabled } from '../../../fmeModules';

const getWidgetComponent = ({Widget, name}) => {
  if(!Widget || isModuleDisabled(name)) {
    return () => null;
  }
  return injectOrganProps(Widget);
};


class Dashboard extends Component {
  render() {
    const EtfmsProfileWidget = getWidgetComponent(EtfmsProfileModule);
    // const MappingModuleWidget = getWidgetComponent(MappingModule);
    const XmanModuleWidget = getWidgetComponent(XmanModule);

    return (
      <GridList
        style={styles.gridList}
        cols={3}
        padding={10}
        cellHeight={300}
      >
        <EtfmsProfileWidget cols={1} />
        <XmanModuleWidget cols={2} />
      </GridList>
    );
  }
}

export default Dashboard;
