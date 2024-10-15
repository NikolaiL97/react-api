import { Component } from "react";
import FilmList from "../film-list/film-list";
import SearchFilm from "../search-film/search-film";
import FilmapiService from "../services/film-api-service";
import Rate from "../rate/rate";
import './content-film.css'

export default class ContentFilm extends Component {
  filmapiService = new FilmapiService();
  // componentDidUpdate() {
  //   this.filmRated()
  // }

  // filmRated() {
  //   if (this.props.guestSessionId) {
  //     this.filmapiService
  //     .getRatedFilm(this.props.guestSessionId)
  //     .then((body) => {
  //       console.log(body)
  //     })
  //   }
  // }
  
    render() {
      const {val, rated, onLabelChange, guestSessionId} = this.props
      if(!rated) {
        return (
          <div className="content-film">
            <SearchFilm 
              onLabelChange={onLabelChange}/>
            <FilmList 
              guestSessionId={guestSessionId}
              val = {val}
            />
          </div>
        )
      } else {
        return (
          <div>
            <Rate />
          </div>
        )
      }
    }
  }