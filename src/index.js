import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';
import Resume from './components/Resume';
import registerServiceWorker from './utils/registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

render(
  <Provider store={ store }>
    <Resume />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
