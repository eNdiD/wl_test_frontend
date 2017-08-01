import React, { Component } from 'react';
import {
    find as _find
} from 'lodash-es';

import ActorItem from './actor-item';


class FilmItem extends Component {
    render() {
        const { films } = this.props.filmsList;
        const { actors } = this.props.actorsList;
        const { pk } = this.props.match.params;

        const film = _find(films, ['pk', +pk]);

        return (
            <div className='container'>
                <h2>{ film.title }</h2>
                <dl className='dl-horizontal'>
                    <dt>Year:</dt>
                    <dd>{ film.year }</dd>
                    <dt>Format:</dt>
                    <dd>{ film.format }</dd>
                    <dt>Starring:</dt>
                    <dd>
                        {
                            film.actors.map(actor_pk =>
                                <ActorItem
                                    key={ actor_pk }
                                    pk={ actor_pk }
                                    actors={ actors }/>
                            )
                        }
                    </dd>
                </dl>
            </div>
        )
    }
}

export default FilmItem
