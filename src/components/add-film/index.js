import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { orderBy as _orderBy } from 'lodash-es';


class AddFilm extends Component {
    render() {
        const { actors } = this.props.actorsList;

        return (
            <div className='container'>
                <div className='page-header'>
                    <h1>Add Film</h1>
                </div>
                <div className='panel'>
                    <form className='form-horizontal'>
                        <div className='form-group'>
                            <label
                                htmlFor='add-title'
                                className='col-md-2 col-lg-1 control-label'>Title:</label>
                            <div className='col-md-10 col-lg-11'>
                                <input
                                    type='text'
                                    id='add-title'
                                    className='form-control'/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label
                                htmlFor='add-year'
                                className='col-md-2 col-lg-1 control-label'>Year:</label>
                            <div className='col-md-10 col-lg-11'>
                                <input
                                    type='text'
                                    id='add-year'
                                    className='form-control'/>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label
                                htmlFor='add-format'
                                className='col-md-2 col-lg-1 control-label'>Format:</label>
                            <div className='col-md-10 col-lg-11'>
                                <select
                                    id='add-format'
                                    className='form-control'>
                                    <option value=''>---</option>
                                    <option value='v'>VHS</option>
                                    <option value='d'>DVD</option>
                                    <option value='b'>Blu-Ray</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-group'>
                            <label
                                htmlFor='add-actors'
                                className='col-md-2 col-lg-1 control-label'>Starring:</label>
                            <div className='col-md-10 col-lg-11'>
                                <select
                                    id='add-actors'
                                    className='form-control'
                                    multiple>
                                    {
                                        _orderBy(actors, ['name'], ['asc']).map(item =>
                                            <option
                                                key={ item.pk }
                                                value={ item.pk }>{ item.name }</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='btn-toolbar'>
                            <button type='submit' className='btn btn-primary'>Submit</button>
                            <Link to='/' className='btn btn-danger'>Cancel</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default AddFilm;
