import { Component } from "react";
import './genre.css'

export default class Genre extends Component {

  render() {
    const {genre} = this.props
    const elem = genre.map((el, idx) => {
      return (
        <div key={genre[idx]} className="genre-item">
          {el}
        </div>
      )
    })
      return (
        <div className="genre">
          {elem}
        </div>
      )
    };
  }