import { all, call } from 'redux-saga/effects';
// Sagas
import { fetchProfilesData } from 'redux/profiles/sagas';

function* rootSaga() {
  yield all([call(fetchProfilesData)]);
}

export default rootSaga;
