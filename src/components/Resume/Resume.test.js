import React from 'react';
import ReactDOM from 'react-dom';
import expect from 'expect';
import Resume from './Resume';

// const { TestUtils } = React.addons;
import ReactTestUtils from 'react-dom/test-utils';
import ShallowRenderer from 'react-test-renderer/shallow';

// import jsdom from 'jsdom';
// import ExecutionEnvironment from 'react/lib/ExecutionEnvironment';
// if (!global.document || !global.window) {
//   global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
//   global.window = document.defaultView;
//   global.navigator = window.navigator;
//
//   ExecutionEnvironment.canUseDOM = true;
//
//   window.addEventListener('load', () => {
//     console.log('JSDom setup completed: document, window and navigator are now on global scope.');
//   });
// }

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

    it('does something', () => {
      expect(0).toBe(0);
    });

    it('renders without crashing', () => {
      setup({
        edit: false
      });
      const div = document.createElement('div');
      ReactDOM.render(<Resume />, div);
      ReactDOM.unmountComponentAtNode(div);
    });

  });
});





