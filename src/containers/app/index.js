import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as filmsListActions from '../../actions/films-list';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import Header from '../../components/header';
import FilmsList from '../../components/films-list';


class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route
                        exact={ true }
                        path='/'
                        render={ () =>
                            <FilmsList
                                filmsList={ this.props.filmsList }
                                filmsListActions={ this.props.filmsListActions }/>
                        }/>
                </Switch>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        filmsList: state.filmsList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        filmsListActions: bindActionCreators(filmsListActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
