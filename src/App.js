import React, { Component } from 'react';

import './App.css';

/* Own components */
import List from './components/list/List';
import Cards from './components/cards/Cards';
import TopicModal from './components/modals/topicmodal/TopicModal';

class App extends Component {

  state = {
    topics: [
      {id: 1, name: 'React', selected: false},
      {id: 2, name: 'Docker', selected: false},
    ],
    subtopics: [
      {id:1, name: 'Redux', topicId: 1, selected: false},
      {id: 2, name: 'Virtual DOM', topicId: 1, selected: false},
      {id: 3, name: 'Images', topicId: 2, selected: false}
    ],
    selectedSubTopic: {},
    cards: [
      {
        id: 1, 
        question: "Was ist Redux?", 
        answer: "Redux ist eine state container Implementation für React.",
        right: 0,
        wrong: 0,
        imagePath: '',
        turned: false,
        subTopicId: 1
      }
    ],
    currentCards: [],
    topicModalVisible: false,
    topicIdForModal: 0,
    topicToAdd: ''
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
    console.log("turn called");
    let newCards = this.state.currentCards.map(card => {
      if (card.id === id) {
        return {...card, turned: false};
      }
      return card;
    });
    // Use the setCurrentCards Function to update the current cards too
    this.setState({cards: newCards, currentCards: this.setCurrentCards(this.state.selectedSubTopic.id, newCards)})
  }

  /* Dialog functions */

  /**
   * Changes the visibility of the modal to add (sub)topics.
   * 
   * @param isVisible Whether the modal should be visible or not
   * @param topicId OPTIONAL: If it is meant for a topic or subtopic. Should be supplied when showing the modal, irrelevant when hiding
   */
  setTopicModalVisibility = (isVisible, topicId) => {
    if (topicId === undefined) {
      this.setState({topicModalVisible: isVisible});
    } else {
      this.setState({topicModalVisible: isVisible, topicIdForModal: topicId});
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
        id: this.state.subtopics.length + 1, 
        name: this.state.topicToAdd,
        topicId: topicId,
        selected: false
      }
      this.setState({subtopics: [...this.state.subtopics, newTopic], topicModalVisible: false});
    } else {
      let newTopic = {
        id: this.state.topics.length + 1, 
        name: this.state.topicToAdd,
        selected: false
      }
      this.setState({topics: [...this.state.topics, newTopic], topicModalVisible: false});
    }
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
        <div className="content">
        <List 
          topics={this.state.topics}
          subTopics={this.state.subtopics}
          selectTopic={this.changeTopicSelection}
          selectSubTopic={this.changeSubTopicSelection}
          showModal={this.setTopicModalVisibility}
        />
        <Cards 
          cards={this.state.currentCards}
          currentTopic={this.state.selectedSubTopic.name}
          answerCard={this.answerCard}
          turnAround={this.turnAround}
        />
        </div>
      </div>
    );
  }
}

export default App;
