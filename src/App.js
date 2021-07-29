import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
// Pages
import ProfilesPage from 'pages/profiles-page';
import PageNotFound from 'pages/page-not-found';
// Context
import { ThemeProvider } from 'context/theme-context';

const App = () => (
  <div className="app">
    <ThemeProvider>
      <Switch>
        <Route exact path="/profiles/:id">
          <ProfilesPage />
        </Route>
        <Route exact path="/404">
          <PageNotFound />
        </Route>
        <Redirect to="/profiles/1" />
      </Switch>
    </ThemeProvider>
  </div>
);

export default App;
