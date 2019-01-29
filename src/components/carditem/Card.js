import React from 'react';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { answerCard, turnCard, showDeleteModal } from '../../ducks/duck';
import { DELETION_CONST } from '../../ducks/duck';

import './Card.css';

const Card = ({card, answerCard, turnAround, showDeleteModal}) => {
    let percent = 0;
    if (card.right + card.wrong > 0) percent = Math.round(card.right / (card.right + card.wrong) * 100);
    return(
        <li className="card">
            <span className="card-head">
                <h3>{card.question}</h3>
                <span className='card-delete' onClick={event => showDeleteModal(card.id)}>x</span>
            </span>  
            {card.turned && <div className="card-answer-container">
                <p>{card.answer}</p>
            </div>}
            <span className="card-bar">
                <p className="stat-p">{`Success rate: ${percent}%`}</p>
                {card.turned ? <span className="card-button-bar">
                    <button className="turn-button" onClick={event => turnAround(card.id)}>Turn around</button>
                </span> : <span className="card-button-bar">
                    <button className="dont-know-button" onClick={event => answerCard(card.id, false)}>Don't know</button>
                    <button className="know-button" onClick={event => answerCard(card.id, true)}>I know</button>
                </span>}
                
            </span>
        </li>
    )
};

Card.propTypes = {
    card: PropTypes.object.isRequired,
    answerCard: PropTypes.func.isRequired,
    turnAround: PropTypes.func.isRequired,
    showDeleteModal: PropTypes.func.isRequired
}

// Return the read props this component receives
const mapStateToProps = (state, ownProps) => ({
    card: ownProps.card
});

// Map functions to props which dispatch actions on the store
const mapDispatchToProps = dispatch => ({
    answerCard: (id, isCorrect) => dispatch(answerCard(id, isCorrect)),
    turnAround: id => dispatch(turnCard(id)),
    showDeleteModal: id => dispatch(showDeleteModal(true, id, DELETION_CONST.card))
});

// Redux creates a wrapped component and provides the required props
export default connect(mapStateToProps, mapDispatchToProps)(Card);