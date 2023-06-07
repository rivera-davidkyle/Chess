import React from 'react'
import { useState } from 'react';
import { Container,
        IconButton, 
        Button,
        FormControl,
        FormLabel,
        Select,
        MenuItem,
        InputLabel } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos, FirstPage, LastPage } from '@mui/icons-material'

function Settings() {
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };
  return (
    <div>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Color</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedColor}
          onChange={handleColorChange}
          label="Color">
            <MenuItem value="b">Black</MenuItem>
            <MenuItem value="w">White</MenuItem>
          </Select>
        </FormControl>
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
          <Button>
            Undo
          </Button>
        </Container>
        </div>
  )
}

export default Settings