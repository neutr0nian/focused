import "./App.css";

import { Route, Routes } from "react-router-dom";
import { HomePage, ProjectBoard, Projects } from "./pages";
import { Navbar } from "./components";
import UserAccess from "./pages/UserAccess";
import VerifyAccount from "./pages/VerifyAccount";
import { useDispatch } from "react-redux";
import { useGetTasksQuery } from "./services/tasksApi";
import { setTasks } from "./components/tasks/taskSlice";
import { useEffect } from "react";
import Reports from "./pages/Reports";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { data, isSuccess } = useGetTasksQuery(token);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setTasks(data.data));
    }
  }, [isSuccess]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/projects/board" element={<ProjectBoard />} />
        <Route exact path="/reports" element={<Reports />} />
        <Route exact path="/access" element={<UserAccess />} />
        <Route exact path="/verify-email/:email" element={<VerifyAccount />} />
      </Routes>
    </div>
  );
}

export default App;
