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
            </tr>
        );
    }
}

export default ListItem;
