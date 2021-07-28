import React from 'react';
// Components
import Hero from 'components/hero';
import Profiles from 'components/profiles';
// Styles
import styles from './App.module.sass';

const App = () => (
  <div>
    <Hero />
    <div className={styles.content}>
      <Profiles />
    </div>
  </div>
);

export default App;
