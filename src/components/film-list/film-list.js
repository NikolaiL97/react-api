import { Component } from 'react';
import './film-list.css';
import Film from '../film/film';

export default class FilmList extends Component {

  render() {
    return (
      <div className="film-list-wrapper">
        <Film />

      </div>

    );
  }
}
