/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from 'test-utils';
import ErrorIndicator from './index';

const dummyProps = {
  retry: () => {},
};

const setup = (props = {}) => shallow(<ErrorIndicator {...props} />);

describe('ErrorIndicator', () => {
  test('renders without errors', () => {
    const wrapper = setup({ ...dummyProps });
    const component = wrapper.find('.error-indicator');
    expect(component.length).toBe(1);
  });
  test('renders button if retry prop is provided', () => {
    const wrapper = setup({ ...dummyProps });
    const component = wrapper.find('.error-indicator-button');
    expect(component.length).toBe(1);
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { ...dummyProps };
    const propsError = checkProps(ErrorIndicator, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
