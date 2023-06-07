import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/navbar.jsx';
import PvEChess from './components/chess.jsx';
import Settings from './components/settings.jsx';
import { Container } from '@mui/material';
function App() {
  const containerStyles = {
    sx: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }
  }
  return (
    <div className="App">
      <Navbar/>
      <Container sx={containerStyles.sx}>
        <PvEChess/>
        <Settings/>
      </Container>
    </div>
  );
}

export default App;
