# Problem A

In this exercise you will practice using the Redux data store to more cleanly implement a React application.

Specifically, you will be modifying the Task List application (yes, that again!) so that it has a (mostly) single source of state information: the Redux store. Note that this version of the Task list contains one extra feature: it is possible to only show the "current" task (which is the first incomplete task in the list), in order to help you focus!

## Running the Program
Because this app is created with React (and scaffolded through Create React App), you will need to install dependencies and run a developer web server in order to transpile and view the application. You can run this server by using the command:

```bash
# must be inside the `problem-a/` folder
cd path/to/problem-a

# install dependencies
npm install  # only once per problem

# run the server
npm start
```

You can then view the rendered page _in a web browser_. Remember to check the Developer console for any errors!


## Exercise Instructions
To complete the exercise, edit the included **`src/App.js`** and **`src/index.js`** files and add in the required code. You will also be required to create two other modules: **`src/actions.js`** and **`src/reducers.js`**.

- While a better architecture would be to use separate modules for each component (e.g., `TaskList.js`) and you are welcome to refactor the program as such, these instructions assume that your components are defined entirely within `App.js`.

Note: these instructions mostly mirror the tutorial found in the [official Redux documentation](https://redux.js.org/docs/basics/), which you can use as a reference.

1. In order to interact with a Redux store, you will need to send it [**Actions**](https://redux.js.org/docs/basics/Actions.html); and since state is all about interaction, you can start by defining those Actions (e.g., what will your App _do_). Create a new module file in the `src/` folder called **`actions.js`**, which will be used to define your Actions.

    Begin by defining and _exporting_ three constants, each representing one of the Actions that you will need to take: `ADD_TASK` for adding a task, `TOGGLE_TASK` for toggling a task's completion, and `TOGGLE_SHOW_CURRENT` for toggling if the app should show just the "current" task (the first incomplete task). Note that these constants can have any (unique, enumerable) values; providing a string (e.g., `add_task`) is the most idiomatic.

2. For convenience in `actions.js` you should also define and _export_ three [**Action Creator**](https://redux.js.org/docs/basics/Actions.html#action-creators) functions, which are helper functions that will return an "Action" object with the appropriate properties.

    - `addTask()` should take in a task description and return an object (a `{}`) with a `type` of `ADD_TASK` (that's the type of action) and a `description` of that task.
    - `toggleTask()` should take in a task id number and return an object with a `type` of `TOGGLE_TASK` and a `taskId` of which task to toggle.
    - `toggleShowCurrent()` should return an object with the appropriate `type` (no extra properties are needed).

    **Note** you can use `import * as Actions ...` in order to easily import all of the action creators, allowing you to refer to each as e.g., `Action.addTask()`.

3. Once you have Actions defined, you can begin defining the Redux store that will respond to those actions. A Redux store is defined by its [**Reducer**](https://redux.js.org/docs/basics/Reducers.html) function, which specifies how it will change state based on an action. Create a new file module **`src/reducers.js`** to define this reducer.

    Your file should define **two** reducer functions (you will need to `import` the Action constants you defined in `actions.js`):

    1. `taskReducer()` should take in a "state" that is an array (of tasks), as well as the action to perform. If the action is `ADD_TASK`, it should return a _new_ array that includes all of the tasks, as well as a new one with `description` in the Action. Note that you can basically move the `addTask()` function from `App` into this reducer, though you will need to copy the array to return it (try using the `...` spread operator).
        
        If the action is `TOGGLE_TASK`, it should return a _new_ array which includes all of the tasks, but where the one specified by the Action's `taskId` has its `complete` property toggled. Again, use the `toggleFinished()` function from `App` as a template, except you will need to create a "copy" of the object with an altered `complete`. Use `Object.assign()`,

        If the task is something else, you should just return the state passed into the reducer, unchanged. Note that your reducer should specify that the state is, by default an empty array `[]`.
    
    2. `showCurrentReducer()` should take in a "state" that is a boolean value. If the action is `TOGGLE_SHOW_CURRENT`, it should return a toggled version of the state. Otherwise, it should just return the state unmodified. The "state" should default to be `false`.

    Once you've defined these reducer functions, use the **`combineReducers()`** function from the `redux` module to combine them into a single function. The `taskReducer` should be assigned to a property `tasks`, and the `showCurrentReducer` should be assigned to a property `showOnlyCurrent` (to match which properties of the overall state they will be modifying).

    Be sure and export the combined reducer!

4. Once you have the reducer, you can create the Redux [**Store**](https://redux.js.org/docs/basics/Store.html). Inside **`src/App.js`** (at the "top-level", not inside a component), use the **`createStore()`** function from the `redux` module to create a new variable **`store`**. Pass this function your combined reducer (that you exported from `reducers.js`), and an "initial value" that is an object with the same properties you use to initialize the `App` state.

5. Connect the `App` component's interaction to the `store` by having each callback method (`addTask()`, `toggleFinished()`, and `toggleShowCurrent()`) _also_ **`dispatch()`** an appropriate Action to the store (in addition to their normal behavior). Use the Action Creators you defined in `actions.js`!

    If you log out the `store.getState()` after each `dispatch()`, you should be able to see the Redux store updating as expected, along side the `App`.

6. Since the Redux store is now handling the state updating, you can remove that logic from the `App` component! Make the following changes:

    - The App's `state` should initialize as the store's initial state value (use `store.getState()`).
    - The event callbacks (`addTask()`, etc.) should ___only___ `dispatch()` an action; remove all other logic from them.
    - Add a `componentDidMount()` callback, in which you should call **`subscribe()`** on the `store` in order to register a listener for changes to the Redux store. This listener's callback function should just assign the store's current state to the App's state (using `setState()`). This will cause the App to simply mirror the Redux store, and all the correct props will be passed in.

    Once you've made these changes, the `App` should work exactly as it did before (try to add and toggle tasks). But look how much cleaner the `App` code is!

    (This is a good time to commit your work).

7. Wait there's more! You can make the `App` even simpler/cleaner by using the [`react-redux`](https://redux.js.org/docs/basics/UsageWithReact.html) bindings to make the `store` automatically associated with your components and have the `state` automatically be passed in as props.

    - _Warning:_ this set of changes will "break" the App until you've implemented them all.

    In order to make the Redux `store` globally available to all components without passing it in directly, move your `store` variable (along the `SAMPLE_TASKS` and any associated `import` statements) into **`src/index.js`**.

    Modify the `ReactDOM.render()` call so that it renders the `<App>` as a child of the **`<Provider>`** component from the `react-redux` library. The `<Provider>` should be passed a `store` prop that is the `store` you created.

8. Back in `App.js`, you will need to specify the relationship between the Redux store and your components&mdash;in effect, you will "move state up" and so all of the functionality of `App` will just be passed in as props _automatically_. You do this by defining two functions (at the bottom of `App.js`, not inside a component):

    - **`mapStateToProps()`** should take in a `state` object, and return the values that you want to pass as "props" to each component based on that state. Since the App is set up so that the `state` property names and the `props` property names are mostly identical, this can almost just return the given `state`.

        However, if the `showOnlyCurrent` property is `true`, then the `tasks` prop rendered by the `TaskList` component only needs to contain the first incomplete task. In this case, the `mapStateToProps()` function should return an object whose `tasks` property is an array that contains _only_ that task (if any), and whose `showOnlyCurrent` property is the current state's version. 
        
        - You can "filter" for the current task by using the logic from the `TaskList` component, and in fact you should delete that logic _from_ `TaskList`, simplifying it!

    - **`mapDispatchToProps()`** should take in a `dispatch` function as a parameter, and will return an object containing what "callback functions" you want to pass in as props (since each of these will just `dispatch()` and action to the store). The returned object (`{}`) should contain the following properties:

        - `toggleFinishedCallback` should be a function that takes in a `taskId` and dispatches a `toggleTask()` action (similar to the `App#toggleFinished()` method).
        - `addTaskCallback` should be a function that has the same signature and behavior as `App#addTask()`.
        - `toggleShowCurrent` should be a function that has the same signature and behavior as `App#toggleShowCurrent()`

9. Once you have these two functions, pass them as arguments to the **`connect()`** function from the `react-redux` library. This will return a _new function_ used to connect a Component to the Redux Store; assign this resulting function to a new variable (e.g., `connectComponent`).

    You can then create "connected" versions of your Components by passing them into your `connectComponent()` function. For example:

    ```js
    //create connected version of App
    const ConnectedApp = connectComponent(App);
    ```

    You should create connected versions of `App` (`ConnectedApp`), `TaskList` (`ConnectedTaskList`), and `AddTaskForm` (`ConnectedAddTaskForm`); these are the three components that will need to access the Redux store.

10. Finally, export `ConnectedApp` as the `default export` instead of `App`, meaning that the version rendered in `index.js` will be connected.

11. Modify the `App` component so that it renders the connected versions of `TaskList` and `AddTaskForm` instead. **The benefit is** that because `ConnectedTaskList` and `ConnectedAddTaskForm` have been connected with a set of "dispatch" and "state" props, you don't need to explicitly pass props or callbacks into these components from `App`!

    This also means that you can just delete the `addTask()`, `toggleFinished()`, and `toggleShowCurrent()` methods, since they are now specified in the "connection".

    And because `App` is also Connected, it will be passed the "state" as a prop, meaning it doesn't need to track it! Delete the constructor (you don't need to initialize `state`) and the `componentDidMount()` callback (you don't need to set state)&mdash;leaving you with the appearance of a "pure" stateless `App`!

    - Note that you'll need to change references to the refer to the props: `this.toggleShowCurrent()` will become `this.props.toggleShowCurrent()`, and `this.state.showOnlyCurrent` will become `this.props.showOnlyCurrent`.


And that's it! At this point your app should work _exactly the same_, but you've simplified your React work (and created a single source of truth that can easily be persisted or connected to a database).


## Testing
Coming soon (maybe)...