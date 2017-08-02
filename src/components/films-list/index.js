import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import {
    bindAll as _bindAll,
    intersection as _intersection
} from 'lodash-es';

import './style.css';

import ListItem from './list-item';


class FilmsList extends Component {
    constructor(props) {
        super(props);

        _bindAll(this, [
            '_handleSearchChange',
            '_handleSearchClear',
            '_handleOrder'
        ]);

        this.state = {
            search: ''
        }
    }

    _handleSearchChange(e) {
        this.setState({
            search: e.target.value.trim()
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

    render() {
        const { search } = this.state;
        const { order_by, order, deleteFilmItem, showStatus } = this.props;
        let { films, actors } = this.props;

        if (search) {
            const filtered_actors = actors.filter(item => {
                return item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
            });

            films = films.filter(item => {
                return item.title.toLowerCase().indexOf(search.toLowerCase()) >= 0 ||
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
