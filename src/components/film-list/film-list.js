import './film-list.css';
import React from 'react';
import Film from '../film/film';

function FilmList() {
  return (
    <div className="film-list-wrapper">
      <Film />
      <Film />
      <Film />
      <Film />

    </div>

  );
}

export default FilmList;
