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
  constructor(props) {
    super(props);
    this._organs = {
      XmanModuleWidget: getWidgetComponent(XmanModule),
      ExampleModuleWidget: getWidgetComponent(ExampleModule),
      EtfmsProfileModuleWidget: getWidgetComponent(EtfmsProfileModule),
      MappingModuleWidget: getWidgetComponent(MappingModule),
    };
  }
  render() {
    const {
      XmanModuleWidget,
      ExampleModuleWidget,
      EtfmsProfileModuleWidget,
      MappingModuleWidget,
    } = this._organs;

    return (
      <GridList
        style={styles.gridList}
        cols={3}
        padding={10}
        cellHeight={300}
      >
        <XmanModuleWidget
          pathName={XmanModule.uri}
          cols={2}
        />
        <EtfmsProfileModuleWidget
          pathName={EtfmsProfileModule.uri}
          cols={1}
        />
        <MappingModuleWidget
          pathName={MappingModule.uri}
          cols={1}
        />
        <ExampleModuleWidget
          pathName={ExampleModule.uri}
          cols={1}
        />
      </GridList>
    );
  }
}

export default Dashboard;
