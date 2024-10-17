import { Component } from 'react';

export default class GuestApiSession extends Component {
  async getGuestSession() {
    const res = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzEzNTI5MDlkNWVlNmFjYWJkOWIxN2RhNDdlMjVhZSIsIm5iZiI6MTcyMjYyMzQyMC4yNTI0MDMsInN1YiI6IjY2YTY3MzJiNGI3MjM2ZmU3MjcyMmQyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rfoTNXMSj6JZYdegpF2sXczPpfGjgDFo1eddZpNCQgg',
        'Content-Type': 'application/json',
      },
    });
    return res.json();
  }

  async getRated(guestSessionId) {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${guestSessionId}/rated/movies?page=1&query=titan&api_key=fc1352909d5ee6acabd9b17da47e25ae`,
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzEzNTI5MDlkNWVlNmFjYWJkOWIxN2RhNDdlMjVhZSIsIm5iZiI6MTcyMjYyMzQyMC4yNTI0MDMsInN1YiI6IjY2YTY3MzJiNGI3MjM2ZmU3MjcyMmQyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rfoTNXMSj6JZYdegpF2sXczPpfGjgDFo1eddZpNCQgg',
          'Content-Type': 'application/json',
        },
      }
    );
    return await res.json();
  }
}
