import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css'

/*
设置移动端适配
除以几视口总宽度就是多少rem，现在为750rem
*/
document.documentElement.style.fontSize = 100 / 750 + 'vw'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
