import React from 'react';
import { Switch, Route } from 'react-router-dom';
// Pages
import ProfilesPage from 'pages/profiles-page';
import PageNotFound from 'pages/page-not-found';
// Context
import { ThemeProvider } from 'context/theme-context';

const App = () => (
  <div className="app">
    <ThemeProvider>
      <Switch>
        <Route exact strict path={['/', '/:id(\\d+)']}>
          <ProfilesPage />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </ThemeProvider>
  </div>
);

export default App;
