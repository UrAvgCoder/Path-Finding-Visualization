import './App.css';
import PathfindingVisualization from './Core/PathfindingVisualization';

function App() {
  return (
    <div className="App">
      <h1>Welcome to a Pathfinding Visualization Project</h1>
      <h6>This project helps to understand the Graph Data Structure Algorithm through Visualization</h6>
      <p><span class="color-green">Green Cell</span>: Source Node</p>
      <p><span class="color-red">Red Cell</span>: Destination Node</p>
      <p>Click and Drag on Empty Cells to create Walls to prevent the Algorithm going through such cells</p>
      <p>Click on Either of the buttons below to start the Visualization process!</p>
      <PathfindingVisualization></PathfindingVisualization>
    </div>
  );
}

export default App;
