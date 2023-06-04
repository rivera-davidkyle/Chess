import { Chessboard } from 'react-chessboard'
import { Container, IconButton, Button } from '@mui/material'
import { ArrowBackIos, ArrowForwardIos,FirstPage, LastPage } from '@mui/icons-material'
export default function ChessBoard() {
  return (
    <div>
      <Container>
        <Chessboard id = "BasicBoard" />
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
        </Container>
      </Container>
    </div>
  )
}
