// @flow
import React, {Component} from 'react';

import { GridList } from 'material-ui/GridList';
import { injectOrganProps } from '../../wrappers/injectOrganProps';

const styles = {
  gridList: {
    margin: 0,
    alignContent: 'flex-start',
  },
};

import * as MappingModule from '../../../modules/mapping';
import * as ExampleModule from '../../../modules/example-module';
import * as XmanModule from '../../../modules/xman';
import * as EtfmsProfileModule from '../../../modules/etfms-profile';

import { isModuleDisabled } from '../../../shared/utils/modules';

type GetWidgetComponent = ({Widget: *, name: string}) => *;

const getWidgetComponent: GetWidgetComponent = ({Widget, name}) => {
  if(!Widget || isModuleDisabled(name)) {
    return () => null;
  }

  return injectOrganProps(Widget);
};

type Props = {};

class Dashboard extends Component {
  constructor(props: Props) {
    super(props);
    this._organs = {
      XmanModuleWidget: getWidgetComponent(XmanModule),
      ExampleModuleWidget: getWidgetComponent(ExampleModule),
      EtfmsProfileModuleWidget: getWidgetComponent(EtfmsProfileModule),
      MappingModuleWidget: getWidgetComponent(MappingModule),
    };
  }

  _organs: {
    [name: string]: *,
  };

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
        <MappingModuleWidget
          key="mapping-widget"
          pathName={MappingModule.uri}
          cols={1}
        />
        <EtfmsProfileModuleWidget
          key="etfms-profile-widget"
          pathName={EtfmsProfileModule.uri}
          cols={1}
        />
        <ExampleModuleWidget
          key="example-widget"
          pathName={ExampleModule.uri}
          cols={1}
        />
        <XmanModuleWidget
          key="xman-widget"
          pathName={XmanModule.uri}
          cols={3}
        />
      </GridList>
    );
  }
}

export default Dashboard;
