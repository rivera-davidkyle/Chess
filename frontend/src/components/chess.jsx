import { Chessboard } from 'react-chessboard'
import { Container, IconButton, Button } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos, FirstPage, LastPage } from '@mui/icons-material'
import { useState } from 'react'
import { Chess } from 'chess.js'

export default function ChessBoard() {
  const [game, setGame] = useState(new Chess());

  // Function to make a move in the chess game
  function makeMove(move) {
    const gameCopy = new Chess(game.fen());
    let result;
    try {
      result = gameCopy.move(move); // Try to make the move
    } catch {
      result = null; // Handle the exception if an error occurs during the move
    }
    setGame(gameCopy);
    return result;
  }

  // Callback function when a piece is dropped on the board
  function onDrop(sourceSquare, targetSquare) {
    const move = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q' // Set promotion to 'q' (queen) by default
    });
    console.log(move); // Log the move for debugging purposes
    if (move === null) return false; // If the move is illegal, return false
    return true; // If the move is legal, return true
  }

  return (
    <div>
      <Container>
        <Chessboard
          id="mainboard"
          position={game.fen()}
          onPieceDrop={onDrop}
        />
        <Container>
          <IconButton>
            <FirstPage/>
          </IconButton>
          <IconButton>
            <ArrowBackIos/>
          </IconButton>
          <IconButton>
            <ArrowForwardIos/>
          </IconButton>
          <IconButton>
            <LastPage/>
          </IconButton>
          <Button>
            Reset
          </Button>
        </Container>
      </Container>
    </div>
  )
}
