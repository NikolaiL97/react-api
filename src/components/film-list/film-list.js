import './film-list.css';
import React, { Component } from 'react';
import Film from '../film/film';
import FilmapiService from '../../services/film-api-service';
import { Spin } from 'antd';
import Pag from '../../pagination/pagination';

export default class FilmList extends Component {
  filmapiService = new FilmapiService;

  state = {
    filmsId: [],
    filmName: [],
    totalPages: null,
    loading: true
  }

  componentDidUpdate(prevProps){
    if(prevProps.val !== this.props.val){
      this.setState({
        filmsId: [],
        filmName: [],
        loading: true
      });
      this.updateFilmList()
    }
    
  }



  updateFilmList() {
    const { val } = this.props
    this.filmapiService
    .getResours(val)
    .then((body) => {
      console.log(body)
      if(body.results.length == 0) {
        this.setState({
          loading: false
        })
      }
      this.setState({
        totalPages: body.total_pages,
      })
      body.results.forEach(el => {
        const stateFilmsId = this.state.filmsId
        const filmName = this.state.filmName
        stateFilmsId.push(el.id)
        filmName.push(el.title)
        this.setState({
          filmsId: stateFilmsId,
          filmName: filmName,
          loading: false
        })
      });
    })

  }


  render() {
    const filmsId = this.state.filmsId
    const filmName = this.state.filmName
    const { val } = this.props
    const loading = this.state.loading
    const totalPages = this.state.totalPages

    if(val && (filmName.length == 0) && !loading) {
      return (
        <p>Фильм не найден</p>
      )
    }
    if (val === null) {
      return
    }

    if(loading) {
      return (
        <Spin />
      )
    } else {
      const elem = filmsId.map((el, idx) => {
        const id = el.id
        const vals = filmName[idx]
        return (
          <Film
          key = {id}
          val = {vals} />
        ) 
      })
      return (
        <div className="film-list-wrapper">
          {elem}
          <Pag 
          totalPages={totalPages}/>
        </div>
    
      );
    }



  }

}
