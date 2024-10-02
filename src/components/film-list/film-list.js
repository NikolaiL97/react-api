import './film-list.css';
import { Spin } from 'antd';
import React, { Component } from 'react';
import Film from '../film/film';
import FilmapiService from '../services/film-api-service';
import Pag from '../pagination/pagination';
import ErrorIndicator from '../error-indicator/error-indicator';

export default class FilmList extends Component {
  filmapiService = new FilmapiService();

  state = {
    filmsId: [],
    filmName: [],
    page: 1,
    totalPages: null,
    loading: true,
    error: false,
  }

  componentDidMount(){
    this.updateFilmList()
  }

  componentDidUpdate(prevProps, prevState){
    if((prevProps.val !== this.props.val)){
      this.setState({
        filmsId: [],
        filmName: [],
        loading: true,
        page:1
      });
      this.updateFilmList()
    }
    if(prevState.page !== this.state.page) {
      this.setState({
        filmsId: [],
        filmName: [],
        loading: true
      })
      this.updateFilmList()
    }
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false
    })
  }

  updateFilmList() {
    const { val } = this.props
    const {page} = this.state
    this.filmapiService
    .getResours(val, page)
    .then((body) => {
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
    .catch(this.onError)

  }

  changePagination= (current) => {
    this.setState({
      page: current
    })
    console.log(current)
  }


  render() {
    const filmsId = this.state.filmsId
    const filmName = this.state.filmName
    const { val, guestSessionId } = this.props
    const loading = this.state.loading
    const totalPages = this.state.totalPages
    const error = this.state.error
    const page = this.state.page
    

    if(error) {
      return (
        <ErrorIndicator />
      )
    }

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
        <Spin className='spin' />
      )
    } else if (filmName){
      const elem = filmsId.map((el, idx) => {
        const id = el.id
        const vals = filmName[idx]
        return (
          <div className='film'>
            <Film 
            key = {id}
            val = {vals}
            page = {page}
            filmsId = {filmsId} />
          </div>

        ) 
      })
      return (
        <div className="film-list-wrapper">
          {elem}
          <Pag 
          totalPages={totalPages}
          changePagination={this.changePagination}
          page={page}/>
        </div>
    
      );
    }
  }
}
