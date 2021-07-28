import React from 'react';
// Components
import Paper from 'components/paper';
// Styles
import styles from './placeholder.module.sass';

function ProfilePlaceholder() {
  return (
    <Paper className={styles.profile}>
      <div className={styles['profile-image']} />
      <div className={styles['profile-info']}>
        <div className={styles['profile-name']} />
        <div className={styles['profile-with-icon']} />
        <div className={styles['profile-center']}>
          <div className={styles['profile-with-icon']} />
          <div className={styles['profile-with-icon']} />
        </div>
        <div className={styles['profile-episode']} />
      </div>
    </Paper>
  );
}

export default ProfilePlaceholder;
