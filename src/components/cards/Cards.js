import React from 'react';
import PropTypes from 'prop-types';

// Redux imports
import { connect } from 'react-redux';
import { showAddCardModal } from '../../ducks/duck';

import './Cards.css';

import Card from '../carditem/Card';

const Cards = ({cards, currentTopic, showModal}) => {
    return (
        <div id="card-container">
            <div id="card-header">
                <h2>{currentTopic ? currentTopic : "Cards"}</h2>
                {currentTopic && <span id="card-add" onClick={event => showModal()}>+</span>}
            </div>
            <ul id="card-list">
                {cards.map(card => <Card 
                    card={card} 
                    key={card.id} 
                />)}
            </ul>
        </div>
    )
};

Cards.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentTopic: PropTypes.string,
    showModal: PropTypes.func.isRequired,
}

// Return the read props this component receives
const mapStateToProps = state => ({
    cards: state.cards,
    currentTopic: state.selectedSubTopic.name
});

// Map functions to props which dispatch actions on the store
const mapDispatchToProps = dispatch => ({
    showModal: () => dispatch(showAddCardModal(true))
});

// Redux creates a wrapped component and provides the required props
export default connect(mapStateToProps, mapDispatchToProps)(Cards);