import { createStore } from 'redux';
import reducer from './ducks/duck';

export default createStore(reducer);