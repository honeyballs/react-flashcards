import React from 'react';
import PropTypes from 'prop-types';

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

export default Card;