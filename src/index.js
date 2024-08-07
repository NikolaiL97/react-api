import { createRoot } from 'react-dom/client';
import App from './components/app/app';
import React from 'react';

const container = document.getElementById('root');
const body = createRoot(container);

body.render(<App />);

// sokr()

// import React, { useState } from 'react';
// import { DatePicker, message } from 'antd';
// import { createRoot } from 'react-dom/client';

// import './index.css';

// const App = () => {
//   const [date, setDate] = useState(null);
//   const [messageApi, contextHolder] = message.useMessage();
//   const handleChange = (value) => {
//  messageApi.info(`Selected Date: ${value ? value.format('YYYY-MM-DD') : 'None'}`);
//     setDate(value);
//   };
//   return (
//     <div style={{ width: 400, margin: '100px auto' }}>
//       <DatePicker onChange={handleChange} />
//       <div style={{ marginTop: 16 }}>
//  Selected Date: {date ? date.format('YYYY-MM-DD') : 'None'}
//       </div>
//       {contextHolder}
//     </div>
//   );
// };

// createRoot(document.getElementById('root')).render(<App />)
