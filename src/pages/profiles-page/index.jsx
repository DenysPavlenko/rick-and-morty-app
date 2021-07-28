import React from 'react';
// Components
import Hero from 'components/hero';
import Profiles from 'components/profiles';
// Styles
import styles from './index.module.sass';

const ProfilesPage = () => (
  <div>
    <Hero />
    <div className={styles['profiles-content']}>
      <Profiles />
    </div>
  </div>
);

export default ProfilesPage;
