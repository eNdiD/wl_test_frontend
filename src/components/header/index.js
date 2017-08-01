import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <div className='navbar navbar-inverse navbar-static-top'>
                <div className='container'>
                    <div className='navbar-header'>
                        <Link
                            to='/'
                            className='navbar-brand'>Films</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header
