import React, { useState, useEffect } from "react";
import Square from "./Square";
import "./styles.css";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [playerNames, setPlayerNames] = useState({ X: "", O: "" });
  const [showInputFields, setShowInputFields] = useState(true);

  useEffect(() => {
    const checkWinner = () => {
      const winnerLogic = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let logic of winnerLogic) {
        const [a, b, c] = logic;
        if (
          state[a] !== null &&
          state[a] === state[b] &&
          state[a] === state[c]
        ) {
          return state[a];
        }
      }

      if (state.every((square) => square !== null)) {
        return "draw";
      }

      return null;
    };

    const winnerResult = checkWinner();
    setWinner(winnerResult);

    if (winnerResult && winnerResult !== "draw") {
      setScores((prevScores) => ({
        ...prevScores,
        [winnerResult]: prevScores[winnerResult] + 1,
      }));
    }
  }, [state]);

  const handleClick = (index) => {
    if (state[index] !== null || winner) {
      return;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () => {
    setState(Array(9).fill(null));
    setWinner(null);
    setIsXTurn(true);
   
    setShowInputFields(true);
  };

  const handleNameChange = (player, e) => {
    setPlayerNames({
      ...playerNames,
      [player]: e.target.value,
    });
  };

  const startGame = () => {
    if (playerNames.X !== "" && playerNames.O !== "") {
      setState(Array(9).fill(null));
      setWinner(null);
      setIsXTurn(true);
      
      setShowInputFields(false);
      setScores({ X: 0, O: 0 });
    }
  };

  const handleContinueGame = () => {
    setState(Array(9).fill(null));
    setWinner(null);
    setIsXTurn(true);
    
  };

  if (showInputFields) {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-10 col-sm-12">
            <div className="board-container">
              <h1 className="text-center">Enter Player Names</h1>
              <div className="player-names">
                <input
                  type="text"
                  placeholder="Player X Name"
                  value={playerNames.X}
                  onChange={(e) => handleNameChange("X", e)}
                />
                <input
                  type="text"
                  placeholder="Player O Name"
                  value={playerNames.O}
                  onChange={(e) => handleNameChange("O", e)}
                />
              </div>
              <div className="button-container">
                <div className="d-flex justify-content-center">
                  <button onClick={startGame}>Start Playing</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4 col-md-10 col-sm-12">
          <div className="board-container">
            <h1 className="text-center">Tic Tac Toe</h1>
            {winner ? (
              <>
                {winner === "draw" ? (
                  <>
                    <div className="game-result">The game is a draw!</div>
                  </>
                ) : (
                  <>
                    <div className="game-result">
                      {playerNames[winner]} won the game!
                    </div>
                  </>
                )}
                <div className="score-container">
                  <div>
                    {playerNames.X}: {scores.X}
                  </div>
                  <div>
                    {playerNames.O}: {scores.O}
                  </div>
                </div>
                <div className="button-container">
                  <div className="d-flex justify-content-center mb-2">
                    <button onClick={handleContinueGame}>Continue Game</button>
                  </div>
                  <div className="d-flex justify-content-center mb-2">
                    <button onClick={handleReset}>New Game</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-center">
                  Player {isXTurn ? playerNames.X : playerNames.O}'s Turn
                </h3>
                <div className="board-row">
                  {[0, 1, 2].map((index) => (
                    <Square
                      key={index}
                      onClick={() => handleClick(index)}
                      value={state[index]}
                    />
                  ))}
                </div>
                <div className="board-row">
                  {[3, 4, 5].map((index) => (
                    <Square
                      key={index}
                      onClick={() => handleClick(index)}
                      value={state[index]}
                    />
                  ))}
                </div>
                <div className="board-row">
                  {[6, 7, 8].map((index) => (
                    <Square
                      key={index}
                      onClick={() => handleClick(index)}
                      value={state[index]}
                    />
                  ))}
                </div>
                <div className="score-container">
                  <div>
                    {playerNames.X}: {scores.X}
                  </div>
                  <div>
                    {playerNames.O}: {scores.O}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
