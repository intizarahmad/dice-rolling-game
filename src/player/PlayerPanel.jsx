import React from 'react';

const PlayerPanel = ({playerName, curretScore, globalScore,  currentLabel, isActive}) => {
    var pannelClasses = ["player-0-panel"];
    if (isActive){
        pannelClasses.push("active");
    } 
    return (
        <div className={pannelClasses.join(" ")} >
            <div className="player-name" id="name-0">{playerName}</div>
            <div className="player-score" id="score-0">{globalScore}</div>
            <div className="player-current-box">
                <div className="player-current-label">{currentLabel}</div>
                <div className="player-current-score" id="current-0">{curretScore}</div>
            </div>
        </div>
    );
};

export default PlayerPanel;