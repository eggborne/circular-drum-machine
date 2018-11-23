import style from '../css/styles.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
var uuid = require('uuid/v1');
var moment = require('moment');
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

let ticker = 0;

let shorterDimension = null;
window.innerWidth < window.innerHeight
  ? shorterDimension = window.innerWidth
  : shorterDimension = window.innerHeight;

const heightAdjusted = {
  minHeight: window.innerHeight - (shorterDimension * 0.15)
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: 1,
      menuSummoned: false,
    };
    this.mainLoop = this.mainLoop.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
    
    requestAnimationFrame(this.mainLoop);
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.mainLoop);
  }

  mainLoop() {
    let step = Math.ceil(ticker / this.state.tempo);
    document.getElementById('tick-hand').style.transform = `rotate(${step}deg)`;
    ticker++;
    requestAnimationFrame(this.mainLoop);
  }

  handleTempoChange() {
    let bpm = event.target.value;
    let tempo = 60 / bpm;
    this.setState({
      tempo: tempo
    });
    ticker = 0;
  }

  render() {

    return (
      <div style={heightAdjusted} id='main'>
        <Header />
        <div id='padding-container'>
          <div id='drum-circle'>
            <div id='tick-hand'></div>
          </div>
        </div>
        <Footer onChangeTempo={this.handleTempoChange} />
      </div>
    );
  }

}

export default App;