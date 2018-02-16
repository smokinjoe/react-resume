import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Resume from './components/Resume';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Resume />, document.getElementById('root'));
registerServiceWorker();
