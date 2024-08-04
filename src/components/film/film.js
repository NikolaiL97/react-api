import { Component } from 'react';
import './film.css';
import SwapiService from '../../services/swapi-service';

export default class Film extends Component {

  swapiService = new SwapiService();

  state = {
    nameFilm: null,
    relisesDate: null,
    style: null,
    description: null,
    image: null
  };

  constructor() {
    super();
    this.updateFilm();
  }

  updateFilm() {
    this.swapiService.getResource()
    .then((body) => {
      console.log(body.results)
      this.setState({
        nameFilm: body.results[0].original_title,
        relisesDate: body.results[0].release_date,
        style: body.results[0].original_title,
        description: this.sokr(body.results[0].overview),
        image: body.results[0].poster_path        
      })
    })
  }
  

  sokr = (text) => {
  let yourString = text; 
  let trimmedString = yourString.substring(0, 150);
  
  trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
  return trimmedString
}
  render() {
    
  const { nameFilm, relisesDate, style, description, image } = this.state;
  const imageFilm = 'https://image.tmdb.org/t/p/w500'+image;
    return (
      <div className="film-card">
        <img src={imageFilm} alt="film cover" className='film-img'/>
        <div className="description">
          <h5>{nameFilm}</h5>
          <p>{relisesDate}</p>
          <p>{style}</p>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}
