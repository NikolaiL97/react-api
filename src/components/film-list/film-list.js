import './film-list.css';
import { Spin } from 'antd';
import React, { Component } from 'react';

import Film from '../film/film';
import FilmapiService from '../services/film-api-service';
import Pag from '../pagination/pagination';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class FilmList extends Component {
  filmapiService = new FilmapiService();

  // eslint-disable-next-line consistent-return
  render() {
    const {
      filmsId,
      filmName,
      loading,
      totalPages,
      error,
      page,
      genreFilms,
      nameFilm,
      relisesDate,
      description,
      image,
      idGenre,
      voteAverage,
      changePagination,
      val,
      rated,
      changeRate,
      changeR,
    } = this.props;

    if (error) {
      return <ErrorIndicator />;
    }

    if (val && filmName.length === 0 && !loading) {
      return <p className="noSearch">Фильм не найден</p>;
    }

    if ((val === null || !val) && !rated) {
      // eslint-disable-next-line consistent-return
      return;
    }

    if (loading && !rated) {
      return <Spin className="spin" />;
    }
    if (filmName || rated) {
      const elem = filmsId.map((el, idx) => {
        const vals = filmName[idx];
        const namesFilm = nameFilm[idx];
        const reliseDate = relisesDate[idx];
        const descriptions = description[idx];
        const images = image[idx];
        const idGenres = idGenre[idx];
        const id = idx;
        const voteAverages = voteAverage[idx];
        return (
          <div className="film" key={el + id}>
            <Film
              rated={rated}
              id={el}
              val={vals}
              page={page}
              filmsId={el}
              genreFilms={genreFilms}
              nameFilm={namesFilm}
              relisesDate={reliseDate}
              description={descriptions}
              image={images}
              idGenre={idGenres}
              loading={loading}
              voteAverage={voteAverages}
              changeRate={changeRate}
              changeR={changeR}
            />
          </div>
        );
      });

      if (!rated) {
        return (
          <div className="film-list-wrapper">
            {elem}
            <Pag
              totalPages={totalPages}
              changePagination={changePagination}
              page={page}
            />
          </div>
        );
      }
      return <div className="film-list-wrapper">{elem}</div>;
    }
  }
}
