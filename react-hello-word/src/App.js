import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <header className="App-header">
      <h1>Hello World Gio!</h1>
    </header>
  );
}

function Hola() {
  return (
    <header className="App-header">
      <h1>¡Hola, este es otro path!</h1>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hola" element={<Hola />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;