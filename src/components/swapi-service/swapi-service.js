class SwapiService {
  _apiBase = 'https://api.themoviedb.org/3/search'

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error(`ERRRRRRRRROR ${res.status}`)
    }

    return await res.json();
  }

  getAllMovie() {
    return this.getResource('/movie/')
  }

  getMovie(id) {
    return this.getResource(`/movie${id}/`)
  }
}

const swapi = new SwapiService();

swapi.getAllMovie().then((body) => {
  console.log(body);
})