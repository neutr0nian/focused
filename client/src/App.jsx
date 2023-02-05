import "./App.css";

import { Route, Routes } from "react-router-dom";
import { HomePage, Projects } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path='/projects' element={<Projects />} />
      </Routes>
    </div>
  );
}

export default App;
