import { Component } from 'react';
import './film.css';
import FilmapiService from '../services/film-api-service';
import { format } from 'date-fns';
import { Spin, Alert } from "antd";
import React from 'react';
import ErrorIndicator from '../error-indicator/error-indicator';
import Rating from '../rating/rating';
import GuestApiSession from '../services/guest-api-session';
import Progres from '../progress/progress';
import Item from 'antd/es/list/Item';
import Genre from '../genre/genre';

export default class Film extends Component {

  filmapiService = new FilmapiService();
  guestApiSession = new GuestApiSession();

  state = {
    film: {
      nameFilm: null,
      relisesDate: null,
      description: null,
      image: null,
      rate: null,
      id:null,
      idGenre: null,
    },
    genre: null,
    loading: false,
    error: false,
  };


  componentDidMount() { 
    this.updateFilm()
    this.getGenreFilm()
  }

  componentDidUpdate(prevProps) {
    if(prevProps.val !== this.props.val) {
      this.updateFilm();
    }

  }
  onFilmLoaded = () => {
    let loading = false
    this.setState({
        loading: loading
    })
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updateFilm =(e=null) =>  {
    const { val, page, id } = this.props

    this.filmapiService.getResours(val, page)
    .then((body) => {
      const defaultDate = new Date(body.results[0].release_date)
      this.setState({
        film:{
          nameFilm: body.results[0].original_title,
          relisesDate: format(defaultDate, 'MMMM dd, yyyy'),
          style: body.results[0].original_title,
          description: this.sokr(body.results[0].overview),
          image: body.results[0].poster_path,
          rate: e,
          id: id,
          idGenre: body.results[0].genre_ids
        },
        loading:false,
      })
    })
    .catch(this.onError);

  }

  getGenreFilm(){
    const { genreFilms } = this.props
      setTimeout(() => {
        if (this.state.film.idGenre) {
          let newGenre = []
          let genre = this.state.film.idGenre.map(item => {
            genreFilms.forEach(element => {
              if (element.id === item) {
                newGenre.push(element.name)
              }
            });
          })
          this.setState({
            genre: newGenre,
          })
        }
      },100)
  }

  

  sokr = (text) => {
    let yourString = text; 
    let trimmedString = yourString.substring(0, 150);
    
    trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    return trimmedString +' ...'
}

changeRate = (e) => {
  this.updateFilm(e)
  const inform = this.state.film
  const genre =  this.state.genre
  const data = JSON.stringify(inform)
  localStorage.setItem(this.state.film.id, data)
}


  render() {
    
  const { film, loading, error, genre } = this.state;
  const changeRate = this.changeRate
  const hasData = !(loading || error)
  const errorMessage = error ? <ErrorIndicator /> : null;
  const spin = loading ? <Spin /> : null;
  const content = hasData ? <FilmView film ={film} changeRate={changeRate} genre={genre}/> : null;


  if (!film) {
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

const FilmView = ({film, changeRate, genre}) => {
  const {nameFilm, relisesDate, description, image, rate} = film;
  const imageFilm = 'https://image.tmdb.org/t/p/w500'+image;
  if (genre) {
    return (
      <React.Fragment>
          <img src={imageFilm} alt="film cover" className='film-img'/>
          <div className="information">
            <Progres className='progress'
            rate={rate}
            />
            <h5 className='nameFilm'>{nameFilm}</h5>
            <p className="relisesDate">{relisesDate}</p>
            <Genre genre={genre} className='genre'/>
            {/* <p>{genre}</p> */}
            <div className='description'>
              <p>{description}</p>
            </div>
            <Rating onChangeRate={changeRate} className='rating'/>
          </div>
      </React.Fragment>
    )
  }

}
