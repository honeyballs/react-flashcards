import React from 'react';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { updateCardQuestion, updateCardAnswer, addCard, showAddCardModal } from '../../../ducks/duck';

import './CardModal.css';

const CardModal = ({visible, setVisibility, cardQuestion, cardAnswer, setQuestion, setAnswer, addCard}) => {
    return (
        <div
            className={`${visible ? 'modal-background active' : 'modal-background'}`}
            onClick={event => setVisibility()}
        >
            <div className="modal-container" onClick={event => event.stopPropagation()}>
                <h4>{`Add flashcard`}</h4>
                <input 
                    className="modal-input"
                    type="text"
                    onChange={event => setQuestion(event.target.value)}
                    value={cardQuestion}
                    placeholder='Question'
                />
                <br />
                <textarea
                    id="card-modal-textarea"
                    onChange={event => setAnswer(event.target.value)}
                    value={cardAnswer}
                    placeholder='Answer'
                    rows={4}
                />
                <br />
                <span className="modal-buttons">
                    <button id="t-modal-cancel" onClick={event => setVisibility()}>Cancel</button>
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

// Return the read props this component receives
const mapStateToProps = (state) => ({
    visible: state.cardModalVisible,
    cardQuestion: state.cardQuestionToAdd,
    cardAnswer: state.cardAnswerToAdd
});

// Map functions to props which dispatch actions on the store
const mapDispatchToProps = dispatch => ({
    setQuestion: question => dispatch(updateCardQuestion(question)),
    setAnswer: answer => dispatch(updateCardAnswer(answer)),
    addCard: () => dispatch(addCard()),
    setVisibility: () => dispatch(showAddCardModal(false))
});

// Redux creates a wrapped component and provides the required props
export default connect(mapStateToProps, mapDispatchToProps)(CardModal);