import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state= {
      movies: [],
      search: '',
      loading: false
    };
  }
  componentDidMount() {
    this.loadSearch(this.state.search); 
  }

  async loadSearch(search) {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/${search}`);
    const body = await response.json();
    this.setState({
      movies: body.results,
      loading: false
    });
  }

  changeSearch(search) {
    this.setState({ search }, () => {
      this.loadSearch(search);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={'./camera.png'} alt="" />
          <h1 className="App-title">Roll That Footage</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
