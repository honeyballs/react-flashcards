import React from 'react';
import PropTypes from 'prop-types';

import './CardModal.css';

const CardModal = ({visible, setVisibility, cardQuestion, cardAnswer, setQuestion, setAnswer, addCard}) => {
    return (
        <div
            className={`${visible ? 'modal-background active' : 'modal-background'}`}
            onClick={event => setVisibility(false)}
        >
            <div className="modal-container" onClick={event => event.stopPropagation()}>
                <h4>{`Add flashcard`}</h4>
                <input 
                    className="modal-input"
                    type="text"
                    onChange={setQuestion}
                    value={cardQuestion}
                    placeholder='Question'
                />
                <br />
                <textarea
                    id="card-modal-textarea"
                    onChange={setAnswer}
                    value={cardAnswer}
                    placeholder='Answer'
                    rows={4}
                />
                <br />
                <span className="modal-buttons">
                    <button id="t-modal-cancel" onClick={event => setVisibility(false)}>Cancel</button>
                    <button id="t-modal-add" onClick={event => addCard()}>Add</button>
                </span>
            </div>
        </div>
    )
};

CardModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    setVisibility: PropTypes.func.isRequired,
    cardQuestion: PropTypes.string.isRequired,
    cardAnswer: PropTypes.string.isRequired,
    setQuestion: PropTypes.func.isRequired,
    setAnswer: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired
}

export default CardModal;