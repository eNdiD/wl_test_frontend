import React, { Component } from 'react';
import {
    find as _find
} from 'lodash-es';


class ActorItem extends Component {
    render() {
        const { pk, actors } = this.props;
        const actor = _find(actors, ['pk', +pk]);

        return (
            <span>
                {
                    actor ?
                    <span>
                        { actor.name }<br/>
                    </span> :
                    ''
                }
            </span>
        );
    }
}

export default ActorItem;
