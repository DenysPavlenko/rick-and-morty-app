import ProfilesTypes from './types';

export const fetchProfilesRequest = () => ({
  type: ProfilesTypes.FETCH_PROFILES_REQUEST,
});
export const fetchProfilesSuccess = (data) => ({
  type: ProfilesTypes.FETCH_PROFILES_SUCCESS,
  payload: data,
});
export const fetchProfilesFailure = (error) => ({
  type: ProfilesTypes.FETCH_PROFILES_FAILURE,
  payload: error,
});
