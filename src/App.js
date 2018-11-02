import React, { Component } from 'react';
import Face from './Face/Face.js'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  } 
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    //console.log("<APP.js<updateWindowDimensions()>>updated window dimensions: " +  this.state.width +"," + this.state.height);
  }
  render() {
    return (
      <div className="App">
        <Face width={this.state.width} height={this.state.height} /> 
      </div>
    );
  }
}

export default App;
