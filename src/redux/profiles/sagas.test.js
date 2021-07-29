/* eslint-disable no-undef */
import { takeLatest } from 'redux-saga/effects';
import { runSaga } from 'redux-saga';
import ProfilesTypes from './types';
import {
  fetchProfilesData,
  rnmService,
  fetchProfilesDataWorker,
} from './sagas';

describe('fetchProfilesData', () => {
  const genObject = fetchProfilesData();
  it('should wait for FETCH_PROFILES_REQUEST action and call fetchProfilesDataWorker', () => {
    expect(genObject.next().value).toEqual(
      takeLatest(ProfilesTypes.FETCH_PROFILES_REQUEST, fetchProfilesDataWorker)
    );
  });
  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});

describe('fetchProfilesDataWorker', () => {
  it('should call api and dispatch success action', async () => {
    const dummyData = { a: [] };
    rnmService.getProfilesPage = jest.fn(() => Promise.resolve(dummyData));
    const dispatched = [];
    await runSaga(
      { dispatch: (action) => dispatched.push(action) },
      fetchProfilesDataWorker,
      1
    ).toPromise();
    expect(rnmService.getProfilesPage.mock.calls.length).toBe(1);
    expect(dispatched).toEqual([
      { type: ProfilesTypes.FETCH_PROFILES_SUCCESS, payload: dummyData },
    ]);
  });
  it('should handle errors in case of fail', async () => {
    const error = { message: 'error message' };
    rnmService.getProfilesPage = jest.fn(() => Promise.reject(error));
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      fetchProfilesDataWorker,
      1
    ).toPromise();
    expect(rnmService.getProfilesPage.mock.calls.length).toBe(1);
    expect(dispatched).toEqual([
      {
        type: ProfilesTypes.FETCH_PROFILES_FAILURE,
        payload: error.message,
      },
    ]);
  });
});
