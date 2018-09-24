import React, { Component } from 'react';
import './styles/App.css';
import FetchWeather from './components/FetchWeather';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title monoton body-title">the PDXweather</h1>
        </header>
        <main>
          <FetchWeather />
        </main>
      </div>
    );
  }
}

export default App;
