import React from 'react';
import PropTypes from 'prop-types';

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
                    placeholder={'Topic name'}
                />
                <br />
                <span className="modal-buttons">
                    <button id="t-modal-cancel" onClick={event => setVisibility(false)}>Cancel</button>
                    <button id="t-modal-add" onClick={event => addTopic(topicId)}>Add</button>
                </span>
            </div>
        </div>
    )
};

TopicModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    topicId: PropTypes.string,
    topicToAdd: PropTypes.string.isRequired,
    updateName: PropTypes.func.isRequired,
    addTopic: PropTypes.func.isRequired,
    setVisibility: PropTypes.func.isRequired
};

export default TopicModal;