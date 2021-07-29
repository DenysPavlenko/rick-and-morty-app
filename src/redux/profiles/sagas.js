import { takeLatest, call, put } from 'redux-saga/effects';
import RnmService from 'services/rnm-service';
import {
  fetchProfilesRequest,
  fetchProfilesSuccess,
  fetchProfilesFailure,
} from './actions';

export const rnmService = new RnmService();

export function* fetchProfilesDataWorker({ page }) {
  try {
    const data = yield call(rnmService.getProfilesPage, page);
    yield put(fetchProfilesSuccess(data));
  } catch ({ message }) {
    yield put(fetchProfilesFailure(message));
  }
}

export function* fetchProfilesData() {
  yield takeLatest(fetchProfilesRequest().type, fetchProfilesDataWorker);
}
