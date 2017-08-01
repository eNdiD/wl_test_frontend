import React, { Component } from 'react';


class FilmsList extends Component {
    componentDidMount() {
        this.props.filmsListActions.getFilmsList();
    }

    render() {
        const { films } = this.props.filmsList;

        return (
            <div className='container'>
                {
                    films.map(item =>
                        <div key={ item.pk }>
                            <p>{ item.title }</p>
                            <p>{ item.year }</p>
                        </div>)
                }
            </div>
        )
    }
}

export default FilmsList
