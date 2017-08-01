import React, { Component } from 'react';

import ListItem from './list-item';


class FilmsList extends Component {
    render() {
        const { films } = this.props.filmsList;

        return (
            <div className='container'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            films.map(item =>
                                <ListItem key={ item.pk } item={ item }/>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default FilmsList
