/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAtt } from 'test-utils';
import { PageNotFound } from './index';

const setup = (props = {}) => shallow(<PageNotFound {...props} />);

describe('PageNotFound component', () => {
  test('renders without error', () => {
    const wrapper = setup({ history: {} });
    const component = findByTestAtt(wrapper, 'page-not-found');
    expect(component.length).toBe(1);
  });
  test('redirects to the home page on button click', () => {
    const mockHistory = { push: jest.fn() };
    const wrapper = setup({ history: mockHistory });
    const component = findByTestAtt(wrapper, 'page-not-found-button');
    component.simulate('click');
    expect(mockHistory.push.mock.calls.length).toBe(1);
  });
});
