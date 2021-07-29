/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Styles
import './index.sass';

const Typography = React.forwardRef(
  ({ children, component, align, variant, className, ...otherProps }, ref) => {
    const classes = classNames(
      variant,
      align && [`typography-${align}`],
      className
    );

    const Tag = component;

    return (
      <Tag className={classes} {...otherProps} ref={ref} data-test="typography">
        {children}
      </Tag>
    );
  }
);

Typography.defaultProps = {
  component: 'p',
  variant: '',
  align: '',
  className: '',
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.string,
  align: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
};

export default Typography;
