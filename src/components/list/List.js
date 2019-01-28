import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../listitem/ListItem';

import './List.css';

const List = ({topics, subTopics, selectTopic, selectSubTopic, showModal}) => {
    return (
        <div id="list-container">
            <div id="topic-header">
                <h2>Topics</h2>
                <span id="topic-add" onClick={event => showModal(true)}>+</span>
            </div>
            <ul id="list-content">
                {topics.map(topic => {
                    // Only pass the subtopics belonging to his topic
                    let subs = subTopics.filter(subtopic => subtopic.topicId === topic.id);
                    return <ListItem 
                        topic={topic} 
                        subtopics={subs} 
                        selectTopic={selectTopic}
                        selectSubTopic={selectSubTopic}
                        key={topic.id}
                        showAddModal={showModal}
                    />
                })}
            </ul>
        </div>
    )
};

List.propTypes = {
    topics: PropTypes.arrayOf(PropTypes.object).isRequired,
    subTopics: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectTopic: PropTypes.func.isRequired,
    selectSubTopic: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired
};

export default List;