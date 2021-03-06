import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { find as _find } from 'lodash-es';

import FilmForm from '../film-form';


class EditFilm extends Component {
    render() {
        const { pk } = this.props.match.params;

        return (
            <div className='container'>
                <div className='page-header'>
                    <h1>Edit Movie</h1>
                </div>
                <div className='panel'>
                    <FilmForm
                        actors={ this.props.actors }
                        films={ this.props.films }
                        editFilmItem={ this.props.editFilmItem }
                        showStatus={ this.props.showStatus }
                        addActorItem={ this.props.addActorItem }
                        deleteActorItem={ this.props.deleteActorItem }
                        method='PUT'
                        film={ _find(this.props.films, ['pk', +pk]) }/>
                </div>
            </div>
        )
    }
}

export default withRouter(EditFilm);
