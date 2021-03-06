import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ListItem extends Component {
    constructor(props) {
        super(props);

        this._handleRemove = this._handleRemove.bind(this);
    }

    _handleRemove() {
        this.props.deleteFilmItem(this.props.item.pk);
        this.props.showStatus('Movie deleted!');
    }

    render() {
        const { pk, title, year } = this.props.item;

        return (
            <tr>
                <td>
                    <Link to={ `/film/${ pk }` }>{ title }</Link>
                </td>
                <td>{ year }</td>
                <td>
                    <div className='btn-toolbar'>
                        <Link to={ `/edit/${ pk }` } className='btn btn-primary'>
                            <span className='glyphicon glyphicon-pencil'></span>
                        </Link>
                        <button
                            type='button'
                            className='btn btn-danger'
                            onClick={ this._handleRemove }>
                            <span className='glyphicon glyphicon-remove'></span>
                        </button>
                    </div>
                </td>
            </tr>
        );
    }
}

export default ListItem;
