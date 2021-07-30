/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import { checkProps, findByTestAtt } from 'test-utils';
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

const setup = (props = {}) => shallow(<Profiles {...props} />);

const mockScrollTo = jest.fn();
window.scrollTo = mockScrollTo;

// Mock react router methods
const mockPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockPush,
  }),
  useRouteMatch: () => ({
    params: { id: '2' },
  }),
}));

describe('Profiles component render', () => {
  afterEach(() => {
    jest.resetAllMocks();
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
    const button = wrapper.find('ErrorIndicator').dive().find('Button');
    button.simulate('click');
    expect(mockPush.mock.calls.length).toBe(1);
    expect(mockFetchProfilesRequest.mock.calls.length).toBe(1);
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
  test('does not throw warning with expected props', () => {
    const expectedProps = { ...dummyProps };
    const propsError = checkProps(Profiles, expectedProps);
    expect(propsError).toBeUndefined();
  });
});

describe('Profiles component routing', () => {
  let useEffect;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce((f) => f());
  };
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Pushes page number to the history on page click', () => {
    const wrapper = setup({ ...dummyProps });
    const pagination = wrapper.find('Pagination').dive();
    const button = pagination.find('.pagination-button').at(1);
    button.simulate('click');
    expect(mockPush.mock.calls.length).toBe(1);
  });
  test('Changes page number which gets from the location match', () => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    const wrapper = setup({ ...dummyProps });
    const pagination = wrapper.find('Pagination');
    expect(pagination.props().page).toBe(2);
  });
  test('Fetches profiles data', () => {
    const mockFetchProfilesRequest = jest.fn();
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    mockUseEffect();
    setup({
      ...dummyProps,
      fetchProfilesRequest: mockFetchProfilesRequest,
    });
    expect(mockFetchProfilesRequest.mock.calls.length).toBe(1);
  });
  test('Scrolls to top on page change', () => {
    useEffect = jest.spyOn(React, 'useEffect');
    const mockProfilesRef = {
      current: {
        getBoundingClientRect: () => ({ top: 10 }),
      },
    };
    React.useRef = () => mockProfilesRef;
    mockUseEffect();
    mockUseEffect();
    setup({
      ...dummyProps,
      profiles: { ...dummyProps.profiles, loading: false },
    });
    expect(mockScrollTo.mock.calls.length).toBe(1);
  });
  test('Sets total number of pages', () => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    const wrapper = setup({ ...dummyProps });
    const pagination = wrapper.find('Pagination');
    expect(pagination.props().pages).toBe(2);
  });
});
