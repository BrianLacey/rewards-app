import { Routes, Route } from "react-router";
import "./App.css";
import Home from "./Pages/Home";
import Result from "./Pages/Result";

function App() {
  return (
    <div className="min-h-screen mini-w-screen bg-blue-400">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
}

export default App;
