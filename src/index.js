import React from 'react';
import ReactDOM from 'react-dom';
import Resume from './components/Resume';
import registerServiceWorker from './utils/registerServiceWorker';

ReactDOM.render(<Resume />, document.getElementById('root'));
registerServiceWorker();
