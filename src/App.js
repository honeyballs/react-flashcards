import React from 'react';

import './App.css';

/* Own components */
import List from './components/list/List';
import Cards from './components/cards/Cards';
import TopicModal from './components/modals/topicmodal/TopicModal';
import CardModal from './components/modals/cardmodal/CardModal';
import ConfirmModal from './components/modals/confirmmodal/ConfirmModal';

const App = props => {
  return (
    <div className="app">
      <TopicModal />
      <CardModal />
      <ConfirmModal />
      <div className="content">
        <List />
        <Cards />
      </div>
    </div>
  )
}

export default App;
