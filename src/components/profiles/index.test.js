/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtt } from 'test-utils';
import { Profiles } from './index';

const dummyProfiles = [
  {
    id: '1',
    image: 'http://example.com',
    name: 'Rick',
    status: 'alive',
    species: 'human',
    gender: 'male',
    origin: { name: 'Earth' },
    location: { name: 'Earth' },
    episode: [1, 2, 3],
  },
];

const dummyProps = {
  fetchProfilesRequest: () => {},
  profiles: {
    data: {
      pages: 2,
      profiles: [],
    },
    loading: false,
    error: null,
  },
};

const setup = (props = {}) => mount(<Profiles {...props} />);

const mockScrollTo = jest.fn();
window.scrollTo = mockScrollTo;

const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
  useRouteMatch: () => ({
    params: { id: '1' },
  }),
}));

describe('Profiles component', () => {
  afterEach(() => {
    mockPush.mockClear();
    mockScrollTo.mockClear();
  });
  test('renders without error', () => {
    const wrapper = setup({ ...dummyProps });
    const component = findByTestAtt(wrapper, 'profiles');
    expect(component.length).toBe(1);
  });
  test('Renders error indicator on error', () => {
    const wrapper = setup({
      ...dummyProps,
      profiles: { ...dummyProps.profiles, error: 'error' },
    });
    const component = wrapper.find('ErrorIndicator');
    expect(component.length).toBe(1);
  });
  test('Redirects and fetches data on error indicator button click', () => {
    const mockFetchProfilesRequest = jest.fn();
    const wrapper = setup({
      ...dummyProps,
      fetchProfilesRequest: mockFetchProfilesRequest,
      profiles: { ...dummyProps.profiles, error: 'error' },
    });
    const button = wrapper.find('ErrorIndicator Button');
    button.simulate('click');
    expect(mockPush.mock.calls.length).toBe(1);
    expect(mockFetchProfilesRequest.mock.calls.length).toBe(2);
  });
  test('Renders profiles placeholders on loading', () => {
    const wrapper = setup({
      ...dummyProps,
      profiles: { ...dummyProps.profiles, loading: true },
    });
    const component = wrapper.find('ProfilePlaceholder');
    expect(component.length).toBeGreaterThan(0);
  });
  test('Renders profiles list', () => {
    const wrapper = setup({
      ...dummyProps,
      profiles: {
        ...dummyProps.profiles,
        data: {
          ...dummyProps.profiles.data,
          profiles: dummyProfiles,
        },
      },
    });
    const component = wrapper.find('Profile');
    expect(component.length).toBe(1);
  });
  test('Pushes page number to the history on page click', () => {
    const wrapper = setup({ ...dummyProps });
    const button = wrapper.find('Pagination .pagination-button').at(2);
    button.simulate('click');
    expect(mockPush.mock.calls.length).toBe(1);
  });
});
