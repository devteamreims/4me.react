import React, {Component} from 'react';

import { GridList } from 'material-ui/GridList';
import { injectOrganProps } from '../../wrappers/injectOrganProps';

const styles = {
  gridList: {
    margin: 0,
    alignContent: 'flex-start',
  },
};

// import * as MappingModule from '../../../mapping';
import * as ExampleModule from '../../../example-module';
import * as XmanModule from '../../../xman';
// import * as EtfmsProfileModule from '../../../arcid';

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
      Xman: getWidgetComponent(XmanModule),
      ExampleModule: getWidgetComponent(ExampleModule),
    };
  }
  render() {
    const {
      Xman,
      ExampleModule,
    } = this._organs;

    return (
      <GridList
        style={styles.gridList}
        cols={3}
        padding={10}
        cellHeight={300}
      >
        <Xman cols={2} />
        <ExampleModule cols={1} />
      </GridList>
    );
  }
}

export default Dashboard;
