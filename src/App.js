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

  render() {
    return (
      <div className="App">
        <List 
          topics={this.state.topics}
          subTopics={this.state.subtopics}
          selectTopic={this.changeTopicSelection}  
        />
      </div>
    );
  }
}

export default App;
