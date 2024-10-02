import { Component } from "react";
import './touch-bar.css';

export default class TouchBar extends Component {

  render() {
    let searchClass = 'search ';
    let ratedClass = 'rated ';
    const {onChangeRated, onChangeSearch, rated} = this.props

    if(!rated) {
      searchClass += 'touch'
    } else {
      ratedClass += 'touch'
    }
    return(
      <div className="touchBar">
        <div className={searchClass} onClick={onChangeSearch} >
          Search
        </div>
        <div className={ratedClass} onClick={onChangeRated}>
          Rated
        </div>
      </div>
    )
  }
}