import React from 'react';
import cn from 'classnames';
import styles from './index.module.sass';

// eslint-disable-next-line arrow-body-style
const ToggleTheme = () => {
  return (
    <div className={styles['theme-switch']}>
      <label htmlFor="theme-btn">
        <input
          type="checkbox"
          id="theme-btn"
          className={styles['theme-switch-input']}
        />
        <div className={styles['theme-switch-slider']}>
          <span className={styles['theme-switch-btn']} />
          <div>
            <span
              className={cn(styles['theme-switch-star'], styles['star-1'])}
            />
            <span
              className={cn(styles['theme-switch-star'], styles['star-2'])}
            />
            <span
              className={cn(styles['theme-switch-star'], styles['star-3'])}
            />
            <span
              className={cn(styles['theme-switch-star'], styles['star-4'])}
            />
            <span
              className={cn(styles['theme-switch-star'], styles['star-5'])}
            />
            <span
              className={cn(styles['theme-switch-star'], styles['star-6'])}
            />
          </div>
        </div>
      </label>
    </div>
  );
};

export default ToggleTheme;
