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

const mainHeight = {
  minHeight: window.innerHeight-(shorterDimension*0.15)
};
const innerHeight = {
  minHeight: window.innerHeight-(shorterDimension*0.4)
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      tempo: 1,
      menuSummoned: false,
      sounds: {
        kick: {
          src: require('../assets/sounds/kick1.wav'),
          element: document.getElementById('kick')
        },
        snare: {
          src: require('../assets/sounds/snare1.wav'),
          element: document.getElementById('snare')
        },
        hat: {
          src: require('../assets/sounds/hat1.wav'),
          element: document.getElementById('hat')
        },
        clap: {
          src: require('../assets/sounds/clap1.wav'),
          element: document.getElementById('clap')
        }
      }
    };
    this.mainLoop = this.mainLoop.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handlePressPlay = this.handlePressPlay.bind(this);
    requestAnimationFrame(this.mainLoop);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentWillReceiveProps() {


  }

  mainLoop() {
    let step = Math.ceil(ticker / this.state.tempo);
    let kickSound = this.state.sounds.kick.element;
    let snareSound = this.state.sounds.snare.element;
    let tickHand = document.getElementById('tick-hand');
    // console.log('ang', tickHand.style.transform)
    if (this.state.playing) {
      tickHand.style.backgroundColor = 'green';
      tickHand.style.transform = `rotate(${step}deg)`;
      if (ticker % 180 === 0) {
        // kickSound.play();
      }
      ticker++;
    } else {
      tickHand.style.backgroundColor = 'red';
    }

    if (ticker === 360) {
      ticker = 0;
    }

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

  handlePressPlay() {
    let playButton = document.getElementById('play-button');
    this.setState({
      playing: !this.state.playing
    });
    playButton.style.transform = 'scale(0.9)';
    setTimeout(() => {
      playButton.style.transform = 'scale(1)';
    }, 50);
  }

  render() {
    let buttonSymbol;
    if (this.state.playing) {
      buttonSymbol = 'pause_circle_filled_white';
    } else {
      buttonSymbol = 'play_circle_filled_white';
    }
    return (
      <div style={mainHeight} id='main'>
        <Header />
        <audio id='kick' src={this.state.sounds.kick.src}></audio>
        <audio id='snare' src={this.state.sounds.snare.src}></audio>
        <audio id='hat' src={this.state.sounds.hat.src}></audio>
        <audio id='clap' src={this.state.sounds.clap.src}></audio>
        <div id='padding-container' style={innerHeight} >
          <div id='drum-circle'>
            <div id='tick-hand'></div>
          </div>
          <div onClick={this.handlePressPlay} id='play-button'>
            <i className='material-icons'>{buttonSymbol}</i>
          </div>
        </div>
        <Footer onChangeTempo={this.handleTempoChange} />
      </div>
    );
  }
}

export default App;