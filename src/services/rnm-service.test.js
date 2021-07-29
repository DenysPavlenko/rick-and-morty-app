/* eslint-disable no-undef */
import RnmService from './rnm-service';

const rnmService = new RnmService();

const dummyData = {
  info: {
    pages: [],
  },
  results: [{}],
};

const dummyResp = { pages: [], profiles: [{}] };

describe('RnmService getProfilesPage', () => {
  it('should throw an error if ok is not true', async () => {
    const mockFetchPromise = Promise.resolve({
      ok: false,
      status: 404,
    });
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => mockFetchPromise);
    await expect(rnmService.getProfilesPage()).rejects.toThrow('404');
  });
  it('should fetch data and return data in required format', async () => {
    const mockFetchPromise = Promise.resolve({
      ok: true,
      status: 200,
      json: () => Promise.resolve(dummyData),
    });
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => mockFetchPromise);
    const res = await rnmService.getProfilesPage();
    expect(res).toEqual(dummyResp);
  });
});
