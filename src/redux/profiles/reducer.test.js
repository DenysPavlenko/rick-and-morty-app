/* eslint-disable no-undef */
import ProfilesTypes from './types';
import profilesReducer from './reducer';

const INITIAL_STATE = {
  loading: true,
  data: null,
  error: null,
};

describe('profiles reducer', () => {
  test('profilesReducer should return loading:true on "FETCH_PROFILES_REQUEST"', () => {
    const newState = profilesReducer(undefined, {
      type: ProfilesTypes.FETCH_PROFILES_REQUEST,
    });
    expect(newState).toEqual({ ...INITIAL_STATE, loading: true });
  });
  test('profilesReducer should return data:{} on "FETCH_PROFILES_SUCCESS"', () => {
    const newState = profilesReducer(undefined, {
      type: ProfilesTypes.FETCH_PROFILES_SUCCESS,
      payload: {},
    });
    expect(newState).toEqual({ ...INITIAL_STATE, loading: false, data: {} });
  });
  test('profilesReducer should return error message on "FETCH_PROFILES_FAILURE"', () => {
    const newState = profilesReducer(undefined, {
      type: ProfilesTypes.FETCH_PROFILES_FAILURE,
      payload: 'error message',
    });
    expect(newState).toEqual({
      ...INITIAL_STATE,
      loading: false,
      error: 'error message',
    });
  });
  test('profilesReducer should return INITIAL_STATE on "SOME_TEST_REQUEST"', () => {
    const newState = profilesReducer(undefined, {
      type: 'SOME_TEST_REQUEST',
    });
    expect(newState).toEqual({ ...INITIAL_STATE });
  });
});
