import uuid from 'uuid/v1';

export const DELETION_CONST = {
    topic: 0,
    subtopic: 1,
    card: 2
  };

// Define all possible action names
const ADD_TOPIC = 'topic/ADD';
const SELECT_TOPIC = 'topic/SELECT';
const REMOVE_TOPIC = 'topic/REMOVE';
const ADD_SUBTOPIC = 'subtopic/ADD';
const SELECT_SUBTOPIC = 'subtopic/SELECT';
const REMOVE_SUBTOPIC = 'subtopic/REMOVE';

const ADD_CARD = 'cards/ADD';
const ANSWER_CARD = 'cards/ANSWER';
const TURN_CARD = 'cards/TURN';
const REMOVE_CARD = 'cards/REMOVE';

const SHOW_ADD_TOPIC_MODAL = 'modal/ADD_TOPIC';
const SHOW_ADD_CARD_MODAL = 'modal/ADD_CARD';
const SHOW_DELETE_CONFIRM_MODAL = 'modal/DELETE';

const UPDATE_TOPIC_NAME = 'event/UPDATE_TOPIC';
const UPDATE_CARD_QUESTION = 'event/UPDATE_QUESTION';
const UPDATE_CARD_ANSWER = 'event/UPDATE_ANSWER';

// Define the initial app state
const initialState = {
    topics: [],
    subtopics: [],
    selectedSubTopic: {},
    cards: [],
    currentCards: [],
    topicModalVisible: false,
    topicIdForModal: '',
    topicToAdd: '',
    cardModalVisible: false,
    cardQuestionToAdd: '',
    cardAnswerToAdd: '',
    confirmModalVisible: false,
    deletionOf: -1,
    idToDelete: ''
}
 
// Define the reducer. A reducer receives actions and returns the new state after the action was performed.
// If no parameter is submitted the default values for state (the initialState) and action are used ({}).
// The state must not be mutated
export default (state = initialState, action = {}) => {
    switch (action.type) {
        // Topic cases
        case ADD_TOPIC:
            let newTopic = {
                id: uuid(),
                name: state.topicToAdd,
                selected: false
            }
            let newTopics = [...state.topics, newTopic];
            return {...state, topics: newTopics};
        case SELECT_TOPIC:
            let newTopics = state.topics.map(topic => {
                if (topic.id === action.id) {
                    return {...topic, selected: !topic.selected};
                }
                return topic;
            });
            return {...state, topics: newTopics};
        case REMOVE_TOPIC:
            let newTopics = state.topics.filter(topic => topic.id !== action.id);
            let remainingSubTopics = state.subtopics.filter(subtopic => subtopic.topicId !== action.id);
            let subTopicsToRemove = state.subtopics.filter(subtopic => subtopic.topicId === action.id);
            let remainingCards = state.cards;
            let selected = false;
            subTopicsToRemove.forEach(subtopic => {
                remainingCards = remainingCards.filter(card => card.subTopicId !== subtopic.id);
                selected = state.selectedSubTopic.id === subtopic.id
            });
            if (selected) {
                return {
                    ...state,
                    topics: newTopics, 
                    subtopics: remainingSubTopics, 
                    selectedSubTopic: {}, 
                    cards: remainingCards,
                    currentCards: []
                };
            } else {
                return {
                    ...state,
                    topics: newTopics,
                    subtopics: remainingSubTopics,
                    cards: remainingCards
                }
            }

        // Subtopic cases
        case ADD_SUBTOPIC:
            let newTopic = {
                id: uuid(), 
                name: state.topicToAdd,
                topicId: action.topicId,
                selected: false
            }
            let newTopics = [...state.subtopics, newTopic];
            return {...state, subtopics: newTopics};
        case SELECT_SUBTOPIC: 
            let selectedSubTopic = {};
            let newTopics = state.subtopics.map(topic => {
                if (topic.id === action.id) {
                    selectedSubTopic = topic;
                    return {...topic, selected: true};
                } 
                return {...topic, selected: false};
            });
            let currentCards = state.cards.filter(card => card.subTopicId === selectedSubTopic.id);
            return {...state, subtopics: newTopics, selectedSubTopic: selectedSubTopic, currentCards: currentCards}
        case REMOVE_SUBTOPIC:
            let remainingSubTopics = state.subtopics.filter(subtopic => subtopic.id !== action.id);
            let remainingCards = state.cards.filter(card => card.subTopicId !== action.id);
            if (state.selectedSubTopic.id === action.id) {
                return {...state, subtopics: remainingSubTopics, selectedSubTopic: {}, cards: remainingCards, currentCards: []};
            } else {
                return {...state, subtopics: remainingSubTopics, cards: remainingCards};
            }

        // Card cases    
        case ADD_CARD:
            let newCard = {
                id: uuid(), 
                question: state.cardQuestionToAdd, 
                answer: state.cardAnswerToAdd,
                right: 0,
                wrong: 0,
                imagePath: '',
                turned: false,
                subTopicId: state.selectedSubTopic.id
            }; 
            let updatedCards = [...state.cards, newCard];
            let currentCards = [...state.currentCards, newCard];
            return {
                ...state,
                cards: updatedCards,
                currentCards: currentCards,
                cardQuestionToAdd: '',
                cardAnswerToAdd: '',
                subTopicIdForCard: '',
                cardModalVisible: false
            };
        case ANSWER_CARD: 
            let newCards = state.cards.map(card => {
                if (card.id === action.id) {
                    return isCorrect ? {...card, right: card.right + 1, turned: true} : {...card, wrong: card.wrong + 1, turned: true};
                }
                return card;
            });
            let currentCards = newCards.filter(card => card.id === state.selectedSubTopic.id);
            return {...state, cards: newCards, currentCards: currentCards};
        case TURN_CARD:
            let newCards = state.cards.map(card => {
                if (card.id === action.id) {
                    return {...card, turned: false};
                }
                return card;
            });
            let currentCards = newCards.filter(card => card.id === state.selectedSubTopic.id);
            return {...state, cards: newCards, currentCards: currentCards};
        case REMOVE_CARD:
            let remainingCards = state.cards.filter(card => card.id !== action.id);
            let currentCards = newCards.filter(card => card.id === state.selectedSubTopic.id);
            return {...state, cards: remainingCards, currentCards: currentCards};

        // Modal cases
        case SHOW_ADD_TOPIC_MODAL:
            if(action.isVisible) {
                return {...state, topicModalVisible: action.isVisible, topicIdForModal: action.topicId ? action.topicId : ''};
            } else {
                return {...state, topicModalVisible: action.isVisible, topicIdForModal: '', topicToAdd: ''};
            }
        case SHOW_ADD_CARD_MODAL:
            if (action.isVisible) {
                return {...state, cardModalVisible: action.isVisible};
              } else {
                return {...state, cardModalVisible: action.isVisible, cardQuestionToAdd: '', cardAnswerToAdd: ''};
            }
        case SHOW_DELETE_CONFIRM_MODAL:
            if (action.isVisible) {
                return {...state, confirmModalVisible: action.isVisible, idToDelete: action.id, deletionOf: action.type};
            } else {
                return {...state, confirmModalVisible: action.isVisible, idToDelete: '', deletionOf: -1};
            }

        // Event cases
        case UPDATE_TOPIC_NAME:
            return {...state, topicToAdd: action.name};
        case UPDATE_CARD_QUESTION:
            return {...state, cardQuestionToAdd: action.question};
        case UPDATE_CARD_ANSWER: 
            return {...state, cardAnswerToAdd: action.answer};
        default: 
            return state;
    }
}

