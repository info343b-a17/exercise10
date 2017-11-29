import React, { Component } from 'react';

export default class ActionButton extends Component {
  render() {
    return (
      <button>{this.props.children}</button>
    )
  }
}