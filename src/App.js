import React, { Component } from 'react';
import camera from './images/camera.png';
import Search from './Search';
import './App.css';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class App extends Component {
  constructor() {
    super();
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
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
    const response = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&s=${search}`);
    const body = await response.json();
    this.setState({
      movies: body.Response === 'True' ? body.Search : [],
      loading: false
    });
  }

  onChangeSearch(search) {
    this.setState({ search }, () => {
      this.loadSearch(search);
    });
  }

  onSearchSubmit(event) {
    event.preventDefault();
    this.onChangeSearch(event.target.search.value);
  }

  render() {
    const { search, movies, loading } = this.state;

    const list = (
      <div className="wrapper">
        {movies.map(film => (
          <div key={film.imdbID}>
            <h4>{`${film.Title} (${film.Year})`}</h4>
            <h6>IMDB Link: <a href={'http://www.imdb.com/title/' + film.imdbID}>{film.Title} </a></h6>
            <img src={film.Poster} alt="" /> 
          </div>
        ))} 
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
        <Search onSearch = {this.onSearchSubmit} 
          search = {search} />
        <div className="movies-found">
          <div>Movies Found: {movies.length}</div>
          {loading ? load : list}
          {!search ? <div>Enter a Movie to Start Your Search!</div> : null }
        </div> 
      </section>
    );
  }
}

export default App;
