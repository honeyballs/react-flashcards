import React from 'react';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { showDeleteModal, removeTopic, removeSubTopic, removeCard } from '../../../ducks/duck';
import { DELETION_CONST} from '../../../ducks/duck';

const ConfirmModal = ({visible, setVisibility, type, idToDelete, deleteTopic, deleteSubTopic, deleteCard}) => {
    let elementName = '';
    let deleteFunction = null;
    switch (type) {
        case DELETION_CONST.topic:
            elementName = 'topic';
            deleteFunction = deleteTopic;
            break;
        case DELETION_CONST.subtopic:
            elementName = 'subtopic';
            deleteFunction = deleteSubTopic;
            break;
        case DELETION_CONST.card:
            elementName = 'flashcard';
            deleteFunction = deleteCard;
            break;
        default:
            break;
    }

    return (
        <div 
            className={`${visible ? 'modal-background active' : 'modal-background'}`}
            onClick={event => setVisibility()}
        >
            <div className="modal-container" onClick={event => event.stopPropagation()}>
                <h4>{`Delete ${elementName}`}</h4>
                <p>{`Are you sure you want to delete this ${elementName}?`}</p>
                <span className="modal-buttons">
                    <button id="t-modal-cancel" onClick={event => setVisibility()}>Cancel</button>
                    <button id="t-modal-add" onClick={event => deleteFunction(idToDelete)}>Delete</button>
                </span>
            </div>
        </div>
    );
};

ConfirmModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisibility: PropTypes.func.isRequired,
    type: PropTypes.number.isRequired,
    idToDelete: PropTypes.string.isRequired,
    deleteTopic: PropTypes.func.isRequired,
    deleteSubTopic: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired
}

// Return the read props this component receives
const mapStateToProps = (state) => ({
    visible: state.confirmModalVisible,
    type: state.deletionOf,
    idToDelete: state.idToDelete
});

// Map functions to props which dispatch actions on the store
const mapDispatchToProps = dispatch => ({
    deleteTopic: id => dispatch(removeTopic(id)),
    deleteSubTopic: id => dispatch(removeSubTopic(id)),
    deleteCard: id => dispatch(removeCard(id)),
    setVisibility: () => dispatch(showDeleteModal(false))
});

// Redux creates a wrapped component and provides the required props
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);