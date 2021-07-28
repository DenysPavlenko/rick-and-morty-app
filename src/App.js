import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
// Components
import ProfilesPage from 'pages/profiles-page';
import PageNotFound from 'pages/404';

const App = () => (
  <div>
    <Switch>
      <Route exact path="/profiles/:id">
        <ProfilesPage />
      </Route>
      <Route exact path="/404">
        <PageNotFound />
      </Route>
      <Redirect to="/profiles/1" />
    </Switch>
  </div>
);

export default App;
