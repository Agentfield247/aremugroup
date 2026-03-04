// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Features from "./pages/Features";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* When the user is at the root URL (/), load the Home page */}
        <Route path="/" element={<Home />} />

        {/* When the user goes to /features, load the Features page */}
        <Route path="/features" element={<Features />} />
      </Routes>
    </Router>
  );
}
