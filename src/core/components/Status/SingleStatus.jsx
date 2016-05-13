import React, { Component } from 'react';

import _ from 'lodash';

import StatusIcon from './StatusIcon';

const style = {
  title: {},
  titleIcon: {
    marginRight: 10,
    lineHeight: '1em',
    width: '32px',
    height: '32px',
  },
  itemTitle: {display: 'inline'},
  itemIcon: {height: 20, width: 20, marginRight: 10},
  itemContainer: {marginLeft: 40, marginBottom: 20},
};

class SingleStatus extends Component {

  render() {
    const {
      title,
      items,
      level,
      displayLevel,
    } = this.props;

    return (
      <div>
        <h1>
          <StatusIcon
            level={level}
            colored={true}
            style={style.titleIcon}
          />
          {_.toUpper(title)}
        </h1>
        {displayLevel !== 'dumb' && _.map(items, (item, index) =>
          <div
            key={index}
            style={style.itemContainer}
          >
            <h3
              style={style.itemTitle}
            >
              <StatusIcon
                level={item.status}
                colored={true}
                style={style.itemIcon}
              />
              {item.name}
            </h3>
            <div>{item.description}</div>
          </div>
        )}
      </div>
    );
  }
}

SingleStatus.PropTypes = {
  title: React.PropTypes.string.isRequired,
  level: React.PropTypes.oneOf(['normal', 'warning', 'critical']).isRequired,
  items: React.PropTypes.array.isRequired,
  displayLevel: React.PropTypes.oneOf(['dumb', 'normal', 'extended']).isRequired,
};

export default SingleStatus;
