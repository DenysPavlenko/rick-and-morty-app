/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'context/theme-context';
import { findByTestAtt } from 'test-utils';
import ToggleTheme from './index';

const setup = ({ dark }) => {
  dark = dark || false;
  return mount(
    <ThemeProvider value={{ dark, toggleTheme: () => {} }}>
      <ToggleTheme />
    </ThemeProvider>
  );
};

describe('ToggleTheme component', () => {
  test('renders without error', () => {
    const wrapper = setup({});
    const component = findByTestAtt(wrapper, 'theme-switch');
    expect(component.length).toBe(1);
  });
  test('switches theme to dark', () => {
    const wrapper = setup({ dark: true });
    const component = findByTestAtt(wrapper, 'theme-switch-input');
    expect(component.props().checked).toBe(true);
  });
  test('switches theme to light', () => {
    const wrapper = setup({ dark: false });
    const component = findByTestAtt(wrapper, 'theme-switch-input');
    expect(component.props().checked).toBe(false);
  });
});
