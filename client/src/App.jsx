import { useState } from "react";
import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import Result from "./Pages/Result";
import { DataContext } from "./Components/contexts";

function App() {
  const [resultData, setResultData] = useState([]);
  return (
    <div className="min-h-screen mini-w-screen bg-blue-400">
      <DataContext value={{ resultData, setResultData }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </DataContext>
    </div>
  );
}

export default App;
