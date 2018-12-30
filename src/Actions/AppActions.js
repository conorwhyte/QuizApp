import dispatcher from '../dispatcher'; 

export function changeMobile(text) {
  dispatcher.dispatch({
    type: 'CHANGE_MOBILE', 
    text, 
  }); 
}

export function setQuizId(id) {
  dispatcher.dispatch({
    type: 'SET_QUIZ_ID', 
    id, 
  }); 
}