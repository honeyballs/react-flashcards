import React from 'react';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { selectTopic, selectSubTopic, showAddTopicModal, showDeleteModal } from '../../ducks/duck';
import { DELETION_CONST } from '../../ducks/duck';

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
                            showAddModal(topic.id);
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

// Return the read props this component receives
const mapStateToProps = (state, ownProps) => ({
    topic: ownProps.topic,
    subtopics: ownProps.subtopics
});

// Map functions to props which dispatch actions on the store
const mapDispatchToProps = dispatch => ({
    selectTopic: id => dispatch(selectTopic(id)),
    selectSubTopic: id => dispatch(selectSubTopic(id)),
    showAddModal: id => dispatch(showAddTopicModal(true, id)),
    showDeleteModal: (id, type) => dispatch(showDeleteModal(true, id, type))
});

// Redux creates a wrapped component and provides the required props
export default connect(mapStateToProps, mapDispatchToProps)(ListItem);