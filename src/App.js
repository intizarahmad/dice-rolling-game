import React, { useState } from 'react';
import './App.css';
import PlayerPanel from './player/PlayerPanel'
import LABELS from './constants'
/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

function App() {
  const initialPlayersState = [
    {
      playerName: 'Shadan',
      curretScore: 0,
      globalScore: 0
    },
    {
      playerName: 'Mariyam',
      curretScore: 0,
      globalScore: 0
    }
  ]
  const [ playerState, manageScores] = useState(initialPlayersState);
  const [ activeUser, setActiveUser ] = useState(0);
  const [ diceNumber, setDice ] = useState(1);
  
  const [ firstPlayer, secontPlayer ] = playerState

  /** once user click of new game */
  const resetState = ()=>{
    manageScores(initialPlayersState)
    setActiveUser(0)
  }

  /** Once user click on roll again */
  const rollDice = ()=>{
    const dice = Math.floor(Math.random()*6)+1;
    setDice(dice);
    const curretState = [...playerState]
    if( dice === 1){
      curretState[activeUser].curretScore = 0
      const nextUser = activeUser === 0 ? 1 : 0
      setActiveUser(nextUser)
    }else{
      curretState[activeUser].curretScore = curretState[activeUser].curretScore + dice
    }
    manageScores(curretState)
  }

  /** 
   * Once user want to quit
   */
  const onHold = ()=> {
    const curretState = [...playerState]
    const nextUser = activeUser === 0 ? 1 : 0
    curretState[activeUser].globalScore = curretState[activeUser].globalScore + curretState[activeUser].curretScore
    manageScores(curretState)
    setActiveUser(nextUser)
  }

  return (
    <div className="App">
       <div className="wrapper clearfix">
            
            <PlayerPanel 
              playerName= {firstPlayer.playerName} 
              curretScore={firstPlayer.curretScore} 
              globalScore={firstPlayer.globalScore}
              currentLabel={LABELS.current} 
              isActive = {( activeUser === 0) ? true :  false}
            />
            
            <PlayerPanel 
              playerName= {secontPlayer.playerName} 
              curretScore= {secontPlayer.curretScore} 
              globalScore= {secontPlayer.globalScore}
              currentLabel= {LABELS.current}
              isActive = {( activeUser === 1) ? true :  false}
            />

            <button className="btn-new" onClick={resetState}><i className="ion-ios-plus-outline"></i>{LABELS.newGame}</button>
            <button className="btn-roll" onClick={rollDice}><i className="ion-ios-loop"></i>{LABELS.rollDice}</button>
            <button className="btn-hold" onClick={onHold}><i className="ion-ios-download-outline"></i>{LABELS.hold}</button>
            <img src={require(`./img/dice-${diceNumber}.png`)} alt="Img" className="dice" />
        </div>
    </div>
  );
}

export default App;
