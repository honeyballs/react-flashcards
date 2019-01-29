import React from 'react';
import PropTypes from 'prop-types';
import { DELETION_CONST } from '../../App';

import './ListItem.css';

const ListItem = ({topic, subtopics, selectTopic, selectSubTopic, showAddModal, showDeleteModal}) => {
    return (
        <li 
            className={topic.selected ? "topic-li topic-selected" : "topic-li"}
            onClick={event => selectTopic(topic.id)}
        >
            <span className="topic-content">
                <span>
                    <p className={topic.selected ? "topic-arrow arrow-selected" : "topic-arrow"}>></p>
                    <p className="topic-name">{topic.name}</p>
                </span>
                <span className="topic-interaction">
                    <span 
                        className="sub-topic-add" 
                        onClick={event => {
                            event.stopPropagation();
                            showAddModal(true, topic.id);
                        }}
                    >
                        +
                    </span>
                    <span 
                        className='topic-delete' 
                        onClick={event => {
                            event.stopPropagation();
                            showDeleteModal(topic.id, DELETION_CONST.topic);
                        }}
                    >
                        x
                    </span>
                </span>
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
                    <span 
                        className='topic-delete' 
                        onClick={event => {
                            event.stopPropagation();
                            showDeleteModal(subtopic.id, DELETION_CONST.subtopic);
                        }}
                    >
                        x
                    </span>
                </li>)}
            </ul>}
        </li>
    );
};

ListItem.propTypes = {
    topic: PropTypes.object.isRequired,
    subtopics: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectTopic: PropTypes.func.isRequired,
    selectSubTopic: PropTypes.func.isRequired,
    showAddModal: PropTypes.func.isRequired,
    showDeleteModal: PropTypes.func.isRequired
};

export default ListItem;