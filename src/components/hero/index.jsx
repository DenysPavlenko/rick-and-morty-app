import React from 'react';
import Typography from 'components/typography';
import ToggleTheme from 'components/toggle-theme';
import styles from './index.module.sass';

const Hero = () => {
  const contEl = React.useRef(null);
  const infoEl = React.useRef(null);

  React.useEffect(() => {
    const parallaxEffect = () => {
      const scrollTop = window.scrollY;
      const contentHeight = contEl.current.offsetHeight;
      /* istanbul ignore else */
      if (contentHeight >= scrollTop) {
        contEl.current.style.transform = `translateY(-${scrollTop / 5}px)`;
        infoEl.current.style.transform = `translateY(-${scrollTop / 10}px)`;
      }
    };

    window.addEventListener('scroll', parallaxEffect);
    return () => window.removeEventListener('scroll', parallaxEffect);
  }, []);

  return (
    <div className={styles.hero} data-test="hero">
      <div className={styles['hero-content']} ref={contEl}>
        <div className={styles['hero-image']} />
        <div className={styles['hero-info']} ref={infoEl}>
          <Typography
            component="h1"
            align="center"
            className={styles['hero-info-title']}
          >
            The Rick and Morty App
          </Typography>
          <ToggleTheme />
        </div>
      </div>
    </div>
  );
};

export default Hero;
