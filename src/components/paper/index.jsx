import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './index.module.sass';

const Paper = ({ children, className }) => {
  const classes = cn(styles.paper, className);
  return (
    <div className={classes} data-test="paper">
      {children}
    </div>
  );
};

Paper.defaultProps = {
  className: '',
};

Paper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Paper;
