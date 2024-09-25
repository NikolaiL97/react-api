import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import FilmList from '../film-list/film-list';
import SearchFilm from '../search-film/search-film';
import debounce from 'lodash.debounce';
import sessionApi from '../session-api/session-api';


export default class App extends Component {
  state = {
    searchFilm: null,
  }

  onLabelChange = (e) => {
    if (this.state.searchFilm !== e.target.value) {
      this.setState({
        searchFilm: e.target.value,
      });
     console.log('APP ' + this.state.searchFilm)
    }
  };

  componentDidMount() {
    sessionApi()
  }


onLabelChange = debounce(this.onLabelChange, 800)


  render() {
    const val = this.state.searchFilm
    return (
      <>
        <Online>
          <section className="todoapp">
            <header className="header" />
            <section className="main">
              <SearchFilm 
              val={this.val}
              onLabelChange={this.onLabelChange}/>
              <FilmList 
                val = {val}
              />
            </section>
          </section>
        </Online>
        <Offline>
          <span>Нет сети, проверьте подключение к интернету!</span>
        </Offline>
      </>
    );
  }
}
