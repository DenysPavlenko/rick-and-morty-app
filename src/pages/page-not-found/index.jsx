import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'components/button';
import Typography from 'components/typography';
import styles from './index.module.sass';

const PageNotFound = () => {
  const history = useHistory();
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.title}>404</span>
        <Typography component="p" className={styles.text}>
          The Page you are looking for could not be found.
        </Typography>
        <Button onClick={() => history.push('/')} variant="primary-fixed">
          Go home
        </Button>
      </div>
    </div>
  );
};

export default PageNotFound;
