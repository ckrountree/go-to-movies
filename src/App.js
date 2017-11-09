import React, { Component } from 'react';
import camera from './camera.png';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  constructor() {
    super();
    this.changeSearch = this.changeSearch.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
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

  onSearchSubmit(event) {
    event.preventDefault();
    this.changeSearch(event.target.search.value);
  }
  // same as above but can take out the bind in the constructor...new way
  // onSearchSubmit = event => {
  //   event.preventDefault();
  //   this.changeSearch(event.target.search.value);
  // }

  render() {
    const { search, movies, loading } = this.state;

    const list = (
      <div className="flexbox">
        <ul>
          {movies.map(film => (
            <li key={film.imdbID}>
              <h4>{`${film.Title} (${film.Year})`}</h4>
              <img src={film.Poster} alt="" /> 
            </li>
          ))} 
        </ul>
      </div>
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

        <form onSubmit={this.onSearchSubmit}>
          <div className="search-label">
            <label style={{ search, padding: '200px' }}>
            Search:
              <input name="search"  
                changeSearch={({ target }) => this.changeSearch(target.value)} />
            </label>
            <input className="submit" type="submit" value="Submit" />
          </div>
        </form>
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
