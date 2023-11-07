import React, { useState, useEffect } from "react";
import { Typography, Paper, Box, Container } from "@mui/material";
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
    border: "2px inset #000",
  },
};
const textStyles = {
  sx: {
    fontSize: "3vh",
  },
};
const Timer = ({
  time,
  setTime,
  stopTime,
  setStopTime,
  player,
  win,
  setWin,
}) => {
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
  };
  const [timerData, setTimerData] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (time >= 0) {
        calculateTime();
        if (!stopTime) {
          setTime(time - 100);
        }
      } else if (time < 0) {
        setStopTime(true);
        if (player) {
          setWin(false);
        } else {
          setWin(true);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [time, stopTime]);

  const { hours, minutes, seconds } = timerData;

  return (
    <div className="timer">
      <Container>
        <Box sx={boxStyles.sx}>
          <Paper elevation={5} sx={paperStyles.sx}>
            <Typography sx={textStyles.sx} align="center">
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
