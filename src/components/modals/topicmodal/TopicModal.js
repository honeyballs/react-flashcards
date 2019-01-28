import React from 'react';
import PropTypes from 'prop-types';

import './TopicModal.css';

const TopicModal = ({visible, topicId, topicToAdd, updateName, addTopic, setVisibility}) => {
    return (
        <div 
            className={`${visible ? 'modal-background active' : 'modal-background'}`}
            onClick={event => setVisibility(false)}
        >
            <div className="modal-container" onClick={event => event.stopPropagation()}>
                <h4>{`Add ${topicId ? 'sub' : ''}topic`}</h4>
                <input 
                    className="modal-input"
                    type="text"
                    onChange={updateName}
                    value={topicToAdd}
                />
                <br />
                <span className="modal-buttons">
                    <button id="t-model-cancel" onClick={event => setVisibility(false)}>Cancel</button>
                    <button id="t-model-add" onClick={event => addTopic(topicId)}>Add</button>
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