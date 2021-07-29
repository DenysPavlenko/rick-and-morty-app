/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from 'test-utils';
import Paper from './index';

const dummyProps = {
  children: <div />,
  className: '',
};

const setup = (props = {}) => shallow(<Paper {...props} />);

describe('Paper component', () => {
  test('renders without error', () => {
    const wrapper = setup({ ...dummyProps });
    const component = wrapper.find('.paper');
    expect(component.length).toBe(1);
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { ...dummyProps };
    const propsError = checkProps(Paper, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
