import React from 'react';
import PropTypes from 'prop-types';

import './ListItem.css';

const ListItem = ({topic, subtopics, selectTopic, selectSubTopic}) => {
    return (
        <li 
            className={topic.selected ? "topic-li topic-selected" : "topic-li"}
            onClick={event => selectTopic(topic.id)}
        >
            <span className="topic-content">
                <p className={topic.selected ? "topic-arrow arrow-selected" : "topic-arrow"}>></p>
                <p className="topic-name">{topic.name}</p>
            </span>
            {topic.selected && <ul className="subtopic-list">
                {subtopics.map(subtopic => <li 
                    className={subtopic.selected ? "subtopic-li subtopic-selected" : "subtopic-li"} 
                    onClick={event => {
                        event.stopPropagation();
                        selectSubTopic(subtopic.id);
                    }}
                    key={subtopic.id}
                >
                    <p className="subtopic-name">{subtopic.name}</p>
                </li>)}
            </ul>}
        </li>
    );
};

ListItem.propTypes = {
    topic: PropTypes.object.isRequired,
    subtopics: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectTopic: PropTypes.func.isRequired,
    selectSubTopic: PropTypes.func.isRequired
};

export default ListItem;