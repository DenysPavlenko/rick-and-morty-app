/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from 'test-utils';
import Button from './index';

const defaultProps = {
  children: 'Read more',
  variant: 'primary',
  disabled: false,
  type: 'button',
  className: '',
  href: '',
  onClick: () => {},
};

const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<Button {...setupProps} />);
};

describe('Button component', () => {
  test('renders without error', () => {
    const wrapper = setup();
    const component = wrapper.find('.button');
    expect(component.length).toBe(1);
  });
  test('should render <a></a> tag with href prop', () => {
    const wrapper = setup({ href: 'https://example.com' });
    const component = wrapper.find('.button');
    expect(component.first().type()).toEqual('a');
  });
  test('should add disabled class', () => {
    const wrapper = setup({ disabled: true });
    const component = wrapper.find('button.button-disabled');
    expect(component.length).toBe(1);
  });
  test('defaultProp onClick returns undefined on click', () => {
    const { onClick } = Button.defaultProps;
    expect(onClick()).toBeUndefined();
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { ...defaultProps };
    const propsError = checkProps(Button, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
