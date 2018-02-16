import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import Resume from './components/Resume';
import registerServiceWorker from './utils/registerServiceWorker';

let store = createStore(reducers);

render(
  <Provider store={ store }>
    <Resume />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
