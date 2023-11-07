import { Chessboard } from "react-chessboard";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import {
  Container,
  Dialog,
  Button,
  Typography,
  DialogActions,
  DialogContent,
  // IconButton,

} from "@mui/material";
import Settings from "./settings.jsx";
import "../static/css/chessjsx.css";
import Timer from "./timer.jsx";
// import {
//   ArrowBackIos,
//   ArrowForwardIos,
//   FirstPage,
//   LastPage,
// } from "@mui/icons-material";

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
    width: "100%",
    height: "100%",
  },
};
const dialogStyles = {
  sx: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default function PvEChess() {
  const [game, setGame] = useState(new Chess());
  const [color, setColor] = useState("white");
  const [open, setOpen] = useState(false);
  const [timeAmount, setTimeAmount] = useState(1);
  const [playerTime, setPlayerTime] = useState(0);
  const [compTime, setCompTime] = useState(0);
  const [stopPlayerTime, setStopPlayerTime] = useState(false);
  const [stopCompTime, setStopCompTime] = useState(false);
  const [timeUnit, setTimeUnit] = useState("m");
  const [skillLevel, setSkillLevel] = useState(10);
  const [submitted, setSubmitted] = useState(false);
  const [win, setWin] = useState(null);
  const [endMsg, setEndMsg] = useState("null");
  const [endSubMsg, setEndSubMsg] = useState("null");

  function makeComputerMove() {
    const possibleMoves = game.moves();
    // exit if the game is over
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0)
      return;
    const apiUrl = "http://localhost:8000/best_move/";
    const fen = game.fen(); // Get the current FEN from the game
    const sklevel = skillLevel; // Replace with the desired Elo rating

    const requestData = {
      fen: fen,
      skill: sklevel,
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
        console.log("Computer move: ", bestMove);
        if (possibleMoves.length === 0 || game.isGameOver()) return;
        setGame(updatedGame);
        setStopCompTime(true);
        setStopPlayerTime(false);

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
      console.log("Player move: ", move);
      setGame(gameCopy);
      setStopPlayerTime(true);
      setStopCompTime(false);
    } catch {
      move = null;
    }
    if (move === null) return false; // If the move is illegal, return false

    return true; // If the move is legal, return true
  }

  useEffect(() => {
    console.log("Prompted, current turn->", game.turn());
    if (game === null) return;
    if (win != null) {
      setOpen(false);
      setStopPlayerTime(true);
      setStopCompTime(true);
      if (
        (playerTime <= 0 && color === "white") ||
        (compTime <= 0 && color === "black")
      ) {
        setEndMsg("Black Wins!");
      } else {
        setEndMsg("White Wins!");
      }
      setEndSubMsg("by timeout");
      return;
    }

    const possibleMoves = game.moves();
    const currentTurn = game.turn();
    const isCheckmate = game.isCheckmate();
    const isDraw = game.isDraw();

    if (isCheckmate) {
      setOpen(false);
      setStopPlayerTime(true);
      setStopCompTime(true);
      setEndMsg(currentTurn === "b" ? "White wins!" : "Black wins!");
      setEndSubMsg("by checkmate");
    } else if (isDraw) {
      setOpen(false);
      setStopPlayerTime(true);
      setStopCompTime(true);
      setEndMsg("Draw!");
      if (game.isStalemate()) setEndSubMsg("by stalemate");
      if (game.isThreefoldRepetition()) setEndSubMsg("by repeated moves");
      if (game.isInsufficientMaterial())
        setEndSubMsg("by insufficient material");
    } else if (possibleMoves.length === 0 || game.isGameOver()) {
      setStopCompTime(true);
      setStopPlayerTime(true);
    } else if (currentTurn === "b" && color === "white" && open) {
      makeComputerMove();
    } else if (currentTurn === "w" && color === "black" && open) {
      makeComputerMove();
    }
  }, [game, win]);

  useEffect(() => {
    if (submitted) setOpen(true);
    else return;
    if (color === "black" && game.turn() === "w") {
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
  }, [submitted]);

  const handlePlayAgain = (event) => {
    setSubmitted(false);
    setWin(null);
    setGame(new Chess());
  };
  return (
    <Container sx={containerStyles.sx}>
      {submitted && (
        <Dialog open={!open} sx={dialogStyles.sx}>
          <DialogContent>
            <Typography align="center">{endMsg}</Typography>
            <Typography align="center">{endSubMsg}</Typography>
          </DialogContent>
          <DialogActions sx={{ justifyContent: "center" }}>
            <Button onClick={handlePlayAgain}>Play Again</Button>
          </DialogActions>
        </Dialog>
      )}
      <div className="boardWrapper">
        {submitted && (
          <div className="timerWrapper">
            <Timer
              time={compTime}
              setTime={setCompTime}
              stopTime={stopCompTime}
              setStopTime={setStopCompTime}
              player={false}
              win={win}
              setWin={setWin}
            />
          </div>
        )}
        <Chessboard
          id="mainboard"
          arePiecesDraggable={open}
          boardOrientation={color}
          boardWidth={600}
          position={game.fen()}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
          }}
        />
        {submitted && (
          <div className="timerWrapper">
            <Timer
              time={playerTime}
              setTime={setPlayerTime}
              stopTime={stopPlayerTime}
              setStopTime={setStopPlayerTime}
              player={true}
              win={win}
              setWin={setWin}
            />
          </div>
        )}
      </div>
      {/* {submitted && (
        <Container sx={{
          display:"flex", 
          justifyContent:"center"
          }}>
          <IconButton>
            <FirstPage />
          </IconButton>
          <IconButton>
            <ArrowBackIos />
          </IconButton>
          <IconButton>
            <ArrowForwardIos />
          </IconButton>
          <IconButton>
            <LastPage />
          </IconButton>
          <Button onClick={() => {
            const resetGame = new Chess(game.fen());
            resetGame.reset();
            setGame(resetGame);
          }}>Reset</Button>
          <Button onClick={() => {
            console.log(game.fen());
            const undoMove = new Chess(game.fen());
            undoMove.undo();
            console.log(undoMove.fen());
            setGame(undoMove);
          }}>Undo</Button>
        </Container>
      )} */}
      {!submitted && (<Settings
        color={color}
        setColor={setColor}
        timeAmount={timeAmount}
        setTimeAmount={setTimeAmount}
        timeUnit={timeUnit}
        setTimeUnit={setTimeUnit}
        skillLevel={skillLevel}
        setSkillLevel={setSkillLevel}
        submitted={submitted}
        setSubmitted={setSubmitted}
      />
      )}
    </Container>
  );
}
