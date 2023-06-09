import React, { useState, useEffect } from "react";
import { Typography, Paper, Box, Container } from "@mui/material";

const Timer = ({ time, setTime, stop_time, player, win, setWin }) => {
  const calculateTime = () => {
    const totalSeconds = Math.floor(time / 1000);
    const updatedHours = Math.floor(totalSeconds / 3600);
    const updatedMinutes = Math.floor((totalSeconds % 3600) / 60);
    const updatedSeconds = totalSeconds % 60;
    setTimerData({
      hours: updatedHours,
      minutes: updatedMinutes,
      seconds: updatedSeconds,
    });
    setTime(time - 1000);
    console.log(time);
  };
  const [timerData, setTimerData] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const containerStyles = {
    sx: {},
  };
  const boxStyles = {
    sx: {
      width: "7vw",
      height: "5vh",
      marginLeft: "auto",
    },
  };
  const paperStyles = {
    sx: {
      border: "1px inset #000",
    },
  };
  const textStyles = {
    sx: {
      fontSize: "3vh",
    },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (time >= 0 && !stop_time) {
        calculateTime();
      } else if (time < 0) {
        if (player) {
          setWin(false);
        } else {
          setWin(true);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, stop_time]);

  const { hours, minutes, seconds } = timerData;

  return (
    <div className="timer">
      <Container>
        <Box sx={boxStyles.sx}>
          <Paper elevation={5} sx={paperStyles.sx}>
            <Typography sx={textStyles.sx}>
              {hours > 0 ? hours.toString().padStart(2, "0") + ":" : ""}
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </Typography>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default Timer;
