import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
    bindAll as _bindAll,
    forEach as _forEach,
    find as _find,
    filter as _filter,
    intersection as _intersection,
    remove as _remove
} from 'lodash-es';

import './style.css';

import ListItem from './list-item';


class FilmsList extends Component {
    constructor(props) {
        super(props);

        _bindAll(this, [
            '_handleSearchChange',
            '_handleSearchClear',
            '_handleOrder',
            '_handleFileUpload'
        ]);

        this.state = {
            search: ''
        }
    }

    _handleSearchChange(e) {
        this.setState({
            search: e.target.value
        });
    }

    _handleSearchClear() {
        this.setState({
            search: ''
        });
    }

    _handleOrder(e) {
        const order_by = e.target.getAttribute('data-order-by')

        this.props.changeOrder(order_by);
    }

    _handleFileUpload(e) {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                let content = reader.result;

                const pattern = /Title: (.*)\nRelease Year: (\d{4})\nFormat: (.*)\nStars: (.*)/g;
                let match;

                while ((match = pattern.exec(content)) !== null) {
                    const actors = match[4].split(',').map(actor => actor.trim());

                    _forEach(actors, actor => {
                        if (!_find(this.props.actors, ['name', actor])) {
                            this.props.addActorItem({ name: actor });
                        }
                    });
                }

                setTimeout(() => {
                    while ((match = pattern.exec(content)) !== null) {
                        const actors = match[4].split(',').map(actor => actor.trim());

                        const actors_arr = actors.map(actor => {
                            return _find(this.props.actors, ['name', actor]).pk
                        });

                        let format = '';
                        switch (match[3]) {
                            case 'VHS':
                                format = 'v';
                                break;
                            case 'DVD':
                                format = 'd';
                                break;
                            case 'Blu-Ray':
                                format = 'b';
                                break;
                        }

                        const data = {
                            title: match[1],
                            year: match[2],
                            format: format,
                            actors: actors_arr
                        }

                        console.log(data);

                        this.props.addFilmItem(data);
                        this.props.showStatus('Movies successfuly added!');
                    }
                }, 1000);
            }
            reader.readAsText(file);
        }

        e.target.value = '';
    }

    render() {
        const { search } = this.state;
        const { order_by, order, deleteFilmItem, showStatus } = this.props;
        let { films, actors } = this.props;

        if (search) {
            const filtered_actors = actors.filter(item => {
                return item.name.toLowerCase().indexOf(search.toLowerCase().trim()) >= 0;
            });

            films = films.filter(item => {
                return item.title.toLowerCase().indexOf(search.toLowerCase().trim()) >= 0 ||
                    _intersection(item.actors, filtered_actors.map(item => item.pk)).length
            });
        }

        const btnOrderClasses = classNames({
            'order-icon': true,
            'glyphicon': true,
            'glyphicon glyphicon-chevron-down': order === 'asc',
            'glyphicon glyphicon-chevron-up': order === 'desc'
        });

        return (
            <div className='container'>
                <div className='page-header'>
                    <h1>Movies list</h1>
                </div>
                <div className='clearfix'>
                    <div className='btn-toolbar pull-left'>
                        <Link to='/add' className='btn btn-primary'>Add New</Link>
                        <label className='file-uploader btn btn-primary'>
                            Load from file
                            <input
                                type='file'
                                accept='.txt'
                                onChange={ this._handleFileUpload }/>
                        </label>
                    </div>
                    <div className='pull-right form-inline search-form'>
                        <input
                            type='text'
                            className='form-control'
                            value={ this.state.search }
                            placeholder='Search'
                            onChange={ this._handleSearchChange }/>
                        <button
                            type='button'
                            className='btn-clear-search'
                            onClick={ this._handleSearchClear }>
                                <span className='glyphicon glyphicon-remove'/>
                            </button>
                    </div>
                </div>
                <hr/>
                <table className='table'>
                    <thead>
                        <tr>
                            <th className='films-title'>
                                <button
                                    type='button'
                                    className='btn-sort'
                                    data-order-by='title'
                                    onClick={ this._handleOrder }>Title</button>
                                {
                                    order_by === 'title' ?
                                    <span className={ btnOrderClasses }/> :
                                    ''
                                }
                            </th>
                            <th className='films-year'>
                                <button
                                    type='button'
                                    className='btn-sort'
                                    data-order-by='year'
                                    onClick={ this._handleOrder }>Year</button>
                                {
                                    order_by === 'year' ?
                                    <span className={ btnOrderClasses }/> :
                                    ''
                                }
                            </th>
                            <th className='films-actions'>Ations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            films.map(item =>
                                <ListItem
                                    key={ item.pk }
                                    item={ item }
                                    deleteFilmItem={ deleteFilmItem }
                                    showStatus={ showStatus }/>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FilmsList
