import React, { Component } from 'react'; 
import AppStore from '../Store/AppStore'; 
import './App.scss'; 

class App extends Component {
  constructor() {
    super();

    this.state = {
      isMobile: AppStore.getMobile()
    };
  }

  componentDidMount() {
    AppStore.on('changeUser', () => {
      this.setState({
        user: AppStore.getUser(), 
      });
    });
  }

  render() {
    const browser = window.chrome ? 'Chrome' : 'Other';
    const userName = AppStore.getUser();
    const pageState = {
      fromHome: true, 
      browser,
      ...this.state,
    }; 

    return ( 
      <div className="App">
      </div> 
    ); 
  }
}
export default App;
