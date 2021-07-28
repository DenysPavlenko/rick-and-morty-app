/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
// Styles
import styles from './index.module.sass';

const Button = ({
  children,
  type,
  href,
  disabled,
  variant,
  className,
  onClick,
}) => {
  const classes = cn(
    styles.button,
    disabled && styles['button-disabled'],
    styles[`button-${variant}`],
    className
  );
  const Tag = href ? 'a' : 'button';

  return (
    <Tag className={classes} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </Tag>
  );
};

Button.defaultProps = {
  type: 'button',
  href: '',
  className: '',
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
