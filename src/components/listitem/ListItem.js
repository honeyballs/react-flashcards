import React from 'react';
import PropTypes from 'prop-types';

import './ListItem.css';

const ListItem = ({topic, selected}) => {
    return (
        <li className="topic-li">
            <span className="topic-content">
                <p className="topic-arrow">></p>
                <p className="topic-name">{topic.name}</p>
            </span>
        </li>
    );
};

ListItem.propTypes = {
    topic: PropTypes.object.isRequired,
    selected: PropTypes.bool.isRequired
};

export default ListItem;