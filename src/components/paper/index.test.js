/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from 'test-utils';
import Paper from './index';

const defaultProps = {
  children: <div />,
  className: '',
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Paper {...setupProps} />);
};

describe('Paper component', () => {
  test('renders without error', () => {
    const wrapper = setup();
    const component = wrapper.find('.paper');
    expect(component.length).toBe(1);
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { ...defaultProps };
    const propsError = checkProps(Paper, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
