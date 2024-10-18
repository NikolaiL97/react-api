// eslint-disable-next-line import/order
import React, { Component } from 'react';

import './film.css';

import { Spin } from 'antd';

import FilmapiService from '../services/film-api-service';
import ErrorIndicator from '../error-indicator/error-indicator';
import Rating from '../rating/rating';
import GuestApiSession from '../services/guest-api-session';
import Progres from '../progress/progress';
import Genre from '../genre/genre';
import { GenreConsumer } from '../genre-service-context/genre-service-context';

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
      id: null,
      idGenre: [1],
      voteAverage: null,
    },
    loading: false,
    error: false,
  };

  componentDidMount() {
    this.updateFilm();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.val !== this.props.val) {
      this.updateFilm();
    }
  }

  onFilmLoaded = () => {
    const loading = false;
    this.setState({
      loading,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateFilm(e) {
    const {
      id,
      nameFilm,
      relisesDate,
      description,
      image,
      idGenre,
      loading,
      voteAverage,
      // rateStore,
    } = this.props;
    this.setState({
      film: {
        nameFilm,
        relisesDate,
        description,
        image,
        rate: e,
        id,
        idGenre,
        voteAverage,
      },
      loading,
    });
  }

  changeRate = (e) => {
    this.updateFilm(e);
    const inform = this.state.film;
    const data = JSON.stringify(inform);
    setTimeout(() => localStorage.setItem(this.state.film.id, data), 1000);
  };

  render() {
    const { rated } = this.props;
    const { film, loading, error } = this.state;
    const hasData = !((loading || error) && !rated);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spin = loading && !rated ? <Spin /> : null;
    const content =
      hasData || rated ? (
        <FilmView film={film} changeRate={this.changeRate} />
      ) : null;
    if (!film) {
      return <Spin />;
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

function FilmView({ film, changeRate, genre }) {
  const { nameFilm, relisesDate, description, image, voteAverage, idGenre } =
    film;
  const imageFilm = `https://image.tmdb.org/t/p/w500${image}`;
  if (!genre) {
    return (
      <>
        <img src={imageFilm} alt="film cover" className="film-img" />
        <div className="information">
          <Progres className="progress" voteAverage={voteAverage} />
          <h5 className="nameFilm">{nameFilm}</h5>
          <p className="relisesDate">{relisesDate}</p>
          <GenreConsumer>
            {(genreFilms) => (
              <Genre
                className="genre"
                idGenre={idGenre}
                genreFilms={genreFilms}
              />
            )}
          </GenreConsumer>
          <div className="description">
            <p>{description}</p>
          </div>
          <Rating onChangeRate={changeRate} className="rating" />
        </div>
      </>
    );
  }
}
