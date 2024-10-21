import { Component } from 'react';
import { format } from 'date-fns';

import FilmList from '../film-list/film-list';
import SearchFilm from '../search-film/search-film';
import FilmapiService from '../services/film-api-service';
import './content-film.css';

export default class ContentFilm extends Component {
  filmapiService = new FilmapiService();

  state = {
    film: {
      nameFilm: [],
      relisesDate: [],
      description: [],
      image: [],
      id: [],
      rate: [],
      idGenre: [],
      voteAverage: [],
    },
    filmStor: {
      nameFilmStor: [],
      relisesDataStor: [],
      descriptionStor: [],
      idStor: [],
      idGenreStor: [],
      imageStor: [],
      rateStor: [],
      voteAverageStor: [],
    },
    changeR: false,
    page: 1,
    filmsId: [],
    filmName: [],
    totalPages: null,
    genreFilms: null,
    error: false,
    loading: true,
    keyStore: [],
  };

  componentDidMount() {
    if (localStorage.length > 0) {
      this.keyStorage();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.val !== this.props.val) {
      this.setState({
        film: {
          nameFilm: [],
          relisesDate: [],
          description: [],
          image: [],
          id: [],
          rate: [],
          idGenre: [],
          voteAverage: [],
        },
        page: 1,
        filmsId: [],
        filmName: [],
        totalPages: null,
        genreFilms: null,
        loading: true,
      });
      this.updateContent();
    }
    if (prevState.page !== this.state.page) {
      this.setState({
        film: {
          nameFilm: [],
          relisesDate: [],
          description: [],
          image: [],
          id: [],
          rate: [],
          idGenre: [],
          voteAverage: [],
        },
        filmsId: [],
        filmName: [],
        totalPages: null,
        genreFilms: null,
        loading: true,
      });
      this.updateContent();
    }
    if (prevProps.rated !== this.props.rated) {
      this.keyStorage();
    }
  }

  updateContent() {
    const { val } = this.props;
    const { page } = this.state;
    this.filmapiService
      .getResours(val, page)
      .then((body) => {
        if (body.results.length === 0) {
          this.setState({
            loading: false,
          });
        }
        this.setState({
          totalPages: body.total_pages,
        });
        const { filmName, filmsId, film, keyStore } = this.state;
        const {
          nameFilm,
          relisesDate,
          description,
          image,
          id,
          rate,
          idGenre,
          voteAverage,
        } = film;
        body.results.forEach((el) => {
          const defaultDate = new Date(el.release_date);
          filmsId.push(el.id);
          filmName.push(el.title);
          nameFilm.push(el.title);
          if (!el.release_date) {
            relisesDate.push('нет даты');
          } else {
            relisesDate.push(format(defaultDate, 'MMMM dd, yyyy'));
          }
          let a = 0;
          keyStore.forEach((item) => {
            item = Number(item);
            if (item === el.id) {
              a = 1;
              rate.push(JSON.parse(localStorage.getItem(item)).rate);
            } else if (item !== el.id && a !== 0) {
              a = 2;
            }
          });
          if (a === 0) {
            rate.push(0);
          }
          description.push(this.sokr(el.overview));
          image.push(el.poster_path);
          id.push(el.id);

          idGenre.push(el.genre_ids);
          voteAverage.push(el.vote_average);
        });
        this.setState({
          film: {
            nameFilm,
            relisesDate,
            description,
            image,
            id,
            rate,
            idGenre,
            voteAverage,
          },
          filmsId,
          filmName,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  sokr = (text) => {
    const yourString = text;
    let trimmedString = yourString.substring(0, 70);

    trimmedString = trimmedString.substring(
      0,
      Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
    );
    return `${trimmedString} ...`;
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  changePagination = (current) => {
    this.setState({
      page: current,
    });
  };

  keyStorage() {
    const { length } = localStorage;
    const arrKey = [];
    const arrValue = [];
    for (let i = 0; i < length; i++) {
      arrKey.push(localStorage.key(i));
    }
    this.setState({
      keyStore: arrKey,
    });
    if (arrKey.length > 0) {
      arrKey.forEach((item) => {
        let val = localStorage.getItem(item);
        val = JSON.parse(val);
        arrValue.push(val);
      });
      const arrNameFilm = [];
      const arrRelisesData = [];
      const arrDescription = [];
      const arrId = [];
      const arrIdGenre = [];
      const arrImage = [];
      const arrRate = [];
      const arrVoteAverage = [];

      arrValue.forEach((item) => {
        arrNameFilm.push(item.nameFilm);
        const defaultDate = new Date(item.relisesDate);
        if (!item.relisesDate) {
          arrRelisesData.push(format('Нет даты'));
        } else {
          arrRelisesData.push(format(defaultDate, 'MMMM dd, yyyy'));
        }

        arrDescription.push(item.description);
        arrId.push(item.id);
        arrIdGenre.push(item.idGenre);
        arrImage.push(item.image);
        arrRate.push(item.rate);
        arrVoteAverage.push(item.voteAverage);
      });
      this.setState({
        filmStor: {
          nameFilmStor: arrNameFilm,
          relisesDataStor: arrRelisesData,
          descriptionStor: arrDescription,
          idStor: arrId,
          idGenreStor: arrIdGenre,
          imageStor: arrImage,
          rateStor: arrRate,
          voteAverageStor: arrVoteAverage,
        },
      });
    }
  }

  render() {
    const { val, onLabelChange, rated } = this.props;
    const {
      film,
      filmStor,
      filmsId,
      filmName,
      totalPages,
      genreFilms,
      loading,
      page,
      error,
      changeR,
    } = this.state;
    const {
      nameFilm,
      relisesDate,
      description,
      image,
      id,
      rate,
      idGenre,
      voteAverage,
    } = film;
    const {
      nameFilmStor,
      relisesDataStor,
      descriptionStor,
      idStor,
      idGenreStor,
      rateStor,
      imageStor,
      voteAverageStor,
    } = filmStor;
    if (!rated) {
      return (
        <div className="content-film">
          <SearchFilm onLabelChange={onLabelChange} />
          <FilmList
            val={val}
            filmsId={filmsId}
            filmName={filmName}
            totalPages={totalPages}
            genreFilms={genreFilms}
            loading={loading}
            nameFilm={nameFilm}
            relisesDate={relisesDate}
            description={description}
            image={image}
            id={id}
            idGenre={idGenre}
            voteAverage={voteAverage}
            page={page}
            changePagination={this.changePagination}
            error={error}
            changeRate={this.changeRate}
            changeR={changeR}
            rate={rate}
          />
        </div>
      );
    }
    return (
      <div className="content-film">
        <FilmList
          rated={rated}
          val={val}
          filmsId={idStor}
          filmName={nameFilmStor}
          totalPages={totalPages}
          genreFilms={genreFilms}
          loading={loading}
          nameFilm={nameFilmStor}
          relisesDate={relisesDataStor}
          description={descriptionStor}
          image={imageStor}
          id={idStor}
          idGenre={idGenreStor}
          voteAverage={voteAverageStor}
          page={page}
          changePagination={this.changePagination}
          error={error}
          rate={rateStor}
          changeR={changeR}
        />
      </div>
    );
  }
}
