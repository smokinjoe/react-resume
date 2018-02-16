import { combineReducers } from 'redux';

import {
  LOAD_RESUME
} from '../actions';

const initialResumeState = {
  data: {}
};

const resume = (state = initialResumeState, action) => {
  switch (action.type) {
    case LOAD_RESUME:
      return Object.assign({}, state, {
        data: action.data
      });
    break;
    default:
      return state;
  }
};

const reducers = {
  resume
};

const rootReducer = combineReducers(reducers);
export default rootReducer;