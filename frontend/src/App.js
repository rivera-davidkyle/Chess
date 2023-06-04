import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/navbar.jsx';
import ChessBoard  from './components/chess.jsx';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <ChessBoard/>
    </div>
  );
}

export default App;
