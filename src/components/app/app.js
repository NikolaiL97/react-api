import React from 'react';
import FilmList from '../film-list/film-list';
import { Offline, Online } from 'react-detect-offline';

function App() {
  return (
    <React.Fragment>
    <Online>
      <section className="todoapp">
        <header className="header" />
        <section className="main">
          <FilmList />
        </section>
      </section>
    </Online>
    <Offline>
      <span>Нет сети, проверьте подключение к интернету!</span>
    </Offline>
    </React.Fragment>

    
  );
}

export default App;

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
