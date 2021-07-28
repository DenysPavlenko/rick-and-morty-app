import { combineReducers } from 'redux';
// Reducers
import profiles from 'redux/profiles/reducer';

const rootReducer = combineReducers({
  profiles,
});

export default rootReducer;
