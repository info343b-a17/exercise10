import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Reducer } from 'redux-testkit'; //helper

//solution classes
import App from  '../problem-a/src/App';
import * as actions from '../problem-a/src/actions.js';
import reducer from '../problem-a/src/reducers.js';

//problem config
const JS_FILE_PATH_ROOT = 'problem-a/src/';

//my custom matchers
const styleMatchers = require('../lib/style-matchers.js');
expect.extend(styleMatchers);

//Enzyme config
Enzyme.configure({ adapter: new Adapter() });

/* test data */

const SAMPLE_TASKS = [
  {id:1, description: "sample task A", complete: false},
]

/* Begin the tests */

describe('Source code is valid', () => {
  test('JavaScript lints without errors', async () => {
    const sources = ['index.js','App.js', 'actions.js', 'reducers.js'].map((src) => JS_FILE_PATH_ROOT+src);
    const linterOptions = {}; //this should be sufficient with other fields
    sources.forEach((source) => {
      expect([source]).toHaveNoEsLintErrors(linterOptions); //test each
    })
  })
});

describe('Redux store', () => {
  it('specifies Action types', () => {
    expect(actions.ADD_TASK).toBeDefined();
    expect(actions.TOGGLE_TASK).toBeDefined();
    expect(actions.TOGGLE_SHOW_CURRENT).toBeDefined();
  })

  it('specifies Action Creators', () => {
    //produce correct actions
    expect(actions.addTask('adding tests'))
      .toEqual({type: actions.ADD_TASK, description: 'adding tests'})

    expect(actions.toggleTask(343))
      .toEqual({type: actions.TOGGLE_TASK, taskId: 343})

    expect(actions.toggleShowCurrent())
      .toEqual({type: actions.TOGGLE_SHOW_CURRENT})
  })

  describe('underlying Reducer', () => {

    it('handles ADD_TASK actions', () => {
      let action = {type: actions.ADD_TASK, description: 'adding tests'};
      let result = {
        tasks: [{id:1, description: "adding tests", complete: false}],
        showOnlyCurrent: false
      };
      Reducer(reducer).expect(action).toReturnState(result);
    })

    it('handles TOGGLE_TASK actions', () => {
      let action = {type: actions.TOGGLE_TASK, taskId: 1};
      let initial = {
        tasks: [{id:1, description: "adding tests", complete: false}],
        showOnlyCurrent: false
      };
      let result = {
        tasks: [{id:1, description: "adding tests", complete: true}],
        showOnlyCurrent: false
      };
      Reducer(reducer).withState(initial).expect(action).toReturnState(result);
    })

    it('handles TOGGLE_SHOW_CURRENT actions', () => {
      let action = {type: actions.TOGGLE_SHOW_CURRENT};
      let initial = {
        tasks: [{}],
        showOnlyCurrent: false
      };
      let result = {
        tasks: [{}],
        showOnlyCurrent: true
      };
      Reducer(reducer).withState(initial).expect(action).toReturnState(result);
    })
  })
});

describe('Task list app', () => {
  let wrapper, store;

  beforeAll(() => {
    //make a store
    store = createStore(reducer, { 
      tasks: SAMPLE_TASKS,
      showOnlyCurrent: false
    });
  });

  it('renders without crashing', () => {
    //make sure it can be rendered (hand it provider if needed)
    wrapper = mount(<Provider store={store}><App /></Provider>);
  });

  it('adds new tasks on form submission', () => {
    //submit the form
    wrapper.find('input').simulate('change',{target:{value:'simulated task'}});
    wrapper.find('AddTaskForm').find('button').simulate('click');

    //should now show the task; testing rendering output!
    let tasks = wrapper.find('Task');
    expect(tasks.length).toBe(SAMPLE_TASKS.length+1); //should include extra task
    let newTask = tasks.last();
    expect(newTask.text()).toEqual('simulated task'); //text is right
    expect(newTask.find('li').hasClass('font-strike')).toBe(false); //not complete
  })

  it('marks tasks as complete on click', () => {
    //click on the first task; testing rendered output!
    let task = wrapper.find('Task').first().find('li');
    expect(task.hasClass('font-strike')).toBe(false); //starts out incomplete

    task.simulate('click');
    task = wrapper.find('Task').first().find('li'); //latest version
    expect(task.hasClass('font-strike')).toBe(true); //now complete    
  })

  it('shows current on button press', () => {

    //prep, add a new incomplete task
    wrapper.find('input').simulate('change',{target:{value:'bonus task'}});
    wrapper.find('AddTaskForm').find('button').simulate('click');
    expect(wrapper.find('Task').length).toBe(3); //currently have three items

    wrapper.find('.btn-warning').simulate('click'); //click "show current"
    expect(wrapper.find('Task').length).toBe(1); //only one shown
    expect(wrapper.find('Task').text()).toEqual('simulated task'); //first incomplete

    wrapper.find('.btn-warning').simulate('click'); //again
    expect(wrapper.find('Task').length).toBe(3); //now shows all (toggle)  
  })

  it('is connected to a Redux store via react-redux', () => {
    //prep
    wrapper.find('.btn-warning').simulate('click'); //toggle one more time   

    expect(store.getState()).toEqual({
      tasks: [
        {"complete": true, "description": "sample task A", "id": 1},
        {"complete": false, "description": "simulated task", "id": 2},
        {"complete": false, "description": "bonus task", "id": 3}
      ],
      showOnlyCurrent: true,       
    }); //what store should be at this point
  })
})
