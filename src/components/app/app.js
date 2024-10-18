import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import debounce from 'lodash.debounce';

import { GenreProvider } from '../genre-service-context/genre-service-context';
import TouchBar from '../touch-bar/touch-bar';
import ContentFilm from '../content-film/content-film';
import FilmapiService from '../services/film-api-service';

export default class App extends Component {
  filmapiService = new FilmapiService();

  state = {
    searchFilm: null,
    rated: false,
    search: true,
    genreFilms: null,
  };

  onLabelChange = (e) => {
    if (this.state.searchFilm !== e.target.value) {
      this.setState({
        searchFilm: e.target.value,
      });
    }
  };

  componentDidMount() {
    this.getGenreFilm();
  }

  onChangeSearch = () => {
    if (!this.state.search) {
      this.setState({
        rated: false,
        search: true,
      });
    }
  };

  onChangeRated = () => {
    if (this.state.search) {
      this.setState({
        rated: true,
        search: false,
      });
    }
  };

  getGenreFilm() {
    this.filmapiService.getGenre().then((body) => {
      this.setState({
        genreFilms: body.genres,
      });
    });
  }

  onLabelChanges = debounce(this.onLabelChange, 800);

  render() {
    const val = this.state.searchFilm;
    const { rated, genreFilms } = this.state;

    return (
      <>
        <Online>
          <GenreProvider value={genreFilms}>
            <section className="todoapp">
              <header className="header" />
              <section className="main">
                <TouchBar
                  rated={rated}
                  onChangeSearch={this.onChangeSearch}
                  onChangeRated={this.onChangeRated}
                />
                <ContentFilm
                  onLabelChange={this.onLabelChanges}
                  rated={rated}
                  val={val}
                />
              </section>
            </section>
          </GenreProvider>
        </Online>
        <Offline>
          <span>Нет сети, проверьте подключение к интернету!</span>
        </Offline>
      </>
    );
  }
}
