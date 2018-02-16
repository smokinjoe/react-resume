export const LOAD_RESUME = 'LOAD_RESUME';

export const loadResume = () => (dispatch) => _loadResume(dispatch);

const _loadResume = (dispatch) => {
  const json = require('../resume.json');

  dispatch({
    type: LOAD_RESUME,
    data: json
  });
};