import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
    find as _find
} from 'lodash-es';

import ActorItem from './actor-item';


class FilmItem extends Component {
    parseFormat(char) {
        switch (char) {
            case 'v':
                return 'VHS';
            case 'd':
                return 'DVD';
            case 'b':
                return 'Blu-Ray';
            default:
                return undefined;
        }
    }

    render() {
        const { films } = this.props;
        const { actors } = this.props;
        const { pk } = this.props.match.params;

        const film = _find(films, ['pk', +pk]);

        return (
            <div className='container'>
                <div className='page-header'>
                    <h1>{ film.title }</h1>
                </div>
                <dl className='dl-horizontal'>
                    <dt>Year:</dt>
                    <dd>{ film.year }</dd>
                    <dt>Format:</dt>
                    <dd>{ this.parseFormat(film.format) }</dd>
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
                <div className='btn-toolbar'>
                    <Link to={ `/edit/${ pk }` } className='btn btn-primary'>Edit</Link>
                    <Link to={ `/delete/${ pk }` } className='btn btn-danger'>Delete</Link>
                </div>
            </div>
        )
    }
}

export default FilmItem
