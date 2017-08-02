import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    bindAll as _bindAll,
    find as _find,
    orderBy as _orderBy
} from 'lodash-es';


class FilmForm extends Component {
    constructor(props) {
        super(props);

        _bindAll(this, [
            '_handleChange',
            '_handleSubmit',
            'validateForm'
        ]);

        const { film } = props;

        this.state = {
            title: (film && film.title) || '',
            year: (film && film.year) || '',
            format: (film && film.format) || '',
            actors: (film && film.actors) || [],
            actors_list: [],
            errors: []
        }
    }

    _handleChange(e) {
        const target = e.target;
        const value = target.type === 'select-multiple' ?
            Array.prototype.slice.call(target.selectedOptions).map(o => o.value) :
            target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    _handleSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            const { title, year, format, actors } = this.state;

            const data = {
                title: title.trim(),
                year: year,
                format: format,
                actors: actors
            }

            switch (this.props.method) {
                // case 'POST':
                //     this.props.addFilmItem(data);
                //     this.props.showStatus('Movie successfuly added!');
                //     break;
                case 'PUT':
                    this.props.editFilmItem(this.props.film.pk, data);
                    this.props.showStatus('Movie successfuly edited!');
                    break;
                default:
                    this.props.addFilmItem(data);
                    this.props.showStatus('Movie successfuly added!');
            }
            this.props.history.push('/');
        }
    }

    validateForm() {
        const { title, year, format, actors } = this.state;

        const validateField = (field, value) => {
            if (field === 'year') {
                return {
                    field: field,
                    valid: !isNaN(parseFloat(value)) && isFinite(value)
                }
            }

            return {
                field: field,
                valid: !!(value && value.length)
            };
        }

        const new_errors = [
            validateField('title', title),
            validateField('year', year),
            validateField('format', format),
            validateField('actors', actors)
        ];

        this.setState({
            errors: new_errors
        });

        return !!(title && year && format && actors.length);
    }

    componentDidMount() {
        this.setState({
            actors_list: this.props.actors
        })
    }

    render() {
        const { errors } = this.state;

        const title_error = errors.length ? !(_find(errors, ['field', 'title']).valid) : false;
        const year_error = errors.length ? !(_find(errors, ['field', 'year']).valid) : false;
        const format_error = errors.length ? !(_find(errors, ['field', 'format']).valid) : false;
        const actors_error = errors.length ? !(_find(errors, ['field', 'actors']).valid) : false;

        return (
            <form
                className='form-horizontal'
                onSubmit={ this._handleSubmit }>
                <div className={ `form-group ${ title_error ? 'has-error' : '' }` }>
                    <label
                        htmlFor='add-title'
                        className='col-md-2 col-lg-1 control-label'>Title:</label>
                    <div className='col-md-10 col-lg-11'>
                        <input
                            type='text'
                            value={ this.state.title }
                            name='title'
                            id='add-title'
                            className='form-control'
                            onChange={ this._handleChange }/>
                    </div>
                </div>
                <div className={ `form-group ${ year_error ? 'has-error' : '' }` }>
                    <label
                        htmlFor='add-year'
                        className='col-md-2 col-lg-1 control-label'>Year:</label>
                    <div className='col-md-10 col-lg-11'>
                        <input
                            type='text'
                            value={ this.state.year }
                            name='year'
                            id='add-year'
                            className='form-control'
                            onChange={ this._handleChange }/>
                    </div>
                </div>
                <div className={ `form-group ${ format_error ? 'has-error' : '' }` }>
                    <label
                        htmlFor='add-format'
                        className='col-md-2 col-lg-1 control-label'>Format:</label>
                    <div className='col-md-10 col-lg-11'>
                        <select
                            value={ this.state.format }
                            name='format'
                            id='add-format'
                            className='form-control'
                            onChange={ this._handleChange }>
                            <option value=''>---</option>
                            <option value='v'>VHS</option>
                            <option value='d'>DVD</option>
                            <option value='b'>Blu-Ray</option>
                        </select>
                    </div>
                </div>
                <div className={ `form-group ${ actors_error ? 'has-error' : '' }` }>
                    <label
                        htmlFor='add-actors'
                        className='col-md-2 col-lg-1 control-label'>Starring:</label>
                    <div className='col-md-10 col-lg-11'>
                        <select
                            value={ this.state.actors }
                            name='actors'
                            id='add-actors'
                            className='form-control'
                            onChange={ this._handleChange }
                            multiple>
                            {
                                _orderBy(this.state.actors_list, ['name'], ['asc']).map(item =>
                                    <option
                                        key={ item.pk }
                                        value={ item.pk }>{ item.name }</option>)
                            }
                        </select>
                    </div>
                </div>
                <hr/>
                <div className='btn-toolbar'>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                    <Link to='/' className='btn btn-danger'>Cancel</Link>
                </div>
            </form>
        );
    }
}

export default withRouter(FilmForm);