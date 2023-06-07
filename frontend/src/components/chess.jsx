import { Chessboard } from 'react-chessboard';
import { useState, useEffect } from 'react';
import { Chess } from 'chess.js';
import { Container } from '@mui/material';

export default function PvEChess() {
  const [game, setGame] = useState(new Chess());

  function makeComputerMove() {
    const possibleMoves = game.moves();
    // exit if the game is over
    if (game.isGameOver() || game.isStalemate() || possibleMoves.length === 0) return;

    const apiUrl = 'http://localhost:8000/best_move/';
    const fen = game.fen(); // Get the current FEN from the game
    const elo = 200; // Replace with the desired Elo rating

    const requestData = {
      fen: fen,
      elo: elo,
    };
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        const bestMove = data.best_move;
        console.log('Best Move:', bestMove);
  
        // Make the best move on the game board
        const updatedGame = new Chess(game.fen());
        updatedGame.move(bestMove);
        setGame(updatedGame);
        // Update the UI or perform any other necessary actions
      })
      .catch((error) => {
        // Handle the error
        console.error('Error:', error);
      });
  }
  // Callback function when a piece is dropped on the board
  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = new Chess(game.fen());
    let move;

    try {
      move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // Set promotion to 'q' (queen) by default
      });
      setGame(gameCopy);
    } catch {
      move = null;
    }
    
    console.log(game.fen()); // Log the move for debugging purposes
    if (move === null) return false; // If the move is illegal, return false

    return true; // If the move is legal, return true
  }

  useEffect(() => {
    if (game !== null && game.turn() === 'b') {
      makeComputerMove();
    }
  }, [game]);


  return (
    <div>
      <Container>
        <Chessboard
          id="mainboard"
          boardWidth={450}
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        />
      </Container>
    </div>
  )
}
