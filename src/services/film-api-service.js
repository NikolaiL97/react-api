import { Component } from "react";

export default class FilmapiService extends Component {

	apiKey = 'api_key=fc1352909d5ee6acabd9b17da47e25ae'
	_apiBase = `https://api.themoviedb.org/3/search/movie?query=`

  async getResours(searchFilm) {
    const  res = await fetch(`${this._apiBase}${searchFilm}&${this.apiKey}`, {
      headers: {
        "Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzEzNTI5MDlkNWVlNmFjYWJkOWIxN2RhNDdlMjVhZSIsIm5iZiI6MTcyMjYyMzQyMC4yNTI0MDMsInN1YiI6IjY2YTY3MzJiNGI3MjM2ZmU3MjcyMmQyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rfoTNXMSj6JZYdegpF2sXczPpfGjgDFo1eddZpNCQgg",
        "Content-Type": "application/json",
      }
    });
	return await res.json()

	// async getResource() {
	//   const res = await fetch(`${this._apiBase}`, {
    //   headers: {
    //     "Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzEzNTI5MDlkNWVlNmFjYWJkOWIxN2RhNDdlMjVhZSIsIm5iZiI6MTcyMjYyMzQyMC4yNTI0MDMsInN1YiI6IjY2YTY3MzJiNGI3MjM2ZmU3MjcyMmQyOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rfoTNXMSj6JZYdegpF2sXczPpfGjgDFo1eddZpNCQgg",
    //     "Content-Type": "application/json",
    //   }
    // });
	//   if (!res.ok) {
	// 	throw new Error(`ERROR ${res.status}`)
	//   }
    // console.log(`${res.status}`)
	//   return await res.json();
	// }

	// getAllMovie() {
	//   return this.getResource('/')
	// }

	// getMovie(id) {
	//   return this.getResource(`/${id}/`)
	// }
  }

//   const swapi = new SwapiService();

//   swapi.getResource().then((body) => {
// 	console.log(body);
//   })
}