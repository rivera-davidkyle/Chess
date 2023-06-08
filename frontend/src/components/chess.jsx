import { Chessboard } from "react-chessboard";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Container } from "@mui/material";
import Settings from "./settings.jsx";
import "../static/css/chessjsx.css";
import { SettingsSharp } from "@mui/icons-material";
import Timer from "./timer.jsx";

export default function PvEChess() {
  const [game, setGame] = useState(new Chess());
  const [color, setColor] = useState("white");
  const [timeAmount, setTimeAmount] = useState(1);
  const [playerTime, setPlayerTime] = useState(0);
  const [compTime, setCompTime] = useState(0);
  const [stopPlayerTime, setStopPlayerTime] = useState(false);
  const [stopCompTime, setStopCompTime] = useState(false);
  const [timeUnit, setTimeUnit] = useState("m");
  const [eloRating, setEloRating] = useState("1200");
  const [submitted, setSubmitted] = useState(false);

  const SEC_IN_MIN = 60;
  const SEC_IN_HOUR = 3600;
  const MS_IN_SEC = 1000;
  const containerStyles = {
    sx: {
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
  };
  function makeComputerMove() {
    const possibleMoves = game.moves();
    // exit if the game is over
    if (game.isGameOver() || game.isStalemate() || possibleMoves.length === 0)
      return;
    const apiUrl = "http://localhost:8000/best_move/";
    const fen = game.fen(); // Get the current FEN from the game
    const elo = eloRating; // Replace with the desired Elo rating

    const requestData = {
      fen: fen,
      elo: eloRating,
    };
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data
        const bestMove = data.best_move;
        console.log("Best Move:", bestMove);

        // Make the best move on the game board
        const updatedGame = new Chess(game.fen());
        updatedGame.move(bestMove);
        setGame(updatedGame);
        setStopCompTime(true);
        setStopPlayerTime(false);
        if (
          game.isGameOver() ||
          game.isStalemate() ||
          possibleMoves.length === 0
        ) {
          setStopCompTime(true);
          setStopPlayerTime(true);
        }
        // Update the UI or perform any other necessary actions
      })
      .catch((error) => {
        // Handle the error
        console.error("Error:", error);
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
        promotion: "q", // Set promotion to 'q' (queen) by default
      });
      setGame(gameCopy);
      setStopPlayerTime(true);
      setStopCompTime(false);
    } catch {
      move = null;
    }

    console.log(game.fen()); // Log the move for debugging purposes
    if (move === null) return false; // If the move is illegal, return false

    return true; // If the move is legal, return true
  }

  useEffect(() => {
    if (color === "white") {
      if (game !== null && game.turn() === "b") {
        makeComputerMove();
      }
    } else {
      if (game !== null && game.turn() === "w") {
        makeComputerMove();
      }
    }
  }, [game]);

  useEffect(() => {
    if (game !== null && color === "black" && game.turn() === "w") {
      setStopPlayerTime(true);
      setStopCompTime(false);
      makeComputerMove();
    } else {
      setStopPlayerTime(false);
      setStopCompTime(true);
    }
    switch (timeUnit) {
      case "s":
        setPlayerTime(timeAmount * MS_IN_SEC);
        setCompTime(timeAmount * MS_IN_SEC);
        break;
      case "m":
        setPlayerTime(timeAmount * SEC_IN_MIN * MS_IN_SEC);
        setCompTime(timeAmount * SEC_IN_MIN * MS_IN_SEC);
        break;
      case "h":
        setPlayerTime(timeAmount * SEC_IN_HOUR * MS_IN_SEC);
        setCompTime(timeAmount * SEC_IN_HOUR * MS_IN_SEC);
        break;
      default:
        setPlayerTime(MS_IN_SEC);
        setCompTime(MS_IN_SEC);
    }
    console.log(playerTime, compTime);
  }, [submitted]);

  return (
    <Container sx={containerStyles.sx}>
      <div className="boardWrapper">
        {submitted && (
          <Timer
            time={compTime}
            setTime={setCompTime}
            stop_time={stopCompTime}
          />
        )}
        <Chessboard
          id="mainboard"
          arePiecesDraggable={submitted}
          boardOrientation={color}
          boardWidth={450}
          arePremovesAllowed={true}
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        />
        {submitted && (
          <Timer
            time={playerTime}
            setTime={setPlayerTime}
            stop_time={stopPlayerTime}
          />
        )}
      </div>
      <Settings
        color={color}
        setColor={setColor}
        timeAmount={timeAmount}
        setTimeAmount={setTimeAmount}
        timeUnit={timeUnit}
        setTimeUnit={setTimeUnit}
        eloRating={eloRating}
        setEloRating={setEloRating}
        submitted={submitted}
        setSubmitted={setSubmitted}
      />
    </Container>
  );
}
