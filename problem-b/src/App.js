import React, { Component } from 'react';

import FlatButton from './components/FlatButton';
import ActionButton from './components/ActionButton';

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <FlatButton>Press me!</FlatButton>
          {' ' /* manual spacing */}
          <FlatButton dark>Press Me! (Dark)</FlatButton>
          {' '}
          <FlatButton disabled>Don't Press Me!</FlatButton>
          {' '}
          <ActionButton>+</ActionButton>
          {' '}
          <ActionButton disabled>+</ActionButton>
        </div>
      </div>
    );
  }
}

export default App;