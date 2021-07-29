/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import ProfilesPage from './index';

const setup = (props = {}) => shallow(<ProfilesPage {...props} />);

describe('ProfilesPage component', () => {
  test('renders without error', () => {
    const wrapper = setup({});
    const component = wrapper.find('.profiles-content');
    expect(component.length).toBe(1);
  });
});
