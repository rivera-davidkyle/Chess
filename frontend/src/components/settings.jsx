import React from "react";
import { useState } from "react";
import { Alert } from "@mui/material";
import Timer from "./timer.jsx";
import {
  Container,
  Grid,
  IconButton,
  Button,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  TextField,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  FirstPage,
  LastPage,
} from "@mui/icons-material";

const fieldStyles = {
  sx: {
    padding: "10px",
  },
};

const Settings = ({
  color,
  setColor,
  timeAmount,
  setTimeAmount,
  timeUnit,
  setTimeUnit,
  skillLevel,
  setSkillLevel,
  submitted,
  setSubmitted,
}) => {

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleTimeAmountChange = (event) => {
    setTimeAmount(event.target.value);
  };

  const handleTimeUnitChange = (event) => {
    setTimeUnit(event.target.value);
  };

  const handleSkillLevelChange = (event) => {
    setSkillLevel(event.target.value);
    
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    console.log(color, timeAmount, timeUnit, skillLevel);
    }
  const timeAmountMin = timeUnit === "m" || timeUnit === "s" ? 1 : 1;
  const timeAmountMax = timeUnit === "m" || timeUnit === "s" ? 59 : 12;
  return (
    <div>
      {!submitted && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="color-label">Color</InputLabel>
                <Select
                  labelId="color-label"
                  id="color"
                  value={color}
                  onChange={handleColorChange}
                >
                  <MenuItem value="black">Black</MenuItem>
                  <MenuItem value="white">White</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xl={8}>
                <FormControl fullWidth>
                  <TextField
                    id="time-amount"
                    label="Time"
                    type="number"
                    value={timeAmount}
                    inputProps={{
                      min: timeAmountMin,
                      max: timeAmountMax,
                    }}
                    onChange={handleTimeAmountChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xl={8}>
                <FormControl fullWidth>
                  <InputLabel id="time-unit-label">Unit</InputLabel>
                  <Select
                    labelId="time-unit-label"
                    id="time-unit"
                    value={timeUnit}
                    onChange={handleTimeUnitChange}
                  >
                    <MenuItem value="s">sec/s</MenuItem>
                    <MenuItem value="m">min/s</MenuItem>
                    <MenuItem value="h">hr/s</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  id="skill-level"
                  label="Skill Level"
                  type="number"
                  inputProps={{
                    min: 1,
                    max: 20,
                  }}
                  value={skillLevel}
                  onChange={handleSkillLevelChange}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                Play
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
      {submitted && (
        <Container>
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
          <Button>Reset</Button>
          <Button>Undo</Button>
        </Container>
      )}
    </div>
  );
};

export default Settings;
