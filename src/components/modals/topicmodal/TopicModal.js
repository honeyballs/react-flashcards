import React from 'react';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { updateTopicName, addTopic, addSubTopic, showAddTopicModal } from '../../../ducks/duck';

const TopicModal = ({visible, topicId, topicToAdd, updateName, addTopic, addSubTopic, setVisibility}) => {
    return (
        <div 
            className={`${visible ? 'modal-background active' : 'modal-background'}`}
            onClick={event => setVisibility()}
        >
            <div className="modal-container" onClick={event => event.stopPropagation()}>
                <h4>{`Add ${topicId ? 'sub' : ''}topic`}</h4>
                <input 
                    className="modal-input"
                    type="text"
                    onChange={event => updateName(event.target.value)}
                    value={topicToAdd}
                    placeholder={'Topic name'}
                />
                <br />
                <span className="modal-buttons">
                    <button id="t-modal-cancel" onClick={event => setVisibility()}>Cancel</button>
                    <button id="t-modal-add" onClick={event => topicId !== '' ? addSubTopic(topicId) : addTopic()}>Add</button>
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
    addSubTopic: PropTypes.func.isRequired,
    setVisibility: PropTypes.func.isRequired
};

// Return the read props this component receives
const mapStateToProps = (state) => ({
    visible: state.topicModalVisible,
    topicId: state.topicIdForModal,
    topicToAdd: state.topicToAdd
});

// Map functions to props which dispatch actions on the store
const mapDispatchToProps = dispatch => ({
    updateName: name => dispatch(updateTopicName(name)),
    addTopic: () => dispatch(addTopic()),
    addSubTopic: topicId => dispatch(addSubTopic(topicId)),
    setVisibility: () => dispatch(showAddTopicModal(false))
});

// Redux creates a wrapped component and provides the required props
export default connect(mapStateToProps, mapDispatchToProps)(TopicModal);