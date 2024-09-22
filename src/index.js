import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './components/app/app';

const container = document.getElementById('root');
const body = createRoot(container);

body.render(<App />);
