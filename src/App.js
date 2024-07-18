import React from 'react';
import Board from './components/board';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Kanban Board</h1>
      </header>
      <main className="App-main">
        <Board />
      </main>
      <footer className="App-footer">
       @vanamadagayathri
      </footer>
    </div>
  );
}

export default App;