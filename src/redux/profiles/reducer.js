import ProfilesTypes from './types';

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProfilesTypes.FETCH_PROFILES_REQUEST:
      return {
        loading: true,
        data: null,
        error: null,
      };
    case ProfilesTypes.FETCH_PROFILES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case ProfilesTypes.FETCH_PROFILES_FAILURE:
      return {
        loading: false,
        data: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
