import React from 'react';
import PropTypes from 'prop-types';
import { DELETION_CONST } from '../../../App';

const ConfirmModal = ({visible, setVisibility, type, deleteElement}) => {
    let elementName = ''
    switch (type) {
        case DELETION_CONST.topic:
            elementName = 'topic'
            break;
        case DELETION_CONST.subtopic:
            elementName = 'subtopic';
            break;
        case DELETION_CONST.card:
            elementName = 'flashcard';
            break;
        default:
            break;
    }

    return (
        <div 
            className={`${visible ? 'modal-background active' : 'modal-background'}`}
            onClick={event => setVisibility(false)}
        >
            <div className="modal-container" onClick={event => event.stopPropagation()}>
                <h4>{`Delete ${elementName}`}</h4>
                <p>{`Are you sure you want to delete this ${elementName}?`}</p>
                <span className="modal-buttons">
                    <button id="t-modal-cancel" onClick={event => setVisibility(false)}>Cancel</button>
                    <button id="t-modal-add" onClick={event => deleteElement()}>Delete</button>
                </span>
            </div>
        </div>
    );
};

ConfirmModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisibility: PropTypes.func.isRequired,
    type: PropTypes.number.isRequired,
    deleteElement: PropTypes.func.isRequired
}

export default ConfirmModal;