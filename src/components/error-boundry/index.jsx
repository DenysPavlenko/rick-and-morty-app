import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Components
import ErrorIndicator from 'components/error-indicator';

class ErrorBoudry extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError)
      return (
        <ErrorIndicator
          title="Ooops..."
          message="Something has gone terribly wrong"
        />
      );

    return children;
  }
}

ErrorBoudry.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoudry;
