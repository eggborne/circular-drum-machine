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
    this.createMarkers = this.createMarkers.bind(this);
    this.mainLoop = this.mainLoop.bind(this);
    this.handleTempoChange = this.handleTempoChange.bind(this);
    this.handlePressPlay = this.handlePressPlay.bind(this);

    
    requestAnimationFrame(this.mainLoop);
  }

  componentDidMount() {
    this.createMarkers(16);
  }

  componentWillUnmount() {

  }

  componentWillReceiveProps() {


  }

  mainLoop() {
    let time = Date.now();
    let step = Math.ceil(ticker / this.state.tempo);
    let kickSound = document.getElementById('kick')
    let snareSound = document.getElementById('snare')
    let hatSound = document.getElementById('hat')
    let tickHand = document.getElementById('tick-hand');
    if (this.state.playing) {
      // tickHand.style.backgroundColor = 'green';
      tickHand.style.transform = `rotate(${step}deg)`;
      if (ticker % 180 === 0) {
        // kickSound.play();
      }
      if (step % 90 === 0) {
        kickSound.play();
        tickHand.style.backgroundColor = 'red';
        setTimeout(() => {
          tickHand.style.backgroundColor = 'gray';
        },100)
      }
      if ((step+45) % 90 === 0) {
        snareSound.play();
        tickHand.style.backgroundColor = 'green';
        setTimeout(() => {
          tickHand.style.backgroundColor = 'gray';
        },100)
      }
      
      ticker++;
      if (ticker === 360) {
        ticker = 0;
      }
    } else {
      tickHand.style.backgroundColor = 'red';
    }
    
    requestAnimationFrame(this.mainLoop);
  }


  createMarkers(num) {
    let radius = Math.round(shorterDimension * 0.48);
    let headerHeight = Math.round(shorterDimension * 0.15);
    console.log('radius', radius)
    for (let i = 0; i < (num/2); i++) {
      let wedgeSize = (360 / num) * i;
      console.log('wedge', wedgeSize)
      let newMark = document.createElement('mark0');
      let markHeight = radius * 2.1;
      let markProtrusion = radius * 0.05;
      if (i % 2 === 0) {
        newMark.style.backgroundColor = '#222';
      } else {
        newMark.style.backgroundColor = '#444';
      }
      if (i % (num/4) === 0) {
        newMark.style.width = '1vmin'
      } else {
        newMark.style.width = '0.5vmin';

      }
      newMark.style.height = `${markHeight}px`;
      
      newMark.style.position = 'absolute';
      newMark.style.zIndex = 2;
      newMark.style.transformOrigin = '50% 50%'
      // newMark.style.transform = `translateY(${-radius*1.05}px)`;
      newMark.style.transform = `rotate(${wedgeSize}deg)`;
      newMark.style.top = `${document.getElementById('drum-circle').offsetTop+headerHeight-markProtrusion}px`;
      document.getElementById('main').appendChild(newMark);
    }

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