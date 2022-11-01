import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./components/login";
import Signup from "./components/signup";

function App() {

  return (
    <Router>
      <Routes>
          <Route exact path="/" element={
            <Login
            // whaterver props
            />
          }/>
         <Route exact path="/signup" element={
            <Signup 
            // whatever props
            />
          }/>
      </Routes>
    </Router>
  );
}

export default App;

