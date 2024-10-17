import { Component } from 'react';

export default class FilmapiService extends Component {
  apiKey = 'api_key=fc1352909d5ee6acabd9b17da47e25ae';

  apiBase = 'https://api.themoviedb.org/3/search/movie?';

  async getResours(searchFilm, page) {
    const res = await fetch(
      `${this.apiBase}page=${page}&query=${searchFilm}&${this.apiKey}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzEzNTI5MDlkNWVlNmFjYWJkOWIxN2RhNDdlMjVhZSIsIm5iZiI6MTcyMjYyMzQyMC4yNTI0MDMsInN1YiI6IjY2YTY3MzJiNGI3MjM2ZmU3MjcyMmQyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rfoTNXMSj6JZYdegpF2sXczPpfGjgDFo1eddZpNCQgg',
          'Content-Type': 'application/json',
        },
      }
    );
    return res.json();
  }

  async getGenre() {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?&${this.apiKey}`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzEzNTI5MDlkNWVlNmFjYWJkOWIxN2RhNDdlMjVhZSIsIm5iZiI6MTcyMjYyMzQyMC4yNTI0MDMsInN1YiI6IjY2YTY3MzJiNGI3MjM2ZmU3MjcyMmQyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rfoTNXMSj6JZYdegpF2sXczPpfGjgDFo1eddZpNCQgg',
          'Content-Type': 'application/json',
        },
      }
    );
    return res.json();
  }
}
