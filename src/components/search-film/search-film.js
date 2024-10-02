import { Component } from 'react';
import './search-film.css';

export default class SearchFilm extends Component {
  render() {
    const { onLabelChange } = this.props;
    return (
      <form className="searchForm">
        <input className="searchForm-input" placeholder="Type to search..." autoFocus onChange={onLabelChange} />
      </form>
    );
  }
}
