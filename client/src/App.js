import React, { Component } from 'react';

import NightMode from './components/NightMode';
import Clock from './components/Clock';
import Weather from './components/Weather';
import Greeting from './components/Greeting';
import News from './components/News';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      theme: "",
    };
  }

  handleThemeChange(newTheme) {
    this.setState({
      theme: newTheme,
    });
  };

  render() {
    return (
      <div id="App" className='App dayTheme'>
        <header>
          <NightMode onThemeChange={this.handleThemeChange.bind(this)}/>
          <Clock />
          <Weather theme={this.state.theme} />
        </header>
        <Greeting name={this.state.name} />
        <footer>
          <News theme={this.state.theme} />
        </footer>
      </div>
    );
  }
}

export default App;