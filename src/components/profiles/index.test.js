/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtt } from 'test-utils';
import useHttp from 'hooks/use-http';
import { Profiles } from './index';

// Mock useHttp
jest.mock('hooks/use-http');

// Mock scrollTo
const mockScrollTo = jest.fn();
window.scrollTo = mockScrollTo;

// Mock react router methods
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useParams: () => ({
    id: null,
  }),
}));

const dummyData = {
  pages: 34,
  profiles: [
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
  ],
};

const setup = () => mount(<Profiles />);

describe('Profiles view', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Renders loading indicator', () => {
    useHttp.mockReturnValue({
      loading: true,
      fetchData: () => {},
    });
    const wrapper = setup();
    const components = wrapper.find('ProfilePlaceholder');
    expect(components.length).toBeGreaterThan(0);
  });
  test('Renders profiles and shows total pages number', () => {
    useHttp.mockReturnValue({
      data: dummyData,
      fetchData: () => {},
    });
    const wrapper = setup();
    const component = findByTestAtt(wrapper, 'profiles');
    expect(component.length).toBe(1);
    const paginationItems = findByTestAtt(wrapper, 'pagination-button');
    const paginationItem = paginationItems.at(paginationItems.length - 1);
    expect(paginationItem.text()).toBe('34');
  });
  test('Renders error indicator', () => {
    useHttp.mockReturnValue({
      error: 'errorMessage',
      fetchData: () => {},
    });
    const wrapper = setup();
    const component = wrapper.find('ErrorIndicator');
    expect(component.length).toBe(1);
  });
  test('Redirects to the first page on error indicator `Go Back` button click', () => {
    useHttp.mockReturnValue({
      error: 'errorMessage',
      fetchData: () => {},
    });
    const wrapper = setup();
    const button = findByTestAtt(wrapper, 'error-indicator-button');
    button.simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith('/1');
  });
});

describe('Profiles component routing', () => {
  beforeEach(() => {
    useHttp.mockReturnValue({
      data: dummyData,
      fetchData: () => {},
    });
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  test('Changes page on pagination click', () => {
    const wrapper = setup();
    const button = findByTestAtt(wrapper, 'pagination-chevron-right');
    button.simulate('click');
    expect(mockHistoryPush.mock.calls.length).toBe(1);
  });
  test('Scrolls to top on pagination click', () => {
    const mockProfilesRef = {
      current: {
        getBoundingClientRect: () => ({ top: 10 }),
      },
    };
    React.useRef = () => mockProfilesRef;
    const wrapper = setup();
    const button = findByTestAtt(wrapper, 'pagination-chevron-right');
    button.simulate('click');
    expect(mockScrollTo.mock.calls.length).toBe(1);
  });
});
