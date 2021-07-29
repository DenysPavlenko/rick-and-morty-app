/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from 'test-utils';
import Typography from './index';

const dummyProps = {
  children: 'text',
  component: 'h1',
  align: 'center',
  variant: 'primary',
  className: 'test',
};

const setup = (props = {}) => shallow(<Typography {...props} />);

describe('Typography component', () => {
  test('renders without error', () => {
    const wrapper = setup({ ...dummyProps });
    const component = wrapper.find('h1');
    expect(component.length).toBe(1);
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { ...dummyProps };
    const propsError = checkProps(Typography, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
