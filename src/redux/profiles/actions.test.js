/* eslint-disable no-undef */
import ProfilesTypes from './types';
import {
  fetchProfilesRequest,
  fetchProfilesSuccess,
  fetchProfilesFailure,
} from './actions';

describe('profiles actions', () => {
  test('Should return "FETCH_PROFILES_REQUEST" type', () => {
    const res = fetchProfilesRequest();
    expect(res).toEqual({ type: ProfilesTypes.FETCH_PROFILES_REQUEST });
  });
  test('Should return "FETCH_PROFILES_SUCCESS" type and data payload', () => {
    const res = fetchProfilesSuccess({});
    expect(res).toEqual({
      type: ProfilesTypes.FETCH_PROFILES_SUCCESS,
      payload: {},
    });
  });
  test('Should return "FETCH_PROFILES_FAILURE" type and error payload', () => {
    const res = fetchProfilesFailure('error message');
    expect(res).toEqual({
      type: ProfilesTypes.FETCH_PROFILES_FAILURE,
      payload: 'error message',
    });
  });
});
