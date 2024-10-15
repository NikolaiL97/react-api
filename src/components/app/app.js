import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import SearchFilm from '../search-film/search-film';
import debounce from 'lodash.debounce';
import sessionApi from '../session-api/session-api';
import GuestApiSession from '../services/guest-api-session';
import TouchBar from '../touch-bar/touch-bar';
import ContentFilm from '../content-film/content-film';


export default class App extends Component {
  guestApiSession = new GuestApiSession()

  state = {
    searchFilm: null,
    guestSessionId: null,
    rated: false,
    search: true,
  }

  onLabelChange = (e) => {
    if (this.state.searchFilm !== e.target.value) {
      this.setState({
        searchFilm: e.target.value,
      });
    }
  };

  componentDidMount() {
    this.guestApiSession
    .getGuestSession()
    .then((body) => {
      this.setState({
        guestSessionId: body.guest_session_id
      })
    })
  }

  onChangeSearch = () => {
    if (!this.state.search) {
      this.setState({
        rated:false,
        search:true,
      })
    }
  }

  onChangeRated = () => {
    if (this.state.search) {
      this.setState({
        rated:true,
        search:false,
      })
    }
  }

  onLabelChange = debounce(this.onLabelChange, 800)


  render() {
    const val = this.state.searchFilm
    const { rated, guestSessionId} = this.state

    return (
      <>
        <Online>
          <section className="todoapp">
            <header className="header" />
            <section className="main">
              <TouchBar
              rated={rated} 
              onChangeSearch={this.onChangeSearch}
              onChangeRated={this.onChangeRated}/>
              <ContentFilm
                onLabelChange={this.onLabelChange}
                rated={rated}
                val = {val}
                guestSessionId={guestSessionId}
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
