import { all, call } from 'redux-saga/effects';
// Sagas
import fetchContactListData from 'redux/profiles/sagas';

function* rootSaga() {
  yield all([call(fetchContactListData)]);
}

export default rootSaga;
