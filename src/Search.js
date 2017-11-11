import React from 'react';
import reel from './images/reel.ico';

export default function Search({ onSearch, search }) {
  return (
    <form onSubmit={onSearch}>
      <div className="search-label">
        <label style={{ search, padding: '220px' }}>
                    Search Title or Keyword:  
          <input name="search" style={{ marginLeft: '10px' }}
            onChangeSearch={({ target }) => this.onChangeSearch(target.value)} />
          <input className="submit" type="submit" value="Submit" style={{ marginLeft: '10px' }} />
        </label>
      </div>
      <div className="reel">
        <p>
          <img href="" src={reel} alt="" />
            CLICK A POSTER TO SEE THE MOVIE'S SYNOPSIS
        </p>
      </div>
    </form>
  );
}