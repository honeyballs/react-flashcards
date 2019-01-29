import React from 'react';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { showAddTopicModal } from '../../ducks/duck';

import ListItem from '../listitem/ListItem';



import './List.css';

const List = ({topics, subTopics, showModal}) => {
    return (
        <div id="list-container">
            <div id="topic-header">
                <h2>Topics</h2>
                <span id="topic-add" onClick={event => showModal()}>+</span>
            </div>
            <ul id="list-content">
                {topics.map(topic => {
                    // Only pass the subtopics belonging to his topic
                    let subs = subTopics.filter(subtopic => subtopic.topicId === topic.id);
                    return <ListItem 
                        topic={topic} 
                        subtopics={subs} 
                        key={topic.id}
                    />
                })}
            </ul>
        </div>
    )
};

List.propTypes = {
    topics: PropTypes.arrayOf(PropTypes.object).isRequired,
    subTopics: PropTypes.arrayOf(PropTypes.object).isRequired,
    showModal: PropTypes.func.isRequired,
};

// Return the read props this component receives
const mapStateToProps = state => ({
    topics: state.topics,
    subTopics: state.subtopics
});

// Map functions to props which dispatch actions on the store
const mapDispatchToProps = dispatch => ({
    showModal: () => dispatch(showAddTopicModal(true))
});

// Redux creates a wrapped component and provides the required props
export default connect(mapStateToProps, mapDispatchToProps)(List);