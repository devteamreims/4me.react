import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

import App from './core/components/App';
import NotFoundView from './core/views/NotFoundView';

const Dashboard = () => (
  <div>
    Test !
  </div>
);

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Dashboard} />
    <Route path="404" component={NotFoundView} />
    <Redirect from="*" to="404" />
  </Route>
);
