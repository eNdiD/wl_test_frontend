import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filmsListActions from '../../actions/films';
import * as actorsListActions from '../../actions/actors';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Header from '../../components/header';
import Loading from '../../components/loading';
import FilmsList from '../../components/films-list';
import FilmItem from '../../components/film-item';
import AddFilm from '../../components/add-film';


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
                                    changeOrder={ filmsListActions.changeOrder }/>
                            }/>
                        <Route
                            exact={ true }
                            path='/film/:pk'
                            render={ ({ match }) =>
                                <FilmItem
                                    films={ filmsList.films }
                                    actors={ actorsList.actors }
                                    match={ match }/>
                            }/>
                        <Route
                            exact={ true }
                            path='/add'
                            render={ () =>
                                <AddFilm
                                    actorsList={ actorsList }/>
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
