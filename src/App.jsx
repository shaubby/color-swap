
import './App.css';
import Grid from './Grid';
import Grid2 from './Grid2';
function App() {

  return (
    <div>
    <div className='title'>make each color fully connected in your grid!</div>
    <div className="centered-grid-wrapper">
      
      <div className='player-container'>
      <Grid2 />
      <p>wasd + space</p>
      </div>
      <div className='player-container'>
      <Grid />
      <p>arrow keys + /</p>
      </div>
    </div>
    
    </div>
  );
}

export default App;