/* 
Action Creators 
Action creators are functions that return an action. 
An action contains the type (one of the string constants above) and a payload.
The payload is data to be used by the reducer to manipulate the state according to the action.
*/

export const addTopic = () => {
    // Return the created action
    return {
        type: ADD_TOPIC
    }
}

export const selectTopic = id => {
    return {type: SELECT_TOPIC, id};
}

export const removeTopic = id => {
    return {type: REMOVE_TOPIC, id};
}

export const addSubTopic = topicId => {
    // Return the created action with the new topic as payload
    return {
        type: ADD_SUBTOPIC,
        topicId
    }
}

export const selectSubTopic = id => {
    return {type: SELECT_SUBTOPIC, id};
}

export const removeSubTopic = id => {
    return {type: REMOVE_SUBTOPIC, id};
}

export const addCard = () => {
    return {type: ADD_CARD};
}

export const answerCard = (id, isCorrect) => {
    return {type: ANSWER_CARD, id, isCorrect};
}

export const turnCard = id => {
    return {type: TURN_CARD, id};
}

export const removeCard = id => {
    return {type: REMOVE_CARD, id};
}

export const showAddTopicModal = (visibility, id) => {
    return {type: SHOW_ADD_TOPIC_MODAL, isVisible: visibility, topicId: id};
}

export const showAddCardModal = visibility => {
    return {type: SHOW_ADD_CARD_MODAL, isVisible: visibility};
}

export const showDeleteModal = (visibility, id, type) => {
    return {type: SHOW_DELETE_CONFIRM_MODAL, isVisible: visibility, id, type};
}

export const updateTopicName = name => {
    return {type: UPDATE_TOPIC_NAME, name};
}

export const updateCardQuestion = question => {
    return {type: UPDATE_CARD_QUESTION, question};
}

export const updateCardAnswer = answer => {
    return {type: UPDATE_CARD_ANSWER, answer};
}