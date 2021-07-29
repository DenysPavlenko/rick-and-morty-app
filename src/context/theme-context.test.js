/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { ThemeProvider, useTheme } from './theme-context';

const FunctionalComponent = () => {
  const { dark, toggleTheme } = useTheme();
  return <div onClick={() => toggleTheme()}>{dark.toString()}</div>;
};

describe('ThemeProvider', () => {
  test('themeContext should apply default theme', () => {
    const wrapper = mount(
      <ThemeProvider>
        <FunctionalComponent />
      </ThemeProvider>
    );
    const component = wrapper.find(FunctionalComponent).find('div');
    component.simulate('click');
    expect(component.text()).toBe('true');
  });
  test('themeContext should apply dark theme', () => {
    const wrapper = mount(
      <ThemeProvider>
        <FunctionalComponent />
      </ThemeProvider>
    );
    const component = wrapper.find(FunctionalComponent).find('div');
    component.simulate('click');
    expect(component.text()).toBe('false');
  });
});

describe('ThemeProvider error handling', () => {
  test('themeContext throws error when not wrapped in ThemeProvider', () => {
    expect(() => {
      shallow(<FunctionalComponent />);
    }).toThrow('useTheme must be used within ThemeProvider');
  });
  test('themeContext does not throws error when not wrapped in GuessedWordsContext', () => {
    expect(() => {
      mount(
        <ThemeProvider>
          <FunctionalComponent />
        </ThemeProvider>
      );
    }).not.toThrow('useTheme must be used within ThemeProvider');
  });
});
