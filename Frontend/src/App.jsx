import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ViewSecret from "./Pages/ViewSecret"; 

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/secret/:id" element={<ViewSecret />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;