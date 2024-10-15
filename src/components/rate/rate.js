import { Component } from "react";

export default class Rate extends Component {
  state = {
    key: [],
    film: [],
  }

  componentDidMount() {
    this.keyStorage()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.valueStorage()
    }

  }

  keyStorage() {
    const length = localStorage.length
    let arr = []
    for (let i=0; i < length; i++) {
      arr.push(localStorage.key(i))
    }
    this.setState({
      key: arr
    })
  }

  valueStorage() {
    const {key} = this.state
    let arr = []
    let keyMap = key.map((item) => {
      let val = localStorage.getItem(item)
      val = JSON.parse(val)
      console.log(val)
      arr.push(val)
    })
    this.setState({
      film: arr
    })
}


  render() {
      return (
        <div>
          {1}
        </div>
      )

  }
}