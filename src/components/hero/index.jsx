import React from 'react';
import Typography from 'components/typography';
import styles from './index.module.sass';

const Hero = () => (
  <div className={styles.hero}>
    <div className={styles['hero-content']}>
      <div className={styles['hero-image']} />
      <Typography
        component="h1"
        align="center"
        className={styles['hero-title']}
      >
        The Rick and Morty App
      </Typography>
    </div>
  </div>
);

export default Hero;
