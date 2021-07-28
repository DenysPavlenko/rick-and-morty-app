import { takeLatest, call, put } from 'redux-saga/effects';
import RnmService from 'services/rnm-service';
import {
  fetchProfilesRequest,
  fetchProfilesSuccess,
  fetchProfilesFailure,
} from './actions';

const rnmService = new RnmService();

function* fetchProfilesDataWorker({ page }) {
  try {
    const data = yield call(rnmService.getProfilesPage, page);
    yield put(fetchProfilesSuccess(data));
  } catch ({ message }) {
    yield put(fetchProfilesFailure(message));
  }
}

function* fetchContactListData() {
  yield takeLatest(fetchProfilesRequest().type, fetchProfilesDataWorker);
}

export default fetchContactListData;
