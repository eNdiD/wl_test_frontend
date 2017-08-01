import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ListItem extends Component {
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
                        <Link to={ `/delete/${ pk }` } className='btn btn-danger'>
                            <span className='glyphicon glyphicon-remove'></span>
                        </Link>
                    </div>
                </td>
            </tr>
        );
    }
}

export default ListItem;
