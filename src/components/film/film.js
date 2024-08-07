import { Component } from 'react';
import './film.css';
import SwapiService from '../../services/swapi-service';
import { format } from 'date-fns';
import { Spin, Alert } from "antd";
import React from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';


export default class Film extends Component {

  swapiService = new SwapiService();

  state = {
    film: {
      nameFilm: null,
      relisesDate: null,
      style: null,
      description: null,
      image: null,
    },
    loading: false,
    error: false,
  };

  constructor() {
    super();
    this.updateFilm();
  }

  onFilmLoaded = () => {
    // this.setState((this.state) => {
    //   return(
    //     loading: false
    //   )
      
    // })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }

  onConsole = () => {
    console.log(this.state.loading)
  }

  updateFilm() {
    this.swapiService.getResource()
    .then((body) => {
      const defaultDate = new Date(body.results[0].release_date)
      this.setState({
        film:{
          nameFilm: body.results[0].original_title,
          relisesDate: format(defaultDate, 'MMMM dd, yyyy'),
          style: body.results[0].original_title,
          description: this.sokr(body.results[0].overview),
          image: body.results[0].poster_path  
        },
      })
      
    })
    .catch(this.onError);
  }
  

  sokr = (text) => {
  let yourString = text; 
  let trimmedString = yourString.substring(0, 150);
  
  trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
  return trimmedString
}
  render() {
    
  const { film, loading, error } = this.state;

  const hasData = !(loading || error)
  const errorMessage = error ? <ErrorIndicator /> : null;
  const spin = loading ? <Spin /> : null;
  const content = hasData ? <FilmView film ={film}/> : null;

  if (loading) {
    return <Spin />
  }

    return (
      <div className="film-card">
        {errorMessage}
        {spin}
        {content}
      </div>
    );
  }
}

const FilmView = ({film}) => {
  const {nameFilm, relisesDate, style, description, image} = film;
  const imageFilm = 'https://image.tmdb.org/t/p/w500'+image;
  return (
    <React.Fragment>
        <img src={imageFilm} alt="film cover" className='film-img'/>
        <div className="description">
          <h5>{nameFilm}</h5>
          <p>{relisesDate}</p>
          <p>{style}</p>
          <p>{description}</p>
        </div>
    </React.Fragment>
  )
}
