import "./App.css";

import { Route, Routes } from "react-router-dom";
import { HomePage, ProjectBoard, Projects } from "./pages";
import { Navbar } from "./components";
import UserAccess from "./pages/UserAccess";
import VerifyAccount from "./pages/VerifyAccount";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/projects/board" element={<ProjectBoard />} />
        <Route exact path="/access" element={<UserAccess />} />
        <Route exact path="/verify-email/:email" element={<VerifyAccount />} />
      </Routes>
    </div>
  );
}

export default App;
