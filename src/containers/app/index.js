import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filmsListActions from '../../actions/films';
import * as actorsListActions from '../../actions/actors';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './style.css';

import Header from '../../components/header';
import Loading from '../../components/loading';
import FilmsList from '../../components/films-list';
import FilmItem from '../../components/film-item';
import AddFilm from '../../components/add-film';
import EditFilm from '../../components/edit-film';


class App extends Component {
    componentDidMount() {
        this.props.filmsListActions.getFilmsList();
        this.props.actorsListActions.getActorsList();
    }

    // shouldComponentUpdate(nextProps) {
    //     return true;
    // }

    render() {
        const { filmsList, actorsList, filmsListActions } = this.props;

        return (
            <div>
                <Header/>
                {
                    filmsList.status ?
                    <div className='container'>
                        <p className='bg-danger status-text'>{ filmsList.status }</p>
                    </div> :
                    ''
                }
                {
                    filmsList.fetching ?
                    <Loading/> :
                    <Switch>
                        <Route
                            exact={ true }
                            path='/'
                            render={ () =>
                                <FilmsList
                                    films={ filmsList.films }
                                    actors={ actorsList.actors }
                                    order_by={ filmsList.order_by }
                                    order={ filmsList.order }
                                    changeOrder={ filmsListActions.changeOrder }
                                    deleteFilmItem={ filmsListActions.deleteFilmItem }
                                    showStatus={ filmsListActions.showStatus }/>
                            }/>
                        <Route
                            exact={ true }
                            path='/film/:pk'
                            render={ () =>
                                <FilmItem
                                    films={ filmsList.films }
                                    actors={ actorsList.actors }
                                    deleteFilmItem={ filmsListActions.deleteFilmItem }
                                    showStatus={ filmsListActions.showStatus }/>
                            }/>
                        <Route
                            exact={ true }
                            path='/add'
                            render={ () =>
                                <AddFilm
                                    actors={ actorsList.actors }
                                    addFilmItem={ filmsListActions.addFilmItem }
                                    showStatus={ filmsListActions.showStatus }/>
                            }/>
                        <Route
                            exact={ true }
                            path='/edit/:pk'
                            render={ () =>
                                <EditFilm
                                    actors={ actorsList.actors }
                                    films={ filmsList.films }
                                    addFilmItem={ filmsListActions.addFilmItem }
                                    editFilmItem={ filmsListActions.editFilmItem }
                                    showStatus={ filmsListActions.showStatus }/>
                            }/>
                    </Switch>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        filmsList: state.filmsList,
        actorsList: state.actorsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filmsListActions: bindActionCreators(filmsListActions, dispatch),
        actorsListActions: bindActionCreators(actorsListActions, dispatch)
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
