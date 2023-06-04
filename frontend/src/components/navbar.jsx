import React from 'react'
import { AppBar, Button, Box, Toolbar, Container } from '@mui/material';

export default function Navbar() {
  return (
    <div>
        <AppBar position = "static">
            <Container>
                <Toolbar>
                    <Button>
                        Test
                    </Button>
                </Toolbar>
            </Container>
        </AppBar>
    </div>
  )
}
