import React, { Component } from 'react';

import './App.css';

class App extends Component {
  
  constructor() {
    super();
    this.state = {
      res : null,
      user : 0,
      comp : 0,
      note : "Let's start the game.",
      show : true,
      computerAction : null
    }
  }

  getResult(type) {
    switch(type) {
      case "win": 
        return `You win!👏`;
      case "lost" : 
        return `You lost!👎`;
      case "draw" : 
        return `It's a draw 🙌`
      default :
        return '' ;
    }
  }

  getRandomAction = () => {
    let rand = Math.floor(Math.random() * 3);
    let actions = ['rock','paper','scissors'];
    return actions[rand];
  }

  onClickAction = async(act) => {
    this.setState({show : false});
    let compAct = this.getRandomAction();
    this.setState({computerAction : compAct});
    setTimeout(() => {
      this.verifyRes(act,compAct)
    },1500)
  }

  verifyRes = (act,compAct) => {
    this.setState({computerAction : null});
    if(act === "paper" && compAct === "rock") {
      this.setState({res : 'win' , user : this.state.user + 1 , note : "Paper covers rock." ,show : true});
    } else if(act === "rock" && compAct === "scissors") {
      this.setState({res : 'win' , user : this.state.user + 1 , note : "Rock breaks scissors.",show : true});
    } else if(act === "scissors" && compAct === "paper") {
      this.setState({res : 'win' , user : this.state.user + 1 , note : "Scissors cuts paper.",show : true});      
    } else if(act === compAct) {
      this.setState({res : 'draw' , note : 'Nothing Happend🙄.',show : true})
    } else {
      this.setState({res : 'lost',note : "",comp : this.state.comp + 1,show : true})
    }
  }

  showIcon(name) {
    switch(name) {
      case "rock" :
        return <span role="img" aria-label="rock" id="computerAction">✊</span>
      case "paper" :
        return <span role="img" aria-label="paper" id="computerAction">✋</span>
      default :
        return <span role="img" aria-label="scissors" id="computerAction">✌</span>
    }
  }

  render() {
    return (
      <div>
        <header>
          <h1>Rock, Paper, Sicssors</h1>
        </header>
        <div className="score-board">
          <div id="user-badge" className="badge">user</div>
          <div id="comp-badge" className="badge">comp</div>
          <p><span id="user-score">{this.state.user}</span> : <span id="comp-score">{this.state.comp}</span></p>
        </div>
        <div className="action-section">
          {this.state.computerAction ? <h1 className="opacity-adder">{this.showIcon(this.state.computerAction)}</h1> : <h1>{this.state.note}{this.getResult(this.state.res)}</h1>}
          <div className="action-list">
            <span onClick={() => {this.onClickAction('rock')}} role="img" aria-label="rock" id="rock">✊</span>
            <span onClick={() => {this.onClickAction('paper')}} role="img" aria-label="paper" id="paper">✋</span>
            <span onClick={() => {this.onClickAction('scissors')}} role="img" aria-label="scissors" id="scissors">✌</span>
          </div>
          {!this.state.show ? <h3 className="opacity-adder"> </h3> : <h3>Make your move.</h3>}
        </div>
      </div>
    );
  }
}

export default App;
