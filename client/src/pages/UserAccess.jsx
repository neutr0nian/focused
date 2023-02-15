import React, { useState } from "react";
import Login from "../components/userAccess/Login";
import Signup from "../components/userAccess/Signup";

const UserAccess = () => {
  const [showForm, setShowForm] = useState("login");
  return (
    <div>
      {showForm === "login" ? (
        <Login setShowForm={setShowForm} />
      ) : (
        <Signup setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default UserAccess;
