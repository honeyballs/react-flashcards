import React from 'react';
import PropTypes from 'prop-types';

import './Cards.css';

import Card from '../carditem/Card';

const Cards = ({cards, currentTopic, answerCard, turnAround}) => {
    return (
        <div id="card-container">
            <div id="card-header">
                <h2>{currentTopic ? currentTopic : "Cards"}</h2>
            </div>
            <ul id="card-list">
                {cards.map(card => <Card 
                    card={card} 
                    answerCard={answerCard}
                    turnAround={turnAround}
                    key={card.id} 
                />)}
            </ul>
        </div>
    )
};

Cards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentTopic: PropTypes.string,
    answerCard: PropTypes.func.isRequired,
    turnAround: PropTypes.func.isRequired
}

export default Cards;