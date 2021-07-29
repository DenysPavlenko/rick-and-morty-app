import React from 'react';
import PropTypes from 'prop-types';
// Components
import Typography from 'components/typography';
import Button from 'components/button';
// Assets
import { ReactComponent as Warning } from 'assets/images/icons/warning.svg';
// Styles
import styles from './index.module.sass';

const ErrorIndicator = ({ title, message, btnText, retry }) => (
  <div className={styles['error-indicator']} data-test="error-indicator">
    <Warning className={styles['error-indicator-icon']} />
    <Typography component="h4" style={{ marginBottom: '10px' }}>
      {title}
    </Typography>
    <Typography component="p">{message}</Typography>
    {retry && (
      <Button
        type="button"
        variant="primary"
        onClick={retry}
        className={styles['error-indicator-button']}
        data-test="error-indicator-button"
      >
        {btnText}
      </Button>
    )}
  </div>
);

ErrorIndicator.defaultProps = {
  retry: null,
  title: '',
  message: '',
  btnText: 'Retry',
};

ErrorIndicator.propTypes = {
  retry: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  btnText: PropTypes.string,
};

export default ErrorIndicator;
