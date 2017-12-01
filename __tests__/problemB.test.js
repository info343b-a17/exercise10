import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {StyleSheetTestUtils} from 'aphrodite';

//solution classes
import FlatButton from  '../problem-b/src/components/FlatButton';
import ActionButton from  '../problem-b/src/components/ActionButton';

//problem config
const JS_FILE_PATH_ROOT = 'problem-b/src/';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

//suppress injection issues/errors from Aphrodite
beforeEach(() => { StyleSheetTestUtils.suppressStyleInjection(); });
afterEach(() => {
  return new Promise(resolve => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
    return process.nextTick(resolve);
  });
});

/* Begin the tests */

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    const sources = ['components/FlatButton.js','components/ActionButton.js'].map((src) => JS_FILE_PATH_ROOT+src);
    const linterOptions = {}; //this should be sufficient with other fields
    sources.forEach((source) => {
      expect([source]).toHaveNoEsLintErrors(linterOptions); //test each
    })
  })
});

//These tests just check that you've made _something_ with CSS-in_JS
//they don't actually check the CSS styling.

describe('FlatButton', () => {
  let wrapper;

  it('renders without crashing', () => {
    wrapper = shallow(<FlatButton/>);
  })

  it('has an Aphrodite-based `btn` class', () => {
    expect(wrapper.find('button').prop('className'))
      .toMatch(/btn_\w+/) //starts with `btn`, with appropriate hash
  })

  it('dark version has Aphrodite class', () => {
    wrapper.setProps({dark:true}); //make dark
    expect(wrapper.find('button').prop('className'))
      .toMatch(/btn_\w+-o_O-dark_\w+/) //`btn` + `dark` classes
  
  })

  it('disabled version has Aphrodite class', () => {
    wrapper.setProps({dark:false, disabled:true});
    expect(wrapper.find('button').prop('className'))
      .toMatch(/btn_\w+-o_O-disabled_\w+/) //`btn` + `disabled` classes
  })
})

describe('ActionButton', () => {
  let wrapper;

  it('renders without crashing', () => {
    wrapper = shallow(<ActionButton/>);
  })

  it('has a `btn` class that is different than FlatButton', () => {
    let actionClass = wrapper.find('button').prop('className');
      expect(actionClass).toMatch(/btn_\w+/) //`btn`

    expect(wrapper.find('button').prop('className'))
      .toMatch(/btn_\w+/) //starts with `btn, with appropriate hash`

    let flat = shallow(<FlatButton/>);
    expect(actionClass).not.toEqual(flat.find('button').prop('className'));

    })

  it('disabled version Aphrodite class', () => {
    wrapper.setProps({dark:false, disabled:true});
    expect(wrapper.find('button').prop('className'))
    .toMatch(/btn_\w+-o_O-disabled_\w+/) //`btn` + `disabled` classes
  })
})
