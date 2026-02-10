import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Exercises from './pages/Exercises';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-content">
            <h1>💪 Workout Tracker</h1>
            <nav>
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                🏠 Home
              </NavLink>
              <NavLink to="/exercises" className={({ isActive }) => isActive ? 'active' : ''}>
                🏋️ Exercises
              </NavLink>
            </nav>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
