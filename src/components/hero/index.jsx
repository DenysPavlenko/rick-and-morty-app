import React from 'react';
import Typography from 'components/typography';
import styles from './index.module.sass';

const Hero = () => {
  const contEl = React.useRef(null);
  const titleEl = React.useRef(null);

  React.useEffect(() => {
    const contentHeight = contEl.current.offsetHeight;

    const parallaxEffect = () => {
      const scrollTop = window.scrollY;
      if (contentHeight >= scrollTop) {
        contEl.current.style.transform = `translateY(-${scrollTop / 5}px)`;
        titleEl.current.style.transform = `translateY(-${scrollTop / 10}px)`;
      }
    };

    window.addEventListener('scroll', parallaxEffect);
    return () => window.removeEventListener('scroll', parallaxEffect);
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles['hero-content']} ref={contEl}>
        <div className={styles['hero-image']} />
        <Typography
          component="h1"
          align="center"
          className={styles['hero-title']}
          ref={titleEl}
        >
          The Rick and Morty App
        </Typography>
      </div>
    </div>
  );
};

export default Hero;
