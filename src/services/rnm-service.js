export default class RnmService {
  _apiBase = 'https://rickandmortyapi.com/api/';

  getResource = async (params) => {
    const res = await fetch(`${this._apiBase}${params}`);
    /* istanbul ignore else */
    if (!res.ok) {
      throw new Error(res.status);
    }
    const body = await res.json();
    return body;
  };

  getProfilesPage = async (page) => {
    const response = await this.getResource(`character/?page=${page}`);
    const data = {
      pages: response.info.pages,
      profiles: response.results,
    };
    return data;
  };
}
