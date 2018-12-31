import { EventEmitter } from 'events'; 
import dispatcher from '../dispatcher'; 

class AppStore extends EventEmitter {
  constructor() {
    super();

    this.quizId = {id: '', title: ''}; 
    this.mobile = window.innerWidth <= 760; 
  }

  setQuizId(id) {
    this.quizId = id; 
    this.emit('setQuizId'); 
  }

  getQuizId() {
    return this.quizId; 
  }

  changeMobile(flag) {
    this.mobile = flag; 
  }

  getMobile() {
    return this.mobile; 
  }

  handleActions(action) {
    switch(action.type) {
    case 'CHANGE_MOBILE': {
      this.changeMobile(action.text);
      break;
    }
    case 'SET_QUIZ_ID': {
      this.setQuizId(action.id);
      break;
    }
    }
  }
}

const appStore = new AppStore; 
dispatcher.register(appStore.handleActions.bind(appStore)); 

export default appStore; 