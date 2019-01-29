import React, { Component } from 'react';
import uuid from 'uuid/v1';

import './App.css';

/* Own components */
import List from './components/list/List';
import Cards from './components/cards/Cards';
import TopicModal from './components/modals/topicmodal/TopicModal';
import CardModal from './components/modals/cardmodal/CardModal';
import ConfirmModal from './components/modals/confirmmodal/ConfirmModal';

export const DELETION_CONST = {
  topic: 0,
  subtopic: 1,
  card: 2
};

class App extends Component {

  state = {
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

  /**
   * Change the selection of a topic by creating a new array which contains the altered topic.
   * 
   * @param id The Id of the topic to switch
   */
  changeTopicSelection = id => {
    let newTopics = this.state.topics.map(topic => {
      if (topic.id === id) return {...topic, selected: !topic.selected};
      return topic;
    });
    this.setState({topics: newTopics});
  }

  /**
   * Change the selection of a subtopic by creating a new array which contains the altered subtopic.
   * Only one subtopic can be active, so we have to deselect all other subtopics.
   * 
   * @param id The Id of the subtopic to switch
   */
  changeSubTopicSelection = id => {
    let selectedSubTopic = {};
    let newTopics = this.state.subtopics.map(topic => {
      if (topic.id === id) {
        selectedSubTopic = topic;
        return {...topic, selected: true};
      } 
      return {...topic, selected: false};
    });
    this.setState({subtopics: newTopics, selectedSubTopic: selectedSubTopic, currentCards: this.setCurrentCards(id)});
  }

  /**
   * Find all cards to display for a subtopic. 
   * If only the subtopic Id is supplied this function will use the cards array saved in state.
   * This is not reliable if this function is used to update current cards after setState() for cards was just called
   * because setState() runs asynchronously.
   * 
   * @param subtopicId The id of the selected subtopic
   * @param cards The current array of cards.
   * @returns Returns an array of cards
   */
  setCurrentCards = (subtopicId, cards) => {
    return cards ? cards.filter(card => card.subTopicId === subtopicId) : 
    this.state.cards.filter(card => card.subTopicId === subtopicId);
  }

  /**
   * Add an answer counter to a flashcard and show the answer.
   * 
   * @param id The id of the card which is answered
   * @param isCorrect Whether the person knew the correct answer or not
   */
  answerCard = (id, isCorrect) => {
    console.log("answer called");
    let newCards = this.state.currentCards.map(card => {
      if (card.id === id) {
        return isCorrect ? {...card, right: card.right + 1, turned: true} : {...card, wrong: card.wrong + 1, turned: true};
      }
      return card;
    });
    // Use the setCurrentCards Function to update the current cards too
    this.setState({cards: newCards, currentCards: this.setCurrentCards(this.state.selectedSubTopic.id, newCards)})
  }

  /**
   * Turn the given card around to hide the answer again.
   * 
   * @param id The id of the card to turn
   */
  turnAround = id => {
    let newCards = this.state.currentCards.map(card => {
      if (card.id === id) {
        return {...card, turned: false};
      }
      return card;
    });
    // Use the setCurrentCards Function to update the current cards too
    this.setState({cards: newCards, currentCards: this.setCurrentCards(this.state.selectedSubTopic.id, newCards)})
  }

  /* Topic dialog functions */

  /**
   * Changes the visibility of the modal to add (sub)topics.
   * 
   * @param isVisible Whether the modal should be visible or not
   * @param topicId OPTIONAL: If it is meant for a topic or subtopic. Should be supplied when showing the modal, irrelevant when hiding
   */
  setTopicModalVisibility = (isVisible, topicId) => {
    if(isVisible) {
      this.setState({topicModalVisible: isVisible, topicIdForModal: topicId ? topicId : ''});
    } else {
      this.setState({topicModalVisible: isVisible, topicIdForModal: '', topicToAdd: ''});
    }
  }

  /**
   * Updates the entered name for a new (sub)topic
   * 
   * @param event The input event of which the value represents the new name
   */
  setNewTopicName = event => {
    this.setState({topicToAdd: event.target.value});
  }

  /**
   * Add a (sub)topic.
   * 
   * @param topicId OPTIONAL: The Id of the topic the subtopic belongs to. Only needed when creating a subtopic. 
   */
  addTopic = topicId => {
    if (topicId) {
      let newTopic = {
        id: uuid(), 
        name: this.state.topicToAdd,
        topicId: topicId,
        selected: false
      }
      this.setState({subtopics: [...this.state.subtopics, newTopic], topicModalVisible: false, topicToAdd: ''});
    } else {
      let newTopic = {
        id: uuid(), 
        name: this.state.topicToAdd,
        selected: false
      }
      this.setState({topics: [...this.state.topics, newTopic], topicModalVisible: false, topicToAdd: ''});
    }
  }

  /* Card dialog functions */
  
  /**
   * Changes the visibility of the modal to add flashcards.
   * 
   * @param isVisible Whether the modal should be visible or not
   * @param subTopicId OPTIONAL: The subtopic this flashcard belongs to. Only required when making modal visible
   */
  setCardModalVisibility = isVisible => {
    if (isVisible) {
      this.setState({cardModalVisible: isVisible});
    } else {
      this.setState({cardModalVisible: isVisible, cardQuestionToAdd: '', cardAnswerToAdd: ''});
    }
  }

  /**
   * Updates the entered question for a new flashcard.
   * 
   * @param event The input event of which the value represents the new question
   */
  setNewCardQuestion = event => {
    this.setState({cardQuestionToAdd: event.target.value});
  }

  /**
   * Updates the entered answer for a new flashcard.
   * 
   * @param event The input event of which the value represents the new question
   */
  setNewCardAnswer = event => {
    this.setState({cardAnswerToAdd: event.target.value});
  }

  /**
   * Add a flashcard.
   * 
   */
  addCard = () => {
      let newCard = {
        id: uuid(), 
        question: this.state.cardQuestionToAdd, 
        answer: this.state.cardAnswerToAdd,
        right: 0,
        wrong: 0,
        imagePath: '',
        turned: false,
        subTopicId: this.state.selectedSubTopic.id
      }
      let updatedCards = [...this.state.cards, newCard];
      this.setState({
        cards: updatedCards,
        currentCards: this.setCurrentCards(this.state.selectedSubTopic.id, updatedCards),
        cardQuestionToAdd: '',
        cardAnswerToAdd: '',
        subTopicIdForCard: '',
        cardModalVisible: false
      })
  }

    /* Deletion dialog functions */

    /**
    * Changes the visibility of the modal to confirm deletion.
    * 
    * @param isVisible Whether the modal should be visible or not
    * @param id The id of the element which should potentially be deleted
    * @param type What type of element should be deleted: topic, subtopic or card
    */
    setConfirmModalVisibility = (isVisible, id, type) => {
      if (isVisible) {
        this.setState({confirmModalVisible: isVisible, idToDelete: id, deletionOf: type});
      } else {
        this.setState({confirmModalVisible: isVisible, idToDelete: '', deletionOf: -1});
      }
    }
  
    /**
     * Deceides which function to use to delete an element according to the deletion type.
     * 
     * @param id The id of the element to be deleted
     * @param type What type of element will be deleted
     */
    deleteElement = (id, type) => {
      switch (type) {
        case DELETION_CONST.topic:
          this.deleteTopic(id);
          break;
        case DELETION_CONST.subtopic:
          this.deleteSubTopic(id);
          break;
        case DELETION_CONST.card:
          this.deleteCard(id);
          break;
        default:
          break;
      }
      this.setState({confirmModalVisible: false, idToDelete: '', deletionOf: -1});
    }

    /**
     * Delete a topic and all connected subtopics and cards.
     * 
     * @param id The id of the topic to be deleted
     */
    deleteTopic = id => {
      let newTopics = this.state.topics.filter(topic => topic.id !== id);
      let remainingSubTopics = this.state.subtopics.filter(subtopic => subtopic.topicId !== id);
      let subTopicsToRemove = this.state.subtopics.filter(subtopic => subtopic.topicId === id);
      let remainingCards = this.state.cards;
      let selected = false;
      subTopicsToRemove.forEach(subtopic => {
        remainingCards = remainingCards.filter(card => card.subTopicId !== subtopic.id);
        selected = this.state.selectedSubTopic.id === subtopic.id
      })
      if (selected) {
        this.setState({
          topics: newTopics, 
          subtopics: remainingSubTopics, 
          selectedSubTopic: {}, 
          cards: remainingCards,
          currentCards: []
        });
      } else {
        this.setState({
          topics: newTopics,
          subtopics: remainingSubTopics,
          cards: remainingCards
        })
      }
    }

    /**
     * Delete a subtopic and all connected cards.
     * 
     * @param id The id of the subtopic to be deleted
     */
    deleteSubTopic = id => {
      let remainingSubTopics = this.state.subtopics.filter(subtopic => subtopic.id !== id);
      let remainingCards = this.state.cards.filter(card => card.subTopicId !== id);
      if (this.state.selectedSubTopic.id === id) {
        this.setState({subtopics: remainingSubTopics, selectedSubTopic: {}, cards: remainingCards, currentCards: []})
      } else {
        this.setState({subtopics: remainingSubTopics, cards: remainingCards})
      }
    }

    /**
     * Delete a card.
     * 
     * @param id The id of the card to be deleted
     */
    deleteCard = id => {
      let remainingCards = this.state.cards.filter(card => card.id !== id);
      this.setState({cards: remainingCards, currentCards: this.setCurrentCards(this.state.selectedSubTopic, remainingCards)});
    }

  render() {
    return (
      <div className="app">
        <TopicModal 
          visible={this.state.topicModalVisible}
          topicId={this.state.topicIdForModal}
          topicToAdd={this.state.topicToAdd}
          updateName={this.setNewTopicName}
          addTopic={this.addTopic}
          setVisibility={this.setTopicModalVisibility}
        />
        <CardModal 
          visible={this.state.cardModalVisible}
          setVisibility={this.setCardModalVisibility}
          cardQuestion={this.state.cardQuestionToAdd}
          cardAnswer={this.state.cardAnswerToAdd}
          setQuestion={this.setNewCardQuestion}
          setAnswer={this.setNewCardAnswer}
          addCard={this.addCard}
        />
        <ConfirmModal 
          visible={this.state.confirmModalVisible}
          setVisibility={this.setConfirmModalVisibility}
          type={this.state.deletionOf}
          deleteElement={() => this.deleteElement(this.state.idToDelete, this.state.deletionOf)}
        />
        <div className="content">
        <List 
          topics={this.state.topics}
          subTopics={this.state.subtopics}
          selectTopic={this.changeTopicSelection}
          selectSubTopic={this.changeSubTopicSelection}
          showModal={this.setTopicModalVisibility}
          showDeleteModal={(id, type) => this.setConfirmModalVisibility(true, id, type)}
        />
        <Cards 
          cards={this.state.currentCards}
          currentTopic={this.state.selectedSubTopic.name}
          answerCard={this.answerCard}
          turnAround={this.turnAround}
          showModal={this.setCardModalVisibility}
          showDeleteModal={id => this.setConfirmModalVisibility(true, id, DELETION_CONST.card)}
        />
        </div>
      </div>
    );
  }
}

export default App;
