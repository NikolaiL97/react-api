import { Component } from 'react';

import './genre.css';

export default class Genre extends Component {
  render() {
    const { idGenre, genreFilms } = this.props;
    const newGenre = [];
    if (idGenre) {
      idGenre.forEach((item) => {
        genreFilms.forEach((element) => {
          if (element.id === item) {
            newGenre.push(element.name);
          }
        });
      });
    }
    const elem = newGenre.map((el, idx) => (
      <div key={newGenre[idx]} className="genre-item">
        {el}
      </div>
    ));
    return <div className="genre">{elem}</div>;
  }
}
