import React, { Component } from 'react';
import './progress.css';

export default class Progres extends Component {
  render() {
    let { voteAverage } = this.props;
    let progress = 'progress ';
    if (!voteAverage) {
      voteAverage = 0;
    }
    voteAverage = voteAverage.toFixed(1);

    if (voteAverage >= 3 && voteAverage < 5) {
      progress += 'free-five';
    } else if (voteAverage >= 5 && voteAverage < 7) {
      progress += 'five-seven';
    } else if (voteAverage >= 7) {
      progress += 'seven';
    }

    return (
      <div className={progress}>
        <p className="count-progress">{voteAverage}</p>
      </div>
    );
  }
}
