import React, { useState, useEffect } from "react";
import { Typography, Paper, Box } from "@mui/material";

const Timer = ({ time, setTime, stop_time }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const boxStyles = {
    sx: {
      fontSize: "4rem",
    },
  };
  const textStyles = {
    sx: {
      fontSize: "3vh",
    },
  };
  const calculateTime = () => {
    const totalSeconds = Math.floor(time / 1000);
    const updatedHours = Math.floor(totalSeconds / 3600);
    const updatedMinutes = Math.floor((totalSeconds % 3600) / 60);
    const updatedSeconds = totalSeconds % 60;

    setHours(updatedHours);
    setMinutes(updatedMinutes);
    setSeconds(updatedSeconds);
    time -= 1000;
    setTime(time);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (time >= 0 && !stop_time) {
        calculateTime();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, stop_time]);

  return (
    <div className="timer">
      <Box sx={boxStyles.sx}>
        <Paper elevation={5}>
          <Typography sx={textStyles.sx}>
            {hours.toString().padStart(2, "0")}:
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </Typography>
        </Paper>
      </Box>
    </div>
  );
};

export default Timer;
