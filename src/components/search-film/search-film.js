import { Component } from 'react';
import './search-film.css';

export default class SearchFilm extends Component {
  render() {
    const { val, onLabelChange } = this.props;
    return (
      <form className="searchForm">
        <input className="" placeholder="Type to search..." autoFocus onChange={onLabelChange} />
      </form>
    );
  }
}
