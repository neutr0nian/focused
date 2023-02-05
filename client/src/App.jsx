import "./App.css";

import { Route, Routes } from "react-router-dom";
import { HomePage, ProjectBoard, Projects } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path='/projects' element={<Projects />} />
        <Route exact path='/projects/board' element={<ProjectBoard />} />
      </Routes>
    </div>
  );
}

export default App;
