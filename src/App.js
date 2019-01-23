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
    currentCards: [],
    selectedTopic: '',
    selectedSubTopic: '',
  }

  render() {
    return (
      <div className="App">
        <List 
          topics={this.state.topics}
          subTopics={this.state.subtopics}  
        />
      </div>
    );
  }
}

export default App;
