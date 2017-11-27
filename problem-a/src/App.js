import React, { Component } from 'react';

const SAMPLE_TASKS = [
  {id:1, description:'Make a task list', complete:true},
  {id:2, description:'Make another one', complete:true},
  {id:3, description:'Make a task list with Redux', complete:false}, 
];


class App extends Component {
  constructor(props){
    super(props)
    this.state = { 
      tasks: SAMPLE_TASKS,
      showOnlyCurrent: false
    };
  }

  toggleFinished(taskId){
    let updatedTasks = this.state.tasks.map((task) => {
      if(task.id === taskId){
        task.complete = !task.complete; //toggle
      }
      return task;
    })

    this.setState({tasks:updatedTasks});
  }

  addTask(description){
    let newTask = {
      taskId:this.state.tasks.length+1,
      description: description,
      complete: false
    }

    let updatedTasks = this.state.tasks.concat(newTask);
    this.setState({tasks:updatedTasks});
  }

  toggleShowCurrent() {
    this.setState({showOnlyCurrent : !this.state.showOnlyCurrent});
  }

  render() {
    return (
      <div className="container">
        <p className="lead">Things I have to do...</p>
        <TaskList
          tasks={this.state.tasks}
          showOnlyCurrent={this.state.showOnlyCurrent}
          toggleCallback={(taskId) => {this.toggleFinished(taskId)}}
          />
        <AddTaskForm addTaskCallback={(descr) => {this.addTask(descr)}} />
        <button 
          className="btn btn-warning mt-2"
          onClick={()=>this.toggleShowCurrent()}
          >
            {this.state.showOnlyCurrent ? 'Show All Tasks' : 'Show Current Task'}
        </button>
      </div>
    );
  }
}

class TaskList extends Component {
  render() {

    if(this.props.tasks == null) return null;

    let taskIds = Object.keys(this.props.tasks); //to iterate

    //filter to only include the "current" task
    if(this.props.showOnlyCurrent){
      taskIds = taskIds
        .filter((id) => !this.props.tasks[id].complete)
        .slice(0);
    }

    let taskItemsArray = taskIds.map((id) => {
      let task = this.props.tasks[id];
      return <Task
                key={id}
                task={task}
                toggleFinishedCallback={ this.props.toggleFinishedCallback }
                />;
    })
    return (
      <ol>
        {taskItemsArray}
      </ol>
    );
  }
}

class Task extends Component {

  handleClick() {
    this.props.toggleFinishedCallback(this.props.task.id);
  }

  render() {
    let className = this.props.task.complete ? 'font-strike' : '';
    return (
      <li className={className} onClick={() => {this.handleClick()} }>
        {this.props.task.description}
      </li>
    );
  }
}

class AddTaskForm extends Component {
  constructor(props){
    super(props);
    this.state = {value: ''}; //initial state
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleClick(event){
    event.preventDefault();
    this.props.addTaskCallback(this.state.value);
    this.setState({value:''}); //reset once finished
  }

  render() {
    return (
      <form>
        <input
          className="form-control mb-3"
          placeholder="What else do you have to do?"
          value={this.state.value}
          onChange={(event) => {this.handleChange(event) } }
          />
        <button
          className="btn btn-primary"
          onClick={(event) => {this.handleClick(event)}}
          >
            Add task to list
        </button>
      </form>
    );
  }
}

export default App;