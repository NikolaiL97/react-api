import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';
import FilmList from '../film-list/film-list';
import SearchFilm from '../search-film/search-film';
import debounce from 'lodash.debounce';


export default class App extends Component {
  state = {
    searchFilm: null,
  }

  onLabelChange = (e) => {
    if (this.state.searchFilm !== e.target.value) {
      this.setState({
        searchFilm: e.target.value,
      });
     console.log('APP ' + this.state.searchFilm)
    }
  
    // this.updateFilm()
  };


onLabelChange = debounce(this.onLabelChange, 800)
  render() {
    const val = this.state.searchFilm
    return (
      <>
        <Online>
          <section className="todoapp">
            <header className="header" />
            <section className="main">
              <SearchFilm 
              val={this.val}
              onLabelChange={this.onLabelChange}/>
              <FilmList 
                val = {val}
              />

            </section>

          </section>
        </Online>
        <Offline>
          <span>Нет сети, проверьте подключение к интернету!</span>
        </Offline>
      </>
    );
  }
  
}


// import React from 'react';
// import { Flex, Radio } from 'antd';
// const baseStyle = {
//   width: '25%',
//   height: 54,
// };

// const App = () => {
//     const [value, setValue] = React.useState('horizontal');
//     return (
//       <Flex gap="middle" vertical>
//         <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
//           <Radio value="horizontal">horizontal</Radio>
//           <Radio value="vertical">vertical</Radio>
//         </Radio.Group>
//         <Flex vertical={value === 'vertical'}>
//           {Array.from({
//             length: 2,
//           }).map((_, i) => (
//             <div
//               key={i}
//               style={{
//                 ...baseStyle,
//                 backgroundColor: i % 2 ? '#1677ff' : '#1677ffbf',
//               }}
//             />
//           ))}
//         </Flex>
//       </Flex>
//     );
//   };
//   export default App;
