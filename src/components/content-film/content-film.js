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
      idGenre: [],
      voteAverage: [],
    },
    page: 1,
    filmsId: [],
    filmName: [],
    totalPages: null,
    genreFilms: null,
    error: false,
    loading: true,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.val !== this.props.val) {
      this.setState({
        film: {
          nameFilm: [],
          relisesDate: [],
          description: [],
          image: [],
          id: [],
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
        const { filmName, filmsId, film } = this.state;
        const {
          nameFilm,
          relisesDate,
          description,
          image,
          id,
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

  render() {
    const { val, onLabelChange } = this.props;
    const {
      film,
      filmsId,
      filmName,
      totalPages,
      genreFilms,
      loading,
      page,
      error,
    } = this.state;
    const {
      nameFilm,
      relisesDate,
      description,
      image,
      id,
      idGenre,
      voteAverage,
    } = film;
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
        />
      </div>
    );
  }
}
