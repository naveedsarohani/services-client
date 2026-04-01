import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Router>
      
      <Toaster position="top-right" />
      
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;