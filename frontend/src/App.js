import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/navbar.jsx";
import PvEChess from "./components/chess.jsx";

function App() {
  return (
    <div className="App">
      <Navbar />
      <PvEChess />
    </div>
  );
}

export default App;
