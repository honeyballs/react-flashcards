import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../listitem/ListItem';

import './List.css';

const List = ({topics}) => {
    return (
        <div id="list-container">
            <div id="topic-header">
                <h2>Topics</h2>
            </div>
            <ul id="list-content">
                {topics.map(topic => <ListItem topic={topic} key={topic.id}/>)}
            </ul>
        </div>
    )
};

List.propTypes = {
    topics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default List;