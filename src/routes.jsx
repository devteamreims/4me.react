import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './core/components/App';
import NotFoundView from './core/views/NotFoundView';
import Status from './core/components/Status';

import _ from 'lodash';

import organs from './organs';

const organRoutes = _.map(organs, (organ) =>
  (
    organ.routes || <Route key={organ.name} path={organ.name} component={organ.rootComponent} />
  )
);

const Dashboard = () => (
  <div>
    Test !
  </div>
);

export default (
  <div>
    <Redirect from="/" to="/xman" />
    <Route path="/" component={App}>
      {/* <IndexRoute component={Dashboard} /> */}
      {organRoutes}
      <Route path="/status" component={Status} />
      <Route path="404" component={NotFoundView} />
      <Redirect from="*" to="404" />
    </Route>
  </div>
);
