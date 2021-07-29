import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Button from 'components/button';
import Typography from 'components/typography';
import styles from './index.module.sass';

export const PageNotFound = ({ history }) => (
  <div className={styles.wrapper} data-test="page-not-found">
    <div className={styles.container}>
      <span className={styles.title}>404</span>
      <Typography component="p" className={styles.text}>
        The Page you are looking for could not be found.
      </Typography>
      <Button
        onClick={() => history.push('/')}
        variant="primary-fixed"
        className={styles.button}
        data-test="page-not-found-button"
      >
        Go home
      </Button>
    </div>
  </div>
);

PageNotFound.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(PageNotFound);
