import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '../listitem/ListItem';

import './List.css';

const List = ({topics, subTopics, selectTopic}) => {
    return (
        <div id="list-container">
            <div id="topic-header">
                <h2>Topics</h2>
            </div>
            <ul id="list-content">
                {topics.map(topic => {
                    // Only pass the subtopics belonging to his topic
                    let subs = subTopics.filter(subtopic => subtopic.topicId === topic.id);
                    return <ListItem 
                        topic={topic} 
                        subtopics={subs} 
                        selectTopic={selectTopic}
                        key={topic.id}/>
                })}
            </ul>
        </div>
    )
};

List.propTypes = {
    topics: PropTypes.arrayOf(PropTypes.object).isRequired,
    subTopics: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectTopic: PropTypes.func.isRequired
};

export default List;