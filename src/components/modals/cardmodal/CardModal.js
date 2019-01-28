import React from 'react';
import PropTypes from 'prop-types';

const CardModal = ({visible, subTopicId, setVisibility, cardQuestion, cardAnswer, setQuestion, setAnswer, addCard}) => {
    return (
        <div
            className={`${visible ? 'modal-background active' : 'modal-background'}`}
            onClick={event => setVisibility(false)}
        >

        </div>
    )
};

CardModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    subTopicId: PropTypes.number.isRequired,
    setVisibility: PropTypes.func.isRequired,
    cardQuestion: PropTypes.string.isRequired,
    cardAnswer: PropTypes.string.isRequired,
    setQuestion: PropTypes.func.isRequired,
    setAnswer: PropTypes.func.isRequired,
    addCard: PropTypes.func.isRequired
}

export default CardModal;