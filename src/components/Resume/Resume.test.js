import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import ReactTestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';
import Resume from './Resume';

/**
 * Mock out the top level Redux store with all the required
 * methods and have it return the provided state by default.
 * @param {Object} state State to populate in store
 * @return {Object} Mock store
 */
function createMockStore(state) {
  return {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => {
      return {...state};
    }
  };
}

/**
 * Render the Resume component with a mock store populated
 * with the provided state
 * @param {Object} storeState State to populate in mock store
 * @return {Object} Rendered output from component
 */
function setup(storeState) {
  let renderer = ShallowRenderer.createRenderer();
  renderer.render(<Resume store={createMockStore(storeState)} />);
  var output = renderer.getRenderedOutput();
  return output.refs.wrappedInstance();
}

describe('components', () => {
  describe('Resume', () => {

    xit('renders without crashing', () => {
      setup({
        edit: false
      });
      const div = document.createElement('div');
      ReactDOM.render(<Resume />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

  });
});





