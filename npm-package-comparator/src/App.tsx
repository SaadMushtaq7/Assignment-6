import React, { FC } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ResultPage from "./components/ResultPage";
import "./App.css";

const App: FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
};

export default App;
