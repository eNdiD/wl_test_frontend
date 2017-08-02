import React, { Component } from 'react';

import FilmForm from '../film-form';


class AddFilm extends Component {
    render() {
        return (
            <div className='container'>
                <div className='page-header'>
                    <h1>Add Movie</h1>
                </div>
                <div className='panel'>
                    <FilmForm
                        actors={ this.props.actors }
                        films={ this.props.films }
                        addFilmItem={ this.props.addFilmItem }
                        showStatus={ this.props.showStatus }
                        addActorItem={ this.props.addActorItem }
                        deleteActorItem={ this.props.deleteActorItem }
                        method='POST'/>
                </div>
            </div>
        )
    }
}

export default AddFilm;
