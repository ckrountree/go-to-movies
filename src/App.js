import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

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
    const { search, movies, loading } = this.state;
    const choices = ['title', 'plot', 'release year'];

    const list = (
      <ul>
        {movies.map(item => <li key={item.name}>{item.name}</li>)}
      </ul>
    );

    const load = <div>Loading...</div>;

    return (
      <section>
        <div className="App">
          <header className="App-header">
            <img src={'./camera.png'} alt="" />
            <h1 className="App-title">Roll That Footage</h1>
          </header>
        </div>

        <div>
          {choices.map(choice => {
            return <button key={choice} disabled={choice === search}
              onClick={() => this.changeSearch(choice)}
            >
              {choice}
            </button>;
          })}
          <div>{movies.length} {search}</div>
          {loading ? load : list}
        </div>
      </section>
    );
  }
}

export default App;
