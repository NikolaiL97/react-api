import React, { Component} from 'react';
import './progress.css'

export default class Progres extends Component {
  render() {
    let {rate} = this.props
    let progress = 'progress '
    if(!rate) {
      rate = 0;
    }

    if(rate >= 3 && rate < 5) {
      progress += 'free-five'
    } else if (rate >= 5 && rate < 7) {
      progress += 'five-seven'
    } else if (rate >= 7) {
      progress += 'seven'
    }

    return (
      <div className={progress}>
        <p className='count-progress'>{rate}</p>
      </div>
    )
  }
};