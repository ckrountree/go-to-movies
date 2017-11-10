import React, { Component } from 'react';

const omdbKey = process.env.REACT_APP_OMDB_API_KEY;

class Plot extends Component {

    async loadPlot(plot) {
        this.setState({ loading: true });
        const response = await fetch(`http://www.omdbapi.com/?apikey=${omdbKey}&t=${plot}`);
        const body = await response.json();
        this.setState({
            plot:[body.Plot],
            loading: false
        });
    }

    handlePlotChange(event) {
        this.setState({plot: event.target.value});
    }

    onFilmClick(event) {
        event.preventDefault();
        this.handlePlotChange(event.target.plot.value);
    }

    render() {
        const { plot } = this.state;    

return (

);
}
}

export default Plot;