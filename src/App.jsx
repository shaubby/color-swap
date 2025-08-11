
import './App.css';
import Grid from './Grid';
import Grid2 from './Grid2';
import { useState } from 'react';
const colors = ['#ebc034', '#6193d4', '#d46161', '#7fc464'];

function getRandomGrid(size) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => colors[Math.floor(Math.random() * colors.length)])
  );
}

function App() {
  const gridSize = 5;
  const [grid1, setGrid1] = useState(() => getRandomGrid(gridSize));
  const [grid2, setGrid2] = useState(() => getRandomGrid(gridSize));
  const [winner, setWinner] = useState(null);

  function handleWin(player) {
    setWinner(player);
  }

  function handleRestart() {
    setGrid1(getRandomGrid(gridSize));
    setGrid2(getRandomGrid(gridSize));
    setWinner(null);
  }

  return (
    <div>
      <div className='title'>make each color fully connected in your grid!</div>
      <div className="centered-grid-wrapper">
        <div className='player-container'>
          <Grid2
            initialCells={grid2}
            onWin={() => handleWin('Player 1')}
            disabled={!!winner}
          />
          <p>wasd + space</p>
        </div>
        <div className='player-container'>
          <Grid
            initialCells={grid1}
            onWin={() => handleWin('Player 2')}
            disabled={!!winner}
          />
          <p>arrow keys + /</p>
        </div>
      </div>
      {winner && (
        <div className="modal-overlay">
          <div className="modal-popup">
            <h2>{winner} wins!</h2>
            <button onClick={handleRestart}>Restart</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
