import React from 'react';
import Typography from 'components/typography';
import heroImage from 'assets/images/hero-image.png';
import styles from './index.module.sass';

const Hero = () => (
  <div className={styles.hero}>
    <div className={styles['hero-content']}>
      <img src={heroImage} alt="hero" className={styles['hero-image']} />
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
