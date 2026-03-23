import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen mini-w-screen bg-blue-400">
      Helo worlkd!
    </div>
  );
}

export default App;
