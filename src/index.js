import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Resume from './Resume';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Resume />, document.getElementById('root'));
registerServiceWorker();
