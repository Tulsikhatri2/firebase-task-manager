import React from "react";
import { Route, Routes } from "react-router-dom";
import TaskList from "./Pages/TaskList";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<TaskList/>}/>
    </Routes>
    </>
  );
}

export default App;
