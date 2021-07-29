/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestAtt } from 'test-utils';
import Button from './index';

const dummyProps = {
  children: 'Read more',
  variant: 'primary',
  disabled: false,
  type: 'button',
  className: '',
  href: '',
  onClick: () => {},
};

const setup = (props = {}) => shallow(<Button {...props} />);

describe('Button component', () => {
  test('renders without error', () => {
    const wrapper = setup({ ...dummyProps });
    const component = findByTestAtt(wrapper, 'button');
    expect(component.length).toBe(1);
  });
  test('should render <a></a> tag with href prop', () => {
    const wrapper = setup({ ...dummyProps, href: 'https://example.com' });
    const component = findByTestAtt(wrapper, 'button');
    expect(component.first().type()).toEqual('a');
  });
  test('should add disabled class', () => {
    const wrapper = setup({ ...dummyProps, disabled: true });
    const component = wrapper.find('button.button-disabled');
    expect(component.length).toBe(1);
  });
  test('defaultProp onClick returns undefined on click', () => {
    const { onClick } = Button.defaultProps;
    expect(onClick()).toBeUndefined();
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { ...dummyProps };
    const propsError = checkProps(Button, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
