import React from 'react';

import Widget from '../../core/components/Dashboard/Widget';

const WidgetComponent = ({cols}) => {
  return (
    <Widget
      cols={cols}
      title="Example module"
    >
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map(() => (
          <h1>Title</h1>
        ))}
      </div>
    </Widget>
  );
};

export default WidgetComponent;
