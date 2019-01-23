import React, { Component } from 'react';

import './App.css';

/* Own components */
import List from './components/list/List';

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
    currentCards: []
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
    let newTopics = this.state.subtopics.map(topic => {
      if (topic.id === id) return {...topic, selected: true};
      return {...topic, selected: false};
    });
    this.setState({subtopics: newTopics});
  }

  render() {
    return (
      <div className="App">
        <List 
          topics={this.state.topics}
          subTopics={this.state.subtopics}
          selectTopic={this.changeTopicSelection}
          selectSubTopic={this.changeSubTopicSelection}
        />
      </div>
    );
  }
}

export default App;
