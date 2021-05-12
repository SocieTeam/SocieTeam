import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import {BrowserRouter as Router} from 'react-router-dom'
import StateProvider from './components/contexts/StateProvider'

ReactDOM.render(
    <StateProvider>
      <Router>
        <App />
      </Router>
    </StateProvider>,
  document.getElementById('root')
);
