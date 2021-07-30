/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { findByTestAtt } from 'test-utils';
import Pagination from './index';

const dummyProps = {
  className: '',
  pages: 34,
  page: 1,
  setPage: () => {},
};

const setup = (props = {}) => mount(<Pagination {...props} />);

describe('Pagination component', () => {
  test('renders without error', () => {
    const wrapper = setup({ ...dummyProps });
    const component = findByTestAtt(wrapper, 'pagination');
    expect(component.length).toBe(1);
  });
  test('Renders 6 buttons in a row if there are less then 7 pages', () => {
    const wrapper = setup({ ...dummyProps, pages: 6 });
    expect(global.toJson(wrapper)).toMatchSnapshot();
  });
  test('Renders 5 buttons and 2 dots if the active page is in the center', () => {
    const wrapper = setup({ ...dummyProps, page: 10 });
    expect(global.toJson(wrapper)).toMatchSnapshot();
  });
  test('Renders 5 buttons, dots and 1 button if there more then 6 pages', () => {
    const wrapper = setup({ ...dummyProps, pages: 7 });
    expect(global.toJson(wrapper)).toMatchSnapshot();
  });
  test('Renders first page, dots and 5 buttons if the active page is in the end', () => {
    const wrapper = setup({ ...dummyProps, page: 33 });
    expect(global.toJson(wrapper)).toMatchSnapshot();
  });

  test('Changes page to previous on left arrow click', () => {
    const mockSetPage = jest.fn();
    const wrapper = setup({ ...dummyProps, page: 2, setPage: mockSetPage });
    const component = findByTestAtt(wrapper, 'pagination-chevron-left');
    component.simulate('click');
    expect(mockSetPage.mock.calls.length).toBe(1);
  });
  test('Doesn"t change page on left arrow click if the page number equals to 1', () => {
    const mockSetPage = jest.fn();
    const wrapper = setup({ ...dummyProps, page: 1, setPage: mockSetPage });
    const component = findByTestAtt(wrapper, 'pagination-chevron-left');
    component.props().onClick();
    expect(mockSetPage.mock.calls.length).toBe(0);
  });

  test('Changes page on button click', () => {
    const mockSetPage = jest.fn();
    const wrapper = setup({ ...dummyProps, page: 3, setPage: mockSetPage });
    const component = findByTestAtt(wrapper, 'pagination-button').at(1);
    component.simulate('click');
    expect(mockSetPage.mock.calls.length).toBe(1);
  });
  test('Doesn"t change page on button click if page equals to activePage', () => {
    const mockSetPage = jest.fn();
    const wrapper = setup({ ...dummyProps, page: 3, setPage: mockSetPage });
    const component = findByTestAtt(wrapper, 'pagination-button').at(2);
    component.props().onClick();
    expect(mockSetPage.mock.calls.length).toBe(0);
  });

  test('Changes page to next on right arrow click', () => {
    const mockSetPage = jest.fn();
    const wrapper = setup({ ...dummyProps, page: 1, setPage: mockSetPage });
    const component = findByTestAtt(wrapper, 'pagination-chevron-right');
    component.simulate('click');
    expect(mockSetPage.mock.calls.length).toBe(1);
  });
  test('Doesn"t change page on right arrow click if the page number equals to pages number', () => {
    const mockSetPage = jest.fn();
    const wrapper = setup({ ...dummyProps, page: 34, setPage: mockSetPage });
    const component = findByTestAtt(wrapper, 'pagination-chevron-right');
    component.props().onClick();
    expect(mockSetPage.mock.calls.length).toBe(0);
  });
});
