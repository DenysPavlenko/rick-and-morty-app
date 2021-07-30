/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtt } from 'test-utils';
import { ThemeProvider } from 'context/theme-context';
import Hero from './index';

const setup = (props = {}) =>
  mount(
    <ThemeProvider>
      <Hero {...props} />
    </ThemeProvider>
  );

describe('Hero component', () => {
  const events = {};
  beforeEach(() => {
    global.addEventListener = jest.fn((event, cb) => {
      events[event] = cb;
    });
  });
  test('renders without error', () => {
    const wrapper = setup({});
    const component = findByTestAtt(wrapper, 'hero');
    events.scroll();
    expect(component.length).toBe(1);
  });
  test('should call the addEventListener for the scroll event', () => {
    setup({});
    expect(global.addEventListener).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});
