/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const setup = () => shallow(<App />);

test('App renders wothout error', () => {
  const wrapper = setup();
  const compoent = wrapper.find('.app');
  expect(compoent.length).toBe(1);
});
