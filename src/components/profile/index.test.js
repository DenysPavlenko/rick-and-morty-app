/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { checkProps } from 'test-utils';
import Profile, { StatusIcon } from './index';

const dummyProps = {
  image: 'http://example.com',
  gender: 'male',
  status: 'alive',
  name: 'morty',
  species: 'human',
  location: {
    name: 'Earh',
  },
  origin: {
    name: 'Earth',
  },
  episodesNum: 1,
};

const setup = (props = {}) => shallow(<Profile {...props} />);
const statusIconSetup = (props = {}) => shallow(<StatusIcon {...props} />);

describe('Profile component', () => {
  test('renders without error', () => {
    const wrapper = setup({ ...dummyProps });
    const component = wrapper.find('.profile');
    expect(component.length).toBe(1);
  });
  test('adds "s" to the "episode" if there is more then 1 episode', () => {
    const wrapper = setup({ ...dummyProps, episodesNum: 41 });
    const component = wrapper.find('.profile-episode');
    expect(component.text()).toBe('Was seen in 41 episodes');
  });
  test('doesn"t add "s" to the "episode" if there is 1 episode', () => {
    const wrapper = setup({ ...dummyProps, episodesNum: 1 });
    const component = wrapper.find('.profile-episode');
    expect(component.text()).toBe('Was seen in 1 episode');
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { ...dummyProps };
    const propsError = checkProps(Profile, expectedProps);
    expect(propsError).toBeUndefined();
  });
});

describe('StatusIcon component', () => {
  test('returns HeartbeatIcon on "alive" status', () => {
    const wrapper = statusIconSetup({ status: 'alive' });
    expect(wrapper.dive().text()).toBe('heartbeat.svg');
  });
  test('returns DeadIcon on "dead" status', () => {
    const wrapper = statusIconSetup({ status: 'dead' });
    expect(wrapper.dive().text()).toBe('dead.svg');
  });
  test('returns DeadIcon on "unknown" status', () => {
    const wrapper = statusIconSetup({ status: 'unknown' });
    expect(wrapper.dive().text()).toBe('unknown.svg');
  });
  test('does not throw warning with expected props', () => {
    const expectedProps = { status: 'alive' };
    const propsError = checkProps(StatusIcon, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
