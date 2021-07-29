/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import ProfilePlaceholder from './placeholder';

const setup = (props = {}) => shallow(<ProfilePlaceholder {...props} />);

describe('ProfilePlaceholder component', () => {
  test('renders without error', () => {
    const wrapper = setup({});
    const component = wrapper.find('.profile');
    expect(component.length).toBe(1);
  });
});
