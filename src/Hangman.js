import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import {randomWord} from './words'

class Hangman extends Component {
  /* by default, allow 6 guesses and use provided gallows images. */

  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    winMessage:'You Win!',
    loseMessage:'You Lose!'
  };

  state = { nWrong: 0, guessed: new Set(), answer: randomWord(), gameEnd:''};

  /* guessedWord: show current-state of word:
       if guessed letters are {a,p,e}, show "app_e" for "apple"
  */

  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /* handleGuest: handle a guessed letter:
      - add to guessed letters
      - if not in answer, increase number-wrong guesses
      - will check stopgame only after setState is finished running
  */

  handleGuess(ltr) {
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }), ()=>{
      if (this.state.nWrong === this.props.maxWrong){
        this.stopGame()
      } else if(this.guessedWord().indexOf('_')===-1){
        this.setState(st => ({
          gameEnd: this.props.winMessage
        }))
      }
    });
    console.log(this.guessedWord());
  }

  /* handle game stope: handle how to stop the game if max guesses reached
  */

  stopGame(){
    this.setState(st => ({
        gameEnd: `${this.props.loseMessage} The correct word was ${this.state.answer}`
    }))
  }

  /* button to restart the game
  */
  restartButton() {
    return( 
      <button
        onClick={evt => this.restart()}
      >
        Restart
      </button>
      );
  }

  restart(){
    this.setState(st => ({
      nWrong: 0, 
      guessed: new Set(), 
      answer: randomWord(), 
      gameEnd:''
    }))
  }

  /* buttons: return array of letter buttons to render */

  buttons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={evt => this.handleGuess(evt.target.value)}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /* render: render game */

  render() {
    let cssStyle = {
      marginTop:`20px`,
    }
  
    return (
      <div className="Hangman">
        <img src={this.props.images[this.state.nWrong]} />
        <p>Wrong Guesses: {this.state.nWrong}</p>
        <p className="Hangman-word">{this.guessedWord()}</p>
        {this.state.gameEnd ? null : <p>{this.buttons()}</p>}
        <p style={cssStyle}>{this.state.gameEnd}</p>
        <p>{this.restartButton()}</p>
      </div>
    );
  }
}

export default Hangman;
