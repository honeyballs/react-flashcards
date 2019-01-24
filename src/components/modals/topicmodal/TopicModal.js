import React from 'react';
import PropTypes from 'prop-types';

import './TopicModal.css';

const TopicModal = ({visible, topicId, topicToAdd, updateName, addTopic, setVisibility}) => {
    return (
        <div 
            id="t-modal-background" 
            className={`${visible ? 'active' : ''}`}
            onClick={event => setVisibility(false)}
        >
            <div id="t-modal-container" onClick={event => event.stopPropagation()}>
                <h4>{`Add ${topicId ? 'sub' : ''}topic`}</h4>
                <input 
                    id="t-model-input"
                    type="text"
                    onChange={updateName}
                    value={topicToAdd}
                />
                <span id="t-modal-buttons">
                    <button id="t-model-cancel" onClick={event => setVisibility(false)}>Cancel</button>
                    <button id="t-model-add" onClick={event => addTopic()}>Add</button>
                </span>
            </div>
        </div>
    )
};

TopicModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    topicId: PropTypes.number,
    topicToAdd: PropTypes.string.isRequired,
    updateName: PropTypes.func.isRequired,
    addTopic: PropTypes.func.isRequired,
    setVisibility: PropTypes.func.isRequired
};

export default TopicModal;