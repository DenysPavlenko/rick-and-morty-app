/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestAtt } from 'test-utils';
import ErrorIndicator from './index';

const dummyProps = {
  retry: () => {},
  title: '',
  message: '',
  btnText: 'Retry',
};

const setup = (props = {}) => shallow(<ErrorIndicator {...props} />);

describe('ErrorIndicator', () => {
  test('renders without errors', () => {
    const wrapper = setup({ ...dummyProps });
    const component = findByTestAtt(wrapper, 'error-indicator');
    expect(component.length).toBe(1);
  });
  test('renders button if retry prop is provided', () => {
    const wrapper = setup({ ...dummyProps });
    const component = findByTestAtt(wrapper, 'error-indicator-button');
    // const component = wrapper.find('.error-indicator-button');
    expect(component.length).toBe(1);
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { ...dummyProps };
    const propsError = checkProps(ErrorIndicator, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
