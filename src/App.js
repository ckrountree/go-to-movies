import React, { Component } from 'react';
import camera from './camera.png';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  constructor() {
    super();
    this.state= {
      movies: [],
      search: 'Lady',
      loading: false
    };
  }
  componentDidMount() {
    this.loadSearch(this.state.search); 
  }

  async loadSearch(search) {
    this.setState({ loading: true });
    const response = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&s=${search}`);
    const body = await response.json();
    this.setState({
      movies: body.Search,
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

    const list = (
      <ul>
        {movies.map(film => (
          <li key={film.imdbID}>
            {`${film.Title} (${film.Year})`}
            <img src={film.Poster} alt="" /> 
          </li>
        ))} 
      </ul>
    );

    const load = <div>Loading...</div>;

    return (
      <section>
        <div className="App">
          <header className="App-header">
            <img className="App-img" src={camera} alt="" />
            <h1 className="App-title">Roll That Footage</h1>
          </header>
        </div>

        <div>
          <label style={{ search, padding: '250px', textAlign: 'center' }}>
            search:
            <input name="search" value={search} 
              changeSearch={({ target }) => this.changeSearch(target.value)} />
          </label>
        </div>
        <img src={movies.poster} alt={movies.Title} />

        <div>
          <div>{movies.length} {search}</div>
          {loading ? load : list}
        </div>

      </section>
    );
  }
}

export default App;
