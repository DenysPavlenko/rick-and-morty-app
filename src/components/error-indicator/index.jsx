import React from 'react';
import PropTypes from 'prop-types';
// Components
import Typography from 'components/typography';
import Button from 'components/button';
// Assets
import { ReactComponent as Warning } from 'assets/images/icons/warning.svg';
// Styles
import styles from './index.module.sass';

const ErrorIndicator = ({ retry }) => (
  <div className={styles['error-indicator']} data-test="error-indicator">
    <Warning className={styles['error-indicator-icon']} />
    <Typography component="h4">BOOM!</Typography>
    <Typography component="p">Something has gone terribly wrong</Typography>
    {retry && (
      <Button
        type="button"
        variant="primary"
        onClick={retry}
        className={styles['error-indicator-button']}
        data-test="error-indicator-button"
      >
        Retry
      </Button>
    )}
  </div>
);

ErrorIndicator.defaultProps = {
  retry: null,
};

ErrorIndicator.propTypes = {
  retry: PropTypes.func,
};

export default ErrorIndicator;
