export default class RnmService {
  _apiBase = 'https://rickandmortyapi.com/api/';

  getResource = async (params) => {
    const res = await fetch(`${this._apiBase}${params}`);
    if (!res.ok) {
      throw new Error(
        `Could not fetch ${this._apiBase}, received ${res.status}`
      );
    }
    const body = await res.json();
    return body;
  };

  getProfilesPage = async (page) => {
    const { results } = await this.getResource(`character/?page=${page}`);
    return results;
  };
}
