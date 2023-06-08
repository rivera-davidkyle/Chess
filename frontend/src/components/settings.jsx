import React from "react";
import { useState } from "react";
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
  eloRating,
  setEloRating,
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

  const handleEloRatingChange = (event) => {
    setEloRating(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(color, timeAmount, timeUnit, eloRating);
    setSubmitted(true);
  };

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
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    id="time-amount"
                    label="Time"
                    type="number"
                    value={timeAmount}
                    onChange={handleTimeAmountChange}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="time-unit-label">Unit</InputLabel>
                  <Select
                    labelId="time-unit-label"
                    id="time-unit"
                    value={timeUnit}
                    onChange={handleTimeUnitChange}
                  >
                    <MenuItem value="s">second/s</MenuItem>
                    <MenuItem value="m">minute/s</MenuItem>
                    <MenuItem value="h">hour/s</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <TextField
                  id="elo-rating"
                  label="ELO Rating"
                  type="number"
                  value={eloRating}
                  onChange={handleEloRatingChange}
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
