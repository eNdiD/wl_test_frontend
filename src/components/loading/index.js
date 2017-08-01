import React, { Component } from 'react';

import './style.css';


class Loading extends Component {
    render() {
        return (
            <div className='container'>
                <p className='bg-info loading'><em>Loading ...</em></p>
            </div>
        );
    }
}

export default Loading;
