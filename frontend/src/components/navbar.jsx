import React from "react";
import {
  AppBar,
  Button,
  Box,
  Toolbar,
  Container,
  Typography,
} from "@mui/material";

export default function Navbar() {
  return (
    <div>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Button>
              <Typography color="common.white">Chess</Typography>
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
