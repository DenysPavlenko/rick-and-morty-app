/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// Styles
import './index.sass';

const Typography = React.forwardRef(
  (
    { children, component, align, variant, className, altFont, ...otherProps },
    ref
  ) => {
    const classes = classNames({
      [variant]: variant,
      [`typography-${align}`]: align,
      'font-creepster': altFont,
      [className]: className,
    });

    const Tag = component;

    return (
      <Tag className={classes || null} {...otherProps} ref={ref}>
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
  altFont: false,
};

Typography.propTypes = {
  children: PropTypes.node.isRequired,
  component: PropTypes.string,
  align: PropTypes.string,
  variant: PropTypes.string,
  className: PropTypes.string,
  altFont: PropTypes.bool,
};

export default Typography;
